import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { LoginComponent } from './login/login.component';
import { PmjayDashboardComponent } from './pmjay-dashboard/pmjay-dashboard.component';
import { PmjayOperationDashboardComponent } from './pmjay-operation-dashboard/pmjay-operation-dashboard.component';
import { ReportsComponent } from './reports/reports.component'
import { CardReportComponent } from './card-report/card-report.component';
import { BisReportComponent } from './bis-report/bis-report.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SaProductReportComponent } from './sa-product-report/sa-product-report.component';
import { CghsLoginComponent } from './cghs-login/cghs-login.component';
import { CghsReportComponent } from './cghs-report/cghs-report.component';
import { SetuCardReportComponent } from './setu-card-report/setu-card-report.component';
import { CghsDashboardComponent } from './cghs-dashboard/cghs-dashboard.component';
import { CghsHomeComponent } from './cghs-home/cghs-home.component';
import { CapfInsightsComponent } from './capf-insights/capf-insights.component';
import { PmjayHomeDashboardComponent } from './pmjay-home-dashboard/pmjay-home-dashboard.component';
import { ClaimHomeDashboardComponent } from './claim-home-dashboard/claim-home-dashboard.component';
import { CapfHomeDashboardComponent } from './capf-home-dashboard/capf-home-dashboard.component';
import { CardDriveHomeDashboardComponent } from './card-drive-home-dashboard/card-drive-home-dashboard.component';
import { CghsHomeDashboardComponent } from './cghs-home-dashboard/cghs-home-dashboard.component';
import { HomeErupiComponent } from './home-erupi/home-erupi.component';
const routes: Routes = [
  {
    path:'',
    
    //component:DashboardComponent
    component:PmjayHomeDashboardComponent
   //component:HomeErupiComponent
    
  },
  {
    path:'pmjay',
    
    component:PmjayOperationDashboardComponent
    //, pathMatch: 'full'
    
  },
  {
    path:'setucardreport',
    
    component:SetuCardReportComponent
    //, pathMatch: 'full'
  },
  {
    path:'login', 
    component:LoginComponent
  },{
    path:'cghslogin', 
    component:CghsLoginComponent
  },
  {
    path:'report',
    component:ReportsComponent
  },
  {
    path:'bisdashboard',
    component:BisReportComponent
  },
  {
    path:'cghsinsights',
    component:SaProductReportComponent
  },{
    path:'pmjayclaims',
    component:ClaimHomeDashboardComponent
  },
  
  {
    path:'cghs',
    component:CghsHomeDashboardComponent
  },
  {
    path:'capf',
    component:CapfHomeDashboardComponent
  }
  ,{
    path:'carddrive',
    component:CardDriveHomeDashboardComponent
  },{
    path:'pmjayhome',
    component:PmjayHomeDashboardComponent
  },{
    path:'capfinsights',
    component:CapfInsightsComponent
  }
  
  /*,{
    path:'cghs',
   
    component:CghsHomeComponent
  }*/,
  { path: '**', component:HomeDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
