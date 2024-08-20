import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../../../shared/global.service";

@Component({
  selector: 'epv-visitor-benefit-detail',
  templateUrl: './visitor-benefit-detail.component.html',
  styleUrls: ['./visitor-benefit-detail.component.scss']
})
export class VisitorBenefitDetailComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = 'benefit.title'
  }

}
