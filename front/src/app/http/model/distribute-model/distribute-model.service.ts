import {EventEmitter, Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {RequestService} from "../../shared/request.service";
import {DistributeAffectedObject, DistributeObject, DistributePostObject} from "./distributeObject";

@Injectable({
  providedIn: 'root'
})
export class DistributeModelService extends RequestService{
  post_distribute(content:DistributePostObject, errorEvent?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return (this.post(content, 'distribute', errorEvent));
  }

  get_distribute():Observable<DistributeObject[]>{
    return (this.get('distribute') as Observable<DistributeObject[]>);
  }

  get_affected(sector_id:number|bigint):Observable<DistributeAffectedObject[]>{
    return (this.get_one('distribute/affected', sector_id) as Observable<DistributeAffectedObject[]>);
  }

  get_sectors(user_id:number|bigint):Observable<DistributeAffectedObject[]>{
    return (this.get_one('distribute/sector', user_id) as Observable<DistributeAffectedObject[]>);
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

}
