
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart,registerables } from 'chart.js';

import { ApiserviceService } from '../service/apiservice.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { data } from 'jquery';
import { StnameReq } from '../model/stname-req';
import { ThrowStmt } from '@angular/compiler';
import { TreatPatientReq } from '../model/treat-patient-req';


import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { UserdetailsReq } from '../model/userdetails-req';
import { DatePipe } from '@angular/common';
import { EncrDecrService } from '../model/encr-decr-service';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-home-erupi',
  templateUrl: './home-erupi.component.html',
  styleUrls: ['./home-erupi.component.css']
})
export class HomeErupiComponent implements OnInit {

  pageData = {
    org_name_List: [] as any[],
    bank_issuer_List: [] as any[],
    
  }
  totalData = {
    org_name_List: [] as any[],
    bank_issuer_List: [] as any[],
    
  }

  @ViewChild('ERUPICreatedChart') ERUPICreatedChart:any;
  @ViewChild('ERUPIRedeemedChart') ERUPIRedeemedChart:any;
  @ViewChild('ERUPITOPVoucherChart') ERUPITOPVoucherChart: any;
  @ViewChild('ERUPITOPPlacedChart') ERUPITOPPlacedChart: any;

  ERUPICreatedBars:any;
  ERUPICreatedtext:any;
  ERUPICreated_count:any;
  ERUPICreated_amount:any;
  ERUPICreated_arr:any;

  ERUPIRedeemedBars:any;
  ERUPIRedeemedtext:any;
  ERUPIRedeemed_count:any;
  ERUPIRedeemed_amount:any;
  ERUPIRedeemed_arr:any;
  ERUPICreated_rpttype:any;
  ERUPICreated_type:any;

  ERUPIRedeemed_rpttype:any;
  ERUPIRedeemed_type:any;


  ERUPITOPVoucherBars:any;
  ERUPITOPVouchertext:any;
  ERUPITOPVoucher_value:any;  
  ERUPITOPVoucher_arr:any;
  ERUPITOPVoucher_rpttype:any;
  

  ERUPITOPPlacedBars:any;
  ERUPITOPPlacedtext:any;
  ERUPITOPPlaced_value:any;  
  ERUPITOPPlaced_arr:any;
  ERUPITOPPlaced_rpttype:any;

  constructor(public apiService: ApiserviceService,
    public router: Router) {

      this.ERUPICreated_rpttype="T";
      this.ERUPICreated_type="C";
      this.ERUPIRedeemed_rpttype="T";
      this.ERUPIRedeemed_type="C";
      this.ERUPITOPVoucher_rpttype="T";
      this.ERUPITOPPlaced_rpttype="T";
     }

  ngOnInit(): void {
    this.load_Org_wise_Report();
    this.load_bank_issuer_Report();
    this.load_Voucher_Created_Trends(this.ERUPICreated_type,this.ERUPICreated_rpttype);
    this.load_Voucher_Redeemed_Trends(this.ERUPIRedeemed_type,this.ERUPIRedeemed_rpttype);
    this.load_Top_Voucher(this.ERUPITOPVoucher_rpttype);
    this.load_Top_Placed(this.ERUPITOPPlaced_rpttype);
  }

  load_Org_wise_Report() {
    this.apiService.GetERUPI_Report({
      "type":"Org_Wise",     
      "rpttype":""
    }).subscribe((resp: any)=>{
      this.pageData.org_name_List = resp.list;  
      
      if(resp.list.length) {
        const keys = Object.keys(resp.list[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.list.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.org_name_List = [totalData]
      } else {
        this.totalData.org_name_List = []
      }      
      
    })
  }

  load_bank_issuer_Report() {
    this.apiService.GetERUPI_Report({
      "type":"bank_issuer",     
      "rpttype":""
    }).subscribe((resp: any)=>{
      this.pageData.bank_issuer_List = resp.list;  
      
      if(resp.list.length) {
        const keys = Object.keys(resp.list[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.list.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.bank_issuer_List = [totalData]
      } else {
        this.totalData.bank_issuer_List = []
      }      
      
    })
  }

  load_Voucher_Created_Trends(type:any, rpttype:any) {
    this.apiService.GetERUPI_Report({
      "type":"create_trends",     
      "rpttype":rpttype
    }).subscribe((resp: any)=>{
    
      if(resp.list.length) {
        
        this.ERUPICreated_amount = [];
        this.ERUPICreated_count = [];
        this.ERUPICreatedtext = [];
        this.ERUPICreated_arr=[];
        this.ERUPICreated_arr=resp.list;
             
            for(var i in this.ERUPICreated_arr)
            {
              this.ERUPICreatedtext.push(this.ERUPICreated_arr[i]['dt']);
              this.ERUPICreated_count.push(this.ERUPICreated_arr[i]['total_count']);
              this.ERUPICreated_amount.push(this.ERUPICreated_arr[i]['total_amount']);
              //this.ACGDTcolor.push(this.getRandomColor());
            } 
       if(type=="C")
       {
        this.ERUPICreatedBars = new Chart(this.ERUPICreatedChart.nativeElement, {
          type: 'line',        
          data: {
            labels: this.ERUPICreatedtext,
            datasets: [{  
              label:'Voucher Created - Trends'  ,        
              data: this.ERUPICreated_count,
              backgroundColor: 'rgba(132, 219, 148,.7)',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
              borderColor: 'rgba(132, 219, 148,.7)',// array should have same number of elements as number of dataset
              borderWidth: 1.5,
              fill:true,
              pointRadius:2,
              pointBorderColor:'rgba(132, 219, 148)',
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
      if(type=="A")
      {
        this.ERUPICreatedBars = new Chart(this.ERUPICreatedChart.nativeElement, {
          type: 'line',        
          data: {
            labels: this.ERUPICreatedtext,
            datasets: [{  
              label:'Voucher Created - Trends'  ,        
              data: this.ERUPICreated_amount,
              backgroundColor: 'rgba(132, 219, 148,.7)',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
              borderColor: 'rgba(132, 219, 148,.7)',// array should have same number of elements as number of dataset
              borderWidth: 1.5,
              fill:true,
              pointRadius:2,
              pointBorderColor:'rgba(132, 219, 148)',
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

        }
             
      
    })
  }


  load_Voucher_Redeemed_Trends(type:any, rpttype:any) {
    this.apiService.GetERUPI_Report({
      "type":"redeem_trends",     
      "rpttype":rpttype
    }).subscribe((resp: any)=>{
      
      if(resp.list.length) {
        
        this.ERUPIRedeemed_amount = [];
        this.ERUPIRedeemed_count = [];
        this.ERUPIRedeemedtext = [];
        this.ERUPIRedeemed_arr=[];
        this.ERUPIRedeemed_arr=resp.list;
             
            for(var i in this.ERUPIRedeemed_arr)
            {
              this.ERUPIRedeemedtext.push(this.ERUPIRedeemed_arr[i]['dt']);
              this.ERUPIRedeemed_count.push(this.ERUPIRedeemed_arr[i]['total_count']);
              this.ERUPIRedeemed_amount.push(this.ERUPIRedeemed_arr[i]['total_amount']);
              //this.ACGDTcolor.push(this.getRandomColor());
            } 
       if(type=="C")
       {
        this.ERUPIRedeemedBars = new Chart(this.ERUPIRedeemedChart.nativeElement, {
          type: 'line',        
          data: {
            labels: this.ERUPIRedeemedtext,
            datasets: [{  
              label:'Voucher Redeemed - Trends'  ,        
              data: this.ERUPIRedeemed_count,
              backgroundColor: 'rgba(135, 171, 229,.7)',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
              borderColor: 'rgba(135, 171, 229,.7)',// array should have same number of elements as number of dataset
              borderWidth: 1.5,
              fill:true,
              pointRadius:2,
              pointBorderColor:'rgba(135, 171, 229)',
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
      if(type=="A")
      this.ERUPIRedeemedBars = new Chart(this.ERUPIRedeemedChart.nativeElement, {
        type: 'line',        
        data: {
          labels: this.ERUPIRedeemedtext,
          datasets: [{  
            label:'Voucher Redeemed - Trends'  ,        
            data: this.ERUPIRedeemed_amount,
            backgroundColor: 'rgba(135, 171, 229,.7)',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgba(135, 171, 229,.7)',// array should have same number of elements as number of dataset
            borderWidth: 1.5,
            fill:true,
            pointRadius:2,
            pointBorderColor:'rgba(135, 171, 229)',
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
             
      
    })
  }

  onToggle(id:any)
  {
    let el = <HTMLElement>document.getElementById(id);
    
    if(el.ariaPressed=="false")
    {
      if(id=="created")
      {
        this.ERUPICreated_type="A";
        this.ERUPICreatedBars.destroy();
        this.load_Voucher_Created_Trends(this.ERUPICreated_type,this.ERUPICreated_rpttype);

      }
      if(id=="redeemed")
      {
        this.ERUPIRedeemed_type="A";
        this.ERUPIRedeemedBars.destroy();
        this.load_Voucher_Redeemed_Trends(this.ERUPIRedeemed_type,this.ERUPIRedeemed_rpttype);
      }
      
    }
    else
    {
      if(id=="created")
      {
        this.ERUPICreated_type="C";
        this.ERUPICreatedBars.destroy();
        this.load_Voucher_Created_Trends(this.ERUPICreated_type,this.ERUPICreated_rpttype);

      }
      if(id=="redeemed")
      {
        this.ERUPIRedeemed_type="C";
        this.ERUPIRedeemedBars.destroy();
        this.load_Voucher_Redeemed_Trends(this.ERUPIRedeemed_type,this.ERUPIRedeemed_rpttype);
      }
    }
}


ERUPICTDclickme(type:any){ 
  
  let elementW = <HTMLScriptElement>document.getElementById('ERUPICTDW');
  let elementT = <HTMLScriptElement>document.getElementById('ERUPICTDT');
  
  //console.log(elementW);
  if(type=='W')
  {      
    elementW.className = 'active';
    elementT.className = '';
    
  }
  if(type=='T')
  {      
      elementW.className = '';
      elementT.className = 'active';
      
  } 
  this.ERUPICreated_rpttype=type;
  this.ERUPICreatedBars.destroy();
  this.load_Voucher_Created_Trends(this.ERUPICreated_type,this.ERUPICreated_rpttype);

}

ERUPIRTDclickme(type:any){ 
  
  let elementW = <HTMLScriptElement>document.getElementById('ERUPIRTDW');
  let elementT = <HTMLScriptElement>document.getElementById('ERUPIRTDT');
  
  //console.log(elementW);
  if(type=='W')
  {      
    elementW.className = 'active';
    elementT.className = '';
    
  }
  if(type=='T')
  {      
      elementW.className = '';
      elementT.className = 'active';
      
  } 
  this.ERUPIRedeemed_rpttype=type;
  this.ERUPIRedeemedBars.destroy();
    this.load_Voucher_Redeemed_Trends(this.ERUPIRedeemed_type,this.ERUPIRedeemed_rpttype);


}


load_Top_Voucher(rpttype:any) {
  this.apiService.GetERUPI_Report({
    "type":"top_voucher",     
    "rpttype":rpttype
  }).subscribe((resp: any)=>{
    console.log(resp.list);
    if(resp.list.length) {
      
    
      this.ERUPITOPVouchertext = [];
      this.ERUPITOPVoucher_value = [];
      this.ERUPITOPVoucher_arr = [];
     
      this.ERUPITOPVoucher_arr=resp.list;
           
          for(var i in this.ERUPITOPVoucher_arr)
          {
            this.ERUPITOPVouchertext.push(this.ERUPITOPVoucher_arr[i]['text']);
            this.ERUPITOPVoucher_value.push(this.ERUPITOPVoucher_arr[i]['value']);
           
            //this.ACGDTcolor.push(this.getRandomColor());
          } 
          this.ERUPITOPVoucherBars = new Chart(this.ERUPITOPVoucherChart.nativeElement, {
            type: 'bar',        
            data: {
              labels: this.ERUPITOPVouchertext,
              datasets: [{  
                label:'Top Vouchers'  ,        
                data: this.ERUPITOPVoucher_value,
                //backgroundColor:gradient, // array should have same number of elements as number of dataset
                backgroundColor:'#a9ed9d',
                //borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
                barThickness:14,            
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
              },          
              indexAxis: 'y',scales:{x:{grid:{display:false}},y:{grid:{display:false}}}, 
              elements: {
                line: {
                  borderWidth: 0,
                  
                }
              },
              
            }
          });
      }
           
    
  })
}


load_Top_Placed(rpttype:any) {
  this.apiService.GetERUPI_Report({
    "type":"top_placed",     
    "rpttype":rpttype
  }).subscribe((resp: any)=>{
    console.log(resp.list);
    if(resp.list.length) {
      
    
      this.ERUPITOPPlacedtext = [];
      this.ERUPITOPPlaced_value = [];
      this.ERUPITOPPlaced_arr = [];
     
      this.ERUPITOPPlaced_arr=resp.list;
           
          for(var i in this.ERUPITOPVoucher_arr)
          {
            this.ERUPITOPPlacedtext.push(this.ERUPITOPPlaced_arr[i]['text']);
            this.ERUPITOPPlaced_value.push(this.ERUPITOPPlaced_arr[i]['value']);
           
            //this.ACGDTcolor.push(this.getRandomColor());
          } 
          this.ERUPITOPPlacedBars = new Chart(this.ERUPITOPPlacedChart.nativeElement, {
            type: 'bar',        
            data: {
              labels: this.ERUPITOPPlacedtext,
              datasets: [{  
                label:'Top Vouchers'  ,        
                data: this.ERUPITOPPlaced_value,
                //backgroundColor:gradient, // array should have same number of elements as number of dataset
                backgroundColor:'#a9ed9d',
                //borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
                barThickness:14,            
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
              },          
              indexAxis: 'y',scales:{x:{grid:{display:false}},y:{grid:{display:false}}}, 
              elements: {
                line: {
                  borderWidth: 0,
                  
                }
              },
              
            }
          });
      }
           
    
  })
}

}
