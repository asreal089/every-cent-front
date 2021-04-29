import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
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



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PiechartComponent,
    StackedchartComponent,
    EventlistComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    HttpClientModule,
    TabViewModule,
    TableModule,
    AppRoutingModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
