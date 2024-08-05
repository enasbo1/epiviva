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

  static to_api(date?:Date):string{
    date = date?date:new Date();
    return moment(date).format(this.FORMAT_API);
  }

  static to_front(date?:string|Date):string{
    return moment(date).format(this.FORMAT_FRONT);
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

  static checkDateStatus(startDate: string | undefined, endDate: string | undefined, date: moment.Moment = moment()): string {

    if (date.isBefore(moment(startDate))) {
      return 'futur';
    } else if (date.isBetween(moment(startDate), moment(endDate), undefined, '[]')) {
      return 'présent';
    } else {
      return 'passé';
    }
  }
}
