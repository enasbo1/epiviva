import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {RequestService} from "../../shared/request.service";
import {SectorObject} from "./sectorObject";

@Injectable({
  providedIn: 'root'
})
export class SectorModelService extends RequestService{
  get_sector():Observable<SectorObject[]>{
    return (this.get('sector') as Observable<SectorObject[]>);
  }

  get_one_sector(number:bigint):Observable<SectorObject[]>{
    return (this.get_one('sector',number) as Observable<SectorObject[]>);

  }

  update_sector(content:SectorObject):Observable<object>{
    return (this.edit(content, 'sector'))
  }

  delete_sector(id:bigint|number, errorCatch?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return (this.delete('sector',id, errorCatch))
  }

  post_sector(sector: SectorObject):Observable<object> {
    return (this.post(sector,'sector'))
  }
}