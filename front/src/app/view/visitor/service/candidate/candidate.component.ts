import { Component, OnInit } from '@angular/core';
import {UserModelService} from "../../../../http/model/user-model/user-model.service";
import {Router} from "@angular/router";
import {EpvPath} from "../../../routes";

@Component({
  selector: 'epv-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

  constructor(
      private userModelService: UserModelService,
      private router: Router,
  ) { }

  ngOnInit(): void {
    this.userModelService.get_self().subscribe(
        (users)=>{
          if (users?.length > 0) {
            if (users[0].address_id){
              this.router.navigate(['/'+EpvPath.visitor.services.list]).then()
            }else{
              this.router.navigate(['/'+EpvPath.visitor.addresses], {queryParams:{targetPage:EpvPath.visitor.services.list}}).then()
            }
          }
        }
    )
  }

}
