import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PiechartComponent } from './piechart/piechart.component';
import { ChartModule } from 'primeng/chart';
import {TabViewModule} from 'primeng/tabview';
import { StackedchartComponent } from './stackedchart/stackedchart.component';
import { EventlistComponent } from './eventlist/eventlist.component';
import {TableModule} from 'primeng/table';
import { ProductService } from './eventlist/productservice';
import { HttpClientModule } from '@angular/common/http';
import {ButtonModule} from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingpageComponent } from './landingpage/landingpage.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PiechartComponent,
    StackedchartComponent,
    EventlistComponent,
    LandingpageComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartModule,
    RouterModule.forRoot([
      {path: 'lista-gastos', component: EventlistComponent},
      {path: '', component: LandingpageComponent},
    ]),
    HttpClientModule,
    TabViewModule,
    TableModule,
    ButtonModule,
    AppRoutingModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
