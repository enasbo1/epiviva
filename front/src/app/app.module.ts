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
import {Error403Component} from "./view/error/error403/error403.component";

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
      { path: EpvPath.home, component: HomeComponent},
      { path: EpvPath._404_, component: Error404Component},
      { path: EpvPath._403_, component: Error403Component},
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: '**', component: Error404Component}
    ]),
  ],
  bootstrap: [
    AppComponent
  ],
  exports: [
  ]
})
export class AppModule { }
