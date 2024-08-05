import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstancesService {
  //static api_url:string = "http://162.19.243.218:8081/index.php"
  static api_url:string = "http://localhost:8081/index.php";

  constructor() { }
}
