import {SectorObject} from "../sector-model/sectorObject";

export interface HarvestGetObject extends HarvestMin {
    id:number|bigint;
    sector:SectorObject
}

export interface HarvestObject extends HarvestMin {
    sector_id:number|bigint;
}

export interface HarvestMin {
    id?:number|bigint;
    schedule:Date;
    sector_id?:number|bigint;
}

export interface HarvestPostObject {
    id?:number|bigint;
    schedule:string;
    sector_id:number|bigint;
}