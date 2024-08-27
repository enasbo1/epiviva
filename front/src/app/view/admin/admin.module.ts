import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminServiceListComponent } from './admin-service-list/admin-service-list.component';
import {RouterModule} from "@angular/router";
import {EpvPath} from "../routes";
import {HomeComponent} from "../home/home.component";
import {FoundationModule} from "../../shared/foundation/foundation.module";
import {SharedModule} from "../../shared/shared.module";
import {OptionsComponent} from "../shared/options/options.component";
import { AdminServiceDetailComponent } from './admin-service-detail/admin-service-detail.component';
import { AdminServiceNewComponent } from './admin-service-new/admin-service-new.component';
import { AdminServiceFormComponent } from './admin-service-form/admin-service-form.component';
import { AdminServiceEditComponent } from './admin-service-edit/admin-service-edit.component';
import { ToBeImplementedComponent } from "../../shared/foundation/to-be-implemented/to-be-implemented.component";
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminUserDetailComponent } from './admin-user-detail/admin-user-detail.component';
import { AdminTestPdfComponent } from './admin-test-pdf/admin-test-pdf.component';



@NgModule({
  declarations: [
    AdminServiceListComponent,
    AdminServiceDetailComponent,
    AdminServiceNewComponent,
    AdminServiceFormComponent,
    AdminServiceEditComponent,
    AdminUserListComponent,
    AdminUserDetailComponent,
    AdminTestPdfComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: EpvPath.admin.home, component: HomeComponent},
      {path: EpvPath.admin.services.list, component: AdminServiceListComponent},
      {path: EpvPath.admin.services.edit, component: AdminServiceEditComponent},
      {path: EpvPath.admin.services.new, component: AdminServiceNewComponent},
      {path: EpvPath.admin.services.detail, component: AdminServiceDetailComponent},
      {path: EpvPath.admin.users.list, component: AdminUserListComponent},
      {path: EpvPath.admin.users.edit, component: ToBeImplementedComponent},
      {path: EpvPath.admin.users.detail, component: AdminUserDetailComponent},
      {path: EpvPath.admin.options, component: OptionsComponent},
      {path: EpvPath.admin.testPdf, component: AdminTestPdfComponent},
      {path: EpvPath.admin.root, redirectTo: EpvPath.admin.home, pathMatch: "full"},
    ]),
    FoundationModule,
    SharedModule,
  ]
})
export class AdminModule { }
