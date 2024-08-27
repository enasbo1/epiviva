import {Component, EventEmitter, OnInit} from '@angular/core';
import {BenefitGetObject, BenefitObject} from "../../../../http/model/benefit-model/benefitObject";
import {RubricObject} from "../../../../shared/base-shared/rubric/rubricObject";
import {ChatTarget} from "../../../../shared/foundation/chat/chat.component";
import {BenefitModelService} from "../../../../http/model/benefit-model/benefit-model.service";
import {GlobalService} from "../../../../shared/global.service";
import {BenefitMapperService} from "../../../../mapper/benefit-mapper.service";
import {EpvPath} from "../../../routes";
import {ActivatedRoute, Router} from "@angular/router";
import {UserLocatedObject, UserPatch, UserRecap} from "../../../../http/model/user-model/userObject";
import {UserMapperService} from "../../../../mapper/user-mapper.service";
import {SectorObject} from "../../../../http/model/sector-model/sectorObject";
import {ModaleService} from "../../../../shared/foundation/modale/modale.service";
import {AddressMapperService} from "../../../../mapper/address-mapper.service";
import {SectorModelService} from "../../../../http/model/sector-model/sector-model.service";

@Component({
  selector: 'epv-rh-benefit-detail',
  templateUrl: './rh-benefit-detail.component.html',
  styleUrls: ['./rh-benefit-detail.component.scss']
})
export class RhBenefitDetailComponent implements OnInit {
  public benefit?:BenefitObject;
  public user?:UserLocatedObject;
  public benefit_rubric?:RubricObject[];
  public chat_target?: ChatTarget;

  constructor(
      private benefitModelService: BenefitModelService,
      private sectorModelService:SectorModelService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = 'benefit.title'
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.benefitModelService.get_one_benefit(params['id']).subscribe((benefits)=>
            {
              const benefit:BenefitObject|BenefitGetObject = benefits[0];
              this.user = benefits[0].user;
              benefit.diet = JSON.parse(benefit.diet?? '[]');
              this.benefit = benefit as BenefitObject
              this.chat_target = {subject:'benefit', id : this.benefit.id??0};
              this.benefit_rubric = [
                  UserMapperService.modelRecap_to_rubric(this.user),
                  AddressMapperService.model_to_rubric(this.user.address),
                  ...BenefitMapperService.model_to_rubrics(this.benefit)
              ]
            }
        )
      }
    })

  }
  validate() {
    if (this.benefit && this.benefit.validated!=='valid') {
      this.sectorModelService.get_sector().subscribe((sector) => {
        this.add_affect(sector)?.subscribe(() => {
          this.benefitModelService.validate_benefit(this.benefit?.id ?? 0).subscribe(() => {
                this.router.navigate(
                    ['/' + EpvPath.rh.benefit.list],
                    {queryParams: {message: "benefit.validateMessage"}}
                ).then();
              }
          )
        })
      })
    }
  }

  private add_affect(sectors:SectorObject[]):EventEmitter<void>|void {
    if(sectors && this.benefit){
      const affect:EventEmitter<object|undefined> = new EventEmitter<object|undefined>();
      const ret:EventEmitter<void> = new EventEmitter<void>();
      affect.subscribe((obj:object|undefined)=>
          {
            if (obj){
              console.log(obj)
              this.benefitModelService.affect_benefit(this.benefit?.id??0,(obj as {id:number|bigint}).id??0).subscribe(()=>
                  {
                    if (GlobalService.modalCurrent)
                      GlobalService.modalCurrent.visible=false
                    ret.emit()
                  }
              )
            }
          }
      )
      ModaleService.createListModal(
          [
            ...sectors.map(sector=>
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
          'benefit.affect'
      ).subscribe(()=>undefined)
      return ret;
    }
  }

  reject() {
    if (this.benefit  && this.benefit.validated!=='reject') {
      this.benefitModelService.reject_benefit(this.benefit.id ?? 0).subscribe(()=>
          {
            this.router.navigate(
                ['/'+EpvPath.rh.benefit.list],
                {queryParams:{message:"benefit.rejectMessage"}}
            ).then();
          }
      )
    }
  }

  protected readonly EpvPath = EpvPath;
}
