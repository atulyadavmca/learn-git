import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EncrDecrService } from '../model/encr-decr-service';
import { ApiserviceService } from '../service/apiservice.service';
import { Chart,registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pmjreq } from '../model/pmjreq';
Chart.register(...registerables);
@Component({
  selector: 'app-pmjay-claims',
  templateUrl: './pmjay-claims.component.html',
  styleUrls: ['./pmjay-claims.component.css']
})
export class PmjayClaimsComponent implements OnInit {

  pending_hosp_c:any;
  pending_hosp_a:any;
  pending_cex_cpd_c:any;
  pending_cex_cpd_a:any;
  pending_aco_c:any;
  pending_aco_a:any;
  pending_sha_c:any;
  pending_sha_a:any;
  pending_bank_c:any;
  pending_bank_a:any;

  arr_pending_hosp_c:any;
  arr_pending_hosp_a:any;
  arr_pending_cex_cpd_c:any;
  arr_pending_cex_cpd_a:any;
  arr_pending_aco_c:any;
  arr_pending_aco_a:any;
  arr_pending_sha_c:any;
  arr_pending_sha_a:any;
  arr_pending_bank_c:any;
  arr_pending_bank_a:any;
  arr_TMS_Claim_S_D_H_List:any;
  arr_TMS_Claim_Text:any;
  arr_TMS_Claim_State_Code:any;
  arr_TMS_Claim_District_Code:any;
  arr_TMS_Claim_State_Name:any;
  arr_TMS_Claim_District_Name:any;
  arr_TMS_Claim_Hosp_Code:any;
  TMSCLAIMSBars:any;
  onToggleType:any;
  TMS_Claim_S_D_H_List:any;
  TMSState_District:any;
  statedatehospwise:any;
  encrdecrdervice:EncrDecrService;
  pmjReq:Pmjreq;
  ddlTMSstatename:any="";
  ddlTMSdistrictname:any="";
  ddlTMShospname:any="";
  TMSstateList:any;
  TMSdistrictList:any;
  TMShospList:any;
  uploadDate:any;

  /********TAT Variables */
  claims_sub:any;
  claims_sub_amt:any;
  claims_app:any;
  claims_app_amt:any;
  claims_app_for_tat:any;
  claims_app_amt_for_tat:any;
  claims_rej:any;
  claims_rej_amt:any;
  claims_paid:any;
  claims_paid_amt:any;
  claims_paid_for_tat:any;
  claims_paid_amt_for_tat:any;
  claims_pending:any;
  claims_pending_amt:any;
  claim_app_tat:any;
  claim_pay_tat:any;
  claims_app_0_10:any;
  claims_app_10_15:any;
  claims_app_15_30:any;
  claims_app_30_plus:any;
  claims_app_0_10_amount:any;
  claims_app_10_15_amount:any;
  claims_app_15_30_amount:any;
  claims_app_30_plus_amount:any;
  claims_paid_0_15:any;
  claims_paid_15_30:any;
  claims_paid_30_45:any;
  claims_paid_45:any;
  claims_paid_0_15_amount:any;
  claims_paid_15_30_amount:any;
  claims_paid_30_45_amount:any;
  claims_paid_45_amount:any;

  claims_app_arr:any;
  claims_app_0_10_arr:any;
  claims_app_10_15_arr:any;
  claims_app_15_30_arr:any;
  claims_app_30_plus_arr:any;

  claims_paid_arr:any;
  claims_paid_0_15_arr:any;
  claims_paid_15_30_arr:any;
  claims_paid_30_45_arr:any;
  claims_paid_45_arr:any;
  tms_claim_text_arr:any;

  TMSAPPTATBars:any;
  TMSPAYTATBars:any;
  TMSAPPSTATBars:any;
  TMSPAYSTATBars:any;
  /***************END */
@ViewChild('TMSCLAIMSChart') TMSCLAIMSChart:any;
@ViewChild('TMSAPPTATChart') TMSAPPTATChart:any;
@ViewChild('TMSPAYTATChart') TMSPAYTATChart:any;
@ViewChild('TMSAPPSTATChart') TMSAPPSTATChart:any;
@ViewChild('TMSPAYSTATChart') TMSPAYSTATChart:any;
  constructor( public apiService: ApiserviceService,public router: Router) { 
    this.encrdecrdervice=new EncrDecrService();
    this.TMSState_District="S";
    this.pmjReq=new Pmjreq();
  }

  ngOnInit(): void {
    this.GetTMSState_Master();
    this.getTMS_CLAIM_S_D_H();
    this.getTMS_CLAIM_TAT();
    this.getTMS_CLAIM_State_TAT();
    this.onToggleType="C";
    this.GetTMSCLAIM_S_D_H_Chart("","","",this.onToggleType);
  }

  GetTMSState_Master()
  {
    this.ddlTMSdistrictname="";
    this.ddlTMShospname="";
    this.pmjReq.type=this.encrdecrdervice.encrypted('TMSCLAIMSM');
    this.pmjReq.state_code="";
    this.pmjReq.district_code="";
    this.pmjReq.rpttype="";
   this.apiService.GetStateDist(this.pmjReq).subscribe((response) => {
     //console.log(response);
       if(response['status']=="true")
   {
     this.TMSstateList=response['list'];
     //console.log(this.stateList);
   }
   });

  }

  GetTMSDistrict_Master()
  {
    
    this.pmjReq.type=this.encrdecrdervice.encrypted('TMSCLAIMDM');
    this.pmjReq.state_code=this.encrdecrdervice.encrypted(this.ddlTMSstatename)||"";
    this.pmjReq.district_code="";
    this.pmjReq.rpttype="";
   this.apiService.GetStateDist(this.pmjReq).subscribe((response) => {
     if(response['status']=="true")
   {
     this.TMSdistrictList=response['list'];
   }
   });

  }

  GetTMSHosp_Master()
  {
    this.pmjReq.type=this.encrdecrdervice.encrypted('TMSCLAIMHM');
    this.pmjReq.state_code=this.encrdecrdervice.encrypted(this.ddlTMSstatename)||"";
    this.pmjReq.district_code=this.encrdecrdervice.encrypted(this.ddlTMSdistrictname)||"";
    this.pmjReq.rpttype="";
   this.apiService.GetStateDist(this.pmjReq).subscribe((response) => {
       if(response['status']=="true")
   {
     this.TMShospList=response['list'];
   }
   });

  }

  getTMSDist()
  {
    this.ddlTMShospname="";
    this.ddlTMSdistrictname="";
    this.GetTMSDistrict_Master();
    this.GetTMSHosp_Master();
  }
  getTMSHosp()
  {
    this.GetTMSHosp_Master();
    this.ddlTMShospname="";
  }

  getTMS_CLAIM_S_D_H()
  {
    this.apiService.GetTMSCALIM_S_D_H({      
      "type":"TH",
      "state_code":this.ddlTMSstatename,
      "district_code":this.ddlTMSdistrictname,
      "hosp_code":this.ddlTMShospname,
      "rpttype": ""     
    }).subscribe((resp: any)=>{   
      
      if(resp.status=="true")
      {
        this.TMS_Claim_S_D_H_List=resp.list;
      this.pending_hosp_c=this.getCommaValue(resp.list[0]["pending_hospital"]);
      this.pending_hosp_a=this.getToCR(resp.list[0]["pending_hospital_a"]);
      this.pending_cex_cpd_c=this.getCommaValue(resp.list[0]["pending_cex_cpd"]);
      this.pending_cex_cpd_a=this.getToCR(resp.list[0]["pending_cex_cpd_a"]);
      this.pending_aco_c=this.getCommaValue(resp.list[0]["pending_aco"]);
      this.pending_aco_a=this.getToCR(resp.list[0]["pending_aco_a"]);
      this.pending_sha_c=this.getCommaValue(resp.list[0]["pending_sha"]);
      this.pending_sha_a=this.getToCR(resp.list[0]["pending_sha_a"]);
      this.pending_bank_c=this.getCommaValue(resp.list[0]["pending_bank"]);
      this.pending_bank_a=this.getToCR(resp.list[0]["pending_bank_a"]);
      }
      
    })
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
  else
  num=nStr
  return num;
}
  getToCR(nStr:any)
   {
    var num;
    num=Number(nStr);
    if(num>=100000)
      num=String((num/10000000).toFixed(2))+' Cr';
    else 
      num=String((num/100000).toFixed(2))+' L';

      var val="0";
    var str=String(num);
    var splitted = str.split(".", 2); 
    if(splitted.length==2)
    var val=this.getCommaValue(splitted[0])+"."+splitted[1];
    else
    val=String(num);

    return val;
   }

   getToLac(nStr:any)
   {
    var num;
    num=Number(nStr);
    
      num=String((num/100000).toFixed(2));

      var val="0";
    var str=String(num);
    var splitted = str.split(".", 2); 
    if(splitted.length==2)
    var val=this.getCommaValue(splitted[0])+"."+splitted[1];
    else
    val=String(num);

    return val;
   }
   getTMSCLAIM()
   {
    this.getTMS_CLAIM_S_D_H();
    this.getTMS_CLAIM_TAT();
    this.TMSCLAIMSBars.destroy();
   this.GetTMSCLAIM_S_D_H_Chart(this.ddlTMSstatename,this.ddlTMSdistrictname,this.ddlTMShospname, this.onToggleType);

   }
   


   GetTMSCLAIM_S_D_H_Chart(ddlTMSstatename:any,ddlTMSdistrictname:any,ddlTMShospname:any, rpttype:any)
   {  
    let divTMSstatewisecount = <HTMLScriptElement>document.getElementById('divTMSstatewisecount');
    let divTMSstatewiseamount = <HTMLScriptElement>document.getElementById('divTMSstatewiseamount');
    let chartstatewise = <HTMLScriptElement>document.getElementById('chartstatewise');
    let STLac = <HTMLScriptElement>document.getElementById('STTMSLac');   
    var barThikness=14;  
    var fontsize=12; 
    this.apiService.GetTMSCALIM_S_D_H({      
      "type":"TMSS",
      "state_code":ddlTMSstatename,
      "district_code":ddlTMSdistrictname,
      "hosp_code":ddlTMShospname,
      "rpttype": ""     
    }).subscribe((resp: any)=>{   
    
      if(resp.status=="true")
      {
        this.arr_pending_hosp_c=[];
        this.arr_pending_hosp_a=[];
        this.arr_pending_cex_cpd_c=[];
        this.arr_pending_cex_cpd_a=[];
        this.arr_pending_aco_c=[];
        this.arr_pending_aco_a=[];
        this.arr_pending_sha_c=[];
        this.arr_pending_sha_a=[];
        this.arr_pending_bank_c=[];
        this.arr_pending_bank_a=[];
        this.arr_TMS_Claim_S_D_H_List=[];
        this.arr_TMS_Claim_Text=[];
        this.arr_TMS_Claim_State_Code=[];
        this.arr_TMS_Claim_District_Code=[];
        this.arr_TMS_Claim_State_Name=[];
        this.arr_TMS_Claim_District_Name=[];
        this.arr_TMS_Claim_Hosp_Code=[];
        this.arr_TMS_Claim_S_D_H_List=resp.list;
        for(var i in this.arr_TMS_Claim_S_D_H_List)
            {
              if(rpttype=="C")
              {
                this.arr_pending_hosp_c.push(this.arr_TMS_Claim_S_D_H_List[i]['pending_hospital']);
                this.arr_pending_cex_cpd_c.push(this.arr_TMS_Claim_S_D_H_List[i]['pending_cex_cpd']);
                this.arr_pending_aco_c.push(this.arr_TMS_Claim_S_D_H_List[i]['pending_aco']);
                this.arr_pending_sha_c.push(this.arr_TMS_Claim_S_D_H_List[i]['pending_sha']);
                this.arr_pending_bank_c.push(this.arr_TMS_Claim_S_D_H_List[i]['pending_bank']);
              }
              if(rpttype=="A")
              {
                this.arr_pending_hosp_c.push(this.arr_TMS_Claim_S_D_H_List[i]['pending_hospital_a']);
                this.arr_pending_cex_cpd_c.push(this.arr_TMS_Claim_S_D_H_List[i]['pending_cex_cpd_a']);
                this.arr_pending_aco_c.push(this.arr_TMS_Claim_S_D_H_List[i]['pending_aco_a']);
                this.arr_pending_sha_c.push(this.arr_TMS_Claim_S_D_H_List[i]['pending_sha_a']);
                this.arr_pending_bank_c.push(this.arr_TMS_Claim_S_D_H_List[i]['pending_bank_a']);
              }
              this.arr_TMS_Claim_Text.push(this.arr_TMS_Claim_S_D_H_List[i]['text']);
              this.arr_TMS_Claim_State_Code.push(this.arr_TMS_Claim_S_D_H_List[i]['state_code']);
              this.arr_TMS_Claim_District_Code.push(this.arr_TMS_Claim_S_D_H_List[i]['district_code']);
              this.arr_TMS_Claim_Hosp_Code.push(this.arr_TMS_Claim_S_D_H_List[i]['hosp_code']);

              this.arr_TMS_Claim_State_Name.push(this.arr_TMS_Claim_S_D_H_List[i]['state_name']);
              this.arr_TMS_Claim_District_Name.push(this.arr_TMS_Claim_S_D_H_List[i]['district_name']);
              
            }
            if(this.arr_TMS_Claim_S_D_H_List.length>37 && this.arr_TMS_Claim_S_D_H_List.length<60)
            {
                barThikness=10;
                fontsize=10;
            }
            else if (this.arr_TMS_Claim_S_D_H_List.length>60)
            {
            barThikness=7;
            fontsize=10;
            }
            if(ddlTMSstatename=="" || ddlTMSdistrictname=="")
            {              
              divTMSstatewisecount.style.display='none';
              divTMSstatewiseamount.style.display='none';
              chartstatewise.style.display='block';
            }
            else
            {
            if(rpttype=="C")  
            {
              divTMSstatewisecount.style.display='block';
              divTMSstatewiseamount.style.display='none';
              STLac.style.display="none";
            }
            if(rpttype=="A")  
            {
              divTMSstatewiseamount.style.display='block';
              divTMSstatewisecount.style.display='none';
              STLac.style.display="inline-block";
            }
            chartstatewise.style.display='none';
          }
          if(ddlTMSstatename=="" && ddlTMSdistrictname=="" && ddlTMShospname=="")
          {            
              this.statedatehospwise="State";
              STLac.style.display="none";     
          }
          else if(ddlTMSstatename!="" && ddlTMSdistrictname=="" && ddlTMShospname=="")
          {
              this.statedatehospwise="District( State - "+this.arr_TMS_Claim_S_D_H_List[0]['state_name']+")";
              STLac.style.display="none";     
          }
          else
          {              
              this.statedatehospwise="Hospital(State - "+this.arr_TMS_Claim_S_D_H_List[0]['state_name']+" : District - "+this.arr_TMS_Claim_S_D_H_List[0]['district_name']+")";
              if(rpttype=="A")
              STLac.style.display="inline-block";
              else
              STLac.style.display="none";     
          }

            $('#tblTMSstatewisecount').DataTable().clear().destroy();
              setTimeout(()=>{
            $('#tblTMSstatewisecount').DataTable( {           
              pagingType: 'full_numbers',
              pageLength: 25,
              searching:true,
              paging:true,
              processing: true,                    
              lengthMenu : [10, 25,50],         
              });
              }, 1);

              $('#tblTMSstatewiseamount').DataTable().clear().destroy();
              setTimeout(()=>{
             $('#tblTMSstatewiseamount').DataTable( {           
              pagingType: 'full_numbers',
              pageLength: 25,
              searching:true,
              paging:true,
              processing: true,                    
              lengthMenu : [10, 25,50],         
              });
              }, 1);

            this.TMSCLAIMSBars = new Chart(this.TMSCLAIMSChart.nativeElement, {
              type: 'bar',        
              data: {
                labels: this.arr_TMS_Claim_Text,
                datasets: [{  
                  label:'Pending at Hospitals'  ,        
                  data: this.arr_pending_hosp_c,
                  backgroundColor:'#92bf8a', 
                  borderSkipped: false,
                  barThickness:barThikness
                },{  
                  label:'Pending at CEX/CPD'  ,        
                  data: this.arr_pending_cex_cpd_c,
                  backgroundColor:'#cccaca', // array should have same number of elements as number of dataset
                  //borderRadius: Number.MAX_VALUE,
                  borderSkipped: false,
                  barThickness:barThikness
                },{  
                  label:'Pending at ACO'  ,        
                  data: this.arr_pending_aco_c,
                  backgroundColor:'#afa7b8', // array should have same number of elements as number of dataset
                  //borderRadius: Number.MAX_VALUE,
                  borderSkipped: false,
                  barThickness:barThikness
                },{  
                  label:'Pending at SHA'  ,        
                  data: this.arr_pending_sha_c,
                  backgroundColor:'#a7d1cc', // array should have same number of elements as number of dataset
                  borderSkipped: false,
                  barThickness:barThikness
                },{  
                  label:'Pending at Bank'  ,        
                  data: this.arr_pending_bank_c,
                  backgroundColor:'#a6c99f', // array should have same number of elements as number of dataset
                  //borderRadius: Number.MAX_VALUE,
                  //borderRadius:3,
                  borderSkipped: false,
                  barThickness:barThikness
                }]
                
              },
              options: {
                plugins:{
                  legend:{display: true,labels:{boxHeight:8,
                    boxWidth:8,}, position:"bottom",}
                  ,
                  datalabels: {
                    display:false,
                   
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
                            let toolt="";
                            if(rpttype=="C")
                            {
                              var nStr=String(context.parsed.y);
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
      
                                toolt=  label+ " : "+num;
                            }
                            if(rpttype=="A")
                            {
                                var val=Number(context.parsed.y);                              
                                var val1=String((val/10000000).toFixed(2));
                               
                              
                                toolt=label+ " : "+val1+" Cr";
                            }
                            return toolt;
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
                onClick: (evt, item) => {
                  let index = item[0]["index"]; 
                      if(this.TMSState_District=="S")
                      {
                        this.TMSCLAIMSBars.destroy();
                        this.GetTMSCLAIM_S_D_H_Chart(this.arr_TMS_Claim_State_Code[index],"","",this.onToggleType);
                        this.TMSState_District="D";          
                      }
                      else if(this.TMSState_District=="D")
                      {
                        this.TMSCLAIMSBars.destroy();
                        this.GetTMSCLAIM_S_D_H_Chart(this.arr_TMS_Claim_State_Code[index],this.arr_TMS_Claim_District_Code[index],"",this.onToggleType);
                       this.TMSState_District="F";
                  
                      }
                      else
                      {
                        this.TMSCLAIMSBars.destroy();
                        this.GetTMSCLAIM_S_D_H_Chart("","","",this.onToggleType);
                       this.TMSState_District="S";
                      }
                },
                scales:{x:{grid:{display:false},stacked:true,suggestedMin: 50,suggestedMax: 100,ticks:{          
                  
                  maxRotation: 180,
                  minRotation: 90,
                  autoSkip: false,
                  font:{size:fontsize,family:'Roboto'},color:'#989898'
              }},y:{grid:{display:false},stacked:true,ticks:{         
                  
                font:{size:fontsize,family:'Roboto'},color:'#989898'
            }}}         
              }
            });      
      }
      
    })

  
   }
   onToggle1(id:any)
   {
    let el = <HTMLElement>document.getElementById(id);
    if(el.ariaPressed=="false")
    {
      if(id=="statewise")
      {
        this.onToggleType="A";
      }
   }
   else
   {
    if(id=="statewise")
    {
      this.onToggleType="C";
    }
   }
   this.TMSCLAIMSBars.destroy();
   this.GetTMSCLAIM_S_D_H_Chart(this.ddlTMSstatename,this.ddlTMSdistrictname,this.ddlTMShospname, this.onToggleType);
  }


  getTMS_CLAIM_TAT()
  {
    this.apiService.GetTMSCALIM_TAT({      
      "type":"TAT",
      "state_code":this.ddlTMSstatename,
      "district_code":this.ddlTMSdistrictname,
      "hosp_code":this.ddlTMShospname,
      "rpttype": ""     
    }).subscribe((resp: any)=>{   
      
      if(resp.status=="true")
      {
        
        this.claims_sub=this.getCommaValue(resp.list[0]["claims_sub"]);
        this.claims_sub_amt=this.getToCR(resp.list[0]["claims_sub_amt"]);
        this.claims_app=this.getCommaValue(resp.list[0]["claims_app"]);
        this.claims_app_amt=this.getToCR(resp.list[0]["claims_app_amt"]);
        this.claims_app_for_tat=resp.list[0]["claims_app_for_tat"];
        this.claims_app_amt_for_tat=this.getCommaValue(resp.list[0]["claims_app_amt_for_tat"]);
        this.claims_rej=this.getCommaValue(resp.list[0]["claims_rej"]);
        this.claims_rej_amt=this.getToCR(resp.list[0]["claims_rej_amt"]);
        this.claims_paid=this.getCommaValue(resp.list[0]["claims_paid"]);
        this.claims_paid_amt=this.getToCR(resp.list[0]["claims_paid_amt"]);
        this.claims_paid_for_tat=this.getCommaValue(resp.list[0]["claims_paid_for_tat"]);
        this.claims_paid_amt_for_tat=this.getCommaValue(resp.list[0]["claims_paid_amt_for_tat"]);
        this.claims_pending=this.getCommaValue(resp.list[0]["claims_pending"]);
        this.claims_pending_amt=this.getToCR(resp.list[0]["claims_pending_amt"]);
        this.claim_app_tat=Number(Number(resp.list[0]["claim_app_tat"])/Number(resp.list[0]["claims_app_for_tat"])).toFixed(2);

        this.claim_pay_tat=Number(Number(resp.list[0]["claim_pay_tat"])/Number(resp.list[0]["claims_paid_for_tat"])).toFixed(2);
        var total_claim_approved_tat=Number(resp.list[0]["claims_app_0_10"])+Number(resp.list[0]["claims_app_10_15"])+Number(resp.list[0]["claims_app_15_30"])+Number(resp.list[0]["claims_app_30_plus"]);
        
        this.claims_app_0_10=((Number(resp.list[0]["claims_app_0_10"])*100/total_claim_approved_tat));//.toFixed(2);
        this.claims_app_10_15=(Number(resp.list[0]["claims_app_10_15"])*100/total_claim_approved_tat);//.toFixed(2);
        this.claims_app_15_30=(Number(resp.list[0]["claims_app_15_30"])*100/total_claim_approved_tat);//.toFixed(2);
        this.claims_app_30_plus=(Number(resp.list[0]["claims_app_30_plus"])*100/total_claim_approved_tat);//.toFixed(2);
        this.claims_app_0_10_amount=resp.list[0]["claims_app_0_10_amount"];
        this.claims_app_10_15_amount=resp.list[0]["claims_app_10_15_amount"];
        this.claims_app_15_30_amount=resp.list[0]["claims_app_15_30_amount"];
        this.claims_app_30_plus_amount=resp.list[0]["claims_app_30_plus_amount"];

        var total_claim_paid_tat=Number(resp.list[0]["claims_paid_0_15"])+Number(resp.list[0]["claims_paid_15_30"])+Number(resp.list[0]["claims_paid_30_45"])+Number(resp.list[0]["claims_paid_45"]);

        this.claims_paid_0_15=(Number(resp.list[0]["claims_paid_0_15"])*100/total_claim_paid_tat);//.toFixed(2); 
        this.claims_paid_15_30=(Number(resp.list[0]["claims_paid_15_30"])*100/total_claim_paid_tat);//.toFixed(2);  
        this.claims_paid_30_45=(Number(resp.list[0]["claims_paid_30_45"])*100/total_claim_paid_tat);//.toFixed(2); 
        this.claims_paid_45=(Number(resp.list[0]["claims_paid_45"])*100/total_claim_paid_tat);//.toFixed(2); 

        this.claims_paid_0_15_amount=resp.list[0]["claims_paid_0_15_amount"];
        this.claims_paid_15_30_amount=resp.list[0]["claims_paid_15_30_amount"];
        this.claims_paid_30_45_amount=resp.list[0]["claims_paid_30_45_amount"];
        this.claims_paid_45_amount=resp.list[0]["claims_paid_45_amount"];

        var var_claims_app_0_10=resp.list[0]["claims_app_0_10"];
        var var_claims_app_10_15=resp.list[0]["claims_app_10_15"];
        var var_claims_app_15_30=resp.list[0]["claims_app_15_30"];
        var var_claims_app_30_plus=resp.list[0]["claims_app_30_plus"];

        var var_claims_paid_0_15=resp.list[0]["claims_paid_0_15"];
        var var_claims_paid_15_30=resp.list[0]["claims_paid_15_30"];
        var var_claims_paid_30_45=resp.list[0]["claims_paid_30_45"];
        var var_claims_paid_45=resp.list[0]["claims_paid_45"];

        var var_claims_app_0_10_amount=resp.list[0]["claims_app_0_10_amount"];
        var var_claims_app_10_15_amount=resp.list[0]["claims_app_10_15_amount"];
        var var_claims_app_15_30_amount=resp.list[0]["claims_app_15_30_amount"];
        var var_claims_app_30_plus_amount=resp.list[0]["claims_app_30_plus_amount"];

        var var_claims_paid_0_15_amount=resp.list[0]["claims_paid_0_15_amount"];
        var var_claims_paid_15_30_amount=resp.list[0]["claims_paid_15_30_amount"];
        var var_claims_paid_30_45_amount=resp.list[0]["claims_paid_30_45_amount"];
        var var_claims_paid_45_amount=resp.list[0]["claims_paid_45_amount"];

        this.TMSAPPTATBars = new Chart(this.TMSAPPTATChart.nativeElement, {
          type: 'bar',        
          data: {
            labels: ['Claim Approved TAT Bucket'],
            datasets: [{  
              label:'0-10 Days'  ,        
              data: [this.claims_app_0_10],
              backgroundColor:'#AEDCD5', // array should have same number of elements as number of dataset
              barThickness:30,
              
            },{  
              label:'10-15 Days'  ,        
              data: [this.claims_app_10_15],
              backgroundColor:'#4BA5BA', // array should have same number of elements as number of dataset
              barThickness:30,
            },{  
              label:'15-30 Days'  ,        
              data: [this.claims_app_15_30],
              backgroundColor:'#F4D166', // array should have same number of elements as number of dataset
              barThickness:30,
            }
            ,{  
              label:'30+ Days'  ,        
              data: [this.claims_app_30_plus],
              backgroundColor:'#F38B2F', // array should have same number of elements as number of dataset
              barThickness:30,
            }]
           
          },
          options: {
            plugins:{
              legend:{display: true,labels:{
               
                boxHeight:7,
                boxWidth:10,
                font:{size:12} ,
                color:'black',
              },position:"bottom"}
              ,
              datalabels: {
                display: true,
            align: 'center',
            color:'black',formatter: function(value, context) {
              return value.toFixed(2)+"%";}
               
              },tooltip: {
                callbacks: {
                    label: function(context) {
                      
                        let label = context.dataset.label || '';
                        var returnedValue="";
                        var nStr="";
                        var amount=0;
                        if(label=="0-10 Days")
                        {                     
                          nStr=var_claims_app_0_10;
                          amount=Number(var_claims_app_0_10_amount);
                          returnedValue=label +": " +context.parsed.x.toFixed(2)+"%  : ";
                        }
                        if(label=="10-15 Days")
                        {      
                          amount=Number(var_claims_app_10_15_amount);               
                          nStr=var_claims_app_10_15;
                          returnedValue=label +": " +context.parsed.x.toFixed(2)+"%  : ";
                        }
                        if(label=="15-30 Days")
                        {  
                          amount=Number(var_claims_app_15_30_amount);                   
                          nStr=var_claims_app_15_30;
                          returnedValue=label +": " +context.parsed.x.toFixed(2)+"%  : ";
                        }
                        if(label=="30+ Days")
                        {  
                          amount=Number(var_claims_app_30_plus_amount);                   
                          nStr=var_claims_app_30_plus;
                          returnedValue=label +": " +context.parsed.x.toFixed(2)+"%  : ";
                        }
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
                        else
                        num=nStr

                       var amount_int=String((amount/10000000).toFixed(2))+' Cr';

                        return returnedValue+num+' (Rs. '+amount_int+')';;
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


        this.TMSPAYTATBars = new Chart(this.TMSPAYTATChart.nativeElement, {
          type: 'bar',        
          data: {
            labels: ['Claim Payment TAT Bucket'],
            datasets: [{  
              label:'0-15 Days'  ,        
              data: [this.claims_paid_0_15],
              backgroundColor:'#B3E0A6', // array should have same number of elements as number of dataset
              barThickness:30,
              
            },{  
              label:'15-30 Days'  ,        
              data: [this.claims_paid_15_30],
              backgroundColor:'#6EB663', // array should have same number of elements as number of dataset
              barThickness:30,
            },{  
              label:'30-45 Days'  ,        
              data: [this.claims_paid_30_45],
              backgroundColor:'#CDC4C0', // array should have same number of elements as number of dataset
              barThickness:30,
            }
            ,{  
              label:'45+ Days'  ,        
              data: [this.claims_paid_45],
              backgroundColor:'#79706E', // array should have same number of elements as number of dataset
              barThickness:30,
            }]
            /*
            datasets: [{  
              //label:'Aadhaar Auth'  ,        
              data: this.TMSAVTDTotalArr,
              backgroundColor: '#00A65A',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
              borderColor: '#00A65A',// array should have same number of elements as number of dataset
              borderWidth: 3,
              fill: false,
            }]*/
          },
          options: {
            plugins:{
              legend:{display: true,labels:{
               
                boxHeight:7,
                boxWidth:10,
                font:{size:12} ,
                color:'black',
              },position:"bottom"}
              ,
              datalabels: {
                display: true,
            align: 'center',
            color:'black',formatter: function(value, context) {
              return value.toFixed(2)+"%";}
               
              },tooltip: {
                callbacks: {
                    label: function(context) {
                      
                        let label = context.dataset.label || '';
                        var returnedValue="";
                        var nStr="";
                        var amount=0;
                        if(label=="0-15 Days")
                        {    
                          amount=Number(var_claims_paid_0_15_amount);                 
                          nStr=var_claims_paid_0_15;
                          returnedValue=label +": " +context.parsed.x.toFixed(2)+"%  : ";
                        }
                        if(label=="15-30 Days")
                        {       
                          amount=Number(var_claims_paid_15_30_amount);               
                          nStr=var_claims_paid_15_30;
                          returnedValue=label +": " +context.parsed.x.toFixed(2)+"%  : ";
                        }
                        if(label=="30-45 Days")
                        {  
                          amount=Number(var_claims_paid_30_45_amount);                   
                          nStr=var_claims_paid_30_45;
                          returnedValue=label +": " +context.parsed.x.toFixed(2)+"%  : ";
                        }
                        if(label=="45+ Days")
                        {  
                          amount=Number(var_claims_paid_45_amount);              
                          nStr=var_claims_paid_45;
                          returnedValue=label +": " +context.parsed.x.toFixed(2)+"%  : ";
                        }
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
                        else
                        num=nStr

                        var amount_int=String((amount/10000000).toFixed(2))+' Cr';

                        return returnedValue+num+' (Rs. '+amount_int+')';
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
      
    })
  }



  getTMS_CLAIM_State_TAT()
  {
    this.apiService.GetTMSCALIM_TAT({      
      "type":"STAT",
      "state_code":this.ddlTMSstatename,
      "district_code":this.ddlTMSdistrictname,
      "hosp_code":this.ddlTMShospname,
      "rpttype": ""     
    }).subscribe((resp: any)=>{   
      
      if(resp.status=="true")
      {
        console.log(resp.list);

        this.claims_app_arr=[];
        this.claims_app_arr=resp.list;
        this.claims_app_0_10_arr=[];
        this.claims_app_10_15_arr=[];
        this.claims_app_15_30_arr=[];
        this.claims_app_30_plus_arr=[];
        this.claims_paid_0_15_arr=[];
        this.claims_paid_15_30_arr=[];
        this.claims_paid_30_45_arr=[];
        this.claims_paid_45_arr=[];
        this.tms_claim_text_arr=[];

        for(var i in this.claims_app_arr)
            {              
               var total_app=Number(this.claims_app_arr[i]['claims_app_0_10'])+Number(this.claims_app_arr[i]['claims_app_10_15'])+Number(this.claims_app_arr[i]['claims_app_15_30'])+Number(this.claims_app_arr[i]['claims_app_30_plus'])
                this.claims_app_0_10_arr.push((Number(this.claims_app_arr[i]['claims_app_0_10'])*100/total_app));
                this.claims_app_10_15_arr.push((Number(this.claims_app_arr[i]['claims_app_10_15'])*100/total_app));
                this.claims_app_15_30_arr.push((Number(this.claims_app_arr[i]['claims_app_15_30'])*100/total_app));
                this.claims_app_30_plus_arr.push((Number(this.claims_app_arr[i]['claims_app_30_plus'])*100/total_app));             
             
                var total_pay=Number(this.claims_app_arr[i]['claims_paid_0_15'])+Number(this.claims_app_arr[i]['claims_paid_15_30'])+Number(this.claims_app_arr[i]['claims_paid_30_45'])+Number(this.claims_app_arr[i]['claims_paid_45'])
                this.claims_paid_0_15_arr.push((Number(this.claims_app_arr[i]['claims_paid_0_15'])*100/total_pay));
                this.claims_paid_15_30_arr.push((Number(this.claims_app_arr[i]['claims_paid_15_30'])*100/total_pay));
                this.claims_paid_30_45_arr.push((Number(this.claims_app_arr[i]['claims_paid_30_45'])*100/total_pay));
                this.claims_paid_45_arr.push((Number(this.claims_app_arr[i]['claims_paid_45'])*100/total_pay));
                this.tms_claim_text_arr.push(this.claims_app_arr[i]['text']);
            }

        

        this.TMSAPPSTATBars = new Chart(this.TMSAPPSTATChart.nativeElement, {
          type: 'bar',        
          data: {
            labels: this.tms_claim_text_arr,
            datasets: [
              {  
                label:'30+ Days'  ,        
                data: this.claims_app_30_plus_arr,
                backgroundColor:'#F38B2F', // array should have same number of elements as number of dataset
                barThickness:30,
              },{  
                label:'15-30 Days'  ,        
                data: this.claims_app_15_30_arr,
                backgroundColor:'#F4D166', // array should have same number of elements as number of dataset
                barThickness:30,
              }
              ,{  
                label:'10-15 Days'  ,        
                data: this.claims_app_10_15_arr,
                backgroundColor:'#4BA5BA', // array should have same number of elements as number of dataset
                barThickness:30,
              },
              {  
              label:'0-10 Days'  ,        
              data: this.claims_app_0_10_arr,
              backgroundColor:'#AEDCD5', // array should have same number of elements as number of dataset
              barThickness:30,
              
            }
            ]
            
          },
          options: {
            plugins:{
              legend:{display: true,labels:{
               
                boxHeight:7,
                boxWidth:10,
                font:{size:12} ,
                color:'black',
              },position:"top"}
              ,
              datalabels: {
                display: true,
            align: 'center',
            color:'black',formatter: function(value, context) {
              return value.toFixed(0)+"%";}
               
              },tooltip: {
                callbacks: {
                    label: function(context) {
                      
                        let label = context.dataset.label || '';
                        var returnedValue="";
                        var nStr="";
                        if(label=="0-10 Days")
                        {                     
                          //nStr=var_claims_app_0_10;
                          returnedValue=label +": " +context.parsed.y.toFixed(0)+"%   ";
                        }
                        if(label=="10-15 Days")
                        {                     
                          //nStr=var_claims_app_10_15;
                          returnedValue=label +": " +context.parsed.y.toFixed(0)+"%   ";
                        }
                        if(label=="15-30 Days")
                        {                     
                          //nStr=var_claims_app_15_30;
                          returnedValue=label +": " +context.parsed.y.toFixed(0)+"%   ";
                        }
                        if(label=="30+ Days")
                        {                     
                          //nStr=var_claims_app_30_plus;
                          returnedValue=label +": " +context.parsed.y.toFixed(0)+"%   ";
                        }
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
                        else
                        num=nStr
                        return returnedValue+num;;
                    }
                }
            }
            },
            indexAxis: 'x',
            elements: {
              line: {
                borderWidth: 0,
                
              }
            }, scales:{x:{grid:{display:false},stacked:true,suggestedMin: 50,suggestedMax: 100,ticks:{          
                  
              maxRotation: 180,
              minRotation: 90,
              autoSkip: false,
              font:{size:13,family:'Roboto'},color:'#989898'
          }},y:{grid:{display:false},stacked:true,ticks:{         
              
            font:{size:13,family:'Roboto'},color:'#989898'
        }}}  
          }
        });


        this.TMSPAYSTATBars = new Chart(this.TMSPAYSTATChart.nativeElement, {
          type: 'bar',        
          data: {
            labels: this.tms_claim_text_arr,
            datasets: [{  
              label:'45+ Days'  ,        
              data: this.claims_paid_45_arr,
              backgroundColor:'#79706E', 
              barThickness:30,
              
            },{  
              label:'30-45 Days'  ,        
              data: this.claims_paid_30_45_arr,
              backgroundColor:'#CDC4C0', 
              barThickness:30,
            },{  
              
              label:'15-30 Days'  ,        
              data: this.claims_paid_15_30_arr,
              backgroundColor:'#6EB663', 
              barThickness:30,
            }
            ,{  
              
              label:'0-15 Days'  ,        
              data: this.claims_paid_0_15_arr,
              backgroundColor:'#B3E0A6',
              barThickness:30,
            }]
            
          },
          options: {
            plugins:{
              legend:{display: true,labels:{
               
                boxHeight:7,
                boxWidth:10,
                font:{size:12} ,
                color:'black',
              },position:"top"}
              ,
              datalabels: {
                display: true,
            align: 'center',
            color:'black',formatter: function(value, context) {
              return value.toFixed(0)+"%";}
               
              },tooltip: {
                callbacks: {
                    label: function(context) {
                      
                        let label = context.dataset.label || '';
                        var returnedValue="";
                        var nStr="";
                        if(label=="0-15 Days")
                        {                     
                          //nStr=var_claims_app_0_10;
                          returnedValue=label +": " +context.parsed.y.toFixed(0)+"%   ";
                        }
                        if(label=="15-30 Days")
                        {                     
                          //nStr=var_claims_app_10_15;
                          returnedValue=label +": " +context.parsed.y.toFixed(0)+"%   ";
                        }
                        if(label=="30-45 Days")
                        {                     
                          //nStr=var_claims_app_15_30;
                          returnedValue=label +": " +context.parsed.y.toFixed(0)+"%   ";
                        }
                        if(label=="45+ Days")
                        {                     
                          //nStr=var_claims_app_30_plus;
                          returnedValue=label +": " +context.parsed.y.toFixed(0)+"%   ";
                        }
                        
                        return returnedValue;;
                    }
                }
            }
            },
            indexAxis: 'x',
            elements: {
              line: {
                borderWidth: 0,
                
              }
            }, scales:{x:{grid:{display:false},stacked:true,suggestedMin: 50,suggestedMax: 100,ticks:{          
                  
              maxRotation: 180,
              minRotation: 90,
              autoSkip: false,
              font:{size:13,family:'Roboto'},color:'#989898'
          }},y:{grid:{display:false},stacked:true,ticks:{         
              
            font:{size:13,family:'Roboto'},color:'#989898'
        }}}  
          }
        });

        /*this.TMSPAYTATBars = new Chart(this.TMSPAYTATChart.nativeElement, {
          type: 'bar',        
          data: {
            labels: ['Claim Payment TAT Bucket'],
            datasets: [{  
              label:'0-15 Days'  ,        
              data: [this.claims_paid_0_15],
              backgroundColor:'#B3E0A6', // array should have same number of elements as number of dataset
              barThickness:30,
              
            },{  
              label:'15-30 Days'  ,        
              data: [this.claims_paid_15_30],
              backgroundColor:'#6EB663', // array should have same number of elements as number of dataset
              barThickness:30,
            },{  
              label:'30-45 Days'  ,        
              data: [this.claims_paid_30_45],
              backgroundColor:'#CDC4C0', // array should have same number of elements as number of dataset
              barThickness:30,
            }
            ,{  
              label:'45+ Days'  ,        
              data: [this.claims_paid_45],
              backgroundColor:'#79706E', // array should have same number of elements as number of dataset
              barThickness:30,
            }]
           
          },
          options: {
            plugins:{
              legend:{display: true,labels:{
               
                boxHeight:7,
                boxWidth:10,
                font:{size:12} ,
                color:'black',
              },position:"bottom"}
              ,
              datalabels: {
                display: true,
            align: 'center',
            color:'black',formatter: function(value, context) {
              return value.toFixed(2)+"%";}
               
              },tooltip: {
                callbacks: {
                    label: function(context) {
                      
                        let label = context.dataset.label || '';
                        var returnedValue="";
                        var nStr="";
                        if(label=="0-15 Days")
                        {                     
                          nStr=var_claims_paid_0_15;
                          returnedValue=label +": " +context.parsed.x.toFixed(2)+"%  : ";
                        }
                        if(label=="15-30 Days")
                        {                     
                          nStr=var_claims_paid_15_30;
                          returnedValue=label +": " +context.parsed.x.toFixed(2)+"%  : ";
                        }
                        if(label=="30-45 Days")
                        {                     
                          nStr=var_claims_paid_30_45;
                          returnedValue=label +": " +context.parsed.x.toFixed(2)+"%  : ";
                        }
                        if(label=="45+ Days")
                        {                     
                          nStr=var_claims_paid_45;
                          returnedValue=label +": " +context.parsed.x.toFixed(2)+"%  : ";
                        }
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
                        else
                        num=nStr
                        return returnedValue+num;;
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
        });*/
        
      }
      
    })
  }

}
