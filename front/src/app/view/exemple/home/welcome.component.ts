import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../../../shared/global.service";
import { TranslatorService } from "../../../shared/base-shared/translator.service";

@Component({
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {
  public pageTitle: string = '';

  constructor(protected translator: TranslatorService) { }

  ngOnInit() {
    GlobalService.pageName = "Home";  
    this.pageTitle = GlobalService.pageName;  
  }
}
