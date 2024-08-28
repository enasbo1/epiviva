import {Component, EventEmitter, OnInit} from '@angular/core';
import {LanguageService} from "../../../../shared/base-shared/language.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CandidateModelService} from "../../../../http/model/candidate-model/candidate-model.service";
import {ServiceModelService} from "../../../../http/model/service-model/service-model.service";
import {FormStepObject} from "../../../../shared/base-shared/form-step/formStepObject";
import {ServiceObject} from "../../../../http/model/service-model/serviceObject";
import {GlobalService} from "../../../../shared/global.service";
import {FormFieldObject} from "../../../../shared/base-shared/form-field/formFieldObject";
import {FormService} from "../../../../shared/foundation/form/form.service";
import {EpvPath} from "../../../routes";

@Component({
  selector: 'epv-visitor-service-detail',
  templateUrl: './visitor-service-detail.component.html',
  styleUrls: ['./visitor-service-detail.component.scss']
})
export class VisitorServiceDetailComponent implements OnInit {
  public error?:string;
  public service?: ServiceObject;
  private errorCatch:EventEmitter<string> = new EventEmitter<string>();
  public serviceForm?: FormStepObject[];
  constructor(
      private serviceModelService:ServiceModelService,
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
        this.serviceModelService.get_one_service(params['id']).subscribe(
            (services)=>{
              this.service = services[0]
              GlobalService.pageName = this.language.resolve('candidate.title') + ' : ' + this.language.resolve(this.service.nom);
              this.serviceForm = JSON.parse(this.service.form?? '[]') as FormStepObject[];
              this.serviceForm.forEach(fs=> fs.errorEvent = this.errorCatch)
            }
        );
      }
    });
  }

  submit(values: FormFieldObject[]) {
    this.error = '*...*'
    let answer:string = JSON.stringify(FormService.extract_answer(values));
    this.candidateModelService.post_self_candidate(
        {
          service_id: this.service?.id?? 0,
          answer: answer,
        }
    ).subscribe(()=>{
          this.error = undefined
          this.router.navigate(['/' + EpvPath.visitor.home],
              {queryParams: {message: 'candidate.registered'}}
          ).then()
        }
    )
  }
}
