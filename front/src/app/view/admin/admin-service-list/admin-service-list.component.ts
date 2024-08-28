import { Component, OnInit } from '@angular/core';
import {ListObject} from "../../../shared/foundation/list/listObject";
import {ServiceModelService} from "../../../http/model/service-model/service-model.service";
import {GlobalService} from "../../../shared/global.service";
import {ServiceMapperService} from "../../../mapper/service-mapper.service";
import {EpvPath} from "../../routes";

@Component({
  selector: 'epv-admin-service-list',
  templateUrl: './admin-service-list.component.html',
  styleUrls: ['./admin-service-list.component.scss']
})
export class AdminServiceListComponent implements OnInit {
  public items:ListObject[] = [];

  constructor(
      private serviceModelService:ServiceModelService
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = 'service-list.title';
    this.serviceModelService.get_service().subscribe(
        (services)=>
            this.items = services.map(
                service=> ServiceMapperService.model_to_list(service, EpvPath.admin.services.details)
            )
    )
  }


  protected readonly EpvPath = EpvPath;
}
