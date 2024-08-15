import { Injectable } from '@angular/core';
import {CandidateObject} from "../http/model/candidate-model/candidateObject";
import {ListObject} from "../shared/foundation/list/listObject";
import {LanguageService} from "../shared/base-shared/language.service";
import {DateService} from "../http/shared/date.service";

@Injectable({
  providedIn: 'root'
})
export class CandidateMapperService {
  public static states = {
    'valid':'candidate.valid',
    'wait':'candidate.waiting',
    'reject':'candidate.rejected',
    '':''
  }

  static model_to_list_from_self(model:CandidateObject, linkPage?:string, id_key:string = ':id'):ListObject{
    return {
      title: `${model.service.nom} n° ${model.id?? ''}` ,
      link: linkPage? '/'+linkPage.replace(id_key, model.id?.toString()??''):undefined,
      style: {'valid':'present', 'wait':'passe', 'reject':'futur', '':''}[model.validated?? ''],
      right:[
        {text: `${LanguageService.static_resolve('candidate.creation_date')} : ${DateService.to_front(model.creation_date)}`},
        {text: (model.creation_date !== model.last_edited)?`${LanguageService.static_resolve('candidate.creation_date')} : ${DateService.to_front(model.creation_date)}`:''},
        null,
      ],
      left:[
        {text:CandidateMapperService.states[model.validated?? ''], style:'font-weight:bold'},
        {text:model.validation_date?LanguageService.static_resolve('candidate.the') + ' : ' + DateService.to_front(model.validation_date):''},
        null
      ]
    }
  }
}
