import {Component, Input, OnInit} from '@angular/core';
import {FormStepObject} from "./formStepObject";

@Component({
  selector: 'epv-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.scss']
})
export class FormStepComponent implements OnInit {
  @Input() items?:FormStepObject;
  @Input() justify:"right"|"center"|""="";

  ngOnInit(): void {
  }

}
