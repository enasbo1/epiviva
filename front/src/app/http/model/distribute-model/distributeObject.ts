import {UserLocatedObject} from "../user-model/userObject";
import {SectorObject} from "../sector-model/sectorObject";


export interface DistributeObject {
    id?:number|bigint;
    user_id:number|bigint;
    sector_id:number|bigint;
}

export interface DistributeSectorObject {
    id:number|bigint;
    sector:SectorObject;
    user_id:number|bigint;
}

export interface DistributeAffectedObject {
    id:number|bigint;
    sector_id:number|bigint;
    user:UserLocatedObject
}