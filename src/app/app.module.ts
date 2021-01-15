import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

/* KEYCLOAK */
import {KeycloakService, NgxKeycloakModule} from '@procempa/ngx-keycloak';
import {KeycloakAuthGuard} from "@procempa/ngx-keycloak";

/* COMPONENTS */
import {AppComponent} from './app.component';
import {PlasmidJsIframeComponent} from './components/plasmid-js-iframe/plasmid-js-iframe.component'
import {AnalysisComponent} from './components/analyisis/analysis.component'

import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GraphQLModule} from './graphql.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';

/* ROUTING */
import {RouterModule, Routes} from '@angular/router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

/* ANGULAR MATERIAL */
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';

/* CHARTS */
import {ChartsModule} from 'ng2-charts'
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {StorageComponent} from './components/storage/storage.component';
import {initKeycloak} from "./factories/fatories";
import { HomeComponent } from './components/home/home.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';

import {MatNativeDateModule} from '@angular/material/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {DemoMaterialModule} from './material-module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';


const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [KeycloakAuthGuard]},
  {path: 'dashboard', component: DashboardComponent,  canActivate: [KeycloakAuthGuard]},
  {path: 'analysis', component: AnalysisComponent,  canActivate: [KeycloakAuthGuard]},
  {path: 'storage', component: StorageComponent,  canActivate: [KeycloakAuthGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    AnalysisComponent,
    PlasmidJsIframeComponent,
    DashboardComponent,
    StorageComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgxKeycloakModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    GraphQLModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatTableModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    ChartsModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatSelectModule,
    BrowserModule,
    DemoMaterialModule,
    MatNativeDateModule,

  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
