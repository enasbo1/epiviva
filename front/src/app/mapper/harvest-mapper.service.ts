import { Injectable } from '@angular/core';
import {HarvestMin, HarvestObject, HarvestPostObject} from "../http/model/harvest-model/harvestObject";
import {FormStepObject} from "../shared/base-shared/form-step/formStepObject";
import {FormFieldObject} from "../shared/base-shared/form-field/formFieldObject";
import {FormService} from "../shared/foundation/form/form.service";
import {DateService} from "../http/shared/date.service";

@Injectable({
  providedIn: 'root'
})
export class HarvestMapperService{
  static form(title:string='harvest.add.cta'):FormStepObject{
   return {
     title:title,
     content:[
       {
         content:[
           {
             name:'schedule',
             title:'harvest.form.schedule.name',
             type:'date',
             time:true,
           }
         ]
       }
     ]
   }
  }

  static resolve_form(fields:FormFieldObject[], sector_id?:bigint|number, harvest?:HarvestMin):HarvestPostObject{
    return {
      id:harvest?.id,
      schedule:(FormService.get_value(fields, 'schedule',  DateService.to_api(harvest?.schedule)) as string),
      sector_id:sector_id??harvest?.sector_id??0
    }
  }
}
