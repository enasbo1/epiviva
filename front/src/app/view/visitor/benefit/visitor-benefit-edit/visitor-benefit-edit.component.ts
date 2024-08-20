import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../../../shared/global.service";
import {BenefitModelService} from "../../../../http/model/benefit-model/benefit-model.service";
import {BenefitObject} from "../../../../http/model/benefit-model/benefitObject";
import {FormStepObject} from "../../../../shared/base-shared/form-step/formStepObject";
import {BenefitMapperService} from "../../../../mapper/benefit-mapper.service";
import {FormFieldObject} from "../../../../shared/base-shared/form-field/formFieldObject";

@Component({
  selector: 'epv-visitor-benefit-edit',
  templateUrl: './visitor-benefit-edit.component.html',
  styleUrls: ['./visitor-benefit-edit.component.scss']
})
export class VisitorBenefitEditComponent implements OnInit {
  private benefit?:BenefitObject;
  public benefit_form:FormStepObject[] = [];

  constructor(
      private benefitModelService: BenefitModelService,
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = 'benefit.title';
    this.benefitModelService.get_benefit_self().subscribe((benefits)=>
      {
        if (benefits.length == 0){
          this.benefit_form = BenefitMapperService.model_to_form()
        }else{
          this.benefit = benefits[0];
          this.benefit_form = BenefitMapperService.model_to_form(this.benefit)
        }
      }
    )
  }

  submit() {
    if (this.benefit_form) {
      console.log(this.benefit_form);
      const benefit = BenefitMapperService.form_to_model(this.benefit_form)
      if (this.benefit){
        console.log('tbi');
      }else{
        this.benefitModelService.post_benefit_self(benefit).subscribe(()=>undefined);
      }

    }
  }
}
