import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncrDecrService } from '../model/encr-decr-service';
import { ApiserviceService } from '../service/apiservice.service';

@Component({
  selector: 'app-headerinsights',
  templateUrl: './headerinsights.component.html',
  styleUrls: ['./headerinsights.component.css']
})
export class HeaderinsightsComponent implements OnInit {
  encrdecrdervice:EncrDecrService;
  role:any
  userid:any;
  constructor(public apiService: ApiserviceService,public router: Router) {

    this.encrdecrdervice=new EncrDecrService();
      
      this.role=this.encrdecrdervice.decrypted(localStorage.getItem('role'));
      this.userid=this.encrdecrdervice.decrypted(localStorage.getItem('userid'));

    

   }

  ngOnInit(): void {    
    //let bisreport= <HTMLScriptElement>document.getElementById('bisreport');
    //let home= <HTMLScriptElement>document.getElementById('home');
    //let logout= <HTMLScriptElement>document.getElementById('logout');
    //let login= <HTMLScriptElement>document.getElementById('login');
    let insight= <HTMLScriptElement>document.getElementById('insight');
    let cghsinsights= <HTMLScriptElement>document.getElementById('cghsinsights');
    let capfinsights= <HTMLScriptElement>document.getElementById('capfinsights');
    let anewcardreport= <HTMLScriptElement>document.getElementById('newcardreport');
    
    if(this.role!="1")
    {
      insight.style.display="none";
     
    }
    if(this.role=="5")
    {
      cghsinsights.style.display="block";
      insight.style.display="none";
      capfinsights.style.display="none";
      anewcardreport.style.display="none";
    }
    if(this.role=="6")
    {
      cghsinsights.style.display="none";
      insight.style.display="none";     
      anewcardreport.style.display="none";
      capfinsights.style.display="block";
    }
    if(this.role=="2")
    {
      cghsinsights.style.display="none";
      insight.style.display="none";
      capfinsights.style.display="none";
      
    }
    if(this.role=="99")
    {
      this.router.navigate(['/login']);
    }
  }
  cardReport()
  {this.router.navigate(['/cardreport']); }
  newcardReport()
  {
    this.router.navigate(['/setucardreport']); 
  }
  
  bisReport()
  {
    
    this.router.navigate(['/bisdashboard']); 
  }
  CGHSReport()
  {this.router.navigate(['/cghsinsights']); }
  CAPFReport()
  {this.router.navigate(['/capfinsights']); }
  pmjayinsight()
  {
    
    this.router.navigate(['/pmjay']); 
  }

  OpenLogin()
  {this.router.navigate(['/login']); }
  home()
  {this.router.navigate(['/']);}
  OpenLogout()
  {
    localStorage.setItem('userid', "");
    localStorage.setItem('role', "");
    this.router.navigate(['/']);
  }
}
