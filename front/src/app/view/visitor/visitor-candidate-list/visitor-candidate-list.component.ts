import { Component, OnInit } from '@angular/core';
import {ListObject} from "../../../shared/foundation/list/listObject";
import {GlobalService} from "../../../shared/global.service";
import {CandidateModelService} from "../../../http/model/candidate-model/candidate-model.service";
import {CandidateMapperService} from "../../../mapper/candidate-mapper.service";
import {EpvPath} from "../../routes";

@Component({
  selector: 'epv-visitor-candidate-list',
  templateUrl: './visitor-candidate-list.component.html',
  styleUrls: ['./visitor-candidate-list.component.scss']
})
export class VisitorCandidateListComponent implements OnInit {
  items: ListObject[] = [];

  constructor(
      private candidateModelService:CandidateModelService
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
