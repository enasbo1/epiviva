import {EventEmitter, Injectable} from '@angular/core';
import {BenefitGetObject, BenefitObject, BenefitPostObject} from "./benefitObject";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {RequestService} from "../../shared/request.service";

@Injectable({
  providedIn: 'root'
})
export class BenefitModelService extends RequestService{

  post_benefit_self(content:BenefitPostObject, errorEvent?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return (this.post(content, 'benefit/self', errorEvent));
  }

  get_benefit():Observable<BenefitGetObject[]>{
    return (this.get('benefit') as Observable<BenefitGetObject[]>);
  }

  get_benefit_self():Observable<BenefitGetObject[]>{
    return (this.get('benefit/self') as Observable<BenefitGetObject[]>);
  }

  get_one_benefit(number:bigint):Observable<BenefitGetObject[]>{
    return (this.get_one('benefit',number) as Observable<BenefitGetObject[]>);

  }

  update_benefit(content:BenefitObject):Observable<object>{
    return (this.edit(content, 'benefit'))
  }

  delete_benefit(id:bigint|number, errorCatch?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return (this.delete('benefit',id, errorCatch))
  }
}