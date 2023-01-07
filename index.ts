
import express from 'express';
import dotenv from 'dotenv';
import {dbConnection} from './database/config';
import cors from 'cors';
import {authRouter} from './routes/auth';
import {eventsRouter} from './routes/events';
dotenv.config();


//create express server
const app = express();

//Database
dbConnection();

//CORS
app.use(cors());

//public directory
app.use(express.static('public'));

//read and parser body
app.use(express.json());



//routes
app.use('/api/auth',  authRouter);
app.use('/api/events',  eventsRouter);

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})



//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`)
})