import { Component, OnInit } from '@angular/core';
import {CandidateMapperService} from "../../../../mapper/candidate-mapper.service";
import {GlobalService} from "../../../../shared/global.service";
import {CandidateModelService} from "../../../../http/model/candidate-model/candidate-model.service";
import {EpvPath} from "../../../routes";
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {FilterObject} from "../../../../shared/foundation/list/filterObject";

@Component({
  selector: 'epv-visitor-candidate-list',
  templateUrl: './visitor-candidate-list.component.html',
  styleUrls: ['./visitor-candidate-list.component.scss']
})
export class VisitorCandidateListComponent implements OnInit {
  items: ListObject[] = [];
  filter: FilterObject[] = [
    {name:'candidate.validation', type: 'auto'},
  ];
  critera:string[] = [
      'number',
      'service'
  ];

  constructor(
      private candidateModelService:CandidateModelService,
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = 'home.engaged';
    this.candidateModelService.get_self_candidate().subscribe((candidatures)=>
        {
          this.items = candidatures.map(x=> CandidateMapperService.model_to_list_from_self(x, EpvPath.visitor.candidated.details));
        }
    )
  }

}
