import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {EpvPath} from "../routes";
import {ToBeImplementedComponent} from "../../shared/foundation/to-be-implemented/to-be-implemented.component";
import { CadidateComponent } from './cadidate/cadidate.component';
import { AddressesComponent } from "../shared/addresses/addresses.component";
import { ServiceListComponent } from './service-list/service-list.component';
import {SharedModule} from "../../shared/shared.module";
import { VisitorServiceDetailComponent } from './visitor-service-detail/visitor-service-detail.component';



@NgModule({
  declarations: [
    CadidateComponent,
    ServiceListComponent,
    VisitorServiceDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: EpvPath.visitor.home, component: HomeComponent},
      {path: EpvPath.visitor.candidate, component: CadidateComponent},
      {path: EpvPath.visitor.services.list, component: ServiceListComponent},
      {path: EpvPath.visitor.services.detail, component: VisitorServiceDetailComponent},
      {path: EpvPath.visitor.addresses, component: AddressesComponent},
      {path: EpvPath.visitor.root, redirectTo: EpvPath.visitor.home, pathMatch:"full"},
    ]),
  ]
})
export class VisitorModule { }
