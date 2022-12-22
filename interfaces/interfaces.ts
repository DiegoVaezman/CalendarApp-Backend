import { Types as MongooseTypes } from 'mongoose';
import { Query, ParamsDictionary } from 'express-serve-static-core';
import { Request } from 'express';

export interface TypedRequest<TBody = {}, SParams extends ParamsDictionary = ParamsDictionary, UQuery extends Query = Query> extends Request {
    uid?: MongooseTypes.ObjectId;
    name?: string;
    body: TBody,
    query: UQuery,
    params: SParams
};

