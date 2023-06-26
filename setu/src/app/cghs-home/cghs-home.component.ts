import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../service/apiservice.service';

@Component({
  selector: 'app-cghs-home',
  templateUrl: './cghs-home.component.html',
  styleUrls: ['./cghs-home.component.css']
})
export class CghsHomeComponent implements OnInit {

  constructor(public apiService: ApiserviceService,
    public router: Router) { }

  ngOnInit(): void {
    let capf= <HTMLScriptElement>document.getElementById('capf');
    
    capf.style.display = 'none';
  }
  OpenLogin()
  {this.router.navigate(['/cghslogin']); }

  getReport(event:any)
  { 
    let cghs= <HTMLScriptElement>document.getElementById('cghs');
    //let cghs= <HTMLScriptElement>document.getElementById('cghs');
    let capf= <HTMLScriptElement>document.getElementById('capf');
   var val=event.target.value;

   if(val=="cghs")
   {
   
    cghs.style.display='block';
    //cghs.style.display='none';
    capf.style.display = 'none';
   }
   if(val=="cghs")
   {
    
    cghs.style.display='block';
    capf.style.display = 'none';
   }

   if(val=="capf")
   {
    cghs.style.display='none';
    //cghs.style.display='none';
    capf.style.display = 'block';
   }
  }
}
