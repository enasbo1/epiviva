import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './view/exemple/home/welcome.component';
import { RouterModule } from '@angular/router';
import {HeadFootModule} from "./head-foot/headFoot.module";
import {SharedModule} from "./shared/shared.module";
import {ViewModule} from "./view/view.module";
import {WpPath} from "./view/routes";
import {Error404Component} from "./view/error/error404/error404.component";

@NgModule({
  declarations: [ // witch component you need from this module
    AppComponent,
    WelcomeComponent,
  ],
  imports: [ // witch others modules you need
    BrowserModule,
    HttpClientModule,
    SharedModule,
    ViewModule,
    HeadFootModule,
    RouterModule.forRoot([
      { path: WpPath.home, component: WelcomeComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full'},
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
