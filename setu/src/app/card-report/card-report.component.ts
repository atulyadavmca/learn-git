import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartResp } from '../model/chart-resp';
import { PmjReportReq } from '../model/pmj-report-req';
import { Pmjreq } from '../model/pmjreq';
import { ApiserviceService } from '../service/apiservice.service';
import { Chart,registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { StnameReq } from '../model/stname-req';
import { BenCardDetailsReq } from '../model/ben-card-details-req';
import { EncrDecrService } from '../model/encr-decr-service';
import { Column } from 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
Chart.register(...registerables);
Chart.register(ChartDataLabels);
@Component({
  selector: 'app-card-report',
  templateUrl: './card-report.component.html',
  styleUrls: ['./card-report.component.css']
})
export class CardReportComponent implements OnInit {

  pmjReq:Pmjreq;
  DistrictList_Create:any;
  DistrictList_Download:any;
  DistrictList_Delivery:any;
  stateList:any;
  agencyList:any;
  pmjreportreq:PmjReportReq;
  datatablecreated:any;
  datatabledownload:any;
  datatabledeliver:any;
  ngDropdown:any;
  Disabledddlstate_create:boolean=false;
  Disabledddldistrict_create:boolean=false;
  Disabledddlagency_create:boolean=false;

  PMJOverall:any;
  PMJLast30Days:any;
  PMJToday:any

  NONPMJOverall:any;
  NONPMJLast30Days:any;
  NONPMJToday:any
  stateDist:any;
  chResp:ChartResp;

  PMJTextArr:any;
PMJValueArr:any;
txtArr:any;
jsonDataPMJ:any;
PMJbars:any;

NONPMJTextArr:any;
NONPMJValueArr:any;

jsonDataNONPMJ:any;
NONPMJbars:any;
PMJChartElement: any;
NONPMJChartElement: any;
statename:StnameReq;
PMJState_District:any
NONPMJState_District:any
state_name:any;
PMJTDBars:any;

PMJDTcolor:any;  
PMJDTTextArr:any;
PMJDTValueArr:any;
PMJDTtxtArr:any;
jsonDataPMJTD:any;
NONPMJDTValueArr:any;
state:any;

TAGState_District:any;
  TAGTextArr:any;
  
  TAGbars:any;
  TAGChartElement:any;
  tag1:any;
  tag2:any;
  tag3:any;
  tag4:any;
  tag5:any;
  code:any;
  TAGArr:any;
  jsonDataTAG:any;


  FCSState_District:any;
  FCSTextArr:any;
  
  FCSbars:any;
  FCSChartElement:any;
  card_created:any;
  card_pending:any;
  
  FCSArr:any;
  jsonDataFCS:any;

  ddlstate: any;
  ddlstatelogin:any;
  ddldistrict: any;
  ddlagency: any;
  ddllagency: any;
  loginhistory:any;
  loginhistoryArr:any;
  bencarddetails:any;
  bencarddetailsReq:BenCardDetailsReq;
  rowstate:any;
  rowdistrict:any;
  rowagency:any;
  rowcscheme:any;
  rowcreatedby:any;
  rowname:any;
  rowcreateddate:any;
  rowtotal:any;
  rowtotalaaproved:any;
  rowtotalreject:any;
  schemeclass:any;
  role:any;
  encrdecrdervice:EncrDecrService;
  encdecKey:any;
  userid:any;
  state_code:any;
  district_code:any;
  agency_code:any;
  total:any;
  total_approved:any;
  total_reject:any;
  totalArr:any;
  colspan:any;
  isAgency:boolean=false;
  @ViewChild('myselect') myselect:any;
  @ViewChild('NONPMJChart') NONPMJChart:any;
  @ViewChild('PMJChart') PMJChart:any;
  @ViewChild('PMJTDChart') PMJTDChart:any;
  @ViewChild('TAGChart') TAGChart:any;
  @ViewChild('FCSChart') FCSChart:any;
  
  constructor(public apiService: ApiserviceService,
    public router: Router) {
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
    if(this.userid!="" && this.role=="")
      this.router.navigate(['login']);    
      

      this.pmjReq=new Pmjreq();
      this.pmjreportreq=new PmjReportReq();
      this.chResp=new ChartResp();
      this.statename=new StnameReq();
      this.PMJState_District="S";
      this.NONPMJState_District="S";
      this.state="";
      this.state_name=""; 
      this.TAGState_District="S";
      this.FCSState_District="S";
      this.ddlstate=this.state_code;
      this.ddlstatelogin=this.state_code;
      this.ddldistrict=this.district_code;
      this.ddlagency=this.agency_code;
      this.ddllagency=this.agency_code;
      
      this.bencarddetailsReq=new BenCardDetailsReq();

      
   }
   fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
   fileExtension = '.xlsx';
  ngOnInit(): void {
    this.GetStateMaster();
    this.getAgency();

    let bisreport= <HTMLScriptElement>document.getElementById('tabs-BIS-tab');
    let bcdreport= <HTMLScriptElement>document.getElementById('tabs-ben-tab');
    let ccsreport= <HTMLScriptElement>document.getElementById('tabs-create-tab');
    
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
       
        /*
        ccsreport.className="nav-link active";
        bisreport.style.display='none';
        bcdreport.style.display='none';
        tabsBIS.style.display='none';
        tabscreate.className="tab-pane fade show active";
        insight.style.display='none';*/
      }
    if(this.role=="1")
    {
      this.colspan=4;
      this.isAgency=false;
      datatablecreated2.className="rownotvisible";
      datatablecreated3.className="rownotvisible";
      datatablecreated4.className="rownotvisible";
      this.GetPMJReports("","","","","","","C",this.role);
    }
    else if (this.role=="2")
    {
      this.colspan=3;
      datatablecreated1.className="rownotvisible";
      datatablecreated3.className="rownotvisible";
      datatablecreated4.className="rownotvisible";
      
      this.Disabledddlstate_create=true;      
     
      this.getDistrict(String(this.state_code),"LH");
      this.GetPMJReports(this.state_code,"","","","","","C",this.role);
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
      this.GetPMJReports(this.state_code,this.district_code,"","","","","C",this.role);
      
    }
    else if (this.role=="4")
    {     
      this.colspan=4;
      datatablecreated2.className="rownotvisible";
      datatablecreated3.className="rownotvisible";
      datatablecreated1.className="rownotvisible"; 
      
      this.Disabledddlagency_create=true;
    this.GetPMJReports("","",this.agency_code,"","","","C",this.role);
    }
     // this.GetPMJReports1("","","",localStorage.getItem('agency_code'),"","","C");


     this.GetTopHeadData("","")
     this.GetPMJBISStatewise("PMJBIS","","","");
     this.GetNONPMJBISStatewise("NONPMJBIS","","","");
     this.GetPMJTD("BICCTD","T","","");
     this.GetTAGData("TAGD","","","");
     this.GetFCS("","","","");
  }
  pmjayinsight()
  {
  
    if(this.role==this.role)
       this.router.navigate(['/pmjay']); 
    else
      this.router.navigate(['login']);
  }
  bisReport()
  {
    if(this.role==this.role)
       this.router.navigate(['/bisdashboard']); 
    else
       this.router.navigate(['login']);
  }

  clickme(type:any){

    this.PMJTDBars.destroy();
    if(this.state==undefined)
    {
      this.state='';
    }
    this.GetPMJTD('BICCTD',type,this.state,"");
    let elementT = <HTMLScriptElement>document.getElementById('BICCTDT');
    let elementA = <HTMLScriptElement>document.getElementById('BICCTDA');
    
   
    if(type=='T')
    {      
       
        elementT.className = 'active';
        elementA.className = '';
    }
    if(type=='A')
    {     
       
        elementT.className = '';
        elementA.className = 'active';
    }

  }

  GetPMJTD(type:any,rpttype:any,state_code:any,district_code:any)
   {       
    this.pmjReq.type=type;  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;    
    this.apiService.GetPMJTrend(this.pmjReq).subscribe((response) => {             
      this.chResp=response;  
               
      if(this.chResp.status=="true")
      {
        
       this.PMJDTcolor=[];
       
        this.PMJDTTextArr = [];
        this.PMJDTValueArr = [];
        this.NONPMJDTValueArr = [];
        this.PMJDTtxtArr = [];
        this.PMJDTTextArr=this.chResp.list;
        this.jsonDataPMJTD=this.chResp.list;
            
            for(var i in this.PMJDTTextArr)
            {
              this.PMJDTtxtArr.push(this.PMJDTTextArr[i]['text']);
              this.PMJDTValueArr.push(this.PMJDTTextArr[i]['pmj_count']);
              this.NONPMJDTValueArr.push(this.PMJDTTextArr[i]['non_pmj_count']);
             
            } 
            
      this.PMJTDBars = new Chart(this.PMJTDChart.nativeElement, {
        type: 'line',        
        data: {
          labels: this.PMJDTtxtArr,
          datasets: [{  
            label:'PMJAY - Trends'  ,        
            data: this.PMJDTValueArr,
            backgroundColor: 'rgba(247, 217, 176,.4)',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgba(247, 217, 176,.4)',// array should have same number of elements as number of dataset
            borderWidth: 1.5,
            fill:true,
            pointRadius:2,
            pointBorderColor:'#EBA425',
            //backgroundColor:gradient,
          },{  
            label:'NON PMJAY - Trends'  ,        
            data: this.NONPMJDTValueArr,
            backgroundColor: 'rgba(188, 215, 247,.7)',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgba(188, 215, 247,.7)',// array should have same number of elements as number of dataset
            borderWidth: 1.5,
            fill:true,
            pointRadius:2,
            pointBorderColor:'#5da1f0',
            //backgroundColor:gradient,
          }]
        },
        options: {
          plugins:{
            legend:{display: false}
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
  GetPMJBISStatewise(type:any,rpttype:any,state_code:any,district_code:any)
   {

    this.pmjReq.type=type;  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;    
    
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => { 
          this.chResp=response; 
          
        if(this.chResp.status=="true")
    {
      
     
      this.PMJTextArr = [];
      this.PMJValueArr = [];
      this.txtArr = [];
      
      this.jsonDataPMJ=[];
        
        this.txtArr=this.chResp.list;
        this.jsonDataPMJ = this.chResp.list;
          for(var i in this.txtArr)
          {
            this.PMJTextArr.push(this.txtArr[i]['text']);
            this.PMJValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));           
          }
        
          this.PMJChartElement = this.PMJChart.nativeElement;
          var px=(this.PMJValueArr.length*16)+"px";
          this.PMJChartElement.style.height=px;

          const gradient = this.PMJChart.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 600);
          gradient.addColorStop(0, 'rgba(138,153,216,1)');
          gradient.addColorStop(.3, 'rgba(150,186,235,.8)');
          gradient.addColorStop(.6, 'rgba(158,208,247,.06)');
          gradient.addColorStop(.9, 'rgba(179,224,252,.04)');
          gradient.addColorStop(1, 'rgba(255,255,255,.001)');
          this.PMJbars = new Chart(this.PMJChart.nativeElement, { type: 'bar',        
          data: {labels:this.PMJTextArr,datasets:[]}});
          this.PMJbars.destroy();

          
      this.PMJbars = new Chart(this.PMJChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.PMJTextArr,
          datasets: [{  
            label:'PMJAY Cards Created'  ,        
            data: this.PMJValueArr,
            //backgroundColor:'#FAECCB', // array should have same number of elements as number of dataset  
            backgroundColor:'#f5c480',          
            barThickness:9,            
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
           
          }]
        },
        options: {      
          plugins:{
            legend:{display: false}
            ,datalabels: {
              display: false,
              align: 'end', 
              color:'red'             
            },
            tooltip: {
              displayColors:false,
              enabled:true,
              yAlign: 'top',
              
              callbacks: {
                title: function(context){
                  return "";
                },
                  label: function(context) {
                    
                      let label = context.dataset.label || '';
                      
                      return context.parsed.x+"L";
                  }
              }
          }
          },          
          indexAxis: 'y', scales:{x:{grid:{display:false,drawBorder:false},position:'top',ticks:{         
            autoSkip: false,font:{size:11,family:'Roboto'},color:'#989898'
        }},y:{grid:{display:false,drawBorder:false},ticks:{         
            autoSkip: false,font:{size:11,family:'Roboto'},color:'#989898'
           //crossAlign: "far",
        }}},         
          elements: {
            line: {
              borderWidth: 0,                        
            }
          },
          onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.PMJTextArr[index];   
            this.apiService.GetStateCode(this.statename).subscribe((response) => { 
             if(response['status']=="true")
              {
                if(this.PMJState_District=="S")
                {
                  this.PMJbars.destroy();
                  this.GetPMJBISStatewise("PMJBIS","",response['state_code'],"");
                  this.PMJState_District="D";                  
                }
                else
                {
                  this.PMJbars.destroy();
                  this.GetPMJBISStatewise("PMJBIS","",this.state,"");
                  this.PMJState_District="S";
                }
              }
              else
              {                
               this.PMJbars.destroy();
               this.GetPMJBISStatewise("PMJBIS","",this.state,"");
               this.PMJState_District="S";
              }
              
            });            
            
  
          }//,scales:{x:{grid:{display:false}},y:{grid:{display:false}}}
          
        }
        
      });


    }
    });
   }

   GetNONPMJBISStatewise(type:any,rpttype:any,state_code:any,district_code:any)
   {

    this.pmjReq.type=type;  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;    
    
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => { 
          this.chResp=response; 
         
        if(this.chResp.status=="true")
    {
      
     
      this.NONPMJTextArr = [];
      this.NONPMJValueArr = [];
      this.txtArr = [];
      
      this.jsonDataNONPMJ=[];
        
        this.txtArr=this.chResp.list;
        this.jsonDataNONPMJ = this.chResp.list;
          for(var i in this.txtArr)
          {
            this.NONPMJTextArr.push(this.txtArr[i]['text']);
            this.NONPMJValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));           
          }
        
          this.NONPMJChartElement = this.NONPMJChart.nativeElement;
          var px=(this.NONPMJValueArr.length*16)+"px";
          this.NONPMJChartElement.style.height=px;

          const gradient = this.NONPMJChart.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 600);
          gradient.addColorStop(0, 'rgba(138,153,216,1)');
          gradient.addColorStop(.3, 'rgba(150,186,235,.8)');
          gradient.addColorStop(.6, 'rgba(158,208,247,.06)');
          gradient.addColorStop(.9, 'rgba(179,224,252,.04)');
          gradient.addColorStop(1, 'rgba(255,255,255,.001)');
          this.NONPMJbars = new Chart(this.NONPMJChart.nativeElement, { type: 'bar',        
          data: {labels:this.NONPMJTextArr,datasets:[]}});
          this.NONPMJbars.destroy();

          
      this.NONPMJbars = new Chart(this.NONPMJChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.NONPMJTextArr,
          datasets: [{  
            label:'NON PMJAY Cards Created'  ,        
            data: this.NONPMJValueArr,
            //backgroundColor:'#FAECCB', // array should have same number of elements as number of dataset  
            backgroundColor:'#7eb2ef',          
            barThickness:9,            
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
           
          }]
        },
        options: {      
          plugins:{
            legend:{display: false}
            ,datalabels: {
              display: false,
              align: 'end', 
              color:'red'             
            },
            tooltip: {
              displayColors:false,
              enabled:true,
              yAlign: 'top',
              
              callbacks: {
                title: function(context){
                  return "";
                },
                  label: function(context) {
                    
                      let label = context.dataset.label || '';
                      
                      return context.parsed.x+"L";
                  }
              }
          }
          },          
          indexAxis: 'y', scales:{x:{grid:{display:false,drawBorder:false},position:'top',ticks:{         
            autoSkip: false,font:{size:11,family:'Roboto'},color:'#989898'
        }},y:{grid:{display:false,drawBorder:false},ticks:{         
            autoSkip: false,font:{size:11,family:'Roboto'},color:'#989898'
           //crossAlign: "far",
        }}},         
          elements: {
            line: {
              borderWidth: 0,                        
            }
          },
          onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.NONPMJTextArr[index];   
            this.apiService.GetStateCode(this.statename).subscribe((response) => { 
             if(response['status']=="true")
              {
                if(this.NONPMJState_District=="S")
                {
                  this.NONPMJbars.destroy();
                  this.GetNONPMJBISStatewise("NONPMJBIS","",response['state_code'],"");
                  this.NONPMJState_District="D";                  
                }
                else
                {
                  this.NONPMJbars.destroy();
                  this.GetNONPMJBISStatewise("NONPMJBIS","",this.state,"");
                  this.NONPMJState_District="S";
                }
              }
              else
              {                
               this.NONPMJbars.destroy();
               this.GetNONPMJBISStatewise("NONPMJBIS","",this.state,"");
               this.NONPMJState_District="S";
              }
              
            });            
            
  
          }//,scales:{x:{grid:{display:false}},y:{grid:{display:false}}}
          
        }
        
      });


    }
    });
   }

  GetStateMaster()
  {
    this.pmjReq.type=this.encrdecrdervice.encrypted('SM');  
    this.pmjReq.state_code="";
    this.pmjReq.district_code="";
    this.pmjReq.rpttype="";     
   this.apiService.GetStateDist(this.pmjReq).subscribe((response) => { 
     
       if(response['status']=="true")
   {
     this.stateList=response['list'];
    
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
    if(type=='D')
      this.DistrictList_Download=response['list'];
    else
      this.DistrictList_Download=null;
    if(type=='DE')
      this.DistrictList_Delivery=response['list'];
    else
      this.DistrictList_Delivery=null;
    if(type=='LH')
      this.DistrictList_Download=response['list'];
    else
      this.DistrictList_Download=null;
  }
  else
  {
    this.DistrictList_Create=null;
    this.DistrictList_Download=null;
    this.DistrictList_Delivery=null;
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
  }
  else
  {
    this.agencyList=null;
  }
 });

}

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
        fromDate=String($('#txtfromdate_create').val());
        toDate=String($('#txttodate_create').val());
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
     if(type=="D")
     {

        stateCode=String($('#ddlstate_download').val());
        districtCode=String($('#ddldistrict_download').val());
        agencyCode=String($('#ddlagency_download').val());
        schemeCode=String($('#ddlscheme_download').val());
        fromDate=String($('#txtfromdate_download').val());
        toDate=String($('#txttodate_download').val());
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

     if(type=="DE")
     {

        stateCode=String($('#ddlstate_deliver').val());
        districtCode=String($('#ddldistrict_deliver').val());
        agencyCode=String($('#ddlagency_deliver').val());
        schemeCode=String($('#ddlscheme_deliver').val());
        fromDate=String($('#txtfromdate_deliver').val());
        toDate=String($('#txttodate_deliver').val());
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
   GenBenCardDetails(state_code:any,district_code:any)
   {
    this.bencarddetailsReq.state_code=state_code;
    //this.bencarddetailsReq.district_code=district_code;
    
    this.apiService.GetBenCardDetails(this.bencarddetailsReq).subscribe((response) => { 
        
        if(response.status=="true")
    {     
      this.bencarddetails=response.list;    
      
      $('#bencarddetails').DataTable().clear().destroy();
      setTimeout(()=>{  
        
//$("#datatableexample").empty();                        
        $('#bencarddetails').DataTable( {
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
   GetPMJReports(state_code:any,district_code:any,agency_code:any,scheme_code:any,from_date:any,to_date:any,type:any,role:any)
   {
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
      
        if(response.status=="true")
    {
      this.totalArr=[];
      this.total="0";
      this.total_approved="0";
      this.total_reject="0";
      this.totalArr=response.list;
      var total=0;
      var totalApp=0;
      var totalRej=0;
      for(var i in this.totalArr)
            {
              total+=Number(this.totalArr[i]['total']);
              totalApp+=Number(this.totalArr[i]['total_aaproved']);
              totalRej+=Number(this.totalArr[i]['total_reject']);
              
            } 
      this.total=total;
      this.total_approved=totalApp;
      this.total_reject=totalRej; 

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
          pageLength: 50,
          searching:true,
          paging:true,
          processing: true,                            
          lengthMenu : [10, 25,50],          
        
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
    if(type=="D")
    {
    this.datatabledownload=response.list
   
    $('#datatabledownload').DataTable().clear().destroy();
    setTimeout(()=>{  
      
//$("#datatableexample").empty();                        
      $('#datatabledownload').DataTable( {
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
  if(type=="DE")
    {
    this.datatabledeliver=response.list
   
    $('#datatabledeliver').DataTable().clear().destroy();
    setTimeout(()=>{  
      
//$("#datatableexample").empty();                        
      $('#datatabledeliver').DataTable( {
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
    }
    });
    if(type=="BCD")
    {
      this.GenBenCardDetails("","")
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
        fromDate=String($('#txtfromdate_create').val());
        toDate=String($('#txttodate_create').val());
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

    if(state_code=='undefined')
    state_code="";
    if(district_code=='undefined')
    district_code="";
    if(agency_code=='undefined')
    agency_code="";
    if(scheme_code=='undefined')
    scheme_code="";
    
    this.pmjreportreq.state_code=state_code;
    this.pmjreportreq.district_code=district_code;
    this.pmjreportreq.agency_code=agency_code; 
    this.pmjreportreq.scheme_code=scheme_code;    
    this.pmjreportreq.from_date=from_date; 
    this.pmjreportreq.to_date=to_date; 
    this.pmjreportreq.type=""; 

     
       
    this.apiService.GetLoginHistory(this.pmjreportreq).subscribe((response) => { 
      
      
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

   GetPMJReports1(state_code:any,district_code:any,agency_code:any,scheme_code:any,from_date:any,to_date:any,type:any)
   {

    
    this.pmjreportreq.state_code=state_code;
    this.pmjreportreq.district_code=district_code;
    this.pmjreportreq.agency_code=agency_code; 
    this.pmjreportreq.scheme_code=scheme_code;    
    this.pmjreportreq.from_date=from_date; 
    this.pmjreportreq.to_date=to_date; 
    this.pmjreportreq.type=type; 
    this.apiService.GetPMJReports(this.pmjreportreq).subscribe((response) => { 
       
        if(response.status=="true")
    {
      if(type=="C")
      {
      this.datatablecreated=response.list
     
      
      
        
//$("#datatableexample").empty();                        
        $('#datatablecreated').DataTable( {
          //destroy:true, 
          pagingType: 'full_numbers',
          pageLength: 10,
          searching:true,
          paging:true,
          processing: true,                    
          lengthMenu : [10, 25,50],          
        
      });
      
    }     
     
    }
    });
   }

   
   getReport(type:any)
   {
     
     this.GetStateMaster();
     if(type=="LH")
     {
      
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
         this.GetPMJReports("","",this.agency_code,"","","",type,this.role);
       }
      
        
   }

   getCommaValue(nStr:any)
{
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

  return num;  
}
   GetTopHeadData(state_code:any,district_code:any)
   {

    this.pmjReq.type='PMJBIS';  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetTopHeadData(this.pmjReq).subscribe((response) => {
      
    if(response['status']=="true")
    {
      
      this.PMJToday=this.getCommaValue(response['today']);
      this.PMJOverall=this.getCommaValue(response['overall']);   
      this.PMJLast30Days=this.getCommaValue(response['last30_days']);   
      //this.IToday=response['today'];
      //this.IOverall=response['overall']; 
      
    }
    });
    
    this.pmjReq.type='NONPMJBIS';  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetTopHeadData(this.pmjReq).subscribe((response) => {
      
    if(response['status']=="true")
    {      
      this.NONPMJToday=this.getCommaValue(response['today']);
      this.NONPMJOverall=this.getCommaValue(response['overall']);
      this.NONPMJLast30Days=this.getCommaValue(response['last30_days']);
      //this.HToday=response['today'];
      //this.HOverall=response['overall'];
    }
    });   
    
   }
   bindChart(event:any)
   { 
    var val=event.target.value;
    if(event.target.value!="")
    {
      for(var i in this.stateList)
            {
              if(this.stateList[i]['value']==val)
              this.state_name=this.stateList[i]['text']
            } 
       }
    else
    {this.state_name="";}
    if(val!="")
    {
    this.stateDist="District";
    }
    else
    {
      this.stateDist="State/UT";      
    }
    this.state=val;

    let BICCTDT= <HTMLScriptElement>document.getElementById('BICCTDT');
    let BICCTDA=<HTMLScriptElement>document.getElementById('BICCTDA');
    BICCTDT.className = 'active';

    BICCTDA.className = '';

    this.GetTopHeadData(val,"");

    this.PMJbars.destroy();
    this.GetPMJBISStatewise("PMJBIS","",val,"");
    this.NONPMJbars.destroy();
     this.GetNONPMJBISStatewise("NONPMJBIS","",val,"");
     this.PMJTDBars.destroy();
     this.GetPMJTD("BICCTD","T",val,"");
  }

  GetTAGData(type:any,rpttype:any,state_code:any,district_code:any)
   {

    this.pmjReq.type=type;  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;    
    
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => { 
          this.chResp=response; 
          
        if(this.chResp.status=="true")
    {
       
     
      this.TAGTextArr = [];
      this.TAGArr = [];
      this.tag1 = [];     
      this.tag2 = []; 
      this.tag3 = []; 
      this.tag4 = []; 
      this.tag5 = []; 
      this.code = []; 
        this.TAGArr=this.chResp.list;
       this.jsonDataTAG=this.chResp.list;
          for(var i in this.TAGArr)
          {
            if(this.TAGArr[i]['name']=='Andaman And Nicobar Islands')
              this.TAGTextArr.push('Andaman');
            else
              this.TAGTextArr.push(this.TAGArr[i]['name']);
            this.tag1.push((Number(this.TAGArr[i]['tag1_count'])/100000).toFixed(2));
            this.tag2.push((Number(this.TAGArr[i]['tag2_count'])/100000).toFixed(2));
            this.tag3.push((Number(this.TAGArr[i]['tag3_count'])/100000).toFixed(2));
            this.tag4.push((Number(this.TAGArr[i]['tag4_count'])/100000).toFixed(2));
            this.tag5.push((Number(this.TAGArr[i]['tag5_count'])/100000).toFixed(2));
            this.code.push(this.TAGArr[i]['code']);
            
          }   
          
          this.TAGChartElement = this.TAGChart.nativeElement;
          var px=(this.TAGArr.length*5)+"px";
          this.TAGChartElement.style.height=px;
/*
          this.TAGChartElement = this.TAGChart.nativeElement;
          var px=(this.TAGArr.length*16)+"px";
          this.TAGChartElement.style.height=px;
*/
          this.TAGbars = new Chart(this.TAGChart.nativeElement, { type: 'bar',        
          data: {labels:this.TAGTextArr,datasets:[]}});
          this.TAGbars.destroy();

      this.TAGbars = new Chart(this.TAGChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.TAGTextArr,
          datasets: [/*{  
            label:'SECC Target Families'  ,        
            data: this.tag1,
            backgroundColor:'#006B71', // array should have same number of elements as number of dataset
            //barThickness:12,            
            borderRadius: Number.MAX_VALUE,
            //borderSkipped: false,
          },*/{  
            label:'Beneficiary have card'  ,        
            data: this.tag2,
            backgroundColor:'#28A745', // array should have same number of elements as number of dataset
            //barThickness:12,            
            borderRadius: Number.MAX_VALUE,
            //borderSkipped: false,
            
          },{  
            label:'Tagged Families'  ,        
            data: this.tag3,
            backgroundColor:'#a6edb7', // array should have same number of elements as number of dataset
            //barThickness:12,            
            borderRadius: Number.MAX_VALUE,
            //borderSkipped: false,
          },{  
            label:'Card to be Created'  ,        
            data: this.tag4,
            backgroundColor:'#74f2ea', // array should have same number of elements as number of dataset
            //barThickness:12,            
            borderRadius: Number.MAX_VALUE,
            //borderSkipped: false,
          },{  
            label:'Ujjwala Families'  ,        
            data: this.tag5,
            backgroundColor:'#119e95', // array should have same number of elements as number of dataset
            //barThickness:12,            
            borderRadius: Number.MAX_VALUE,
            //borderSkipped: false,
          }]
        },
        options: {
          plugins:{
            legend:{display: true,labels:{
              boxHeight:10,
              boxWidth:10,
              font:{size:11}              
            }}
            ,datalabels: {
              display: false,
              align: 'end', 
              color:'red',
                           
            },  
            tooltip: {
              displayColors:false,
              enabled:true,
              yAlign: 'top',
              
              callbacks: {
                
                  label: function(context) {
                    
                    let label = context.dataset.label || '';

                    return label +": " + context.parsed.x+"L";
                  }
              }
          }          
          },          
          indexAxis: 'y',          
          elements: {
            line: {
              borderWidth: 0,              
            }
          },
          scales:{x:{grid:{display:false,drawBorder:false},position:'top',stacked:true,ticks:{          
            
           
            font:{size:12,family:'Roboto'},color:'#989898'
        }},y:{grid:{display:false,drawBorder:false},stacked:true,ticks:{          
            
         
          autoSkip: false,
          font:{size:12,family:'Roboto'},color:'#989898'
      }}},
          
          onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.TAGTextArr[index];  
            
                if(this.TAGState_District=="S")
                  {
                    this.TAGbars.destroy();
                    this.GetTAGData("TAGD","",this.statename.state_name,"");
                    this.TAGState_District="D";                  
                  }
                  else
                  {
                    
                    this.TAGbars.destroy();
                    this.GetTAGData("TAGD","",this.state_name,"");
                    this.TAGState_District="S";
                  }
          }
        }
      });
    }
    });
   }


   GetFCS(type:any,rpttype:any,state_code:any,district_code:any)
   {

    this.pmjReq.type=type;  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;    
    
    this.apiService.GetFamilyCardStatus(this.pmjReq).subscribe((response) => { 
          this.chResp=response;           
        if(this.chResp.status=="true")
    {
      this.FCSTextArr = [];
      this.FCSArr = [];
      this.card_created = [];     
      this.card_pending = []; 
      
        this.FCSArr=this.chResp.list;
       this.jsonDataFCS=this.chResp.list;
          for(var i in this.FCSArr)
          {
            if(this.FCSArr[i]['text']=='Andaman And Nicobar Islands')
              this.FCSTextArr.push('Andaman');
            else
              this.FCSTextArr.push(this.FCSArr[i]['text']);
            this.card_created.push((Number(this.FCSArr[i]['card_count'])/100000).toFixed(2));
            this.card_pending.push((Number(this.FCSArr[i]['pending_count'])/100000).toFixed(2));
           
            
          }   
          
          this.FCSChartElement = this.FCSChart.nativeElement;
          var px=(this.FCSArr.length*5)+"px";
          this.FCSChartElement.style.height=px;
/*
          this.TAGChartElement = this.TAGChart.nativeElement;
          var px=(this.TAGArr.length*16)+"px";
          this.TAGChartElement.style.height=px;
*/
          this.FCSbars = new Chart(this.FCSChart.nativeElement, { type: 'bar',        
          data: {labels:this.FCSTextArr,datasets:[]}});
          this.FCSbars.destroy();

      this.FCSbars = new Chart(this.FCSChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.FCSTextArr,
          datasets: [{  
            label:'Families Card Created'  ,        
            data: this.card_created,
            backgroundColor:'#21CC98', // array should have same number of elements as number of dataset
            //barThickness:12,            
            borderRadius: Number.MAX_VALUE,
            //borderSkipped: false,
            
          },{  
            label:'Families Card Not Created'  ,        
            data: this.card_pending,
            backgroundColor:'#96b9eb', // array should have same number of elements as number of dataset
            //barThickness:12,            
            borderRadius: Number.MAX_VALUE,
            //borderSkipped: false,
          }]
        },
        options: {
          plugins:{
            legend:{display: true,labels:{
              boxHeight:10,
              boxWidth:10,
              font:{size:11}              
            }}
            ,datalabels: {
              display: false,
              align: 'end', 
              color:'red',
                           
            },  
            tooltip: {
              displayColors:false,
              enabled:true,
              yAlign: 'top',
              
              callbacks: {
                
                  label: function(context) {
                    
                    let label = context.dataset.label || '';

                    return label +": " + context.parsed.x+"L";
                  }
              }
          }          
          },          
          indexAxis: 'y',          
          elements: {
            line: {
              borderWidth: 0,              
            }
          },
          scales:{x:{grid:{display:false,drawBorder:false},position:'top',stacked:true,ticks:{          
            
           
            font:{size:12,family:'Roboto'},color:'#989898'
        }},y:{grid:{display:false,drawBorder:false},stacked:true,ticks:{          
            
         
          autoSkip: false,
          font:{size:12,family:'Roboto'},color:'#989898'
      }}},
          
          onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.FCSTextArr[index];  
            this.statename.state_name=this.PMJTextArr[index];   
            this.apiService.GetStateCode(this.statename).subscribe((response) => { 

              if(response['status']=="true")
              {
                if(this.FCSState_District=="S")
                {
                  this.FCSbars.destroy();
                  this.GetFCS("","",response['state_code'],"");
                  this.FCSState_District="D";                  
                }
                else
                {
                  this.FCSbars.destroy();
                  this.GetFCS("","",this.state,"");
                  this.FCSState_District="S";
                }
              }
              else
              {                
               this.FCSbars.destroy();
               this.GetFCS("","",this.state,"");
               this.FCSState_District="S";
              }

                
                });
          }
        }
      });
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
        tble+="<tr><td>S.No.</td><td>State Name</td><td>District Name</td><td>Agency Name</td><td>Total</td><td>Total Approved</td> <td>Total Reject</td></tr>";
        for(var i in data)
        {
          tble+="<tr><td>"+Number(i)+1+"</td><td>"+data[i]['state_name']+"</td><td>"+data[i]['district_name']+"</td><td>"+data[i]['agency_name']+"</td><td>"+data[i]['total']+"</td><td>"+data[i]['total_aaproved']+"</td><td>"+data[i]['total_reject']+"</td></tr>";
        }
        tble+="<tr><td colspan='4'>Total</td><td>"+this.total+"</td><td>"+this.total_approved+"</td> <td>"+this.total_reject+"</td></tr>";
      }
      if(this.isAgency==true)
      {
        tble+="<tr><td>S.No.</td><td>Agency Name</td><td>Total</td><td>Total Approved</td> <td>Total Reject</td></tr>";
        for(var i in data)
        {
          tble+="<tr><td>"+Number(i)+1+"</td><td>"+data[i]['agency_name']+"</td><td>"+data[i]['total']+"</td><td>"+data[i]['total_aaproved']+"</td><td>"+data[i]['total_reject']+"</td></tr>";
        }
        tble+="<tr><td colspan='2'>Total</td><td>"+this.total+"</td><td>"+this.total_approved+"</td> <td>"+this.total_reject+"</td></tr>";
      }
    }
    if(this.role=="2")
    {
      tble+="<tr><td>S.No.</td><td>District Name</td><td>Agency Name</td><td>Total</td><td>Total Approved</td> <td>Total Reject</td></tr>";
        for(var i in data)
        {
          tble+="<tr><td>"+Number(i)+1+"</td><td>"+data[i]['district_name']+"</td><td>"+data[i]['agency_name']+"</td><td>"+data[i]['total']+"</td><td>"+data[i]['total_aaproved']+"</td><td>"+data[i]['total_reject']+"</td></tr>";
        }
        tble+="<tr><td colspan='3'>Total</td><td>"+this.total+"</td><td>"+this.total_approved+"</td> <td>"+this.total_reject+"</td></tr>";
    }
    if(this.role=="3")
    {
      tble+="<tr><td>S.No.</td><td>Agency Name</td><td>Total</td><td>Total Approved</td> <td>Total Reject</td></tr>";
        for(var i in data)
        {
          tble+="<tr><td>"+Number(i)+1+"</td><td>"+data[i]['agency_name']+"</td><td>"+data[i]['total']+"</td><td>"+data[i]['total_aaproved']+"</td><td>"+data[i]['total_reject']+"</td></tr>";
        }
        tble+="<tr><td colspan='2'>Total</td><td>"+this.total+"</td><td>"+this.total_approved+"</td> <td>"+this.total_reject+"</td></tr>";
    }
    if(this.role=="4")
    {
      tble+="<tr><td>S.No.</td><td>State Name</td><td>State Name</td><td>Name</td><td>Total</td><td>Total Approved</td> <td>Total Reject</td></tr>";
        for(var i in data)
        {
          tble+="<tr><td>"+Number(i)+1+"</td><td>"+data[i]['state_name']+"</td><td>"+data[i]['created_by']+"</td><td>"+data[i]['name']+"</td><td>"+data[i]['total']+"</td><td>"+data[i]['total_aaproved']+"</td><td>"+data[i]['total_reject']+"</td></tr>";
        }
        tble+="<tr><td colspan='4'>Total</td><td>"+this.total+"</td><td>"+this.total_approved+"</td> <td>"+this.total_reject+"</td></tr>";
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
}
