import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormStepObject} from "../../../shared/base-shared/form-step/formStepObject";
import {RegexBase} from "../../../shared/RegexBase";
import {AddressModelService} from "../../../http/model/address-model/address-model.service";
import {AddressObject} from "../../../http/model/address-model/addressObject";
import {FormService} from "../../../shared/foundation/form/form.service";
import {EpvPath} from "../../routes";
import {ActivatedRoute, Router} from "@angular/router";

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
              placeholder: "Enter your address",
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
              title: "*Postal Code*",
              type: "text",
              placeholder: "Enter your postal code",
              reg_error: [
                { regex: RegexBase.code_postal, message: "Enter a valid postal code (5 digits)" }
              ],
            },
            {
              name: "kind",
              title: "*Address Type*",
              type: "dropdown",
              choices: ["Home", "Work"],
            },
          ]
        },
        {
          content:[
            {
              name: "instruction",
              title: "*Delivery Instructions*",
              type: "longtext",
              placeholder: "*Any special instructions?*",
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
