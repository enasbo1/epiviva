import { Component, OnInit } from '@angular/core';
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {FilterObject} from "../../../../shared/foundation/list/filterObject";
import {UserModelService} from "../../../../http/model/user-model/user-model.service";
import {GlobalService} from "../../../../shared/global.service";
import {UserMapperService} from "../../../../mapper/user-mapper.service";
import {EpvPath} from "../../../routes";

@Component({
  selector: 'epv-rh-volunteer-list',
  templateUrl: './rh-volunteer-list.component.html',
  styleUrls: ['./rh-volunteer-list.component.scss']
})
export class RhVolunteerListComponent implements OnInit {
  users:ListObject[] = []
  filters:FilterObject[] = [
    {name : 'role', type:'auto', default:'user.roles.volunteer'},
  ]
  critera : string[] = [
    'connexion.email',
    'user.name',
    'user.first_name'
  ];

  constructor(private userModelService : UserModelService) { }

  ngOnInit(): void {
    GlobalService.pageName = "volunteer.username";
    this.userModelService.get_volunteer().subscribe((
        users)=>
        this.setUser(
            users.map((user)=>
                UserMapperService.volunteer_to_list(user, '/'+EpvPath.rh.volunteer.details)
            )
        ))
  }

  private setUser(user:ListObject[]):void{
    this.users = user
  }

}
