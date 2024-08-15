import {Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {GlobalService} from "./shared/global.service";
import {LanguageService} from "./shared/base-shared/language.service";
import _ from "lodash";
import {EpvPath} from "./view/routes";
import {ActivatedRoute} from "@angular/router";

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
  message?:string;

  constructor(
      private languageService: LanguageService,
      private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    GlobalService.pageName = '';
    this.message = undefined;
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
        );
    this.route.queryParams.subscribe(params => {
      if (params['message']){
        this.message = params["message"];
      }else{
        this.message = undefined;
      }
    })
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

  delete_message() {
    this.message = undefined
  }
}
