import {EventEmitter, Injectable} from '@angular/core';
import {FormRubricObject, FormStepObject} from "../shared/base-shared/form-step/formStepObject";
import {BenefitObject, BenefitPostObject, DietObject} from "../http/model/benefit-model/benefitObject";
import {RegexBase} from "../shared/RegexBase";
import {FormFieldObject} from "../shared/base-shared/form-field/formFieldObject";
import {FormService} from "../shared/foundation/form/form.service";
import {RubricElement, RubricObject} from "../shared/base-shared/rubric/rubricObject";

@Injectable({
  providedIn: 'root'
})
export class BenefitMapperService {
  static diet_types:string[]=[
      'none',
      'intolerance',
      'allergy',
      'forbidden',
      'specific_diet'
  ];

  static specific_diet: ('halal'|'kasher'|'veget')[]=[
      'halal',
      'veget',
      'kasher'
  ];

  static model_to_form(model?:BenefitObject):FormStepObject[] {
    const n:FormStepObject[] = [
      {
        content:[
          {
            content:[
              {
                title:'benefit.data.peoples',
                name:'people',
                type:'num',
                default:model?.people??1,
                step:1,
                reg_error:[
                  {regex:RegexBase.required, message:'required'}
                ],
                number_limit:{
                  min:1,
                  max:12
                }
              }
            ]
          },
          {
            content:[
              {
                title: 'benefit.caf',
                name:'caf',
                file_type:'.pdf, .docx',
                reg_error:[
                  {regex:model?.caf?RegexBase.all:RegexBase.required, message:'required'}
                ],
                type:'file',
              },
            ]
          }
        ]
      }
    ];
    model?.diet?.forEach((diet)=>
      {
        const d:FormRubricObject = BenefitMapperService.diet_rubric(diet)
        d.content[1].event?.subscribe(()=>
          {
            n[0].content.splice(n[0].content.findIndex(v=>v==d),1)
          }
        )
        n[0].content.push(d)
      }
    );
    const event=new EventEmitter<string|void>();
    event.subscribe(() =>
      {
        const b = n[0].content.pop()
        const d:FormRubricObject = BenefitMapperService.diet_rubric()
        d.content[1].event?.subscribe(()=>
            {
              n[0].content.splice(n[0].content.findIndex(v=>v==d),1)
            }
        )
        n[0].content.push(d)
        b?n[0].content.push(b):undefined;
      }
    )
    n[0].content.push(
        {
          content:[
            {
              title:'benefit.data.diet.new',
              name:'new_diet',
              type:'button',
              event:event,
            }
          ]
        }
    )
    return n;
  }

  static diet_rubric(diet?:DietObject):FormRubricObject{
    const event=new EventEmitter<string|void>();
    const event2=new EventEmitter<string|void>();
    const n:FormRubricObject = {
      online:true,
      content:[
        {
          name: `diet`,
          type: 'dropdown',
          sclass:"half-form",
          event : event,
          default: diet?.type?`benefit.data.diet.types.${diet.type}.title`:'benefit.data.diet.types.types',
          choices: BenefitMapperService.diet_types.map(x=> `benefit.data.diet.types.${x}.title`)
        },
        {
          name: `diet_value`,
          type: 'text',
          sclass:(diet?.type=='specific_diet')?'hided':'col-6',
          event:event2,
          default: diet?.value,
          placeholder: diet?.type?`benefit.data.diet.types.${diet.type}.placeholder`:'',
          reg_error:[
            {regex:RegexBase.required, message:'required'}
          ],
        },
        {
          name: `diet_specific`,
          type: 'dropdown',
          sclass:(diet?.type=='specific_diet')?'half-form':'hided',
          default: diet?.value,
          choices: BenefitMapperService.specific_diet.map(x=> `benefit.data.diet.types.specific_diet.${x}`)
        }
      ]
    }
    event.subscribe(x=>
      {
        const t:string = x?.replace(/^benefit\.data\.diet\.types\./, '').replace(/\.title$/, '')??''
        switch(t){
          case 'none':
            event2.emit()
            break;
          case 'specific_diet':
            n.content[1].sclass='hided';
            n.content[2]._value= 'benefit.data.diet.types.specific_diet.title';
            n.content[1].reg_error=[]
            n.content[2].sclass='half-form';
            break;
          default:
            n.content[1].sclass='half-form';
            n.content[2].sclass='hided';
            n.content[1].reg_error=[
              {regex:RegexBase.required, message:'required'}
            ];
            n.content[1].placeholder = `benefit.data.diet.types.${t}.placeholder`;
            break;
        }
      }
    )
    return n
  }

  static form_to_diet(value:FormRubricObject):DietObject|void{
    const type = (value.content[0]._value as string|undefined)?.replace(/^benefit\.data\.diet\.types\./, '').replace(/\.title$/, '');
    if (['intolerance','allergy','forbidden'].includes(type??'')){
      return {
        type: (type as 'intolerance'|'allergy'|'forbidden'),
        value: value.content[1]._value as string
      }
    }else { // @ts-ignore
      if (type == 'specific_diet' && value.content[2]._value){
        const val:string = (value.content[2]._value as string).replace(/^benefit\.data\.diet\.types\.specific_diet./, '');
        return {
          type:type,
          value: value.content[2]._value as (typeof BenefitMapperService.specific_diet[number])
        }
      }
    }

  }

  static form_to_model(values: FormStepObject[], benefit?:BenefitObject): BenefitPostObject {
    const value:FormFieldObject[] = FormService.extract_values([{content: values[0].content.slice(0,2)}])
    const diet:DietObject[] = values[0].content.slice(2).map(r=>BenefitMapperService.form_to_diet(r)).filter(x=>x) as DietObject[]
    return {
      id:benefit?.id,
      people:FormService.get_value(value, 'people', benefit?.people) as number,
      diet:JSON.stringify(diet)
    }
  }

  static caf_from_form(values: FormStepObject[]) :File|undefined {
    console.log(values[0].content[1].content[0].file);
    return values[0].content[1].content[0].file
  }

  static model_to_rubrics(benefit: BenefitObject) :RubricObject[]{
    const ret:RubricObject[] = [
          {
            title:'benefit.data.people.title',
            content:[
              {
                name:'benefit.data.people.content',
                type:'text',
                text:benefit.people.toString()
              }
            ]
          },
          {
            title:'benefit.data.caf',
            content:[
              {
                name: 'benefit.file',
                type: 'file',
                text:'<-->',
                value: benefit.caf
              }
            ]
          }
        ]
    if ((benefit.diet?.length??0) > 0){
      ret.push(
        {
          title:'benefit.data.diet.small_title',
          content: benefit.diet?.map((diet):RubricElement=>
            {
              return {
                name: `benefit.data.diet.types.${diet.type}.title`,
                type: "text",
                text: RegexBase.lang_path.test(diet.value)?`benefit.data.diet.types.specific_diet.${diet.value}`:diet.value
              }
            }
          )?? []
        }
      )
    }

    return ret;
  }
}
