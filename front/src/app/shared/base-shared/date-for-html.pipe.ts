import { Pipe, PipeTransform } from '@angular/core';
import moment from "moment";

@Pipe({
  name: 'dateForHtml'
})
export class DateForHtmlPipe implements PipeTransform {

  transform(value: Date|undefined, time:boolean|undefined = false): string {
    if (value)
      if (time)
        return moment(value).format('YYYY-MM-DD HH:mm:ss')
      else
        return moment(value).format('YYYY-MM-DD')
    else
      return "";
  }

}
