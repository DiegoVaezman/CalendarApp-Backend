
import {Schema, model} from 'mongoose';
import { UserType } from '../interfaces';


const userSchema = new Schema<UserType>({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = model<UserType>('User', userSchema);

export {User};