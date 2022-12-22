// Events routes 
// host + /api/events

import {Router} from 'express';
import { check } from 'express-validator';
import { createEvenet, deleteEvent, getEvents, updateEvent } from '../controllers/events';
import { fieldValidator, validateJWT } from '../middlewares';

const eventsRouter = Router();

//Todal las rutas son protegidas por token por lo que se puede establecer el middleware así y todas las turas por denajo de él serán protegidas.
//Si alguna ruta es pública se pondría por encima del eventsRouter.use y así no le aplicaría.
eventsRouter.use(validateJWT);

eventsRouter.get('/', getEvents);

eventsRouter.post(
    '/', 
    [
        check('title', 'El título es obligatorio').notEmpty(),
        check('start', 'Fecha de inicio obligatoria').isISO8601().toDate(),
        check('end', 'Fecha de fin obligatoria').isISO8601().toDate(),
        check('end').isISO8601().toDate().custom(( value, { req } ) => value >= req.body.start ).withMessage('Fecha fin debe ser mayor que fecha de comienzo'),
        fieldValidator
    ], 
    createEvenet);

eventsRouter.put('/:id', updateEvent);

eventsRouter.delete('/:id', deleteEvent);


export {
    eventsRouter
}