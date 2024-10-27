import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config({path: '../.env'})
import onetService from './OnetWebService.js';
import {fetchAllCareerData} from './FetchAll.js';
import {setTimeout} from 'timers';

/*
mysql -u 'username' -p   //In my case, username would be root 
1. CREATE DATABASE IF NOT EXISTS career_day;
2. USE career_day;

3. CREATE TABLE IF NOT EXISTS careers(
  onet_code VARCHAR(10) PRIMARY KEY, 
  title VARCHAR(255) NOT NULL,
  annual_median_salary DECIMAL(10,2),
  description TEXT,
  education_levels JSON
);

  CREATE TABLE IF NOT EXISTS industry(

  )

4. EXIT;
*/
export const pool = mysql.createPool({ 
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD, //Password for my local host, may change
    database: process.env.MYSQL_DATABASE //Database being tested on local host, may change
}).promise()

export async function displayCareers() { //Testing if databases have the correct data: For development
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM careers');
    console.log(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


async function setUpDatabase(){ 
  try{
    const connection = await pool.getConnection();

    //Delete both tables if previously created since existing table data wouldn't be updated
    await connection.query('DROP TABLE IF EXISTS careers');
    await connection.query('DROP TABLE IF EXISTS industries');

    //Creating tables
    const createIndustriesTable = `
      CREATE TABLE IF NOT EXISTS industries (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      );
    `;

    const createCareersTable = `
      CREATE TABLE IF NOT EXISTS careers(
        onet_code VARCHAR(10) PRIMARY KEY, 
        title VARCHAR(255) NOT NULL,
        annual_median_salary DECIMAL(10,2),
        description TEXT NOT NULL,
        education_levels JSON,
        industry_id INT NOT NULL,
        FOREIGN KEY (industry_id) REFERENCES industries(id)
      );
    `;

    await connection.query(createIndustriesTable);
    await connection.query(createCareersTable);
    console.log("Tables created successfully");
  }
  catch(err){
    console.error("Error setting up the database:", err);
  }
}

async function fetchAndInsertData(){
  try{
    //Fills in the industries table 
    const industryResponse = await onetService.call('mnm/browse/');
    const industryData = industryResponse.industry.map(industry => ({
      code: industry.code,
      title: industry.title
    }));
    const connection = await pool.getConnection();
    
    for(const industry of industryData){
      await connection.query(`
          INSERT INTO industries (id, name)
          VALUES (?, ?) 
          ON DUPLICATE KEY UPDATE NAME = VALUES(name)
        `, [industry.code, industry.title]);

        //Using the industry code, the program will discover all careers that fall within that industry category and proceed to grab a full report of each career and store the data in the careers table
        const careers = await fetchAllCareerData(`mnm/browse/${industry.code}`);
        for(const career of careers){
          const [existingCareer] = await connection.query('SELECT * FROM careers WHERE onet_code = ?', [career.code]);
          if(existingCareer.length === 0){
            // await new Promise(resolve => setTimeout(resolve, 200));
            const report = await onetService.call(`mnm/careers/${career.code}/report`)
            await connection.query(
              `INSERT INTO careers (onet_code, title, annual_median_salary, description, education_levels, industry_id) VALUES (?, ?, ?, ?, ?, ?)`, 
            [report.code, report.career.title, report.job_outlook.salary.annual_median, report.career.what_they_do, JSON.stringify(report.education.education_usually_needed), industry.code]
            );
          }
        }
    }
    console.log("Data inserted successfully");
    connection.release();
  }
  catch(err){
    console.error("Error fetching or inserting data", err);
  }
}

export async function initialize(){
  await setUpDatabase();
  await fetchAndInsertData();
}

