import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../../shared/global.service";
import { Router} from "@angular/router";

@Component({
  selector: 'epv-diconnection',
  templateUrl: './diconnection.component.html',
  styleUrls: ['./diconnection.component.scss']
})
export class DiconnectionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    GlobalService.token = undefined;
    GlobalService.currentUser = undefined;
    this.router.navigate(['']).then();
  }

}
