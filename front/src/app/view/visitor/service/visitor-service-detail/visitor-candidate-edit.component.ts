import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormStepObject} from "../../../../shared/base-shared/form-step/formStepObject";
import {CandidateModelService} from "../../../../http/model/candidate-model/candidate-model.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LanguageService} from "../../../../shared/base-shared/language.service";
import {GlobalService} from "../../../../shared/global.service";
import {FormFieldObject} from "../../../../shared/base-shared/form-field/formFieldObject";
import {FormService} from "../../../../shared/foundation/form/form.service";
import {CandidateObject} from "../../../../http/model/candidate-model/candidateObject";
import {ServiceObject} from "../../../../http/model/service-model/serviceObject";
import {EpvPath} from "../../../routes";

@Component({
  selector: 'epv-visitor-candidate-edit',
  templateUrl: './visitor-service-detail.component.html',
  styleUrls: ['./visitor-service-detail.component.html']
})
export class VisitorCandidateEditComponent implements OnInit {
  public error?:string;
  public candidate?: CandidateObject;
  public service?:ServiceObject;
  private errorCatch:EventEmitter<string> = new EventEmitter<string>();
  public serviceForm?: FormStepObject[];
  constructor(
      private candidateModelService:CandidateModelService,
      private route:ActivatedRoute,
      private router:Router,
      private language: LanguageService,
  ) { }

  ngOnInit(): void {
    this.errorCatch.subscribe(
        error=>this.error = error
    )
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.candidateModelService.get_one_self_candidate(params['id']).subscribe(
            (candidates)=>{
              this.candidate = candidates[0]
              this.service = this.candidate.service;
              let answer = (JSON.parse(this.candidate.answer) as ({name:string, value:string}[]))
              GlobalService.pageName = this.language.resolve('candidate.name')+ ' : ' + this.service.nom + ' n°' + this.candidate.id
              this.serviceForm = JSON.parse(this.service.form?? '[]') as FormStepObject[];
              this.serviceForm.forEach(fs=> fs.errorEvent = this.errorCatch)
              FormService.extract_values(this.serviceForm).forEach(field=>
                  {
                    let val = answer.find(x=>x.name === field.name);
                    if (val){
                        FormService.set_answer(field, val)
                    }
                  }
              )
            }
        );
      }
    });
  }

  submit(values: FormFieldObject[]) {
    if (this.candidate) {
        this.error = '*...*'
        let answer:string = JSON.stringify(FormService.extract_answer(values));
        this.candidateModelService.update_selfCandidate(
            {
                id: this.candidate.id?? 0,
                answer: answer
            }
        ).subscribe(()=>{
                this.error = undefined
                this.router.navigate(['/' + EpvPath.visitor.candidated.details.replace(':id', this.candidate?.id?.toString() ?? '0')],
                    {queryParams: {message: 'candidate.updated'}}
                ).then()
            }
        )
    }
  }
}
