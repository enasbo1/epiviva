import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserModelService} from "../../../../http/model/user-model/user-model.service";
import {GlobalService} from "../../../../shared/global.service";
import {EpvPath} from "../../../routes";

@Component({
  selector: 'epv-visitor-benefit',
  templateUrl: './visitor-benefit.component.html',
})
export class VisitorBenefitComponent implements OnInit {

  constructor(
      private userModelService: UserModelService,
      private router: Router,
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = 'benefit.title';
    this.userModelService.get_self().subscribe((users)=>
      {
        if (users!=[]){
          if (!users[0].address_id){
            this.router.navigate(['/'+EpvPath.visitor.addresses]).then()
          }
          else if (users[0].benefit_id){
            this.router.navigate(['/'+EpvPath.visitor.benefit.detail]).then()
          }else{
            this.router.navigate(['/'+EpvPath.visitor.benefit.edit]).then()
          }
        }
      }
    )
  }

}
