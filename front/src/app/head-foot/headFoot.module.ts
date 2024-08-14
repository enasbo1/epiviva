import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkWithHref} from "@angular/router";
import { HeaderComponent } from './header/header.component';
import { SharedModule } from "../shared/shared.module";
import { VisitorHeaderComponent } from './header/visitor-header/visitor-header.component';



@NgModule({
    declarations: [
      HeaderComponent,
      VisitorHeaderComponent
    ],
    imports: [
        CommonModule,
        RouterLinkWithHref,
        SharedModule,
        RouterLink,
    ],
    exports: [
        HeaderComponent,
        VisitorHeaderComponent
    ]
})
export class HeadFootModule { }
