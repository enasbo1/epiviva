import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionComponent } from './connection/connection/connection.component';
import { RouterModule } from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {SharedModule as ViewSharedModule} from "../view/shared/shared.module";
import {DiconnectionComponent } from './connection/diconnection/diconnection.component';
import {EpvPath} from "./routes";
import {ErrorModule} from "./error/error.module";
import { InscriptionComponent } from './connection/inscription/inscription.component';
import { HomeComponent } from './home/home.component';
import { VisitorHomeComponent } from './home/visitor-home/visitor-home.component';
import {VisitorModule} from "./visitor/visitor.module";
import { AdminHomeComponent } from './home/admin-home/admin-home.component';
import { RhHomeComponent } from './home/rh-home/rh-home.component';
import { RhModule } from "./rh/rh.module";
import { AdminModule } from "./admin/admin.module";
import { OptionsComponent } from './shared/options/options.component';



@NgModule({
  declarations: [
    ConnectionComponent,
    DiconnectionComponent,
    InscriptionComponent,
    HomeComponent,
    VisitorHomeComponent,
    AdminHomeComponent,
    RhHomeComponent,
    OptionsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ViewSharedModule,
    VisitorModule,
    AdminModule,
    RhModule,
    ErrorModule,
    RouterModule.forChild([
      { path: EpvPath.login, component: ConnectionComponent},
      { path: EpvPath.options, component: OptionsComponent},
      { path: EpvPath.inscription, component: InscriptionComponent},
      { path: EpvPath.logout, component: DiconnectionComponent},
      ]
    )
  ]
})
export class ViewModule { }
