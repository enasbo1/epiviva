import { Pipe, PipeTransform } from '@angular/core';
import {GlobalService} from "../global.service";
import _ from "lodash";

@Pipe({
  name: 'langue'
})
export class LanguePipe implements PipeTransform {

    transform(value: string|number|undefined , default_value:string = ""): string {
        if (GlobalService.languageFile && value){
            return  _.get(GlobalService.languageFile, value.toString()) ?? value.toString() ?? default_value;
        }

        return value?.toString() ?? default_value;
  }

}
