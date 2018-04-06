import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { environment } from '../environments/environment';

import { ChartsModule } from 'ng2-charts';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { FichamapPipe } from './fichamap.pipe';
import { MenusupComponent } from './menusup/menusup.component';
import { CiudadcolComponent } from './main/ciudadcol/ciudadcol.component';
import { GraficosComponent } from './main/graficos/graficos.component';
import { ProgramasComponent } from './main/programas/programas.component';

export const appRoutes: Routes = [
  { path: '', component: CiudadcolComponent },
  { path: 'index', component: CiudadcolComponent },
  { path: 'maps', component: GoogleMapsComponent },
  { path: 'programas', component: ProgramasComponent },
  { path: 'administrador', loadChildren: 'app/admin/admin.module#AdminModule' },
  { path: '**', component: CiudadcolComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapsComponent,
    FichamapPipe,
    MenusupComponent,
    CiudadcolComponent,
    GraficosComponent,
    ProgramasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule,
    Ng2SearchPipeModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  exports:[RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
