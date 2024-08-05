import { Injectable } from '@angular/core';
import {_FilterObject} from "./filterObject";
import {ListObjectPropriety} from "./listObject";
import moment from "moment";
import {DateService} from "../../../http/shared/date.service";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  static isConforme(filter?:_FilterObject, property?:ListObjectPropriety):boolean{
    if (property?.value!==undefined && filter?.value!==undefined){
      switch(filter.type){
        case "free":
          const period1 = (property.value as string[]).map(val => val.toString().split(" - ").map(x=> moment(x, DateService.FORMAT_FRONT)));
          const test1 = DateService.front_period_to_period(filter.value?.toString());
          return !period1.find(per => DateService.isCommonPeriod({start:per[0], end:per[1]},  test1));
        case "period":
          const period = DateService.front_period_to_period(property.value?.toString());
          const test = DateService.front_period_to_period(filter.value?.toString());
          return DateService.isInPeriod(period,  test);
        default:
          return  property?.value?.toString().toLowerCase().includes((filter.value?? "").toString().toLowerCase()) ?? false;
      }
    }
    return true;
  }
}
