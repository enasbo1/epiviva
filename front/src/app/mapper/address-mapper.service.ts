import {EventEmitter, Injectable} from '@angular/core';
import {RubricObject} from "../shared/base-shared/rubric/rubricObject";
import {AddressMin, AddressObject} from "../http/model/address-model/addressObject";
import {FormStepObject} from "../shared/base-shared/form-step/formStepObject";
import {RegexBase} from "../shared/RegexBase";
import {add} from "lodash";

@Injectable({
  providedIn: 'root'
})
export class AddressMapperService {
  static get_address(address?: AddressObject) {
    return `${address?.address}, ${address?.postal_code} ${address?.city}`;
  }

  static model_to_rubric(address?:AddressObject):RubricObject{
    return {
      title:'address.title',
      content:[
        {name:'address.title', type:'text', text: address?.address},
        {name:'address.postal_code.title', type:'text', text: address?.postal_code},
        {name:'address.city.title', type:'text', text: address?.city},
        {name:'address.kind.title', type:'text', text: address?.kind},
        {
          name:'address.instruction.title',
          type:'modal',
          text: ((address?.instruction=='')?'*...*':'*<<>>*'),
          value: ((address?.instruction=='')?'rubric.unspecified':address?.instruction)
        }
      ]
    }
  }

  static form(verify ?:(step:FormStepObject)=>EventEmitter<boolean>|false, address?:AddressMin): FormStepObject[] {
    return[
      {
        validator:verify,
        content: [
          {
            content:[
              {
                name: "address",
                title: "address.title",
                type: "text",
                default: address?.address,
                placeholder: "address.exemple",
                reg_error: [
                  { regex: RegexBase.required, message: "Address is required" }
                ],
              },
            ]
          },
          {
            online:true,
            content:[
              {
                name: "postal_code",
                title: "address.postal_code.title",
                type: "text",
                default: address?.postal_code,
                placeholder: "address.postal_code.exemple",
                reg_error: [
                  { regex: RegexBase.code_postal, message: "Enter a valid postal code (5 digits)" }
                ],
              },
              {
                name: "city",
                title: "address.city.title",
                type: "text",
                default: address?.city,
                placeholder: "address.city.exemple",
                reg_error: [
                  { regex: RegexBase.required, message: "vetillez saisir une ville" }
                ],
              },
              {
                name: "kind",
                title: "address.kind.title",
                type: "dropdown",
                default: `address.kind.${address?.kind}`,
                choices: ["address.kind.home", "address.kind.work", "address.kind.other"],
              },
            ]
          },
          {
            content:[
              {
                name: "instruction",
                title: "address.instruction.title",
                type: "longtext",
                default: address?.instruction,
                placeholder: "address.instruction.exemple",
                sclass: "instruction-field",
              },
            ]
          }
        ],
      }
    ];
  }
}
