import {UserRecap} from "../user-model/userObject";

export interface MessageObject {
    id: number;
    text: string;
    date_send: Date; // Assumant que vous utilisez le type Date pour les timestamps
    sender: UserRecap;
    receiver: UserRecap;
}

export interface MessagePostObject{
    id?:number,
    date_send:string,
    text:string,
    sender_id?:number|bigint,
    receiver_id?:number|bigint,
}