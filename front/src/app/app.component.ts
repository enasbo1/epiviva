import {Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {GlobalService} from "./shared/global.service";
import {WpPath} from "./view/routes";

@Component({
  selector:"ep-root",
  templateUrl:'./app.component.html',
  styleUrls:[
    'app.component.scss'
  ]
})
export class AppComponent implements OnInit, OnChanges{
  pageTitle: string = "wanderPlace";
  title:string = "title 1";

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pageTitle = GlobalService.pageName
  }

  get status():string{
    if (document.documentURI.split('/').length>3){
      return document.documentURI.split('/')[3]
    }
    return ''
  }

  protected readonly GlobalService = GlobalService;
  protected readonly WpPath = WpPath;
}
