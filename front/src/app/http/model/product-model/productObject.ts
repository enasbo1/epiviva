import {UserRecap} from "../user-model/userObject";

export interface ProductGetObject extends ProductSelfObject{
    user:UserRecap
    harvest_id:number|bigint
}

export interface ProductObject extends ProductMinObject{
    code_barre:string;
    name:string;
    marque:string;
    user:UserRecap
    expiration_date:Date;
}

export interface ProductPostObject extends ProductMinObject {
    code_barre:string;
    name:string;
    marque:string;
    expiration_date:string;
}

export interface ProductSelfObject extends ProductMinObject {
    id:number|bigint;
    code_barre:string;
    name:string;
    refused?:string;
    marque:string;
    expiration_date:Date;
    distribute_id?:number|bigint;
}

export interface ProductMinObject {
    id?:number|bigint;
    code_barre?:string;
    name?:string;
    marque?:string;
    user?:UserRecap
    expiration_date?:Date|string;
}