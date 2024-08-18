import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormStepObject} from "../../../shared/base-shared/form-step/formStepObject";
import {AddressModelService} from "../../../http/model/address-model/address-model.service";
import {AddressObject} from "../../../http/model/address-model/addressObject";
import {FormService} from "../../../shared/foundation/form/form.service";
import {EpvPath} from "../../routes";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../../../shared/global.service";
import {AddressMapperService} from "../../../mapper/address-mapper.service";

@Component({
  selector: 'epv-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  private verifEvent:EventEmitter<boolean> = new EventEmitter<boolean>();
  private targetPage?:string;

  items: FormStepObject[] = AddressMapperService.form((step:FormStepObject):EventEmitter<boolean>=>this.verify(step));

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
