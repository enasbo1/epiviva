import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../../../shared/global.service";
8
@Component({
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {
  public pageTitle: string = '';

  ngOnInit() {
    GlobalService.pageName = "nav.home";
    this.pageTitle = 'nav.home';
  }

    protected readonly GlobalService = GlobalService;
}
