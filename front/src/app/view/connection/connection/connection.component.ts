import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormFieldObject} from "../../../shared/base-shared/form-field/formFieldObject";
import { FormStepObject } from "../../../shared/base-shared/form-step/formStepObject";
import {ConnectionService} from "../../../http/shared/connection.service";
import {Router} from "@angular/router";
import {GlobalService} from "../../../shared/global.service";
import {EpvPath, EpvRolePart} from "../../routes";

@Component({
  selector: 'epv-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  error?:string;
  errorEvent:EventEmitter<string> = new EventEmitter<string>();
  private nextstep?:EventEmitter<boolean>;

  items:FormStepObject[]=[
    {
      title:"connexion.title",
      errorEvent: this.errorEvent,
      validator:(step:FormStepObject):EventEmitter<boolean>=>this.verify(step),
      content:[
        {
          content:[
            {name:"mail", title: "connexion.email",type:"email", instruction:"your email", placeholder:"*wandermail@mail.vo*"},
            {name:"mdp",title:"connexion.password", type:"password", instruction:"your password", placeholder:"*********"}
          ]
        }
      ]
    }
  ];

  values?:FormFieldObject[]
  constructor(
    private connectionService:ConnectionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "nav.login"
    this.errorEvent.subscribe(
        error=>
        this.error = error
    )
  }

  fail(message:string|undefined):void{
    this.nextstep?.emit(false);
    this.error = message?message:"email or password invalid";
  }

  connection_error():void{
    this.nextstep?.emit(false);
    this.error = "connection api failed"
  }

  verify(step:FormStepObject):EventEmitter<boolean>{
    this.error = "...";
    this.nextstep = new EventEmitter<boolean>();
    this.connectionService.connect(
      step.content[0].content,
      (yes:boolean, error:string|undefined):void=>yes?this.validated():this.fail(error),
      ()=>this.connection_error())
    return this.nextstep;
  }

  submit(values:FormFieldObject[]) : void {
    this.router.navigateByUrl('/'+(EpvRolePart[GlobalService.currentUser?.status?? '0']?? EpvPath.home)).then(()=>
        window.location.reload()
    );

  }

  private validated():void{
    this.nextstep?.emit(true);
    this.error = undefined
  }

  protected readonly EpvPath = EpvPath;
}
