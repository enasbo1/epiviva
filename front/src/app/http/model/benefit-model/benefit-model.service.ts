import {EventEmitter, Injectable} from '@angular/core';
import {BenefitObject} from "./benefitObject";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {RequestService} from "../../shared/request.service";

@Injectable({
  providedIn: 'root'
})
export class BenefitModelService extends RequestService{

  post_benefit_self(content:BenefitObject, errorEvent?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return (this.post(content, 'benefit/self', errorEvent));
  }

  get_benefit():Observable<BenefitObject[]>{
    return (this.get('benefit') as Observable<BenefitObject[]>);
  }

  get_benefit_self():Observable<BenefitObject[]>{
    return (this.get('benefit/self') as Observable<BenefitObject[]>);
  }

  get_one_benefit(number:bigint):Observable<BenefitObject[]>{
    return (this.get_one('benefit',number) as Observable<BenefitObject[]>);

  }

  update_benefit(content:BenefitObject):Observable<object>{
    return (this.edit(content, 'benefit'))
  }

  delete_benefit(id:bigint|number, errorCatch?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return (this.delete('benefit',id, errorCatch))
  }
}