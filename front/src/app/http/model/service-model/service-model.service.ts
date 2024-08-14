import {EventEmitter, Injectable} from '@angular/core';
import {RequestService} from "../../shared/request.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ServiceObject} from "./serviceObject";

@Injectable({
  providedIn: 'root'
})
export class ServiceModelService extends RequestService{

  post_service(content:ServiceObject, errorEvent?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return (this.post(content, 'service', errorEvent));
  }

  get_service():Observable<ServiceObject[]>{
    return (this.get('service') as Observable<ServiceObject[]>);
  }

  get_one_service(number:bigint):Observable<ServiceObject[]>{
    return (this.get_one('service',number) as Observable<ServiceObject[]>);

  }

  update_service(content:ServiceObject):Observable<object>{
    return (this.edit(content, 'service'))
  }

  delete_service(id:bigint):Observable<object>{
    return (this.delete('service',id))
  }
}