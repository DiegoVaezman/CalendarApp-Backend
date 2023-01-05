import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {User} from '../models/userModel';
import { generateJWT } from '../helpers/jwt';
import { TypedRequest } from '../interfaces/interfaces';
import { LoginUserBody, UserType } from '../interfaces';

 const createUser = async (req: TypedRequest<UserType>, res: Response) => {
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        };

        user = new User(req.body);

        //password encrypted
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //generar token
        const token = await generateJWT(user._id, user.name);


        res.status(201).json({
            ok: true, 
            _id: user._id,
            name: user.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const loginUser =  async (req: TypedRequest<LoginUserBody>, res: Response) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        };

        //match password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok:false,
                msg: 'Contraseña incorrecta'
            });
        }

        //generar token
        const token = await generateJWT(user._id, user.name);


        res.json({
            ok: true,
            _id: user._id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const revalidateToken = async (req: TypedRequest, res: Response) => {
    const {_id, name} = req;
    //generar token
    const token = await generateJWT(_id!, name!);

    res.json({ok: true, _id, name, token});
}


export {
    createUser,
    loginUser,
    revalidateToken
}