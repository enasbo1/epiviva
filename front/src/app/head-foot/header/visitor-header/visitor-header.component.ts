import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header.component";
import {NavLink} from "../../navLink";
import {EpvPath} from "../../../view/routes";

@Component({
  selector: 'epv-visitor-header',
  templateUrl: './../header.component.html',
  styleUrls: ['./../header.component.scss']
})
export class VisitorHeaderComponent extends HeaderComponent implements OnInit {

  override navLinks : NavLink[] = [
    {
      name : "nav.home",
      link : EpvPath.visitor.home
    }
  ];

  override ngOnInit(): void {
  }

}
