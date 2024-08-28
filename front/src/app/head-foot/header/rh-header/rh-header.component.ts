import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header.component";
import {NavLink} from "../../navLink";
import {EpvPath} from "../../../view/routes";
import {GlobalService} from "../../../shared/global.service";

@Component({
  selector: 'epv-rh-header',
  templateUrl: './../header.component.html',
  styleUrls: ['./../header.component.scss']
})
export class RhHeaderComponent extends HeaderComponent implements OnInit {

  override options:string = EpvPath.rh.options;

  override home:string = EpvPath.rh.home;

  override navLinks : NavLink[] = [
    {
      name : "nav.home",
      link : EpvPath.rh.home
    }
  ];

  override ngOnInit(): void {
    if (!GlobalService.token || !Number(GlobalService.currentUser?.status)){
      this.router.navigate(['/'+EpvPath.login]).then()
    }if (
        (Number(GlobalService.currentUser?.status) < 3)
    ){
      this.router.navigate(['/'+EpvPath._403_]).then()
    }
  }
}
