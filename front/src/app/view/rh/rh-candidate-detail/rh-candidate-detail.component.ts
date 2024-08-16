import { Component, OnInit } from '@angular/core';
import {CandidateObject} from "../../../http/model/candidate-model/candidateObject";
import {RubricObject} from "../../../shared/base-shared/rubric/rubricObject";
import {ChatTarget} from "../../../shared/foundation/chat/chat.component";
import {CandidateModelService} from "../../../http/model/candidate-model/candidate-model.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../../../shared/global.service";
import {LanguageService} from "../../../shared/base-shared/language.service";
import {FormFieldObject} from "../../../shared/base-shared/form-field/formFieldObject";
import {FormService} from "../../../shared/foundation/form/form.service";
import {FormStepObject} from "../../../shared/base-shared/form-step/formStepObject";
import {CandidateMapperService} from "../../../mapper/candidate-mapper.service";
import {EpvPath} from "../../routes";

@Component({
  selector: 'epv-rh-candidate-detail',
  templateUrl: './rh-candidate-detail.component.html',
  styleUrls: ['./rh-candidate-detail.component.scss']
})
export class RhCandidateDetailComponent implements OnInit {

  candidate?:CandidateObject;
  answerRubric?:RubricObject;
  chat_target?: ChatTarget;


  constructor(
      private candidateModelService:CandidateModelService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.candidateModelService.get_one_candidate(params['id']).subscribe((candidates)=>
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

  validate() {
    if (this.candidate && this.candidate.validated!=='valid') {
      this.candidateModelService.validate_candidature(this.candidate.id ?? 0).subscribe(()=>
        {
          this.router.navigate(
              ['/'+EpvPath.rh.candidate.list],
              {queryParams:{message:"candidate.validateMessage"}}
          ).then();
        }
      )
    }
  }

  reject() {
    if (this.candidate  && this.candidate.validated!=='reject') {
      this.candidateModelService.reject_candidate(this.candidate.id ?? 0).subscribe(()=>
        {
          this.router.navigate(
              ['/'+EpvPath.rh.candidate.list],
              {queryParams:{message:"candidate.rejectMessage"}}
          ).then();
        }
      )
    }
  }
  protected readonly EpvPath = EpvPath;
}