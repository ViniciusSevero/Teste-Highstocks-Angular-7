import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CandleGraphComponent} from './candle-graph/candle-graph.component'
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import * as highstock from 'highcharts/modules/stock.src';

@NgModule({
  declarations: [
    AppComponent,
    CandleGraphComponent
  ],
  imports: [
    BrowserModule,
    ChartModule
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting, highstock ] } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
