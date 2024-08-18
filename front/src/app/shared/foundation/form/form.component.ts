import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormRubricObject, FormStepObject} from "../../base-shared/form-step/formStepObject";
import {FormFieldObject} from "../../base-shared/form-field/formFieldObject";
import {FormService} from "./form.service";

@Component({
  selector: 'epv-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() items?: FormStepObject[];
  @Input() justify:"center"|"right"|"" = "";
  @Input() endpage?:boolean = true;
  @Input() error: boolean = true;

  @Output() submit:EventEmitter<FormFieldObject[]> = new EventEmitter<FormFieldObject[]>();
  public step:number = 0;
  private errorEvent ?:EventEmitter<string>;
  public errorMessage?:string;

  ngOnInit(): void {
    if (this.error) {
      this.errorEvent = new EventEmitter<string>();
      this.errorEvent.subscribe((message)=>{
          this.errorMessage = message
        }
      )
    }
  }

  public get_current():FormStepObject|undefined{
    if (this.items){
      return this.items[this.step];
    }else{
      return undefined;
    }
  }

  public previus_step(){
    --this.step;
  }

  public next_step():EventEmitter<boolean>|false|void{
    const current:FormStepObject|undefined = this.get_current()

    //regex validation
    let error:boolean = current?.content.find((rubric:FormRubricObject):boolean=>
      rubric.content.find(
        (field:FormFieldObject):boolean=>{
          const val:string = field._value?.toString()?? '';
          return field.reg_error?.find(
            (regtest):boolean=>{
              if (!RegExp(regtest.regex).test(val)){
                this.errorEvent?.emit(regtest.message)
                current.errorEvent?.emit(regtest.message)
                return true;
              }
              return false;
            }
          )!==undefined;
        }
      )!==undefined
    )!==undefined
    if (error){
      return false
    }
    if (current?.validator){
      const verified:boolean|EventEmitter<boolean> = current.validator(
        current,
      );
      if (verified === true){
        this._next_step()
        return;
      } else if (verified === false){
        return false;
      } else{
        verified.subscribe(
          (val:boolean):void  =>{
            val?this._next_step():undefined
          }
        )
        return verified;
      }

    }else{
      this._next_step()
    }
  }

  private _next_step():void{
    this.get_current()?.errorEvent?.emit('')
    ++this.step
  }

  public onSumbit(){
    let verif:void|false|EventEmitter<boolean>= this.next_step();
    if (verif){

      verif.subscribe(
        (val:boolean):void=>{
          val?this._submit():undefined;
        }

      )
    }else if(verif!==false){
      this._submit();
    }
  }

  private _submit():void{
    if (!this.endpage){
      this.previus_step();
    }
    if (this.items){
      const value  = FormService.extract_values(this.items)
      this.submit?.emit(
        value
      )
    }
  }
}
