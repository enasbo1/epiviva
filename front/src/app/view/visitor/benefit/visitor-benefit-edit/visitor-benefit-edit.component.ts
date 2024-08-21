import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../../../shared/global.service";
import {BenefitModelService} from "../../../../http/model/benefit-model/benefit-model.service";
import {BenefitGetObject, BenefitObject} from "../../../../http/model/benefit-model/benefitObject";
import {FormStepObject} from "../../../../shared/base-shared/form-step/formStepObject";
import {BenefitMapperService} from "../../../../mapper/benefit-mapper.service";
import {FormFieldObject} from "../../../../shared/base-shared/form-field/formFieldObject";
import {FileModelService} from "../../../../http/model/file-model/file-model.service";
import {EpvPath} from "../../../routes";
import {Router} from "@angular/router";

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
      private fileModelService: FileModelService,
      private router:Router,
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = 'benefit.title';
    this.benefitModelService.get_benefit_self().subscribe((benefits)=>
      {
        if (benefits.length == 0){
          this.benefit_form = BenefitMapperService.model_to_form()
        }else{
          const benefit:BenefitObject|BenefitGetObject = benefits[0];
          benefit.diet = JSON.parse(benefit.diet?? '[]');
          this.benefit = benefit as BenefitObject
          this.benefit_form = BenefitMapperService.model_to_form(this.benefit)
        }
      }
    )
  }

  submit() {
    if (this.benefit_form) {
      const benefit = BenefitMapperService.form_to_model(this.benefit_form)
      const caf = BenefitMapperService.caf_from_form(this.benefit_form)
      if (caf){
        this.fileModelService.post_file_caf(caf).subscribe((fileName)=>
          {
            benefit.caf = fileName.filename;
            this.benefitModelService.post_benefit_self(benefit).subscribe(()=>
                this.router.navigate(['/'+EpvPath.visitor.benefit.detail])
            );
          }
        )
      }else{
        this.benefitModelService.post_benefit_self(benefit).subscribe(()=>
            this.router.navigate(['/'+EpvPath.visitor.benefit.detail])
        );
      }

    }
  }
}
