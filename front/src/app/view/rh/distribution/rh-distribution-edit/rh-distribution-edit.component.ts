import {Component, EventEmitter, OnInit} from '@angular/core';
import {DistributeAffectedObject, DistributePostObject} from "../../../../http/model/distribute-model/distributeObject";
import {SectorObject} from "../../../../http/model/sector-model/sectorObject";
import {ProductSelfObject} from "../../../../http/model/product-model/productObject";
import {BenefitGetLargeObject} from "../../../../http/model/benefit-model/benefitObject";
import {RubricObject} from "../../../../shared/base-shared/rubric/rubricObject";
import {ActivatedRoute, Router} from "@angular/router";
import {DistributeModelService} from "../../../../http/model/distribute-model/distribute-model.service";
import {SectorModelService} from "../../../../http/model/sector-model/sector-model.service";
import {ProductModelService} from "../../../../http/model/product-model/product-model.service";
import {HelpedModelService} from "../../../../http/model/helped-model/helped-model.service";
import {GlobalService} from "../../../../shared/global.service";
import {ModaleService} from "../../../../shared/foundation/modale/modale.service";
import {SectorMapperService} from "../../../../mapper/sector-mapper.service";
import {UserMapperService} from "../../../../mapper/user-mapper.service";
import {DateService} from "../../../../http/shared/date.service";
import {AddressMapperService} from "../../../../mapper/address-mapper.service";
import {EpvPath} from "../../../routes";
import {BenefitModelService} from "../../../../http/model/benefit-model/benefit-model.service";
import {AffectModelService} from "../../../../http/model/affect-model/affect-model.service";
import {AffectAffectedObject} from "../../../../http/model/affect-model/affectObject";
import {BenefitGetHelpedObject} from "../../../../http/model/helped-model/helpedObject";
import {FormService} from "../../../../shared/foundation/form/form.service";
import {DistributeMapperService} from "../../../../mapper/distribute-mapper.service";

@Component({
  selector: 'epv-rh-distribution-edit',
  templateUrl: './rh-distribution-edit.component.html',
  styleUrls: ['./rh-distribution-edit.component.scss']
})
export class RhDistributionEditComponent implements OnInit {
  public distribute?:DistributeAffectedObject;
  private sector?:SectorObject;
  private stock?:ProductSelfObject[];
  private benefits?:BenefitGetLargeObject[];
  public rubric?:RubricObject[];
  private affected?:AffectAffectedObject[];
  private distributor?:number|bigint;
  private stock_id?:(number|bigint)[];
  private helped?: BenefitGetHelpedObject[];
  private schedule?: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private distributeModelService: DistributeModelService,
      private sectorModelService:SectorModelService,
      private productModelService:ProductModelService,
      private benefitModelService:BenefitModelService,
      private affectModelService:AffectModelService,
      private helpedModelService:HelpedModelService
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = 'distribute.title';
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.distributeModelService.get_one_distribute(params['id']).subscribe((distribute)=> {
          this.distribute = distribute[0];
          this.distributor = this.distribute.distributor.id;

          this.productModelService.get_stock(this.distribute.sector_id).subscribe((stock)=> {
            this.stock=stock;
            this.set_rubric();
          })

          this.sectorModelService.get_one_sector(this.distribute.sector_id).subscribe((sector)=> {
            this.sector = sector[0]
            this.set_rubric()
          })

          this.benefitModelService.get_from_sector(this.distribute.sector_id).subscribe((benefit)=> {
            this.benefits = benefit;
            this.set_rubric();
          })

          this.affectModelService.get_affected(this.distribute.sector_id).subscribe((affect)=>{
            this.affected = affect;
            this.set_rubric()
          })
        })
        this.productModelService.get_from_distribute(params['id']).subscribe((stock)=> {
          this.stock_id = stock.map(x=>x.id);
          this.set_rubric();
        })
        this.helpedModelService.get_benefit(params['id']).subscribe((benefit)=> {
          this.helped = benefit
          this.set_rubric();
        })
      }
    })
  }

  private set_rubric(){
    if (this.distribute && this.stock && this.stock_id && this.benefits && this.helped && this.sector && this.affected && this.distributor) {

      const distributor = this.affected.find(x=>x.user.id == this.distributor);
      const stock = this.stock.filter(b=>this.stock_id?.includes(b.id));


      const stockSelected:EventEmitter<void> = new EventEmitter<void>();
      stockSelected.subscribe(()=>
          (stock.length)>0?
              this.show_stock(stock)
              :
              this.add_stock()
      )

      const helpedSelected:EventEmitter<void> = new EventEmitter<void>();
      helpedSelected.subscribe(()=>
          (this.helped?.length??0)>0?
              this.show_helped()
              :
              this.add_helped()
      )

      const volunteer:EventEmitter<void> = new EventEmitter<void>();
      volunteer.subscribe(()=>
        this.set_distributor()
      )

      const schedule:EventEmitter<void> = new EventEmitter<void>();
      schedule.subscribe(()=>
          this.set_schedule()
      )
      this.rubric = [
        {
          content:[
            {
              name: 'sector.title',
              type:'modal',
              text:this.sector.nom,
              value:SectorMapperService.model_to_rubric(this.sector, true)
            },
            {
              name:'distribute.user',
              type:'button',
              text:UserMapperService.get_U_Name(distributor?.user),
              event:volunteer
            },
            {
              name:'distribute.schedule',
              type:'button',
              text: DateService.to_front(this.schedule??this.distribute.schedule, true),
              event:schedule
            },
            {
              name:'benefit.username',
              type:'button',
              text: this.helped.length.toString(),
              event:helpedSelected
            },
            {
              name:'distribute.products',
              type:'button',
              text: stock.length.toString(),
              event: stockSelected
            },
          ]
        }
      ]
    }
  }

  private show_stock(stock:ProductSelfObject[]):void{
    const delEvent:EventEmitter<object|undefined> = new EventEmitter();
    delEvent.subscribe((prod)=>
        this.productModelService.unAffect_product((prod as ProductSelfObject).id).subscribe(()=>{
          this.stock_id?.splice(this.stock_id?.findIndex(s=> s==(prod as ProductSelfObject).id),1);
          if (GlobalService.modalCurrent)
            GlobalService.modalCurrent.visible=false
          this.set_rubric()
        })
    )

    const add:EventEmitter<object|undefined> = new EventEmitter<object|undefined>();
    add.subscribe((prod)=>
        this.add_stock()
    )

    ModaleService.createListModal(
      [...(stock.map((prod)=>{
        return {
          object: prod,
          content: [
            {
              text: `${prod.name} "${prod.marque}"`,
              style: 'font-weight:bolder',
            },
            {
              text: `${DateService.to_front(prod.expiration_date)}`,
              style: 'font-style:italic',
            },
            {
              text: `-${prod.code_barre}-`,
            },
            {
              text: '❌',
              submitEvent: delEvent
            },
          ]
        }})??[]),
        {
          content:[
            {
              text:'distribute.add_stock',
              style:'width:100%;text-align:center',
              submitEvent:add
            }
          ]
        }
      ],
      'distribute.products'
    )
  }

  private add_stock() {
    const event:EventEmitter<object|undefined> = new EventEmitter<object|undefined>();
    event.subscribe((obj)=>{
      const n = obj as ProductSelfObject;
      this.productModelService.set_distribute(n.id, this.distribute?.id??0).subscribe(()=>{
        if (GlobalService.modalCurrent)
          GlobalService.modalCurrent.visible=false
        this.stock_id?.push(n.id);
        this.set_rubric();
      })
    });


    ModaleService.createListModal(this.stock?.filter(x=>!this.stock_id?.includes(x.id))?.map((prod)=>{
        return {
          object:prod,
          content:[
            {
              text:`${prod.name} "${prod.marque}"`,
              style:'font-weight:bolder',
              submitEvent:event
            },
            {
              text:`${DateService.to_front(prod.expiration_date)}`,
              style:'font-style:italic',
            },
            {
              text:`-${prod.code_barre}-`,
            },
          ]
        }
        })??[],
      'distribute.add_stock'
    )
  }

  private show_helped() {
    const unAffect_user:EventEmitter<object|undefined> = new EventEmitter<object|undefined>();
    unAffect_user.subscribe((obj:object|undefined)=>
        {
          if (obj && this.helped){
            this.helpedModelService.delete_helped(((obj as BenefitGetHelpedObject).help_id)).subscribe(()=>{
              this.helped?.splice(this.helped.findIndex(x=>x.id == (obj as {id:number|bigint}).id),1)
              if (GlobalService.modalCurrent)
                GlobalService.modalCurrent.visible=false
              this.set_rubric()
            }
          )}
        }
    )

    const add_helper=new EventEmitter<object|undefined>();
    add_helper.subscribe(()=>
        this.add_helped()
    )

    ModaleService.createListModal(
        [...(this.helped?.map(helped=>{
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
                submitEvent:unAffect_user
              },
            ]
          }
        })??[]),
          {
            content:[
              {
                text:'sector.distribute.helped',
                style:'width:100%;text-align:center',
                submitEvent:add_helper
              }
            ]
          }
        ],
        'benefit.username'
    )
  }

  private add_helped() {
    if (this.benefits && this.helped){
      const free = this.benefits.filter(b=>!this.helped?.map(h=>h.id).includes(b.id));
      const event:EventEmitter<object|undefined> = new EventEmitter<object|undefined>();
      event.subscribe((obj)=>{
        this.helpedModelService.post_helped({distribute_id:this.distribute?.id??0, benefit_id:(obj as {id:number|bigint}).id}).subscribe(()=>{
          if (GlobalService.modalCurrent)
            GlobalService.modalCurrent.visible=false
          this.helpedModelService.get_benefit(this.distribute?.id??0).subscribe((benefit)=> {
            this.helped = benefit
            this.set_rubric();
          })
        })
      });

      ModaleService.createListModal(free.map(helped=>{
          return {
            object:helped,
            content:[
              {
                text:UserMapperService.get_U_Name(helped.user, true),
                style:'font-weight:bolder',
                submitEvent:event
              },
              {
                text:AddressMapperService.get_address(helped.user.address),
                style:'font-style:italic'
              },
            ]
          }
        }),
        'sector.distribute.helped'
      )
    }

  }
  private set_distributor() {
    if(this.affected && this.distributor){
      const affect_user:EventEmitter<object|undefined> = new EventEmitter<object|undefined>();
      affect_user.subscribe((obj:object|undefined)=>
        {
          this.distributor = (obj as AffectAffectedObject).user.id;
          if (GlobalService.modalCurrent)
            GlobalService.modalCurrent.visible=false
          this.set_rubric();

        }
      )
      ModaleService.createListModal(
          [
            ...this.affected.map(volunteer=>
            {
              return {
                object:volunteer,
                content:[
                  {
                    text:UserMapperService.get_U_Name(volunteer?.user, true),
                    style:'font-weight:bolder'+((volunteer.user.id === this.distributor)?";color:#bbb":''),
                    submitEvent:(volunteer.user.id === this.distributor)?undefined:affect_user
                  },
                  {
                    text:AddressMapperService.get_address(volunteer?.user.address),
                    style:'font-style:italic'
                  }
                ]
              }
            }),
          ],
          'sector.distribute.helped'
      ).subscribe(()=>undefined)
    }
  }

  private set_schedule() {
    ModaleService.createFormModal(
      DistributeMapperService.form()
    ).subscribe((fields)=>{
      this.schedule = (FormService.get_value(fields, 'schedule',  DateService.to_api(this.distribute?.schedule)) as string)
      this.set_rubric()
    })
  }

  get submitable(){
    return ((this.distributor!==undefined) && ((this.stock_id?.length??0)>0) && ((this.helped?.length??0)>0))
  }

  submit() {
    if (this.submitable){
      const distribute : DistributePostObject = {
        id : this.distribute?.id,
        schedule: this.schedule??DateService.to_api(this.distribute?.schedule),
        distributor_id : this.distributor??0,
        sector_id: this.sector?.id??0
      }
      this.distributeModelService.update_distribute(distribute).subscribe(()=>
          this.router.navigate(['/'+EpvPath.rh.distribute.details.replace(':id', distribute.id?.toString()??'0')])
      )
    }
  }


  protected readonly EpvPath = EpvPath;
}
