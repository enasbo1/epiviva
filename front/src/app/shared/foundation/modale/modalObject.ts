import {FormStepObject} from "../../base-shared/form-step/formStepObject";
import {RubricObject} from "../../base-shared/rubric/rubricObject";
import {EventEmitter} from "@angular/core";
import {FormFieldObject} from "../../base-shared/form-field/formFieldObject";

export interface ModalObject {
  visible : boolean;
  options : ModalOption[];
  content : ModalContent;
}

export interface ModalOption{
  name: string;
  sclass?:string;
  action ?: EventEmitter<string>;
  end ?: boolean;
}

export interface ModalContent{
  type:'text'|'image'|'form'|'rubric'|'list'|'void';
  image?: string;
  fileInput?: string;
  form?:{
    fields : FormStepObject;
    submit: EventEmitter<FormFieldObject[]>
  };
  rubric?:RubricObject;
  list?:{
    title?:string,
    content:ModalListObject[]
  }
  text?:string;
}

export interface ModalListObject{
  content:{
    text:string,
    style?:string,
    subtitle?:string,
    submitEvent?:EventEmitter<object|undefined>
  }[]
  object?:object;
}
