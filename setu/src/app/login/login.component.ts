import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trim } from 'jquery';
import { AppModule } from '../app.module';
import { EncrDecrService } from '../model/encr-decr-service';
import { UserdetailsReq } from '../model/userdetails-req';
import { ApiserviceService } from '../service/apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
userid:any;
password:any;
userRequired:any;
pwdRequired:any;
data:any;
userdetailsReq:UserdetailsReq;
invalidpwd:any;
encrdecrdervice:EncrDecrService;
encdecKey:any;
inpuserid:any
inppassword:any;
Disabled_Password:any;
btnText:any;
logintype:any;

Disabled_rdopwd:any;
Disabled_rdootp:any;
Disabled_userid:any;
isGetOTP:any=false;
ispassword:any;
isotp:any;
  constructor(public apiService: ApiserviceService,public router: Router) {
    this.userdetailsReq=new UserdetailsReq();
    localStorage.setItem('userid', "");
    this.encrdecrdervice=new EncrDecrService();
    this.inpuserid="";
    this.inppassword="";
    this.logintype="P";
    this.Disabled_rdopwd=false;
    this.Disabled_rdootp=false;
    this.Disabled_userid=false;
   }

  ngOnInit(): void {
    let btnsubmit=<HTMLScriptElement>document.getElementById('btnsubmit');
    btnsubmit.innerHTML="Sign In";
    let lblotp=<HTMLScriptElement>document.getElementById('lblotp');
    lblotp.style.display="none";
    let lbluserid=<HTMLScriptElement>document.getElementById('lbluserid');
    lbluserid.innerHTML="User Id";
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

      //console.log("localStorage.getItem('role') : "+localStorage.getItem('role'));
      //console.log("Decrypted : "+this.encrdecrdervice.decrypted(this.encdecKey,String(localStorage.getItem('role')).trim()));
      
      if(this.data[0]['role']=="1")
      this.router.navigate(['/pmjay']);
      else if(this.data[0]['role']=="5")
      this.router.navigate(['/cghsinsights']);  
      else if(this.data[0]['role']=="6")
      this.router.navigate(['/capfinsights']);    
      else if(this.data[0]['role']=="99") 
      {
        this.invalidpwd="Unauthorized user!!";
      }
      else 
      this.router.navigate(['/setucardreport']);
         
    }
    else
    {
      this.invalidpwd="Invalid userid and password!!";
    }
    });
  }
  validate(userid: string,password: string)
  {
    let divinvalidpwd = (<HTMLInputElement>document.getElementById('divinvalidpwd'));
    divinvalidpwd.style.color="red";
    if(this.logintype=="P")
    {
    this.invalidpwd="";
    if(userid=="")
    this.userRequired="User Id is required";
    else
    this.userRequired="";
    if(password=="")
    this.pwdRequired="Password is required";
    else
    this.pwdRequired="";
    //let type = (<HTMLInputElement>document.getElementById('type'));
    if(userid!="" && password!="")
    {
      this.GetUserDetails(userid,password);      
    }
  }
  if(this.logintype=="O" && this.isGetOTP==false)
  {
  
    this.invalidpwd="";
    if(userid=="")
    this.userRequired="Mobile No is required";
    else
    this.userRequired="";
    
    if(userid!="")
    {
      this.GetOTP(userid);      
    }
  }

  if(this.logintype=="O" && this.isGetOTP==true)
  {
    this.invalidpwd="";
    if(password=="")
    this.pwdRequired="OTP is required";
    else
    this.pwdRequired="";
    
    if(password!="")
    {
      this.VerifyOTP(userid,password);      
    }
  }
  //console.log(userid);
}

  keyPress(evnt:any,type:any)
  {
    if(evnt.target.value!="" && type=='U')
    this.userRequired="";
    if(evnt.target.value!="" && type=='P')
    this.pwdRequired="";
  }

  getOption(type:any)
  {
    let lblotp=<HTMLScriptElement>document.getElementById('lblotp');
    let lblpwd=<HTMLScriptElement>document.getElementById('lblpwd');
    let btnsubmit=<HTMLScriptElement>document.getElementById('btnsubmit');
    let lbluserid=<HTMLScriptElement>document.getElementById('lbluserid');
   
    //let password=<HTMLScriptElement>document.getElementById('password');
    this.inpuserid="";
    this.inppassword="";
    if(type=="O")
    {
      lblotp.style.display="block";
      lblpwd.style.display="none";
      this.Disabled_Password=true;
      btnsubmit.innerHTML="Get OTP";
      this.logintype="O";
      lbluserid.innerHTML="Mobile";
      this.pwdRequired="";
      this.userRequired="";
    }
    if(type=="P")
    {
      lblotp.style.display="none";
      lblpwd.style.display="block";
      this.Disabled_Password=false;
      btnsubmit.innerHTML="Sign In";
      this.logintype="P";
      lbluserid.innerHTML="User Id";
      this.pwdRequired="";
      this.userRequired="";
    }
  }

  GetOTP(userid:any)
  {

  this.userdetailsReq.userid=userid;  
  this.userdetailsReq.password="";
  this.apiService.GetOTP(this.userdetailsReq).subscribe((response) => {
    let btnsubmit=<HTMLScriptElement>document.getElementById('btnsubmit');
    let divinvalidpwd = (<HTMLInputElement>document.getElementById('divinvalidpwd'));
    
  if(response['status']=="OTPS")
  {    
    divinvalidpwd.style.color="green";  
    this.invalidpwd="OTP send on your registered mobile number.";
    this.Disabled_Password=false;
    this.Disabled_userid=true;
    btnsubmit.innerHTML="Verify OTP"; 
    this.Disabled_rdopwd=true;
    this.Disabled_rdootp=true; 
    this.isGetOTP=true;
  }
  else if (response['status']=="OTPS")
  {
    divinvalidpwd.style.color="red";
    this.invalidpwd="OTP send failed.";
  }
  else if (response['status']=="MOBNR")
  {
    this.invalidpwd="User not registered.";
    divinvalidpwd.style.color="red";
  }
  else
  {
    this.invalidpwd="Some Technical Issue, Please try again.";
    divinvalidpwd.style.color="red";
  }
  });
}
VerifyOTP(userid:any,password:any)
{
  let divinvalidpwd = (<HTMLInputElement>document.getElementById('divinvalidpwd'));
  divinvalidpwd.style.color="red";
this.userdetailsReq.userid=userid;  
this.userdetailsReq.password=password;
this.apiService.VerifyOTP(this.userdetailsReq).subscribe((response) => {
  console.log(response['data']);
  this.data=response['data'];
if(response['status']=="true" && response['data'].length!=0 && this.data[0]['verifystatus']=='true')
{      
  this.data=response['data'];
  localStorage.setItem('userid', this.encrdecrdervice.encrypted(this.data[0]['userid']));
  localStorage.setItem('role', this.encrdecrdervice.encrypted(this.data[0]['role']));       
  localStorage.setItem('state_code', this.encrdecrdervice.encrypted(this.data[0]['statecode']));
  localStorage.setItem('district_code', this.encrdecrdervice.encrypted(this.data[0]['districtcode']));
  localStorage.setItem('agency_code', this.encrdecrdervice.encrypted(this.data[0]['agencycode']));

  //console.log("localStorage.getItem('role') : "+localStorage.getItem('role'));
  //console.log("Decrypted : "+this.encrdecrdervice.decrypted(this.encdecKey,String(localStorage.getItem('role')).trim()));
  
  if(this.data[0]['role']=="1")
  this.router.navigate(['/pmjay']);
  else if(this.data[0]['role']=="5")
  this.router.navigate(['/cghsinsights']);  
  else if(this.data[0]['role']=="6")
  this.router.navigate(['/capfinsights']);    
  else if(this.data[0]['role']=="99") 
  {
    this.invalidpwd="Unauthorized user!!";
  }
  else 
  this.router.navigate(['/setucardreport']);
     
}
else
{
  this.invalidpwd="Invalid OTP!!";
}
});
}
Reset()
{
      let lblotp=<HTMLScriptElement>document.getElementById('lblotp');
      let lblpwd=<HTMLScriptElement>document.getElementById('lblpwd');
      let btnsubmit=<HTMLScriptElement>document.getElementById('btnsubmit');
      let lbluserid=<HTMLScriptElement>document.getElementById('lbluserid');
      lblotp.style.display="none";
      lblpwd.style.display="block";
      this.Disabled_Password=false;
      btnsubmit.innerHTML="Sign In";
      this.logintype="P";
      lbluserid.innerHTML="User Id";
      this.pwdRequired="";
      this.userRequired="";
      this.invalidpwd="";
      this.inpuserid="";
      this.inppassword="";
      $("#otp").prop("checked", false);
      $("#password").prop("checked", true);
}

}
