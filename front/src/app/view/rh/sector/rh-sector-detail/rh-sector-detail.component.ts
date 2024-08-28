import {Component, EventEmitter, OnInit} from '@angular/core';
import {GlobalService} from "../../../../shared/global.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SectorModelService} from "../../../../http/model/sector-model/sector-model.service";
import {SectorObject} from "../../../../http/model/sector-model/sectorObject";
import {RubricObject} from "../../../../shared/base-shared/rubric/rubricObject";
import {SectorMapperService} from "../../../../mapper/sector-mapper.service";
import {AddressMapperService} from "../../../../mapper/address-mapper.service";
import {ModaleService} from "../../../../shared/foundation/modale/modale.service";
import {FormStepObject} from "../../../../shared/base-shared/form-step/formStepObject";
import {FormService} from "../../../../shared/foundation/form/form.service";
import {EpvPath} from "../../../routes";
import {BenefitGetLargeObject, BenefitObject} from "../../../../http/model/benefit-model/benefitObject";
import {BenefitModelService} from "../../../../http/model/benefit-model/benefit-model.service";
import {UserMapperService} from "../../../../mapper/user-mapper.service";
import {UserPatch, UserVolunteerObject} from "../../../../http/model/user-model/userObject";
import {UserModelService} from "../../../../http/model/user-model/user-model.service";
import {DistributeModelService} from "../../../../http/model/distribute-model/distribute-model.service";
import {DistributeAffectedObject} from "../../../../http/model/distribute-model/distributeObject";
import {HarvestGetObject, HarvestObject} from "../../../../http/model/harvest-model/harvestObject";
import {HarvestModelService} from "../../../../http/model/harvest-model/harvest-model.service";
import {DateService} from "../../../../http/shared/date.service";
import moment from "moment";
import {HarvestMapperService} from "../../../../mapper/harvest-mapper.service";

@Component({
  selector: 'epv-rh-sector-detail',
  templateUrl: './rh-sector-detail.component.html',
  styleUrls: ['./rh-sector-detail.component.scss']
})
export class RhSectorDetailComponent implements OnInit {

  private sector?:SectorObject;
  private volunteer?:UserVolunteerObject[];
  private affected?:DistributeAffectedObject[];
  public rubric?:RubricObject[];
  private helped?:BenefitGetLargeObject[];
  private harvest?:HarvestGetObject[];

  constructor(
      private route : ActivatedRoute,
      private sectorModelService: SectorModelService,
      private benefitModelService: BenefitModelService,
      private userModelService:UserModelService,
      private distributeModelService:DistributeModelService,
      private harvestModelService:HarvestModelService,
      private router: Router
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "sector.title";
    this.route.params.subscribe(params => {
      if (params['id']){
        this.sectorModelService.get_one_sector(params['id']).subscribe((sector)=>
          {
            if (sector?.length>0){
              this.sector = sector[0];
              this.benefitModelService.get_benefit_valid().subscribe(valid=>{
                this.helped = valid;
                this.set_rubric()
              });
              this.userModelService.get_volunteer().subscribe((volunteer)=> {
                this.volunteer = volunteer
                this.set_rubric()
              });
              this.distributeModelService.get_affected(params['id']).subscribe((distribute)=>{
                this.affected = distribute;
                this.set_rubric()
              })
              this.harvestModelService.get_form_sector(params['id']).subscribe((harvest)=>{
                this.harvest = harvest;
                this.set_rubric()
              })
            }
          }
        )
      }
      }
    )

  }

  private set_rubric(){
    if (this.sector && this.volunteer && this.helped && this.affected && this.harvest){


      const validSelected:EventEmitter<void> = new EventEmitter<void>();
      const here:BenefitGetLargeObject[] = this.helped.filter(h=>(h.sector_id==this.sector?.id));
      validSelected.subscribe(()=>
          here.length>0?
            this.show_helped()
          :
            this.add_helped()
      )

      const volunteerSelected:EventEmitter<void> = new EventEmitter<void>();
      volunteerSelected.subscribe(()=>
          (this.affected?.length??0)>0?
            this.show_volunteer()
          :
            this.add_volunteer()
      )

      const harvestSelected:EventEmitter<void> = new EventEmitter<void>();
      harvestSelected.subscribe(()=>
          (this.harvest?.length??0)>0?
            this.show_harvest()
          :
            this.add_harvest()
      );

      this.rubric = [
        SectorMapperService.model_to_rubric(this.sector),
        AddressMapperService.model_to_rubric(this.sector?.address),
        {
          title:"sector.affected",
          content:[
            {
              name: 'benefit.username',
              type: 'button',
              text: here.length.toString(),
              event: validSelected
            },
            {
              name: 'volunteer.username',
              type:'button',
              text: this.affected.length.toString(),
              event:volunteerSelected
            }
          ]
        },
        {
          title:"harvest.name",
          content:[
            {
              name:'harvest.titles',
              type:'button',
              text: this.harvest.length.toString(),
              event:harvestSelected
            }
          ]
        }
      ];
    }
  }

  verify_sector(step:FormStepObject):EventEmitter<boolean>|false{
    if (this.sector){
      const step_values = FormService.extract_values([step]);
      const verif = new EventEmitter<boolean>();
      const sector:SectorObject = {
        id:this.sector.id,
        nom:FormService.get_value(step_values, 'name', this.sector.nom) as string,
        address:{
          id:this.sector.address.id,
          address:FormService.get_value(step_values, 'address') as string,
          instruction: FormService.get_value(step_values, 'instruction') as string,
          kind: FormService.get_value(step_values, 'kind') as string,
          city: (FormService.get_value(step_values, 'city') as string).toUpperCase(),
          postal_code: FormService.get_value(step_values, 'postal_code') as string,
        }
      }

      this.sectorModelService.update_sector(sector).subscribe(()=>
          verif.emit(true)
      )
      return verif;
    }
    return false;
  }


  edit_sector() {
    if (this.sector) {
      ModaleService.createFormModal(SectorMapperService.form(
          (step: FormStepObject): EventEmitter<boolean> | false => this.verify_sector(step),
          this.sector)).subscribe(() =>
          ModaleService.createTextModal('sector.updated').subscribe(() =>
              window.location.reload()
          )
      )
    }
  }

  delete_sector() {
    if (this.sector?.id){
      ModaleService.createValidationModal('sector.sure_delete').subscribe((yes) =>
        yes=='Oui'?
          this.sectorModelService.delete_sector(this.sector?.id?? 0).subscribe(()=>
              this.router.navigate(['/'+EpvPath.rh.sector.list], {queryParams:{message:"sector.deleted"}})
          )
            :
          undefined
      )
    }
  }
  show_helped(){
    if(this.helped){
      const unAffect_user:EventEmitter<object|undefined> = new EventEmitter<object|undefined>();
      unAffect_user.subscribe((obj:object|undefined)=>
        {
          if (obj){
            this.benefitModelService.unAffect_benefit((obj as BenefitGetLargeObject).id).subscribe(()=>
                {
                  if (GlobalService.modalCurrent)
                    GlobalService.modalCurrent.visible=false
                  this.ngOnInit()
                }
            )
          }
        }
      )
      const add_helper=new EventEmitter<object|undefined>();
      add_helper.subscribe(()=>
          this.add_helped()
      )
      ModaleService.createListModal(
          [
            ...this.helped.filter(h=>(h.sector_id==this.sector?.id)).map(helped=>
            {
              return {
                object:helped,
                content:[
                  {
                    text:UserMapperService.get_U_Name(helped.user, true),
                    style:'font-weight:bolder'
                  },
                  {
                    text:AddressMapperService.get_address(helped.user.address),
                    style:'font-style:italic'
                  },
                  {
                    text:'❌',
                    submitEvent:unAffect_user,
                  },
                ]
              }
            }),
            {
            content:[
              {
                text:'sector.affect.helped',
                style:'width:100%;text-align:center',
                submitEvent:add_helper
              }
            ]
            }
          ],
          'benefit.username'
      ).subscribe(()=>undefined)
    }
  }

  private add_helped() {
    if(this.helped){
      const affect_user:EventEmitter<object|undefined> = new EventEmitter<object|undefined>();
      affect_user.subscribe((obj:object|undefined)=>
        {
          if (obj){
            this.benefitModelService.affect_benefit((obj as UserPatch).id, this.sector?.id??0).subscribe(()=>
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
            ...this.helped.filter(h=>(h.sector_id!=this.sector?.id)).map(helped=>
            {
              return {
                object:helped,
                content:[
                  {
                    text:UserMapperService.get_U_Name(helped.user, true),
                    style:'font-weight:bolder',
                    submitEvent:affect_user
                  },
                  {
                    text:AddressMapperService.get_address(helped.user.address),
                    style:'font-style:italic'
                  }
                ]
              }
            }),
          ],
          'sector.affect.helped'
      ).subscribe(()=>undefined)
    }
  }

  private show_volunteer() {
    if(this.affected && this.volunteer){
      const unAffect_user:EventEmitter<object|undefined> = new EventEmitter<object|undefined>();
      unAffect_user.subscribe((obj:object|undefined)=>
          {
            if (obj){
              this.distributeModelService.delete_distribute((obj as DistributeAffectedObject).id).subscribe(()=>
                  {
                    if (GlobalService.modalCurrent)
                      GlobalService.modalCurrent.visible=false
                    this.ngOnInit()
                  }
              )
            }
          }
      )
      const add_helper=new EventEmitter<object|undefined>();
      add_helper.subscribe(()=>
          this.add_volunteer()
      )
      ModaleService.createListModal(
          [
            ...this.affected.map(affect=>
            {
              return {
                object:affect,
                content:[
                  {
                    text:UserMapperService.get_U_Name(affect.user, true),
                    style:'font-weight:bolder'
                  },
                  {
                    text:AddressMapperService.get_address(affect.user.address),
                    style:'font-style:italic'
                  },
                  {
                    text: 'sector.affect.nb'
                  },
                  {
                    text: ' : ' + (this.volunteer?.find(x=>x.id == affect.user.id)?.distribute.length??0).toString()
                  },
                  {
                    text:'❌',
                    submitEvent:unAffect_user,
                  },
                ]
              }
            }),
            {
              content:[
                {
                  text:'sector.affect.volunteer',
                  style:'width:100%;text-align:center',
                  submitEvent:add_helper
                }
              ]
            }
          ],
          'volunteer.username'
      ).subscribe(()=>undefined)
    }
  }

  private add_volunteer() {
    if(this.affected && this.volunteer){
      const affect_user:EventEmitter<object|undefined> = new EventEmitter<object|undefined>();
      const available = this.volunteer.filter(x=>!(this.affected?.map(a=>a.user.id).includes(x.id)))
      affect_user.subscribe((obj:object|undefined)=>
          {
            if (obj){
              this.distributeModelService.post_distribute(
                {
                  sector_id : this.sector?.id??0,
                  user_id : (obj as {id:number|bigint}).id
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
            ...available.map(volunteer=>
            {
              return {
                object:volunteer,
                content:[
                  {
                    text:UserMapperService.get_U_Name(volunteer, true),
                    style:'font-weight:bolder',
                    submitEvent:affect_user
                  },
                  {
                    text:AddressMapperService.get_address(volunteer.address),
                    style:'font-style:italic'
                  },
                  {
                    text: 'sector.affect.nb'
                  },
                  {
                    text: ' : ' + volunteer.distribute.length.toString()
                  },
                ]
              }
            }),
          ],
          'sector.affect.helped'
      ).subscribe(()=>undefined)
    }
  }

  private show_harvest() {
    if (this.harvest) {
      const event:EventEmitter<object|undefined> = new EventEmitter<object|undefined>();
      event.subscribe(()=>{
        const  n = GlobalService.modalCurrent
        if (n)
          n.visible = false;
        this.add_harvest();
      })

      const selectEvent:EventEmitter<object|undefined> = new EventEmitter<object|undefined>();
      selectEvent.subscribe((h)=>{
        const  n = GlobalService.modalCurrent
        if (n)
          n.visible = false;
        this.edit_harvest(h as HarvestObject);
      })

      ModaleService.createListModal(
          [
            ...this.harvest.sort((h1,h2)=>moment(h1.schedule).isAfter(h2.schedule)?-1:1).map(h=> {
              return {
                object: h,
                content: [
                  {
                    text:DateService.to_front(h.schedule, true)
                  },
                  {
                    text:h.sector.nom,
                    style:'font-weight:bolder',
                    subtitle:'harvest.abort.prevent',
                    submitEvent:selectEvent
                  },
                  {
                    text:AddressMapperService.get_address(h.sector.address),
                    style:'font-style:italic'
                  }
                ]
              }
            }),
            {
              content: [
                {
                  text:'harvest.add.cta',
                  style:'width:100%;text-align:center',
                  submitEvent:event
                }
              ]
            }
          ],
          'harvest.add.pick'
      )
    }
  }

  private add_harvest() {
    if (this.sector){
      ModaleService.createFormModal(
          HarvestMapperService.form()
      ).subscribe((fields)=>
        this.harvestModelService.post_harvest(
            HarvestMapperService.resolve_form(fields, this.sector?.id)
        ).subscribe(()=>this.ngOnInit())
      )
    }
  }

  private edit_harvest(harvest:HarvestObject) {
    if (this.sector){
      ModaleService.createValidationModal(
        'harvest.abort.validate'
      ).subscribe((yes)=>yes=='Oui'?
        this.harvestModelService.delete_harvest(
            harvest?.id??0
        ).subscribe(()=>this.ngOnInit())
        :undefined
      )
    }
  }
}
