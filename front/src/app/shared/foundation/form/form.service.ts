import {EventEmitter, Injectable} from '@angular/core';
import {
  FormFieldObject,
  FormFieldType,
  FormFieldTypeList,
  FormFieldValue
} from "../../base-shared/form-field/formFieldObject";
import {DateService} from "../../../http/shared/date.service";
import {ModaleService} from "../modale/modale.service";
import {FormStepObject} from "../../base-shared/form-step/formStepObject";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  static require_values(formFields:FormFieldObject[], names:string[]):string|void{
    for (const name of names) {
      if (!FormService.get_value(formFields, name)){
        return name
      }
    }
  }

  static get_period(formFields:FormFieldObject[],name:string, defaut?:Date[]):{start:string, end:string}{
    let dates:Date[]|undefined = formFields.find((form:FormFieldObject):boolean=>form.name===name)?._values?.map(x=> x?? new Date());
    dates = dates?dates:defaut;
    if (dates){
      return {
        start:DateService.to_api(dates[0]),
        end :DateService.to_api(dates[1])
      }
    }else{
      return {
        start:DateService.to_api(),
        end :DateService.to_api()
      }
    }
  }

  static get_value(formFields:FormFieldObject[],name:string, defaut?:FormFieldValue):FormFieldValue{
    const v:FormFieldValue = formFields.find((form:FormFieldObject):boolean=>form.name===name)?._value
    return v?v:defaut;
  }

  static edit_field(formField:FormFieldObject):void{
    const form:FormStepObject ={
      content: [
        {
          content: this.edit_field_forms_field(formField)
        }
      ],
      errorEvent: undefined,
      title: "",
    }

    ModaleService.createFormModal(
      form
    ).subscribe(
      (fields:FormFieldObject[])=>{
        formField.name = FormService.get_value(fields, 'name', formField.name) as string;
        formField.title = FormService.get_value(fields, 'title', formField.title) as string|undefined;
        formField.sclass = FormService.get_value(fields, 'sclass', formField.sclass) as string|undefined;
        formField.type = FormService.get_value(fields, 'type', formField.type) as FormFieldType;
        formField.placeholder = FormService.get_value(fields, 'placeholder', formField.placeholder) as string|undefined;
        formField.default = FormService.get_value(fields, 'default', formField.default) as string|undefined;
        formField.instruction = FormService.get_value(fields, 'instruction', formField.instruction) as string|undefined;
        formField.choices = (FormService.get_value(fields, 'choices', formField.choices?.join(', ')?? '') as string|undefined)?.split(/, */);
        formField.max = FormService.get_value(fields, 'max', formField.max) as Date|undefined;
        formField.min = FormService.get_value(fields, 'min', formField.min) as Date|undefined;
        formField.step = FormService.get_value(fields, 'step', formField.step) as number|undefined;
        if (formField.number_limit){
          formField.number_limit.max = FormService.get_value(fields, 'number_max', formField.number_limit?.max) as number|undefined;
          formField.number_limit.min = FormService.get_value(fields, 'number_min', formField.number_limit?.min) as number|undefined;

        }
        formField._value = formField.default;
      }
    )
  }

  static edit_field_forms_field(formField:FormFieldObject):FormFieldObject[]{

    const fields: FormFieldObject[] = [
      { name: "name", type: "text", placeholder: "name", title: "Name", default: formField.name },
      { name: "title", type: "text", placeholder: "title", title: "Title", default: formField.title },
      { name: "placeholder", type: "text", placeholder: "placeholder", title: "Placeholder", default: formField.placeholder },
      { name: "default", type: "text", placeholder: "default value", title: "Default Value", default: formField.default },
      { name: "instruction", type: "longtext", placeholder: "instruction", title: "Instruction", default: formField.instruction },
    ];

    switch (formField.type){
      case "text":
      case "url":
      case "longtext":
      case "email":
      case "password":
        break;
      case "num":
        fields.push(
          { name: "step", type: "num", placeholder: "step", title: "Step", default: formField.step },
          { name: "number_max", type: "num", placeholder: "number max", title: "Number Max", default: formField.number_limit?.max},
          { name: "number_min", type: "num", placeholder: "number min", title: "Number Min", default: formField.number_limit?.min}
      )
        break;
      case "date":
      case "period":
        fields.push(
          { name: "max", type: "date", placeholder: "max date", title: "Max Date", default: DateService.to_front(formField.max) },
          { name: "min", type: "date", placeholder: "min date", title: "Min Date", default: DateService.to_front(formField.min) },
        )
        break;
      case "dropdown":
        fields.push(
          { name: "choices", type: "longtext", placeholder: "choices", title: "Choices", default: formField.choices ? formField.choices.join(', ') : '' }
        )
        break;


    }
    return fields
  }
}
