import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-drive-home-dashboard',
  templateUrl: './card-drive-home-dashboard.component.html',
  styleUrls: ['./card-drive-home-dashboard.component.css']
})
export class CardDriveHomeDashboardComponent implements OnInit {

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
