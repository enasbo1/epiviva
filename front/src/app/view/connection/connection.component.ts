import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormFieldObject} from "../../shared/base-shared/form-field/formFieldObject";
import { FormStepObject } from "../../shared/base-shared/form-step/formStepObject";
import {ConnectionService} from "../../http/shared/connection.service";
import {TranslatorService} from "../../shared/base-shared/translator.service";
import {Router} from "@angular/router";
import * as events from "node:events";

@Component({
  selector: 'ep-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  error?:string;
  private nextstep?:EventEmitter<boolean>;

  items:FormStepObject[]=[
    {
      title:"connection",
      validator:(step:FormStepObject):EventEmitter<boolean>=>this.verify(step),
      content:[
        {
          content:[
            {name:"mail", title: "email",type:"email", instruction:"your email", placeholder:"wandermail@mail.vo"},
            {name:"password",title:"password", type:"password", instruction:"your password", placeholder:"*******"}
          ]
        }
      ]
    }
  ];

  values?:FormFieldObject[]
  constructor(
    private connectionService:ConnectionService,
    public translator:TranslatorService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  fail(message:string|undefined):void{
    console.log("fail");
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
    this.values = values;
    this.router.navigate([""],{queryParams:{message:"utilisateur connecté"}});

  }

  private validated():void{
    this.nextstep?.emit(true);
    this.error = undefined
  }
}
