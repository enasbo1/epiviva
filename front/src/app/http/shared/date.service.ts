import {Injectable, Type} from '@angular/core';
import moment from "moment";
import * as process from "node:process";


interface Period {start:moment.Moment; end: moment.Moment}

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  static FORMAT_API = "MM/DD/YYYY HH:mm:ss";
  static FORMAT_FRONT = "DD/MM/YYYY";
  static FORMAT_TIME = "HH:mm:ss";

  static to_api(date?:Date):string{
    date = date?date:new Date();
    return moment(date).format(this.FORMAT_API);
  }

  static to_front(date?:string|Date, time:boolean=false):string{
    return moment(date).format(this.FORMAT_FRONT + (time?' '+this.FORMAT_TIME:''));
  }

  static isCommonPeriod(dates:Period, period: Period):boolean{
    return (dates.start.isBetween(period.start, period.end, undefined, '[]') ||
      period.start.isBetween(dates.start, dates.end, undefined, '[]')
    );
  }

  static isInPeriod(dates:Period, period: Period):boolean{
    return !(dates.start.isAfter(period.start) && dates.end.isBefore(period.end));
  }

  static front_period_to_period(period:string):Period{
    const n  = period.split(" - ").map(x=> moment(x, DateService.FORMAT_FRONT));
    return {
      start:n[0],
      end:n[1]
    }
  }

  static period_to_string(period:Period):string{
    return DateService.to_front(period.start.toDate()) + " - " + DateService.to_front(period.end.toDate());
  }

  static checkDateStatus(startDate: string | Date, endDate?: string|Date, date: moment.Moment = moment()): string {
    if (!endDate){
      endDate = startDate;
    }
    if (date.isBefore(moment(startDate))) {
      return 'futur';
    } else if (date.isBetween(moment(startDate), moment(endDate), undefined, '[]')) {
      return 'present';
    } else {
      return 'passe';
    }
  }
}
