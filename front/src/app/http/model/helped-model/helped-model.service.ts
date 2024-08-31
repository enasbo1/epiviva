import {EventEmitter, Injectable} from '@angular/core';
import {RequestService} from "../../shared/request.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {BenefitGetHelpedObject, HelpedObject, HelpedPost} from "./helpedObject";

@Injectable({
  providedIn: 'root'
})
export class HelpedModelService extends RequestService{
  post_helped(content:HelpedPost, errorEvent?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return (this.post(content, 'helped', errorEvent));
  }

  get_helped():Observable<HelpedObject[]>{
    return (this.get('helped') as Observable<HelpedObject[]>);
  }

  get_benefit(distribute_id:number|bigint):Observable<BenefitGetHelpedObject[]>{
    return (this.get_one('helped/benefit', distribute_id) as Observable<BenefitGetHelpedObject[]>);
  }

  get_one_helped(number:number|bigint):Observable<HelpedObject[]>{
    return (this.get_one('helped',number) as Observable<HelpedObject[]>);

  }

  delete_helped(id:bigint|number):Observable<object>{
    return (this.delete('helped',id))
  }
}
