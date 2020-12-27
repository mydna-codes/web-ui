import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {PlasmidJsIframeComponent} from './components/plasmid-js-iframe/plasmid-js-iframe.component'
import {AnalyisisComponent} from './components/analyisis/analyisis.component'

@NgModule({
  declarations: [
    AppComponent,
    AnalyisisComponent,
    PlasmidJsIframeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
