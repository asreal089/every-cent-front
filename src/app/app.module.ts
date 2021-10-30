import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormBuilder } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PiechartComponent } from './piechart/piechart.component';
import { ChartModule } from 'primeng/chart';
import {TabViewModule} from 'primeng/tabview';
import { EventlistComponent } from './eventlist/eventlist.component';
import {TableModule} from 'primeng/table';
import { ProductService } from './eventlist/productservice';
import { HttpClientModule } from '@angular/common/http';
import {ButtonModule} from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LancamentoComponent } from './lancamento/lancamento.component';
import { OrcamentoComponent } from './orcamento/orcamento.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { OrcamentoNovoComponent } from './orcamento-novo/orcamento-novo.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import { LancamentoRegistroComponent } from './lancamento-registro/lancamento-registro.component';
import { CalendarModule } from 'primeng/calendar';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PiechartComponent,
    EventlistComponent,
    LandingpageComponent,
    LancamentoComponent,
    OrcamentoComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    OrcamentoNovoComponent,
    LancamentoRegistroComponent,
    BarChartComponent,
    RadarChartComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartModule,
    RouterModule.forRoot([
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      {path: '', component: LandingpageComponent},
      {path: 'lancamento', component: LancamentoComponent, canActivate: [AuthGuard] },
      {path: 'lancamento/registro', component: LancamentoRegistroComponent, canActivate: [AuthGuard] },
      {path: 'lancamento/registro/:lancamentoID', component: LancamentoRegistroComponent, canActivate: [AuthGuard] },
      {path: 'orcamento', component: OrcamentoComponent, canActivate: [AuthGuard]},
      {path: 'orcamento/novo', component: OrcamentoNovoComponent, canActivate:[AuthGuard]},
      {path: 'orcamento/novo/:orcamentoID', component: OrcamentoNovoComponent, canActivate:[AuthGuard]},
      {path: 'login', component: LoginComponent},
      {path: 'signin', component: RegisterComponent}
    ]),
    FormsModule,
    CalendarModule,
    HttpClientModule,
    TabViewModule,
    TableModule,
    ButtonModule,
    SelectButtonModule,
    AppRoutingModule
  ],
  providers: [ProductService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
