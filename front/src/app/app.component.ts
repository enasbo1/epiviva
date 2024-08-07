import {Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {GlobalService} from "./shared/global.service";
import {LanguageService} from "./shared/base-shared/language.service";

@Component({
  selector:"ep-root",
  templateUrl:'./app.component.html',
  styleUrls:[
    'app.component.scss'
  ]
})
export class AppComponent implements OnInit, OnChanges{
  pageTitle: string = "Epivia";
  title:string = "title 1";

  constructor(
      private languageService: LanguageService,
  ) {

  }

  ngOnInit(): void {
    this.languageService.getJson(GlobalService.language)
        .subscribe(
          file=>{
            if (GlobalService.languageFile=={}){
              GlobalService.languageFile = file
              location.reload()
            }else{
              GlobalService.languageFile = file
            }
          }
        )
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
}
