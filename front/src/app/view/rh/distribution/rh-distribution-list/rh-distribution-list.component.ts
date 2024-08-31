import { Component, OnInit } from '@angular/core';
import {DistributeModelService} from "../../../../http/model/distribute-model/distribute-model.service";
import {ActivatedRoute} from "@angular/router";
import {DistributeAffectedObject} from "../../../../http/model/distribute-model/distributeObject";
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {DistributeMapperService} from "../../../../mapper/distribute-mapper.service";
import {SectorModelService} from "../../../../http/model/sector-model/sector-model.service";
import {GlobalService} from "../../../../shared/global.service";
import {LanguageService} from "../../../../shared/base-shared/language.service";
import {FilterObject} from "../../../../shared/foundation/list/filterObject";

@Component({
  selector: 'epv-rh-distribution-list',
  templateUrl: './rh-distribution-list.component.html',
  styleUrls: ['./rh-distribution-list.component.scss']
})
export class RhDistributionListComponent implements OnInit {
  private distribute ?: DistributeAffectedObject[];
  public listItems: ListObject[] = [];
  public critera: string[] = [
      'distribute.user'
  ];
  public filter: FilterObject[] = [
    {name: 'distribute.state', type:"auto"},
  ]

  constructor(
      private distributeModelService:DistributeModelService,
      private sectorModelService:SectorModelService,
      private route : ActivatedRoute,
      private language : LanguageService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id_sector']) {
        this.sectorModelService.get_one_sector(params['id_sector']).subscribe((sector)=> {
          GlobalService.pageName = `${this.language.resolve('sector.title')} "${sector[0].nom}" : ${this.language.resolve('distribute.list_title')}`
        })
        this.distributeModelService.get_affected(params['id_sector']).subscribe((distribute)=> {
          this.distribute = distribute;

          this.listItems = this.distribute.map(x=>DistributeMapperService.affected_to_list(x));

        })
      }
    })
  }

}
