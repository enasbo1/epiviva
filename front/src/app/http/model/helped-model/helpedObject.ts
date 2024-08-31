import {BenefitGetLargeObject} from "../benefit-model/benefitObject";

export interface HelpedObject extends HelpedMin {
    helped: string;
    postal_code: string;
    instruction: string;
    city: string;
    kind: string;
}

export interface BenefitGetHelpedObject extends BenefitGetLargeObject{
    help_id:number|bigint;
}

export interface HelpedPost {
    benefit_id: number|bigint;
    distribute_id: number|bigint;
}

export interface HelpedMin {
    help_id:number|bigint;
    id?: number|bigint;
    helped?: string;
    postal_code?: string;
    instruction?: string;
    city?: string;
    kind?: string;
    id_sector?: number | bigint;
}