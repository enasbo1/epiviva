import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModaleService} from "../../../shared/foundation/modale/modale.service";
import {FormService} from "../../../shared/foundation/form/form.service";
import {FormFieldObject, FormFieldType, FormFieldTypeList} from "../../../shared/base-shared/form-field/formFieldObject";
import {FormRubricObject, FormStepObject} from "../../../shared/base-shared/form-step/formStepObject";
import {LanguageService} from "../../../shared/base-shared/language.service";

@Component({
  selector: 'epv-admin-service-form',
  templateUrl: './admin-service-form.component.html',
  styleUrls: ['./admin-service-form.component.scss']
})
export class AdminServiceFormComponent implements OnInit {
  @Input() set form(form:FormStepObject[]|undefined) {
    this._form = form?? [];
    this._form.forEach(step=>
        step.content.forEach(rubric=>
            rubric.content.forEach(field=>
                {
                  if (Number(field.name) && (Number(field.name)>=this.index)){
                    this.index = Number(field.name)+1
                  }
                }
            )
        )
    )
  };
  @Output() edited = new EventEmitter<void>();

  get form():FormStepObject[]|undefined {
    return this._form;
  }

  private _form:FormStepObject[] = []
  private index:number=0;
  private current?:FormStepObject;
  private cur_rubric?:FormRubricObject;

  constructor(
      private languageService:LanguageService,
  ) { }

  ngOnInit(): void {
    this.current = this._form[0]

  }

  get currentStep():FormStepObject|undefined {
    return this.current ?? this._form[0]
  }


  set currentStep(current:FormStepObject|undefined){
    this.current = current
    this.cur_rubric = current?.content[0]?? undefined;
  }

  isCurrent(step:FormStepObject){
    return this.currentStep === step
  }

  edit_step(step:FormStepObject):void{
    this.edited.emit()
    ModaleService.createFormModal(
        {
          content:[
            {
              title : 'step title',
              content:[
                {
                  name:'title',
                  _value :step.title,
                  placeholder:step.title,
                  type:'text'
                }
              ]
            }
          ]
        }
    ).subscribe(
        values=>
            step.title = FormService.get_value(values, 'title') as string
    )
  }

  drop_step(step:FormStepObject):void{
    this.edited.emit()
    ModaleService.createValidationModal('do you want to destroy step "'+this.languageService.resolve(step.title)+'"')
        .subscribe(
            (yes)=>{
              if (yes==="Oui" && this.form) {

                const i = this.form.findIndex(val=>val!==step);
                this.form.splice(i,1);
                this.current = this.form[0]?? undefined
              }
            }
        )

  }
  newStep():void{
    this.edited.emit()
    this.cur_rubric = {
      content:[]
    }
    this.current = {
      errorEvent: undefined,
      content: [
        this.cur_rubric
      ],
    }

    this._form.push(
        this.current
    )
  }

  addField(type:FormFieldType):void{
    this.edited.emit()
    this.cur_rubric?.content.push(
        {
          type:type,
          name:(this.index++).toString()
        }
    )
  }
  drop_rubric(rubric:FormRubricObject):void{
    this.edited.emit()
    ModaleService.createValidationModal('do you want to destroy rubric "'+this.languageService.resolve(rubric.title)+'"')
        .subscribe(
            (yes)=>{
              if (yes==="Oui" && this.current) {
                this.current.content = this.current?.content.filter(val=>val!==rubric)
              }
            }

        )

  }

  newRubric():void{
    this.edited.emit()
    this.cur_rubric={
      content:[]
    }
    this.current?.content.push(
        this.cur_rubric
    )
  }

  is_current_rubric(rubric:FormRubricObject):boolean{
    return rubric === this.cur_rubric
  }

  set_rubric(rubric:FormRubricObject):void{
    this.cur_rubric = rubric
  }

  edit_rubric(rubric:FormRubricObject):void{
    this.edited.emit()
    ModaleService.createFormModal(
        {
          content:[
            {
              title : 'rubric title',
              content:[
                {
                  name:'title',
                  default:rubric.title,
                  placeholder:rubric.title,
                  type:'text'
                }
              ]
            }
          ]
        }
    ).subscribe(
        values=>
            rubric.title = '*'+(FormService.get_value(values, 'title') as string)+'*'
    )
  }

  edit_field(field:FormFieldObject):void{
    this.edited.emit()
    FormService.edit_field(field)
  }

  drop_field(field:FormFieldObject, rubric:FormRubricObject):void{
    this.edited.emit()
    ModaleService.createValidationModal(
        "do you realy want to delete field  \"" +this.languageService.resolve(field.title?? field.name) + '"'
    ).subscribe(
        (yes)=>{
          if (yes==="Oui") {
            rubric.content = rubric.content.filter(val=>val!==field)
          }
        }
    )
  }

  stepNumber(step:FormStepObject):number {
    return this._form.findIndex(val=>val===step) +1
  }


  protected readonly FormFieldTypeList = FormFieldTypeList.filter(x=>x!=="password");
}