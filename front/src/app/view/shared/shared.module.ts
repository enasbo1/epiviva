import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressesComponent } from './addresses/addresses.component';
import { SharedModule as GlobalSharedModule } from "../../shared/shared.module";



@NgModule({
  declarations: [
    AddressesComponent
  ],
  imports: [
    CommonModule,
    GlobalSharedModule,
  ]
})
export class SharedModule { }
