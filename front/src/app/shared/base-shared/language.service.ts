import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {GlobalService} from "../global.service";
import _ from "lodash";
import {RegexBase} from "../RegexBase";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private productUrl = 'api/lang/**.json';

  constructor(private http: HttpClient) {
  };

  getJson(language: string): Observable<object> {
    return this.http.get<object>(this.productUrl.replace('**', language)).pipe(
        catchError(this.handelError)
    );
  }

  private handelError(errorMessage: HttpErrorResponse) {
    console.error(errorMessage);
    return throwError(() => errorMessage)
  }

  public get_language(file:object):string|void{
    return _.get(file, 'language');
  }

  public reload_language():void{
    this.getJson(GlobalService.language)
        .subscribe(
            file=>{
                GlobalService.languageFile = file
                if (this.get_language(file)){
                  location.reload()
                }
            }
        )
  }

  public resolve(value: string|number|undefined , default_value:string = ""):string{
      if (GlobalService.languageFile && value){
          if (!this.get_language(GlobalService.languageFile)){
              this.reload_language();
          }
      }
      return LanguageService.static_resolve(value, default_value);
  }

  static static_resolve(value: string|number|undefined , default_value:string = ""):string{
      if (value && /^\*.*\*$/.test(value.toString())){
          return value.toString().replace(/\*$/, '').replace(/^\*/, '');
      }
      if (GlobalService.languageFile && value){
          const n = value.toString().split('.');
          const d = RegexBase.lang_path.test(value.toString())?n[n.length - 1]:value.toString()
          const v =  _.get(
              GlobalService.languageFile,
              value.toString(),
              d
          );
          return typeof v === "string" ? v : d;
      }

      return value?.toString() ?? default_value;
  }
}