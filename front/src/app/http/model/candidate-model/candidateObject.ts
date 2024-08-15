import {ServiceObject} from "../service-model/serviceObject";
import {UserRecap} from "../user-model/userObject";

export interface CandidateObject {
    id?:number|bigint,
    user:UserRecap,
    service:ServiceObject,
    answer:string,
    validated?:'valid'|'wait'|'reject',
    creation_date:Date,
    validation_date?:Date,
    last_edited:Date
}

export interface CandidatePostObject {
    id?:number|bigint,
    user_id?:number|bigint,
    service_id:number|bigint,
    answer:string,
    validated?:boolean
}