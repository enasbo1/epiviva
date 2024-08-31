import {UserLocatedObject} from "../user-model/userObject";
import {SectorObject} from "../sector-model/sectorObject";


export interface DistributeObject {
    id?:number|bigint;
    schedule:Date;
    distributor_id:number|bigint;
    sector_id:number|bigint;
}

export interface DistributePostObject {
    id?:number|bigint;
    schedule:string;
    distributor_id:number|bigint;
    sector_id:number|bigint;
}

export interface DistributeSectorObject {
    id:number|bigint;
    sector:SectorObject;
    schedule:Date;
    done:string;
    distributor_id:number|bigint;
}

export interface DistributeAffectedObject {
    id:number|bigint;
    sector_id:number|bigint;
    done:string;
    schedule:Date;
    distributor:UserLocatedObject
}