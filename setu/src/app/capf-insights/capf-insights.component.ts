import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


import { Chart,LayoutItem,registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Capfdatareq } from '../model/capfdatareq';
import { EncrDecrService } from '../model/encr-decr-service';
import { Pmjreq } from '../model/pmjreq';
import { CapfApiserviceService } from '../service/capf-apiservice.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

Chart.register(...registerables);
Chart.register(ChartDataLabels);
@Component({
  selector: 'app-capf-insights',
  templateUrl: './capf-insights.component.html',
  styleUrls: ['./capf-insights.component.css']
})
export class CapfInsightsComponent implements OnInit {
  
  cghsdatareq:Capfdatareq;
  cghslistdata:any;
  
  pmjReq:Pmjreq;
  stateList:any;
  districtlist:any;
  hosplist:any;
  ddlstate:any="";
  ddldistrict:any="";
  ddlhosp:any="";
  CGHSSTDCElement:any;
  state_code_arr:any;
  district_code_arr:any;
  CGHSDTState_District:any;
  cghsstatewise:any;
  tbldisplaywithChart:any;
  cghsuserdata:any;
  cghsuserstatedata:any;

 
  level:any;
  levelToggel:any='C';

  
  statedatehospwise:any;
  levelcalimsummaryToggel:any;
  CGHS_State_Level_Summ:any;
  uploadDate:any;
  state_name:any;
  district_name:any;
  capftype:any;
  capfForcetype:any;
  capfbisdata:any;
  encrdecrdervice:EncrDecrService;

  submitted_count:any;
  cpd_processed_count:any;
  aco_processed_count:any;
  ddo_processed_count:any;
  submitted_amount:any;
  cpd_processed_amount:any;
  aco_processed_amount:any;
  ddo_processed_amount:any;
 
  @ViewChild('modal') modal:any;

  
  encdecKey:any;
  userid:any;
  state_code:any;
  district_code:any;
  agency_code:any;
  role:any;
  fromDate:any="";
  ddlforcetype:any="";
  ddlusertype:any="";

  ddlforcetype_bis:any="";
  ddlunittype_bis:any="";
  ddlmembertype_bis:any="";
  unittypeList:any;
  membertypeList:any;
  capfbisbenList:any;
  pageData = {
    dmshaactivitylist: [] as any[],
    dmpendinglist: []  as any[]
    
  }
  totalData = {
    dmshaactivitylist: [] as any[],
    dmpendinglist: []  as any[]
    
  }

  constructor(public apiService: CapfApiserviceService,
    public router: Router) {
      this.cghsdatareq=new Capfdatareq();
      this.pmjReq=new Pmjreq();
      
      this.capftype="";
      this.capfForcetype="";
      this.encrdecrdervice=new EncrDecrService();

      this.encrdecrdervice=new EncrDecrService();
      this.encdecKey=this.encrdecrdervice.keys;
      this.role=this.encrdecrdervice.decrypted(localStorage.getItem('role'));
      this.userid=this.encrdecrdervice.decrypted(localStorage.getItem('userid'));
      this.state_code=this.encrdecrdervice.decrypted(localStorage.getItem('state_code'));
      this.district_code=this.encrdecrdervice.decrypted(localStorage.getItem('district_code'));
      this.agency_code=this.encrdecrdervice.decrypted(localStorage.getItem('agency_code')); 
      if(this.userid=="")
      {
        this.router.navigate(['login']);
      }
      if(this.role!="1" && this.role!="6")
      {
        this.router.navigate(['login']);
      }
    }
    fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    fileExtension = '.xlsx';
  ngOnInit(): void {

    let capfbisdata = <HTMLScriptElement>document.getElementById('capfbisdata');
    let capfbisdataamount = <HTMLScriptElement>document.getElementById('capfbisdataamount');
    capfbisdata.style.display="block";
    capfbisdataamount.style.display="none";
    this.GetUnitMaster();
    this.GetMemberMaster();
    
    this.GetCAPFBISData("","","","","");

    this.loadDMSHAActivityCData("");
    this.loadDMPendingData("");
    this.GetCGHSTopHeadData(this.capftype,"","","",this.capfForcetype);
    
    this.level="NHA";
    
    this.levelcalimsummaryToggel="C";
    this.GetStateMaster();
    this.GetUploadDate();
    let model = <HTMLScriptElement>document.getElementById('model');
    model.style.display="none";

    
  }

  bindHosp(event:any)
   {
    var val=event.target.value;
    this.ddldistrict=val;
   this.getHosp(this.ddlstate,val);

   }
   
   selectHosp(event:any)
   {
    var val=event.target.value;
    this.ddlhosp=val;
   }
  getHosp(state_code:any,district_code:any)
{

  this.pmjReq.type=this.encrdecrdervice.encrypted('CAPFHM');
  if(state_code!="")
  this.pmjReq.state_code=this.encrdecrdervice.encrypted(state_code);
  else
  this.pmjReq.state_code="";
  if(district_code!="")
  this.pmjReq.district_code=this.encrdecrdervice.encrypted(district_code);
  else
  this.pmjReq.district_code="";
  this.pmjReq.rpttype="";
  this.apiService.GetStateDist(this.pmjReq).subscribe((response) => {
     if(response['status']=="true")
 {
   this.hosplist=response['list'];
  }
 });

}
getReport()
{
  if(this.tbldisplaywithChart==true)
  {
    this.ddldistrict="";
    this.ddlstate="";
    this.ddlhosp="";
    this.tbldisplaywithChart=false;
  }


  this.GetCGHSTopHeadData(this.capftype,this.ddlstate,this.ddldistrict,this.ddlhosp,this.capfForcetype);  
 
  
  return false;
}
  GetStateMaster()
  {
    this.pmjReq.type=this.encrdecrdervice.encrypted('SMCAPF');
    this.pmjReq.state_code="";
    this.pmjReq.district_code="";
    this.pmjReq.rpttype="";
   this.apiService.GetStateDist(this.pmjReq).subscribe((response) => {
     
       if(response['status']=="true")
   {
     this.stateList=response['list'];
     //console.log(this.stateList);
   }
   });

  }
  getDistrict(state_code:any)
  {

    this.pmjReq.type=this.encrdecrdervice.encrypted('DMCAPF');
    if(state_code!="")
    this.pmjReq.state_code=this.encrdecrdervice.encrypted(state_code);
    else
    this.pmjReq.state_code="";
    this.pmjReq.district_code="";
    this.pmjReq.rpttype="";
   this.apiService.GetStateDist(this.pmjReq).subscribe((response) => {
    //console.log("Rizwan");
    //console.log(response);

       if(response['status']=="true")
    {

        this.districtlist=response['list'];
    }
  });
  }
  bindDistrict(event:any)
   {
    this.tbldisplaywithChart=false;
    this.ddldistrict="";
    this.ddlstate="";
    this.ddlhosp="";
    var val=event.target.value;
    this.ddlstate=val;
    this.getDistrict(val);
    this.getHosp("","");
   }
  GetCGHSTopHeadData(app_type:any,state_code:any,district_code:any,hosp_code:any,force_type:any)
   {
      this.cghsdatareq.app_type=app_type;
      this.cghsdatareq.type='THI';
      this.cghsdatareq.state_code=state_code;
      this.cghsdatareq.district_code=district_code;
      this.cghsdatareq.hosp_code=hosp_code;
      this.cghsdatareq.rpttype="";
      this.cghsdatareq.force_type=force_type;
      this.apiService.GetCAPFData(this.cghsdatareq).subscribe((response) => {
        console.log(response['list']);
      if(response['status']=="true")
      {
        this.cghslistdata=[];
        this.cghslistdata=response['list'];

        this.submitted_count=this.getCommaValue(this.cghslistdata[0]['submitted_count']);
        this.cpd_processed_count=this.getCommaValue(this.cghslistdata[0]['cpd_processed_count']);
        this.aco_processed_count=this.getCommaValue(this.cghslistdata[0]['aco_processed_count']);
        this.ddo_processed_count=this.getCommaValue(this.cghslistdata[0]['ddo_processed_count']);
        this.submitted_amount=this.cghslistdata[0]['submitted_amount']
        this.cpd_processed_amount=this.cghslistdata[0]['cpd_processed_amount']
        this.aco_processed_amount=this.cghslistdata[0]['aco_processed_amount']
        this.ddo_processed_amount=this.cghslistdata[0]['ddo_processed_amount']
      }
      });
   }

   
   getCAPFReport(event:any)
   {
    var val=event.target.value;
    this.capftype=val;
    this.GetCGHSTopHeadData(this.capftype,"","","",this.capfForcetype);
    
    
   }

   getCAPFReport_Force(event:any)
   {
    var val=event.target.value;
    console.log("val : "+val);
    this.capfForcetype=val;
    this.GetCGHSTopHeadData(this.capftype,"","","",this.capfForcetype);
   
    
   }

   
   getToCR(nStr:any)
   {
    var num;
    num=Number(nStr);
    if(num>=100000)
      num=String((num/10000000).toFixed(2))+'Cr';
    else
      num=String((num/1000).toFixed(2))+'K';
    return num;
   }

   getCR(nStr:any)
   {
    var num;
    num=Number(nStr);
    if(num>0)
    num=String((num/10000000).toFixed(2));
    else
    num=0;
    return num;
   }

   getLac(nStr:any)
   {
    var num;
    num=Number(nStr);
    if(num>0)
    num=String((num/100000).toFixed(2));
    else
    num=0;
    return num;
   }

  getCommaValue(nStr:any)
  {
    nStr=String(nStr);
    var num;
    if(nStr.length==4)
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
    return num;
  }

  

   GetUploadDate()
   {
    this.apiService.GetCAPFUploadDate().subscribe((response) => {
     // console.log(response);
        if(response['status']=="true")
    {
      this.uploadDate=response['date'];
    }
  });
   }
   showModal()
   {
    let model = <HTMLScriptElement>document.getElementById('model');
    model.style.display="block";
   }

   getForceTypeName(type:any)
   {
    var name="";
    if(type=="BS")
       name="Border Security Force";
    else if(type=="NS")
       name="National Security Gaurd";
    else if(type=="CI")
       name="Central Industrial Security Force";
    else if(type=="AR")
       name="Assam Rifles";
    else if(type=="SS")
       name="Sashastra Seema Bal";
    else if(type=="IT")
       name="Indo-Tibetan Border Police";
    else if(type=="CR")
       name="Central Reserve Police Force";
    else if(type=="OT")
       name="Others";
    else
       name="";

      return name;
   }


   loadDMSHAActivityCData(type:any) {  
    console.log("this.fromDate : "+this.fromDate)  ;
    this.apiService.Getcapfdmshaactivity({
      "type":type,
      "user_type":this.ddlusertype|| "",     
      "date":this.fromDate|| "" ,
      "app_type":this.ddlforcetype|| "" 
    }).subscribe((resp: any)=>{ 
       
      this.pageData.dmshaactivitylist = resp.list;
   
      if(resp.list.length) {
        const keys = Object.keys(resp.list[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.list.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.dmshaactivitylist = [totalData]
      } else {
        this.totalData.dmshaactivitylist = []
      } 
      
      $('#capfdmshaactivity').DataTable().clear().destroy();
      setTimeout(()=>{        
                    
        $('#capfdmshaactivity').DataTable( {         
          pagingType: 'full_numbers',
          pageLength: 20,
          searching:true,
          paging:true,
          processing: true,                            
          lengthMenu : [10, 25,50],          
        
      });
      }, 1);
      $('#capfdmshaactivityamount').DataTable().clear().destroy();
      setTimeout(()=>{        
                    
        $('#capfdmshaactivityamount').DataTable( {         
          pagingType: 'full_numbers',
          pageLength: 20,
          searching:true,
          paging:true,
          processing: true,                            
          lengthMenu : [10, 25,50],          
        
      });
      }, 1);
      
    })  
  }

  loadDMPendingData(type:any) {    
    this.apiService.Getcapfdmpending({
      "type":"",
      "user_type":"",     
      "date": "" ,
      "app_type": "" 
    }).subscribe((resp: any)=>{ 
       
      this.pageData.dmpendinglist = resp.list;
   
      if(resp.list.length) {
        const keys = Object.keys(resp.list[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.list.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.dmpendinglist = [totalData]
      } else {
        this.totalData.dmpendinglist = []
      } 
      
      $('#capfdmpending').DataTable().clear().destroy();
      setTimeout(()=>{        
                    
        $('#capfdmpending').DataTable( {         
          pagingType: 'full_numbers',
          pageLength: 20,
          searching:true,
          paging:true,
          processing: true,                            
          lengthMenu : [10, 25,50],          
        
      });
      }, 1);
       
      
    })  
  }
getDMSHAReport()
{
  this.loadDMSHAActivityCData("");
}

 onForceChange_bis()
   {
    this.GetUnitMaster();
    this.ddlunittype_bis="";
    this.GetCAPFBISData("","","","","");
   }
   onStateChange_bis()
   {
    
    this.GetCAPFBISData("","","","","");
   }
   GetCAPFBISData(app_type:any,state_code:any,district_code:any,hosp_code:any,toggelType:any)
   {
     
      this.cghsdatareq.app_type=app_type;
      this.cghsdatareq.type='CAPFBIS';
      this.cghsdatareq.state_code=state_code;
      this.cghsdatareq.district_code=district_code;
      this.cghsdatareq.hosp_code=hosp_code;
      this.cghsdatareq.rpttype="";
      this.cghsdatareq.force_type=this.ddlforcetype_bis || "";
      this.cghsdatareq.unit_type=this.ddlunittype_bis || "";
      this.cghsdatareq.member_type=this.ddlmembertype_bis || "";
      this.apiService.GetCAPFData(this.cghsdatareq).subscribe((response) => {
        
      if(response['status']=="true")
      {
        this.capfbisdata=[];
        this.capfbisdata=response['list'];
      }
      });
   }

   GetCAPFBISBenData(type:any,ddlforcetype_bis:any)
   {
     if(this.ddlunittype_bis!="")
     {
      this.cghsdatareq.app_type="";
      this.cghsdatareq.type=type;
      this.cghsdatareq.state_code="";
      this.cghsdatareq.district_code="";
      this.cghsdatareq.hosp_code="";
      this.cghsdatareq.rpttype="";
      this.cghsdatareq.force_type=ddlforcetype_bis || "";
      this.cghsdatareq.unit_type=this.ddlunittype_bis || "";
      this.cghsdatareq.member_type=this.ddlmembertype_bis || "";
      this.apiService.GetCAPFBISBenData(this.cghsdatareq).subscribe((response) => {
        
      if(response['status']=="true")
      {
       console.log("response['list']");
       console.log(response['list']);
        this.capfbisbenList=[];
        this.capfbisbenList=response['list'];
        if(this.capfbisbenList.length>0)
        {
        var data=this.CreateTableToExport(this.capfbisbenList,type); 
        var filename="capf_BIS_Ben_"+ddlforcetype_bis+"_"+this.ddlunittype_bis;    
        this.exportExcel(data,filename);
        }

      }
      });
    }
      return false;
   }

   GetUnitMaster()
  {
    this.pmjReq.type=this.encrdecrdervice.encrypted('CAPFUM');
    if(this.ddlforcetype_bis!="")
    this.pmjReq.state_code=this.encrdecrdervice.encrypted(this.ddlforcetype_bis) ||"";
    else 
    this.pmjReq.state_code="";
    this.pmjReq.district_code="";
    this.pmjReq.rpttype="";
   this.apiService.GetStateDist(this.pmjReq).subscribe((response) => {

    
       if(response['status']=="true")
   {
     this.unittypeList=response['list'];     
   }
   });

  }

  GetMemberMaster()
  {
    this.pmjReq.type=this.encrdecrdervice.encrypted('CAPFMM');
    this.pmjReq.state_code="";
    this.pmjReq.district_code="";
    this.pmjReq.rpttype="";
   this.apiService.GetStateDist(this.pmjReq).subscribe((response) => {
     
       if(response['status']=="true")
   {
     this.membertypeList=response['list'];
     //console.log(this.stateList);
   }
   });

  }

  CreateTableToExport(data:any,type:any)
  {
    let tble="<table border='1'>";
    tble+="<tr>";
    tble+="<th>Force ID</th>";
    tble+="<th>Force Name</th> ";
    tble+="<th>PMJAY ID</th> ";
    tble+="<th>Name</th> ";                                                 
    /*tble+="<th>Age</th>";*/
    tble+="<th>Gender</th>";
    tble+="<th>Relation</th>";
    tble+="<th>Unit/Batalian</th>";
    tble+="<th>Registration Date</th>";
    if(type!="T_Pmj")
    {
    tble+="<th>Card Status</th>";    
    tble+="<th>AADHAAR Verified</th>";  
    }  
    tble+="</tr>";
    
    for(var i in data)
    {
      tble+="<tr >";
      tble+="<td >"+data[i]['id_number']+" </td>";
      tble+="<td >"+this.getForceTypeName(data[i]['id_type'])+"</td>";                                                  
      tble+="<td>"+data[i]['pmjay_id']+"</td>";                                                  
      tble+="<td>"+data[i]['member_name_eng']+"</td>";
      /*tble+="<td>"+data[i]['a_amount_0_5']+"</td>";*/
      tble+="<td>"+data[i]['gender']+"</td>";
      tble+="<td>"+data[i]['relation_name']+"</td>";
      tble+="<td>"+data[i]['unit_name']+"</td>";
      tble+="<td>"+data[i]['insertion_date']+"</td>";
      if(type!="T_Pmj")
      {
        tble+="<td>"+data[i]['verification_status']+"</td>";        
        tble+="<td>"+data[i]['is_aadhaar']+"</td>";
      }
      
      tble+="</tr>";
    }
    tble+="</table>";
    return tble;
  }

  exportExcel(jsonData:any, fileName: string): void {

    //console.log(jsonData);
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

  onToggle(id:any)
  {
    let el = <HTMLElement>document.getElementById(id);
    let capfbisdata = <HTMLScriptElement>document.getElementById('capfbisdata');
      let capfbisdataamount = <HTMLScriptElement>document.getElementById('capfbisdataamount');
     
    if(el.ariaPressed=="false")
    {
      if(id=="CAPF_toggbisamount")
      {
        capfbisdata.style.display="none";
        capfbisdataamount.style.display="block";
      }
     
     
    }
    else
    {
      if(id=="CAPF_toggbisamount")
      {
        capfbisdata.style.display="block";
        capfbisdataamount.style.display="none";
      }     
    }
}
  
}
