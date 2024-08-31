import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserModelService} from "../../../../http/model/user-model/user-model.service";
import {UserPatch, UserVolunteerObject} from "../../../../http/model/user-model/userObject";
import {RubricObject} from "../../../../shared/base-shared/rubric/rubricObject";
import {UserMapperService} from "../../../../mapper/user-mapper.service";
import {AddressMapperService} from "../../../../mapper/address-mapper.service";
import {SectorObject} from "../../../../http/model/sector-model/sectorObject";
import {SectorModelService} from "../../../../http/model/sector-model/sector-model.service";
import {BenefitGetLargeObject} from "../../../../http/model/benefit-model/benefitObject";
import {AffectAffectedObject} from "../../../../http/model/affect-model/affectObject";
import {GlobalService} from "../../../../shared/global.service";
import {ModaleService} from "../../../../shared/foundation/modale/modale.service";
import {AffectModelService} from "../../../../http/model/affect-model/affect-model.service";
import {LanguageService} from "../../../../shared/base-shared/language.service";

@Component({
  selector: 'epv-rh-volunteer-detail',
  templateUrl: './rh-volunteer-detail.component.html',
  styleUrls: ['./rh-volunteer-detail.component.scss']
})
export class RhVolunteerDetailComponent implements OnInit {
  private user?:UserVolunteerObject;
  private sector?:SectorObject[];
  public rubric?:RubricObject[];

  constructor(
      private route: ActivatedRoute,
      private userModelService : UserModelService,
      private sectorModelService: SectorModelService,
      private affectModelService: AffectModelService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userModelService.get_one_volunteer(params['id']).subscribe((candidates)=> {
          this.user = candidates[0];
          GlobalService.pageName = LanguageService.static_resolve("volunteer.title") + ' : ' + UserMapperService.get_U_Name(this.user, true)
          this.set_rubric()
        })
        this.sectorModelService.get_sector().subscribe((sectors)=> {
          this.sector = sectors;
          this.set_rubric()
        })
      }
    })
  }

  set_rubric(){
    if (this.sector && this.user){
      const selected:EventEmitter<void> = new EventEmitter<void>();
      selected.subscribe(()=>
          (this.user?.affect.length??0)>0?
              this.show_affected()
              :
              this.add_affected()
      )
      this.rubric = [
        UserMapperService.model_to_rubric(this.user),
        AddressMapperService.model_to_rubric(this.user.address),
        {
          content:[{
            name: 'volunteer.affects',
            type: 'button',
            text: this.user.affect.length.toString(),
            event: selected
          }]
        }
      ]
    }
  }

  private show_affected() {
    if(this.user){
      const fire:EventEmitter<object|undefined> = new EventEmitter<object|undefined>();
      fire.subscribe((obj:object|undefined)=>
          {
            if (obj){
              this.affectModelService.delete_affect((obj as AffectAffectedObject).id).subscribe(()=>
                  {
                    if (GlobalService.modalCurrent)
                      GlobalService.modalCurrent.visible=false
                    this.ngOnInit()
                  }
              )
            }
          }
      )
      const add_affected=new EventEmitter<object|undefined>();
      add_affected.subscribe(()=>
          this.add_affected()
      )
      ModaleService.createListModal(
          [
            ...this.user.affect.map(affect=>
            {
              return {
                object:affect,
                content:[
                  {
                    text:affect.sector.nom,
                    style:'font-weight:bolder'
                  },
                  {
                    text:AddressMapperService.get_address(affect.sector.address),
                    style:'font-style:italic'
                  },
                  {
                    text:'❌',
                    submitEvent:fire,
                  },
                ]
              }
            }),
            {
              content:[
                {
                  text:'volunteer.affect',
                  submitEvent:add_affected
                }
              ]
            }
          ],
          'volunteer.username'
      ).subscribe(()=>undefined)
    }
  }

  private add_affected() {
    if(this.sector && this.user){
      const affect:EventEmitter<object|undefined> = new EventEmitter<object|undefined>();
      affect.subscribe((obj:object|undefined)=>
          {
            if (obj){
              this.affectModelService.post_affect(
                  {
                    user_id : this.user?.id??0,
                    sector_id : (obj as {id:number|bigint}).id
                  }
              ).subscribe(()=>
                  {
                    if (GlobalService.modalCurrent)
                      GlobalService.modalCurrent.visible=false
                    this.ngOnInit()
                  }
              )
            }
          }
      )
      ModaleService.createListModal(
          [
            ...this.sector.filter(h=>!this.user?.affect.map(x=>x.sector.id).includes(h.id)).map(sector=>
            {
              return {
                object:sector,
                content:[
                  {
                    text:sector.nom,
                    style:'font-weight:bolder',
                    submitEvent:affect
                  },
                  {
                    text:AddressMapperService.get_address(sector.address),
                    style:'font-style:italic'
                  }
                ]
              }
            }),
          ],
          'volunteer.affect'
      ).subscribe(()=>undefined)
    }
  }
}
