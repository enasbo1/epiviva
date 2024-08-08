import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../../shared/global.service";
import { Space_divider } from "../../shared/base-shared/space_divider";
import { SampleListElement } from "../../shared/foundation/list/listObject";
import {Router} from "@angular/router";
import {context_nav} from "./context_nav";

@Component({
  selector: 'epv-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  extends Space_divider implements OnInit {

  public pageTitle: string = '';
  public content: SampleListElement[] = [];

  constructor(private router: Router) {
    super();
  }

  ngOnInit() {
    GlobalService.pageName = "nav.home";
    this.pageTitle = 'nav.home';
    this.update_context_nav();
  }

  get status():string{
    if (document.documentURI.split('/').length>3){
      return document.documentURI.split('/')[3]
    }
    return 'home'
  }

  private update_context_nav():void{
    this.content =  context_nav[this.status]?? []
  }

  bidon(arg : any):void{

  }

  protected readonly GlobalService = GlobalService;
}
