import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VolunteerDistributeListComponent} from "./volunteer-distribute-list/volunteer-distribute-list.component";
import {
  VolunteerDistributeDetailsComponent
} from "./volunteer-distribute-details/volunteer-distribute-details.component";
import {RouterModule} from "@angular/router";
import {EpvPath} from "../routes";
import {ConnectionComponent} from "../connection/connection/connection.component";
import {FoundationModule} from "../../shared/foundation/foundation.module";
import {BaseSharedModule} from "../../shared/base-shared/base-shared.module";



@NgModule({
  declarations: [
    VolunteerDistributeListComponent,
    VolunteerDistributeDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: EpvPath.volunteer.distribute.list, component: VolunteerDistributeListComponent},
      {path: EpvPath.volunteer.distribute.details, component: VolunteerDistributeDetailsComponent}
    ]),
    FoundationModule,
    BaseSharedModule
  ]
})
export class VolunteerModule { }
