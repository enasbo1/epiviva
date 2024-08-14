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
        return this.languageService.resolve(value, default_value);
  }

}
