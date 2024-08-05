import {EventEmitter} from "@angular/core";

export interface FilterObject {
  name:string;
  type:"bool"|"choice"|"search"|"auto"|"hided"|"period"|"free";
  choices?:string[];
  set?:boolean;
  required_act?:Act<_FilterObject>;
  default?:string
  upwarp?:EventEmitter<string>

}
export interface _FilterObject extends FilterObject{
  value?:string|boolean;
  set_value?:string;
  choices:string[];
}

export interface Act<T>{
  target?:T;
  text:string;
  clickable_text:string;
  play():void
}
