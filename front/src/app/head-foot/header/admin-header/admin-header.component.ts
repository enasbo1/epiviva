import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header.component";
import {NavLink} from "../../navLink";
import {EpvPath} from "../../../view/routes";
import {GlobalService} from "../../../shared/global.service";

@Component({
  selector: 'epv-admin-header',
  templateUrl: './../header.component.html',
  styleUrls: ['./../header.component.scss']
})
export class AdminHeaderComponent extends HeaderComponent implements OnInit {

  override options:string = EpvPath.admin.options;


  override navLinks : NavLink[] = [
    {
      name : "nav.home",
      link : EpvPath.admin.home
    }
  ];

  override ngOnInit(): void {
    if (!GlobalService.token || !Number(GlobalService.currentUser?.status)){
      this.router.navigate(['/'+EpvPath.login]).then()
    }if (
        (Number(GlobalService.currentUser?.status) < 4)
    ){
      this.router.navigate(['/'+EpvPath._403_]).then()
    }
  }

}