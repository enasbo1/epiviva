import {Component, EventEmitter, OnInit} from '@angular/core';
import {GlobalService} from "../../../shared/global.service";
import {UserModelService} from "../../../http/model/user-model/user-model.service";
import {UserObject} from "../../../http/model/user-model/userObject";
import {RubricObject} from "../../../shared/base-shared/rubric/rubricObject";
import {UserMapperService} from "../../../mapper/user-mapper.service";
import {AddressModelService} from "../../../http/model/address-model/address-model.service";
import {EpvPath} from "../../routes";
import {ModaleService} from "../../../shared/foundation/modale/modale.service";
import {LanguageService} from "../../../shared/base-shared/language.service";
import {FormService} from "../../../shared/foundation/form/form.service";
import {AddressMapperService} from "../../../mapper/address-mapper.service";
import {Router} from "@angular/router";
import { AddressObject } from "../../../http/model/address-model/addressObject";
import {FormStepObject} from "../../../shared/base-shared/form-step/formStepObject";

@Component({
  selector: 'epv-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  user?:UserObject;
  address?:AddressObject;
  userRubric?:RubricObject[];

  constructor(
      private userModelService: UserModelService,
      private addressModelService: AddressModelService,
      private languageService: LanguageService,
      private router:Router
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = 'options.title';
    if (GlobalService.currentUser?.nom) {
      this.userModelService.get_self().subscribe((users)=>
        {
          this.user = users[0];
          this.userRubric = [
            UserMapperService.model_to_rubric(this.user),
            {
              title:'address.title',
              content:[
              ]
            }
          ]
          if (this.user.address_id){
            this.addressModelService.get_one_address(this.user.address_id).subscribe((addresses)=>
              {
                this.address = addresses[0];
                if (this.userRubric){
                  this.userRubric[1] = AddressMapperService.model_to_rubric(this.address);
                }
              }
            )
          }
        }
      )
    }
  }

  switch_language() {
    this.languageService.see_languageFiles().subscribe(lang=>
        {
          ModaleService.createFormModal({
            title:'languages.switch',
            content:[
              {
                content:[
                  {
                    name:'language',
                    type:'dropdown',
                    default:`languages.${GlobalService.language}`,
                    choices: lang.map(x=> `languages.${x}`)
                  }
                ]
              }
            ]
          }).subscribe((fields)=>
            {
              GlobalService.language = (FormService.get_value(fields, 'language') as string).replace(/^languages\./, '');
              this.languageService.reload_language();
            }
          )
        }
    )
  }

  verify_address(step:FormStepObject){
    const step_values = FormService.extract_values([step]);
    const verif = new EventEmitter<boolean>();
    const address:AddressObject = {
      address: FormService.get_value(step_values, 'address') as string,
      instruction: FormService.get_value(step_values, 'instruction') as string,
      kind: FormService.get_value(step_values, 'kind') as string,
      city: (FormService.get_value(step_values, 'city') as string).toUpperCase(),
      postal_code: FormService.get_value(step_values, 'postal_code') as string


    }
    this.addressModelService.edit_userAddress(address).subscribe(()=>
        verif.emit(true)
    )
    return verif;
  }

  edit_address() {
    if (this.address){
      ModaleService.createFormModal(AddressMapperService.form(
          (step:FormStepObject):EventEmitter<boolean>=>this.verify_address(step),
          this.address)[0]).subscribe(()=>
        ModaleService.createTextModal('address.edited').subscribe(()=>
          window.location.reload()
        )
      )
    }
  }
  edit_user() {
    if (this.user){
      ModaleService.createFormModal(UserMapperService.model_to_form(
          this.user,
          this.languageService.resolve('user.title')+ ' : ' +  UserMapperService.get_U_Name(this.user, true))[0]
      ).subscribe((values)=>
        {
          const user =UserMapperService.form_to_model(values, this.user);
          user.status = undefined
          this.userModelService.update_user(user).subscribe(()=>
              ModaleService.createTextModal('user.edited').subscribe(()=>
                  window.location.reload()
              )
          )
        }
      )
    }
  }

  protected readonly EpvPath = EpvPath;
}
