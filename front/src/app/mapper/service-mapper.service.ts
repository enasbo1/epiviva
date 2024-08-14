import { Injectable } from '@angular/core';
import {ServiceObject} from "../http/model/service-model/serviceObject";
import {ListObject} from "../shared/foundation/list/listObject";

@Injectable({
  providedIn: 'root'
})
export class ServiceMapperService {

  static model_to_list(service:ServiceObject, linkPage?:string, id_key:string = ':id'):ListObject{
    return {
      title:service.nom,
      link: linkPage? '/'+linkPage.replace(id_key, service.id?.toString()??''):undefined,
    }
  }
}
