import {EventEmitter, Injectable} from '@angular/core';
import {RequestService} from "../../shared/request.service";
import { Observable} from "rxjs";
import {UserObject} from "./userObject";
import {HttpErrorResponse} from "@angular/common/http";

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

  update_user(content:UserObject):Observable<object>{
    return (this.edit(content, 'users'))
  }

  delete_user(id:bigint):Observable<object>{
    return (this.delete('users',id))
  }
}
