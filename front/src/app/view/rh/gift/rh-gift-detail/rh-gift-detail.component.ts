import { Component, OnInit } from '@angular/core';
import moment from "moment/moment";
import {DateService} from "../../../../http/shared/date.service";
import {ProductGetObject, ProductSelfObject} from "../../../../http/model/product-model/productObject";
import {ProductModelService} from "../../../../http/model/product-model/product-model.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../../../../shared/global.service";
import {ModaleService} from "../../../../shared/foundation/modale/modale.service";
import {ProductMapperService} from "../../../../mapper/product-mapper.service";
import {UserModelService} from "../../../../http/model/user-model/user-model.service";
import {LanguageService} from "../../../../shared/base-shared/language.service";
import {UserMapperService} from "../../../../mapper/user-mapper.service";

@Component({
  selector: 'epv-rh-gift-detail',
  templateUrl: './rh-gift-detail.component.html',
  styleUrls: ['./rh-gift-detail.component.scss']
})
export class RhGiftDetailComponent implements OnInit {

  public products:ProductGetObject[] = [];

  constructor(
      private productModelService: ProductModelService,
      private userModelService: UserModelService,
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

  }

  protected readonly DateService = DateService;

  refuse_product(product: ProductSelfObject) {
    this.productModelService.refuse_product(product.id).subscribe(()=>
        this.ngOnInit()
    )
  }

  edit_product(product: ProductGetObject) {
    ModaleService.createFormModal(
        ProductMapperService.model_to_form(product)
    ).subscribe((form)=>
        this.productModelService.patch_product_self(ProductMapperService.form_to_model(form, product)).subscribe(()=>this.ngOnInit())
    )
  }

  protected readonly moment = moment;
}
