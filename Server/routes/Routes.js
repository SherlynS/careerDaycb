router.get('/careers', async (req, res) => {
    try{
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT c.*, i.name as industry_name FROM careers c JOIN industries i ON c.industry_id = i.id');
        connection.release();
        res.json(rows);
    }
    catch(err){
        console.error('Error fetching data:', err);
        res.status(500).json({ message: 'Error fetching data' });
    }
})

router.get('/api/industries', async (req, res) => {
    try{
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT id, name FROM industries');
        connection.release();
        res.json(rows);
    }
    catch(err){
        console.error('Error fetching industries data:', err);
        res.status(500).json({ message: 'Error fetching industries data' });
    }
})

router.get('/Quiz', async (req, res) => {
    try{
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM quiz');
        connection.release();
        res.json(rows);
    }
    catch(err){
        console.error('Error fetching quiz data:', err);
        res.status(500).json({ message: 'Error fetching quiz data' });
    }
})

router.post('/api/quizResults', async (req, res) => {
    try{
        if (!req.body.results) {
            res.status(400).json({ message: 'Missing quiz results' });
            return;
        }
        const results = req.body.results;
        console.log('Received quiz results:', results);
        const careersData = await onetService.call(`/mnm/interestprofiler/careers?answers=${results}`);

        const top5Careers = [];
        const fits = ["Best", "Great", "Good"];
        for(const fit of fits){
            for(const career of careersData.career){
                if(career.fit == fit && top5Careers.length < 5){
                    top5Careers.push(career);
                }
                if(top5Careers.length >= 5){
                    break;
                }
            }
            if(top5Careers.length >= 5){
                break;
            }
        }
        const careerDetails = [];
        
        const connection = await pool.getConnection();
        await Promise.all(top5Careers.map(async (career) => {
            const sql = `SELECT * FROM careers WHERE onet_code = ?`;
            const [rows] = await connection.query(sql, [career.code]);
            if (rows.length > 0) {
              careerDetails.push(rows[0]); // Assuming the first result contains the desired career details
            }
          }));
        connection.release();
        res.json(careerDetails);
        
    }
    catch(err){
        console.error('Error fetching quiz results:', err);
        res.status(500).jsonimport dotenv from 'dotenv'
dotenv.config({path: '../.env'})
import express from 'express';
const router = express.Router();
import {pool} from '../Database.js';
import onetService from '../OnetWebService.js';


   router.get('/careers', async (req, res) => {
        try{
            const connection = await pool.getConnection();
            const [rows] = await connection.query('SELECT * FROM careers JOIN industries ON careers.industry_id = industries.id');
            connection.release();
            res.json(rows);
        }
        catch(err){
            console.error('Error fetching data:', err);
        }
   })

   router.get('/api/industries', async (req, res) => {
    try{
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT name FROM industries');
        connection.release();
        console.log(rows);
        res.json(rows);
    }
    catch(err){
        console.error('Error fetching industries data:', err);
    }})

    router.get('/Quiz', async (req, res) => {
        try{
            const connection = await pool.getConnection();
            const [rows] = await connection.query('SELECT * FROM quiz');
            connection.release();
            res.json(rows);
        }
        catch(err){
            console.error('Error fetching quiz data:', err);
    }})

    router.post('/api/quizResults', async (req, res) => {
        try{
            const results = req.body.results;
            console.log('Received quiz results:', results);
            const careersData = await onetService.call(`/mnm/interestprofiler/careers?answers=${results}`);

            const top5Careers = [];
            const fits = ["Best", "Great", "Good"];
            for(const fit of fits){
                for(const career of careersData.career){
                    if(career.fit == fit && top5Careers.length < 5){
                        top5Careers.push(career);
                    }
                    if(top5Careers.length >= 5){
                        break;
                    }
                }
                if(top5Careers.length >= 5){
                    break;
                }
            }
            const careerDetails = [];
            
            const connection = await pool.getConnection();
            await Promise.all(top5Careers.map(async (career) => {
                const sql = `SELECT * FROM careers WHERE onet_code = ?`;
                const [rows] = await connection.query(sql, [career.code]);
                if (rows.length > 0) {
                  careerDetails.push(rows[0]); // Assuming the first result contains the desired career details
                }
              }));
            res.json(careerDetails);
            
        }
        catch(err){
            console.error('Error fetching quiz results:', err);
        }
    })


export default router