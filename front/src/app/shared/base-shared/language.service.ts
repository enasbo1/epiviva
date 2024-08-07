import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {GlobalService} from "../global.service";
import _ from "lodash";

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
}