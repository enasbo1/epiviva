import {Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {GlobalService} from "./shared/global.service";
import {LanguageService} from "./shared/base-shared/language.service";
import _ from "lodash";
import {EpvPath} from "./view/routes";

@Component({
  selector:"epv-root",
  templateUrl:'./app.component.html',
  styleUrls:[
    'app.component.scss'
  ]
})
export class AppComponent implements OnInit, OnChanges{
  pageTitle: string = "title";
  title:string = "title 1";

  constructor(
      private languageService: LanguageService,
  ) {

  }

  ngOnInit(): void {
    GlobalService.pageName = '';
    this.languageService.getJson(GlobalService.language)
        .subscribe(
          file=>{
            if (this.languageService.get_language(GlobalService.languageFile)
                !==
                this.languageService.get_language(file)){
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
    protected readonly EpvPath = EpvPath;
}
