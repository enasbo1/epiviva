import { Component, OnInit } from '@angular/core';
import {UserModelService} from "../../../http/model/user-model/user-model.service";
import { Router} from "@angular/router";
import {EpvPath} from "../../routes";

@Component({
  selector: 'epv-cadidate',
  templateUrl: './cadidate.component.html',
  styleUrls: ['./cadidate.component.scss']
})
export class CadidateComponent implements OnInit {

  constructor(
      private userModelService: UserModelService,
      private route: Router,
  ) { }

  ngOnInit(): void {
    this.userModelService.get_self().subscribe(
        (users)=>{
          if (users?.length > 0) {
            if (users[0].id_address){
              this.route.navigate(['/'+EpvPath.visitor.services]).then()
            }else{
              this.route.navigate(['/'+EpvPath.visitor.addresses]).then()
            }
          }
        }
    )
  }

}
