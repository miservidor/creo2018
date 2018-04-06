import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainComponent} from './main/main.component';
import {MenulatComponent} from './menulat/menulat.component'
import { AdminRoutingModule } from './admin-routing.module';
import { LateralComponent } from './lateral/lateral.component';
import { CentralComponent } from './central/central.component';

import { ControlbutService} from './controlbut.service';
import { EdicionComponent } from './edicion/edicion.component';
import { ConfigComponent } from './config/config.component';
@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [MainComponent, MenulatComponent, LateralComponent, CentralComponent, EdicionComponent, ConfigComponent],
  providers: [ControlbutService]
})
export class AdminModule { }
