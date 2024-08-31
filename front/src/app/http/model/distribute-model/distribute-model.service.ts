import {EventEmitter, Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {RequestService} from "../../shared/request.service";
import {
  DistributeAffectedObject,
  DistributeObject,
  DistributePostObject,
  DistributeSectorObject
} from "./distributeObject";

@Injectable({
  providedIn: 'root'
})
export class DistributeModelService extends RequestService{
  post_distribute(content:DistributePostObject, errorEvent?:EventEmitter<HttpErrorResponse>):Observable<{id:bigint|number}>{
    return (this.post(content, 'distribute', errorEvent)) as Observable<{id:bigint|number}>;
  }

  get_distribute():Observable<DistributeObject[]>{
    return (this.get('distribute') as Observable<DistributeObject[]>);
  }

  get_affected(sector_id:number|bigint):Observable<DistributeAffectedObject[]>{
    return (this.get_one('distribute/affected', sector_id) as Observable<DistributeAffectedObject[]>);
  }

  get_sectors(user_id:number|bigint):Observable<DistributeSectorObject[]>{
    return (this.get_one('distribute/sector', user_id) as Observable<DistributeSectorObject[]>);
  }

  get_one_distribute(number:number|bigint):Observable<DistributeAffectedObject[]>{
    return (this.get_one('distribute',number) as Observable<DistributeAffectedObject[]>);

  }

  update_distribute(content:DistributePostObject):Observable<object>{
    return (this.edit(content, 'distribute'))
  }

  delete_distribute(id:bigint|number):Observable<object>{
    return (this.delete('distribute',id))
  }

  get_self():Observable<DistributeSectorObject[]>{
    return (this.get('distribute/sector/self') as Observable<DistributeSectorObject[]>);
  }

  set_done(id: number|bigint) :Observable<object> {
    return (this.edit({id: id}, 'distribute/set_done') as Observable<object>)
  }
}
