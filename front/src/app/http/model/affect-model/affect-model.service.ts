import {EventEmitter, Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {RequestService} from "../../shared/request.service";
import {AffectAffectedObject, AffectObject} from "./affectObject";

@Injectable({
  providedIn: 'root'
})
export class AffectModelService extends RequestService{
  post_affect(content:AffectObject, errorEvent?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return (this.post(content, 'affect', errorEvent));
  }

  get_affect():Observable<AffectObject[]>{
    return (this.get('affect') as Observable<AffectObject[]>);
  }

  get_affected(sector_id:number|bigint):Observable<AffectAffectedObject[]>{
    return (this.get_one('affect/affected', sector_id) as Observable<AffectAffectedObject[]>);
  }

  get_sectors(user_id:number|bigint):Observable<AffectAffectedObject[]>{
    return (this.get_one('affect/sector', user_id) as Observable<AffectAffectedObject[]>);
  }

  get_one_affect(number:number|bigint):Observable<AffectObject[]>{
    return (this.get_one('affect',number) as Observable<AffectObject[]>);

  }

  update_affect(content:AffectObject):Observable<object>{
    return (this.edit(content, 'affect'))
  }

  delete_affect(id:bigint|number):Observable<object>{
    return (this.delete('affect',id))
  }

}
