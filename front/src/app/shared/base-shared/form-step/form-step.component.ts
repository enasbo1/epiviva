import {Component, Input, OnInit} from '@angular/core';
import {FormStepObject} from "./formStepObject";
import {TranslatorService} from "../translator.service";

@Component({
  selector: 'ep-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.scss']
})
export class FormStepComponent implements OnInit {
  @Input() items?:FormStepObject;
  @Input() justify:"right"|"center"|""="";
  constructor(public translator:TranslatorService) { }

  ngOnInit(): void {
  }

}
