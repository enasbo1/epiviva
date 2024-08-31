import {UserRecap} from "../user-model/userObject";
import {HarvestGetObject, HarvestObject} from "../harvest-model/harvestObject";

export interface ProductGetObject extends ProductSelfObject{
    user:UserRecap
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
    harvest?:HarvestGetObject;
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