import {Component, Input, OnInit} from '@angular/core';
import {FormStepObject} from "./formStepObject";
import {FormFieldObject} from "../form-field/formFieldObject";

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

    filterField(content: FormFieldObject[]) {
        return content.filter(x => x.sclass!=='hided');
    }
}
