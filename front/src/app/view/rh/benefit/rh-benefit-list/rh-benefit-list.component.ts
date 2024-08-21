import { Component, OnInit } from '@angular/core';
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {FilterObject} from "../../../../shared/foundation/list/filterObject";
import {CandidateModelService} from "../../../../http/model/candidate-model/candidate-model.service";
import {GlobalService} from "../../../../shared/global.service";
import {EpvPath} from "../../../routes";
import {BenefitModelService} from "../../../../http/model/benefit-model/benefit-model.service";
import {BenefitMapperService} from "../../../../mapper/benefit-mapper.service";

@Component({
  selector: 'epv-rh-benefit-list',
  templateUrl: './rh-benefit-list.component.html',
  styleUrls: ['./rh-benefit-list.component.scss']
})
export class RhBenefitListComponent implements OnInit {
  items: ListObject[] = [];
  filter: FilterObject[] = [
    {name:'user.status', type: 'auto', default:'candidate.waiting'},
  ];
  critera:string[] = [
    'Number',
    'service.title',
    'candidate.owner'
  ];

  constructor(
      private benefitModelService:BenefitModelService,
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = 'home.engaged';
    this.benefitModelService.get_benefit().subscribe((benefit)=>
      {
        this.items = benefit.map(x=> BenefitMapperService.model_to_list(x, EpvPath.rh.benefit.detail));
      }
    )
  }

}