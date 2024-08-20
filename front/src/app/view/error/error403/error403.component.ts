import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../../shared/global.service";

@Component({
  selector: 'epv-error403',
  templateUrl: './error403.component.html',
  styleUrls: ['./error403.component.scss']
})
export class Error403Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    GlobalService.pageName = "403"
  }

}
