import {EventEmitter, Injectable} from '@angular/core';
import {RequestService} from "../../shared/request.service";
import { Observable} from "rxjs";
import {UserGivingObject, UserObject, UserPatch, UserPost} from "./userObject";
import {HttpErrorResponse} from "@angular/common/http";
import {FormFieldObject, FormFieldValue} from "../../../shared/base-shared/form-field/formFieldObject";
import {WPTokenRequestType} from "../../shared/connection.service";
import {GlobalService} from "../../../shared/global.service";

@Injectable({
  providedIn: 'root'
})
export class UserModelService extends RequestService{

  post_user(content:UserObject, errorEvent?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return (this.post(content, 'users', errorEvent));
  }

  get_user():Observable<UserObject[]>{
    return (this.get('users') as Observable<UserObject[]>);
  }

  get_one_user(number:bigint):Observable<UserObject[]>{
    return (this.get_one('users',number) as Observable<UserObject[]>);

  }

  update_user(content:UserPatch):Observable<object>{
    return (this.edit(content, 'users'))
  }

  delete_user(id:bigint):Observable<object>{
    return (this.delete('users',id))
  }

  inscrit(content: FormFieldObject[], connection_error?:EventEmitter<HttpErrorResponse>):EventEmitter<string|undefined> {
    const errorCatch : EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
    const is_error : EventEmitter<string|undefined> = new EventEmitter<string|undefined>();
    errorCatch.subscribe(
        (errorMessage:HttpErrorResponse)=> {
          switch (errorMessage.status){
            case 400:
            case 401:
              if (is_error){
                is_error.emit(errorMessage.error.message)
              }
              break;
            default:
              if (connection_error){
                connection_error.emit(errorMessage)
              }
              break;
          }
          return this.handelError(errorMessage);
        }
    )

    let inscriptionValues:UserPost= {
      nom: content.find((x)=>x.name=="first_name")?._value as string,
      prenom: content.find((x)=>x.name=="name")?._value as string,
      mdp:content.find((x)=>x.name=="password")?._value as string,
      mail:content.find((x)=>x.name=="email")?._value as string

    };
    this.post(inscriptionValues, "users/inscription", errorCatch)
        .subscribe(
            (res:object)=>{
              GlobalService.token = (res as WPTokenRequestType).token;
              GlobalService.currentUser = (res as WPTokenRequestType).user;
              is_error.emit(undefined);
            }

        )
    return is_error
  }

  get_self():Observable<UserObject[]> {
    return (this.get('users/self') as Observable<UserObject[]>);
  }

  get_user_giving() {
    return (this.get('users/giving') as Observable<UserGivingObject[]>);
  }
}
