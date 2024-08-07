import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../../shared/global.service";

@Component({
  selector: 'epv-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public pageTitle: string = '';

  ngOnInit() {
    GlobalService.pageName = "nav.home";
    this.pageTitle = 'nav.home';
  }

  get status():string{
    if (document.documentURI.split('/').length>3){
      return document.documentURI.split('/')[3]
    }
    return ''
  }
}
