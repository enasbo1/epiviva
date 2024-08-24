import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../../../shared/global.service";
import {UserModelService} from "../../../../http/model/user-model/user-model.service";
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {UserMapperService} from "../../../../mapper/user-mapper.service";
import {EpvPath} from "../../../routes";

@Component({
  selector: 'epv-rh-gift-list',
  templateUrl: './rh-gift-list.component.html',
  styleUrls: ['./rh-gift-list.component.scss']
})
export class RhGiftListComponent implements OnInit {

  public items:ListObject[] = [];

  constructor(
      private userModelService: UserModelService,
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = 'gift.giver'
    this.userModelService.get_user_giving().subscribe(users=>
      {
        this.items = users.map(x=>UserMapperService.giving_to_list(x, '/'+EpvPath.rh.gift.details));
      }
    )
  }

}
