import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EncrDecrService } from '../model/encr-decr-service';
import { UserdetailsReq } from '../model/userdetails-req';
import { ApiserviceService } from '../service/apiservice.service';
import { Chart,registerables } from 'chart.js';
import { ChartResp } from '../model/chart-resp';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

Chart.register(...registerables);
Chart.register(ChartDataLabels);
@Component({
  selector: 'app-card-drive-report',
  templateUrl: './card-drive-report.component.html',
  styleUrls: ['./card-drive-report.component.css']
})
export class CardDriveReportComponent implements OnInit {
  rptHeader:any;
  state_name:any;
  district_name:any;
  block_name:any;
  type:any;
  tdtype:any;
  typeF:any;
  tdtypeF:any;
  state_name_F:any;
  district_name_F:any;
  block_name_F:any;

  userid:any;
password:any;
userRequired:any;
pwdRequired:any;
data:any;
userdetailsReq:UserdetailsReq;
invalidpwd:any;
encrdecrdervice:EncrDecrService;
encdecKey:any;
islogged:Boolean=false;
state_code_l:any="0";
district_code_l:any="0";
state_code_f:any="0";
district_code_f:any="0";
urban_rural:any;
urban_rural_F:any;
User_State_Name:any;
state_name_user_list:any;
district_name_user_list:any;
ACGDTcolor:any;
ACGDTTextArr:any;
ACGDTValueArr:any;
ACGDTtxtArr:any;
ACGDTBars:any;
ACGDTApprovedArr:any;
rpttype:any;
rpttypeF:any;
stColumnName:any;
rptHeaderFace:any;
uploadDate:any;
rptStateHeader:any="";
rptDistrictHeader:any="";
rptBlockHeader:any="";

rptStateHeader_Chart:any="";
rptDistrictHeader_Chart:any="";
rptBlockHeader_Chart:any="";

rptStateCode:any="";
rptDistricCode:any="";
rptBlockCode:any="";
rptBackType:any="";
rptText:any="";
rpttype_Back="";


inpuserid:any
inppassword:any;
Disabled_Password:any;
btnText:any;
logintype:any;

Disabled_rdopwd:any;
Disabled_rdootp:any;
Disabled_userid:any;
isGetOTP:any=false;
ispassword:any=true;
isotp:any=false;
txtfromdate_create:any;
txttodate_create:any;
Card_State_Name:any;
cardtype:any;
cardrpttype:any;
carddeliverycode:any;
txtfromdate_card:any;
txttodate_card:any;
cardagencyid:any;
pipe = new DatePipe('en-US');  
  pageData = {
    authRequestReceived: [] as any[],
    ekyclist: []  as any[],
    ekyclistface: []  as any[],
    userlist: [] as any[],
    activeuserlist: [] as any[],
    carddeliverylist: [] as any[]
  }
  totalData = {
    authRequestReceived: [] as any[],
    ekyclist: []  as any[],
    ekyclistface: []  as any[],
    userlist: [] as any[],
    activeuserlist: [] as any[],
    carddeliverylist: [] as any[]
  }
  @ViewChild('eKYCTDChart') ACGTDChart:any;
  constructor(private apiService: ApiserviceService,public router: Router) { 
    this.rptHeader="State Wise";
    this.type="CDEKYCT";
    this.tdtype="CDEKYCTD";
    this.typeF="CDEKYCFT";
    this.tdtypeF="CDEKYCFTD";
    this.userdetailsReq=new UserdetailsReq();
    localStorage.setItem('userid', "");
    this.encrdecrdervice=new EncrDecrService();
    this.urban_rural="";
    this.urban_rural_F="";
    this.User_State_Name=" -> State Wise";
    this.Card_State_Name=" -> State Wise";
    this.stColumnName="State";
    this.rptStateHeader="State Wise";
    this.rptStateHeader_Chart="State Wise";


    this.inpuserid="";
    this.inppassword="";
    this.logintype="P";
    this.Disabled_rdopwd=false;
    this.Disabled_rdootp=false;
    this.Disabled_userid=false;
    this.cardtype="T";
    this.cardrpttype="";
    this.carddeliverycode="";
    this.cardagencyid="";
  }
  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';
  ngOnInit(): void {

    setTimeout(()=>{                          
      $('#tblActiveUser').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 10,
        searching:true,
        paging:true,
        processing: true,
       
        lengthMenu : [10, 25,50],
    } );
    }, 1);
    
   /* setTimeout(()=>{                          
      $('#tblekycdata').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 10,
        searching:true,
        paging:true,
        processing: true,
       
        lengthMenu : [10, 25,50],
    } );
    }, 1);*/
    this.loadAuthRequestReceivedData();
    this.loadEKYCData(this.type,"","","","S",this.urban_rural);
    this.loadEKYCData_Face(this.typeF,"","","","S",this.urban_rural_F);
    this.loadUserListData("");
    this.islogged=false;
    this.GetACGTD(this.tdtype,"","","","S",this.urban_rural);
    this.GetUploadDate();
    
    let divDate=<HTMLScriptElement>document.getElementById('divDate');
    divDate.style.display="none";
    let divDate_Card=<HTMLScriptElement>document.getElementById('divDate_Card');
    divDate_Card.style.display="none";

    this.loadCardDeliveryData(this.cardtype,this.carddeliverycode,this.cardrpttype,this.cardagencyid);
  }

  loadAuthRequestReceivedData() {    
    this.apiService.GetCardDrive({
      "type":"CDAUTH",
      "state_code":""     
    }).subscribe((resp: any)=>{
      
      this.pageData.authRequestReceived = resp.list;
    
      if(resp.list.length) {
        const keys = Object.keys(resp.list[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.list.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.authRequestReceived = [totalData]
      } else {
        this.totalData.authRequestReceived = []
      }     
    })  
  }

  loadEKYCData(type:any,state_code:any,district_code:any,block_code:any,rpttype:any,urban_rural:any) {  

    var fDate=this.txtfromdate_create ;
    var tDate=this.txttodate_create ;
    
    if(type!="CDEKYCD")
    {
      fDate="";
      tDate="";
    }
    console.log("rpttype : "+rpttype);
    this.apiService.GetCardDrive({
      "type":type,
      "state_code":state_code,     
      "district_code":district_code ,
      "block_code":block_code ,
      "rpttype":rpttype,
      "urban_rural":urban_rural,
      "fdate":fDate,
      "tdate":tDate 
    }).subscribe((resp: any)=>{ 
       //console.log(resp);
      this.pageData.ekyclist = resp.list;
   
      if(resp.list.length) {
        const keys = Object.keys(resp.list[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.list.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.ekyclist = [totalData]
      } else {
        this.totalData.ekyclist = []
      } 
      
      /* $('#tblekycdata').DataTable().clear().destroy();
      
      setTimeout(()=>{      
                    
        $('#tblekycdata').DataTable( {       
               
          pagingType: 'full_numbers',
          pageLength: 50,
          searching:true,
          paging:true,
          processing: true,
          
          lengthMenu : [10, 25,50]
        
      });
      }, 1);*/
       
      
    })  
  }

  loadEKYCData_Face(type:any,state_code:any,district_code:any,block_code:any,rpttype:any,urban_rural:any) {    
    this.apiService.GetCardDrive({
      "type":type,
      "state_code":state_code,     
      "district_code":district_code ,
      "block_code":block_code ,
      "rpttype":rpttype,
      "urban_rural":urban_rural 
    }).subscribe((resp: any)=>{ 
               
      this.pageData.ekyclistface = resp.list;
   
      if(resp.list.length) {
        const keys = Object.keys(resp.list[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.list.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.ekyclistface = [totalData]
      } else {
        this.totalData.ekyclistface = []
      } 
      
      /*$('#tblCAP111').DataTable().clear().destroy();
      setTimeout(()=>{        
                    
        $('#tblCAP111').DataTable( {         
          pagingType: 'full_numbers',
          pageLength: 25,
          searching:true,
          paging:true,
          processing: true,                            
          lengthMenu : [10, 25,50],          
        
      });
      }, 1);*/
       
      
    })  
  }

  loadUserListData(state_code:any) {    
    this.apiService.GetCardDrive({
      "type":"CDUSER",
      "state_code":state_code     
    }).subscribe((resp: any)=>{
      this.pageData.userlist = resp.list;
    
      if(resp.list.length) {
        const keys = Object.keys(resp.list[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.list.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.userlist = [totalData]
      } else {
        this.totalData.userlist = []
      }     
    })  
  }

  loadCardDeliveryData(type:any,state_code:any,rpttype:any,agency_code:any) {   
    var sDate=this.txtfromdate_card ;
    var tDate=this.txttodate_card ;
    
    if(type!="D")
    {
      sDate="";
      tDate="";
    }

    this.apiService.GetCard_Delivery_Report({
      "type":type,
      "state_code":state_code,
      "rpttype":rpttype ,
      "agency_code":agency_code,
      "sdate":sDate,
      "tdate":tDate,    
    }).subscribe((resp: any)=>{
      this.pageData.carddeliverylist = resp.list;
    console.log(resp);
      if(resp.list.length) {
        const keys = Object.keys(resp.list[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.list.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.carddeliverylist = [totalData]
      } else {
        this.totalData.carddeliverylist = []
      }     
    })  
  }

  loadActiveUserListData(state_code:any,district_code:any,type:any) {    
    this.apiService.GetCardDrive({
      "type":"CDAUSER",
      "state_code":state_code ,    
      "district_code":district_code ,
      "rpttype":type
    }).subscribe((resp: any)=>{
      //console.log(resp.list);
      this.pageData.activeuserlist = resp.list;
      this.state_name_user_list=resp.list[0]["state_name"];
      this.district_name_user_list=resp.list[0]["district_name"];
      
      if(resp.list.length) {
        const keys = Object.keys(resp.list[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.list.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.activeuserlist = [totalData]
      } else {
        this.totalData.activeuserlist = []
      }  
      
      $('#tblActiveUser').DataTable().clear().destroy();
      
      setTimeout(()=>{      
                    
        $('#tblActiveUser').DataTable( {       
               
          pagingType: 'full_numbers',
          pageLength: 10,
          searching:true,
          paging:true,
          processing: true,
          
          lengthMenu : [10, 25,50]
        
      });
      }, 1);

    })  
  }

  getCommaValue(nStr:any)
  {
    nStr=String(nStr);
    var num;
    if(nStr=="undefined")
    {
      num=0;
    }
    else if(nStr.length==4)
    num=nStr.substring(0,1)+","+nStr.substring(1,nStr.length)
    else if(nStr.length==5)
    num=nStr.substring(0,2)+","+nStr.substring(2,nStr.length)
    else if(nStr.length==6)
    num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,nStr.length)
    else if(nStr.length==7)
    num=nStr.substring(0,2)+","+nStr.substring(2,4)+","+nStr.substring(4,nStr.length)
    else if(nStr.length==8)
    num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,5)+","+nStr.substring(5,nStr.length)
    else if(nStr.length==9)
    num=nStr.substring(0,2)+","+nStr.substring(2,4)+","+nStr.substring(4,6)+","+nStr.substring(6,nStr.length)
    else if(nStr.length==10)
    num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,5)+","+nStr.substring(5,7)+","+nStr.substring(7,nStr.length)
    else if(nStr.length==11)
    num=nStr.substring(0,2)+","+nStr.substring(2,4)+","+nStr.substring(4,6)+","+nStr.substring(6,8)+","+nStr.substring(8,nStr.length)
    else if(nStr.length==12)
    num=nStr.substring(0,1)+","+nStr.substring(1,3)+","+nStr.substring(3,5)+","+nStr.substring(5,7)+","+nStr.substring(7,9)+","+nStr.substring(9,nStr.length)
    else
    num=nStr
  //console.log(nStr+" : "+num);
  //console.log(num);
    return num;  
  }

  BindReport(text:any,state_code:any,district_code:any,block_code:any,type:any)
  {    
    this.rptText=text;
    this.rpttype_Back=type;
    if(state_code!="" && district_code=="" && block_code=="")
    {
      if(text!="NA")
      {
      this.state_name=text;
      this.loadEKYCData(this.type,state_code,"","","D",this.urban_rural);
      
        this.ACGDTBars.destroy();
        this.GetACGTD(this.tdtype,state_code,"","","D",this.urban_rural);
      

      this.rptHeader=this.state_name +" -> District Wise";
      this.stColumnName="District";
      this.rptStateHeader=this.state_name +" -> District Wise";
      this.rptDistrictHeader="";
      this.rptBlockHeader="";

      this.rptStateHeader_Chart=this.state_name ;
      this.rptDistrictHeader_Chart="";
      this.rptBlockHeader_Chart="";

      this.rptStateCode=state_code;
      this.rptDistricCode="";
      this.rptBlockCode="";
      this.rptBackType="D";

      }
    }
    else if(state_code!="" && district_code!="" && block_code=="" && type!="O")
    { 
      let divloginmodel = <HTMLScriptElement>document.getElementById('divloginmodel'); 
      //divloginmodel.style.display="block";
      if(this.islogged==true)
      {
          if(text!="")
          {    
          this.district_name=text
          this.loadEKYCData(this.type,state_code,district_code,"","B",this.urban_rural);

          
          this.ACGDTBars.destroy();
         this.GetACGTD(this.tdtype,state_code,district_code,"","B",this.urban_rural);
          
          this.rptHeader=this.state_name+" -> "+text + " -> Block/Town Wise";
          this.stColumnName="Block";
          this.rptStateHeader=this.state_name +" -> ";
          this.rptDistrictHeader=text + " -> Block/Town Wise";
          this.rptBlockHeader="";

          this.rptStateHeader_Chart=this.state_name +" -> ";
          this.rptDistrictHeader_Chart=text  ;
          this.rptBlockHeader_Chart="";

          this.rptStateCode=state_code;
          this.rptDistricCode=district_code;
          this.rptBlockCode="";
          this.rptBackType="B";
          }
      }
      else
      {
        if(text!="")
        {    
          this.district_name=text
          this.state_code_l=state_code;
          this.district_code_l=district_code;
        }
        divloginmodel.style.display="block";
      }
    }
    else if(state_code!="" && district_code!="" && block_code!="NA" && type=="B")
    {    
      if(text!="NA")
      { 
      this.block_name=text;
      this.loadEKYCData(this.type,state_code,district_code,block_code,"OB",this.urban_rural);
      this.rptHeader=this.state_name+" -> "+this.district_name+" -> "+text + " -> Opeartor Wise";
      this.stColumnName="Opeartor";
      this.rptStateHeader=this.state_name +" -> ";
      this.rptDistrictHeader=this.district_name +" -> ";
      this.rptBlockHeader=text + " -> Opeartor Wise";

      this.rptStateHeader_Chart=this.state_name +" -> ";
      this.rptDistrictHeader_Chart=this.district_name +" -> ";
      this.rptBlockHeader_Chart=text;

      this.rptStateCode=state_code;
      this.rptDistricCode=district_code;
      this.rptBlockCode=block_code;
      this.rptBackType="OB";

      }
    }
    else if(state_code!="" && district_code!="" && block_code!="NA" && type=="T")
    {    
      if(text!="NA")
      { 
      this.block_name=text;
      this.loadEKYCData(this.type,state_code,district_code,block_code,"OT",this.urban_rural);
      this.rptHeader=this.state_name+" -> "+this.district_name+" -> "+text + " -> Opeartor Wise";
      this.stColumnName="Opeartor";
      this.rptStateHeader=this.state_name +" -> ";
      this.rptDistrictHeader=this.district_name +" -> ";
      this.rptBlockHeader=text + " -> Opeartor Wise";

      this.rptStateHeader_Chart=this.state_name +" -> ";
      this.rptDistrictHeader_Chart=this.district_name +" -> ";
      this.rptBlockHeader_Chart=text ;


      this.rptStateCode=state_code;
      this.rptDistricCode=district_code;
      this.rptBlockCode=block_code;
      this.rptBackType="OT";
      }
    }

    else if(state_code!="" && district_code!="" && block_code=="NA" && text=="NA")
    {    
      
      this.block_name=text;
      this.loadEKYCData(this.type,state_code,district_code,block_code,"NA",this.urban_rural);
      this.rptHeader=this.state_name+" -> "+this.district_name+" -> "+text + " -> Opeartor Wise";
      this.stColumnName="Opeartor";
      this.rptStateHeader=this.state_name +" -> ";
      this.rptDistrictHeader=this.district_name +" -> ";
      this.rptBlockHeader=text + " -> Opeartor Wise";

      this.rptStateHeader_Chart=this.state_name +" -> ";
      this.rptDistrictHeader_Chart=this.district_name +" -> ";
      this.rptBlockHeader_Chart=text;


      this.rptStateCode=state_code;
      this.rptDistricCode=district_code;
      this.rptBlockCode=block_code;
      this.rptBackType="NA";
    }

    else if(type=="O")
    {     
      if(text!="")
      {
      this.block_name=text;
      this.loadEKYCData(this.type,"","","","S",this.urban_rural);
      this.rptHeader="State Wise";
      this.stColumnName="State";
      this.rptStateHeader="State Wise";
      this.rptDistrictHeader="";
      this.rptBlockHeader="";

      this.rptStateHeader_Chart="State Wise";
      this.rptDistrictHeader_Chart="";
      this.rptBlockHeader_Chart="";


      this.rptStateCode="";
      this.rptDistricCode="";
      this.rptBlockCode="";
      this.rptBackType="S";

      }
    }
    else
    {
      //this.state_name="";
      this.loadEKYCData(this.type,"","","","S",this.urban_rural);
      this.rptHeader="State Wise";
      this.stColumnName="State";
      this.rptStateHeader="State Wise";
      this.rptDistrictHeader="";
      this.rptBlockHeader="";

      this.rptStateHeader_Chart="State Wise";
      this.rptDistrictHeader_Chart="";
      this.rptBlockHeader_Chart="";

      this.rptStateCode="";
      this.rptDistricCode="";
      this.rptBlockCode="";
      this.rptBackType="S";
    }
  }

  BindReportFace(text:any,state_code:any,district_code:any,block_code:any,type:any)
  {    
   
    if(state_code!="" && district_code=="" && block_code=="")
    {
      if(text!="NA")
      {
      this.state_name_F=text;
      this.loadEKYCData_Face(this.typeF,state_code,"","","D",this.urban_rural_F);
      this.rptHeaderFace=this.state_name_F +" -> District Wise";
      //this.stColumnName="District";
      }
    }
    else if(state_code!="" && district_code!="" && type=="D")
    { 
      let divloginmodel = <HTMLScriptElement>document.getElementById('divloginmodel'); 
      //divloginmodel.style.display="block";
      if(this.islogged==true)
      {
          if(text!="")
          {    
          this.district_name_F=text
          this.loadEKYCData_Face(this.typeF,state_code,district_code,"","B",this.urban_rural_F);
          this.rptHeaderFace=this.state_name_F+" -> "+text + " -> Opeartor Wise";
          //this.stColumnName="Block";
          }
      }
      else
      {
        if(text!="")
        {    
          this.district_name_F=text
          this.state_code_f=state_code;
          this.district_code_f=district_code;
        }
        divloginmodel.style.display="block";
      }
    }
    /*else if(state_code!="" && district_code!="" && block_code!="NA" && type=="B")
    {    
      if(text!="NA")
      { 
      this.block_name_F=text;
      this.loadEKYCData_Face(this.typeF,state_code,district_code,block_code,"OB",this.urban_rural_F);
      this.rptHeaderFace=this.state_name_F+" -> "+this.district_name_F+" -> "+text + " -> Opeartor Wise";
      //this.stColumnName="Opeartor";
      }
    }
    else if(state_code!="" && district_code!="" && block_code!="NA" && type=="T")
    {    
      if(text!="NA")
      { 
      this.block_name_F=text;
      this.loadEKYCData_Face(this.typeF,state_code,district_code,block_code,"OT",this.urban_rural);
      this.rptHeaderFace=this.state_name_F+" -> "+this.district_name_F+" -> "+text + " -> Opeartor Wise";
      //this.stColumnName="Opeartor";
      }
    }*/
    else if(type=="O")
    {     
      
      this.block_name_F=text;
      this.loadEKYCData_Face(this.typeF,"","","","S",this.urban_rural_F);
      this.rptHeaderFace="State Wise";
      
    
    }
    else
    {
      //this.state_name="";
      this.loadEKYCData_Face(this.typeF,"","","","S",this.urban_rural_F);
      this.rptHeaderFace="State Wise";
      //this.stColumnName="State";
    }
  }

  closeModel()
  {
    let divloginmodel = <HTMLScriptElement>document.getElementById('divloginmodel'); 
      divloginmodel.style.display="none";

      let lblpwd=<HTMLScriptElement>document.getElementById('lblpwd');
    
    let btnsubmit=<HTMLScriptElement>document.getElementById('btnsubmit');
    let lbluserid=<HTMLScriptElement>document.getElementById('lbluserid');
    
    //let password=<HTMLScriptElement>document.getElementById('password');
    this.inpuserid="";
    this.inppassword="";
     lblpwd.innerHTML="Password";
      this.Disabled_Password=false;
      btnsubmit.innerHTML="Sign In";
      this.logintype="P";
      lbluserid.innerHTML="User Id";
      this.pwdRequired="";
      this.userRequired="";
      this.invalidpwd="";
      $("#otp").prop("checked", false);
      $("#password").prop("checked", true);
  }
  getOption(opt:any)
  {
    if(opt=="T")
        this.type="CDEKYCT";
    if(opt=="W")
        this.type="CDEKYCW";
    if(opt=="M")
        this.type="CDEKYCM";
    if(opt=="Y")
        this.type="CDEKYCY";
      
    let divDate=<HTMLScriptElement>document.getElementById('divDate');
    if(opt=="D")
    {    
      this.type="CDEKYCD";  
      divDate.style.display="block";
      
      let fdate: Date = new Date();
      fdate.setDate(fdate.getDate() -15);
      var fdt=String(this.pipe.transform(fdate , 'yyyy-MM-dd')); 

      let tdate: Date = new Date();
      tdate.setDate(tdate.getDate()-1);
      var tdt=String(this.pipe.transform(tdate , 'yyyy-MM-dd')); 
   
      this.txtfromdate_create=fdt;
      this.txttodate_create=tdt;
    }
    else
    {
      divDate.style.display="none";
    }

    //console.log("this.type : "+this.type);
    this.loadEKYCData(this.type,"","","","S",this.urban_rural);
    this.rptHeader="State Wise";

    
        this.ACGDTBars.destroy();
        this.GetACGTD(this.tdtype,"","","","S",this.urban_rural);
        this.rptStateHeader_Chart="State Wise" ;
        this.rptDistrictHeader_Chart="";
        this.rptBlockHeader_Chart="";
      
  }

  getOption_face(opt:any)
  {
    if(opt=="T")
        this.typeF="CDEKYCFT";
    if(opt=="W")
        this.typeF="CDEKYCFW";
    if(opt=="M")
        this.typeF="CDEKYCFM";
    if(opt=="Y")
        this.typeF="CDEKYCFY";

    //console.log("this.type : "+this.type);
    this.loadEKYCData_Face(this.typeF,"","","","S",this.urban_rural_F);
    this.rptHeaderFace="State Wise";
  }

  validate(userid: string,password: string)
  {
    if(this.logintype=="P")
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
  GetUserDetails(userid:any,password:any)
    {

    this.userdetailsReq.userid=userid;  
    this.userdetailsReq.password=password;
    
    this.apiService.GetUserDetails(this.userdetailsReq).subscribe((response) => {
      
      this.data=[];
    if(response['status']=="true" && response['data'].length!=0)
    {      
      this.islogged=true;
      let divloginmodel = <HTMLScriptElement>document.getElementById('divloginmodel'); 
      divloginmodel.style.display="none";
      if(this.state_code_l!="0" && this.district_code_l!="0")
      {
      this.loadEKYCData(this.type,this.state_code_l,this.district_code_l,"","B",this.urban_rural);

     
        this.ACGDTBars.destroy();
        this.GetACGTD(this.tdtype,this.state_code_l,this.district_code_l,"","B",this.urban_rural);
      

      this.rptHeader=this.state_name+" -> "+this.district_name+ " -> Block/Town Wise";
      this.rptStateHeader=this.state_name+" -> "
      this.rptDistrictHeader=this.district_name+ " -> Block/Town Wise";
      this.rptBlockHeader="";

      this.rptStateHeader_Chart=this.state_name+" -> "
      this.rptDistrictHeader_Chart=this.district_name;
      this.rptBlockHeader_Chart="";

      }
      

      if(this.state_code_f!="0" && this.district_code_f!="0")
      {
        this.loadEKYCData_Face(this.typeF,this.state_code_f,this.district_code_f,"","B",this.urban_rural_F);
        this.rptHeaderFace=this.state_name_F+" -> "+this.district_name_F+ " -> Opeartor Wise";
      }
     
         
    }
    else
    {
      this.invalidpwd="Invalid userid and password!!";
    }
    });
  }

  onToggle(id:any)
  {
    let el = <HTMLElement>document.getElementById(id);
    if(el.ariaPressed=="false")
    {
      this.urban_rural="U";
    }
    else
    {
      this.urban_rural="R";
    }
    
  }
  getCurrentReport(type:any)
  {
    
    if(type=="A")
    {
      this.loadEKYCData(this.type,"","","","S",this.urban_rural);
      
      this.ACGDTBars.destroy();
      this.GetACGTD(this.tdtype,"","","","S",this.urban_rural);
      
      this.rptHeader="State Wise";

      this.rptStateHeader="State Wise";
      this.rptDistrictHeader="";
      this.rptBlockHeader="";

      this.rptStateHeader_Chart="State Wise";
      this.rptDistrictHeader_Chart="";
      this.rptBlockHeader_Chart="";

      this.rptStateCode="";
      this.rptDistricCode="";
      this.rptBlockCode="";
      this.rptBackType="S";
    }

    if(type=="S" && this.rptStateHeader!="State Wise")
    {
      if(this.rptText!="NA")
      {     
      this.loadEKYCData(this.type,this.rptStateCode,"","","D",this.urban_rural);

      
      this.ACGDTBars.destroy();
      this.GetACGTD(this.tdtype,this.rptStateCode,"","","D",this.urban_rural);
      
      this.rptHeader=this.state_name +" -> District Wise";
      this.stColumnName="District";
      this.rptStateHeader=this.state_name +" -> District Wise";
      this.rptDistrictHeader="";
      this.rptBlockHeader="";

      this.rptStateHeader_Chart=this.state_name ;
      this.rptDistrictHeader_Chart="";
      this.rptBlockHeader_Chart="";

     
      this.rptDistricCode="";
      this.rptBlockCode="";
      this.rptBackType="D";

      }
    }
    if(type=="D")
    {
      if(this.rptStateCode!="" && this.rptDistricCode!=""  && this.rpttype_Back!="O")
    { 
      
          if(this.rptText!="")
          {    
          
          this.loadEKYCData(this.type,this.rptStateCode,this.rptDistricCode,"","B",this.urban_rural);

          
            this.ACGDTBars.destroy();
            this.GetACGTD(this.tdtype,this.rptStateCode,this.rptDistricCode,"","B",this.urban_rural);
          
          //this.rptHeader=this.state_name+" -> "+text + " -> Block/Town Wise";
          this.stColumnName="Block";
          this.rptStateHeader=this.state_name +" -> ";
          this.rptDistrictHeader=this.district_name + " -> Block/Town Wise";
          this.rptBlockHeader="";

          this.rptStateHeader_Chart=this.state_name +" -> ";
          this.rptDistrictHeader_Chart=this.district_name ;
          this.rptBlockHeader_Chart="";

          }
      
    }
    }
  }
  getCurrentFaceReport()
  {
    this.loadEKYCData_Face(this.typeF,"","","","S",this.urban_rural_F);
    this.rptHeaderFace="State Wise";
  }
  getCurrentUserReport()
  {
    this.loadUserListData(""); 
    this.User_State_Name=" -> State Wise";
  }


  BindUserListReport(text:any,state_code:any,district_code:any)
  {        
    
    if(state_code!="" && district_code!="")
    {
      this.loadUserListData(""); 
      this.User_State_Name=" -> State Wise";
    }
    else
    {
      this.loadUserListData(state_code); 
      this.User_State_Name=" -> "+text+" -> "+"District Wise";
    }   
  }
  GetUserList(state_code:any,district_code:any,type:any,total:any)
  {
   
    if((type=="A" || type=="M") && state_code!="" && district_code!="0" && district_code!="" && total!='0')
    {
      let divActiveUser = <HTMLScriptElement>document.getElementById('divActiveUser'); 
      divActiveUser.style.display="block";
      this.loadActiveUserListData(state_code,district_code,type)
    }
  }
  closeUserModel()
  {
    let divActiveUser = <HTMLScriptElement>document.getElementById('divActiveUser'); 
    divActiveUser.style.display="none";
  }

  GetACGTD(type:any,state_code:any,district_code:any,block_code:any,rpttype:any,urban_rural:any)
   {       
    this.apiService.GetCardDrive({
      "type":type,
      "state_code":state_code,     
      "district_code":district_code ,
      "block_code":block_code ,
      "rpttype":rpttype,
      "urban_rural":urban_rural 
    }).subscribe((resp: any)=>{            
            
      if(resp.status=="true")
      {
       
       this.ACGDTcolor=[];
       
        this.ACGDTTextArr = [];
        this.ACGDTValueArr = [];
        this.ACGDTApprovedArr = [];
        this.ACGDTtxtArr = [];
        this.ACGDTTextArr=resp.list;
              
            for(var i in this.ACGDTTextArr)
            {  
              this.ACGDTtxtArr.push(this.ACGDTTextArr[i]['date']);
              this.ACGDTValueArr.push(this.ACGDTTextArr[i]['ekyc_count']);
              this.ACGDTApprovedArr.push(this.ACGDTTextArr[i]['approved_count']);
            } 
            
     
      this.ACGDTBars = new Chart(this.ACGTDChart.nativeElement, {
        type: 'line',        
        data: {
          labels: this.ACGDTtxtArr,
          datasets: [{  
            label:'eYKC Request Approved'  ,        
            data: this.ACGDTApprovedArr,
            backgroundColor: 'rgba(56, 199, 101,.5)',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgba(56, 199, 101,.5)',// array should have same number of elements as number of dataset
            borderWidth: 1.5,
            fill:true,
            pointRadius:2,
            pointBorderColor:'#38c765',
            //backgroundColor:gradient,
          },{  
            label:'eYKC Request Received'  ,        
            data: this.ACGDTValueArr,
            backgroundColor: 'rgba(248,228,181,.7)',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgba(248,228,181,.7)',// array should have same number of elements as number of dataset
            borderWidth: 1.5,
            fill:true,
            pointRadius:2,
            pointBorderColor:'#EBA425',
            //backgroundColor:gradient,
          }]
        },
        options: {
          plugins:{
            legend:{display: true,labels:{boxHeight:8,
              boxWidth:8}}
            ,
            datalabels: {
              display:false,
             
            },
          },
          indexAxis: 'x',scales:{x:{suggestedMin: 50,suggestedMax: 100,ticks:{          
            
            maxRotation: 180,
            minRotation: 90,
            autoSkip: false,
            font:{size:12,family:'Roboto'},color:'#989898'
        }},y:{ticks:{         
            
          font:{size:12,family:'Roboto'},color:'#989898'
      }}},         
          elements: {
            line: {
              borderWidth: 0,
              tension:.4,
            }
          },
        }
      });

    }
    });
   }

   exportExcel(jsonData:any, fileName: string): void {

    var div_BIS_Metrics = document.createElement('div');
    div_BIS_Metrics.innerHTML = jsonData.trim(); 
    const source_BIS_Metrics = div_BIS_Metrics.firstChild;

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(source_BIS_Metrics);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
   
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }

  expexcel(filename:any)
   {
    if(this.type=="CDEKYCT")
    this.rpttype="Today";
    else if(this.type=="CDEKYCY")
    this.rpttype="Yesterday";
    else if(this.type=="CDEKYCW")
    this.rpttype="Weekly";
    else if(this.type=="CDEKYCM")
    this.rpttype="Last 30 Days";

    var data=this.CreateTableToExport(this.pageData.ekyclist,this.totalData.ekyclist,this.rptHeader,this.rpttype,this.stColumnName);    
    this.exportExcel(data,filename);

   }

  CreateTableToExport(pageData:any,totalData:any,rptHeader:any,rpttype:any,stName:any)
  {
    var j=0;
    let tble="<table border='1'>"; 
    
        tble+="<tr><td colspan='11' style='text-align: center;'>"+rptHeader+"--"+rpttype+"</td></tr>";
        tble+="<tr><td colspan='7' align='center'>eKYC</td><td colspan='54 align='center'>Auth Mode</td></tr>";
        tble+="<tr><td>S.No.</td><td>"+this.stColumnName+" Name</td><td>requested</td><td>Approved</td><td>Rejected</td><td>Pending</td> <td>Delivered</td><td>OTP</td><td>Finger</td><td>IRIS</td><td>Face</td></tr>";
        for(var i in pageData)
        {
          j=j+1;
          tble+="<tr><td>"+j+"</td><td>"+pageData[i]['text']+"</td><td>"+pageData[i]['ekyc_count']+"</td><td>"+pageData[i]['approved_count']+"</td><td>"+pageData[i]['rejected_count']+"</td><td>"+pageData[i]['pending_count']+"</td><td>"+pageData[i]['delivered_count']+"</td><td>"+pageData[i]['otp_auth_count']+"</td><td>"+pageData[i]['bio_auth_count']+"</td><td>"+pageData[i]['iris_auth_count']+"</td><td>"+pageData[i]['face_auth']+"</td></tr>";
        }
        tble+="<tr><td colspan='2'>Total</td><td>"+totalData[0]['ekyc_count']+"</td><td>"+totalData[0]['approved_count']+"</td><td>"+totalData[0]['rejected_count']+"</td><td>"+totalData[0]['pending_count']+"</td><td>"+totalData[0]['delivered_count']+"</td><td>"+totalData[0]['otp_auth_count']+"</td><td>"+totalData[0]['bio_auth_count']+"</td><td>"+totalData[0]['iris_auth_count']+"</td><td>"+totalData[0]['face_auth']+"</td></tr>";
     
    tble+="</table>";
    return tble;
  }

  GetUploadDate()
   {
    this.apiService.GetCardDriveUploadDate().subscribe((response) => {
     // console.log(response);
        if(response['status']=="true")
    {
      this.uploadDate=response['date'];
    }
  });
   }
getWebActiveUser(web:any,mob:any)
{
  //console.log("web : "+web+" mob : "+mob);
  //console.log("mob : "+mob);
  var val=Number(web);
  if(Number(web)>=Number(mob))
  {
    val=Number(web)-Number(mob);
  }
  else
  {
    val=Number(mob);
  }
  return val;
}


getLoginOption(type:any)
  {
    let lblpwd=<HTMLScriptElement>document.getElementById('lblpwd');
    
    let btnsubmit=<HTMLScriptElement>document.getElementById('btnsubmit');
    let lbluserid=<HTMLScriptElement>document.getElementById('lbluserid');
   
    //let password=<HTMLScriptElement>document.getElementById('password');
    this.inpuserid="";
    this.inppassword="";
    if(type=="O")
    {
      lblpwd.innerHTML="OTP";
      this.Disabled_Password=true;
      btnsubmit.innerHTML="Get OTP";
      this.logintype="O";
      lbluserid.innerHTML="Mobile";
      this.pwdRequired="";
      this.userRequired="";
    }
    if(type=="P")
    {
      lblpwd.innerHTML="Password";
      this.Disabled_Password=false;
      btnsubmit.innerHTML="Sign In";
      this.logintype="P";
      lbluserid.innerHTML="User Id";
      this.pwdRequired="";
      this.userRequired="";
    }
  }
  Reset()
  {
    
    let lblpwd=<HTMLScriptElement>document.getElementById('lblpwd');
    
    let btnsubmit=<HTMLScriptElement>document.getElementById('btnsubmit');
    let lbluserid=<HTMLScriptElement>document.getElementById('lbluserid');
    
    //let password=<HTMLScriptElement>document.getElementById('password');
    this.inpuserid="";
    this.inppassword="";
     lblpwd.innerHTML="Password";
      this.Disabled_Password=false;
      btnsubmit.innerHTML="Sign In";
      this.logintype="P";
      lbluserid.innerHTML="User Id";
      this.pwdRequired="";
      this.userRequired="";
      this.invalidpwd="";
      $("#otp").prop("checked", false);
      $("#password").prop("checked", true);
      
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
  
if(response['status']=="true" && response['data'].length!=0 && this.data[0]['verifystatus']=='true')
{      
      this.islogged=true;
      let divloginmodel = <HTMLScriptElement>document.getElementById('divloginmodel'); 
      divloginmodel.style.display="none";
      if(this.state_code_l!="0" && this.district_code_l!="0")
      {
      this.loadEKYCData(this.type,this.state_code_l,this.district_code_l,"","B",this.urban_rural);

     
        this.ACGDTBars.destroy();
        this.GetACGTD(this.tdtype,this.state_code_l,this.district_code_l,"","B",this.urban_rural);
      

      this.rptHeader=this.state_name+" -> "+this.district_name+ " -> Block/Town Wise";
      this.rptStateHeader=this.state_name+" -> "
      this.rptDistrictHeader=this.district_name+ " -> Block/Town Wise";
      this.rptBlockHeader="";

      this.rptStateHeader_Chart=this.state_name+" -> "
      this.rptDistrictHeader_Chart=this.district_name;
      this.rptBlockHeader_Chart="";
      }
      if(this.state_code_f!="0" && this.district_code_f!="0")
      {
        this.loadEKYCData_Face(this.typeF,this.state_code_f,this.district_code_f,"","B",this.urban_rural_F);
        this.rptHeaderFace=this.state_name_F+" -> "+this.district_name_F+ " -> Opeartor Wise";
      }
     
}
else
{
  this.invalidpwd="Invalid OTP!!";
}
});
}

getReport_date()
{
  this.loadEKYCData(this.type,"","","","S",this.urban_rural);
}

BindCardReport(text:any,state_code:any,type:any,agencyid:any)
  {        
    console.log("text : "+text);
    console.log("state_code : "+state_code);
    console.log("type : "+type);
    if(state_code!="" && type=="S")
    {
      this.carddeliverycode=state_code;
      this.cardrpttype=type;
      this.loadCardDeliveryData(this.cardtype,this.carddeliverycode,this.cardrpttype,agencyid);
      this.Card_State_Name=" -> "+text+" -> "+"District Wise";
      this.cardagencyid=agencyid;      
    }
    else if(state_code!="" && type=="D")
    {
      this.cardrpttype="";
      this.cardagencyid="";
      this.loadCardDeliveryData(this.cardtype,this.carddeliverycode,this.cardrpttype,"");
      this.Card_State_Name=" -> State Wise";
      
    }
    else
    {
      this.cardrpttype="";
      this.cardagencyid="";
      this.loadCardDeliveryData(this.cardtype,this.carddeliverycode,this.cardrpttype,"");
      this.Card_State_Name=" -> State Wise";
      
    }   
    
  }
  getCardReport()
  {
    this.carddeliverycode="";
    this.cardrpttype="";
    this.loadCardDeliveryData(this.cardtype,this.carddeliverycode,this.cardrpttype,this.cardagencyid);
    this.Card_State_Name=" -> State Wise";
  }

  getCardOption(opt:any)
  {
    if(opt=="T")
        this.cardtype="T";
    if(opt=="W")
        this.cardtype="W";
    if(opt=="M")
        this.cardtype="M";
    if(opt=="Y")
        this.cardtype="Y";
      
    let divDate_Card=<HTMLScriptElement>document.getElementById('divDate_Card');
    if(opt=="D")
    {    
      this.cardtype="D";  
      divDate_Card.style.display="block";
      
      let fdate: Date = new Date();
      fdate.setDate(fdate.getDate() -15);
      var fdt=String(this.pipe.transform(fdate , 'yyyy-MM-dd')); 

      let tdate: Date = new Date();
      tdate.setDate(tdate.getDate()-1);
      var tdt=String(this.pipe.transform(tdate , 'yyyy-MM-dd')); 
   
      this.txtfromdate_card=fdt;
      this.txttodate_card=tdt;
    }
    else
    {
      divDate_Card.style.display="none";
    }

    this.cardagencyid="";
    //console.log("this.type : "+this.type);
    this.loadCardDeliveryData(this.cardtype,this.carddeliverycode,this.cardrpttype,this.cardagencyid);
    this.Card_State_Name=" -> State Wise";
      
  }
  getReport_Card_date()
  {
    this.loadCardDeliveryData(this.cardtype,this.carddeliverycode,this.cardrpttype,this.cardagencyid);
  }
}
