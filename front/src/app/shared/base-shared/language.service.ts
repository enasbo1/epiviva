import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private productUrl = 'api/lang/**.json';

  constructor(private http:HttpClient) {};
  getJson(language: string): Observable<object>{
    return this.http.get<object>(this.productUrl.replace('**', language)).pipe(
        catchError(this.handelError)
    );
  }
  private handelError(errorMessage: HttpErrorResponse){
    console.error(errorMessage);
    return throwError(()=>errorMessage)
  }}
