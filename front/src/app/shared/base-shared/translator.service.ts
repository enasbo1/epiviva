import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  constructor() { }
  echo(value:string|number|undefined , default_value:string = ""):string{
    return value ? value.toString(): default_value;
  }

}
