import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { Router } from '@angular/router';
import { Pmjreq } from '../model/pmjreq';
import { ApiserviceService } from '../service/apiservice.service';
import { ChartResp } from '../model/chart-resp';
import { StnameReq } from '../model/stname-req';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { EncrDecrService } from '../model/encr-decr-service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables);
@Component({
  selector: 'app-pmjay-operation-dashboard',
  templateUrl: './pmjay-operation-dashboard.component.html',
  styleUrls: ['./pmjay-operation-dashboard.component.css']
})
export class PmjayOperationDashboardComponent implements OnInit {
  ACIOverall:any;
  ACIToday:any;
  ACIJSON:any;
  pmjReq:Pmjreq;

  at_SHA:any;
  at_ISA:any;
  ApprovalPendingJSON:any;

  VMUbars:any;
  VMUAadhaar:any;
  VMUNonAadhaar:any;

  chResp:ChartResp;
  ACIStateTextArr : any;
  ACIStateValueArr : any;
  txtArr :any;
  arr:any;
  jsonDataACGS:any;
  ACIStatebars:any;

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
  PAAJSON:any;

  ACIFVStateTextArr : any;
  ACIFVStateValueArr : any;
  ACIFVStatebars:any;
  ACIFVtxtArr:any;

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

  EHStateTextArr : any;
  EHStateValueArr : any;
  EHStatebars:any;
  EHtxtArr:any;

  AHStateTextArr : any;
  AHStateValueArr : any;
  AHStatebars:any;
  AHtxtArr:any;

  AATStateTextArr : any;
  AATStateValueArr : any;
  AATStatebars:any;
  AATtxtArr:any;

  CPNCStateTextArr : any;
  CPNCStateValueArr : any;
  CPNCStatebars:any;
  CPNCtxtArr:any;

  CPNAStateTextArr : any;
  CPNAStateValueArr : any;
  CPNAStatebars:any;
  CPNAtxtArr:any;

  CPNStateTextArr : any;
  CPNStateValueArr : any;
  CPNStatebars:any;
  CPNtxtArr:any;

  IPCStateTextArr : any;
  IPCStateValueArr : any;
  IPCStatebars:any;
  IPCtxtArr:any;
  stateList:any;
  uploadDate:any;


  ACGDTtxtArr:any;
  ACGDTBars:any;
  ACGDTTextArr:any;
  ACGDTVCountArr:any;
  ACGDTPCountArr:any;
  ACGDTcolor:any;
  jsonDataACGTD:any;


  TMSPATtxtArr:any;
  TMSPABars:any;
  TMSPATextArr:any;
  TMSPAPublicCountArr:any;
  TMSPAPrivateCountArr:any;
  TMSPAOverAllCountArr:any;
  TMSPAcolor:any;
  jsonDataTMSPA:any;


  TMSAVTDTtxtArr:any;
  TMSAVTDBars:any;
  TMSAVTDTextArr:any;
  TMSAVTDTotalArr:any;
  TMSAVTDcolor:any;
  jsonDataTMSAVTD:any;

  TMSATVTDTtxtArr:any;
  TMSATVTDBars:any;
  TMSATVTDTextArr:any;
  TMSATVTDTotalAadaarOTPArr:any;
  TMSATVTDTotalBioAuthPArr:any;
  TMSATVTDTotaFaceauthArr:any;
  TMSATVTDcolor:any;
  jsonDataTMSATVTD:any;


  TMSCSTtxtArr:any;
  TMSCSBars:any;
  TMSCSTextArr:any;
  TMSCSPublicCountArr:any;
  TMSCSPrivateCountArr:any;
  TMSCSOverAllCountArr:any;
  TMSCScolor:any;
  jsonDataTMSCS:any;


  state:any;
  district:any;


  ACGPM:any;
  ACGPMJSON:any;
  PAToday:any;
  PAOverall:any;
  PAJSON:any;


  PAPublic:any;
  PAPrivate:any;
  PAOther:any;
  PreAuthTypeBars:any;

  PAPMJSON:any;
  PAPM:any;
  TMSCSC:any;
  TMSCSA:any;
  TMSCSCJSON:any;
  TMSCPC:any;
  TMSCPA:any;
  TMSCPCJSON:any;
  TMSCOC:any;
  TMSCOA:any;
  TMSCOCJSON:any
  TMSCPNC:any;
  TMSCPNA:any;
  TMSCPNCJSON:any;
  OCScolor:any;
  OCSTextArr:any;
  OCSValueArr:any;
  OCStxtArr:any;
  OCSBars:any;

  CPScolor:any;
  CPSTextArr:any;
  CPSValueArr:any;
  CPStxtArr:any;
  CPSBars:any;

  TMSHECount:any;
  TMSHEOverAll:any;
  TMSHEJSON:any;
  emp_Greater5:any;
  emp_Greater1_6Month:any;
  emp_Greater1_30Days:any;
  EMPM:any;
  EMPMJSON:any;
  HospitalTypeBars:any;

  TMSHETtxtArr:any;
  TMSHEBars:any;
  TMSHETextArr:any;
  TMSHEPublicCountArr:any;
  TMSHEPrivateCountArr:any;
  TMSHEOverAllCountArr:any;
  TMSHEcolor:any;
  jsonDataTMSHE:any;
  Rejected:any;
  Disabled:any;

  TMSPCA:any;
  TMSPCC:any;
  TMSPCCJSON:any;
  statename:StnameReq;
  TabName:any;

  ACIFVToday:any;
  ACIFVOverall:any;
  ACIFVJSON:any;
  PAVMAadhaar:any;
  PAVMNonAadhaar:any;
  PAVMbars:any;

  PAVMMonthAadhaar:any;
  PAVMMonthNonAadhaar:any;
  PAVMMonthbars:any;
  PAVMMonthJSON:any;
  PAVMYearAadhaar:any;
  PAVMYearNonAadhaar:any;
  PAVMYearbars:any;
  PAVMYearJSON:any;

  CLVMAadhaar:any;
  CLVMValue:any;
  CLVMText:any;
  CLVMColor:any;
  CLVMNonAadhaar:any;
  CLVMbars:any;
  TMSSubmit:any;
  TMSSJSON:any;
  ACIVMJSON:any;
  PAPJSON:any;
  PAPJSON2:any;
  PAVMJSON:any;
  CLVMJSON:any;

  empJSON:any;
  public_count:any;
  private_count:any
  jsonDataACIFV:any;
  SPNJSON:any;

  OTPAadhaar:any;
  NonAadhaarCount:any;
  BioAuth:any;
  FaceAuth:any;
  TMSAVTDAadhaarCountArr:any;
TMSAVTDNonAadhaarCountArr:any;

aadhaarData:any;
aadhaarPer:any;
nonaadhaarPer:any;
aadhaarlable:any;
aadhaarColor:any;
ddlTMSstatename:any="";
ddlTMSdistrictname:any="";
ddlTMShospname:any="";
TMSstateList:any;
TMSdistrictList:any;
TMShospList:any;
ddlstatename_disable:any;
  public static arrayTooltip_AadhaarOTP = [];
  public static arrayTooltip_BioAuth = [];
  public static arrayTooltip_FaceAuth = [];
  @ViewChild('hprafChart',{ static: true }) hprafChart:any;
  @ViewChild('ACIStateChart',{ static: true }) ACIStateChart:any;
  @ViewChild('ACIFVStateChart',{ static: true }) ACIFVStateChart:any;
  @ViewChild('PAVMChart',{ static: true }) PAVMChart:any;
  @ViewChild('PAVMMonthChart',{ static: true }) PAVMMonthChart:any;
  @ViewChild('PAVMYearChart',{ static: true }) PAVMYearChart:any;
  @ViewChild('CLVMChart',{ static: true }) CLVMChart:any;
  @ViewChild('PAStateChart') PAStateChart:any;
  @ViewChild('PAAStateChart') PAAStateChart:any;
  @ViewChild('CSCStateChart') CSCStateChart:any;
  @ViewChild('CSAStateChart') CSAStateChart:any;
  @ViewChild('CPCStateChart') CPCStateChart:any;
  @ViewChild('CPAStateChart') CPAStateChart:any;

  @ViewChild('COCStateChart') COCStateChart:any;
  @ViewChild('COAStateChart') COAStateChart:any;
  @ViewChild('OPCStateChart') OPCStateChart:any;
  @ViewChild('CPNCStateChart') CPNCStateChart:any;
  @ViewChild('CPNAStateChart') CPNAStateChart:any;
  @ViewChild('IPCStateChart') IPCStateChart:any;
  @ViewChild('EHStateChart') EHStateChart:any;
  @ViewChild('AHStateChart') AHStateChart:any;
  @ViewChild('AATStateChart') AATStateChart:any;
  @ViewChild('CPNStateChart') CPNStateChart:any;
  @ViewChild('ACGTDChart') ACGTDChart:any;
  @ViewChild('TMSPAChart') TMSPAChart:any;
  @ViewChild('TMSAVTDChart') TMSAVTDChart:any;
  @ViewChild('TMSATVTDChart') TMSATVTDChart:any;
  @ViewChild('TMSCSChart') TMSCSChart:any;
  @ViewChild('TMSHEChart') TMSHEChart:any;
  @ViewChild('PreAuthTypeChart') PreAuthTypeChart:any;
  @ViewChild('PreAuthType2Chart') PreAuthType2Chart:any;
  @ViewChild('OCSChart') OCSChart:any;
  @ViewChild('CPSChart') CPSChart:any;
  @ViewChild('HospitalTypeChart') HospitalTypeChart:any;
  @ViewChild('TAGChart') TAGChart:any;
  @ViewChild('TMSCLAIMSChart') TMSCLAIMSChart:any;

  ACIStateChartElement:any;
  test:any;
  TAGState_District:any;
  TAGTextArr:any;
  state_name:any;
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
  encrdecrdervice:EncrDecrService;
  encdecKey:any;
  role:any;
  userid:any
  state_code:any
  district_code:any
  agency_code:any
  preauthCountColor: any;
  preauthCountData: any;
  preauthCountlable: any;
  private_per: any;
  public_per: any;

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

  constructor(public apiService: ApiserviceService,public router: Router) {
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
    if(this.userid!="" && this.role!="1")
      this.router.navigate(['login']);
    this.pmjReq=new Pmjreq();
    this.chResp=new ChartResp();
    this.statename=new StnameReq();
    this.state="";
    this.state_name="";
    this.TAGState_District="S";
    this.TMSState_District="S";
   }
   fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
   fileExtension = '.xlsx';
  ngOnInit(): void {
    this.GetStateMaster();
    this.GetUploadDate();
    this.GetTopHeadData("","");
    this.GetVMUChart("","");
    this.GetPAVM("","");
    this.GetCLVM("","");
    this.GetApprovalPending("","");
    this.GetACIStateWise("ACGS","","","");
    this.GetPAStateWise("HAS","","","","C");
    //this.GetPAAStateWise("PAAS","","","");
    this.GetACIFVStateWise("ACIFVS","","","");
    this.GetCSCStateWise("CSCS","","","","C");
   // this.GetCSAStateWise("CSAS","","","");

    this.GetCPCStateWise("CPCS","","","","C");
    //this.GetCPAStateWise("CPAS","","","");
    this.GetCOCStateWise("COCS","","","","C");
    //this.GetCOAStateWise("COAS","","","");
    this.GetOPCStateWise("OPCS","","","");
    this.GetCPNCStateWise("CPNCS","","","","C");
    //this.GetCPNAStateWise("CPNAS","","","");
    this.GetIPCStateWise("IPCS","","","");
    this.GetEHStateWise("EHS","","","");
    this.GetAHStateWise("AHS","","","");
    this.GetAATStateWise("TMSATVS","","","");
    this.GetCPNStateWise("CPNS","","","");
    this.GetACGTD("","T","","");
    this.GetTMSPATD("TMSPA","T","","");
    this.GetTMSCSTD("TMSCS","T","","");
    this.GetTMSHETD("TMSHE","T","","");
    this.GetACGPM("","");
    this.GetPreauthType("","")
    this.GetPAPM("","");
    this.getTMSClaim("","");
    this.GetOverDueClaimStatus("","");
    this.GetEmpanelledActive("","");
    this.GetEMPM("","");
    this.GetCardRefused("","")
    this.GetTMSSubmitInprocess("","")
    this.GetClaimPaidStatus("","");
    this.GetTMSAVTD("TMSAVTD","T","","");
    this.GetTMSATVTD("TMSATVTD","T","","");
    this.GetTAGData("TAGD","","","");
    this.TabName="Aadhaar Auth";
    this.GetTMSState_Master();
    this.getTMS_CLAIM_S_D_H();
    this.ddlstatename_disable=true;
    this.onToggleType="C";
    this.GetTMSCLAIM_S_D_H_Chart("","","",this.onToggleType);
  }

  getTabName(tbName:any)
  {
    this.TabName=tbName;
  }

  GetPAPM(state_code:any,district_code:any)
  {

  this.pmjReq.type='PAPM';
  this.pmjReq.state_code=state_code;
  this.pmjReq.district_code=district_code;
  this.pmjReq.rpttype="";
  this.apiService.GetPerMin(this.pmjReq).subscribe((response) => {
    //console.log(response);
  if(response['status']=="true")
  {
    this.PAPMJSON= response;
    this.PAPM=response['permin'];
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
     this.PAPJSON= response;
     var total=Number(response['public']) +Number(response['private'])  +Number(response['other'])
     //console.log("total" + total);
     this.PAPublic=(Number(response['public'])*100/total).toFixed(0);
     //console.log("VMUAadhaar" + this.VMUAadhaar);
     this.PAPrivate=(Number(response['private'])*100/total).toFixed(0);
     this.PAOther=(Number(response['other'])*100/total).toFixed(0);
     //console.log("VMUNonAadhaar" + this.VMUNonAadhaar);
     this.preauthCountData=[this.PAPublic, this.PAPrivate, this.PAOther];
     this.preauthCountColor=['#f46a57', '#e8a850', '#3e9a2d'];
     this.preauthCountlable=['Public', 'Private', 'Unknown'];

    this.PreAuthTypeBars = new Chart(this.PreAuthTypeChart.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          label: <any>this.preauthCountlable  ,
          data:  this.preauthCountData,
          backgroundColor: this.preauthCountColor,
          borderWidth: 0,
          spacing:1
        }],
      },
      options: {
        plugins:{
          legend:{display:false,
            labels:{
              boxHeight:10,
              boxWidth:10,
              font:{size:13}
            },
            position:"right",


          },

          datalabels: {
            display:false,
            color:'white'
          },
        },
        indexAxis: 'x',

        elements: {
          line: {
            borderWidth: 0,

          }
        },cutout:27
      }
    });
  }
});




this.pmjReq.type="PATC2";
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetPreauthType(this.pmjReq).subscribe((response) => {
      //console.log(response);
    if(response['status']=="true")
    {
      this.PAPJSON2=response;
     var total=Number(response['public']) +Number(response['private'])  +Number(response['other'])
     //console.log("public" + Number(response['public'])*100/total);
     this.PAPublic=(Number(response['public'])*100/total).toFixed(0);
     //console.log("VMUAadhaar" + this.VMUAadhaar);
     this.PAPrivate=(Number(response['private'])*100/total).toFixed(0);
     this.PAOther=(Number(response['other'])*100/total).toFixed(0);
     var TotalPer=Number(this.PAPublic)+Number(this.PAPrivate)+Number(this.PAOther)-100;
     //console.log(TotalPer);

     if(TotalPer>0)
     {
      this.PAOther=Number(this.PAOther)-TotalPer;
     }
     //console.log("VMUNonAadhaar" + this.VMUNonAadhaar);


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
      //console.log(response);
    if(response['status']=="true")
    {
      this.ACGPMJSON=response;
      this.ACGPM=response['permin'];
    }
    });
  }
  clickme(type:any,rpttype:any){


    if(this.state==undefined)
    {
      this.state='';
    }
    if(this.district==undefined)
    {
      this.district='';
    }
    if(rpttype=='ACGTD')
    {
      this.ACGDTBars.destroy();
    this.GetACGTD('',type,this.state,this.district);
    }
    if(rpttype=='TMSPA')
    {
      this.TMSPABars.destroy();
    this.GetTMSPATD('TMSPA',type,this.state,this.district);
    }
    if(rpttype=='TMSHE')
    {
      this.TMSHEBars.destroy();
    this.GetTMSHETD('TMSHE',type,this.state,this.district);
    }
    if(rpttype=='TMSCS')
    {
      this.TMSCSBars.destroy();
    this.GetTMSCSTD('TMSCS',type,this.state,this.district);
    }

    if(rpttype=='TMSAVTD')
    {
      this.TMSAVTDBars.destroy();
    this.GetTMSAVTD('TMSAVTD',type,this.state,this.district);
    }
    if(rpttype=='TMSATVTD')
    {
      this.TMSATVTDBars.destroy();
    this.GetTMSATVTD('TMSATVTD',type,this.state,this.district);
    }

  }

  GetACGTD(type:any,rpttype:any,state_code:any,district_code:any)
   {
    this.pmjReq.type=type;
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;
    this.apiService.GetACGTrend(this.pmjReq).subscribe((response) => {
      this.chResp=response;
      if(this.chResp.status=="true")
      {

       this.ACGDTcolor=[];

        this.ACGDTTextArr = [];
        this.ACGDTVCountArr = [];
        this.ACGDTPCountArr = [];
        this.ACGDTtxtArr = [];
        this.ACGDTTextArr=this.chResp.list;
        this.jsonDataACGTD=this.chResp.list;
         // console.log(this.chResp.list);
            for(var i in this.ACGDTTextArr)
            {
              this.ACGDTtxtArr.push(this.ACGDTTextArr[i]['date']);
              this.ACGDTVCountArr.push(this.ACGDTTextArr[i]['vcount']);
              this.ACGDTPCountArr.push(this.ACGDTTextArr[i]['pcount']);
              //this.ACGDTcolor.push(this.getRandomColor());
            }
      this.ACGDTBars = new Chart(this.ACGTDChart.nativeElement, {
        type: 'line',
        data: {
          labels: this.ACGDTtxtArr,
          datasets: [{
            label:'Approved'  ,
            data: this.ACGDTVCountArr,
            backgroundColor: '#E8FAF4',
            borderColor: '#21CC98',
            borderWidth: 2,
            fill: false,
            pointRadius:1.5,
          },{
            label:'Pending'  ,
            data: this.ACGDTPCountArr,
            backgroundColor: '#F7EDF9',
            borderColor: '#B24CC2',
            borderWidth: 2,
            fill: false,
            pointRadius:1.5,
          }]
        },
        options: {
          plugins:{
            legend:{display: true,labels:{boxHeight:8,
              boxWidth:8,}}
            ,
            datalabels: {
              display:false,

            },
          },
          indexAxis: 'x',
          elements: {
            line: {
              borderWidth: 0,
              tension:.4
            }
          },scales:{x:{suggestedMin: 50,suggestedMax: 100,ticks:{

            maxRotation: 180,
            minRotation: 90,
            autoSkip: false,
            font:{size:10,family:'Roboto'},color:'#989898'
        }},y:{ticks:{

          font:{size:10,family:'Roboto'},color:'#989898'
      }}}
        }
      });

    }
    });
   }


   GetTMSPATD(type:any,rpttype:any,state_code:any,district_code:any)
   {
    this.pmjReq.type=type;
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;
    this.apiService.GetTMSTrend(this.pmjReq).subscribe((response) => {

      this.chResp=response;
      if(this.chResp.status=="true")
      {

       this.ACGDTcolor=[];

        this.TMSPATtxtArr = [];
        this.TMSPAPublicCountArr = [];
        this.TMSPAPrivateCountArr = [];
        this.TMSPAOverAllCountArr = [];
        this.TMSPATextArr = [];
        this.TMSPATextArr=this.chResp.list;
        this.jsonDataTMSPA=this.chResp.list;

            for(var i in this.TMSPATextArr)
            {
              this.TMSPATtxtArr.push(this.TMSPATextArr[i]['date']);
              this.TMSPAPublicCountArr.push(this.TMSPATextArr[i]['publiccount']);
              this.TMSPAPrivateCountArr.push(this.TMSPATextArr[i]['privatecount']);
              this.TMSPAOverAllCountArr.push(this.TMSPATextArr[i]['overallcount']);
              //this.ACGDTcolor.push(this.getRandomColor());
            }

      this.TMSPABars = new Chart(this.TMSPAChart.nativeElement, {
        type: 'line',
        data: {
          labels: this.TMSPATtxtArr,
          datasets: [{
            label:'Public'  ,
            data: this.TMSPAPublicCountArr,
            backgroundColor: '#E8FAF4',
            borderColor: '#21CC98',
            borderWidth: 2,
            fill: false,
            pointRadius:1.5
          },{
            label:'Private'  ,
            data: this.TMSPAPrivateCountArr,
            backgroundColor: '#F7EDF9',
            borderColor: '#B24CC2',
            borderWidth: 2,
            fill: false,
            pointRadius:1.5
          },{
            label:'Overall'  ,
            data: this.TMSPAOverAllCountArr,
            backgroundColor: '#d2e2f3',
            borderColor: '#96b9eb',
            borderWidth: 2,
            fill: false,
            pointRadius:1.5
          }]
        },
        options: {
          plugins:{
            legend:{display: true,labels:{boxHeight:8,
              boxWidth:8,}}
            ,
            datalabels: {
              display:false,

            },
          },
          indexAxis: 'x',
          elements: {
            line: {
              borderWidth: 0,
              tension:.4
            }
          },scales:{x:{grid:{display:false},
           ticks: {
            maxRotation: 180,
            minRotation: 90,
            autoSkip: false,
            font:{size:10,family:'Roboto'},color:'#989898'
          }},y:{grid:{display:false}}}
        }
      });

    }
    });
   }


   GetTMSAVTD(type:any,rpttype:any,state_code:any,district_code:any)
   {
    this.pmjReq.type=type;
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => {

      this.chResp=response;
      if(this.chResp.status=="true")
      {

       this.ACGDTcolor=[];

        this.TMSAVTDTtxtArr = [];
        this.TMSAVTDAadhaarCountArr = [];
        this.TMSAVTDNonAadhaarCountArr = [];

        this.TMSAVTDTextArr = [];
        this.TMSAVTDTextArr=this.chResp.list;
        this.jsonDataTMSAVTD=this.chResp.list;

            for(var i in this.TMSAVTDTextArr)
            {
              this.TMSAVTDTtxtArr.push(this.TMSAVTDTextArr[i]['date']);
              this.TMSAVTDAadhaarCountArr.push(this.TMSAVTDTextArr[i]['aadhaar_count']);
              this.TMSAVTDNonAadhaarCountArr.push(this.TMSAVTDTextArr[i]['nonaadhaar_count']);
            }

      this.TMSAVTDBars = new Chart(this.TMSAVTDChart.nativeElement, {
        type: 'bar',
        data: {
          labels: this.TMSAVTDTtxtArr,
          datasets: [{
            label:'Non Aadhaar'  ,
            data: this.TMSAVTDNonAadhaarCountArr,
            backgroundColor:'#96b9eb', // array should have same number of elements as number of dataset


          },{
            label:'Aadhaar'  ,
            data: this.TMSAVTDAadhaarCountArr,
            backgroundColor:'#21CC98', // array should have same number of elements as number of dataset

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
            legend:{display: true,labels:{boxHeight:8,
              boxWidth:8,}}
            ,
            datalabels: {
              display:false,

            },
          },
          indexAxis: 'x',
          elements: {
            line: {
              borderWidth: 0,

            }
          },scales:{x:{grid:{display:false},stacked:true,  ticks: {
            maxRotation: 180,
            minRotation: 90,
            autoSkip: false,
            font:{size:10,family:'Roboto'},color:'#989898'
          }},y:{grid:{display:false},stacked:true}}
        }
      });

    }
    });
   }

   GetTMSATVTD(type:any,rpttype:any,state_code:any,district_code:any)
   {
    this.pmjReq.type=type;
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => {

      this.chResp=response;
      if(this.chResp.status=="true")
      {

       this.ACGDTcolor=[];

        this.TMSATVTDTtxtArr = [];
        this.TMSATVTDTotalAadaarOTPArr = [];
        this.TMSATVTDTotalBioAuthPArr = [];
        this.TMSATVTDTotaFaceauthArr= [];

        this.TMSATVTDTextArr = [];
        this.TMSATVTDTextArr=this.chResp.list;
        this.jsonDataTMSATVTD=this.chResp.list;

            for(var i in this.TMSATVTDTextArr)
            {
              this.TMSATVTDTtxtArr.push(this.TMSATVTDTextArr[i]['text']);
              this.TMSATVTDTotalAadaarOTPArr.push(this.TMSATVTDTextArr[i]['aadhaarotp_count']);
              this.TMSATVTDTotalBioAuthPArr.push(this.TMSATVTDTextArr[i]['bioauth_count']);
              this.TMSATVTDTotaFaceauthArr.push(this.TMSATVTDTextArr[i]['faceauth_count']);
            }
       if(rpttype!="T")
       {
      this.TMSATVTDBars = new Chart(this.TMSATVTDChart.nativeElement, {
        type: 'line',
        data: {
          labels: this.TMSATVTDTtxtArr,
          datasets: [{
            label:'Aadhaar Face Auth'  ,
            data: this.TMSATVTDTotaFaceauthArr,
            backgroundColor: '#d2e2f3',
            borderColor: '#96b9eb',
            borderWidth: 2,
            fill: false,
            pointRadius:1.5,
            yAxisID: 'second-y-axis',
          },{
            label:'Aadhaar OTP Auth'  ,
            data: this.TMSATVTDTotalAadaarOTPArr,
            backgroundColor: '#E8FAF4',
            borderColor: '#21CC98',
            borderWidth: 2,
            fill: false,
            pointRadius:1.5,

          }
        ,{
          label:'Aadhaar BIO Auth'  ,
          data: this.TMSATVTDTotalBioAuthPArr,
          backgroundColor: '#F7EDF9',
          borderColor: '#B24CC2',
          borderWidth: 2,
          fill: false,
          pointRadius:1.5,

        }]
        },
        options: {
          plugins:{
            legend:{display: true,labels:{boxHeight:8,
              boxWidth:8,}}
            ,
            datalabels: {
              display:false,

            },
          },
          indexAxis: 'x',
          elements: {
            line: {
              borderWidth: 0,
              tension:.4
            }
          },scales:{x:{grid:{display:false},  ticks: {
            maxRotation: 180,
            minRotation: 90,
            autoSkip: false,
            font:{size:10,family:'Roboto'},color:'#989898'
          }},y:{grid:{display:false},position:"right"}

        }
        }
      });
       }
       else
       {this.TMSATVTDBars = new Chart(this.TMSATVTDChart.nativeElement, {
        type: 'line',
        data: {
          labels: this.TMSATVTDTtxtArr,
          datasets: [{
          label:'Aadhaar BIO Auth'  ,
          data: this.TMSATVTDTotalBioAuthPArr,
          backgroundColor: '#F7EDF9',
          borderColor: '#B24CC2',
          borderWidth: 2,
          fill: false,
          pointRadius:1.5
        },{
          label:'Aadhaar Face Auth'  ,
          data: this.TMSATVTDTotaFaceauthArr,
          backgroundColor: '#d2e2f3',
          borderColor: '#96b9eb',
          borderWidth: 2,
          fill: false,
          pointRadius:1.5,
          yAxisID: 'second-y-axis',
        }]
        },
        options: {
          plugins:{
            legend:{display: true,labels:{boxHeight:8,
              boxWidth:8,}}
            ,
            datalabels: {
              display:false,

            },
          },
          indexAxis: 'x',
          elements: {
            line: {
              borderWidth: 0,
              tension:.4
            }
          },scales:{x:{grid:{display:false},  ticks: {
            maxRotation: 180,
            minRotation: 90,
            autoSkip: false,
            font:{size:10,family:'Roboto'},color:'#989898'
          }},y:{grid:{display:false},position:'right'}},

        }
      });}
    }
    });
   }

   GetTMSCSTD(type:any,rpttype:any,state_code:any,district_code:any)
   {
    this.pmjReq.type=type;
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;
    this.apiService.GetTMSTrend(this.pmjReq).subscribe((response) => {

      this.chResp=response;
      if(this.chResp.status=="true")
      {


        this.TMSCSTtxtArr = [];
        this.TMSCSPublicCountArr = [];
        this.TMSCSPrivateCountArr = [];
        this.TMSCSOverAllCountArr = [];
        this.TMSCSTextArr = [];
        this.TMSCSTextArr=this.chResp.list;
        this.jsonDataTMSCS=this.chResp.list;

            for(var i in this.TMSCSTextArr)
            {
              this.TMSCSTtxtArr.push(this.TMSCSTextArr[i]['date']);
              this.TMSCSPublicCountArr.push(this.TMSCSTextArr[i]['publiccount']);
              this.TMSCSPrivateCountArr.push(this.TMSCSTextArr[i]['privatecount']);
              this.TMSCSOverAllCountArr.push(this.TMSCSTextArr[i]['overallcount']);
              //this.ACGDTcolor.push(this.getRandomColor());
            }

      this.TMSCSBars = new Chart(this.TMSCSChart.nativeElement, {
        type: 'line',
        data: {
          labels: this.TMSCSTtxtArr,
          datasets: [{
            label:'Public'  ,
            data: this.TMSCSPublicCountArr,
            backgroundColor: '#E8FAF4',
            borderColor: '#21CC98',
            borderWidth: 2,
            fill: false,
            pointRadius:1.5
          },{
            label:'Private'  ,
            data: this.TMSCSPrivateCountArr,
            backgroundColor: '#F7EDF9',
            borderColor: '#B24CC2',
            borderWidth: 2,
            fill: false,
            pointRadius:1.5
          },{
            label:'Overall'  ,
            data: this.TMSCSOverAllCountArr,
            backgroundColor: '#d2e2f3',
            borderColor: '#96b9eb',
            borderWidth: 2,
            fill: false,
            pointRadius:1.5
          }]
        },
        options: {
          plugins:{
            legend:{display: true,
              labels:{boxHeight:8,
              boxWidth:8,}, position:"bottom"}
            ,
            datalabels: {
              display:false,

            },
          },
          indexAxis: 'x',
          elements: {
            line: {
              borderWidth: 0,
              tension:.4
            }
          },scales:{x:{grid:{display:false}, ticks: {

            maxRotation: 180,
            minRotation: 90,
            autoSkip: false,
            font:{size:10,family:'Roboto'},color:'#989898'
          }},y:{grid:{display:false}}}
        }
      });

    }
    });
   }

   GetTMSHETD(type:any,rpttype:any,state_code:any,district_code:any)
   {
    this.pmjReq.type=type;
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;
    this.apiService.GetTMSTrend(this.pmjReq).subscribe((response) => {

      this.chResp=response;
      if(this.chResp.status=="true")
      {


        this.TMSHETtxtArr = [];
        this.TMSHEPublicCountArr = [];
        this.TMSHEPrivateCountArr = [];
        this.TMSHEOverAllCountArr = [];
        this.TMSHETextArr = [];
        this.TMSHETextArr=this.chResp.list;
        this.jsonDataTMSHE=this.chResp.list;

            for(var i in this.TMSHETextArr)
            {
              this.TMSHETtxtArr.push(this.TMSHETextArr[i]['date']);
              this.TMSHEPublicCountArr.push(this.TMSHETextArr[i]['publiccount']);
              this.TMSHEPrivateCountArr.push(this.TMSHETextArr[i]['privatecount']);
              this.TMSHEOverAllCountArr.push(this.TMSHETextArr[i]['overallcount']);
              //this.ACGDTcolor.push(this.getRandomColor());
            }

      this.TMSHEBars = new Chart(this.TMSHEChart.nativeElement, {
        type: 'line',
        data: {
          labels: this.TMSHETtxtArr,
          datasets: [{
            label:'Public'  ,
            data: this.TMSHEPublicCountArr,
            backgroundColor: '#E8FAF4',
            borderColor: '#21CC98',
            borderWidth: 2,
            fill: false,
            pointRadius:1.5
          },{
            label:'Private'  ,
            data: this.TMSHEPrivateCountArr,
            backgroundColor: '#F7EDF9',
            borderColor: '#B24CC2',
            borderWidth: 2,
            fill: false,
            pointRadius:1.5
          },{
            label:'Overall'  ,
            data: this.TMSHEOverAllCountArr,
            backgroundColor: '#d2e2f3',
            borderColor: '#96b9eb',
            borderWidth: 2,
            fill: false,
            pointRadius:1.5
          }]
        },
        options: {
          plugins:{
            legend:{display: true,
              labels:{boxHeight:8,
              boxWidth:8,}, position: 'bottom'}
            ,
            datalabels: {
              display:false,

            },
          },
          indexAxis: 'x',
          elements: {
            line: {
              borderWidth: 0,
              tension:.4
            }
          },scales:{x:{grid:{display:false}},y:{grid:{display:false}}}
        }
      });

    }
    });
   }


  GetUploadDate()
  {
   this.apiService.GetUploadDate().subscribe((response) => {
    // console.log(response);
       if(response['status']=="true")
   {
     this.uploadDate=response['date'];
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
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:9

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
          indexAxis: 'y',
          elements: {
            line: {
              borderWidth: 0,
            }
          },
          scales:{x:{grid:{display:false, drawBorder: false},position:'top',},y:{grid:{display:false, drawBorder: false}}},
          onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.OPCStateTextArr[index];
            this.apiService.GetStateCode(this.statename).subscribe((response) => {
             if(response['status']=="true")
              {
               this.OPCStatebars.destroy();
               this.GetOPCStateWise("OPCS","",response['state_code'],"");
              }
              else
              {
               this.OPCStatebars.destroy();
               this.GetOPCStateWise("OPCS","",this.state,"");
              }
              //console.log(this.state_code);
            });

          }
        }
      });
    }
    });
   }

   GetCPNCStateWise(type:any,rpttype:any,state_code:any,district_code:any,flag:any)
   {

    this.pmjReq.type=type;
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;
    if(flag=="C")
    {
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => {
          this.chResp=response;
          //console.log  (response);
        if(this.chResp.status=="true")
    {
      //console.log("Test "+this.chResp.list?.text);

      this.CPNCStateTextArr = [];
      this.CPNCStateValueArr = [];
      this.CPNCtxtArr = [];

        this.CPNCtxtArr=this.chResp.list;

          for(var i in this.CPNCtxtArr)
          {
            this.CPNCStateTextArr.push(this.CPNCtxtArr[i]['text']);
            //this.ACIStateValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));
            this.CPNCStateValueArr.push(this.CPNCtxtArr[i]['value']);
          }

      this.CPNCStatebars = new Chart(this.CPNCStateChart.nativeElement, {
        type: 'bar',
        data: {
          labels: this.CPNCStateTextArr,
          datasets: [{
            label:'Claim Pending Count'  ,
            data: this.CPNCStateValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:9

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
          indexAxis: 'y',
          elements: {
            line: {
              borderWidth: 0,
            }
          },
          scales:{x:{grid:{display:false, drawBorder: false},position:'top',},y:{grid:{display:false, drawBorder: false}}},
          onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.CPNCStateTextArr[index];
            this.apiService.GetStateCode(this.statename).subscribe((response) => {
             if(response['status']=="true")
              {
               this.CPNCStatebars.destroy();
               this.GetCPNCStateWise("CPNCS","",response['state_code'],"","C");
              }
              else
              {
               this.CPNCStatebars.destroy();
               this.GetCPNCStateWise("CPNCS","",this.state,"","C");
              }
              //console.log(this.state_code);
            });

          }
        }
      });
    }
    });
  }
  if(flag=="A")
  {
  this.apiService.GetDataList(this.pmjReq).subscribe((response) => {
        this.chResp=response;
        //console.log  (response);
      if(this.chResp.status=="true")
  {
    //console.log("Test "+this.chResp.list?.text);

    this.CPNCStateTextArr = [];
    this.CPNCStateValueArr = [];
    this.CPNCtxtArr = [];

      this.CPNCtxtArr=this.chResp.list;

        for(var i in this.CPNCtxtArr)
        {
          this.CPNCStateTextArr.push(this.CPNCtxtArr[i]['text']);
          this.CPNCStateValueArr.push((Number(this.CPNCtxtArr[i]['value'])/100000.00).toFixed(2));
          //this.CPNCStateValueArr.push(this.CPNCtxtArr[i]['value']);
        }

    this.CPNCStatebars = new Chart(this.CPNCStateChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.CPNCStateTextArr,
        datasets: [{
          label:'Claim Pending Amount'  ,
          data: this.CPNCStateValueArr,
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
          tooltip: {
            callbacks: {
                label: function(context) {

                    let label = context.dataset.label || '';
//console.log(context.parsed.x);
                    return label +": " + context.parsed.x+" L";
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
        scales:{x:{grid:{display:false},position:'top',},y:{grid:{display:false}}},
        onClick: (evt, item) => {
          let index = item[0]["index"];
          this.statename.state_name=this.CPNCStateTextArr[index];
          this.apiService.GetStateCode(this.statename).subscribe((response) => {
           if(response['status']=="true")
            {
             this.CPNCStatebars.destroy();
             this.GetCPNCStateWise("CPNCS","",response['state_code'],"","A");
            }
            else
            {
             this.CPNCStatebars.destroy();
             this.GetCPNCStateWise("CPNCS","",this.state,"","A");
            }
            //console.log(this.state_code);
          });

        }
      }
    });
  }
  });
}
   }
/*
   GetCPNAStateWise(type:any,rpttype:any,state_code:any,district_code:any)
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

      this.CPNAStateTextArr = [];
      this.CPNAStateValueArr = [];
      this.CPNAtxtArr = [];

        this.CPNAtxtArr=this.chResp.list;

          for(var i in this.CPNAtxtArr)
          {
            this.CPNAStateTextArr.push(this.CPNAtxtArr[i]['text']);
            //this.ACIStateValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));
            this.CPNAStateValueArr.push(this.CPNAtxtArr[i]['value']);
          }

      this.CPNAStatebars = new Chart(this.CPNAStateChart.nativeElement, {
        type: 'bar',
        data: {
          labels: this.CPNAStateTextArr,
          datasets: [{
            label:'Claim Pending Amount'  ,
            data: this.CPNAStateValueArr,
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

          },
          indexAxis: 'y',
          elements: {
            line: {
              borderWidth: 0,
            }
          },
          scales:{x:{grid:{display:false},position:'top',},y:{grid:{display:false}}},
          onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.CPNAStateTextArr[index];
            this.apiService.GetStateCode(this.statename).subscribe((response) => {
             if(response['status']=="true")
              {
               this.CPNAStatebars.destroy();
               this.GetCPNAStateWise("CPNAS","",response['state_code'],"");
              }
              else
              {
               this.CPNAStatebars.destroy();
               this.GetCPNAStateWise("CPNAS","",this.state,"");
              }
              //console.log(this.state_code);
            });

          }
        }
      });
    }
    });
   }*/

   GetEHStateWise(type:any,rpttype:any,state_code:any,district_code:any)
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

      this.EHStateTextArr = [];
      this.EHStateValueArr = [];
      this.EHtxtArr = [];

        this.EHtxtArr=this.chResp.list;

          for(var i in this.EHtxtArr)
          {
            this.EHStateTextArr.push(this.EHtxtArr[i]['text']);
            //this.ACIStateValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));
            this.EHStateValueArr.push(this.EHtxtArr[i]['value']);
          }

      this.EHStatebars = new Chart(this.EHStateChart.nativeElement, {
        type: 'bar',
        data: {
          labels: this.EHStateTextArr,
          datasets: [{
            label:'Empanelled Hospitals'  ,
            data: this.EHStateValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:9

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
          indexAxis: 'y',
          elements: {
            line: {
              borderWidth: 0,
            }
          },
          scales:{x:{grid:{display:false, drawBorder: false},position:'top',},y:{grid:{display:false, drawBorder: false}}},
          onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.EHStateTextArr[index];
            this.apiService.GetStateCode(this.statename).subscribe((response) => {
              //console.log(response);
             if(response['status']=="true")
              {
               this.EHStatebars.destroy();
               this.GetEHStateWise("EHS","",response['state_code'],"");
              }
              else
              {
               this.EHStatebars.destroy();
               this.GetEHStateWise("EHS","",this.state,"");
              }

            });

          }
        }
      });
    }
    });
   }

   GetAHStateWise(type:any,rpttype:any,state_code:any,district_code:any)
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

      this.AHStateTextArr = [];
      this.AHStateValueArr = [];
      this.AHtxtArr = [];

        this.AHtxtArr=this.chResp.list;

          for(var i in this.AHtxtArr)
          {
            this.AHStateTextArr.push(this.AHtxtArr[i]['text']);
            //this.ACIStateValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));
            this.AHStateValueArr.push(this.AHtxtArr[i]['value']);
          }

      this.AHStatebars = new Chart(this.AHStateChart.nativeElement, {
        type: 'bar',
        data: {
          labels: this.AHStateTextArr,
          datasets: [{
            label:'Active Hospitals'  ,
            data: this.AHStateValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:9

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
          indexAxis: 'y',
          elements: {
            line: {
              borderWidth: 0,
            }
          },
          scales:{x:{grid:{display:false, drawBorder: false},position:'top',},y:{grid:{display:false, drawBorder: false}}},
          onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.AHStateTextArr[index];
            this.apiService.GetStateCode(this.statename).subscribe((response) => {
             if(response['status']=="true")
              {
               this.AHStatebars.destroy();
               this.GetAHStateWise("AHS","",response['state_code'],"");
              }
              else
              {
               this.AHStatebars.destroy();
               this.GetAHStateWise("AHS","",this.state,"");
              }
              //console.log(this.state_code);
            });

          }
        }
      });
    }
    });
   }

   GetAATStateWise(type:any,rpttype:any,state_code:any,district_code:any)
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

      this.AATStateTextArr = [];
      this.AATStateValueArr = [];

      this.OTPAadhaar = [];
      this.BioAuth = [];
      this.FaceAuth = [];
      this.NonAadhaarCount=[];
      PmjayOperationDashboardComponent.arrayTooltip_AadhaarOTP=[];
      PmjayOperationDashboardComponent.arrayTooltip_FaceAuth=[];
      PmjayOperationDashboardComponent.arrayTooltip_BioAuth=[];
      this.AATtxtArr = [];

        this.AATtxtArr=this.chResp.list;

          for(var i in this.AATtxtArr)
          {
            this.AATStateTextArr.push(this.AATtxtArr[i]['text']);
            //this.ACIStateValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));
            this.AATStateValueArr.push(this.AATtxtArr[i]['total']);
            this.OTPAadhaar.push(this.AATtxtArr[i]['otp_count']);

            this.BioAuth.push(this.AATtxtArr[i]['bioauth_count']);
            this.FaceAuth.push(this.AATtxtArr[i]['faceauth_count']);
            this.NonAadhaarCount.push(this.AATtxtArr[i]['nonaadhaar_count']);
          }
          PmjayOperationDashboardComponent.arrayTooltip_AadhaarOTP=this.OTPAadhaar;
          PmjayOperationDashboardComponent.arrayTooltip_FaceAuth=this.FaceAuth;
          PmjayOperationDashboardComponent.arrayTooltip_BioAuth=this.BioAuth;
      this.AATStatebars = new Chart(this.AATStateChart.nativeElement, {
        type: 'bar',
        data: {
          labels: this.AATStateTextArr,
          datasets: [{
            label:'Non Aadhaar'  ,
            data: this.NonAadhaarCount,
            backgroundColor:'#96b9eb', // array should have same number of elements as number of dataset
            borderRadius: Number.MAX_VALUE,
            borderSkipped: 'right',
            barThickness:9

          },{
            label:'Aadhaar'  ,
            data: this.AATStateValueArr,
            backgroundColor:'#21CC98', // array should have same number of elements as number of dataset
            borderRadius: Number.MAX_VALUE,
            borderSkipped: 'left',
            barThickness:9

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
              callbacks: {
                  label: function(context) {
                    var  nStr="";

                      let label = context.dataset.label || '';
                      //console.log(label);
                      if(label=="Aadhaar")
                      {
                      var otpCount=PmjayOperationDashboardComponent.arrayTooltip_AadhaarOTP[context.dataIndex];
                      var BioCount=PmjayOperationDashboardComponent.arrayTooltip_BioAuth[context.dataIndex];
                      var FaceCount=PmjayOperationDashboardComponent.arrayTooltip_FaceAuth[context.dataIndex];
                      return label +": " + context.parsed.x+", Aadhaar OTP: " + otpCount+", Bio Auth: " + BioCount+", Face Auth: " + FaceCount;
                      }
                      else
                      {
                        return label +": " + context.parsed.x;
                      }
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
          scales:{
            x:{
              grid:{display:false,drawBorder:false},
              position:'top',stacked:true,
              ticks:{
                autoSkip: false,font:{size:11,family:'Roboto'},
                color:'#989898'
            }
            },
              y:{
                grid:{display:false,drawBorder:false},
                ticks:{
                  autoSkip: false,font:{size:11,family:'Roboto'},color:'#989898'
              },
                stacked:true}
            },

          onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.AATStateTextArr[index];
            this.apiService.GetStateCode(this.statename).subscribe((response) => {
             if(response['status']=="true")
              {
               this.AATStatebars.destroy();
               this.GetAATStateWise("TMSATVS","",response['state_code'],"");
              }
              else
              {
               this.AATStatebars.destroy();
               this.GetAATStateWise("TMSATVS","",this.state,"");
              }
              //console.log(this.state_code);
            });

          }
        }
      });
    }
    });
   }

   GetCPNStateWise(type:any,rpttype:any,state_code:any,district_code:any)
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

      this.CPNStateTextArr = [];
      this.CPNStateValueArr = [];
      this.CPNtxtArr = [];

        this.CPNtxtArr=this.chResp.list;
       this.SPNJSON=this.chResp.list;
          for(var i in this.CPNtxtArr)
          {
            this.CPNStateTextArr.push(this.CPNtxtArr[i]['text']);
            //this.ACIStateValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));
            this.CPNStateValueArr.push(this.CPNtxtArr[i]['value']);
          }

      this.CPNStatebars = new Chart(this.CPNStateChart.nativeElement, {
        type: 'bar',
        data: {
          labels: this.CPNStateTextArr,
          datasets: [{
            label:'Cards Pending'  ,
            data: this.CPNStateValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:9

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
          indexAxis: 'y',
          elements: {
            line: {
              borderWidth: 0,
            }
          },
          scales:{x:{grid:{display:false,drawBorder:false},position:'top',},y:{grid:{display:false,drawBorder:false}}},
          onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.CPNStateTextArr[index];
            this.apiService.GetStateCode(this.statename).subscribe((response) => {
             if(response['status']=="true")
              {
               this.CPNStatebars.destroy();
               this.GetCPNStateWise("CPNS","",response['state_code'],"");
              }
              else
              {
               this.CPNStatebars.destroy();
               this.GetCPNStateWise("CPNS","",this.state,"");
              }
              //console.log(this.state_code);
            });

          }
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
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:9

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
          indexAxis: 'y',
          elements: {
            line: {
              borderWidth: 0,
            }
          },
          scales:{x:{grid:{display:false, drawBorder: false},position:'top',},y:{grid:{display:false, drawBorder: false}}},
          onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.IPCStateTextArr[index];
            this.apiService.GetStateCode(this.statename).subscribe((response) => {
             if(response['status']=="true")
              {
               this.IPCStatebars.destroy();
               this.GetIPCStateWise("IPCS","",response['state_code'],"");
              }
              else
              {
               this.IPCStatebars.destroy();
               this.GetIPCStateWise("IPCS","",this.state,"");
              }
              //console.log(this.state_code);
            });

          }
        }
      });
    }
    });
   }

  GetCPCStateWise(type:any,rpttype:any,state_code:any,district_code:any,flag:any)
   {

    this.pmjReq.type=type;
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;
    if(flag=="C")
    {
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
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:9
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
          indexAxis: 'y',
          elements: {
            line: {
              borderWidth: 0,
            }
          },
          scales:{x:{grid:{display:false, drawBorder: false},position:'top',},y:{grid:{display:false, drawBorder: false}}},
          onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.CPCStateTextArr[index];
            this.apiService.GetStateCode(this.statename).subscribe((response) => {
             if(response['status']=="true")
              {
               this.CPCStatebars.destroy();
               this.GetCPCStateWise("CPCS","",response['state_code'],"","C");
              }
              else
              {
               this.CPCStatebars.destroy();
               this.GetCPCStateWise("CPCS","",this.state,"","C");
              }
              //console.log(this.state_code);
            });

          }
        }
      });
    }
    });
  }
  if(flag=="A")
  {
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
          this.CPCStateValueArr.push((Number(this.CPCtxtArr[i]['value'])/100000.00).toFixed(2));
          //this.CPCStateValueArr.push(this.CPCtxtArr[i]['value']);
        }

    this.CPCStatebars = new Chart(this.CPCStateChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.CPCStateTextArr,
        datasets: [{
          label:'Claim Paid Amount '  ,
          data: this.CPCStateValueArr,
          backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
          borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:9

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
            callbacks: {
                label: function(context) {

                    let label = context.dataset.label || '';

                    return label +": " + context.parsed.x+" L";
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
        scales:{x:{grid:{display:false, drawBorder: false},position:'top',},y:{grid:{display:false, drawBorder: false}}},
        onClick: (evt, item) => {
          let index = item[0]["index"];
          this.statename.state_name=this.CPCStateTextArr[index];
          this.apiService.GetStateCode(this.statename).subscribe((response) => {
           if(response['status']=="true")
            {
             this.CPCStatebars.destroy();
             this.GetCPCStateWise("CPCS","",response['state_code'],"","A");
            }
            else
            {
             this.CPCStatebars.destroy();
             this.GetCPCStateWise("CPCS","",this.state,"","A");
            }
            //console.log(this.state_code);
          });

        }
      }
    });
  }
  });
}
   }
/*
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

          },
          indexAxis: 'y',
          elements: {
            line: {
              borderWidth: 0,
            }
          },
          scales:{x:{grid:{display:false},position:'top',},y:{grid:{display:false}}},
          onClick: (evt, item) => {
            let index = item[0]["index"];
            //console.log("index :"+index);
            this.statename.state_name=this.CPAStateTextArr[index];
            this.apiService.GetStateCode(this.statename).subscribe((response) => {

             if(response['status']=="true")
              {
               this.CPAStatebars.destroy();
               //console.log("response['state_code'] :"+response['state_code']);
               this.GetCPAStateWise("CPAS","",response['state_code'],"");
              }
              else
              {
               this.CPAStatebars.destroy();
               this.GetCPAStateWise("CPAS","",this.state,"");
              }

            });

          }
        }
      });
    }
    });
   }*/


   GetCOCStateWise(type:any,rpttype:any,state_code:any,district_code:any,flag:any)
   {

    this.pmjReq.type=type;
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;
    if(flag=="C")
    {
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
          if(this.COCStatebars) {
            this.COCStatebars.destroy();
          }
      this.COCStatebars = new Chart(this.COCStateChart.nativeElement, {
        type: 'bar',
        data: {
          labels: this.COCStateTextArr,
          datasets: [{
            label:'Claim Overdue Count '  ,
            data: this.COCStateValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:9

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
          indexAxis: 'y',
          elements: {
            line: {
              borderWidth: 0,
            }
          },
          scales:{x:{grid:{display:false, drawBorder: false},position:'top',},y:{grid:{display:false, drawBorder: false}}},
          onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.COCStateTextArr[index];
            this.apiService.GetStateCode(this.statename).subscribe((response) => {
             if(response['status']=="true")
              {
               this.COCStatebars.destroy();
               this.GetCOCStateWise("COCS","",response['state_code'],"","C");
              }
              else
              {
               this.COCStatebars.destroy();
               this.GetCOCStateWise("COCS","",this.state,"","C");
              }
              //console.log(this.state_code);
            });

          }
        }
      });
    }
    });
  }
  if(flag=="C")
  {
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
          this.COCStateValueArr.push((Number(this.COCtxtArr[i]['value'])/100000.00).toFixed(2));
          //this.COCStateValueArr.push(this.COCtxtArr[i]['value']);
        }

      if(this.COCStatebars) {
        this.COCStatebars.destroy()
      }
    this.COCStatebars = new Chart(this.COCStateChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.COCStateTextArr,
        datasets: [{
          label:'Claim Overdue Amount '  ,
          data: this.COCStateValueArr,
          backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
          borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:9

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
            callbacks: {
                label: function(context) {

                    let label = context.dataset.label || '';

                    return label +": " + context.parsed.x+" L";
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
        scales:{x:{grid:{display:false, drawBorder: false},position:'top',},y:{grid:{display:false, drawBorder: false}}},
        onClick: (evt, item) => {
          let index = item[0]["index"];
          this.statename.state_name=this.COCStateTextArr[index];
          this.apiService.GetStateCode(this.statename).subscribe((response) => {
           if(response['status']=="true")
            {
             this.COCStatebars.destroy();
             this.GetCOCStateWise("COCS","",response['state_code'],"","A");
            }
            else
            {
             this.COCStatebars.destroy();
             this.GetCOCStateWise("COCS","",this.state,"","A");
            }
            //console.log(this.state_code);
          });

        }
      }
    });
  }
  });
}
   }
/*
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

          },
          indexAxis: 'y',
          elements: {
            line: {
              borderWidth: 0,
            }
          },
          scales:{x:{grid:{display:false},position:'top',},y:{grid:{display:false}}},
          onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.COAStateTextArr[index];
            this.apiService.GetStateCode(this.statename).subscribe((response) => {
             if(response['status']=="true")
              {
               this.COAStatebars.destroy();
               this.GetCOAStateWise("COAS","",response['state_code'],"");
              }
              else
              {
               this.COAStatebars.destroy();
               this.GetCOAStateWise("COAS","",this.state,"");
              }
              //console.log(this.state_code);
            });

          }
        }
      });
    }
    });
   }*/

  GetCSCStateWise(type:any,rpttype:any,state_code:any,district_code:any,flag:any)
  {

   this.pmjReq.type=type;
   this.pmjReq.state_code=state_code;
   this.pmjReq.district_code=district_code;
   this.pmjReq.rpttype=rpttype;
   if(flag=="C")
   {
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
           borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:9

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
         indexAxis: 'y',
         elements: {
           line: {
             borderWidth: 0,
           }
         },
         scales:{x:{grid:{display:false, drawBorder: false},position:'top',},y:{grid:{display:false, drawBorder: false}}},
         onClick: (evt, item) => {
          let index = item[0]["index"];
          this.statename.state_name=this.CSCStateTextArr[index];
          this.apiService.GetStateCode(this.statename).subscribe((response) => {
           if(response['status']=="true")
            {
             this.CSCStatebars.destroy();
             this.GetCSCStateWise("CSCS","",response['state_code'],"","C");
            }
            else
            {
             this.CSCStatebars.destroy();
             this.GetCSCStateWise("CSCS","",this.state,"","C");
            }
            //console.log(this.state_code);
          });

        }
       }
     });
   }
   });
  }
  if(flag=="A")
   {
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
           this.CSCStateValueArr.push((Number(this.CSCtxtArr[i]['value'])/100000.00).toFixed(2));
           //this.CSCStateValueArr.push(this.CSCtxtArr[i]['value']);
         }

     this.CSCStatebars = new Chart(this.CSCStateChart.nativeElement, {
       type: 'bar',
       data: {
         labels: this.CSCStateTextArr,
         datasets: [{
           label:'Calim Submitted Amount'  ,
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
           tooltip: {
            callbacks: {
                label: function(context) {

                    let label = context.dataset.label || '';
//console.log(context.parsed.x);
                    return label +": " + context.parsed.x+" L";
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
         scales:{x:{grid:{display:false},position:'top',},y:{grid:{display:false}}},
         onClick: (evt, item) => {
          let index = item[0]["index"];
          this.statename.state_name=this.CSCStateTextArr[index];
          this.apiService.GetStateCode(this.statename).subscribe((response) => {
           if(response['status']=="true")
            {
             this.CSCStatebars.destroy();
             this.GetCSCStateWise("CSAS","",response['state_code'],"","A");
            }
            else
            {
             this.CSCStatebars.destroy();
             this.GetCSCStateWise("CSAS","",this.state,"","A");
            }
            //console.log(this.state_code);
          });

        }
       }
     });
   }
   });
  }
  }
/*
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
//console.log(context.parsed.x);
                     return label +": " + context.parsed.x+" bn";
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
         scales:{x:{grid:{display:false},position:'top',},y:{grid:{display:false}}},
         onClick: (evt, item) => {
          let index = item[0]["index"];
          this.statename.state_name=this.CSAStateTextArr[index];
          this.apiService.GetStateCode(this.statename).subscribe((response) => {
           if(response['status']=="true")
            {
             this.CSAStatebars.destroy();
             this.GetCSAStateWise("CSAS","",response['state_code'],"");
            }
            else
            {
             this.CSAStatebars.destroy();
             this.GetCSAStateWise("CSAS","",this.state,"");
            }
            //console.log(this.state_code);
          });

        }
       }
     });
   }
   });
  }*/
  GetPAStateWise(type:any,rpttype:any,state_code:any,district_code:any,flag:any)
   {
    this.pmjReq.type=type;
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;
    if(flag=="C")
    {
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
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:9

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
          indexAxis: 'y',
          elements: {
            line: {
              borderWidth: 0,
            }
          },
          scales:{
            x:{
              grid:{display:false, drawBorder:false},
            position:'top',
            ticks:{
              autoSkip: false,font:{size:11,family:'Roboto'},
              color:'#989898'
            }
          },
          y:{
            grid:{display:false,drawBorder:false},
            ticks:{
              autoSkip: false,font:{size:11,family:'Roboto'},color:'#989898'
          }}
          }
          ,onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.PAStateTextArr[index];
            this.apiService.GetStateCode(this.statename).subscribe((response) => {
             if(response['status']=="true")
              {
               this.PAStatebars.destroy();
               this.GetPAStateWise("HAS","",response['state_code'],"","C");
              }
              else
              {
               this.PAStatebars.destroy();
               this.GetPAStateWise("HAS","",this.state,"","C");
              }
              //console.log(this.state_code);
            });

          }
        }
      });
    }
    });
  }
  if(flag=="A")
    {
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
            this.PAStateValueArr.push((Number(this.PAtxtArr[i]['value'])/100000.00).toFixed(2));
            //this.PAStateValueArr.push(this.PAtxtArr[i]['value']);
          }

      this.PAStatebars = new Chart(this.PAStateChart.nativeElement, {
        type: 'bar',
        data: {
          labels: this.PAStateTextArr,
          datasets: [{
            label:'Preauth Requested Amount '  ,
            data: this.PAStateValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:9

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
              callbacks: {
                  label: function(context) {

                      let label = context.dataset.label || '';
  //console.log(context.parsed.x);
                      return label +": " + context.parsed.x+" L";
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
          scales:{x:{grid:{display:false, drawBorder: false},position:'top',},y:{grid:{display:false, drawBorder: false}}}
          ,onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.PAStateTextArr[index];
            this.apiService.GetStateCode(this.statename).subscribe((response) => {
             if(response['status']=="true")
              {
               this.PAStatebars.destroy();
               this.GetPAStateWise("HAS","",response['state_code'],"","A");
              }
              else
              {
               this.PAStatebars.destroy();
               this.GetPAStateWise("HAS","",this.state,"","A");
              }
              //console.log(this.state_code);
            });

          }
        }
      });
    }
    });
  }
   }

/*
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

          },
          indexAxis: 'y',
          elements: {
            line: {
              borderWidth: 0,
            }
          },
          scales:{x:{grid:{display:false},position:'top',},y:{grid:{display:false}}},
          onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.PAAStateTextArr[index];
            this.apiService.GetStateCode(this.statename).subscribe((response) => {
             if(response['status']=="true")
              {
               this.PAAStatebars.destroy();
               this.GetPAAStateWise("PAAS","",response['state_code'],"");
              }
              else
              {
               this.PAAStatebars.destroy();
               this.GetPAAStateWise("PAAS","",this.state,"");
              }
              //console.log(this.state_code);
            });

          }
        }
      });
    }
    });
   }
*/
   GetACIFVStateWise(type:any,rpttype:any,state_code:any,district_code:any)
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

      this.ACIFVStateTextArr = [];
      this.ACIFVStateValueArr = [];
      this.ACIFVtxtArr = [];

        this.ACIFVtxtArr=this.chResp.list;
        this.jsonDataACIFV=this.chResp.list;
          for(var i in this.ACIFVtxtArr)
          {
            this.ACIFVStateTextArr.push(this.ACIFVtxtArr[i]['text']);
            //this.ACIStateValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));
            this.ACIFVStateValueArr.push(this.ACIFVtxtArr[i]['value']);
          }

      this.ACIFVStatebars = new Chart(this.ACIFVStateChart.nativeElement, {
        type: 'bar',
        data: {
          labels: this.ACIFVStateTextArr,
          datasets: [{
            label:'Families Verified'  ,
            data: this.ACIFVStateValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:9

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
          indexAxis: 'y',
          elements: {
            line: {
              borderWidth: 0,
            }
          },
          scales:{x:{grid:{display:false},position:'top',},y:{grid:{display:false}}},
          onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.ACIFVStateTextArr[index];
            this.apiService.GetStateCode(this.statename).subscribe((response) => {
             if(response['status']=="true")
              {
               this.ACIFVStatebars.destroy();
               this.GetACIFVStateWise("ACIFVS","",response['state_code'],"");
              }
              else
              {
               this.ACIFVStatebars.destroy();
               this.GetACIFVStateWise("ACIFVS","",this.state,"");
              }
              //console.log(this.state_code);
            });

          }
        }
      });
    }
    });
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

          for(var i in this.txtArr)
          {
            this.ACIStateTextArr.push(this.txtArr[i]['text']);
            //this.ACIStateValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));
            this.ACIStateValueArr.push(this.txtArr[i]['value']);
          }
         // this.ACIStateChartElement = this.ACIStateChart.nativeElement;
         // var px=(this.ACIStateValueArr.length*10)+"px";
         // this.ACIStateChartElement.style.height=px;


      this.ACIStatebars = new Chart(this.ACIStateChart.nativeElement, {
        type: 'bar',
        data: {
          labels: this.ACIStateTextArr,
          datasets: [{
            label:'Ayushman Cards Issued'  ,
            data: this.ACIStateValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:9

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
          indexAxis: 'y',
          elements: {
            line: {
              borderWidth: 0,
            }
          },
          scales:{x:{grid:{display:false,drawBorder:false},position:'top'},y:{grid:{display:false,drawBorder:false}}},
          onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.ACIStateTextArr[index];
            this.apiService.GetStateCode(this.statename).subscribe((response) => {
             if(response['status']=="true")
              {
               this.ACIStatebars.destroy();
               //console.log("response['state_code'] : "+response['state_code']);
               this.GetACIStateWise("ACGS","",response['state_code'],"");
              }
              else
              {
               this.ACIStatebars.destroy();
               //console.log("this.state : "+this.state);
               this.GetACIStateWise("ACGS","",this.state,"");
              }
              //console.log(this.state_code);
            });

          }
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
        this.ApprovalPendingJSON=response;
     this.at_SHA=(Number(response['sha'])/1000).toFixed(2)+" K";
     //console.log("VMUAadhaar" + this.VMUAadhaar);
     this.at_ISA=(Number(response['isa'])/1000).toFixed(2)+" K";
     //console.log("VMUNonAadhaar" + this.VMUNonAadhaar);
    }
  });
}
GetEmpanelledActive(state_code:any,district_code:any)
    {

    this.pmjReq.type='';
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetTMSActive(this.pmjReq).subscribe((response) => {
      //console.log("response : " +response['greater1_6month']);
    if(response['status']=="true")
    {
      this.empJSON=response;
      //var total=Number(response['greater5'])+Number(response['greater1_6month'])+Number(response['greater1_30days']);
      //console.log(total);

      this.emp_Greater5=String(response['greater5']) +'%';


      this.emp_Greater1_6Month=String(response['greater1_6month']) +'%';

      this.emp_Greater1_30Days=String(response['greater1_30days']) +'%';

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
      //console.log(response);
    if(response['status']=="true")
    {
      this.EMPMJSON=response;
      this.EMPM=response['permin'];
    }
    });
  }
  GetVMUChart(state_code:any,district_code:any)
   {

    this.pmjReq.type="ACIVM";
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetACIVMethod(this.pmjReq).subscribe((response) => {
     // console.log(response);
    if(response['status']=="true")
    {
      this.aadhaarData=[];
      this.aadhaarColor=[];
      this.aadhaarlable=[];
      this.ACIVMJSON=response;

     var total=Number(response['aadhaar']) +Number(response['nonaadhaar'])
     //console.log("total" + total);
     this.VMUAadhaar=(Number(response['aadhaar'])*100/total).toFixed(0);
     //console.log("VMUAadhaar" + this.VMUAadhaar);
     this.VMUNonAadhaar=(Number(response['nonaadhaar'])*100/total).toFixed(0);
     //console.log("VMUNonAadhaar" + this.VMUNonAadhaar);
     this.aadhaarColor.push('#31A366');
        this.aadhaarColor.push('#9CD4B9');
     this.aadhaarData.push(this.VMUAadhaar);
     this.aadhaarData.push(this.VMUNonAadhaar);
     this.aadhaarlable.push('Aadhaar');
     this.aadhaarlable.push('Non Aadhaar');
    //this.aadhaarPer=


    this.VMUbars = new Chart(this.hprafChart.nativeElement, {
      type: 'doughnut',
      data: {
        //labels: '',
        datasets: [{
          label:this.aadhaarlable  ,
          data: this.aadhaarData,
          backgroundColor:this.aadhaarColor, // array should have same number of elements as number of dataset
          borderWidth: 0,
          spacing:1
        }/*,{
          label:'Non Aadhaar'  ,
          data: [this.VMUNonAadhaar],
          backgroundColor:'#C6DAFB',
          borderWidth: 1,
          barThickness:25,

        }*/],
      },

      options: {
        plugins:{
          legend:{display:false,
            labels:{
              boxHeight:10,
              boxWidth:10,
              font:{size:13}
            },
            position:"right",


          },

          datalabels: {
            display:false,
            color:'white'
          },
        },
        indexAxis: 'x',

        elements: {
          line: {
            borderWidth: 0,

          }
        },cutout:27
      }
    });
  }
});
    }



    GetPAVM(state_code:any,district_code:any)
   {

    this.pmjReq.type="PAVM";
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="O";
    this.apiService.GetACIVMethod(this.pmjReq).subscribe((response) => {
     // console.log(response);
    if(response['status']=="true")
    {
      this.PAVMJSON=response;
     var total=Number(response['aadhaar']) +Number(response['nonaadhaar'])
     //console.log("total" + total);
     this.PAVMAadhaar=(Number(response['aadhaar'])*100/total).toFixed(0);
     //console.log("VMUAadhaar" + this.VMUAadhaar);
     this.PAVMNonAadhaar=(Number(response['nonaadhaar'])*100/total).toFixed(0);
     //console.log("VMUNonAadhaar" + this.VMUNonAadhaar);



    this.PAVMbars = new Chart(this.PAVMChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Preauth Verification Method'],
        datasets: [{
          data: [this.PAVMAadhaar],
          label:'Aadhaar',
          backgroundColor:'#31a366',
          barPercentage: 0.5,
          categoryPercentage: 0.7,

        },{
          data: [this.PAVMNonAadhaar],
          label:'Non Aadhaar'  ,
          backgroundColor:'#a7d9be',
          barPercentage: 0.5,
          categoryPercentage: 0.7,

        }],
      },
      plugins: [ChartDataLabels],
      options: {
        plugins:{
          legend:{labels:{

            boxHeight:7,
            boxWidth:10,
            font:{size:12} ,
            color:'black',
          },
          position:"bottom"},
          datalabels: {
            anchor: 'end',
            display: true,
            align: 'right',
            color:'black',
            formatter: function(value, context) {
              return value+"%";}

          },tooltip: {
            callbacks: {
                label: function(context) {

                    let label = context.dataset.label || '';
                    var returnedValue="";
                    var nStr="";
                    if(label=="Aadhaar")
                    {
                      nStr=response['aadhaar'];
                      returnedValue=label +": " +context.parsed.x+"%  : ";
                    }
                    else
                    {
                      nStr=response['nonaadhaar'];
                      returnedValue=label +": " +context.parsed.x+"%  : ";
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
        layout: {
          padding: {
            right: 20
          }
        },
        elements: {
          bar: {
            borderWidth: 0,
            borderRadius: 4
          }
        },
        scales:{
          x:{stacked: false,display:false,grid:{display:false}},
          y:{stacked: false,display:false,grid:{display:false}}
        }

      }
    });
  }
});

this.pmjReq.type="PAVM";
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="M";
    this.apiService.GetACIVMethod(this.pmjReq).subscribe((response) => {
     // console.log(response);
    if(response['status']=="true")
    {
      this.PAVMMonthJSON=response;
     var total=Number(response['aadhaar']) +Number(response['nonaadhaar'])
     //console.log("total" + total);
     this.PAVMMonthAadhaar=(Number(response['aadhaar'])*100/total).toFixed(0);
     //console.log("VMUAadhaar" + this.VMUAadhaar);
     this.PAVMMonthNonAadhaar=(Number(response['nonaadhaar'])*100/total).toFixed(0);
     //console.log("VMUNonAadhaar" + this.VMUNonAadhaar);



    this.PAVMMonthbars = new Chart(this.PAVMMonthChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Preauth Verification Method'],
        datasets: [{
          data: [this.PAVMMonthAadhaar],
          label:'Aadhaar',
          backgroundColor:'#31a366',
          barPercentage: 0.5,
          categoryPercentage: 0.7,

        },{
          data: [this.PAVMMonthNonAadhaar],
          label:'Non Aadhaar'  ,
          backgroundColor:'#a7d9be',
          barPercentage: 0.5,
          categoryPercentage: 0.7,
        }],
      },
      // plugins: [ChartDataLabels],
      options: {

        plugins:{
          legend:{
            labels:{

            boxHeight:7,
            boxWidth:10,
            font:{size:12} ,
            color:'black',
          },
          position:"bottom"
        },
          datalabels: {
            anchor: 'end',
            display: true,
            align: 'right',
            color:'black',
            formatter: function(value, context) {
              return value+"%";}

          },tooltip: {
            callbacks: {
                label: function(context) {

                    let label = context.dataset.label || '';
                    var returnedValue="";
                    var nStr="";
                    if(label=="Aadhaar")
                    {
                      nStr=response['aadhaar'];
                      returnedValue=label +": " +context.parsed.x+"%  : ";
                    }
                    else
                    {
                      nStr=response['nonaadhaar'];
                      returnedValue=label +": " +context.parsed.x+"%  : ";
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
        layout: {
          padding: {
            right: 40
          }
        },
        elements: {
          bar: {
            borderWidth: 0,
            borderRadius: 4
          }
        },
        scales:{
          x:{stacked: false, display:false,grid:{display:false}},
          y:{stacked: false,display:false,grid:{display:false}}
        }

      }
    });
  }
});

this.pmjReq.type="PAVM";
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="Y";
    this.apiService.GetACIVMethod(this.pmjReq).subscribe((response) => {
     // console.log(response);
    if(response['status']=="true")
    {
      this.PAVMYearJSON=response;
     var total=Number(response['aadhaar']) +Number(response['nonaadhaar'])
     //console.log("total" + total);
     this.PAVMYearAadhaar=(Number(response['aadhaar'])*100/total).toFixed(0);
     //console.log("VMUAadhaar" + this.VMUAadhaar);
     this.PAVMYearNonAadhaar=(Number(response['nonaadhaar'])*100/total).toFixed(0);
     //console.log("VMUNonAadhaar" + this.VMUNonAadhaar);



    this.PAVMYearbars = new Chart(this.PAVMYearChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Preauth Verification Method'],
        datasets: [{
          data: [this.PAVMYearAadhaar],
          label:'Aadhaar',
          backgroundColor:'#31a366',
          barPercentage: 0.5,
          categoryPercentage: 0.7,
        },{
          data: [this.PAVMYearNonAadhaar],
          label:'Non Aadhaar'  ,
          backgroundColor:'#a7d9be',
          barPercentage: 0.5,
          categoryPercentage: 0.7,

        }],
      },
      plugins: [ChartDataLabels],
      options: {
        plugins:{
          legend:{labels:{

            boxHeight:7,
            boxWidth:10,
            font:{size:12} ,
            color:'black',
          },
          position:"bottom"},
          datalabels: {
            anchor: 'end',
            display: true,
            align: 'right',
            color:'black',
            formatter: function(value, context) {
              return value+"%";}

          },tooltip: {
            callbacks: {
                label: function(context) {

                    let label = context.dataset.label || '';
                    var returnedValue="";
                    var nStr="";
                    if(label=="Aadhaar")
                    {
                      nStr=response['aadhaar'];
                      returnedValue=label +": " +context.parsed.x+"%  : ";
                    }
                    else
                    {
                      nStr=response['nonaadhaar'];
                      returnedValue=label +": " +context.parsed.x+"%  : ";
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
        layout: {
          padding: {
            right: 40
          }
        },
        elements: {
          bar: {
            borderWidth: 0,
            borderRadius: 4
          }
        },
        scales:{
          x:{stacked: false,display:false,grid:{display:false}},
          y:{stacked: false,display:false,grid:{display:false}}
        }

      }
    });
  }
});
    }


    GetCLVM(state_code:any,district_code:any)
   {

    this.pmjReq.type="CLVM";
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetACIVMethod(this.pmjReq).subscribe((response) => {
     // console.log(response);
     this.CLVMValue=[];
     this.CLVMText=[];
     this.CLVMColor=[];
    if(response['status']=="true")
    {

     var total=Number(response['aadhaar']) +Number(response['nonaadhaar'])
     //console.log("total" + total);
     //this.CLVMAadhaar=(Number(response['aadhaar'])*100/total).toFixed(0);
     this.CLVMJSON=response;
     this.CLVMValue.push((Number(response['aadhaar'])*100/total).toFixed(0));
     this.CLVMValue.push((Number(response['nonaadhaar'])*100/total).toFixed(0));

     this.CLVMText.push('Aadhaar');
     this.CLVMText.push('Non Aadhaar');

     this.CLVMColor.push('#00A65A');
     this.CLVMColor.push('#F56954');
     //console.log("VMUAadhaar" + this.VMUAadhaar);
     //this.CLVMNonAadhaar=(Number(response['nonaadhaar'])*100/total).toFixed(0);
     //console.log("VMUNonAadhaar" + this.VMUNonAadhaar);


  if(!this.CLVMChart) return
    this.CLVMbars = new Chart(this.CLVMChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.CLVMText,
        datasets: [{
          label:'Verification Method' ,
          data: this.CLVMValue,
          backgroundColor:this.CLVMColor, // array should have same number of elements as number of dataset
          //borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1,

        }],
      },

      options: {
        plugins:{
          legend:{labels:{

            boxHeight:7,
            boxWidth:10,
            font:{size:12} ,
            color:'black',
          },
          position:"bottom"},datalabels: {
            display: true,
            align: 'center',
            color:'black',formatter: function(value, context) {
              return value+"%";}

          },tooltip: {
            callbacks: {
                label: function(context) {

                  let label = context.label;
                  var returnedValue="";
                  var nStr="";
                  if(label=="Aadhaar")
                  {
                    nStr=response['aadhaar'];
                    returnedValue=label +": " +context.parsed+"%  : ";
                  }
                  else
                  {
                    nStr=response['nonaadhaar'];
                    returnedValue=label +": " +context.parsed+"%  : ";
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
                    return returnedValue+num;
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
    this.ACIJSON= response;
    this.ACIToday=this.getCommaValue(response['today']);
    //var overall=response['overall'].replace(',','')
    //console.log(overall);
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
    this.PAJSON=response;
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
    console.log("Preauths Requested Count");
    console.log(response);
  if(response['status']=="true")
  {
    this.PAAJSON=response;
    //this.PAAToday=this.getCommaValue(response['today']);
    if(Number(response['today'])==0)
    {
      this.PAAToday=Number(response['today']);
    }
    else if(Number(response['today'])>=10000000)
    {
    this.PAAToday=(Number(response['today'])/10000000).toFixed(2) + ' Cr';
    }
    else if(Number(response['today'])<10000000 && Number(response['today'])>=100000)
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

  this.pmjReq.type='TMSHE';
  this.pmjReq.state_code=state_code;
  this.pmjReq.district_code=district_code;
  this.pmjReq.rpttype="";
  this.apiService.GetTopHeadData(this.pmjReq).subscribe((response) => {
  //console.log(response);
  if(response['status']=="true")
  {
    this.TMSHEJSON =response;
    this.TMSHECount=this.getCommaValue(response['today']);
    var OverAll=Number(response['overall']);
    if(OverAll>=10000000)
    {
    this.TMSHEOverAll=(OverAll/10000000).toFixed(2) + ' Cr';
    }
    else if(OverAll<10000000 && OverAll>=100000)
    {
      this.TMSHEOverAll=(OverAll/100000).toFixed(2) + ' L';
    }
    else
    {
      this.TMSHEOverAll=(OverAll/1000).toFixed(2) + ' K';
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

      var total=Number(response['public_count'])+Number(response['private_count']);
     // var publicCount=Number(response['public_count'])-Number(response['private_count'])
      var publicCount=Number(response['public_count']);
      //console.log(total);
      //this.em_Total=this.getCommaValue(total.toString());

      var public_Per=(publicCount*100.00/total).toFixed(2)
      var private_Per=(Number(response['private_count'])*100.00/total).toFixed(2)
      this.GetEmpanelledHospitalType(public_Per,private_Per,publicCount,response['private_count'])
    }
    });

  this.pmjReq.type='ACIFV';
  this.pmjReq.state_code=state_code;
  this.pmjReq.district_code=district_code;
  this.pmjReq.rpttype="";
  this.apiService.GetTopHeadData(this.pmjReq).subscribe((response) => {
    //console.log("Rizwan" +response);
  if(response['status']=="true")
  {
    this.ACIFVJSON= response;
    this.ACIFVToday=this.getCommaValue(response['today']);
    //var overall=response['overall'].replace(',','')
    //console.log(overall);
    if(Number(response['overall'])>=10000000)
    {
    this.ACIFVOverall=(Number(response['overall'])/10000000).toFixed(2) + ' Cr';
    }
    else if(Number(response['overall'])<10000000 && Number(response['overall'])>=100000)
    {
      this.ACIFVOverall=(Number(response['overall'])/100000).toFixed(2) + ' L';
    }
    else
    {
      this.ACIFVOverall=(Number(response['overall'])/1000).toFixed(2) + ' K';
    }
  }
  });

/*
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
*/
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
getTMSClaim(state_code:any,district_code:any)
{
    this.pmjReq.type='TMSCS';
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetTMSCalim(this.pmjReq).subscribe((response) => {
      //console.log("Rizwan" +response);
    if(response['status']=="true")
    {
      this.TMSCSCJSON=response;
      this.TMSCSC=this.getCommaValue(response['count']);
      var Amount=Number(response['amount']);
      if(Amount>=10000000)
      {
      this.TMSCSA=(Amount/10000000).toFixed(2) + ' Cr';
      }
      else if(Amount<10000000 && Amount>=100000)
      {
        this.TMSCSA=(Amount/100000).toFixed(2) + ' L';
      }
      else
      {
        this.TMSCSA=(Amount/1000).toFixed(2) + ' K';
      }
    }
    });


    this.pmjReq.type='TMSCP';
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetTMSCalim(this.pmjReq).subscribe((response) => {
      //console.log("Rizwan" +response);
    if(response['status']=="true")
    {
      this.TMSCPCJSON=response;
      this.TMSCPC=this.getCommaValue(response['count']);
      var Amount=Number(response['amount']);
      if(Amount>=10000000)
      {
      this.TMSCPA=(Amount/10000000).toFixed(2) + ' Cr';
      }
      else if(Amount<10000000 && Amount>=100000)
      {
        this.TMSCPA=(Amount/100000).toFixed(2) + ' L';
      }
      else
      {
        this.TMSCPA=(Amount/1000).toFixed(2) + ' K';
      }
    }
    });


    this.pmjReq.type='TMSCO';
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetTMSCalim(this.pmjReq).subscribe((response) => {
      //console.log("Rizwan" +response);
    if(response['status']=="true")
    {
      this.TMSCOCJSON=response;
      this.TMSCOC=this.getCommaValue(response['count']);
      var Amount=Number(response['amount']);
      if(Amount>=10000000)
      {
      this.TMSCOA=(Amount/10000000).toFixed(2) + ' Cr';
      }
      else if(Amount<10000000 && Amount>=100000)
      {
        this.TMSCOA=(Amount/100000).toFixed(2) + ' L';
      }
      else
      {
        this.TMSCOA=(Amount/1000).toFixed(2) + ' K';
      }
    }
    });

    this.pmjReq.type='TMSCPN';
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetTMSCalim(this.pmjReq).subscribe((response) => {
    //console.log(response);
    if(response['status']=="true")
    {
      this.TMSCPNCJSON=response;
      this.TMSCPNC=this.getCommaValue(response['count']);
      var Amount=Number(response['amount']);
      if(Amount>=10000000)
      {
      this.TMSCPNA=(Amount/10000000).toFixed(2) + ' Cr';
      }
      else if(Amount<10000000 && Amount>=100000)
      {
        this.TMSCPNA=(Amount/100000).toFixed(2) + ' L';
      }
      else
      {
        this.TMSCPNA=(Amount/1000).toFixed(2) + ' K';
      }
    }
    });

    this.pmjReq.type='TMSPC';
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetTMSCalim(this.pmjReq).subscribe((response) => {
    //console.log(response);
    if(response['status']=="true")
    {
      this.TMSPCCJSON=response;
      this.TMSPCC=this.getCommaValue(response['count']);
      var Amount=Number(response['amount']);
      if(Amount>=10000000)
      {
      this.TMSPCA=(Amount/10000000).toFixed(2) + ' Cr';
      }
      else if(Amount<10000000 && Amount>=100000)
      {
        this.TMSPCA=(Amount/100000).toFixed(2) + ' L';
      }
      else
      {
        this.TMSPCA=(Amount/1000).toFixed(2) + ' K';
      }
    }
    });
}

GetOverDueClaimStatus(state_code:any,district_code:any)
   {
    this.pmjReq.type="OCS";
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetDataList1(this.pmjReq).subscribe((response) => {
      //this.chResp=response;

      if(response.status=="true")
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

          this.OCStxtArr=response['list'];
          //console.log(this.OCStxtArr);
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
            //label:'Gender'  ,
            data: this.OCSValueArr,
            backgroundColor: this.OCScolor, // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 0,
            spacing: 2
          }]
        },
        options: {
          plugins:{
            legend:{
              display: false,
              labels:{
                boxHeight:10,
                boxWidth:10,
                font:{size:13} ,
              },
              position:"right"
            },
            datalabels: {
              display:false,
              color:'white'
            },tooltip: {
              callbacks: {
                  label: function(context) {
                    //console.log("Index "+ context.dataIndex);
                    var nStr="";

                    let label = context.label;

                      //return label +": " +context.parsed+"%";
                    var resp=response['list'];
                    //let label = context.dataset.label || '';
                    var returnedValue=label +": " +context.parsed+"% : ";
                    nStr=resp[context.dataIndex]['value'];





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
          },
          cutout:35
        }
      });

    }
    });

   }

   GetClaimPaidStatus(state_code:any,district_code:any)
   {
    this.pmjReq.type="CPS";
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetDataList1(this.pmjReq).subscribe((response) => {
      //this.chResp=response;
      //console.log(response);
      if(response.status=="true")
      {

       this.CPScolor=[];

       this.CPScolor.push('#3C8DBC');
       this.CPScolor.push('#00C0EF');
       this.CPScolor.push('#00A65A');
       this.CPScolor.push('#F56954');

       this.CPScolor.push('#F54394');
       this.CPScolor.push('#F39C12');


        this.CPSTextArr = [];
        this.CPSValueArr = [];
        this.CPStxtArr = [];
        //this.jsonDataHPRAF=[];

          this.CPStxtArr=response['list'];
          //console.log(this.CPStxtArr);
          var total=0;
          for(var i in this.CPStxtArr)
            {
              total=total+Number(this.CPStxtArr[i]['value']);
            }
            for(var i in this.CPStxtArr)
            {
              this.CPSTextArr.push(this.CPStxtArr[i]['text']);
              this.CPSValueArr.push((Number(this.CPStxtArr[i]['value'])*100/total).toFixed(0));
            }


      this.CPSBars = new Chart(this.CPSChart.nativeElement, {
        type: 'doughnut',
        data: {
          labels: this.CPSTextArr,
          datasets: [{
            //label:'Gender'  ,
            data: this.CPSValueArr,
            backgroundColor: this.CPScolor, // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 0,
            spacing: 2
          }]
        },
        options: {
          plugins:{
            legend:{
              display: false,
              labels:{

                boxHeight:10,
                boxWidth:10,
                font:{size:13} ,
              },
              position:"right"
            },
            datalabels: {
              display:false,
              color:'white'
            },tooltip: {
              callbacks: {
                  label: function(context) {
                    //console.log("Index "+ context.dataIndex);
                    var nStr="";

                    let label = context.label;

                      //return label +": " +context.parsed+"%";
                    var resp=response['list'];
                    //let label = context.dataset.label || '';
                    var returnedValue=label +": " +context.parsed+"% : ";
                    nStr=resp[context.dataIndex]['value'];





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
          },
          cutout:35
        }
      });

    }
    });

   }


GetEmpanelledHospitalType(public_per:any,private_per:any,public_count:any,private_count:any)
{
  this.public_count=public_count;
  this.private_count=private_count;
  this.public_per = Number(public_per).toFixed(0);
  this.private_per = Number(private_per).toFixed(0);
  this.HospitalTypeBars = new Chart(this.HospitalTypeChart.nativeElement, {
  type: 'doughnut',
  data: {
    labels: ['Hospital Type'],
    datasets: [{
      label: <any>['Public', 'Private'] ,
      data: [this.public_per, this.private_per],
      backgroundColor:['#3367D5', '#C6DAFB'], // array should have same number of elements as number of dataset
      //borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
      borderWidth: 1,
    }
    // ,{
    //   label:'Private'  ,
    //   data: [Number(private_per).toFixed(0)],
    //   backgroundColor:'#C6DAFB', // array should have same number of elements as number of dataset
    //   //borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
    //   borderWidth: 1,

    // }
  ],
  },

  options: {
    plugins:{
      legend:{
        display: false,
        labels:{

        boxHeight:5,
        boxWidth:7,
        font:{size:10} ,
        color:'black',
      },
      position:"bottom"},
      datalabels: {
        display: false,
        align: 'center',
        color:'black',formatter: function(value, context) {
          return value+"%";}

      },
      tooltip: {
        enabled: false
    }
    },
    indexAxis: 'y',
    elements: {
      line: {
        borderWidth: 0,

      }
    },
    cutout: 16

  }
});}

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

    this.state=val;

    this.HospitalTypeBars.destroy();
    this.GetTopHeadData(val,"");

    this.VMUbars.destroy();
    this.GetVMUChart(val,"");

    this.PAVMbars.destroy();
    this.PAVMMonthbars.destroy();
    this.PAVMYearbars.destroy();
    
    this.GetPAVM(val,"");

    //this.CLVMbars.destroy();
    //this.GetCLVM(val,"");

    this.GetApprovalPending(val,"");

    this.ACIStatebars.destroy();
    this.GetACIStateWise("ACGS","",val,"");

    this.PAStatebars.destroy();
    this.GetPAStateWise("HAS","",val,"","C");

    //this.PAAStatebars.destroy();
    //this.GetPAAStateWise("PAAS","",val,"");

    this.ACIFVStatebars.destroy();
    this.GetACIFVStateWise("ACIFVS","",val,"");

    this.CSCStatebars.destroy();
    this.GetCSCStateWise("CSCS","",val,"","C");

    //this.CSAStatebars.destroy();
    //this.GetCSAStateWise("CSAS","",val,"");

    this.CPCStatebars.destroy();
    this.GetCPCStateWise("CPCS","",val,"","C");

    //this.CPAStatebars.destroy();
    //this.GetCPAStateWise("CPAS","",val,"");

    this.COCStatebars.destroy();
    this.GetCOCStateWise("COCS","",val,"","C");

    //this.COAStatebars.destroy();
    //this.GetCOAStateWise("COAS","",val,"");

    this.OPCStatebars.destroy();
    this.GetOPCStateWise("OPCS","",val,"");

    this.CPNCStatebars.destroy();
    this.GetCPNCStateWise("CPNCS","",val,"","C");
    //this.CPNAStatebars.destroy();
    //this.GetCPNAStateWise("CPNAS","",val,"");

    this.IPCStatebars.destroy();
    this.GetIPCStateWise("IPCS","",val,"");

    this.EHStatebars.destroy();
    this.GetEHStateWise("EHS","",val,"");

    this.AHStatebars.destroy();
    this.GetAHStateWise("AHS","",val,"");

    this.AATStatebars.destroy();
    this.GetAATStateWise("TMSATVS","",val,"");

    this.ACGDTBars.destroy();
    this.GetACGTD("","T",val,"");

    this.TMSPABars.destroy();
    this.GetTMSPATD("TMSPA","T",val,"");

    this.TMSCSBars.destroy();
    this.GetTMSCSTD("TMSCS","T",val,"");

    this.TMSHEBars.destroy();
    this.GetTMSHETD("TMSHE","T",val,"");

    this.GetACGPM(val,"");


    this.PreAuthTypeBars.destroy();
    this.GetPreauthType(val,"")

    this.GetPAPM(val,"");
    this.getTMSClaim(val,"");

    this.OCSBars.destroy();
    this.GetOverDueClaimStatus(val,"");

    this.GetEmpanelledActive(val,"");
    this.GetEMPM(val,"");
    this.GetCardRefused(val,"");

    this.GetTMSSubmitInprocess(val,"")

    this.TMSAVTDBars.destroy();
    this.GetTMSAVTD('TMSAVTD',"T",val,"");

    this.TMSATVTDBars.destroy();
    this.GetTMSATVTD('TMSATVTD',"T",val,"");

    this.CPSBars.destroy();
    this.GetClaimPaidStatus(val,"");

    this.TAGbars.destroy();
    this.GetTAGData("TAGD","",this.state_name,"");

  }
GetCardRefused(state_code:any,district_code:any)
{
  this.pmjReq.type='';
  this.pmjReq.state_code=state_code;
  this.pmjReq.district_code=district_code;
  this.pmjReq.rpttype="";
  this.apiService.GetCardRefused(this.pmjReq).subscribe((response) => {
    //console.log("Rizwan" +response);
  if(response['status']=="true")
  {
    this.Rejected=this.getCommaValue(response['rejected']);
    this.Disabled=this.getCommaValue(response['disabled']);

  }
  });
}

GetTMSSubmitInprocess(state_code:any,district_code:any)
{
  this.pmjReq.type='';
  this.pmjReq.state_code=state_code;
  this.pmjReq.district_code=district_code;
  this.pmjReq.rpttype="";
  this.apiService.GetTMSSubmitInprocess(this.pmjReq).subscribe((response) => {
    //console.log("Rizwan" +response);
  if(response['status']=="true")
  {
    this.TMSSJSON=response;
    this.TMSSubmit=this.getCommaValue(response['total']);

  }
  });
}
exportexcel(filename:any)
  {

    this.exportExce1l(filename);

  }
exportExce1l(fileName: string): void {
  //BIS Metrics
  let tble="<table border='1'>";
  tble+="<tr style='font-weight: bold;background-color: cadetblue;'><td colspan='3' >Benificiaries Verified</td></tr>";
  tble+="<tr><td colspan='2'>Today</td><td>"+this.ACIJSON.today+"</td></tr>";
  tble+="<tr><td colspan='2'>Overall</td><td>"+this.ACIJSON.overall+"</td></tr>";

  tble+="<tr ><td colspan='3' ></td></tr>";
  tble+="<tr style='font-weight: bold;background-color: cadetblue;'><td colspan='3' >Approval Pending</td></tr>";
  tble+="<tr><td colspan='2'>At ISA</td><td>"+this.ApprovalPendingJSON.isa+"</td></tr>";
  tble+="<tr><td colspan='2'>At SHA</td><td>"+this.ApprovalPendingJSON.sha+"</td></tr>";
  tble+="<tr ><td colspan='3' ></td></tr>";
  tble+="<tr><td colspan='3' style='font-weight: bold;background-color: cadetblue;'>Families Verified</td></tr>";
  tble+="<tr><td colspan='2'>Today</td><td>"+this.ACIFVJSON.today+"</td></tr>";
  tble+="<tr><td colspan='2'>Overall</td><td>"+this.ACIFVJSON.overall+"</td></tr>";
  tble+="<tr ><td colspan='3' ></td></tr>";
  tble+="<tr><td colspan='3' style='font-weight: bold;background-color: cadetblue;'>Benificiaries Verified per minute</td></tr>";
  tble+="<tr><td colspan='2'>Calculated for last month</td><td>"+this.ACGPMJSON.permin+"</td></tr>";

  tble+="<tr ><td colspan='3' ></td></tr>";
  tble+="<tr><td colspan='3' style='font-weight: bold;background-color: cadetblue;'>Verification Method Used</td></tr>";
  tble+="<tr><td colspan='2'>Aadhaar</td><td>"+this.ACIVMJSON.aadhaar+"</td></tr>";
  tble+="<tr><td colspan='2'>Non Aadhaar</td><td>"+this.ACIVMJSON.nonaadhaar+"</td></tr>";
  tble+="<tr ><td colspan='3' ></td></tr>";
  tble+="<tr><td colspan='3' style='font-weight: bold;background-color: cadetblue;'>Trends</td></tr>";
  tble+="<tr style='font-weight: bold;background-color: cadetblue;'><td>Date</td><td>Approved</td><td>Pending</td></tr>";

  for(var i in this.jsonDataACGTD)
  {
    tble+="<tr><td>"+this.jsonDataACGTD[i]['date']+"</td><td>"+this.jsonDataACGTD[i]['vcount']+"</td><td>"+this.jsonDataACGTD[i]['pcount']+"</td></tr>";
  }
  tble+="</table>";
  var div_BIS_Metrics = document.createElement('div');
  div_BIS_Metrics.innerHTML = tble.trim();
  const source_BIS_Metrics = div_BIS_Metrics.firstChild;
  const ws_BIS_Metrics: XLSX.WorkSheet = XLSX.utils.table_to_sheet(source_BIS_Metrics);

  //TMS Metrics Preauth
  tble="";
  tble="<table border='1'>";
  tble+="<tr style='font-weight: bold;background-color: cadetblue;'><td colspan='3' >Preauths Requested Count</td></tr>";
  tble+="<tr><td colspan='2'>Today</td><td>"+this.PAJSON.today+"</td></tr>";
  tble+="<tr><td colspan='2'>Overall</td><td>"+this.PAJSON.overall+"</td></tr>";
  tble+="<tr ><td colspan='3' ></td></tr>";
  tble+="<tr style='font-weight: bold;background-color: cadetblue;'><td colspan='3' >Preauths Requested Amount</td></tr>";
  tble+="<tr><td colspan='2'>Today</td><td>"+this.PAAJSON.today+"</td></tr>";
  tble+="<tr><td colspan='2'>Overall</td><td>"+this.PAAJSON.overall+"</td></tr>";
  tble+="<tr ><td colspan='3' ></td></tr>";
  tble+="<tr><td colspan='3' style='font-weight: bold;background-color: cadetblue;'>Portability Cases</td></tr>";
  tble+="<tr><td colspan='2'>Count</td><td>"+this.TMSPCCJSON.count+"</td></tr>";
  tble+="<tr><td colspan='2'>Amount</td><td>"+this.TMSPCCJSON.amount+"</td></tr>";
  tble+="<tr ><td colspan='3' ></td></tr>";
  tble+="<tr><td colspan='3' style='font-weight: bold;background-color: cadetblue;'>Preauths Requested Per Minute</td></tr>";
  tble+="<tr><td colspan='2'>Calculated for last month</td><td>"+this.PAPMJSON.permin+"</td></tr>";
  tble+="<tr ><td colspan='3' ></td></tr>";

  tble+="<tr><td colspan='3' style='font-weight: bold;background-color: cadetblue;'>Preauths Type (by count)</td></tr>";
  tble+="<tr><td colspan='2'>Public</td><td>"+this.PAPJSON.public+"</td></tr>";
  tble+="<tr><td colspan='2'>Private</td><td>"+this.PAPJSON.private+"</td></tr>";
  tble+="<tr><td colspan='2'>Unknown</td><td>"+this.PAPJSON.other+"</td></tr>";
  tble+="<tr ><td colspan='3' ></td></tr>";
  tble+="<tr><td colspan='2'>Secondry</td><td>"+this.PAPJSON2.public+"</td></tr>";
  tble+="<tr><td colspan='2'>Teritary</td><td>"+this.PAPJSON2.private+"</td></tr>";
  tble+="<tr><td colspan='2'>Unknown</td><td>"+this.PAPJSON2.other+"</td></tr>";
  tble+="<tr ><td colspan='3' ></td></tr>";
  tble+="<tr><td colspan='3' style='font-weight: bold;background-color: cadetblue;'>Preauth Verification Method</td></tr>";
  tble+="<tr><td colspan='2'>Aadhaar</td><td>"+this.PAVMJSON.aadhaar+"</td></tr>";
  tble+="<tr><td colspan='2'>Non Aadhaar</td><td>"+this.PAVMJSON.nonaadhaar+"</td></tr>";
  tble+="<tr ><td colspan='3' ></td></tr>";
  tble+="<tr><td colspan='3' style='font-weight: bold;background-color: cadetblue;'>Trends</td></tr>";
  tble+="<tr style='font-weight: bold;background-color: cadetblue;'><td>Date</td><td>Public</td><td>Private</td><td>Overall</td></tr>";

  for(var i in this.jsonDataTMSPA)
  {
    tble+="<tr><td>"+this.jsonDataTMSPA[i]['date']+"</td><td>"+this.jsonDataTMSPA[i]['publiccount']+"</td><td>"+this.jsonDataTMSPA[i]['privatecount']+"</td><td>"+this.jsonDataTMSPA[i]['overallcount']+"</td></tr>";
  }

  tble+="<tr ><td colspan='3' ></td></tr>";
  tble+="<tr><td colspan='3' style='font-weight: bold;background-color: cadetblue;'>Aadhaar Auth Trends</td></tr>";
  tble+="<tr style='font-weight: bold;background-color: cadetblue;'><td>Date</td><td>Count</td></tr>";

  for(var i in this.jsonDataTMSAVTD)
  {
    tble+="<tr><td>"+this.jsonDataTMSAVTD[i]['text']+"</td><td>"+this.jsonDataTMSAVTD[i]['value']+"</td></tr>";
  }
  tble+="</table>";
  var div_TMS_Metrics = document.createElement('div');
  div_TMS_Metrics.innerHTML = tble.trim();
  const source_TMS_Metrics = div_TMS_Metrics.firstChild;
  const ws_TMS_Metrics: XLSX.WorkSheet = XLSX.utils.table_to_sheet(source_TMS_Metrics);


  //TMS Metrics Claim
  tble="";
  tble="<table border='1'>";
  tble+="<tr style='font-weight: bold;background-color: cadetblue;'><td colspan='3' >Claims Submitted</td></tr>";
  tble+="<tr><td colspan='2'>Count</td><td>"+this.TMSCSCJSON.count+"</td></tr>";
  tble+="<tr><td colspan='2'>Amount</td><td>"+this.TMSCSCJSON.amount+"</td></tr>";
  tble+="<tr ><td colspan='3' ></td></tr>";
  tble+="<tr style='font-weight: bold;background-color: cadetblue;'><td colspan='3' >Claims Paid</td></tr>";
  tble+="<tr><td colspan='2'>Count</td><td>"+this.TMSCPCJSON.count+"</td></tr>";
  tble+="<tr><td colspan='2'>Amount</td><td>"+this.TMSCPCJSON.amount+"</td></tr>";
  tble+="<tr ><td colspan='3' ></td></tr>";
  tble+="<tr><td colspan='3' style='font-weight: bold;background-color: cadetblue;'>Claims Pending</td></tr>";
  tble+="<tr><td colspan='2'>Count</td><td>"+this.TMSCPNCJSON.count+"</td></tr>";
  tble+="<tr><td colspan='2'>Amount</td><td>"+this.TMSCPNCJSON.amount+"</td></tr>";
  tble+="<tr ><td colspan='3' ></td></tr>";
  tble+="<tr><td colspan='3' style='font-weight: bold;background-color: cadetblue;'>Claims Overdue</td></tr>";
  tble+="<tr><td colspan='2'>Count</td><td>"+this.TMSCOCJSON.count+"</td></tr>";
  tble+="<tr><td colspan='2'>Amount</td><td>"+this.TMSCOCJSON.amount+"</td></tr>";
  tble+="<tr ><td colspan='3' ></td></tr>";

  tble+="<tr><td colspan='3' style='font-weight: bold;background-color: cadetblue;'>Claims Overdue Status</td></tr>";
  for(var i in this.OCStxtArr)
  {
    tble+="<tr><td colspan='2'>"+this.OCStxtArr[i]['text']+"</td><td>"+this.OCStxtArr[i]['value']+"</td></tr>";
  }
  tble+="<tr ><td colspan='3' ></td></tr>";

  tble+="<tr><td colspan='3' style='font-weight: bold;background-color: cadetblue;'>Claims Overdue Verification</td></tr>";
  tble+="<tr><td colspan='2'>Aadhaar</td><td>"+this.CLVMJSON.aadhaar+"</td></tr>";
  tble+="<tr><td colspan='2'>Non Aadhaar</td><td>"+this.CLVMJSON.nonaadhaar+"</td></tr>";
  tble+="<tr ><td colspan='3' ></td></tr>";

  tble+="<tr><td colspan='3' style='font-weight: bold;background-color: cadetblue;'>Trends</td></tr>";
  tble+="<tr style='font-weight: bold;background-color: cadetblue;'><td>Date</td><td>Public</td><td>Private</td><td>Overall</td></tr>";

  for(var i in this.jsonDataTMSCS)
  {
    tble+="<tr><td>"+this.jsonDataTMSCS[i]['date']+"</td><td>"+this.jsonDataTMSCS[i]['publiccount']+"</td><td>"+this.jsonDataTMSCS[i]['privatecount']+"</td><td>"+this.jsonDataTMSCS[i]['overallcount']+"</td></tr>";
  }
  tble+="</table>";
  var div_TMS_Metrics_CLaim = document.createElement('div');
  div_TMS_Metrics_CLaim.innerHTML = tble.trim();
  const source_TMS_Metrics_Claim = div_TMS_Metrics_CLaim.firstChild;
  const ws_TMS_Metrics_Claim: XLSX.WorkSheet = XLSX.utils.table_to_sheet(source_TMS_Metrics_Claim);

  //HEM Metrics - Hospitals

  tble="";
  tble="<table border='1'>";
  tble+="<tr style='font-weight: bold;background-color: cadetblue;'><td colspan='3' >Hospitals Empanelled</td></tr>";
  tble+="<tr><td colspan='2'>Today</td><td>"+this.TMSHEJSON.today+"</td></tr>";
  tble+="<tr><td colspan='2'>Overall</td><td>"+this.TMSHEJSON.overall+"</td></tr>";
  tble+="<tr ><td colspan='3' ></td></tr>";
  tble+="<tr style='font-weight: bold;background-color: cadetblue;'><td colspan='3' >% Hospitals Active</td></tr>";
  tble+="<tr><td colspan='2'>5+ preauths - Since launch</td><td>"+this.empJSON.greater5+"</td></tr>";
  tble+="<tr><td colspan='2'>1+ preauths - Last 6 months</td><td>"+this.empJSON.greater1_6month+"</td></tr>";
  tble+="<tr><td colspan='2'>1+ preauths - Last 30 days</td><td>"+this.empJSON.greater1_30days+"</td></tr>";
  tble+="<tr ><td colspan='3' ></td></tr>";
  tble+="<tr><td colspan='3' style='font-weight: bold;background-color: cadetblue;'>Hospitals Empanelled Per Day</td></tr>";
  tble+="<tr><td colspan='2'>Calculated for last month</td><td>"+this.EMPMJSON.permin+"</td></tr>";

  tble+="<tr ><td colspan='3' ></td></tr>";
  tble+="<tr><td colspan='3' style='font-weight: bold;background-color: cadetblue;'>Hospital Type</td></tr>";
  tble+="<tr><td colspan='2'>Public</td><td>"+this.public_count+"</td></tr>";
  tble+="<tr><td colspan='2'>Private</td><td>"+this.private_count+"</td></tr>";
  tble+="<tr ><td colspan='3' ></td></tr>";

  tble+="<tr ><td colspan='3' ></td></tr>";
  tble+="<tr><td colspan='3' style='font-weight: bold;background-color: cadetblue;'>Submitted / In-Process</td></tr>";
  tble+="<tr><td colspan='2'>Applications</td><td>"+this.TMSSJSON.total+"</td></tr>";
  tble+="<tr ><td colspan='3' ></td></tr>";

  tble+="<tr><td colspan='3' style='font-weight: bold;background-color: cadetblue;'>Trends</td></tr>";
  tble+="<tr style='font-weight: bold;background-color: cadetblue;'><td>Date</td><td>Public</td><td>Private</td><td>Overall</td></tr>";

  for(var i in this.jsonDataTMSHE)
  {
    tble+="<tr><td>"+this.jsonDataTMSHE[i]['date']+"</td><td>"+this.jsonDataTMSHE[i]['publiccount']+"</td><td>"+this.jsonDataTMSHE[i]['privatecount']+"</td><td>"+this.jsonDataTMSHE[i]['overallcount']+"</td></tr>";
  }
  tble+="</table>";
  var div_HEM_Metrics_Hospitals = document.createElement('div');
  div_HEM_Metrics_Hospitals.innerHTML = tble.trim();
  const source_HEM_Metrics_Hospitals = div_HEM_Metrics_Hospitals.firstChild;
  const ws_HEM_Metrics_Hospitals: XLSX.WorkSheet = XLSX.utils.table_to_sheet(source_HEM_Metrics_Hospitals);

  //const ws1: XLSX.WorkSheet = XLSX.utils.table_to_sheet(source);
  //const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, ws_BIS_Metrics, 'BIS Metrics - Ayushman Cards');
  XLSX.utils.book_append_sheet(workbook, ws_TMS_Metrics, 'TMS Metrics - Preauths');
  XLSX.utils.book_append_sheet(workbook, ws_TMS_Metrics_Claim, 'TMS Metrics - Claim');
  XLSX.utils.book_append_sheet(workbook, ws_HEM_Metrics_Hospitals, 'HEM Metrics - Hospitals');

  const ws_jsonDataACGS: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDataACGS);
  XLSX.utils.book_append_sheet(workbook, ws_jsonDataACGS, 'Benificiaries Verified');

  const ws_jsonDataACIFV: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDataACIFV);
  XLSX.utils.book_append_sheet(workbook, ws_jsonDataACIFV, 'Families Verified');

  const ws_PANJSON: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.PAtxtArr);
  XLSX.utils.book_append_sheet(workbook, ws_PANJSON, 'Preauths Requested Count');

  const ws_PAAJSON: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.PAAtxtArr);
  XLSX.utils.book_append_sheet(workbook, ws_PAAJSON, 'Preauths Requested Amount');

  const ws_CSCJSON: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.CSCtxtArr);
  XLSX.utils.book_append_sheet(workbook, ws_CSCJSON, 'Claims Submitted Count');

  const ws_CSAJSON: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.CSAtxtArr);
  XLSX.utils.book_append_sheet(workbook, ws_CSAJSON, 'Claims Submitted Amount');

  const ws_CPNCJSON: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.CPNCtxtArr);
  XLSX.utils.book_append_sheet(workbook, ws_CPNCJSON, 'Claims Pending Count');

  const ws_CPNAJSON: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.CPNAtxtArr);
  XLSX.utils.book_append_sheet(workbook, ws_CPNAJSON, 'Claims Pending Amount');

  const ws_COCJSON: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.COCtxtArr);
  XLSX.utils.book_append_sheet(workbook, ws_COCJSON, 'Claims Overdue Count');

  const ws_COAJSON: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.COAtxtArr);
  XLSX.utils.book_append_sheet(workbook, ws_COAJSON, 'Claims Overdue Amount');

  const ws_CPCJSON: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.CPCtxtArr);
  XLSX.utils.book_append_sheet(workbook, ws_CPCJSON, 'Claims Paid Count');

  const ws_CPAJSON: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.CPAtxtArr);
  XLSX.utils.book_append_sheet(workbook, ws_CPAJSON, 'Claims Paid Amount');

  const ws_OPCJSON: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.OPCtxtArr);
  XLSX.utils.book_append_sheet(workbook, ws_OPCJSON, 'Outgoing Portability Cases');

  const ws_IPCJSON: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.IPCtxtArr);
  XLSX.utils.book_append_sheet(workbook, ws_IPCJSON, 'Incoming Portability Cases');

  const ws_EHJSON: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.EHtxtArr);
  XLSX.utils.book_append_sheet(workbook, ws_EHJSON, 'Empanelled Hospitals');

  const ws_AHJSON: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.AHtxtArr);
  XLSX.utils.book_append_sheet(workbook, ws_AHJSON, 'Active Hospitals');

  const ws_AATJSON: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.AATtxtArr);
  XLSX.utils.book_append_sheet(workbook, ws_AATJSON, 'Aadhaar Auth');

  //XLSX.utils.book_append_sheet(workbook, ws1, 'Sheet2');
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveExcelFile1(excelBuffer, fileName);
}

private saveExcelFile1(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], {type: this.fileType});
  FileSaver.saveAs(data, fileName + this.fileExtension);
}

onToggle(id:any) {
  let el = <HTMLElement>document.getElementById(id);
  if(el.ariaPressed=="false")
  {
    //console.log("false");
    if(id=="PreAuthRequested")
    {
    this.PAStatebars.destroy();
    this.GetPAStateWise("PAAS","",this.state,"","A");
    }
    if(id=="ClaimSubmitted")
    {
      this.CSCStatebars.destroy();
      this.GetCSCStateWise("CSAS","",this.state,"","A");
    }
    if(id=="ClaimPending")
    {
      this.CPNCStatebars.destroy();
      this.GetCPNCStateWise("CPNAS","",this.state,"","A");
    }
    if(id=="ClaimOverdue")
    {
      this.COCStatebars.destroy();
      this.GetCOCStateWise("COAS","",this.state,"","A");
    }
    if(id=="ClaimPaid")
    {
      this.CPCStatebars.destroy();
      this.GetCPCStateWise("CPAS","",this.state,"","A");
    }
  }
  else
  {
   // console.log("true");
    if(id=="PreAuthRequested")
    {
    this.PAStatebars.destroy();
    this.GetPAStateWise("HAS","",this.state,"","C");
    }
    if(id=="ClaimSubmitted")
    {
      this.CSCStatebars.destroy();
      this.GetCSCStateWise("CSCS","",this.state,"","C");
    }
    if(id=="ClaimPending")
    {
      this.CPNCStatebars.destroy();
      this.GetCPNCStateWise("CPNCS","",this.state,"","C");
    }
    if(id=="ClaimOverdue")
    {
      this.COCStatebars.destroy();
      this.GetCOCStateWise("COCS","",this.state,"","C");
    }
    if(id=="ClaimPaid")
    {
      this.CPCStatebars.destroy();
      this.GetCPCStateWise("CPCS","",this.state,"","C");
    }
  }
    //console.log(el.ariaPressed);
}
cardReport()
  {this.router.navigate(['/cardreport']); }
  newcardReport()
  {this.router.navigate(['/setucardreport']); }
  bisReport()
  {this.router.navigate(['/bisdashboard']); }
  CGHSReport()
  {this.router.navigate(['/cghsinsights']); }
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
      console.log(this.chResp.list);

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
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:9

          },{
            label:'Tagged Families'  ,
            data: this.tag3,
            backgroundColor:'#a6edb7', // array should have same number of elements as number of dataset
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:9
          },{
            label:'Card to be Created'  ,
            data: this.tag4,
            backgroundColor:'#74f2ea', // array should have same number of elements as number of dataset
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:9
          },{
            label:'Ujjwala Families'  ,
            data: this.tag5,
            backgroundColor:'#119e95', // array should have same number of elements as number of dataset
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:9
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
                    console.log("Rizwan "+this.state_name);
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
    console.log("this.ddlTMSdistrictname : "+this.ddlTMSstatename);
    this.pmjReq.type=this.encrdecrdervice.encrypted('TMSCLAIMDM');
    this.pmjReq.state_code=this.encrdecrdervice.encrypted(this.ddlTMSstatename)||"";
    this.pmjReq.district_code="";
    this.pmjReq.rpttype="";
   this.apiService.GetStateDist(this.pmjReq).subscribe((response) => {
     //console.log(response);
       if(response['status']=="true")
   {
     this.TMSdistrictList=response['list'];
     //console.log(this.stateList);
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
     //console.log(response);
       if(response['status']=="true")
   {
     this.TMShospList=response['list'];
     //console.log(this.stateList);
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
      console.log("TMS Calim ");
      console.log(resp);
      if(resp.status=="true")
      {
        this.TMS_Claim_S_D_H_List=resp.list;
      //console.log(resp);  

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
    this.TMSCLAIMSBars.destroy();
   this.GetTMSCLAIM_S_D_H_Chart(this.ddlTMSstatename,this.ddlTMSdistrictname,this.ddlTMShospname, this.onToggleType);

   }
   Enable_State(val:any)
   {
    if(val=="D")
    {
      this.ddlstatename_disable=true;
    }
    else
    {
      this.ddlstatename_disable=false;
    }
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
                datasets: [/*{  
                  label:'Preauth Submitted'  ,        
                  data: this.preauth_sub_arr,
                  backgroundColor:'#7A8AFB', // array should have same number of elements as number of dataset
                  //borderRadius: Number.MAX_VALUE,
                  borderSkipped: false,
                  barThickness:14
                  
                },*/{  
                  label:'Pending at Hospitals'  ,        
                  data: this.arr_pending_hosp_c,
                  backgroundColor:'#92bf8a', 
                  borderSkipped: false,
                  barThickness:barThikness
                }/*,{  
                  label:'Claims Received'  ,        
                  data: this.claim_sub_arr,
                  backgroundColor:'#FBC774', // array should have same number of elements as number of dataset
                  //borderRadius: Number.MAX_VALUE,
                  borderSkipped: false,
                  barThickness:14
                }*/,{  
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
                               /* console.log("val1  : "+val1);

                              var str=val1;
                              var splitted = str.split(".", 2); 
      
                              var nStr=val1;
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
                                num=nStr*/
                                 
                              
                                toolt=label+ " : "+val1+" Cr";
                            }
                            //console.log();
                            //context.label.replace(context.dataset.label,"");
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
                     // this.tbldisplaywithChart=true;
                      //let el = <HTMLElement>document.getElementById("statewise");   
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
                   
                    //console.log(this.state_code);
                          
        
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
}
