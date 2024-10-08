import { Injectable } from '@angular/core';
import {RequestService} from "../../shared/request.service";
import {ProductGetObject, ProductObject, ProductPostObject, ProductSelfObject} from "./productObject";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductModelService extends RequestService{

  get_self_product():Observable<ProductSelfObject[]>  {
    return (this.get('product/self') as Observable<ProductSelfObject[]>);
  }

  get_stock(sector_id:number|bigint):Observable<ProductSelfObject[]>  {
    return (this.get_one('product/stock', sector_id) as Observable<ProductSelfObject[]>);
  }

  get_from_distribute(distribute_id:number|bigint):Observable<ProductSelfObject[]>  {
    return (this.get_one('product/distribute', distribute_id) as Observable<ProductSelfObject[]>);
  }

  delete_product(id: number | bigint):Observable<object> {
    return (this.delete('product', id))
  }

  post_product(product: ProductSelfObject):Observable<object> {
    return (this.post(product, 'product'));
  }

  post_product_self(product: ProductPostObject):Observable<object> {
    return (this.post(product, 'product/self'));
  }

  patch_product_self(product: ProductPostObject) {
    return (this.edit(product, 'product/self'));
  }

  get_user_product(user_id: number|bigint):Observable<ProductGetObject[]> {
    return (this.get('product/user/'+user_id) as Observable<ProductGetObject[]>);

  }

  refuse_product(id: number | bigint):Observable<object>  {
    return this.edit({id:id}, 'product/refuse');
  }

  set_harvest(id: number | bigint, harvest: number | bigint) {
    return this.edit({id:id, harvest_id:harvest}, 'product/harvest');
  }

  unAffect_product(id: number | bigint):Observable<object> {
    return this.edit({id:id}, 'product/unAffect');
  }

  set_distribute(id: number | bigint, distribute_id:number | bigint):Observable<object> {
    return this.edit({id:id, distribute_id:distribute_id}, 'product/distribute');
  }
}
