import {EventEmitter, Injectable} from '@angular/core';
import {BenefitGetLargeObject, BenefitGetObject, BenefitObject, BenefitPostObject} from "./benefitObject";
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

  get_benefit():Observable<BenefitGetLargeObject[]>{
    return (this.get('benefit') as Observable<BenefitGetLargeObject[]>);
  }

  get_benefit_self():Observable<BenefitGetLargeObject[]>{
    return (this.get('benefit/self') as Observable<BenefitGetLargeObject[]>);
  }

  get_from_sector(id:bigint|number):Observable<BenefitGetLargeObject[]>{
    return (this.get_one('benefit/sector', id) as Observable<BenefitGetLargeObject[]>);
  }

  get_benefit_valid():Observable<BenefitGetLargeObject[]>{
    return (this.get('benefit/valid') as Observable<BenefitGetLargeObject[]>);
  }

  get_one_benefit(number:bigint|number):Observable<BenefitGetLargeObject[]>{
    return (this.get_one('benefit',number) as Observable<BenefitGetLargeObject[]>);

  }

  update_benefit(content:BenefitObject):Observable<object>{
    return (this.edit(content, 'benefit'))
  }

  delete_benefit(id:bigint|number, errorCatch?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return (this.delete('benefit',id, errorCatch))
  }

  validate_benefit(id: number | bigint): Observable<object> {
    return (this.edit({id:id}, `benefit/validate`))
  }

  reject_benefit(id: number | bigint) {
    return (this.edit({id:id}, `benefit/reject`))
  }

  unAffect_benefit(id: number | bigint) {
    return (this.edit({id:id}, `benefit/fire`))
  }

  affect_benefit(id: number | bigint, sector:number|bigint) {
    return (this.edit({id:id, sector_id:sector}, `benefit/affect`))
  }
}