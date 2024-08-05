import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ListComponent} from "./list/list.component";
import {BaseSharedModule} from "../base-shared/base-shared.module";
import {RouterLink, RouterLinkWithHref} from "@angular/router";
import { InfoBandComponent } from './info-band/info-band.component';
import {FormsModule} from "@angular/forms";
import { RubricListComponent } from './rubric-list/rubric-list.component';
import { ChatComponent } from './chat/chat.component';
import { FormComponent } from './form/form.component';
import { ModaleComponent } from "./modale/modale.component";
import { ToBeImplementedComponent } from './to-be-implemented/to-be-implemented.component';



@NgModule({
  declarations: [
    ListComponent,
    InfoBandComponent,
    RubricListComponent,
    ChatComponent,
    FormComponent,
    ModaleComponent,
    ToBeImplementedComponent
  ],
  imports: [
      BaseSharedModule,
      CommonModule,
      RouterLinkWithHref,
      RouterLink,
      FormsModule,
      NgOptimizedImage
  ],
  exports: [
    ListComponent,
    InfoBandComponent,
    RubricListComponent,
    ChatComponent,
    FormComponent,
    ModaleComponent
  ]
})
export class FoundationModule { }
