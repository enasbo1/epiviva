import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {EpvPath} from "../routes";
import { CandidateComponent } from './service/candidate/candidate.component';
import { AddressesComponent } from "../shared/addresses/addresses.component";
import { ServiceListComponent } from './service/service-list/service-list.component';
import {SharedModule} from "../../shared/shared.module";
import { VisitorServiceDetailComponent } from './service/visitor-service-detail/visitor-service-detail.component';
import { VisitorCandidateListComponent } from './service/visitor-candidate-list/visitor-candidate-list.component';
import { VisitorCandidateDetailComponent } from './service/visitor-candidate-detail/visitor-candidate-detail.component';
import { VisitorCandidateEditComponent } from './service/visitor-service-detail/visitor-candidate-edit.component';
import { OptionsComponent } from "../shared/options/options.component";
import { VisitorBenefitComponent } from './benefit/visitor-benefit/visitor-benefit.component';
import { VisitorBenefitEditComponent } from './benefit/visitor-benefit-edit/visitor-benefit-edit.component';
import { VisitorBenefitDetailComponent } from './benefit/visitor-benefit-detail/visitor-benefit-detail.component';



@NgModule({
  declarations: [
    CandidateComponent,
    ServiceListComponent,
    VisitorServiceDetailComponent,
    VisitorCandidateListComponent,
    VisitorCandidateDetailComponent,
    VisitorCandidateEditComponent,
    VisitorBenefitComponent,
    VisitorBenefitEditComponent,
    VisitorBenefitDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: EpvPath.visitor.home, component: HomeComponent},
      {path: EpvPath.visitor.candidate, component: CandidateComponent},
      {path: EpvPath.visitor.services.list, component: ServiceListComponent},
      {path: EpvPath.visitor.services.detail, component: VisitorServiceDetailComponent},
      {path: EpvPath.visitor.candidated.list, component: VisitorCandidateListComponent},
      {path: EpvPath.visitor.candidated.edit, component: VisitorCandidateEditComponent},
      {path: EpvPath.visitor.candidated.details, component: VisitorCandidateDetailComponent},
      {path: EpvPath.visitor.benefit.root, component: VisitorBenefitComponent},
      {path: EpvPath.visitor.benefit.detail, component: VisitorBenefitDetailComponent},
      {path: EpvPath.visitor.benefit.edit, component: VisitorBenefitEditComponent},
      {path: EpvPath.visitor.addresses, component: AddressesComponent},
      {path: EpvPath.visitor.options, component: OptionsComponent},
      {path: EpvPath.visitor.root, redirectTo: EpvPath.visitor.home, pathMatch:"full"},
    ]),
  ]
})
export class VisitorModule { }
