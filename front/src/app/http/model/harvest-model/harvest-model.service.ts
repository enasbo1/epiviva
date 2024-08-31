import {EventEmitter, Injectable} from '@angular/core';
import {RequestService} from "../../shared/request.service";
import {AddressObject} from "../address-model/addressObject";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {HarvestGetObject, HarvestObject, HarvestPostObject} from "./harvestObject";

@Injectable({
  providedIn: 'root'
})
export class HarvestModelService extends RequestService{

  post_harvest(content:HarvestPostObject, errorEvent?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return (this.post(content, 'harvest', errorEvent));
  }

  get_harvest():Observable<HarvestGetObject[]>{
    return (this.get('harvest') as Observable<HarvestGetObject[]>);
  }

  get_form_sector(sector_id:number|bigint):Observable<HarvestGetObject[]>{
    return (this.get_one('harvest/sector', sector_id) as Observable<HarvestGetObject[]>);
  }

  get_one_harvest(number:number|bigint):Observable<HarvestGetObject[]>{
    return (this.get_one('harvest',number) as Observable<HarvestGetObject[]>);

  }

  update_harvest(content:HarvestPostObject):Observable<object>{
    return (this.edit(content, 'harvest'))
  }

  delete_harvest(id:bigint|number):Observable<object>{
    return (this.delete('harvest',id))
  }

  collect_harvest(id:bigint|number):Observable<object>{
    return (this.edit({id:id}, 'harvest/collect'))
  }

  get_progressing():Observable<HarvestGetObject[]> {
    return (this.get('harvest/progressing')as Observable<HarvestGetObject[]>);
  }
}