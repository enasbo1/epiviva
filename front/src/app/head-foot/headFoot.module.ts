import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkWithHref} from "@angular/router";
import { HeaderComponent } from './header/header.component';
import { SharedModule } from "../shared/shared.module";
import { VisitorHeaderComponent } from './header/visitor-header/visitor-header.component';
import { RhHeaderComponent } from './header/rh-header/rh-header.component';
import { AdminHeaderComponent } from './header/admin-header/admin-header.component';



@NgModule({
    declarations: [
      HeaderComponent,
      VisitorHeaderComponent,
      RhHeaderComponent,
      AdminHeaderComponent
    ],
    imports: [
        CommonModule,
        RouterLinkWithHref,
        SharedModule,
        RouterLink,
    ],
    exports: [
        HeaderComponent,
        VisitorHeaderComponent,
        AdminHeaderComponent,
        RhHeaderComponent
    ]
})
export class HeadFootModule { }
