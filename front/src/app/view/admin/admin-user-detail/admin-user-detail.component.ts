import { Component, OnInit } from '@angular/core';
import {UserModelService} from "../../../http/model/user-model/user-model.service";
import {ActivatedRoute} from "@angular/router";
import {UserMin, UserObject, UserPatch} from "../../../http/model/user-model/userObject";
import {RubricObject} from "../../../shared/base-shared/rubric/rubricObject";
import {UserMapperService} from "../../../mapper/user-mapper.service";
import {GlobalService} from "../../../shared/global.service";
import {LanguageService} from "../../../shared/base-shared/language.service";
import {AddressMapperService} from "../../../mapper/address-mapper.service";
import {AddressModelService} from "../../../http/model/address-model/address-model.service";
import {ModaleService} from "../../../shared/foundation/modale/modale.service";
import {FormService} from "../../../shared/foundation/form/form.service";

@Component({
  selector: 'epv-admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrls: ['./admin-user-detail.component.scss']
})
export class AdminUserDetailComponent implements OnInit {
  public user?:UserObject;
  public user_rubric?:RubricObject[]


  constructor(
      private route: ActivatedRoute,
      private language: LanguageService,
      private userModelService: UserModelService,
      private addressModelService: AddressModelService,
  ) { }

  get  editable(): boolean{
      return (this.user!==undefined) && this.user.status!=='5' && (this.user.id != GlobalService.currentUser?.id)
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userModelService.get_one_user(params['id']).subscribe(
            (users)=>{
              this.user=users[0]
              GlobalService.pageName = this.language.resolve('user.title') + ' : '+UserMapperService.get_U_Name(this.user, true)
              this.user_rubric = [
                  UserMapperService.model_to_rubric(this.user),
                {
                  title:'address.title',
                  content:[]
                }
              ]
              if (this.user.id_address){
                this.addressModelService.get_one_address(this.user.id_address).subscribe((addresses)=>
                    {
                      const address = addresses[0];
                      if (this.user_rubric){
                        this.user_rubric[1] = AddressMapperService.model_to_rubric(address);
                      }
                    }
                )
              }
            }
        )
      }
    })
  }

  witch_privileges() {
    if (this.editable) {
      ModaleService.createFormModal(
        {
          content: [
            {
              content: [
                {
                  name: 'role',
                  type: 'dropdown',
                  default: `user.roles.${UserMapperService.roles[this.user?.status?? '0']}`,
                  choices: UserMapperService.language_key_rolesList.filter(x=>x!=='user.roles.system')
                }
              ]
            }
          ]
        }
      ).subscribe((values)=>
          {
            let user:UserPatch={
              id:this.user?.id??0,
              status: (UserMapperService.language_key_rolesList.indexOf(FormService.get_value(values, "role") as string)).toString()
            }
            this.userModelService.update_user(user).subscribe(()=>
                {
                    ModaleService.createTextModal('user.privilege.edited').subscribe(()=>
                        window.location.reload()
                    )
                }
            )
          }
      )
    }
  }

    protected readonly GlobalService = GlobalService;
}
