import {FormFieldObject} from "../form-field/formFieldObject";
import {EventEmitter} from "@angular/core";

export interface FormStepObject{
  title? : string
  content : FormRubricObject[],
  errorEvent? : EventEmitter<string>
  validator? : (step:FormStepObject)=>boolean|EventEmitter<boolean>;
}

export interface FormRubricObject{
  title? : string
  content : FormFieldObject[]
}


