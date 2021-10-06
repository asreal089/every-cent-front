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
import { LancamentoComponent } from './lancamento/lancamento.component';
import { OrcamentoComponent } from './orcamento/orcamento.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PiechartComponent,
    StackedchartComponent,
    EventlistComponent,
    LandingpageComponent,
    LancamentoComponent,
    OrcamentoComponent,
    DashboardComponent,
    LoginFormComponent,
    LoginComponent,
    RegisterComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartModule,
    RouterModule.forRoot([
      {path: 'dashboard', component: DashboardComponent},
      {path: '', component: LandingpageComponent},
      {path: 'lancamento', component: LancamentoComponent},
      {path: 'orcamento', component: OrcamentoComponent},
      {path: 'login', component: LoginComponent},
      {path: 'signin', component: RegisterComponent}
    ]),
    FormsModule,
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
