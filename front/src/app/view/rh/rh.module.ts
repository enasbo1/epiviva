import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {EpvPath} from "../routes";
import {HomeComponent} from "../home/home.component";
import {ToBeImplementedComponent} from "../../shared/foundation/to-be-implemented/to-be-implemented.component";
import { RhCandidateListComponent } from './rh-candidate-list/rh-candidate-list.component';
import {FoundationModule} from "../../shared/foundation/foundation.module";
import { RhCandidateDetailComponent } from './rh-candidate-detail/rh-candidate-detail.component';
import {BaseSharedModule} from "../../shared/base-shared/base-shared.module";
import {OptionsComponent} from "../shared/options/options.component";



@NgModule({
  declarations: [
    RhCandidateListComponent,
    RhCandidateDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: EpvPath.rh.home, component: HomeComponent},
      {path: EpvPath.rh.candidate.list, component: RhCandidateListComponent},
      {path: EpvPath.rh.candidate.details, component: RhCandidateDetailComponent},
      {path: EpvPath.rh.options, component: OptionsComponent},
      {path: EpvPath.rh.root, redirectTo: EpvPath.rh.home, pathMatch: "full"},
    ]),
    FoundationModule,
    BaseSharedModule,
  ]
})
export class RhModule { }
