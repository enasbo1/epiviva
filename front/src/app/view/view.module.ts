import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionComponent } from './connection/connection/connection.component';
import { RouterModule } from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {DiconnectionComponent } from './connection/diconnection/diconnection.component';
import {WpPath} from "./routes";
import {ErrorModule} from "./error/error.module";
import { InscriptionComponent } from './connection/inscription/inscription.component';



@NgModule({
  declarations: [
    ConnectionComponent,
    DiconnectionComponent,
    InscriptionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ErrorModule,
    RouterModule.forChild([
      { path: WpPath.login, component: ConnectionComponent},
      { path: WpPath.inscription, component: InscriptionComponent},
      { path: WpPath.logout, component: DiconnectionComponent},
      ]
    )
  ]
})
export class ViewModule { }
