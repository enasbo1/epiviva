import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {EpvPath} from "../routes";
import {HomeComponent} from "../home/home.component";
import { RhCandidateListComponent } from './candidate/rh-candidate-list/rh-candidate-list.component';
import {FoundationModule} from "../../shared/foundation/foundation.module";
import { RhCandidateDetailComponent } from './candidate/rh-candidate-detail/rh-candidate-detail.component';
import {BaseSharedModule} from "../../shared/base-shared/base-shared.module";
import {OptionsComponent} from "../shared/options/options.component";
import { RhBenefitListComponent } from './benefit/rh-benefit-list/rh-benefit-list.component';
import { RhBenefitDetailComponent } from './benefit/rh-benefit-detail/rh-benefit-detail.component';
import {ToBeImplementedComponent} from "../../shared/foundation/to-be-implemented/to-be-implemented.component";
import { RhGiftListComponent } from './gift/rh-gift-list/rh-gift-list.component';
import { RhGiftDetailComponent } from './gift/rh-gift-detail/rh-gift-detail.component';
import { RhSectorListComponent } from './sector/rh-sector-list/rh-sector-list.component';
import { RhSectorDetailComponent } from './sector/rh-sector-detail/rh-sector-detail.component';



@NgModule({
  declarations: [
    RhCandidateListComponent,
    RhCandidateDetailComponent,
    RhBenefitListComponent,
    RhBenefitDetailComponent,
    RhGiftListComponent,
    RhGiftDetailComponent,
    RhSectorListComponent,
    RhSectorDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: EpvPath.rh.home, component: HomeComponent},
      {path: EpvPath.rh.candidate.list, component: RhCandidateListComponent},
      {path: EpvPath.rh.candidate.details, component: RhCandidateDetailComponent},
      {path: EpvPath.rh.benefit.list, component: RhBenefitListComponent},
      {path: EpvPath.rh.benefit.details, component: RhBenefitDetailComponent},
      {path: EpvPath.rh.gift.list, component: RhGiftListComponent},
      {path: EpvPath.rh.gift.details, component: RhGiftDetailComponent},
      {path: EpvPath.rh.sector.list, component: RhSectorListComponent},
      {path: EpvPath.rh.sector.details, component: RhSectorDetailComponent},
      {path: EpvPath.rh.options, component: OptionsComponent},
      {path: EpvPath.rh.root, redirectTo: EpvPath.rh.home, pathMatch: "full"},
    ]),
    FoundationModule,
    BaseSharedModule,
  ]
})
export class RhModule { }
