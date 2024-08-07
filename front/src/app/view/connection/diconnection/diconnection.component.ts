import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../../shared/global.service";
import { Router} from "@angular/router";

@Component({
  selector: 'ep-diconnection',
  templateUrl: './diconnection.component.html',
  styleUrls: ['./diconnection.component.scss']
})
export class DiconnectionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    GlobalService.token = undefined;
    this.router.navigate([''], {queryParams:{message:"utilisateur déconnecté"}});
  }

}
