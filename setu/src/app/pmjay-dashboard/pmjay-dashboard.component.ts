import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { Router } from '@angular/router';
import { Pmjreq } from '../model/pmjreq';
import { ApiserviceService } from '../service/apiservice.service';
import { ChartResp } from '../model/chart-resp';
Chart.register(...registerables);

@Component({
  selector: 'app-pmjay-dashboard',
  templateUrl: './pmjay-dashboard.component.html',
  styleUrls: ['./pmjay-dashboard.component.css']
})

export class PmjayDashboardComponent implements OnInit {
  VMUbars:any;
  VMUAadhaar:any;
  VMUNonAadhaar:any;
  pmjReq:Pmjreq;
  ACIOverall:any;
  ACIToday:any;
  chResp:ChartResp;
  ACIStateTextArr : any;
  ACIStateValueArr : any;
  txtArr :any;
  arr:any;
  jsonDataACGS:any;
  ACIStatebars:any;
  sDate:any;
  eDate:any

  PAOverall:any;
  PAToday:any;


  PAStateTextArr : any;
  PAStateValueArr : any; 
  PAStatebars:any;
  PAtxtArr:any;

  PAAStateTextArr : any;
  PAAStateValueArr : any; 
  PAAStatebars:any;
  PAAtxtArr:any;
  PAAOverall:any;
  PAAToday:any;

  CSCStateTextArr : any;
  CSCStateValueArr : any; 
  CSCStatebars:any;
  CSCtxtArr:any;
  CSCOverall:any;
  CSCToday:any;

  CSAStateTextArr : any;
  CSAStateValueArr : any; 
  CSAStatebars:any;
  CSAtxtArr:any;
  CSAOverall:any;
  CSAToday:any;


  CPCStateTextArr : any;
  CPCStateValueArr : any; 
  CPCStatebars:any;
  CPCtxtArr:any;
  

  CPAStateTextArr : any;
  CPAStateValueArr : any; 
  CPAStatebars:any;
  CPAtxtArr:any;

  COCStateTextArr : any;
  COCStateValueArr : any; 
  COCStatebars:any;
  COCtxtArr:any;


  COAStateTextArr : any;
  COAStateValueArr : any; 
  COAStatebars:any;
  COAtxtArr:any;

  OPCStateTextArr : any;
  OPCStateValueArr : any; 
  OPCStatebars:any;
  OPCtxtArr:any;

  IPCStateTextArr : any;
  IPCStateValueArr : any; 
  IPCStatebars:any;
  IPCtxtArr:any;

  at_SHA:any;
  at_ISA:any;

  PAPublic:any;
  PAPrivate:any;
  PAOther:any;
  PreAuthTypeBars:any;
  PreAuthType2Bars:any;

  emp_Greater5:any;
  emp_Greater1:any;
  em_Total:any;


  HospitalTypeBars:any;
  Outgoing:any;
  Incoming:any;


  CScolor:any;
  CSTextArr:any;
  CSValueArr:any;
  CStxtArr:any;
  CSBars:any;

  OCScolor:any;
  OCSTextArr:any;
  OCSValueArr:any;
  OCStxtArr:any;
  OCSBars:any;

  ACGPM:any;
  PAPM:any;
  EMPM:any;
  @ViewChild('hprafChart',{ static: true }) hprafChart:any;
  @ViewChild('ACIStateChart',{ static: true }) ACIStateChart:any;

  @ViewChild('PAStateChart') PAStateChart:any;
  @ViewChild('PAAStateChart') PAAStateChart:any;
  @ViewChild('CSCStateChart') CSCStateChart:any;
  @ViewChild('CSAStateChart') CSAStateChart:any;

  @ViewChild('CPCStateChart') CPCStateChart:any;
  @ViewChild('CPAStateChart') CPAStateChart:any;

  @ViewChild('COCStateChart') COCStateChart:any;
  @ViewChild('COAStateChart') COAStateChart:any;
  @ViewChild('OPCStateChart') OPCStateChart:any;
  @ViewChild('IPCStateChart') IPCStateChart:any;
  @ViewChild('PreAuthTypeChart') PreAuthTypeChart:any;
  @ViewChild('PreAuthType2Chart') PreAuthType2Chart:any;
  @ViewChild('HospitalTypeChart') HospitalTypeChart:any;
  @ViewChild('CSChart') CSChart:any;
  @ViewChild('OCSChart') OCSChart:any;
  
  
  
  constructor(public apiService: ApiserviceService,public router: Router) {
    if(localStorage.getItem('userid')=="")
    {
      //this.router.navigate(['login']);
    }
    this.pmjReq=new Pmjreq();
    this.chResp=new ChartResp();
   }

  ngOnInit(): void {
    this.GetVMUChart("","");
    this.GetTopHeadData("","");
    this.GetACIStateWise("ACGS","","",""); 
    this.GetApprovalPending("","")
    this.GetPAStateWise("HAS","","",""); 
    this.GetPAAStateWise("PAAS","","",""); 

    this.GetCSCStateWise("CSCS","","",""); 
    this.GetCSAStateWise("CSAS","","",""); 
    this.GetCPCStateWise("CPCS","","",""); 
    this.GetCPAStateWise("CPAS","","",""); 
    this.GetCOCStateWise("COCS","","",""); 
    this.GetCOAStateWise("COAS","","",""); 
    this.GetEmpanelledActive("","");
    this.GetPortabilityCase("","");
    this.GetPreauthType("","")
    this.GetOPCStateWise("OPCS","","",""); 
    this.GetIPCStateWise("IPCS","","",""); 

    this.GetClaimStatus("","");
    this.GetOverDueClaimStatus("","");
    this.GetACGPM("","");
    this.GetPAPM("","");
    this.GetEMPM("","");
    

  }

  GetVMUChart(state_code:any,district_code:any)
   {

    this.pmjReq.type="";  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetACIVMethod(this.pmjReq).subscribe((response) => {
      
    if(response['status']=="true")
    {  
      
     var total=Number(response['aadhaar']) +Number(response['nonaadhaar']) 
     //console.log("total" + total);    
     this.VMUAadhaar=(Number(response['aadhaar'])*100/total).toFixed(0);
     //console.log("VMUAadhaar" + this.VMUAadhaar);    
     this.VMUNonAadhaar=(Number(response['nonaadhaar'])*100/total).toFixed(0);
     //console.log("VMUNonAadhaar" + this.VMUNonAadhaar);    
    
   

    this.VMUbars = new Chart(this.hprafChart.nativeElement, {
      type: 'bar',        
      data: {
        labels: ['Verification Method'],
        datasets: [{  
          label:'Aadhaar'  ,        
          data: [this.VMUAadhaar],
          backgroundColor:'#E4B608', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1,
          barThickness:25,
        },{  
          label:'Non Aadhaar'  ,        
          data: [this.VMUNonAadhaar],
          backgroundColor:'#F5F5F5', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1,
          barThickness:25,
          
        }],
      },
      
      options: {
        plugins:{
          legend:{labels:{
               
            boxHeight:5,
            boxWidth:5,
            font:{size:11} ,
            color:'#F5F5F5',
          },
          position:"bottom"},datalabels: {
            display: true,
            align: 'center',
            color:'black',formatter: function(value, context) {
              return value+"%";}
                                  
          },tooltip: {
            callbacks: {
                label: function(context) {
                  
                    let label = context.dataset.label || '';
    
                    return label +": " + context.parsed.x+"%";
                }
            }
        }
        },          
        indexAxis: 'y',
        elements: {
          line: {
            borderWidth: 0,
            
          }
        },scales:{x:{stacked: true,display:false,grid:{display:false}},y:{stacked: true,display:false,grid:{display:false}}}
       
      }
    });
  }
});
    }

    GetTopHeadData(state_code:any,district_code:any)
    {

    this.pmjReq.type='ACP';  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetTopHeadData(this.pmjReq).subscribe((response) => {
      //console.log("Rizwan" +response);
    if(response['status']=="true")
    {      
      this.ACIToday=this.getCommaValue(response['today']);      
      if(Number(response['overall'])>=10000000)
      {
      this.ACIOverall=(Number(response['overall'])/10000000).toFixed(2) + ' Cr';   
      }   
      else if(Number(response['overall'])<10000000 && Number(response['overall'])>=100000)
      {
        this.ACIOverall=(Number(response['overall'])/100000).toFixed(2) + ' L';  
      }
      else
      {
        this.ACIOverall=(Number(response['overall'])/1000).toFixed(2) + ' K'; 
      }
    }
    });
    
    

    this.pmjReq.type='HA';  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetTopHeadData(this.pmjReq).subscribe((response) => {
      //console.log("Rizwan" +response);
    if(response['status']=="true")
    {      
      this.PAToday=this.getCommaValue(response['today']);      
      if(Number(response['overall'])>=10000000)
      {
      this.PAOverall=(Number(response['overall'])/10000000).toFixed(2) + ' Cr';   
      }   
      else if(Number(response['overall'])<10000000 && Number(response['overall'])>=100000)
      {
        this.PAOverall=(Number(response['overall'])/100000).toFixed(2) + ' L';  
      }
      else
      {
        this.PAOverall=(Number(response['overall'])/1000).toFixed(2) + ' K'; 
      }
    }
    });


    this.pmjReq.type='PAA';  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetTopHeadData(this.pmjReq).subscribe((response) => {
      //console.log("Rizwan" +response);
    if(response['status']=="true")
    {      
      //this.PAAToday=this.getCommaValue(response['today']); 
      
      if(Number(response['today'])>=10000000)
      {
      this.PAAToday=(Number(response['today'])/10000000).toFixed(2) + ' Cr';   
      }   
      else if(Number(response['today'])<10000000 && Number(response['overall'])>=100000)
      {
        this.PAAToday=(Number(response['today'])/100000).toFixed(2) + ' L';  
      }
      else
      {
        this.PAAToday=(Number(response['today'])/1000).toFixed(2) + ' K'; 
      }

      if(Number(response['overall'])>=10000000)
      {
      this.PAAOverall=(Number(response['overall'])/10000000).toFixed(2) + ' Cr';   
      }   
      else if(Number(response['overall'])<10000000 && Number(response['overall'])>=100000)
      {
        this.PAAOverall=(Number(response['overall'])/100000).toFixed(2) + ' L';  
      }
      else
      {
        this.PAAOverall=(Number(response['overall'])/1000).toFixed(2) + ' K'; 
      }
    }
    });

    this.pmjReq.type='CSC';  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetTopHeadData(this.pmjReq).subscribe((response) => {
      //console.log("Rizwan" +response);
    if(response['status']=="true")
    {      
      this.CSCToday=this.getCommaValue(response['today']);      
      if(Number(response['overall'])>=10000000)
      {
      this.CSCOverall=(Number(response['overall'])/10000000).toFixed(2) + ' Cr';   
      }   
      else if(Number(response['overall'])<10000000 && Number(response['overall'])>=100000)
      {
        this.CSCOverall=(Number(response['overall'])/100000).toFixed(2) + ' L';  
      }
      else
      {
        this.CSCOverall=(Number(response['overall'])/1000).toFixed(2) + ' K'; 
      }
    }
    });

    this.pmjReq.type='CSA';  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetTopHeadData(this.pmjReq).subscribe((response) => {
      //console.log("Rizwan" +response);
    if(response['status']=="true")
    {      
      //this.CSAToday=this.getCommaValue(response['today']); 
      
      if(Number(response['today'])>=10000000)
      {
      this.CSAToday=(Number(response['today'])/10000000).toFixed(2) + ' Cr';   
      }   
      else if(Number(response['today'])<10000000 && Number(response['overall'])>=100000)
      {
        this.CSAToday=(Number(response['today'])/100000).toFixed(2) + ' L';  
      }
      else
      {
        this.CSAToday=(Number(response['today'])/1000).toFixed(2) + ' K'; 
      }


      if(Number(response['overall'])>=10000000)
      {
      this.CSAOverall=(Number(response['overall'])/10000000).toFixed(2) + ' Cr';   
      }   
      else if(Number(response['overall'])<10000000 && Number(response['overall'])>=100000)
      {
        this.CSAOverall=(Number(response['overall'])/100000).toFixed(2) + ' L';  
      }
      else
      {
        this.CSAOverall=(Number(response['overall'])/1000).toFixed(2) + ' K'; 
      }
    }
    });

    this.pmjReq.type='';  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetHospitalType(this.pmjReq).subscribe((response) => {
      //console.log("Rizwan" +response);
    if(response['status']=="true")
    {      
      
      var total=Number(response['public_count']);
      var publicCount=Number(response['public_count'])-Number(response['private_count'])
      //console.log(total);
      this.em_Total=this.getCommaValue(total.toString());

      var public_Per=(publicCount*100.00/total).toFixed(2)
      var private_Per=(Number(response['private_count'])*100.00/total).toFixed(2) 
      this.GetEmpanelledHospitalType(public_Per,private_Per)  
    }
    });

   } 
   getCommaValue(nStr:any)
{
  var num;
  //console.log(nStr.length);
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
  else
  num=nStr
//console.log(nStr+" : "+num);
  return num;  
}

GetACIStateWise(type:any,rpttype:any,state_code:any,district_code:any)
   {

    this.pmjReq.type=type;  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;    
    
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => { 
          this.chResp=response; 
         
        if(this.chResp.status=="true")
    {
      //console.log("Test "+this.chResp.list?.text);  
     
      this.ACIStateTextArr = [];
      this.ACIStateValueArr = [];
      this.txtArr = [];
      this.arr=[];
      this.jsonDataACGS=[];
        
        this.txtArr=this.chResp.list;
        this.jsonDataACGS = this.chResp.list;
        
        //const list =  this.txtArr;
        
       // list.sort((a:any, b:any) => (a.text > b.text) ? 1 : -1)
       // console.log(list);
        
          for(var i in this.txtArr)
          {
            this.ACIStateTextArr.push(this.txtArr[i]['text']);
            //this.ACIStateValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));           
            this.ACIStateValueArr.push(this.txtArr[i]['value']);           
          }
          
      this.ACIStatebars = new Chart(this.ACIStateChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.ACIStateTextArr,
          datasets: [{  
            label:'Ayushman Cards Issued'  ,        
            data: this.ACIStateValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            
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
           /* tooltip: {
              callbacks: {
                  label: function(context) {
                    
                      let label = context.dataset.label || '';

                      return label +": " + context.parsed.x+"L";
                  }
              }
          }*/
          },          
          indexAxis: 'x',          
          elements: {
            line: {
              borderWidth: 0,              
            }
          },
          scales:{x:{grid:{display:false},position:'bottom'},y:{grid:{display:false}}}
        }
      });
    }
    });
   }

   
   GetPAStateWise(type:any,rpttype:any,state_code:any,district_code:any)
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
      //console.log("Test "+this.chResp.list?.text);  
     
      this.PAStateTextArr = [];
      this.PAStateValueArr = [];
      this.PAtxtArr = [];
     
        this.PAtxtArr=this.chResp.list;
       
          for(var i in this.PAtxtArr)
          {
            this.PAStateTextArr.push(this.PAtxtArr[i]['text']);
            //this.ACIStateValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));           
            this.PAStateValueArr.push(this.PAtxtArr[i]['value']);           
          }
          
      this.PAStatebars = new Chart(this.PAStateChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.PAStateTextArr,
          datasets: [{  
            label:'Preauth Requested Count '  ,        
            data: this.PAStateValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            
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
           /* tooltip: {
              callbacks: {
                  label: function(context) {
                    
                      let label = context.dataset.label || '';

                      return label +": " + context.parsed.x+"L";
                  }
              }
          }*/
          },          
          indexAxis: 'x',          
          elements: {
            line: {
              borderWidth: 0,              
            }
          },
          scales:{x:{grid:{display:false},position:'bottom',},y:{grid:{display:false}}}
        }
      });
    }
    });
   }


   GetPAAStateWise(type:any,rpttype:any,state_code:any,district_code:any)
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
      //console.log("Test "+this.chResp.list?.text);  
     
      this.PAAStateTextArr = [];
      this.PAAStateValueArr = [];
      this.PAAtxtArr = [];
     
        this.PAAtxtArr=this.chResp.list;
       
          for(var i in this.PAAtxtArr)
          {
            this.PAAStateTextArr.push(this.PAAtxtArr[i]['text']);
            //this.ACIStateValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));           
            this.PAAStateValueArr.push(this.PAAtxtArr[i]['value']);           
          }
          
      this.PAAStatebars = new Chart(this.PAAStateChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.PAAStateTextArr,
          datasets: [{  
            label:'Preauth Requested Amount '  ,        
            data: this.PAAStateValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            
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
           /* tooltip: {
              callbacks: {
                  label: function(context) {
                    
                      let label = context.dataset.label || '';

                      return label +": " + context.parsed.x+"L";
                  }
              }
          }*/
          },          
          indexAxis: 'x',          
          elements: {
            line: {
              borderWidth: 0,              
            }
          },
          scales:{x:{grid:{display:false},position:'bottom',},y:{grid:{display:false}}}
        }
      });
    }
    });
   }

   GetCSCStateWise(type:any,rpttype:any,state_code:any,district_code:any)
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
      //console.log("Test "+this.chResp.list?.text);  
     
      this.CSCStateTextArr = [];
      this.CSCStateValueArr = [];
      this.CSCtxtArr = [];
     
        this.CSCtxtArr=this.chResp.list;
       
          for(var i in this.CSCtxtArr)
          {
            this.CSCStateTextArr.push(this.CSCtxtArr[i]['text']);
            //this.ACIStateValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));           
            this.CSCStateValueArr.push(this.CSCtxtArr[i]['value']);           
          }
          
      this.CSCStatebars = new Chart(this.CSCStateChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.CSCStateTextArr,
          datasets: [{  
            label:'Calim Submitted Count'  ,        
            data: this.CSCStateValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            
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
           /* tooltip: {
              callbacks: {
                  label: function(context) {
                    
                      let label = context.dataset.label || '';

                      return label +": " + context.parsed.x+"L";
                  }
              }
          }*/
          },          
          indexAxis: 'x',          
          elements: {
            line: {
              borderWidth: 0,              
            }
          },
          scales:{x:{grid:{display:false},position:'bottom',},y:{grid:{display:false}}}
        }
      });
    }
    });
   }

   GetCSAStateWise(type:any,rpttype:any,state_code:any,district_code:any)
   {

    this.pmjReq.type=type;  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;    
    
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => { 
          this.chResp=response; 
         // console.log  (response);
        if(this.chResp.status=="true")
    {
      //console.log("Test "+this.chResp.list?.text);  
     
      this.CSAStateTextArr = [];
      this.CSAStateValueArr = [];
      this.CSAtxtArr = [];
     
        this.CSAtxtArr=this.chResp.list;
       
          for(var i in this.CSAtxtArr)
          {
            this.CSAStateTextArr.push(this.CSAtxtArr[i]['text']);
            //this.ACIStateValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));           
            this.CSAStateValueArr.push((Number(this.CSAtxtArr[i]['value'])/1000000000).toFixed(2));           
          }
          
      this.CSAStatebars = new Chart(this.CSAStateChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.CSAStateTextArr,
          datasets: [{  
            label:'Claim Submitted Amount '  ,        
            data: this.CSAStateValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            
          }]
        },
        options: {
          plugins:{
            legend:{display: false}
            ,datalabels: {
              display: false,
              align: 'top', 
              color:'white',
              font:{size:8} ,formatter: function(value, context) {
                return value+"bn";
             }             
            },
            tooltip: {
              callbacks: {
                  label: function(context) {
                    
                      let label = context.dataset.label || '';

                      return label +": " + context.parsed.y+"bn";
                  }
              }
          }
          },          
          indexAxis: 'x',          
          elements: {
            line: {
              borderWidth: 0,              
            }
          },
          scales:{x:{grid:{display:false},position:'bottom',},y:{grid:{display:false}}}
        }
      });
    }
    });
   }

   GetCPCStateWise(type:any,rpttype:any,state_code:any,district_code:any)
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
      //console.log("Test "+this.chResp.list?.text);  
     
      this.CPCStateTextArr = [];
      this.CPCStateValueArr = [];
      this.CPCtxtArr = [];
     
        this.CPCtxtArr=this.chResp.list;
       
          for(var i in this.CPCtxtArr)
          {
            this.CPCStateTextArr.push(this.CPCtxtArr[i]['text']);
            //this.ACIStateValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));           
            this.CPCStateValueArr.push(this.CPCtxtArr[i]['value']);           
          }
          
      this.CPCStatebars = new Chart(this.CPCStateChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.CPCStateTextArr,
          datasets: [{  
            label:'Claim Paid Count '  ,        
            data: this.CPCStateValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            
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
           /* tooltip: {
              callbacks: {
                  label: function(context) {
                    
                      let label = context.dataset.label || '';

                      return label +": " + context.parsed.x+"L";
                  }
              }
          }*/
          },          
          indexAxis: 'x',          
          elements: {
            line: {
              borderWidth: 0,              
            }
          },
          scales:{x:{grid:{display:false},position:'bottom',},y:{grid:{display:false}}}
        }
      });
    }
    });
   }

   GetCPAStateWise(type:any,rpttype:any,state_code:any,district_code:any)
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
      //console.log("Test "+this.chResp.list?.text);  
     
      this.CPAStateTextArr = [];
      this.CPAStateValueArr = [];
      this.CPAtxtArr = [];
     
        this.CPAtxtArr=this.chResp.list;
       
          for(var i in this.CPAtxtArr)
          {
            this.CPAStateTextArr.push(this.CPAtxtArr[i]['text']);
            //this.ACIStateValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));           
            this.CPAStateValueArr.push(this.CPAtxtArr[i]['value']);           
          }
          
      this.CPAStatebars = new Chart(this.CPAStateChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.CPAStateTextArr,
          datasets: [{  
            label:'Claim Paid Amount '  ,        
            data: this.CPAStateValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            
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
           /* tooltip: {
              callbacks: {
                  label: function(context) {
                    
                      let label = context.dataset.label || '';

                      return label +": " + context.parsed.x+"L";
                  }
              }
          }*/
          },          
          indexAxis: 'x',          
          elements: {
            line: {
              borderWidth: 0,              
            }
          },
          scales:{x:{grid:{display:false},position:'bottom',},y:{grid:{display:false}}}
        }
      });
    }
    });
   }


   GetCOCStateWise(type:any,rpttype:any,state_code:any,district_code:any)
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
      //console.log("Test "+this.chResp.list?.text);  
     
      this.COCStateTextArr = [];
      this.COCStateValueArr = [];
      this.COCtxtArr = [];
     
        this.COCtxtArr=this.chResp.list;
       
          for(var i in this.COCtxtArr)
          {
            this.COCStateTextArr.push(this.COCtxtArr[i]['text']);
            //this.ACIStateValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));           
            this.COCStateValueArr.push(this.COCtxtArr[i]['value']);           
          }
          
      this.COCStatebars = new Chart(this.COCStateChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.COCStateTextArr,
          datasets: [{  
            label:'Claim Overdue Count '  ,        
            data: this.COCStateValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            
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
           /* tooltip: {
              callbacks: {
                  label: function(context) {
                    
                      let label = context.dataset.label || '';

                      return label +": " + context.parsed.x+"L";
                  }
              }
          }*/
          },          
          indexAxis: 'x',          
          elements: {
            line: {
              borderWidth: 0,              
            }
          },
          scales:{x:{grid:{display:false},position:'bottom',},y:{grid:{display:false}}}
        }
      });
    }
    });
   }

   GetCOAStateWise(type:any,rpttype:any,state_code:any,district_code:any)
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
      //console.log("Test "+this.chResp.list?.text);  
     
      this.COAStateTextArr = [];
      this.COAStateValueArr = [];
      this.COAtxtArr = [];
     
        this.COAtxtArr=this.chResp.list;
       
          for(var i in this.COAtxtArr)
          {
            this.COAStateTextArr.push(this.COAtxtArr[i]['text']);
            //this.ACIStateValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));           
            this.COAStateValueArr.push(this.COAtxtArr[i]['value']);           
          }
          
      this.COAStatebars = new Chart(this.COAStateChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.COAStateTextArr,
          datasets: [{  
            label:'Claim Overdue Amount '  ,        
            data: this.COAStateValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            
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
           /* tooltip: {
              callbacks: {
                  label: function(context) {
                    
                      let label = context.dataset.label || '';

                      return label +": " + context.parsed.x+"L";
                  }
              }
          }*/
          },          
          indexAxis: 'x',          
          elements: {
            line: {
              borderWidth: 0,              
            }
          },
          scales:{x:{grid:{display:false},position:'bottom',},y:{grid:{display:false}}}
        }
      });
    }
    });
   }
GetApprovalPending(state_code:any,district_code:any)
   {

    this.pmjReq.type="";  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetACIApprovalPending(this.pmjReq).subscribe((response) => {
      
    if(response['status']=="true")
    {  
      
        
     this.at_SHA=(Number(response['sha'])/1000).toFixed(2)+" K";
     //console.log("VMUAadhaar" + this.VMUAadhaar);    
     this.at_ISA=(Number(response['isa'])/1000).toFixed(2)+" K";
     //console.log("VMUNonAadhaar" + this.VMUNonAadhaar); 
    }
  });
}


GetPortabilityCase(state_code:any,district_code:any)
   {

    this.pmjReq.type="";  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetPortabilityCases(this.pmjReq).subscribe((response) => {      
    if(response['status']=="true")
    {   
      //console.log(response);
      if(Number(response['outgoing'])>=10000000)
      {
      this.Outgoing=(Number(response['outgoing'])/10000000).toFixed(2) + ' Cr';   
      }   
      else if(Number(response['outgoing'])<10000000 && Number(response['outgoing'])>=100000)
      {
        this.Outgoing=(Number(response['outgoing'])/100000).toFixed(2) + ' L';  
      }
      else
      {
        this.Outgoing=(Number(response['outgoing'])/1000).toFixed(2) + ' K'; 
      }

      if(Number(response['incoming'])>=10000000)
      {
      this.Incoming=(Number(response['incoming'])/10000000).toFixed(2) + ' Cr';   
      }   
      else if(Number(response['incoming'])<10000000 && Number(response['incoming'])>=100000)
      {
        this.Incoming=(Number(response['incoming'])/100000).toFixed(2) + ' L';  
      }
      else
      {
        this.Incoming=(Number(response['incoming'])/1000).toFixed(2) + ' K'; 
      }


     //this.Outgoing=this.getCommaValue(response['outgoing']);       
     //this.Incoming=this.getCommaValue(response['incoming']);  
    }
  });
}

GetPreauthType(state_code:any,district_code:any)
   {

    this.pmjReq.type="PATC1";  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetPreauthType(this.pmjReq).subscribe((response) => {
      console.log(response);
    if(response['status']=="true")
    {  
      
     var total=Number(response['public']) +Number(response['private'])  +Number(response['other']) 
     //console.log("total" + total);    
     this.PAPublic=(Number(response['public'])*100/total).toFixed(0);
     //console.log("VMUAadhaar" + this.VMUAadhaar);    
     this.PAPrivate=(Number(response['private'])*100/total).toFixed(0);
     this.PAOther=(Number(response['other'])*100/total).toFixed(0);
     //console.log("VMUNonAadhaar" + this.VMUNonAadhaar);    
    
   

    this.PreAuthTypeBars = new Chart(this.PreAuthTypeChart.nativeElement, {
      type: 'bar',        
      data: {
        labels: ['Preauth Type Count'],
        datasets: [{  
          label:'Public'  ,        
          data: [this.PAPublic],
          backgroundColor:'#FF6090', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1,
          barThickness:25,
        },{  
          label:'Private'  ,        
          data: [this.PAPrivate],
          backgroundColor:'#FAE556', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1,
          barThickness:25,
          
        },{  
          label:'Unknown'  ,        
          data: [this.PAOther],
          backgroundColor:'#EEEEEE', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1,
          barThickness:23,
          
        }],
      },
      
      options: {
        plugins:{
          legend:{labels:{
               
            boxHeight:5,
            boxWidth:5,
            font:{size:11} ,
            color:'#F5F5F5',
          },
          position:"bottom"},datalabels: {
            display: true,
            align: 'center',
            color:'black',formatter: function(value, context) {
              var rt="";
              if(value!="0")
              rt=value+"%"
              return rt;}
                                  
          },tooltip: {
            callbacks: {
                label: function(context) {
                  
                    let label = context.dataset.label || '';
    
                    return label +": " + context.parsed.x+"%";
                }
            }
        }
        },          
        indexAxis: 'y',
        elements: {
          line: {
            borderWidth: 0,
            
          }
        },scales:{x:{stacked: true,display:false,grid:{display:false}},y:{stacked: true,display:false,grid:{display:false}}}
       
      }
    });
  }
});




this.pmjReq.type="PATC2";  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetPreauthType(this.pmjReq).subscribe((response) => {
      console.log(response);
    if(response['status']=="true")
    {  
      
     var total=Number(response['public']) +Number(response['private'])  +Number(response['other']) 
     //console.log("total" + total);    
     this.PAPublic=(Number(response['public'])*100/total).toFixed(0);
     //console.log("VMUAadhaar" + this.VMUAadhaar);    
     this.PAPrivate=(Number(response['private'])*100/total).toFixed(0);
     this.PAOther=(Number(response['other'])*100/total).toFixed(0);
     //console.log("VMUNonAadhaar" + this.VMUNonAadhaar);    
    
   

    this.PreAuthType2Bars = new Chart(this.PreAuthType2Chart.nativeElement, {
      type: 'bar',        
      data: {
        labels: ['Preauth Type Count'],
        datasets: [{  
          label:'Secondary'  ,        
          data: [this.PAPublic],
          backgroundColor:'#984EAD', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1,
          barThickness:25,
        },{  
          label:'Teritary'  ,        
          data: [this.PAPrivate],
          backgroundColor:'#0D9BB1', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1,
          barThickness:23,
          
        },{  
          label:'Unknown'  ,        
          data: [this.PAOther],
          backgroundColor:'#EEEEEE', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1,
          barThickness:25,
          
        }],
      },
      
      options: {
        plugins:{
          legend:{labels:{
               
            boxHeight:5,
            boxWidth:5,
            font:{size:10} ,
            color:'#F5F5F5',
          },
          position:"bottom"},datalabels: {
            display: true,
            align: 'center',
            color:'black',formatter: function(value, context) {
              var rt="";
              if(value!="0")
              rt=value+"%"
              return rt;}
                                  
          },tooltip: {
            callbacks: {
                label: function(context) {
                  
                    let label = context.dataset.label || '';
    
                    return label +": " + context.parsed.x+"%";
                }
            }
        }
        },          
        indexAxis: 'y',
        elements: {
          line: {
            borderWidth: 0,
            
          }
        },scales:{x:{stacked: true,display:false,grid:{display:false}},y:{stacked: true,display:false,grid:{display:false}}}
       
      }
    });
  }
});

}

GetEmpanelledActive(state_code:any,district_code:any)
    {

    this.pmjReq.type='';  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetEmpanelledActive(this.pmjReq).subscribe((response) => {
      console.log(response);
    if(response['status']=="true")
    {      
      var total=Number(response['greater5'])+Number(response['greater1'])
      this.emp_Greater5=(Number(response['greater5'])*100/total).toFixed(2);
      this.emp_Greater1=(Number(response['greater1'])*100/total).toFixed(2);
    }
    });
  }

  GetACGPM(state_code:any,district_code:any)
    {

    this.pmjReq.type='ACGPM';  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetPerMin(this.pmjReq).subscribe((response) => {
      console.log(response);
    if(response['status']=="true")
    {      
      this.ACGPM=response['permin'];
    }
    });
  }

  GetPAPM(state_code:any,district_code:any)
    {

    this.pmjReq.type='PAPM';  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetPerMin(this.pmjReq).subscribe((response) => {
      console.log(response);
    if(response['status']=="true")
    {      
      this.PAPM=response['permin'];
    }
    });
  }

  GetEMPM(state_code:any,district_code:any)
    {

    this.pmjReq.type='EMPM';  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetPerMin(this.pmjReq).subscribe((response) => {
      console.log(response);
    if(response['status']=="true")
    {      
      this.EMPM=response['permin'];
    }
    });
  }

GetEmpanelledHospitalType(public_count:any,private_count:any)
{
  this.HospitalTypeBars = new Chart(this.HospitalTypeChart.nativeElement, {
  type: 'bar',        
  data: {
    labels: ['Hospital Type'],
    datasets: [{  
      label:'Public'  ,        
      data: [Number(public_count).toFixed(0)],
      backgroundColor:'#F6F6F6', // array should have same number of elements as number of dataset
      borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
      borderWidth: 1,
      barThickness:25,
    },{  
      label:'Private'  ,        
      data: [Number(private_count).toFixed(0)],
      backgroundColor:'#6CA82E', // array should have same number of elements as number of dataset
      borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
      borderWidth: 1,
      barThickness:23,
      
    }],
  },
  
  options: {
    plugins:{
      legend:{labels:{
           
        boxHeight:5,
        boxWidth:5,
        font:{size:10} ,
        color:'#F5F5F5',
      },
      position:"bottom"},datalabels: {
        display: true,
        align: 'center',
        color:'black',formatter: function(value, context) {
          return value+"%";}
                              
      },tooltip: {
        callbacks: {
            label: function(context) {
              
                let label = context.dataset.label || '';

                return label +": " + context.parsed.x+"%";
            }
        }
    }
    },          
    indexAxis: 'y',
    elements: {
      line: {
        borderWidth: 0,
        
      }
    },scales:{x:{stacked: true,display:false,grid:{display:false}},y:{stacked: true,display:false,grid:{display:false}}}
   
  }
});}

GetOPCStateWise(type:any,rpttype:any,state_code:any,district_code:any)
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
      //console.log("Test "+this.chResp.list?.text);  
     
      this.OPCStateTextArr = [];
      this.OPCStateValueArr = [];
      this.OPCtxtArr = [];
     
        this.OPCtxtArr=this.chResp.list;
       
          for(var i in this.OPCtxtArr)
          {
            this.OPCStateTextArr.push(this.OPCtxtArr[i]['text']);
            //this.ACIStateValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));           
            this.OPCStateValueArr.push(this.OPCtxtArr[i]['value']);           
          }
          
      this.OPCStatebars = new Chart(this.OPCStateChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.OPCStateTextArr,
          datasets: [{  
            label:'Outgoing Portability Cases'  ,        
            data: this.OPCStateValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            
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
           /* tooltip: {
              callbacks: {
                  label: function(context) {
                    
                      let label = context.dataset.label || '';

                      return label +": " + context.parsed.x+"L";
                  }
              }
          }*/
          },          
          indexAxis: 'x',          
          elements: {
            line: {
              borderWidth: 0,              
            }
          },
          scales:{x:{grid:{display:false},position:'bottom',},y:{grid:{display:false}}}
        }
      });
    }
    });
   }

   GetIPCStateWise(type:any,rpttype:any,state_code:any,district_code:any)
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
      //console.log("Test "+this.chResp.list?.text);  
     
      this.IPCStateTextArr = [];
      this.IPCStateValueArr = [];
      this.IPCtxtArr = [];
     
        this.IPCtxtArr=this.chResp.list;
       
          for(var i in this.IPCtxtArr)
          {
            this.IPCStateTextArr.push(this.IPCtxtArr[i]['text']);
            //this.ACIStateValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));           
            this.IPCStateValueArr.push(this.IPCtxtArr[i]['value']);           
          }
          
      this.IPCStatebars = new Chart(this.IPCStateChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.IPCStateTextArr,
          datasets: [{  
            label:'Incoming Portability Cases'  ,        
            data: this.IPCStateValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            
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
           /* tooltip: {
              callbacks: {
                  label: function(context) {
                    
                      let label = context.dataset.label || '';

                      return label +": " + context.parsed.x+"L";
                  }
              }
          }*/
          },          
          indexAxis: 'x',          
          elements: {
            line: {
              borderWidth: 0,              
            }
          },
          scales:{x:{grid:{display:false},position:'bottom',},y:{grid:{display:false}}}
        }
      });
    }
    });
   }


   GetClaimStatus(state_code:any,district_code:any)
   {
    this.pmjReq.type="CS";  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";     
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => {  
      this.chResp=response;            
      if(this.chResp.status=="true")
      {
        
       this.CScolor=[];
       
       this.CScolor.push('#3C8DBC');
       this.CScolor.push('#00C0EF');
       this.CScolor.push('#00A65A');
       this.CScolor.push('#F56954');

       this.CScolor.push('#F54394');
       this.CScolor.push('#F39C12');


        this.CSTextArr = [];
        this.CSValueArr = [];
        this.CStxtArr = [];
        //this.jsonDataHPRAF=[];
          
          this.CStxtArr=this.chResp.list;
          var total=0;
          for(var i in this.CStxtArr)
          {
            total=total+Number(this.CStxtArr[i]['value']);
          }

            for(var i in this.CStxtArr)
            {
              this.CSTextArr.push(this.CStxtArr[i]['text']);
              this.CSValueArr.push((Number(this.CStxtArr[i]['value'])*100/total).toFixed(0));
            }

              
      this.CSBars = new Chart(this.CSChart.nativeElement, {
        type: 'doughnut',        
        data: {
          labels: this.CSTextArr,
          datasets: [{  
            label:'Gender'  ,        
            data: this.CSValueArr,
            backgroundColor: this.CScolor, // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 0,
          }]
        },
        options: {
          plugins:{
            legend:{
              labels:{
               
                boxHeight:5,
                boxWidth:5,
                font:{size:10} ,
              },
              position:"left"
            },
            datalabels: {
              display:false,
              color:'white'
            },tooltip: {
              callbacks: {
                  label: function(context) {
                    
                    let label = context.label;

                      return label +": " +context.parsed+"%";
                  }
              }
          }
          },
          indexAxis: 'x',
        
          elements: {
            line: {
              borderWidth: 0,
              
            }
          },
        }
      });

    }
    });
     
   }


   GetOverDueClaimStatus(state_code:any,district_code:any)
   {
    this.pmjReq.type="OCS";  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";     
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => {  
      this.chResp=response;            
      if(this.chResp.status=="true")
      {
        
       this.OCScolor=[];
       
       this.OCScolor.push('#3C8DBC');
       this.OCScolor.push('#00C0EF');
       this.OCScolor.push('#00A65A');
       this.OCScolor.push('#F56954');

       this.OCScolor.push('#F54394');
       this.OCScolor.push('#F39C12');


        this.OCSTextArr = [];
        this.OCSValueArr = [];
        this.OCStxtArr = [];
        //this.jsonDataHPRAF=[];
          
          this.OCStxtArr=this.chResp.list;
          var total=0;
          for(var i in this.OCStxtArr)
            {
              total=total+Number(this.OCStxtArr[i]['value']);
            }
            for(var i in this.OCStxtArr)
            {
              this.OCSTextArr.push(this.OCStxtArr[i]['text']);
              this.OCSValueArr.push((Number(this.OCStxtArr[i]['value'])*100/total).toFixed(0));
            }

              
      this.OCSBars = new Chart(this.OCSChart.nativeElement, {
        type: 'doughnut',        
        data: {
          labels: this.OCSTextArr,
          datasets: [{  
            label:'Gender'  ,        
            data: this.OCSValueArr,
            backgroundColor: this.OCScolor, // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 0,
          }]
        },
        options: {
          plugins:{
            legend:{
              labels:{
               
                boxHeight:5,
                boxWidth:5,
                font:{size:10} ,
              },
              position:"left"
            },
            datalabels: {
              display:false,
              color:'white'
            },tooltip: {
              callbacks: {
                  label: function(context) {
                    
                    let label = context.label;

                      return label +": " +context.parsed+"%";
                  }
              }
          }
          },
          indexAxis: 'x',
        
          elements: {
            line: {
              borderWidth: 0,
              
            }
          },
        }
      });

    }
    });
     
   }

   }



