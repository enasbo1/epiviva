import { Pipe, PipeTransform } from '@angular/core';
import {GlobalService} from "../global.service";
import _ from "lodash";
import {RegexBase} from "../RegexBase";
import {LanguageService} from "./language.service";

@Pipe({
  name: 'langue'
})
export class LanguePipe implements PipeTransform {
    constructor(private languageService: LanguageService) {
    }

    transform(value: string|number|undefined , default_value:string = ""): string {
        if (GlobalService.languageFile && value){
            if (!this.languageService.get_language(GlobalService.languageFile)){
                this.languageService.reload_language();
            }
            return _.get(
                GlobalService.languageFile,
                value.toString(),
                value.toString().split('.')[-1]
            )
        }

        return value?.toString() ?? default_value;
  }

}
