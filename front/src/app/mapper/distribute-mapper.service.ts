import { Injectable } from '@angular/core';
import {DistributeAffectedObject, DistributeSectorObject} from "../http/model/distribute-model/distributeObject";
import {ListObject} from "../shared/foundation/list/listObject";
import {LanguageService} from "../shared/base-shared/language.service";
import {UserMapperService} from "./user-mapper.service";
import {DateService} from "../http/shared/date.service";
import {EpvPath} from "../view/routes";
import {FormStepObject} from "../shared/base-shared/form-step/formStepObject";
import {AddressMapperService} from "./address-mapper.service";

@Injectable({
  providedIn: 'root'
})
export class DistributeMapperService {
  static affected_to_list(distribute:DistributeAffectedObject, link:string = EpvPath.rh.distribute.details, key:string = ':id'):ListObject{
    return {
      title:'',
      link:'/'+link.replace(key, distribute.id.toString()),
      right:[
        {text: `${LanguageService.static_resolve('distribute.schedule')} : ${DateService.to_front(distribute.schedule, true)}`},
        {text: `${LanguageService.static_resolve('distribute.user')} : ${UserMapperService.get_U_Name(distribute.distributor, true)}`},
        null
      ],
      style:DateService.checkDateStatus(distribute.schedule),
      properties:[
        {name:'distribute.user', value: UserMapperService.get_U_Name(distribute.distributor, true)},
        {name:'distribute.state', value: DateService.checkDateStatus(distribute.schedule)},
      ]
    }
  }

  static sector_to_list(distribute:DistributeSectorObject, link:string = EpvPath.volunteer.distribute.details, key:string = ':id'):ListObject{
    return {
      title:'',
      link:'/'+link.replace(key, distribute.id.toString()),
      right:[
        {text: `${LanguageService.static_resolve('distribute.schedule')} : ${DateService.to_front(distribute.schedule, true)}`},
        {text: `${LanguageService.static_resolve('sector.title')} : ${distribute.sector.nom}`},
        null
      ],
      style:DateService.checkDateStatus(distribute.schedule),
      properties:[
        {name:'sector.title', value: `${distribute.sector.nom} ${AddressMapperService.get_address(distribute.sector.address)}`},
        {name:'distribute.state', value: DateService.checkDateStatus(distribute.schedule)},
      ]
    }
  }

  static form(title:string='distribute.schedule'):FormStepObject{
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

}
