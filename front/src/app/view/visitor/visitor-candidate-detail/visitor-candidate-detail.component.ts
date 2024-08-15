import { Component, OnInit } from '@angular/core';
import {CandidateModelService} from "../../../http/model/candidate-model/candidate-model.service";
import {ActivatedRoute} from "@angular/router";
import {CandidateObject} from "../../../http/model/candidate-model/candidateObject";
import {RubricObject} from "../../../shared/base-shared/rubric/rubricObject";
import {CandidateMapperService} from "../../../mapper/candidate-mapper.service";
import {FormStepObject} from "../../../shared/base-shared/form-step/formStepObject";
import {FormService} from "../../../shared/foundation/form/form.service";
import {FormFieldObject} from "../../../shared/base-shared/form-field/formFieldObject";
import {GlobalService} from "../../../shared/global.service";
import {LanguageService} from "../../../shared/base-shared/language.service";
import {EpvPath} from "../../routes";
import {ChatTarget} from "../../../shared/foundation/chat/chat.component";

@Component({
  selector: 'epv-visitor-candidate-detail',
  templateUrl: './visitor-candidate-detail.component.html',
  styleUrls: ['./visitor-candidate-detail.component.scss']
})
export class VisitorCandidateDetailComponent implements OnInit {

  candidate?:CandidateObject;
  answerRubric?:RubricObject;
  chat_target?: ChatTarget;


  constructor(
      private candidateModelService:CandidateModelService,
      private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.candidateModelService.get_one_self_candidate(params['id']).subscribe((candidates)=>
          {
            this.candidate = candidates[0];
            this.chat_target = {subject:'candidate', id : this.candidate.id??0};
            GlobalService.pageName = LanguageService.static_resolve('candidate.name')+ ' : ' + this.candidate.service.nom + ' n°' + this.candidate.id
            let formFields:FormFieldObject[] = FormService.extract_values(JSON.parse(this.candidate.service.form?? '[]') as FormStepObject[]);
            this.answerRubric = {
              title : "form.answer",
              content : (JSON.parse(this.candidate.answer) as ({name:string, value:string}[])).map((value)=>
                  CandidateMapperService.answer_to_rubric(value, formFields)
              )
            }
          }
        )
      }
    })
  }

  protected readonly EpvPath = EpvPath;
}
