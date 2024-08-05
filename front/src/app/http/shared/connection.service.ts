import {EventEmitter, Injectable} from '@angular/core';
import {RequestService} from "./request.service";
import {FormFieldObject, FormFieldValue} from "../../shared/base-shared/form-field/formFieldObject";
import {catchError, Observable} from "rxjs";
import {GlobalService} from "../../shared/global.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserRecap} from "../model/user-model/userObject";

type WPTokenRequestType = {token?:string, user:UserRecap, message?:string, id?:string}

@Injectable({
  providedIn: 'root'
})
export class ConnectionService extends RequestService{
  public success?:(success:boolean, error?:string)=>void;
  public error?:()=>void;


  connect(connectionForm:FormFieldObject[], success:(success:boolean, message?:string)=>void, error:()=>void){
    this.success = success;
    this.error = error;
    const errorCatch : EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
    errorCatch.subscribe(
      (errorMessage:HttpErrorResponse)=>this.handelError(errorMessage)
    )

    let connectionvalues:{password:FormFieldValue, mail:FormFieldValue} = {
      password:connectionForm.find((x)=>x.name=="password")?._value,
      mail:connectionForm.find((x)=>x.name=="mail")?._value
    };
    this.post(connectionvalues, "connection", errorCatch)
      .subscribe(
      (res:object)=>
        this._success(res as WPTokenRequestType)
    )
  }

  private _success(token_value:WPTokenRequestType):void{
    GlobalService.token = token_value.token;
    GlobalService.currentUser = token_value.user;
    console.log(GlobalService.token);
    if (this.success){
      this.success(true);
    }
  }

  override handelError(errorMessage: HttpErrorResponse): Observable<never> {
    switch (errorMessage.status){
      case 400:
      case 401:
        if (this.success){
          console.log('error')
          this.success(false, errorMessage.error.message)
        }
        break;
      default:
        if (this.error){
          this.error()
        }
        break;
    }
    return super.handelError(errorMessage);
  }

}
