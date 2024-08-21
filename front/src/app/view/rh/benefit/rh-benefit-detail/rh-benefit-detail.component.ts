import { Component, OnInit } from '@angular/core';
import {BenefitGetObject, BenefitObject} from "../../../../http/model/benefit-model/benefitObject";
import {RubricObject} from "../../../../shared/base-shared/rubric/rubricObject";
import {ChatTarget} from "../../../../shared/foundation/chat/chat.component";
import {BenefitModelService} from "../../../../http/model/benefit-model/benefit-model.service";
import {GlobalService} from "../../../../shared/global.service";
import {BenefitMapperService} from "../../../../mapper/benefit-mapper.service";
import {EpvPath} from "../../../routes";
import {ActivatedRoute, Router} from "@angular/router";
import {UserRecap} from "../../../../http/model/user-model/userObject";
import {UserMapperService} from "../../../../mapper/user-mapper.service";

@Component({
  selector: 'epv-rh-benefit-detail',
  templateUrl: './rh-benefit-detail.component.html',
  styleUrls: ['./rh-benefit-detail.component.scss']
})
export class RhBenefitDetailComponent implements OnInit {
  public benefit?:BenefitObject;
  public benefit_rubric?:RubricObject[];
  public chat_target?: ChatTarget;

  constructor(
      private benefitModelService: BenefitModelService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = 'benefit.title'
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.benefitModelService.get_one_benefit(params['id']).subscribe((benefits)=>
            {
              const benefit:BenefitObject|BenefitGetObject = benefits[0];
              const user:UserRecap = benefits[0].user;
              benefit.diet = JSON.parse(benefit.diet?? '[]');
              this.benefit = benefit as BenefitObject
              this.chat_target = {subject:'benefit', id : this.benefit.id??0};
              this.benefit_rubric = [
                  UserMapperService.modelRecap_to_rubric(user),
                  ...BenefitMapperService.model_to_rubrics(this.benefit)
              ]
            }
        )
      }
    })

  }
  validate() {
    if (this.benefit && this.benefit.validated!=='valid') {
      this.benefitModelService.validate_benefit(this.benefit.id ?? 0).subscribe(()=>
          {
            this.router.navigate(
                ['/'+EpvPath.rh.benefit.list],
                {queryParams:{message:"benefit.validateMessage"}}
            ).then();
          }
      )
    }
  }

  reject() {
    if (this.benefit  && this.benefit.validated!=='reject') {
      this.benefitModelService.reject_benefit(this.benefit.id ?? 0).subscribe(()=>
          {
            this.router.navigate(
                ['/'+EpvPath.rh.benefit.list],
                {queryParams:{message:"benefit.rejectMessage"}}
            ).then();
          }
      )
    }
  }

  protected readonly EpvPath = EpvPath;
}
