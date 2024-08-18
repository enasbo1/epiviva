import {Injectable} from '@angular/core';
import {ModalObject} from "./foundation/modale/modalObject";
import {WP_global} from "./sharedGlobal";
import {UserObject, UserRecap} from "../http/model/user-model/userObject";
import {LanguageService} from "./base-shared/language.service";

type cookiesType = {token?:string}

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor() { }
  private static get cookie():cookiesType{
    try {
      return JSON.parse(document.cookie);
    }catch(a){
      this.cookie = {};
      return {};
    }
  }

  private static set cookie(cookie:cookiesType){
    document.cookie = JSON.stringify(cookie);
  }

  public static get token():string|undefined{
    const token:string|null = sessionStorage.getItem('token');
    return token?? undefined;
  }

  public static set token(token:string|undefined){
    sessionStorage.setItem('token', token?token:'');
  }

  public static set currentUser(user:UserRecap|undefined){
    sessionStorage.setItem('user',user?JSON.stringify(user):'')
  }

  public static get currentUser():UserRecap|undefined{
    const user:string|null = sessionStorage.getItem('user');
    return user?JSON.parse(user):undefined;

  }

  public static get modalCurrent():ModalObject|undefined{
    return WP_global.modalCurrent;
  }

  public static set modalCurrent(modal:ModalObject|undefined){
    WP_global.modalCurrent = modal
  }

  public static get pageName():string{
    return WP_global.pageTitle;
  }
  public static set pageName(name:string){
    WP_global.pageTitle = name;
  }

  public static set language(lang:string){
    sessionStorage.setItem('langName',lang);
  }

  public static get language():string{
    return sessionStorage.getItem('langName')?? 'fr';
  }

  public static get languageFile():object{
    const languageFile:string|null = sessionStorage.getItem('language');
    return JSON.parse(languageFile?? "{}");
  }

  public static set languageFile(languageFile:object){
    sessionStorage.setItem('language',languageFile?JSON.stringify(languageFile):'')
  }
}
