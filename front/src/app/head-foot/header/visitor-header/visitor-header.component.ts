import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header.component";
import {NavLink} from "../../navLink";
import {EpvPath} from "../../../view/routes";
import {GlobalService} from "../../../shared/global.service";

@Component({
  selector: 'epv-visitor-header',
  templateUrl: './../header.component.html',
  styleUrls: ['./../header.component.scss']
})
export class VisitorHeaderComponent extends HeaderComponent implements OnInit {

  override options:string = EpvPath.visitor.options;

  override navLinks : NavLink[] = [
    {
      name : "nav.home",
      link : EpvPath.visitor.home
    }
  ];

  override ngOnInit(): void {
    if (!GlobalService.token){
      this.router.navigate(['/'+EpvPath.login]).then()
    }
  }

}
