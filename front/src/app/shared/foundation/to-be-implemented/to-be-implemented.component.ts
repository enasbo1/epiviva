import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../global.service";

@Component({
  selector: 'epv-to-be-implemented',
  templateUrl: './to-be-implemented.component.html',
  styleUrls: ['./to-be-implemented.component.scss']
})
export class ToBeImplementedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    GlobalService.pageName = "TBI"
  }

}
