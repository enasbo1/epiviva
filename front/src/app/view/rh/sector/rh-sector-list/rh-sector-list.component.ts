import {Component, EventEmitter, OnInit} from '@angular/core';
import {GlobalService} from "../../../../shared/global.service";
import {SectorModelService} from "../../../../http/model/sector-model/sector-model.service";
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {SectorMapperService} from "../../../../mapper/sector-mapper.service";
import {EpvPath} from "../../../routes";
import {FilterObject} from "../../../../shared/foundation/list/filterObject";
import {ModaleService} from "../../../../shared/foundation/modale/modale.service";
import {FormStepObject} from "../../../../shared/base-shared/form-step/formStepObject";
import {FormService} from "../../../../shared/foundation/form/form.service";
import {SectorObject} from "../../../../http/model/sector-model/sectorObject";

@Component({
  selector: 'epv-rh-sector-list',
  templateUrl: './rh-sector-list.component.html',
  styleUrls: ['./rh-sector-list.component.scss']
})
export class RhSectorListComponent implements OnInit {
  public items:ListObject[]=[]
  public critera:string[] = [
      'address.title'
  ]
  public filter:FilterObject[] = [
    {name:'address.city.title', type:'auto'},
  ]

  constructor(
      private sectorModelService: SectorModelService,
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "sector.list"
    this.sectorModelService.get_sector().subscribe(sector => {
      this.items = sector.map(x=>SectorMapperService.model_to_list(x,'/'+EpvPath.rh.sector.details));
    })
  }

  add_sector() {
    ModaleService.createFormModal(SectorMapperService.form(
        (step: FormStepObject): EventEmitter<boolean> | false => this.verify_sector(step))).subscribe(() =>
        ModaleService.createTextModal('sector.created').subscribe(() =>
            window.location.reload()
        )
    )
  }

  private verify_sector(step: FormStepObject) {
    const step_values = FormService.extract_values([step]);
    const verif = new EventEmitter<boolean>();
    const sector:SectorObject = {
      nom:FormService.get_value(step_values, 'name') as string,
      address:{
        address:FormService.get_value(step_values, 'address') as string,
        instruction: FormService.get_value(step_values, 'instruction') as string,
        kind: FormService.get_value(step_values, 'kind') as string,
        city: (FormService.get_value(step_values, 'city') as string).toUpperCase(),
        postal_code: FormService.get_value(step_values, 'postal_code') as string,
      }
    }

    this.sectorModelService.post_sector(sector).subscribe(()=>
        verif.emit(true)
    )
    return verif;
  }
}
