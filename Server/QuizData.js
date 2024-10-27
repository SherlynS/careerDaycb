import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config({path: '../.env'})
import onetService from './OnetWebService.js';
import {fetchAllQuizData} from './FetchAll.js';
import {setTimeout} from 'timers';
import {pool} from './Database.js';

export async function getQuizData(){
    try{
        const connection = await pool.getConnection();

    await connection.query('DROP TABLE IF EXISTS quiz');
    const createQuizTable = `
      CREATE TABLE IF NOT EXISTS quiz (
        question_index INT PRIMARY KEY,
        question_text VARCHAR(255) NOT NULL
      );
    `;

    await connection.query(createQuizTable);
    console.log("Quiz table created");
    }
    catch(error){
        console.error("Error setting up quiz database", error);
    }

    try{
        const connection = await pool.getConnection();
        const quizQuestions = await fetchAllQuizData('mnm/interestprofiler/questions');
        for(const question of quizQuestions){
            await connection.query(`
                INSERT INTO quiz (question_index, question_text)
                VALUES (?, ?) 
              `, [question.index, question.text]);
        }
        console.log("Quiz data inserted successfully");
        connection.release();
    }
    catch(err){
        console.error('Error fetching quiz data:', err);
    }
}

export default getQuizData;