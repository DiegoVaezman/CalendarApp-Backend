
import {Schema, model} from 'mongoose';
import { EventType } from '../interfaces';



const eventSchema = new Schema<EventType>({
    title: {
        type: String,
        required: true
    }, 
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

//quita el __v y reemplaza _id por id en el documento - EN MONGO SIGUE APARECIENDO COMO _id y me da problemas al hacer findById etc...
// eventSchema.method('toJSON', function() {
//     const {__v, _id, ...object} = this.toObject();
//     object.id = _id;
//     return object;
// })

const Event = model<EventType>('Event', eventSchema);

export {Event};