import { Injectable} from '@angular/core';
import {RequestService} from "../../shared/request.service";
import { Observable} from "rxjs";
import {ConstancesService} from "../../shared/constances.service";
import {GlobalService} from "../../../shared/global.service";

@Injectable({
  providedIn: 'root'
})
export class FileModelService  extends RequestService{
  post_file_caf(content:File):Observable<{filename:string}>{
      return this.post_file(content, 'caf', '/');
  }

  post_file(content:File, filename:string, extentChar:string='.'):Observable<{filename:string}>{
    const formData = new FormData();
    formData.append('input',content);
    return this.httpClient.post(ConstancesService.api_url + "/file/" +filename+extentChar+content.name.replace(/^.*[./]/, ''),
      formData,
      {
          headers:{
              "token":GlobalService.token?GlobalService.token:''
          }
      }) as Observable<{filename:string}>;
  }
}