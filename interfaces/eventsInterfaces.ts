import { Types as MongooseTypes } from 'mongoose';

export interface EventType {
    title: string;
    notes: string;
    start: Date;
    end: Date;
    user: MongooseTypes.ObjectId;
    bgColor: string;
}