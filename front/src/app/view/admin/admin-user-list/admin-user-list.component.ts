import { Component, OnInit } from '@angular/core';
import {EpvPath} from "../../routes";
import {GlobalService} from "../../../shared/global.service";
import {UserModelService} from "../../../http/model/user-model/user-model.service";
import {FilterObject} from "../../../shared/foundation/list/filterObject";
import {ListObject} from "../../../shared/foundation/list/listObject";
import {UserMapperService} from "../../../mapper/user-mapper.service";

@Component({
  selector: 'epv-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {
  users:ListObject[] = []
  filters:FilterObject[] = [
    {name : 'role', type:'auto'},
  ]
  critera : string[] = [
    'connexion.email',
    'user.name',
    'user.first_name'
  ];

  constructor(private userModelService : UserModelService) { }

  ngOnInit(): void {
    GlobalService.pageName = "user.list";
    this.userModelService.get_user().subscribe((
        users)=>
        this.setUser(
            users.map((user)=>
                UserMapperService.model_to_list(user, '/'+EpvPath.admin.users.details)
            )
        ))
  }

  private setUser(user:ListObject[]):void{
    this.users = user
  }

}
