import {EventEmitter, Injectable} from '@angular/core';
import {GlobalService} from "../../global.service";
import {ModalObject} from "./modalObject";
import {FormFieldObject} from "../../base-shared/form-field/formFieldObject";
import {FormStepObject} from "../../base-shared/form-step/formStepObject";
import {RubricObject} from "../../base-shared/rubric/rubricObject";

@Injectable({
  providedIn: 'root'
})
export class ModaleService {

  constructor() { }


  static openModal(modal:ModalObject):void{
    modal.visible = true;
    GlobalService.modalCurrent = modal;
  }
  static createValidationModal(text:string):EventEmitter<'Oui'|'Non'> {
    let event:EventEmitter<string> = new EventEmitter<string>();
    ModaleService.openModal({
      visible:true,
      options: [
        {
          name: "Non",
          end : true,
          action:event
        },
        {
          name: "Oui",
          sclass:'hover-0 colored-red',
          end : true,
          action:event
        }
      ],
      content: {
        type:"text",
        text:text,
      }
    })
    return <EventEmitter<'Oui'|'Non'>>event;
  }
  static createTextModal(text:string):EventEmitter<string> {
    let event:EventEmitter<string> = new EventEmitter<string>();
    ModaleService.openModal({
      visible:true,
      options: [
        {
          name: "quitter",
          end : true,
          action:event
        }
      ],
      content: {
        type:"text",
        text:text,
      }
    })
    return event;
  }

  static createFormModal(form:FormStepObject):EventEmitter<FormFieldObject[]> {
    let event:EventEmitter<FormFieldObject[]> = new EventEmitter<FormFieldObject[]>();
    ModaleService.openModal({
      visible:true,
      options: [],
      content: {
        type:"form",
        form:{
          fields:form,
          submit:event
        },
      }
    })
    return event;
  }

  static createRubricModal(rubric: RubricObject):EventEmitter<string> {
    let event:EventEmitter<string> = new EventEmitter<string>();
    ModaleService.openModal({
      visible:true,
      options: [
        {
          name: "quitter",
          end : true,
          action : event
        }
      ],
      content: {
        type:"rubric",
        rubric:rubric,
      }
    })
    return event;
  }

  static createImageModal(image:string):EventEmitter<string> {
    let event:EventEmitter<string> = new EventEmitter<string>();
    ModaleService.openModal({
      visible:true,
      options: [
        {
          name: "quitter",
          end : true,
          action : event
        }
      ],
      content: {
        type:"image",
        image:image,
      }
    })
    return event;
  }
}
