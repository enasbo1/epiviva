import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormStepObject} from "../../../shared/base-shared/form-step/formStepObject";
import {RegexBase} from "../../../shared/RegexBase";
import {AddressModelService} from "../../../http/model/address-model/address-model.service";
import {AddressObject} from "../../../http/model/address-model/addressObject";
import {FormService} from "../../../shared/foundation/form/form.service";
import {EpvPath} from "../../routes";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../../../shared/global.service";

@Component({
  selector: 'epv-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  private verifEvent:EventEmitter<boolean> = new EventEmitter<boolean>();
  private targetPage?:string;

  items: FormStepObject[] = [
    {
      validator:(step:FormStepObject):EventEmitter<boolean>=>this.verify(step),
      content: [
        {
          content:[
            {
              name: "address",
              title: "address.title",
              type: "text",
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
              placeholder: "address.postal_code.exemple",
              reg_error: [
                { regex: RegexBase.code_postal, message: "Enter a valid postal code (5 digits)" }
              ],
            },
            {
              name: "kind",
              title: "address.kind.title",
              type: "dropdown",
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
              placeholder: "address.instruction.exemple",
              sclass: "instruction-field",
            },
          ]
        }
      ],
    }
  ];

  constructor(
      private addressModelService : AddressModelService,
      private route : ActivatedRoute,
      private router : Router
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "address.title"
    this.route.queryParams.subscribe(params => {
      if (params && params['targetPage']) {
        this.targetPage = params['targetPage'];
      }
    })
  }

  verify(step:FormStepObject):EventEmitter<boolean>{
    const step_values = FormService.extract_values([step]);
    console.log("verif");
    const address:AddressObject = {
      address: FormService.get_value(step_values, 'address') as string,
      instruction: FormService.get_value(step_values, 'instruction') as string,
      kind: FormService.get_value(step_values, 'kind') as string,
      postal_code: FormService.get_value(step_values, 'postal_code') as string

    }
    this.addressModelService.edit_userAddress(address).subscribe(()=>
        this.verifEvent.emit(true)
    )
    return this.verifEvent;
  }

  submit(event:any): void {
    this.router.navigateByUrl('/'+(this.targetPage?? EpvPath.home)).then();
  }
}
