import { DatePipe } from '@angular/common';
import { typeofExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { EncrDecrService } from '../model/encr-decr-service';
import { PmjReportReq } from '../model/pmj-report-req';
import { Pmjreq } from '../model/pmjreq';
import { ApiserviceService } from '../service/apiservice.service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'app-setu-card-report',
  templateUrl: './setu-card-report.component.html',
  styleUrls: ['./setu-card-report.component.css']
})
export class SetuCardReportComponent implements OnInit {

  pmjReq:Pmjreq;
  stateList:any;
  agencyList:any;
  selectedAgency:any = '';
  selectedState:any = '';
  fromDate:any;
  selectedState_ARR:any="";
  selectedAgency_ARR:any="";
  fromDate_ARR:any;
  selectedState_ARSS:any="";
  fromDate_ARSS:any;
  selectedState_ARSA:any="";
  fromDate_ARSA:any;
  selectedAgency_ARSA:any="";
  selectedState_CAP:any="";
  fromDate_CAP:any;
  selectedLive_CAP:any=""

  selectedAgency_PAP:any="";

  selectedState_PAP:any="";
  fromDate_PAP:any;
  fromDate_PAPA:any;

  selectedState_PDS:any="";
  fromDate_PDS:any;

  selectedState_AND:any="";
  fromDate_AND:any;

  role:any;
  encrdecrdervice:EncrDecrService;
  encdecKey:any;
  userid:any;
  state_code:any;
  district_code:any;
  agency_code:any;
  pipe = new DatePipe('en-US');  
  ARR_State:any;
  CAP_State:any;
  ARSS_State:any;
  PDS_State:any;
  Disabledddlstate_ARR:any;
  Disabledddlstate_CAP:any;
  Disabledddlstate_ARSS:any;
  Disabledddlstate_PDS:any;

  selectedAgency_CAP:any;
  selectedAgency_ARSS:any;
  selectedAgency_PDS:any;
  pmjreportreq:PmjReportReq;

  loginhistoryArr:any;
loginhistory:any;
DistrictList_Create:any;
DistrictList_Download:any;

totalArr:any;
total:any;
total_approved:any;
total_reject:any;
colspan:any;
isAgency:any;
datatablecreated:any;


Disabledddlstate_create:boolean=false;
  Disabledddldistrict_create:boolean=false;
  Disabledddlagency_create:boolean=false;

  ddlstate: any;
  ddlstatelogin:any;
  ddldistrict: any;
  ddlagency: any;
  ddllagency: any;
  ddllagency_LH:any="";
  agencyList_L:any;
  delivery_count:any;
  uploadDate:any;
  txtfromdate_create1:any;

  ddldistrict_sdbv:any="";
  ddlblock_sdbv:any="";
  fromDate_SDBV:any="";
  BIS_District_List:any;
  BIS_Block_List:any;
  sdbv_text:any;
  BIS_Secretariat_List:any;
  ddlecretariat_sdbv:any="";
  pageData = {
    authRequestReceived: [] as any[],
    creatingAgencyPerformance: []  as any[],
    authenticationRequestStatus: [] as any[],
    authenticationRequestStatus_agency: [] as any[],
    processingAgencyPerformance: [] as any[],
    processingAgencyPerformance_agency: [] as any[],
    processingAgencyPerformance_name: [] as any[],
    printingAndDeliveryStatus: [] as any[],
    authenticatedBuNotDelivered: [] as any[],
    bis_SDBV_List: [] as any[],
    //PAPSList:[] as any[]
  }
  totalData = {
    authRequestReceived: [] as any[],
    creatingAgencyPerformance: []  as any[],
    authenticationRequestStatus: [] as any[],
    authenticationRequestStatus_agency: [] as any[],
    processingAgencyPerformance: [] as any[],
    processingAgencyPerformance_agency: [] as any[],
    processingAgencyPerformance_name: [] as any[],
    printingAndDeliveryStatus: [] as any[],
    authenticatedBuNotDelivered: [] as any[],
    bis_SDBV_List: [] as any[],
  }

  constructor(private apiService: ApiserviceService,public router: Router) {
    this.pmjReq=new Pmjreq();

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
      console.log("this.state_code : "+this.state_code)
      if(this.state_code!="NULL" && this.state_code!="null")
      {
      this.selectedState_ARR=this.state_code;
      this.selectedState_CAP=this.state_code;
      this.selectedState_ARSS=this.state_code;
      this.selectedState_PDS=this.state_code;
      }
      
      if(this.role=="4")
      {
        if(this.agency_code!="NULL" && this.agency_code!="null")
      {
        this.selectedAgency_ARR=this.agency_code;       
        this.selectedAgency_CAP=this.agency_code;    
        this.selectedAgency_ARSS=this.agency_code;    
        this.selectedAgency_PDS=this.agency_code; 
        this.ddllagency_LH=this.agency_code;   
      }
      }
      //if(this.userid!="" && this.role!="1")
       // this.router.navigate(['login']);

        let newDate =Date.now();
        var dt=String(this.pipe.transform(newDate, 'yyyy-MM-dd')); 
        this.fromDate_CAP=dt;
        this.txtfromdate_create1=dt;
        this.ARR_State="State Name";
        this.CAP_State="State Name";
        this.ARSS_State="State Name";
        this.PDS_State="State Name";

        this.pmjreportreq=new PmjReportReq();

        this.ddlstate=this.state_code;
      this.ddlstatelogin=this.state_code;
      this.ddldistrict=this.district_code;
      this.ddlagency=this.agency_code;
      this.ddllagency=this.agency_code;
      
      
   }

   fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
   fileExtension = '.xlsx';

  ngOnInit(): void {
    this.GetUploadDate();
    this.GetStateMaster();
    this.getAgency();
    let bisreport= <HTMLScriptElement>document.getElementById('tabs-BIS-tab');
    let bcdreport= <HTMLScriptElement>document.getElementById('tabs-ben-tab');
    let ccsreport= <HTMLScriptElement>document.getElementById('tabs-create-tab');
    let overlay_search= <HTMLScriptElement>document.getElementById('overlay_search');
    let tab_Andhra= <HTMLScriptElement>document.getElementById('tab_Andhra');
    
    overlay_search.style.display="none";
    let tabsBIS= <HTMLScriptElement>document.getElementById('tabs-BIS');
    //let insight= <HTMLScriptElement>document.getElementById('insight');
    //let bisdashboard= <HTMLScriptElement>document.getElementById('bisdashboard');
    let tabscreate= <HTMLScriptElement>document.getElementById('tabs-create');
    let datatablecreated1= <HTMLScriptElement>document.getElementById('datatablecreated1');
      let datatablecreated2= <HTMLScriptElement>document.getElementById('datatablecreated2');
      let datatablecreated3= <HTMLScriptElement>document.getElementById('datatablecreated3');
      let datatablecreated4= <HTMLScriptElement>document.getElementById('datatablecreated4');
      let chkagency= <HTMLScriptElement>document.getElementById('chkagency');
      let agencytext= <HTMLScriptElement>document.getElementById('agencytext');
      let trAgency= <HTMLScriptElement>document.getElementById('trAgency');
      
      if(this.role!="1")
      {
        //insight.style.display='none';
        //bisdashboard.style.display='none';
        chkagency.style.display='none';
        agencytext.style.display='none';
        tab_Andhra.style.display='block';
      }
    if(this.role=="1")
    {
      this.colspan=4;
      this.isAgency=false;
      datatablecreated2.className="rownotvisible";
      datatablecreated3.className="rownotvisible";
      datatablecreated4.className="rownotvisible";
      //this.GetPMJReports("","","","","","","C",this.role);
    }
    else if (this.role=="2")
    {
      this.colspan=3;
      datatablecreated1.className="rownotvisible";
      datatablecreated3.className="rownotvisible";
      datatablecreated4.className="rownotvisible";
      
      this.Disabledddlstate_create=true;      
     
      this.getDistrict(String(this.state_code),"LH");
      if(this.state_code=="28")
       tab_Andhra.style.display='block';
       else
       tab_Andhra.style.display='none';
      //this.GetPMJReports(this.state_code,"","","","","","C",this.role);
    }
    else if (this.role=="3")
    {
      this.colspan=2;
      datatablecreated1.className="rownotvisible";
      datatablecreated2.className="rownotvisible";
      datatablecreated4.className="rownotvisible";
      this.Disabledddlstate_create=true;
      this.Disabledddldistrict_create=true;
      this.getDistrict(this.state_code,"C");
      tab_Andhra.style.display='none';
      //this.GetPMJReports(this.state_code,this.district_code,"","","","","C",this.role);
      
    }
    else if (this.role=="4")
    {     
      this.colspan=4;
      datatablecreated2.className="rownotvisible";
      datatablecreated3.className="rownotvisible";
      datatablecreated1.className="rownotvisible"; 
      
      this.Disabledddlagency_create=true;
      tab_Andhra.style.display='none';
    //this.GetPMJReports("","",this.agency_code,"","","","C",this.role);
    }


    
    this.loadAuthRequestReceivedData();
    //this.loadPageData();

    if (this.role=="2")
    {      
      this.Disabledddlstate_ARR=true;  
      this.Disabledddlstate_CAP=true;
      this.Disabledddlstate_ARSS=true;  
      this.Disabledddlstate_PDS=true;
    }

    this.getBIS_District("28","BISDM");
    this.getBIS_SDBV();
    
  }

  pmjayinsight()
  {
  
    if(this.role==this.role)
       this.router.navigate(['/pmjay']); 
    else
      this.router.navigate(['login']);
  }

  getReport(type:any)
  {
    if(type=="ARR")
    {
      this.GetStateMaster();
      this.loadAuthRequestReceivedData();
    }

    if(type=="CAP")
    {
      this.GetStateMaster();
      this.loadCreatingAgencyPerformanceData();
    }
    if(type=="ARS")
    {
      this.GetStateMaster();
      this.loadAuthenticationRequestStatusData();
      this.loadAuthenticationRequestStatusData_agency();
    }
    if(type=="PAP")
    {
      this.GetStateMaster();
      this.loadProcessingAgencyPerformance();
      this.loadProcessingAgencyPerformance_agency();
    }
    if(type=="PDS")
    {
      this.GetStateMaster();
      this.loadPrintingDeliveryStatus();
    }
    if(type=="AND")
    {
      this.GetStateMaster();
      this.loadAuthenticatedbutnotdelivered();
    }
  }
  getAgencyName(code:any)
  {
    this.loadProcessingAgencyPerformance_name(code);
  }
  GetStateMaster()
  {
    this.pmjReq.type=this.encrdecrdervice.encrypted('SM');
    this.pmjReq.state_code="";
    this.pmjReq.district_code="";
    this.pmjReq.rpttype="";
   this.apiService.GetStateDist_Setu(this.pmjReq).subscribe((response) => {
     //console.log(response);
       if(response['status']=="true")
   {
     this.stateList=response['list'];
     //console.log(this.stateList);
   }
   });

  }

  
  onStateChange(type:any) {
    if(type=="ARR")
    {
      this.GetStateMaster();
      this.loadAuthRequestReceivedData();
    }
    if(type=="CAP")
    {
      this.GetStateMaster();
      this.loadCreatingAgencyPerformanceData();
    }
    if(type=="ARSS")
    {
      this.loadAuthenticationRequestStatusData();      
    }
    if(type=="PAPS")
    {
      this.loadProcessingAgencyPerformance();
    }
    if(type=="PDS")
    {
      this.loadPrintingDeliveryStatus();
    }
    if(type=="AND")
    {
       this.loadAuthenticatedbutnotdelivered();
    }
  }
  onAgencyChange(type:any) {
    if(type=="ARSA")
    this.loadAuthenticationRequestStatusData_agency()
  }

  onFromDateChange(type:any) {
    if(type=="ARR")
    {
      this.GetStateMaster();
      this.loadAuthRequestReceivedData();
    }
    if(type=="CAP")
    {
      this.GetStateMaster();
      this.loadCreatingAgencyPerformanceData();
    }
    if(type=="ARSS")
    {
      this.loadAuthenticationRequestStatusData();      
    }
    if(type=="ARSA")
    {      
      this.loadAuthenticationRequestStatusData_agency();
    }
    if(type=="PAP")
    {
      this.loadProcessingAgencyPerformance();
    }
    if(type=="PDS")
    {
      this.loadPrintingDeliveryStatus();
    }
    if(type=="AND")
    {    
      this.loadAuthenticatedbutnotdelivered();
    }
  }

  loadPageData() {
    this.loadAuthRequestReceivedData()
    this.loadCreatingAgencyPerformanceData();
    this.loadAuthenticationRequestStatusData();
  }
  loadAuthRequestReceivedData() {
    let overlay_search= <HTMLScriptElement>document.getElementById('overlay_search');
    overlay_search.style.display="flex";
    this.apiService.GetSetuCardData({
      "type":"ARC",
      "state_code":this.selectedState_ARR || "",
      "district_code":"",
      "agency_code":this.selectedAgency_ARR || "",
      "fromdate": this.fromDate_ARR || "",
      "todate":"",
      "rpttype":"L"
    }).subscribe((resp: any)=>{
      this.pageData.authRequestReceived = resp.data;
      overlay_search.style.display="none";
      if(resp.data.length) {
        const keys = Object.keys(resp.data[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.data.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.authRequestReceived = [totalData]
      } else {
        this.totalData.authRequestReceived = []
      }
      if(this.selectedState_ARR!="")
      {
        this.ARR_State="District Name";
      /*$('#tblARR').DataTable().clear().destroy();
      setTimeout(()=>{        
                    
        $('#tblARR').DataTable( {         
          pagingType: 'full_numbers',
          pageLength: 25,
          searching:true,
          paging:true,
          processing: true,                            
          lengthMenu : [10, 25,50],          
        
      });
      }, 1);*/
    }
      else
      {
        this.ARR_State="State Name";
       /* $('#tblARR').DataTable().clear().destroy();
      setTimeout(()=>{        
                    
        $('#tblARR').DataTable( {         
          pagingType: 'full_numbers',
          
          searching:false,
          paging:false,
          processing: true,                            
          
        
      });
      }, 1);*/
      }
    
    })
  
  }
  loadCreatingAgencyPerformanceData() {
    let overlay_search= <HTMLScriptElement>document.getElementById('overlay_search');
    overlay_search.style.display="flex";
    this.apiService.GetSetuCardData({
      "type":"CAP",
      "state_code":this.selectedState_CAP || "",
      "district_code":"",
      "agency_code":this.selectedAgency_CAP|| "",
      "fromdate":this.fromDate_CAP || "",
      "todate":"",
      "rpttype":this.selectedLive_CAP || ""
    }).subscribe((resp: any)=>{
      this.pageData.creatingAgencyPerformance = resp.data;
      overlay_search.style.display="none";
      if(resp.data.length) {
        const keys = Object.keys(resp.data[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.data.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.creatingAgencyPerformance = [totalData]
      } else {
        this.totalData.creatingAgencyPerformance = []
      }

      if(this.selectedState_CAP!="")
      {
        this.CAP_State="District Name";
      /*$('#tblCAP').DataTable().clear().destroy();
      setTimeout(()=>{        
                    
        $('#tblCAP').DataTable( {         
          pagingType: 'full_numbers',
          pageLength: 25,
          searching:true,
          paging:true,
          processing: true,                            
          lengthMenu : [10, 25,50],          
        
      });
      }, 1);*/
    }
      else
      {
        this.CAP_State="State Name";
        /*$('#tblCAP').DataTable().clear().destroy();
      setTimeout(()=>{        
                    
        $('#tblCAP').DataTable( {         
          pagingType: 'full_numbers',
          
          searching:false,
          paging:false,
          processing: false,                            
         
        
      });
      }, 1);*/
      }
    })
  }
  loadAuthenticationRequestStatusData() {
    let overlay_search= <HTMLScriptElement>document.getElementById('overlay_search');
    overlay_search.style.display="flex";
    this.apiService.GetSetuCardData({
      "type":"ARSS",
      "state_code":this.selectedState_ARSS || "",
      "district_code":"",
      "agency_code":this.selectedAgency_ARSS|| "",
      "fromdate":this.fromDate_ARSS || "",
      "todate":"",
      "rpttype":"L"
    }).subscribe((resp: any)=>{
      this.pageData.authenticationRequestStatus = resp.data;
      overlay_search.style.display="none";
      this.loadAuthenticationRequestStatusData_agency();

      if(resp.data.length) {
        const keys = Object.keys(resp.data[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.data.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.authenticationRequestStatus = [totalData]
      } else {
        this.totalData.authenticationRequestStatus = []
      }

if(this.selectedState_ARSS!="")
{
  this.ARSS_State="District Name";
      $('#tblARSS').DataTable().clear().destroy();
      setTimeout(()=>{        
                    
        $('#tblARSS').DataTable( {         
          pagingType: 'full_numbers',
          pageLength: 25,
          searching:true,
          paging:true,
          processing: true,                            
          lengthMenu : [10, 25,50],          
        
      });
      }, 1);
    }
    else
    {
      this.ARSS_State="State Name";
      $('#tblARSS').DataTable().clear().destroy();
      setTimeout(()=>{        
                    
        $('#tblARSS').DataTable( {         
          pagingType: 'full_numbers',
          
          searching:false,
          paging:false,
               
        
      });
      }, 1);
    }
    })
  }
  loadAuthenticationRequestStatusData_agency() {
    this.apiService.GetSetuCardData({
      "type":"ARSA",
      "state_code":"",
      "district_code":"",
      "agency_code": this.selectedAgency_ARSA || '',
      "fromdate":this.fromDate_ARSA || "",
      "todate":"",
      "rpttype":"L"
    }).subscribe((resp: any)=>{
      this.pageData.authenticationRequestStatus_agency = resp.data;

      if(resp.data.length) {
        const keys = Object.keys(resp.data[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.data.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.authenticationRequestStatus_agency = [totalData]
      } else {
        this.totalData.authenticationRequestStatus_agency = []
      }

      $('#tblARSA').DataTable().clear().destroy();
      setTimeout(()=>{        
                    
        $('#tblARSA').DataTable( {         
          pagingType: 'full_numbers',
          pageLength: 25,
          searching:true,
          paging:true,
          processing: true,                            
          lengthMenu : [10, 25,50],          
        
      });
      }, 1);

    })
  }

  loadProcessingAgencyPerformance() {
    
    this.apiService.GetSetuCardData({
      "type":"PAPS",
      "state_code":this.selectedState_PAP || "",
      "district_code":"",
      "agency_code":"",
      "fromdate":this.fromDate_PAP || "",
      "todate":"",
      "rpttype":""
    }).subscribe((resp: any)=>{
      this.pageData.processingAgencyPerformance = resp.data;  
      
      if(resp.data.length) {
        const keys = Object.keys(resp.data[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.data.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.processingAgencyPerformance = [totalData]
      } else {
        this.totalData.processingAgencyPerformance = []
      }
      
      $('#tblPAPS').DataTable().clear().destroy();
      setTimeout(()=>{        
                    
        $('#tblPAPS').DataTable( {         
          pagingType: 'full_numbers',
          pageLength: 25,
          searching:true,
          paging:true,
          processing: true,                            
          lengthMenu : [10, 25,50],          
        
      });
      }, 1);
    })
  }

  loadProcessingAgencyPerformance_agency() {
    this.apiService.GetSetuCardData({
      "type":"PAPA",
      "state_code":this.selectedAgency_PAP || "",
      "district_code":"",
      "agency_code":"",
      "fromdate":this.fromDate_PAPA || "",
      "todate":"",
      "rpttype":""
    }).subscribe((resp: any)=>{
      this.pageData.processingAgencyPerformance_agency = resp.data;  
      
      if(resp.data.length) {
        const keys = Object.keys(resp.data[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.data.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.processingAgencyPerformance_agency = [totalData]
      } else {
        this.totalData.processingAgencyPerformance_agency = []
      }
      $('#tblPAPA').DataTable().clear().destroy();
      setTimeout(()=>{        
                    
        $('#tblPAPA').DataTable( {         
          pagingType: 'full_numbers',
          pageLength: 25,
          searching:true,
          paging:true,
          processing: true,                            
          lengthMenu : [10, 25,50],          
        
      });
      }, 1);
      
    })
  }

  loadProcessingAgencyPerformance_name(state_code:any) {
    console.log("state_code : "+state_code);
    this.apiService.GetSetuCardData({
      "type":"PAPN",
      "state_code":state_code,
      "district_code":"",
      "agency_code":this.selectedAgency_PAP || "",
      "fromdate":this.fromDate_PAPA || "",
      "todate":"",
      "rpttype":""
    }).subscribe((resp: any)=>{
      this.pageData.processingAgencyPerformance_name = resp.data;  
      
      if(resp.data.length) {
        const keys = Object.keys(resp.data[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.data.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.processingAgencyPerformance_name = [totalData]
      } else {
        this.totalData.processingAgencyPerformance_name = []
      }
      
      $('#tblPAPN').DataTable().clear().destroy();
      setTimeout(()=>{        
                    
        $('#tblPAPN').DataTable( {         
          pagingType: 'full_numbers',
          pageLength: 50,
          searching:true,
          paging:true,
          processing: true,                            
          lengthMenu : [10, 25,50],          
        
      });
      }, 1);
    })
  }

  loadPrintingDeliveryStatus() {
    let overlay_search= <HTMLScriptElement>document.getElementById('overlay_search');
    overlay_search.style.display="flex";
    this.apiService.GetSetuCardData({
      "type":"PDS",
      "state_code":this.selectedState_PDS || "",
      "district_code":"",
      "agency_code":this.selectedAgency_PDS|| "",
      "fromdate":this.fromDate_PDS || "",
      "todate":"",
      "rpttype":""
    }).subscribe((resp: any)=>{
      this.pageData.printingAndDeliveryStatus = resp.data;  
      overlay_search.style.display="none";
      if(resp.data.length) {
        const keys = Object.keys(resp.data[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.data.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.printingAndDeliveryStatus = [totalData]
      } else {
        this.totalData.printingAndDeliveryStatus = []
      }
      
      if(this.selectedState_PDS!="")
      {
        this.PDS_State="District Name";
      $('#tblPDS').DataTable().clear().destroy();
      setTimeout(()=>{        
                    
        $('#tblPDS').DataTable( {         
          pagingType: 'full_numbers',
          pageLength: 25,
          searching:true,
          paging:true,
          processing: true,                            
          lengthMenu : [10, 25,50],          
        
      });
      }, 1);}
      else
      {
        this.PDS_State="State Name";
        $('#tblPDS').DataTable().clear().destroy();
      setTimeout(()=>{        
                    
        $('#tblPDS').DataTable( {         
          pagingType: 'full_numbers',
          
          searching:false,
          paging:false,
          
      });
      }, 1);
      }
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

  loadAuthenticatedbutnotdelivered() {
    let overlay_search= <HTMLScriptElement>document.getElementById('overlay_search');
    overlay_search.style.display="flex";
    this.apiService.GetSetuCardData({
      "type":"AND",
      "state_code":this.selectedState_AND || "",
      "district_code":"",
      "agency_code":"",
      "fromdate":this.fromDate_AND || "",
      "todate":"",
      "rpttype":""
    }).subscribe((resp: any)=>{
      this.pageData.authenticatedBuNotDelivered = resp.data;  
      overlay_search.style.display="none";
      if(resp.data.length) {
        const keys = Object.keys(resp.data[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.data.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.authenticatedBuNotDelivered = [totalData]
      } else {
        this.totalData.authenticatedBuNotDelivered = []
      }
      
      $('#tblAND').DataTable().clear().destroy();
      setTimeout(()=>{        
                    
        $('#tblAND').DataTable( {         
          pagingType: 'full_numbers',
          pageLength: 25,
          searching:true,
          paging:true,
          processing: true,                            
          lengthMenu : [10, 25,50],          
        
      });
      }, 1);
    })
  }


  loadProcessingAgencyPerformanceData() {

  }
  loadPrintingAndDeliveryStatusData() {

  }
  loadAuthenticateNoDeliveredData() {

  }

  ////********************************* */

  bindDistrict(event:any,type:any)
   { 
    var val=event.target.value;
    
    this.getDistrict(val,type);
    //$('#ddlHosp').val("");
    if(val!="")
    {
      //this.StateError="";     
    }
    else
    {
      //this.StateError="Please select state.";
    }
   }
   bindReport(type:any)
   {
    
    var stateCode="";
    var districtCode="";
    var agencyCode="";
    var schemeCode="";
    var fromDate="";
    var toDate="";
    
     if(type=="C")
     {

        stateCode=String($('#ddlstate_create').val());
        districtCode=String($('#ddldistrict_create').val());
        agencyCode=String($('#ddlagency_create').val());
        schemeCode=String($('#ddlscheme_create').val());
        fromDate=String($('#txtfromdate_create1').val());
        toDate=String($('#txttodate_create1').val());

        console.log("stateCode : "+stateCode);
        console.log("districtCode : "+districtCode);
        console.log("agencyCode : "+agencyCode);
        console.log("fromDate : "+fromDate);
        console.log("toDate : "+toDate);
        if(this.role=="2")
        {
         stateCode=String(this.state_code);
        }
        if(this.role=="3")
        {
         stateCode=String(this.state_code);
         districtCode=String(this.district_code);
        }
        if(this.role=="4")
        {
          agencyCode=this.agency_code;        
        }
        
        this.GetPMJReports(stateCode,districtCode,agencyCode,schemeCode,fromDate,toDate,type,this.role);
     }
     
     if(type=="LH")
     {      
      
        stateCode=String($('#ddlstate_login').val());
        console.log("stateCode : "+stateCode);
        districtCode=String($('#ddldistrict_login').val());
        agencyCode=String($('#ddlagency_login').val());
        //schemeCode=String($('#ddlscheme_download').val());
        fromDate=String($('#txtfromdate_login').val());
        //toDate=String($('#txttodate_download').val());
        if(this.role=="2")
        {
         stateCode=String(this.state_code);
        }
        if(this.role=="3")
        {
         stateCode=String(this.state_code);
         districtCode=String(this.district_code);
        }
        if(this.role=="4")
        {
          agencyCode=String(this.agency_code);        
        }
        
        this.GetLoginHistory(stateCode,districtCode,agencyCode,"",fromDate,"");
     }

   }

   GetPMJReports(state_code:any,district_code:any,agency_code:any,scheme_code:any,from_date:any,to_date:any,type:any,role:any)
   {
    
    let overlay_search= <HTMLScriptElement>document.getElementById('overlay_search');
    overlay_search.style.display="flex";

      let datatablecreated1= <HTMLScriptElement>document.getElementById('datatablecreated1');
      let datatablecreated2= <HTMLScriptElement>document.getElementById('datatablecreated2');
      let datatablecreated3= <HTMLScriptElement>document.getElementById('datatablecreated3');
      let datatablecreated4= <HTMLScriptElement>document.getElementById('datatablecreated4');
    if(role=="1")
    {
      datatablecreated2.className="rownotvisible";
      datatablecreated3.className="rownotvisible";
      datatablecreated4.className="rownotvisible";
    }
    if(role=="2")
    {
      this.getDistrict(String(this.state_code),"C");
      datatablecreated1.className="rownotvisible";
      datatablecreated3.className="rownotvisible";
      datatablecreated4.className="rownotvisible";
    }
    if(role=="3")
    {
      datatablecreated1.className="rownotvisible";
      datatablecreated2.className="rownotvisible";
      datatablecreated4.className="rownotvisible";
    }
    if(role=="4")
    {
      datatablecreated2.className="rownotvisible";
      datatablecreated3.className="rownotvisible";
      datatablecreated1.className="rownotvisible";
    }

    this.pmjreportreq.state_code=state_code;
    this.pmjreportreq.district_code=district_code;
    this.pmjreportreq.agency_code=agency_code; 
    this.pmjreportreq.scheme_code=scheme_code;    
    this.pmjreportreq.from_date=from_date; 
    this.pmjreportreq.to_date=to_date; 
    this.pmjreportreq.type=type; 
    this.pmjreportreq.role=role; 
    this.apiService.GetPMJReports(this.pmjreportreq).subscribe((response) => { 
     
      overlay_search.style.display="none";
        if(response.status=="true")
    {
     
      this.totalArr=[];
      this.total="0";
      this.total_approved="0";
      this.total_reject="0";
      this.delivery_count="0";
      this.totalArr=response.list;
      var total=0;
      var totalApp=0;
      var totalRej=0;
      var totalDel=0;
      for(var i in this.totalArr)
            {
              total+=Number(this.totalArr[i]['total']);
              totalApp+=Number(this.totalArr[i]['total_aaproved']);
              totalRej+=Number(this.totalArr[i]['total_reject']);
              totalDel+=Number(this.totalArr[i]['delivery_count'])
              
            } 
      this.total=total;
      this.total_approved=totalApp;
      this.total_reject=totalRej; 
      this.delivery_count=totalDel;

      if(type=="CA")
      {
        if(role=="1")
      {       
        this.datatablecreated=response.list
      $('#datatablecreated1').DataTable().clear().destroy();
      setTimeout(()=>{  
        
//$("#datatableexample").empty();                        
        $('#datatablecreated1').DataTable( {
          //destroy:true, 
          pagingType: 'full_numbers',
          
          searching:false,
          paging:false,
          processing: false,                            
          
        
      }).columns( [1,2] ).visible(false);
      }, 1);

    }
      }
      if(type=="C")
      {
       
      this.datatablecreated=response.list
     
      if(role=="1")
      {       
        
      $('#datatablecreated1').DataTable().clear().destroy();
      setTimeout(()=>{  
        
//$("#datatableexample").empty();                        
        $('#datatablecreated1').DataTable( {
          //destroy:true, 
          pagingType: 'full_numbers',
          pageLength: 50,
          searching:true,
          paging:true,
          processing: true,                            
          lengthMenu : [10, 25,50],          
        
      });
      }, 1);

      //const table = $('#datatablecreated1').DataTable();
      //const column = table.column( 2 ); 
      //column.visible( ! column.visible() ); 

    }
    if(role=="2")
    {
      //datatablecreated1.className="rownotvisible";
      //datatablecreated3.className="rownotvisible";
      //datatablecreated4.className="rownotvisible";
    $('#datatablecreated2').DataTable().clear().destroy();
    setTimeout(()=>{  
      
//$("#datatableexample").empty();                        
      $('#datatablecreated2').DataTable( {
        //destroy:true, 
        pagingType: 'full_numbers',
        pageLength: 50,
        searching:true,
        paging:true,
        processing: true,                    
        lengthMenu : [10, 25,50],          
      
    });
    }, 1);
  }
  if(role=="3")
    {
      //datatablecreated1.className="rownotvisible";
      //datatablecreated2.className="rownotvisible";
      //datatablecreated4.className="rownotvisible";
    $('#datatablecreated3').DataTable().clear().destroy();
    setTimeout(()=>{  
      
//$("#datatableexample").empty();                        
      $('#datatablecreated3').DataTable( {
        //destroy:true, 
        pagingType: 'full_numbers',
        pageLength: 50,
        searching:true,
        paging:true,
        processing: true,                    
        lengthMenu : [10, 25,50],          
      
    });
    }, 1);
  } 
  if(role=="4")
    {
      //datatablecreated1.className="rownotvisible";
      //datatablecreated2.className="rownotvisible";
      //datatablecreated3.className="rownotvisible";
    $('#datatablecreated4').DataTable().clear().destroy();
    setTimeout(()=>{  
      
//$("#datatableexample").empty();                        
      $('#datatablecreated4').DataTable( {
        //destroy:true, 
        pagingType: 'full_numbers',
        pageLength: 50,
        searching:true,
        paging:true,
        processing: true,                    
        lengthMenu : [10, 25,50],          
      
    });
    }, 1);
  }
    }     
    
    }
    });
    if(type=="BCD")
    {
      //this.GenBenCardDetails("","")
    }
   }
   checkCheckBoxvalue(event:any){
        var stateCode="";
        var districtCode="";
        var agencyCode="";
        var schemeCode="";
        var fromDate="";
        var toDate="";   
     
        stateCode=String($('#ddlstate_create').val());
        districtCode=String($('#ddldistrict_create').val());
        agencyCode=String($('#ddlagency_create').val());
        schemeCode=String($('#ddlscheme_create').val());
        fromDate=String($('#txtfromdate_create1').val());
        toDate=String($('#txttodate_create1').val());
        let trNotAgency= <HTMLScriptElement>document.getElementById('trNotAgency');
        let trAgency= <HTMLScriptElement>document.getElementById('trAgency');
     if(event.target.checked==true)
     {
      this.colspan=2;
      this.isAgency=true;
      this.GetPMJReports(stateCode,districtCode,agencyCode,schemeCode,fromDate,toDate,"CA",this.role);
     }
     else
     {
      this.isAgency=false;
      this.colspan=4;
      this.GetPMJReports(stateCode,districtCode,agencyCode,schemeCode,fromDate,toDate,"C",this.role);
     }

    
  }

   GetLoginHistory(state_code:any,district_code:any,agency_code:any,scheme_code:any,from_date:any,to_date:any)
   {
    let overlay_search= <HTMLScriptElement>document.getElementById('overlay_search');
    overlay_search.style.display="flex";
    if(state_code=='undefined')
    state_code="";
    if(district_code=='undefined')
    district_code="";
    if(agency_code=='undefined')
    agency_code="";
    if(scheme_code=='undefined')
    scheme_code="";

    if(from_date=='undefined')
    from_date="";
    if(to_date=='undefined')
    to_date="";
    
    this.pmjreportreq.state_code=state_code;
    this.pmjreportreq.district_code=district_code;
    this.pmjreportreq.agency_code=agency_code; 
    this.pmjreportreq.scheme_code=scheme_code;    
    this.pmjreportreq.from_date=from_date; 
    this.pmjreportreq.to_date=to_date; 
    this.pmjreportreq.type=""; 
    this.apiService.GetLoginHistory(this.pmjreportreq).subscribe((response) => { 
      overlay_search.style.display="none";
        if(response.status=="true")
    {
      this.loginhistoryArr=[];
      this.loginhistoryArr=response.list;
      this.loginhistory=response.list;
     
      
      $('#loginhistory').DataTable().clear().destroy();
      setTimeout(()=>{  
        
//$("#datatableexample").empty();                        
        $('#loginhistory').DataTable( {
          //destroy:true, 
          pagingType: 'full_numbers',
          pageLength: 10,
          searching:true,
          paging:true,
          processing: true,                    
          lengthMenu : [10, 25,50],          
        
      });
      }, 1);
   
    }
    });
   }

   getDistrict(state_code:any,type:any)
{
  
  this.pmjReq.type=this.encrdecrdervice.encrypted('DM');  
  if(state_code!="")
  this.pmjReq.state_code=this.encrdecrdervice.encrypted(state_code);
  this.pmjReq.district_code="";
  this.pmjReq.rpttype="";     
 this.apiService.GetStateDist(this.pmjReq).subscribe((response) => { 
    
     if(response['status']=="true")
  {
    if(type=='C')
      this.DistrictList_Create=response['list'];
    else
      this.DistrictList_Create=null;
    if(type=='LH')
      this.DistrictList_Download=response['list'];
    else
      this.DistrictList_Download=null;
  }
  else
  {
    this.DistrictList_Create=null;
    this.DistrictList_Download=null;
    
  }
 });

}

getAgency()
{
  
  this.pmjReq.type=this.encrdecrdervice.encrypted('AGM');  
  this.pmjReq.state_code="";
  this.pmjReq.district_code="";
  this.pmjReq.rpttype="";     
 this.apiService.GetStateDist(this.pmjReq).subscribe((response) => { 
              
     if(response['status']=="true")
  {
     this.agencyList =response['list'];
     this.agencyList_L =response['list'];
  }
  else
  {
    this.agencyList=null;
  }
 });

}

exportexcel(type:any,filename:any)
   {
     if(type=="CSR")
     {
        var data=this.CreateTableToExport(this.totalArr);    
        this.exportExcel(data,filename);
     }

     if(type=="LH")
     {
        var data=this.CreateTableToExportLH(this.loginhistoryArr);    
        this.exportExcel(data,filename);
     }
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

  CreateTableToExport(data:any)
  {
    var j=0;
    let tble="<table border='1'>"; 
    if(this.role=="1")
    {
      if(this.isAgency==false)
      {
        tble+="<tr><td>S.No.</td><td>State Name</td><td>District Name</td><td>Agency Name</td><td>Total</td><td>Total Approved</td> <td>Total Reject</td><td>Total Delivered</td></tr>";
        for(var i in data)
        {
          tble+="<tr><td>"+Number(i)+1+"</td><td>"+data[i]['state_name']+"</td><td>"+data[i]['district_name']+"</td><td>"+data[i]['agency_name']+"</td><td>"+data[i]['total']+"</td><td>"+data[i]['total_aaproved']+"</td><td>"+data[i]['total_reject']+"</td><td>"+data[i]['delivery_count']+"</td></tr>";
        }
        tble+="<tr><td colspan='4'>Total</td><td>"+this.total+"</td><td>"+this.total_approved+"</td> <td>"+this.total_reject+"</td><td>"+this.delivery_count+"</td></tr>";
      }
      if(this.isAgency==true)
      {
        tble+="<tr><td>S.No.</td><td>Agency Name</td><td>Total</td><td>Total Approved</td> <td>Total Reject</td><td>Total Delivered</td></tr>";
        for(var i in data)
        {
          tble+="<tr><td>"+Number(i)+1+"</td><td>"+data[i]['agency_name']+"</td><td>"+data[i]['total']+"</td><td>"+data[i]['total_aaproved']+"</td><td>"+data[i]['total_reject']+"</td><td>"+data[i]['delivery_count']+"</td></tr>";
        }
        tble+="<tr><td colspan='2'>Total</td><td>"+this.total+"</td><td>"+this.total_approved+"</td> <td>"+this.total_reject+"</td><td>"+this.delivery_count+"</td></tr>";
      }
    }
    if(this.role=="2")
    {
      tble+="<tr><td>S.No.</td><td>District Name</td><td>Agency Name</td><td>Total</td><td>Total Approved</td> <td>Total Reject</td><td>Total Delivered</td></tr>";
        for(var i in data)
        {
          tble+="<tr><td>"+Number(i)+1+"</td><td>"+data[i]['district_name']+"</td><td>"+data[i]['agency_name']+"</td><td>"+data[i]['total']+"</td><td>"+data[i]['total_aaproved']+"</td><td>"+data[i]['total_reject']+"</td><td>"+data[i]['delivery_count']+"</td></tr>";
        }
        tble+="<tr><td colspan='3'>Total</td><td>"+this.total+"</td><td>"+this.total_approved+"</td> <td>"+this.total_reject+"</td><td>"+this.delivery_count+"</td></tr>";
    }
    if(this.role=="3")
    {
      tble+="<tr><td>S.No.</td><td>Agency Name</td><td>Total</td><td>Total Approved</td> <td>Total Reject</td><td>Total Delivered</td></tr>";
        for(var i in data)
        {
          tble+="<tr><td>"+Number(i)+1+"</td><td>"+data[i]['agency_name']+"</td><td>"+data[i]['total']+"</td><td>"+data[i]['total_aaproved']+"</td><td>"+data[i]['total_reject']+"</td><td>"+data[i]['delivery_count']+"</td></tr>";
        }
        tble+="<tr><td colspan='2'>Total</td><td>"+this.total+"</td><td>"+this.total_approved+"</td> <td>"+this.total_reject+"</td><td>"+this.delivery_count+"</td></tr>";
    }
    if(this.role=="4")
    {
      tble+="<tr><td>S.No.</td><td>State Name</td><td>State Name</td><td>Name</td><td>Total</td><td>Total Approved</td> <td>Total Reject</td><td>Total Delivered</td></tr>";
        for(var i in data)
        {
          tble+="<tr><td>"+Number(i)+1+"</td><td>"+data[i]['state_name']+"</td><td>"+data[i]['created_by']+"</td><td>"+data[i]['name']+"</td><td>"+data[i]['total']+"</td><td>"+data[i]['total_aaproved']+"</td><td>"+data[i]['total_reject']+"</td><td>"+data[i]['delivery_count']+"</td></tr>";
        }
        tble+="<tr><td colspan='4'>Total</td><td>"+this.total+"</td><td>"+this.total_approved+"</td> <td>"+this.total_reject+"</td><td>"+this.delivery_count+"</td></tr>";
    }
    tble+="</table>";
    return tble;
  }

  CreateTableToExportLH(data:any)
  {
    //var j=0;
    let tble="<table border='1'>";     
        tble+="<tr><td>S.No.</td><td>State Name</td><td>Agency Name</td><td>User ID</td><td>Name</td> <td>Login Date</td></tr>";
        for(var i in data)
        {
          var j=Number(i)+1;
          tble+="<tr><td>"+j+"</td><td>"+data[i]['state_name']+"</td><td>"+data[i]['agency_name']+"</td><td>"+data[i]['userid']+"</td><td>"+data[i]['name']+"</td><td>"+data[i]['logindate']+"</td></tr>";
        }      
      
    tble+="</table>";
    return tble;
  }

  getReport_CL(type:any)
   {
     
     this.GetStateMaster();
     if(type=="LH")
     {
      this.getAgency();
      $('#ddlstate_login').val('');
      $('#ddldistrict_login').val('');
      $('#ddlagency_login').val('');
      $('#txtfromdate_login').val('');
      if(this.role=="1")
       {
         this.GetLoginHistory("","","","","","",);
       }
       if(this.role=="2")
       {
         this.GetLoginHistory(this.state_code,"","","","","");
       }
       if(this.role=="3")
       {
         this.GetLoginHistory(this.state_code,this.district_code,"","","","");
       }
       if(this.role=="4")
       {
         this.GetLoginHistory("","",this.agency_code,"","","");
       }
     }
     if(type=="C")
     {
      $('#ddlstate_login').val('');
      $('#ddldistrict_login').val('');
      $('#ddlagency_login').val('');
      $('#txtfromdate_login').val('');
       if(this.role=="1")
       {
         this.GetPMJReports("","","","","","",type,this.role);
       }
       if(this.role=="2")
       {
         this.GetPMJReports(this.state_code,"","","","","",type,this.role);
       }
       if(this.role=="3")
       {
         this.GetPMJReports(this.state_code,this.district_code,"","","","",type,this.role);
       }
       if(this.role=="4")
       {
         this.GetPMJReports("","",this.agency_code,"",this.txtfromdate_create1,"",type,this.role);
       }
     }
        
   }
   GetUploadDate()
   {
    this.apiService.GetDriveInsightsUploadDate().subscribe((response) => {
     
        if(response['status']=="true")
    {
      this.uploadDate=response['date'];
    }
  });
   }

   getReport_SDBV(type:any)
   {
    if(type=="D")
    {
      this.getBIS_Block("28",this.ddldistrict_sdbv);

      //if(this.ddldistrict_sdbv=="")
      this.ddlblock_sdbv="";
      
      this.getBIS_Village("28",this.ddldistrict_sdbv, this.ddlblock_sdbv);
      //if(this.ddlblock_sdbv=="")
      this.ddlecretariat_sdbv="";
    }

    if(type=="B")
    {      
      this.getBIS_Village("28",this.ddldistrict_sdbv, this.ddlblock_sdbv);
      //if(this.ddlblock_sdbv=="")
      this.ddlecretariat_sdbv="";
    }
    
    this.getBIS_SDBV();
   }
   getBIS_District(state_code:any,type:any)
   {
     
    this.apiService.GetBISStateDist({
      "type":this.encrdecrdervice.encrypted('BISDM'),
      "state_code":this.encrdecrdervice.encrypted(state_code) || "",
      "district_code":"",
      "block_code":""
    }).subscribe((resp: any)=>{

     if(resp.status=="true")
     {
      this.BIS_District_List=resp.list;
    }

    })

     
   
   }

   getBIS_Block(state_code:any,district_code:any)
   {
     
    this.apiService.GetBISStateDist({
      "type":this.encrdecrdervice.encrypted('BISBM'),
      "state_code":this.encrdecrdervice.encrypted(state_code) || "",
      "district_code":this.encrdecrdervice.encrypted(district_code),
      "block_code":""
    }).subscribe((resp: any)=>{

     if(resp.status=="true")
     {
      this.BIS_Block_List=resp.list;
    }

    })

     
   
   }

   getBIS_Village(state_code:any,district_code:any,block_code:any)
   {
     
    this.apiService.GetBISStateDist({
      "type":this.encrdecrdervice.encrypted('BISVM'),
      "state_code":this.encrdecrdervice.encrypted(state_code) || "",
      "district_code":this.encrdecrdervice.encrypted(district_code),
      "block_code":this.encrdecrdervice.encrypted(block_code)
    }).subscribe((resp: any)=>{
      console.log("state_code : "+state_code);
      console.log("district_code : "+district_code);
      console.log("block_code : "+block_code);
      console.log(resp);
     if(resp.status=="true")
     {
      this.BIS_Secretariat_List=resp.list;
    }

    })

     
   
   }

   getBIS_SDBV() {
    
    if(this.ddldistrict_sdbv=="" && this.ddlblock_sdbv=="" && this.ddlecretariat_sdbv=="")
          this.sdbv_text="Distric Name";
    if(this.ddldistrict_sdbv!="" && this.ddlblock_sdbv=="" && this.ddlecretariat_sdbv=="")
          this.sdbv_text="Block Name";
    if(this.ddldistrict_sdbv!="" && this.ddlblock_sdbv!="" && this.ddlecretariat_sdbv=="")
          this.sdbv_text="Secretariat Name";
    if(this.ddldistrict_sdbv!="" && this.ddlblock_sdbv!="" && this.ddlecretariat_sdbv=="")
          this.sdbv_text="Secretariat Name";
    if(this.ddldistrict_sdbv!="" && this.ddlblock_sdbv!="" && this.ddlecretariat_sdbv!="")
          this.sdbv_text="Operator Name";

    this.apiService.GetBIS_SDBV({
      "type":"",
      "state_code":"28" || "",
      "district_code":this.ddldistrict_sdbv||"",
      "block_code":this.ddlblock_sdbv||"",
      "village_code":this.ddlecretariat_sdbv||"",
      "fromdate":this.fromDate_SDBV || ""
    }).subscribe((resp: any)=>{

     
      this.pageData.bis_SDBV_List = resp.data;  
    
      if(resp.data.length) {
        const keys = Object.keys(resp.data[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.data.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.bis_SDBV_List = [totalData]
      } else {
        this.totalData.bis_SDBV_List = []
      }
      
      
    })
  }
}
