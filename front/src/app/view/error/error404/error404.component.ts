import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../../shared/global.service";

@Component({
  selector: 'epv-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    GlobalService.pageName = "404"
  }

}
