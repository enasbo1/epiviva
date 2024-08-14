import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../global.service";
import {ModalObject, ModalOption} from "./modalObject";
import {FormFieldObject} from "../../base-shared/form-field/formFieldObject";

@Component({
  selector: 'epv-modale',
  templateUrl: './modale.component.html',
  styleUrls: ['./modale.component.scss']
})
export class ModaleComponent implements OnInit {
  private defaultModal:ModalObject={
    visible:false,
    options:[],
    content:{type:'void'}
  }

  ngOnInit(): void {
  }

  public get modalObject():ModalObject{
    return GlobalService.modalCurrent?GlobalService.modalCurrent:this.defaultModal;
  }

  submit(option:ModalOption):void{
    if (option.end){
      this.modalObject.visible = false;
    }
    option.action?.emit(option.name);
  }

  submit_form(values:FormFieldObject[]):void{
    this.modalObject.visible = false;
    this.modalObject.content.form?.submit.emit(values);
  }
}
