import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MetricsdashboardComponent } from './components/metricsdashboard/metricsdashboard.component';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// import * as PlotlyJS from 'plotly.js-dist-min';
// import { PlotlyModule } from 'angular-plotly.js';

// PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MetricsdashboardComponent,
    NgxChartsModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
