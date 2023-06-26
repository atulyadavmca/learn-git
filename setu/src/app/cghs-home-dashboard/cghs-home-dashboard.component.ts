import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cghs-home-dashboard',
  templateUrl: './cghs-home-dashboard.component.html',
  styleUrls: ['./cghs-home-dashboard.component.css']
})
export class CghsHomeDashboardComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }
  getReport(val:any)
  {
    if(val=="pmjayhome")
    {
      this.router.navigate(['/pmjayhome']);
    }
    if(val=="pmjayclaims")
    {
      this.router.navigate(['/pmjayclaims']);
    }
    if(val=="cghs")
    {
      this.router.navigate(['/cghs']);
    }
    if(val=="capf")
    {
      this.router.navigate(['/capf']);
    }
    if(val=="carddrive")
    {
      this.router.navigate(['/carddrive']);
    }
  }

}
