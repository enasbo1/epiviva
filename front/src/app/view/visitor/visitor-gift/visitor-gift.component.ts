import { Component, OnInit } from '@angular/core';
import {UserModelService} from "../../../http/model/user-model/user-model.service";
import {Router} from "@angular/router";
import {EpvPath} from "../../routes";
import {ProductModelService} from "../../../http/model/product-model/product-model.service";
import {ProductSelfObject} from "../../../http/model/product-model/productObject";
import {DateService} from "../../../http/shared/date.service";
import {ModaleService} from "../../../shared/foundation/modale/modale.service";
import {ProductMapperService} from "../../../mapper/product-mapper.service";
import {GlobalService} from "../../../shared/global.service";
import moment from "moment";
import {HarvestGetObject} from "../../../http/model/harvest-model/harvestObject";

@Component({
  selector: 'epv-visitor-gift',
  templateUrl: './visitor-gift.component.html',
  styleUrls: ['./visitor-gift.component.scss']
})
export class VisitorGiftComponent implements OnInit {

  public products:ProductSelfObject[] = [];
  public harvest?:HarvestGetObject;

  constructor(
      private userModelService: UserModelService,
      private productModelService: ProductModelService,
      private router: Router
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = 'gift.title'
    this.userModelService.get_self().subscribe(
        (users)=>{
          if (users?.length > 0) {
            if (!users[0].address_id){
              this.router.navigate(['/'+EpvPath.visitor.addresses], {queryParams:{targetPage:EpvPath.visitor.gift.root}}).then();
            }
          }
        }
    );
    this.productModelService.get_self_product().subscribe((products)=>
      {
        this.products = products;
        this.harvest =  this.products.find(p=>p.harvest?.id)?.harvest
      }
    )

  }

    protected readonly DateService = DateService;

    drop_product(product: ProductSelfObject) {
        this.productModelService.delete_product(product.id).subscribe(()=>
            this.ngOnInit()
        )
    }

    add_product() {
        ModaleService.createFormModal(
            ProductMapperService.model_to_form()
        ).subscribe((form)=>
            this.productModelService.post_product_self(ProductMapperService.form_to_model(form)).subscribe(()=>this.ngOnInit())
        )
    }

    edit_product(product: ProductSelfObject) {
        if (product.refused !== 't'){
            ModaleService.createFormModal(
                ProductMapperService.model_to_form(product)
            ).subscribe((form)=>
                this.productModelService.patch_product_self(ProductMapperService.form_to_model(form, product)).subscribe(()=>this.ngOnInit())
            )
        }

    }

    protected readonly moment = moment;
}
