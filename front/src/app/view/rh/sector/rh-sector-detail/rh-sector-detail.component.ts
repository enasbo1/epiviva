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

@Component({
  selector: 'epv-rh-sector-detail',
  templateUrl: './rh-sector-detail.component.html',
  styleUrls: ['./rh-sector-detail.component.scss']
})
export class RhSectorDetailComponent implements OnInit {

  private sector?:SectorObject;
  public rubric?:RubricObject[];

  constructor(
      private route : ActivatedRoute,
      private sectorModelService: SectorModelService,
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
              this.rubric = [
                  SectorMapperService.model_to_rubric(this.sector),
                  AddressMapperService.model_to_rubric(this.sector.address)
              ];
            }
          }
        )
      }
      }
    )
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
}
