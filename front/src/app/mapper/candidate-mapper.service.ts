import { Injectable } from '@angular/core';
import {CandidateObject} from "../http/model/candidate-model/candidateObject";
import {ListObject} from "../shared/foundation/list/listObject";
import {LanguageService} from "../shared/base-shared/language.service";
import {DateService} from "../http/shared/date.service";
import {RubricElement} from "../shared/base-shared/rubric/rubricObject";
import {FormFieldObject} from "../shared/base-shared/form-field/formFieldObject";
import {FormService} from "../shared/foundation/form/form.service";
import {UserMapperService} from "./user-mapper.service";

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
        {text: (model.creation_date !== model.last_edited)?`${LanguageService.static_resolve('date.edition_date')} : ${DateService.to_front(model.creation_date)}`:''},
        null,
      ],
      left:[
        null,
        {text:model.validation_date?
              LanguageService.static_resolve('candidate.validated_on') + ' : ' + DateService.to_front(model.validation_date)
              :
              CandidateMapperService.states[model.validated?? ''], style:'font-weight:bold'},
        null
      ],
      properties:[
        {name:'candidate.validation', value:CandidateMapperService.states[model.validated?? '']},
        {name:'Service', value:model.service.nom},
        {name:'Number', value:model.id?? ''},
      ]
    }
  }

  static answer_to_rubric(answer:{name:string, value:string}, form:FormFieldObject[]=[]):RubricElement{
    let field = FormService.get_field(form, answer.name)
    let type = FormService.type_formToRubric[field?.type?? 'text']
    return {
      name: field?.title?? answer.name,
      type: type,
      text: ['modal', 'panel'].includes(type)?((answer.value=='')?'*...*':'*<<>>*'):((answer.value=='')?'rubric.unspecified':answer.value),
      value: ((answer.value=='')?'rubric.unspecified':answer.value),
    }
  }

    static model_to_list(model:CandidateObject, linkPage?:string, id_key:string = ':id'):ListObject {
        let n = CandidateMapperService.model_to_list_from_self(model, linkPage);
        if (n.right){
          n.right = [
            {text:LanguageService.static_resolve('candidate.owner') + ' : ' + UserMapperService.get_U_Name(model.user, true), style:'font-weight:bold'},
            n.right[0],
            n.right[1]
          ]
        }
        n.properties?.push(
            {name:'candidate.owner', value: UserMapperService.get_U_Name(model.user, true)}
        )
        return n;
    }
}
