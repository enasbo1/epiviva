import { Component, OnInit } from '@angular/core';
import {CandidateModelService} from "../../../../http/model/candidate-model/candidate-model.service";
import {ChatTarget} from "../../../../shared/foundation/chat/chat.component";
import {RubricObject} from "../../../../shared/base-shared/rubric/rubricObject";
import {ActivatedRoute, Router} from "@angular/router";
import {LanguageService} from "../../../../shared/base-shared/language.service";
import {FormService} from "../../../../shared/foundation/form/form.service";
import {GlobalService} from "../../../../shared/global.service";
import {FormFieldObject} from "../../../../shared/base-shared/form-field/formFieldObject";
import {CandidateMapperService} from "../../../../mapper/candidate-mapper.service";
import {FormStepObject} from "../../../../shared/base-shared/form-step/formStepObject";
import {EpvPath} from "../../../routes";
import {CandidateObject} from "../../../../http/model/candidate-model/candidateObject";

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
      private router: Router
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

  delete() {
    if (this.candidate) {
      this.candidateModelService.delete_candidate(this.candidate.id ?? 0).subscribe(()=>
        {
          this.router.navigate(
              ['/'+EpvPath.visitor.candidated.list],
              {queryParams:{message:"candidate.deleteMessage"}}
          ).then();
        }
      )
    }
  }
  protected readonly EpvPath = EpvPath;
}
