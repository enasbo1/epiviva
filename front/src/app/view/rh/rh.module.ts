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
import { RhGiftListComponent } from './gift/rh-gift-list/rh-gift-list.component';
import { RhGiftDetailComponent } from './gift/rh-gift-detail/rh-gift-detail.component';
import { RhSectorListComponent } from './sector/rh-sector-list/rh-sector-list.component';
import { RhSectorDetailComponent } from './sector/rh-sector-detail/rh-sector-detail.component';
import { RhVolunteerListComponent } from './volunteer/rh-volunteer-list/rh-volunteer-list.component';
import { RhVolunteerDetailComponent } from './volunteer/rh-volunteer-detail/rh-volunteer-detail.component';
import {RhDistributionListComponent} from "./distribution/rh-distribution-list/rh-distribution-list.component";
import {RhDistributionDetailComponent} from "./distribution/rh-distribution-detail/rh-distribution-detail.component";
import { RhDistributionEditComponent } from './distribution/rh-distribution-edit/rh-distribution-edit.component';

@NgModule({
  declarations: [
    RhCandidateListComponent,
    RhCandidateDetailComponent,
    RhBenefitListComponent,
    RhBenefitDetailComponent,
    RhGiftListComponent,
    RhGiftDetailComponent,
    RhSectorListComponent,
    RhSectorDetailComponent,
    RhVolunteerListComponent,
    RhVolunteerDetailComponent,
    RhDistributionListComponent,
    RhDistributionDetailComponent,
    RhDistributionEditComponent,
  ],
  imports: [
    CommonModule,
    FoundationModule,
    BaseSharedModule,
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
      {path: EpvPath.rh.volunteer.list, component: RhVolunteerListComponent},
      {path: EpvPath.rh.volunteer.details, component: RhVolunteerDetailComponent},
      {path: EpvPath.rh.distribute.list, component: RhDistributionListComponent},
      {path: EpvPath.rh.distribute.edit, component: RhDistributionEditComponent},
      {path: EpvPath.rh.distribute.details, component: RhDistributionDetailComponent},
      {path: EpvPath.rh.options, component: OptionsComponent},
      {path: EpvPath.rh.root, redirectTo: EpvPath.rh.home, pathMatch: "full"},
    ]),
  ]
})
export class RhModule { }