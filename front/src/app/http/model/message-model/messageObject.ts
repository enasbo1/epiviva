import {UserRecap} from "../user-model/userObject";

export interface MessageObject {
    id: number;
    text: string;
    date_send: Date;
    sender: UserRecap;
    receiver: UserRecap;
    candidate_id?:number|bigint,
}

export interface MessagePostObject{
    id?:number,
    text:string,
    sender_id?:number|bigint,
    receiver_id?:number|bigint,
    candidate_id?:number|bigint,
}