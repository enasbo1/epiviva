import {EventEmitter, Injectable} from '@angular/core';
import {RequestService} from "../../shared/request.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {AddressObject} from "./addressObject";

@Injectable({
  providedIn: 'root'
})
export class AddressModelService extends RequestService{

  edit_userAddress(content:AddressObject, errorEvent?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return (this.post(content, 'address/user'));
  }

  post_address(content:AddressObject, errorEvent?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return (this.post(content, 'address', errorEvent));
  }

  get_address():Observable<AddressObject[]>{
    return (this.get('address') as Observable<AddressObject[]>);
  }

  get_one_address(number:number|bigint):Observable<AddressObject[]>{
    return (this.get_one('address',number) as Observable<AddressObject[]>);

  }

  update_address(content:AddressObject):Observable<object>{
    return (this.edit(content, 'address'))
  }

  delete_address(id:bigint):Observable<object>{
    return (this.delete('address',id))
  }
}
