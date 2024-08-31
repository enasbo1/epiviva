import {UserLocatedObject} from "../user-model/userObject";
import {SectorObject} from "../sector-model/sectorObject";


export interface AffectObject {
    id?:number|bigint;
    user_id:number|bigint;
    sector_id:number|bigint;
}

export interface AffectSectorObject {
    id:number|bigint;
    sector:SectorObject;
    user_id:number|bigint;
}

export interface AffectAffectedObject {
    id:number|bigint;
    sector_id:number|bigint;
    user:UserLocatedObject
}