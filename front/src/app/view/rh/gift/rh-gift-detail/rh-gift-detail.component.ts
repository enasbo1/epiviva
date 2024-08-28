import {Component, EventEmitter, OnInit} from '@angular/core';
import moment from "moment/moment";
import {DateService} from "../../../../http/shared/date.service";
import {ProductGetObject, ProductSelfObject} from "../../../../http/model/product-model/productObject";
import {ProductModelService} from "../../../../http/model/product-model/product-model.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../../../../shared/global.service";
import {ModaleService} from "../../../../shared/foundation/modale/modale.service";
import {UserModelService} from "../../../../http/model/user-model/user-model.service";
import {LanguageService} from "../../../../shared/base-shared/language.service";
import {UserMapperService} from "../../../../mapper/user-mapper.service";
import {HarvestGetObject} from "../../../../http/model/harvest-model/harvestObject";
import {HarvestModelService} from "../../../../http/model/harvest-model/harvest-model.service";
import {AddressMapperService} from "../../../../mapper/address-mapper.service";
import {EpvPath} from "../../../routes";

@Component({
  selector: 'epv-rh-gift-detail',
  templateUrl: './rh-gift-detail.component.html',
  styleUrls: ['./rh-gift-detail.component.scss']
})
export class RhGiftDetailComponent implements OnInit {

  public products:ProductGetObject[] = [];
  private harvest?:HarvestGetObject[];

  constructor(
      private productModelService: ProductModelService,
      private userModelService: UserModelService,
      private harvestModelService: HarvestModelService,
      private router: Router,
      private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = 'gift.name'
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userModelService.get_one_user(params['id']).subscribe((user)=>
          {
            GlobalService.pageName = `${LanguageService.static_resolve('gift.from_user')} ${UserMapperService.get_U_Name(user[0], true)}`
          }
        )
        this.productModelService.get_user_product(params['id']).subscribe((products)=>
            {
              this.products = products;
            }
        )
      }
    })
    this.harvestModelService.get_harvest().subscribe((harvest)=>
      this.harvest = harvest
    )
  }


  refuse_product(product: ProductSelfObject) {
    this.productModelService.refuse_product(product.id).subscribe(()=>
        this.ngOnInit()
    )
  }

  get_harvest():HarvestGetObject[] {
    return this.harvest?.filter(h => this.products.map(p=>p.harvest_id).includes(h.id))??[];
  }

  pick() {
    if (this.harvest) {
      if (!this.products.find(p => !p.harvest_id)) {
        ModaleService.createValidationModal('harvest.add.already').subscribe((yes) =>
            yes == 'Oui' ? this._pick() : undefined
        )
      } else {
        this._pick()
      }
    }
  }

  private _pick() {
    if (this.harvest) {
      const event:EventEmitter<object|undefined> = new EventEmitter<object|undefined>();
      event.subscribe((obj)=>{
        this.products.forEach(product=>{
          this.productModelService.set_harvest(product.id, (obj as HarvestGetObject).id).subscribe(
            ()=>{
              const  n = GlobalService.modalCurrent
              if (n)
                n.visible = false;
              this.ngOnInit();
            }
          )
        })
      })
      const addEvent:EventEmitter<object|undefined> = new EventEmitter<object|undefined>();
      addEvent.subscribe(()=>{
        this.router.navigate(['/'+EpvPath.rh.sector.list]).then(()=>{
          const  n = GlobalService.modalCurrent
          if (n)
            n.visible = false;
        });
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
                  submitEvent:event
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
                submitEvent:addEvent
              }
            ]
          }
        ],
        'harvest.add.pick'
      )
    }
  }

  protected readonly DateService = DateService;
  protected readonly moment = moment;

}
