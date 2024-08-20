import {BenefitMapperService} from "../../../mapper/benefit-mapper.service";

export interface BenefitObject {
    id ?: number|bigint,
    people:number,
    diet?:DietObject[],
    caf:string,
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