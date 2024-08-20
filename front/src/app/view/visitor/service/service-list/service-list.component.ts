import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {ServiceModelService} from "../../../../http/model/service-model/service-model.service";
import {GlobalService} from "../../../../shared/global.service";
import {ServiceMapperService} from "../../../../mapper/service-mapper.service";
import {EpvPath} from "../../../routes";

@Component({
  selector: 'epv-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
  public items:ListObject[] = [];

  constructor(
      private serviceModelService:ServiceModelService,
      private router:Router,
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = 'service-list.title';
    this.serviceModelService.get_service().subscribe(
        (services)=>
            this.items = services.map(
                service=> ServiceMapperService.model_to_list(service, EpvPath.visitor.services.detail)
            )
    )
  }


}
