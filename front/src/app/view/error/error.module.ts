import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from './error404/error404.component';
import { Error403Component } from './error403/error403.component';



@NgModule({
  declarations: [
    Error404Component,
    Error403Component
  ],
  imports: [
    CommonModule
  ]
})
export class ErrorModule { }
