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



@NgModule({
  declarations: [
    RhCandidateListComponent,
    RhCandidateDetailComponent,
    RhBenefitListComponent,
    RhBenefitDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: EpvPath.rh.home, component: HomeComponent},
      {path: EpvPath.rh.candidate.list, component: RhCandidateListComponent},
      {path: EpvPath.rh.candidate.details, component: RhCandidateDetailComponent},
      {path: EpvPath.rh.benefit.list, component: RhBenefitListComponent},
      {path: EpvPath.rh.benefit.detail, component: RhBenefitDetailComponent},
      {path: EpvPath.rh.options, component: OptionsComponent},
      {path: EpvPath.rh.root, redirectTo: EpvPath.rh.home, pathMatch: "full"},
    ]),
    FoundationModule,
    BaseSharedModule,
  ]
})
export class RhModule { }
