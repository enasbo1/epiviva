import { Component, OnInit } from '@angular/core';
import {DistributeAffectedObject, DistributeSectorObject} from "../../../http/model/distribute-model/distributeObject";
import {ListObject} from "../../../shared/foundation/list/listObject";
import {FilterObject} from "../../../shared/foundation/list/filterObject";
import {DistributeModelService} from "../../../http/model/distribute-model/distribute-model.service";
import {SectorModelService} from "../../../http/model/sector-model/sector-model.service";
import {ActivatedRoute} from "@angular/router";
import {LanguageService} from "../../../shared/base-shared/language.service";
import {GlobalService} from "../../../shared/global.service";
import {DistributeMapperService} from "../../../mapper/distribute-mapper.service";
import {EpvPath} from "../../routes";

@Component({
  selector: 'epv-volunteer-distribute-list',
  templateUrl: './volunteer-distribute-list.component.html',
  styleUrls: ['./volunteer-distribute-list.component.scss']
})
export class VolunteerDistributeListComponent implements OnInit {
  private distribute ?: DistributeSectorObject[];
  public listItems: ListObject[] = [];
  public sector?:number|bigint;
  public critera: string[] = [
    'sector.title'
  ];
  public filter: FilterObject[] = [
    {name: 'distribute.state', type:"auto"},
  ]

  constructor(
      private distributeModelService:DistributeModelService,
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = 'volunteer.affect';

    this.distributeModelService.get_self().subscribe((distribute)=> {
      this.distribute = distribute;

      this.listItems = this.distribute.map(x=>DistributeMapperService.sector_to_list(x, EpvPath.volunteer.distribute.details));

    })
  }
}
