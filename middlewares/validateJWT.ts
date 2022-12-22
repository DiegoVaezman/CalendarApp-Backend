import { NextFunction, Request, Response } from 'express'
import jwt, { PayloadJWT } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { TypedRequest } from '../interfaces/interfaces';




const validateJWT = (req: TypedRequest<{}, {}>, res: Response, next: NextFunction) => {
    const token = req.header('x-token');
    
    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const payload = <PayloadJWT>jwt.verify(token, process.env.SECRET_JWT_SEED!);

        //una vez el token es válido se asigna uid y name al req
        req.uid = payload.uid;
        req.name = payload.name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    next();
}



export {
    validateJWT
}