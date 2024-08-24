import {EventEmitter, Injectable} from '@angular/core';
import {SectorObject} from "../http/model/sector-model/sectorObject";
import {ListObject} from "../shared/foundation/list/listObject";
import {LanguageService} from "../shared/base-shared/language.service";
import {UserMapperService} from "./user-mapper.service";
import {RubricObject} from "../shared/base-shared/rubric/rubricObject";
import {FormStepObject} from "../shared/base-shared/form-step/formStepObject";
import {RegexBase} from "../shared/RegexBase";
import {AddressMapperService} from "./address-mapper.service";

@Injectable({
  providedIn: 'root'
})
export class SectorMapperService {
  static model_to_list(sector:SectorObject, detailPage?:string, key:string= ':id'):ListObject{
    return {
      title:sector.nom,
      link:detailPage?.replace(key,sector?.id?.toString()??'0'),
      right:[
        {text : `${LanguageService.static_resolve('address.title')} :  ${sector?.address.address}, ${sector?.address.postal_code} ${sector?.address.city}`},
        null,
        null
      ],
      properties:[
        { name : 'sector.name' , value: sector?.nom},
        { name: 'address.title', value: `${sector?.address.address}, ${sector?.address.postal_code} ${sector?.address.city}` },
        { name: 'address.city.title', value: sector.address.city },
        { name: 'address.postal_code.title', value: sector.address.postal_code },
        { name: 'address.kind.title', value: sector.address.kind },
      ]
    }
  }

  static model_to_rubric(sector:SectorObject):RubricObject{
    return {
      title: `${LanguageService.static_resolve('sector.title')} : ${sector.nom[0].toUpperCase()}${sector?.nom.slice(1).toLowerCase()}`,
      content: [
      ]
    }
  }

  static form(verify: (step: FormStepObject) => (EventEmitter<boolean> | false), sector?: SectorObject):FormStepObject {
    return {
      validator:verify,
      content:[
        {
          title:'sector.title',
          content:[
            {
              name:'name',
              title:'sector.name.title',
              type:'text',
              default: sector?.nom,
              placeholder:'sector.name.placeholder',
              reg_error:[
                {regex:RegexBase.required, message:'sector.name.required'},
              ],
            }
          ]
        },
        ...AddressMapperService.form(verify, sector?.address)[0].content
      ]
    }

  }
}
