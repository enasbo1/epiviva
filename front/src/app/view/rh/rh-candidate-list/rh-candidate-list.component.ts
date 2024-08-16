import { Component, OnInit } from '@angular/core';
import {ListObject} from "../../../shared/foundation/list/listObject";
import {FilterObject} from "../../../shared/foundation/list/filterObject";
import {CandidateModelService} from "../../../http/model/candidate-model/candidate-model.service";
import {GlobalService} from "../../../shared/global.service";
import {CandidateMapperService} from "../../../mapper/candidate-mapper.service";
import {EpvPath} from "../../routes";

@Component({
  selector: 'epv-rh-candidate-list',
  templateUrl: './rh-candidate-list.component.html',
  styleUrls: ['./rh-candidate-list.component.scss']
})
export class RhCandidateListComponent implements OnInit {
  items: ListObject[] = [];
  filter: FilterObject[] = [
    {name:'candidate.validation', type: 'auto'},
  ];
  critera:string[] = [
    'Number',
    'Service',
    'candidate.owner'
  ];

  constructor(
      private candidateModelService:CandidateModelService
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = 'home.engaged';
    this.candidateModelService.get_candidate().subscribe((candidatures)=>
        {
          this.items = candidatures.map(x=> CandidateMapperService.model_to_list(x, EpvPath.rh.candidate.details));
        }
    )
  }

}
