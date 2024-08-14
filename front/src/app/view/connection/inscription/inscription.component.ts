import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormFieldObject} from "../../../shared/base-shared/form-field/formFieldObject";
import { FormStepObject } from "../../../shared/base-shared/form-step/formStepObject";
import {Router} from "@angular/router";
import {GlobalService} from "../../../shared/global.service";
import {RegexBase} from "../../../shared/RegexBase";
import {UserModelService} from "../../../http/model/user-model/user-model.service";
import {HttpErrorResponse} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {EpvPath, EpvRolePart} from "../../routes";

@Component({
  selector: 'epv-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  error?:string;
  private nextstep?:EventEmitter<boolean>;
  private errorEvent:EventEmitter<string> = new EventEmitter<string>();

  items:FormStepObject[]=[
    {
      title:"inscription.title",
      errorEvent:this.errorEvent,
      validator:(step:FormStepObject):EventEmitter<boolean>|false=>this.verify(step),
      content:[{
        content:[
          {
            name: "name",
            type: "text",
            placeholder: "*Irénée*",
            title: "user.name",
            instruction: "Please enter your desired username.",
            reg_error: [
              {regex:RegexBase.required, message: '*name required*'},
              {regex:RegexBase.nonum, message: '' },
              {regex:/^.{0,25}$/, message: '*max name size : 25*' }
            ],
          },
          {
            name: "first_name",
            type: "text",
            placeholder: "*du Gardin*",
            title: "user.first_name",
            instruction: "Please enter your desired username.",
            reg_error: [
              {regex:RegexBase.required, message: '*first_name required*'},
              {regex:RegexBase.nonum, message: ''},
              {regex:/^.{0,100}$/, message: '*max firstName size : 100*'}
            ],
          },
          {
            name: "email",
            type: "email",
            placeholder: "*exemple@mail.com*",
            title: "connexion.email",
            instruction: "Please enter a valid email address.",
          },
        ]
      },
      {
        title:'user.credential',
        content:[
          {
            name: "password",
            type: "password",
            placeholder: "*********",
            title: "connexion.password",
            instruction: "Your password must be at least 8 characters long and include a mix of letters and numbers.",
            reg_error: [
                {regex:RegexBase.required, message: '*password required*'},
            ],
          },
          {
            name: "confirm_password",
            type: "password",
            placeholder: "*********",
            title: "connexion.password",
            instruction: "Please confirm your password.",
            reg_error: [
                {regex:RegexBase.required, message: '*password required*'},
            ],
          }
        ]
        }
      ]
    }
  ];

  values?:FormFieldObject[]
  constructor(
      private userModelService:UserModelService,
      private router: Router
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "inscription.title"
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

  verify(step:FormStepObject):EventEmitter<boolean>|false{
    this.error = "...";
    this.nextstep = new EventEmitter<boolean>();
    const connection_error:EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    // on verifie que les deux mot de passe rensegnés correspondent
    const password = step.content[1].content.find(f => f.name === 'password')?._value as string;
    const confirmPassword =  step.content[1].content.find(f => f.name === 'confirm_password')?._value as string;

    if (password !== confirmPassword) {
      this.error = 'inscription.passwords_match_error'
      return false;
    }

    connection_error.subscribe(
        ()=>this.connection_error(),
    )
    this.userModelService.inscrit(
        [...step.content[0].content, ...step.content[1].content],
        connection_error
    ).subscribe(
        (error):void=>
            error?this.fail(error):this.validated()
    )
    return this.nextstep;
  }

  submit(values:FormFieldObject[]) : void {
    this.values = values;
    this.router.navigateByUrl('/'+(EpvRolePart[GlobalService.currentUser?.status?? '0']?? EpvPath.home)).then();
  }

  private validated():void{
    this.nextstep?.emit(true);
    this.error = undefined
  }
}
