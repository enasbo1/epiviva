import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {EpvPath} from "../routes";
import {ToBeImplementedComponent} from "../../shared/foundation/to-be-implemented/to-be-implemented.component";
import { CadidateComponent } from './cadidate/cadidate.component';
import { AddressesComponent } from "../shared/addresses/addresses.component";



@NgModule({
  declarations: [
    CadidateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:EpvPath.visitor.home, component: HomeComponent},
      {path:EpvPath.visitor.candidate, component: CadidateComponent},
      {path:EpvPath.visitor.services, component: ToBeImplementedComponent},
      {path:EpvPath.visitor.addresses, component: AddressesComponent},
      {path:EpvPath.visitor.root, redirectTo: EpvPath.visitor.home},
    ])
  ]
})
export class VisitorModule { }
