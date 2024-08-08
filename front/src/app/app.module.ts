import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {HeadFootModule} from "./head-foot/headFoot.module";
import {SharedModule} from "./shared/shared.module";
import {ViewModule} from "./view/view.module";
import {EpvPath} from "./view/routes";
import {Error404Component} from "./view/error/error404/error404.component";
import {HomeComponent} from "./view/home/home.component";

@NgModule({
  declarations: [ // witch component you need from this module
    AppComponent,
  ],
  imports: [ // witch others modules you need
    BrowserModule,
    HttpClientModule,
    SharedModule,
    ViewModule,
    HeadFootModule,
    RouterModule.forRoot([
      { path: EpvPath.home, component: HomeComponent},/*
      { path: '', redirectTo: 'home', pathMatch: 'full'},*/
      { path: '**', component: Error404Component}
    ]),
  ],
  bootstrap: [ // the starters components (or mains components)
    AppComponent
  ],
  exports: [ // witch elements and modules other modules needs from you,
             // /!\ export are inherited by export but NOT BY IMPORT
    //...
  ]
})
export class AppModule { }
