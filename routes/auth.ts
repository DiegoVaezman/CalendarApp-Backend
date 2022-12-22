// Auth routes 
// host + /api/auth

import {Router} from 'express';
import { check } from 'express-validator';

import {validateJWT, fieldValidator} from '../middlewares';
import {createUser, loginUser, revalidateToken} from '../controllers/auth';

const authRouter = Router();


authRouter.post(
    '/new', 
    [//middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser mínimo de 6 caracteres').isLength({min: 6}),
        //fieldvalidator gestiona los resultados de los check y devuelve el error en caso de que haya.
        fieldValidator
    ], 
    createUser
);

authRouter.post(
    '/', 
    [//middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser mínimo de 6 caracteres').isLength({min: 6}),
        fieldValidator
    ],
    loginUser
);

authRouter.get('/renew', validateJWT, revalidateToken);


export {authRouter};