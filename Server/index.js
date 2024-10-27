import dotenv from 'dotenv'
dotenv.config({path: '../.env'})
import express from 'express'
import bodyParser from 'body-parser'
import routesHandler from './routes/Routes.js'
import { initialize, displayCareers } from './Database.js'
import getQuizData from './QuizData.js'



const app = express();
try{
    await initialize();
    console.log("Database initialized");
}
catch(err){
    console.error("Error initializing database:", err);
}
await displayCareers();
try{
    await getQuizData();
}
catch(err){
    console.log("Error initializing quiz database", err);
}
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler);

const PORT = 4000; //Backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})