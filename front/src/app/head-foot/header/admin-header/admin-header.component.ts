import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header.component";
import {NavLink} from "../../navLink";
import {EpvPath} from "../../../view/routes";

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
  }

}