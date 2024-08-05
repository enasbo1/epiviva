import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {FoundationModule} from "./foundation/foundation.module";
import {BaseSharedModule} from "./base-shared/base-shared.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FoundationModule,
    BaseSharedModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    BaseSharedModule,
    FoundationModule,
  ]
})
export class SharedModule { }
