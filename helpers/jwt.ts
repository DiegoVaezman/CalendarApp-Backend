import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

//incluir types del payload en los types de jwt
declare module 'jsonwebtoken' {
    export interface PayloadJWT extends jwt.JwtPayload {
        _id: Types.ObjectId;
        name: string;
    }
}

const generateJWT = (_id: Types.ObjectId, name: string) => {
    return new Promise((resolve, reject) => {
        const payload = {  _id, name};

        jwt.sign(payload, process.env.SECRET_JWT_SEED || 'MISSING_SECRET', {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('error generando token');
            }
            resolve(token)
        })
    })
}


export {
    generateJWT
}