import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header.component";
import {NavLink} from "../../navLink";
import {EpvPath} from "../../../view/routes";

@Component({
  selector: 'epv-rh-header',
  templateUrl: './../header.component.html',
  styleUrls: ['./../header.component.scss']
})
export class RhHeaderComponent extends HeaderComponent implements OnInit {

  override options:string = EpvPath.rh.options;


  override navLinks : NavLink[] = [
    {
      name : "nav.home",
      link : EpvPath.rh.home
    }
  ];

  override ngOnInit(): void {
  }
}
