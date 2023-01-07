
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


//si la aplicación front se aloja en el mismo servidor que el back, osea que el build se mete en la carpeta public del backend y es alojado todo en el mismo servidor se debería utilizar
// esta función para evitar el error en las rutas internas de react ya que el navegador supondrá que son rutas del servidor y no existen, por eso esta función hace que todas las rutas distintas
// a las configuradas devuelven la aplicación alojada en public:
// app.get('*', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html')
// })



//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`)
})