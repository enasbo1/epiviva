import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../../../shared/global.service";
import {BenefitModelService} from "../../../../http/model/benefit-model/benefit-model.service";
import {BenefitGetObject, BenefitObject} from "../../../../http/model/benefit-model/benefitObject";
import {RubricObject} from "../../../../shared/base-shared/rubric/rubricObject";
import {BenefitMapperService} from "../../../../mapper/benefit-mapper.service";
import {EpvPath} from "../../../routes";
import {ChatTarget} from "../../../../shared/foundation/chat/chat.component";

@Component({
  selector: 'epv-visitor-benefit-detail',
  templateUrl: './visitor-benefit-detail.component.html',
  styleUrls: ['./visitor-benefit-detail.component.scss']
})
export class VisitorBenefitDetailComponent implements OnInit {
  private benefit?:BenefitObject;
  public benefit_rubric?:RubricObject[];
  public chat_target?: ChatTarget;

  constructor(
      private benefitModelService: BenefitModelService,
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = 'benefit.title'
    this.benefitModelService.get_benefit_self().subscribe((benefits)=>
      {
        const benefit:BenefitObject|BenefitGetObject = benefits[0];
        benefit.diet = JSON.parse(benefit.diet?? '[]');
        this.benefit = benefit as BenefitObject
        this.chat_target = {subject:'benefit', id : this.benefit.id??0};
        this.benefit_rubric = BenefitMapperService.model_to_rubrics(this.benefit)
      }
    )
  }

  protected readonly EpvPath = EpvPath;
}
