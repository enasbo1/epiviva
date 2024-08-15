import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {EpvPath} from "../routes";
import { CandidateComponent } from '././candidate/candidate.component';
import { AddressesComponent } from "../shared/addresses/addresses.component";
import { ServiceListComponent } from './service-list/service-list.component';
import {SharedModule} from "../../shared/shared.module";
import { VisitorServiceDetailComponent } from './visitor-service-detail/visitor-service-detail.component';
import { VisitorCandidateListComponent } from './visitor-candidate-list/visitor-candidate-list.component';
import { VisitorCandidateDetailComponent } from './visitor-candidate-detail/visitor-candidate-detail.component';
import {ToBeImplementedComponent} from "../../shared/foundation/to-be-implemented/to-be-implemented.component";
import { VisitorCandidateEditComponent } from './visitor-service-detail/visitor-candidate-edit.component';



@NgModule({
  declarations: [
    CandidateComponent,
    ServiceListComponent,
    VisitorServiceDetailComponent,
    VisitorCandidateListComponent,
    VisitorCandidateDetailComponent,
    VisitorCandidateEditComponent
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
      {path: EpvPath.visitor.addresses, component: AddressesComponent},
      {path: EpvPath.visitor.root, redirectTo: EpvPath.visitor.home, pathMatch:"full"},
    ]),
  ]
})
export class VisitorModule { }
