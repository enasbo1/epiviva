import {EventEmitter, Injectable} from '@angular/core';
import {RequestService} from "../../shared/request.service";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {ConstancesService} from "../../shared/constances.service";
import {GlobalService} from "../../../shared/global.service";

@Injectable({
  providedIn: 'root'
})
export class FileModelService  extends RequestService{
  post_file_caf(content:File, errorEvent?:EventEmitter<HttpErrorResponse>):EventEmitter<{filename:string}>{
    const ret = new EventEmitter<{filename:string}>();
    content.text().then(text=>{
        console.log(text);
        (this.httpClient.post(ConstancesService.api_url + "/" +'file/caf/'+content.type.replace(/^.*[./]/, ''),
            text,
            {
              headers:{
                "token":GlobalService.token?GlobalService.token:''
              }
            }) as Observable<{filename:string}>).subscribe((value)=>
            ret.emit(value)
        )
      }
    )
    return ret;

  }

  post_file(content:File, filename:string, errorEvent?:EventEmitter<HttpErrorResponse>):Observable<{filename:string}>{
    return (this.post(content, 'file/'+filename, errorEvent)) as Observable<{filename:string}>;
  }
}