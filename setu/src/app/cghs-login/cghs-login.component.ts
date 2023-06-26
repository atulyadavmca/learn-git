import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trim } from 'jquery';
import { AppModule } from '../app.module';
import { EncrDecrService } from '../model/encr-decr-service';
import { UserdetailsReq } from '../model/userdetails-req';
import { ApiserviceService } from '../service/apiservice.service';
@Component({
  selector: 'app-cghs-login',
  templateUrl: './cghs-login.component.html',
  styleUrls: ['./cghs-login.component.css']
})
export class CghsLoginComponent implements OnInit {
  userid:any;
  password:any;
  userRequired:any;
  pwdRequired:any;
  data:any;
  userdetailsReq:UserdetailsReq;
  invalidpwd:any;
  encrdecrdervice:EncrDecrService;
  encdecKey:any;
  constructor(public apiService: ApiserviceService,public router: Router) { 
    this.userdetailsReq=new UserdetailsReq();
    localStorage.setItem('userid', "");
    this.encrdecrdervice=new EncrDecrService();
  }

  ngOnInit(): void {
    this.encdecKey=this.encrdecrdervice.keys;
  }
  GetUserDetails(userid:any,password:any)
  {

  this.userdetailsReq.userid=userid;  
  this.userdetailsReq.password=password;
  
  this.apiService.GetUserDetails(this.userdetailsReq).subscribe((response) => {
    console.log(response['data']);
    this.data=[];
  if(response['status']=="true" && response['data'].length!=0)
  {      
    this.data=response['data'];
    localStorage.setItem('userid', this.encrdecrdervice.encrypted(this.data[0]['userid']));
    localStorage.setItem('role', this.encrdecrdervice.encrypted(this.data[0]['role']));       
    localStorage.setItem('state_code', this.encrdecrdervice.encrypted(this.data[0]['statecode']));
    localStorage.setItem('district_code', this.encrdecrdervice.encrypted(this.data[0]['districtcode']));
    localStorage.setItem('agency_code', this.encrdecrdervice.encrypted(this.data[0]['agencycode']));

    console.log("localStorage.getItem('role') : "+localStorage.getItem('role'));
    console.log("Decrypted : "+this.encrdecrdervice.decrypted(String(localStorage.getItem('role')).trim()));
    
    if(this.data[0]['role']=="5")
    this.router.navigate(['/cghsinsights']);
    else 
    this.invalidpwd="Unathorized User!!";
       
  }
  else
  {
    this.invalidpwd="Invalid userid and password!!";
  }
  });
}
OpenHome()
{
  this.router.navigate(['/cghs']);
}
validate(userid: string,password: string)
{
  this.invalidpwd="";
  if(userid=="")
  this.userRequired="User Id is required";
  else
  this.userRequired="";
  if(password=="")
  this.pwdRequired="User Id is required";
  else
  this.pwdRequired="";
  //let type = (<HTMLInputElement>document.getElementById('type'));
  if(userid!="" && password!="")
  {
    this.GetUserDetails(userid,password);      
  }
console.log(userid);
}

keyPress(evnt:any,type:any)
{
  if(evnt.target.value!="" && type=='U')
  this.userRequired="";
  if(evnt.target.value!="" && type=='P')
  this.pwdRequired="";
}
}
