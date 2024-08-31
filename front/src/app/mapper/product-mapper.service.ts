import { Injectable } from '@angular/core';
import {
  ProductMinObject,
  ProductObject,
  ProductPostObject,
  ProductSelfObject
} from "../http/model/product-model/productObject";
import {FormStepObject} from "../shared/base-shared/form-step/formStepObject";
import {RegexBase} from "../shared/RegexBase";
import {DateService} from "../http/shared/date.service";
import {FormFieldObject} from "../shared/base-shared/form-field/formFieldObject";
import {FormService} from "../shared/foundation/form/form.service";
import moment from "moment";
import {ModalListObject} from "../shared/foundation/modale/modalObject";

@Injectable({
  providedIn: 'root'
})
export class ProductMapperService {
  static model_to_form(model?:ProductMinObject):FormStepObject{
    return {
      content:[
        {
          content: [
            {
              name: 'name',
              title: 'gift.form.name.title',
              type: 'text',
              placeholder: 'gift.form.name.placeholder',
              default: model?.name ?? '',
              reg_error: [
                {regex: RegexBase.required, message: "gift.form.name.required" },
              ]
            },
            {
              name: 'code_barre',
              title: 'gift.form.bar_code.title',
              type: 'text',
              placeholder: 'gift.form.bar_code.placeholder',
              default: model?.code_barre ?? '',
              reg_error: [
                {regex: RegexBase.bar_code, message: "gift.form.bar_code.reg_error" },
              ]
            },
            {
              name: 'marque',
              title: 'gift.form.brand.title',
              type: 'text',
              placeholder: 'gift.form.brand.placeholder',
              default: model?.marque ?? '',
              reg_error: [
                {regex: RegexBase.required, message: "gift.form.brand.required" },
              ]
            },
            {
              name: 'expiration_date',
              title: 'gift.form.expiration_date.title',
              type: 'date',
              placeholder: 'gift.form.expiration_date.placeholder',
              min:new Date(),
            }
          ]
        }
      ]
    }
  }

  static form_to_model(values: FormFieldObject[], product?:ProductSelfObject):ProductPostObject {
    return {
      id: product?.id, // Utilise l'ID du produit s'il existe, sinon 0
      code_barre: (FormService.get_value(values, "code_barre", product?.code_barre) as string),
      name:  (FormService.get_value(values, "name", product?.name) as string).trim(),
      marque: (FormService.get_value(values, "marque", product?.marque) as string).trim(),
      expiration_date: FormService.get_value(values, "expiration_date", DateService.to_api(product?.expiration_date)) as string
    };
  }
}
