import {BenefitMapperService} from "../../../mapper/benefit-mapper.service";
import {UserRecap} from "../user-model/userObject";

export interface BenefitObject {
    id ?: number|bigint,
    people:number,
    diet?:DietObject[],
    caf:string,
    secteur_id?:number,
    validated?:'valid'|'wait'|'reject',
}

export interface BenefitGetLargeObject extends BenefitGetObject {
    id: number|bigint,
    people:number,
    diet:string,
    caf:string,
    user:UserRecap,
}

export interface BenefitGetObject {
    id ?: number|bigint,
    people:number,
    diet?:string,
    caf?:string,
    secteur_id?:number,
    validated?:'valid'|'wait'|'reject',
}

export interface BenefitPostObject {
    id ?: number|bigint,
    people:number,
    diet?:string,
    caf?:string,
    secteur_id?:number,
    validated?:'valid'|'wait'|'reject',
}

export type DietObject = DietDefault | DietSpecific

interface DietDefault{
    type : 'intolerance'|'allergy'|'forbidden'
    value : string;
}
interface DietSpecific {
    type : 'specific_diet'
    value : (typeof BenefitMapperService.specific_diet[number])
}