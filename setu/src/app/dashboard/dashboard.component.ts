import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CapfDashboardComponent } from '../capf-dashboard/capf-dashboard.component';
import { CapfApiserviceService } from '../service/capf-apiservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //capfdashboard:CapfDashboardComponent;
  constructor(public router: Router,apiservice:CapfApiserviceService) {
    //this.capfdashboard=new CapfDashboardComponent(apiservice,router);
   }

  ngOnInit(): void {
    
    
  }
  OpenLogin()
  {this.router.navigate(['/login']); }
  
}
