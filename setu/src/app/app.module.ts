import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { LoginComponent } from './login/login.component';
import { ReportsComponent } from './reports/reports.component';
import { HttpClientModule } from '@angular/common/http';
import { PmjayDashboardComponent } from './pmjay-dashboard/pmjay-dashboard.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PmjayOperationDashboardComponent } from './pmjay-operation-dashboard/pmjay-operation-dashboard.component';
import { DataTablesModule } from 'angular-datatables';
import { CardReportComponent } from './card-report/card-report.component';
import { BisReportComponent } from './bis-report/bis-report.component';
import { CghsDashboardComponent } from './cghs-dashboard/cghs-dashboard.component';
import { CapfDashboardComponent } from './capf-dashboard/capf-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SaProductReportComponent } from './sa-product-report/sa-product-report.component';
import { CghsReportComponent } from './cghs-report/cghs-report.component';
import { CghsLoginComponent } from './cghs-login/cghs-login.component';
import { SetuCardReportComponent } from './setu-card-report/setu-card-report.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CghsHomeComponent } from './cghs-home/cghs-home.component';
import { HeaderinsightsComponent } from './headerinsights/headerinsights.component';
import { CardDriveReportComponent } from './card-drive-report/card-drive-report.component';
import { CapfInsightsComponent } from './capf-insights/capf-insights.component';
import { PmjayClaimsComponent } from './pmjay-claims/pmjay-claims.component';
import { PmjayHomeDashboardComponent } from './pmjay-home-dashboard/pmjay-home-dashboard.component';
import { ClaimHomeDashboardComponent } from './claim-home-dashboard/claim-home-dashboard.component';
import { CghsHomeDashboardComponent } from './cghs-home-dashboard/cghs-home-dashboard.component';
import { CapfHomeDashboardComponent } from './capf-home-dashboard/capf-home-dashboard.component';
import { CardDriveHomeDashboardComponent } from './card-drive-home-dashboard/card-drive-home-dashboard.component';
import { HomeErupiComponent } from './home-erupi/home-erupi.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeDashboardComponent,
    LoginComponent,
    ReportsComponent,
    PmjayDashboardComponent,
    PmjayOperationDashboardComponent,
    CardReportComponent,
    BisReportComponent,
    CghsDashboardComponent,
    DashboardComponent,
    CapfDashboardComponent,
    SaProductReportComponent,
    CghsReportComponent,
    CghsLoginComponent,
    SetuCardReportComponent,
    CghsHomeComponent,
    HeaderinsightsComponent,
    CardDriveReportComponent,
    CapfInsightsComponent,
    PmjayClaimsComponent,
    PmjayHomeDashboardComponent,
    ClaimHomeDashboardComponent,
    CghsHomeDashboardComponent,
    CapfHomeDashboardComponent,
    CardDriveHomeDashboardComponent,
    HomeErupiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,DataTablesModule,TooltipModule,NgbModule,FormsModule,ReactiveFormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
