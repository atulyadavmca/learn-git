import { Component, OnInit, ViewChild } from '@angular/core';

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
import { ConsolidatedDashboardReq } from '../model/consolidated-dashboard-req';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-bis-report',
  templateUrl: './bis-report.component.html',
  styleUrls: ['./bis-report.component.css']
})
export class BisReportComponent implements OnInit {
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
  ddldistrict: any;
  ddlagency: any;

  loginhistory:any;
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
  state_district_name:any;
  total_secc_target_families:any;
  total_secc_families_one_card:any;
  total_secc_ayush_card_ind:any;
  total_non_secc_families_one_card:any;
  total_non_secc_ayush_card_ind:any;
  total_families_to_be_tagged:any;
  total_families_card_to_be_created:any;
  bencardDetailsArr:any;
  stateList_Con:any;
  statecode_Con:any="";
  DistrictList_Con:any;
  districtcode_Con:any="";
  BlockList:any;
  blockcode_Con:any="";
  VillageList:any;
  villagecode:any;
  consolidated_dashboard_req:any;
  benCon:any;
  urban_rural:any;
  urban_rural_ayush:any="";
  AyushmanCardDataList:any;
  firstColName:any;
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
      this.ddldistrict=this.district_code;
      this.ddlagency=this.agency_code;
      this.bencarddetailsReq=new BenCardDetailsReq();
      this.state_district_name="State";
      this.consolidated_dashboard_req=new ConsolidatedDashboardReq();
      this.urban_rural="R";
      this.firstColName="State";
    }

  ngOnInit(): void {
    this.GetStateMaster();
     this.GetTopHeadData("","")
     this.GetPMJBISStatewise("PMJBIS","","","");
     this.GetNONPMJBISStatewise("NONPMJBIS","","","");
     this.GetPMJTD("BICCTD","T","","");
     this.GetTAGData("TAGD","","","");
     this.GetFCS("","","","");
     this.getStateDistrictBlockVillage("","","","",this.urban_rural);  
     
     this.GetAyushmanCardRpt("","","","","");
  }
  pmjayinsight()
  {this.router.navigate(['/pmjay']); }
  cardReport()
  {this.router.navigate(['/cardreport']); }
  getReport(type:any)
  {
    if(type=="BCD")
    {
      //let tdTagged= <HTMLScriptElement>document.getElementById('tdTagged');
      //tdTagged.style.display="block";
      this.GetStateMaster();
      this.state_district_name="State";
      this.GenBenCardDetails("","")
    }
  }
  getDistrict_code(event:any)
  {
    var val=event.target.value;
    this.districtcode_Con=val;
    
   this.blockcode_Con=""
   this.urban_rural_ayush="";
  }
  bindDistrict_Con(event:any)
  { 
   var val=event.target.value;
   this.statecode_Con=val;
   this.districtcode_Con=""
   this.blockcode_Con=""
   this.urban_rural_ayush="";
   this.getStateDistrictBlockVillage(val,"","","",this.urban_rural);
   
  }

  bindBlock_Ayush(event:any)
  { 
   var val=event.target.value;
   this.urban_rural_ayush=val;
   this.urban_rural=val;
   this.blockcode_Con=""
   
   this.getStateDistrictBlockVillage(this.statecode_Con,this.districtcode_Con,"","",this.urban_rural);
  }

  bindBlock_Con(event:any)
  { 
   var val=event.target.value;
   this.districtcode_Con=val;
   this.blockcode_Con="";
   this.getStateDistrictBlockVillage(this.statecode_Con,this.districtcode_Con,"","",this.urban_rural);
  }

  bindVillage_Con(event:any)
  { 
   var val=event.target.value;
   this.blockcode_Con=val;
   this.villagecode="";
   this.getStateDistrictBlockVillage(this.statecode_Con,this.districtcode_Con,this.blockcode_Con,"",this.urban_rural);
  }

  GetVillage_Con(event:any)
  { 
   var val=event.target.value;
   this.villagecode=val;   
  }

  getStateDistrictBlockVillage(state_code:any,district_code:any,block_town_code:any,vill_ward_code:any,urban_rural:any)
  {
    this.consolidated_dashboard_req.state_code=state_code;  
    this.consolidated_dashboard_req.district_code=district_code;
    this.consolidated_dashboard_req.block_town_code=block_town_code;
    this.consolidated_dashboard_req.vill_ward_code=vill_ward_code;    
    this.consolidated_dashboard_req.urban_rural=urban_rural;  
    this.apiService.GetStateDistrict_Block_Village(this.consolidated_dashboard_req).subscribe((response) => {
      console.log(response);
      if(response["status"]=="true")
      {
        if(state_code=="" && district_code=="" && block_town_code=="" )
            this.stateList_Con=response["data"];
        if(state_code!="" && district_code=="" && block_town_code=="" )
            this.DistrictList_Con=response["data"];
        if(state_code!="" && district_code!="" && block_town_code=="" )
            this.BlockList=response["data"];
        if(state_code!="" && district_code!="" && block_town_code!="" )
            this.VillageList=response["data"];
      }  
    });
  }
  bindState(event:any)
  {
    var val=event.target.value;
    this.urban_rural=val;
    this.getStateDistrictBlockVillage("","","","",this.urban_rural);     
  }
  bindConReport()
  {
    if(this.statecode_Con!="" && this.districtcode_Con!="" &&  this.blockcode_Con!="" && this.villagecode!="")
        this.getConsolidatedDashboard(this.statecode_Con,this.districtcode_Con,this.blockcode_Con,this.villagecode,"R");
  }
  getConsolidatedDashboard(state_code:any,district_code:any,block_town_code:any,vill_ward_code:any,urban_rural:any)
  {
    this.consolidated_dashboard_req.state_code=state_code;  
    this.consolidated_dashboard_req.district_code=district_code;
    this.consolidated_dashboard_req.block_town_code=block_town_code;
    this.consolidated_dashboard_req.vill_ward_code=vill_ward_code;    
    this.consolidated_dashboard_req.urban_rural=urban_rural;  
    this.apiService.GetConsolidatedDashboard(this.consolidated_dashboard_req).subscribe((response) => {
      console.log(response);
      if(response["status"]=="true")
      {
        this.benCon=[];
        this.benCon=response['data'];
        $('#benconddetails').DataTable().clear().destroy();
      setTimeout(()=>{  
        
//$("#datatableexample").empty();                        
        $('#benconddetails').DataTable( {
          //destroy:true, 
          pagingType: 'full_numbers',
          pageLength: 50,
          searching:true,
          paging:true,
          processing: true,                    
          lengthMenu : [10, 25,50],          
        
      })
      }, 1);
        
      }  
    });
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
    //console.log(elementW);
   
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
      //console.log(response);          
      if(this.chResp.status=="true")
      {
        
       this.PMJDTcolor=[];
       
        this.PMJDTTextArr = [];
        this.PMJDTValueArr = [];
        this.NONPMJDTValueArr = [];
        this.PMJDTtxtArr = [];
        this.PMJDTTextArr=this.chResp.list;
        this.jsonDataPMJTD=this.chResp.list;
         // console.log(this.chResp.list);          
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
          //console.log(response);  
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
                      //console.log();
                      //context.label.replace(context.dataset.label,"");
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
              //console.log(this.state_code);
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
          //console.log(response);  
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
                      //console.log();
                      //context.label.replace(context.dataset.label,"");
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
              //console.log(this.state_code);
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
     //console.log(response);            
       if(response['status']=="true")
   {
     this.stateList=response['list'];
     //console.log(this.stateList);
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
  console.log("Rizwan");           
  console.log(response); 
     
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
  }
  else
  {
    this.DistrictList_Create=null;
    this.DistrictList_Download=null;
    this.DistrictList_Delivery=null;
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
   GenBenCardDetails(state_code:any,district_code:any)
   {
    this.bencarddetailsReq.state_code=state_code;
    //this.bencarddetailsReq.district_code=district_code;
    
    this.apiService.GetBenCardDetails(this.bencarddetailsReq).subscribe((response) => { 

    
        if(response.status=="true")
    {     
      var total_secc_target_families=0;
      var total_secc_families_one_card=0;
      var total_secc_ayush_card_ind=0;
      var total_non_secc_families_one_card=0;
      var total_non_secc_ayush_card_ind=0;
      var total_families_to_be_tagged=0;
      var total_families_card_to_be_created=0;
      this.bencardDetailsArr=[];
      this.bencardDetailsArr=response.list;
      for(var i in this.bencardDetailsArr)
      {
        /*
        total_secc_target_families+=Number(this.bencardDetailsArr[i]['secc_target_families']);
        total_secc_families_one_card+=Number(this.bencardDetailsArr[i]['secc_families_one_card']);
        total_secc_ayush_card_ind+=Number(this.bencardDetailsArr[i]['secc_ayush_card_ind']);
        total_non_secc_families_one_card+=Number(this.bencardDetailsArr[i]['non_secc_families_one_card']);
        total_non_secc_ayush_card_ind+=Number(this.bencardDetailsArr[i]['non_secc_ayush_card_ind']);
        total_families_to_be_tagged+=Number(this.bencardDetailsArr[i]['families_to_be_tagged']);
        total_families_card_to_be_created+=Number(this.bencardDetailsArr[i]['families_card_to_be_created']);
        */
      }
/*
      this.total_secc_target_families=this.getCommaValue(String(total_secc_target_families));
      this.total_secc_families_one_card=this.getCommaValue(String(total_secc_families_one_card));
      this.total_secc_ayush_card_ind=this.getCommaValue(String(total_secc_ayush_card_ind));
      this.total_non_secc_families_one_card=this.getCommaValue(String(total_non_secc_families_one_card));
      this.total_non_secc_ayush_card_ind=this.getCommaValue(String(total_non_secc_ayush_card_ind));
      this.total_families_to_be_tagged=this.getCommaValue(String(total_families_to_be_tagged));
      this.total_families_card_to_be_created=this.getCommaValue(String(total_families_card_to_be_created));
      */
      this.bencarddetails=response.list;    

      console.log(response.list);
      if(state_code=="")
      {
      /*$('#bencarddetails').DataTable().clear().destroy();
      setTimeout(()=>{  
        
                       
        $('#bencarddetails').DataTable( {
          
          pagingType: 'full_numbers',
          pageLength: 50,
          searching:true,
          paging:true,
          processing: true,                    
          lengthMenu : [10, 25,50],          
        
      });
      }, 1);*/
    }
    else
    {
      /*$('#bencarddetails').DataTable().clear().destroy();
      setTimeout(()=>{  
        
                      
        $('#bencarddetails').DataTable( {
          //destroy:true, 
          pagingType: 'full_numbers',
          pageLength: 50,
          searching:true,
          paging:true,
          processing: true,                    
          lengthMenu : [10, 25,50],          
        
      }).columns( [7] ).visible(false);
      }, 1);*/
    }
     
    }
    });
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
//console.log(nStr+" : "+num);
  return num;  
}
   GetTopHeadData(state_code:any,district_code:any)
   {

    this.pmjReq.type='PMJBIS';  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetTopHeadData(this.pmjReq).subscribe((response) => {
      //console.log(response);
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
      //console.log("Rizwan" +response);
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

  bindChart1(event:any)
   { 
    //let tdTagged= <HTMLScriptElement>document.getElementById('tdTagged');
    var val=event.target.value;
    console.log(val);
    if(val!="")
    {
     // tdTagged.style.display='none';
    this.state_district_name="District";
    }
    else
    {
      //tdTagged.style.display='block';
      this.state_district_name="State"
    }
    this.GenBenCardDetails(val,"");

  }
  GetTAGData(type:any,rpttype:any,state_code:any,district_code:any)
   {

    this.pmjReq.type=type;  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;    
    
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => { 
          this.chResp=response; 
          //console.log  (response);
        if(this.chResp.status=="true")
    {
      //console.log(this.chResp.list);  
     
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
            label:'Verified Families'  ,        
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
          }/*,{  
            label:'Ujjwala Families'  ,        
            data: this.tag5,
            backgroundColor:'#119e95', // array should have same number of elements as number of dataset
            //barThickness:12,            
            borderRadius: Number.MAX_VALUE,
            //borderSkipped: false,
          }*/]
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
                    //console.log("Rizwan "+this.state_name);
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
          console.log  (response);
        if(this.chResp.status=="true")
    {
      //console.log(this.chResp.list);  
     
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

   GetAyushmanCardRpt(state_code:any,district_code:any,block_town_code:any,vill_ward_code:any,urban_rural:any)
  {
    
    
    this.consolidated_dashboard_req.state_code=state_code;
    this.consolidated_dashboard_req.district_code=district_code;
    this.consolidated_dashboard_req.block_town_code=block_town_code;
    this.consolidated_dashboard_req.vill_ward_code=vill_ward_code;     
    this.consolidated_dashboard_req.urban_rural=urban_rural;
   this.apiService.GetAyushmanCardData(this.consolidated_dashboard_req).subscribe((response) => {     
      
    if(state_code=="" && district_code=="" && block_town_code=="" && urban_rural=="")
    {
      this.firstColName="State";
    }

    if(state_code!="" && district_code=="" && block_town_code=="" && urban_rural=="")
    {
      this.firstColName="District";
    }

    if(state_code!="" && district_code!="" && block_town_code=="" && urban_rural=="R")
    {
      this.firstColName="Block";
    }
    if(state_code!="" && district_code!="" && block_town_code=="" && urban_rural=="U")
    {
      this.firstColName="Town";
    }

    if(state_code!="" && district_code!="" && block_town_code!="" && urban_rural=="R")
    {
      this.firstColName="Village";
    }
    if(state_code!="" && district_code!="" && block_town_code!="" && urban_rural=="U")
    {
      this.firstColName="Ward";
    }


       if(response['status']=="true")
   {
    this.AyushmanCardDataList=[];
     this.AyushmanCardDataList=response["list"];
     //console.log(this.stateList);
     $('#tblAyushman').DataTable().clear().destroy();
      setTimeout(()=>{  
        
                       
        $('#tblAyushman').DataTable( {
          
          pagingType: 'full_numbers',
          pageLength: 50,
          searching:true,
          paging:true,
          processing: true,                    
          lengthMenu : [10, 25,50],          
        
      });
      }, 1);
   }
   });
    
  }
  GetAyushmanReport()
  {
    this.GetAyushmanCardRpt(this.statecode_Con,this.districtcode_Con,this.blockcode_Con,"",this.urban_rural_ayush);
    return false;
  }

}
