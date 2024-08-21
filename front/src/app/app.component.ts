import {Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {GlobalService} from "./shared/global.service";
import {LanguageService} from "./shared/base-shared/language.service";
import {EpvPath, EpvRolePart} from "./view/routes";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageModelService} from "./http/model/message-model/message-model.service";
import {NotifObject} from "./http/model/message-model/messageObject";

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
  private notifs?:NotifObject[];

  get notif():NotifObject|undefined {
    return this.notifs? this.notifs[this.notifs.length-1]:undefined;
  }

  constructor(
      private languageService: LanguageService,
      private messageModelService:MessageModelService,
      private route: ActivatedRoute,
      private router:Router,
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
    this.messageModelService.get_notif().subscribe((notifs)=>
        {
          this.notifs = notifs;
        }
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pageTitle = GlobalService.pageName
  }

  get status():string{
    if (document.documentURI.split('/').length>3){
      const n = document.documentURI.split('/')[3]
      if (['403', '404'].includes(n)){
        return EpvRolePart[GlobalService.currentUser?.status?? '0']?? EpvPath.home
      }
      return n
    }
    return ''
  }

  delete_message() {
    this.message = undefined
  }

  delete_notif(notif: NotifObject) {
    this.notifs?.pop()
    this.messageModelService.set_message_read(notif.id).subscribe(()=>undefined)
  }

  protected readonly GlobalService = GlobalService;
  protected readonly EpvPath = EpvPath;

  navigateTo(notif: NotifObject) {
    if (notif.link){
      this.router.navigate(['/'+notif.link]).then(()=>
          this.notifs=undefined
      );
    }
  }
}
