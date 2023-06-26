import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CapfApiserviceService } from '../service/capf-apiservice.service';
import { Chart,LayoutItem,registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pmjreq } from '../model/pmjreq';
import { Cghsdatareq } from '../model/cghsdatareq';
import { Capfdatareq } from '../model/capfdatareq';
import { EncrDecrService } from '../model/encr-decr-service';


Chart.register(...registerables);
Chart.register(ChartDataLabels);
@Component({
  selector: 'app-capf-dashboard',
  templateUrl: './capf-dashboard.component.html',
  styleUrls: ['./capf-dashboard.component.css']
})
export class CapfDashboardComponent implements OnInit {

  preauth_sub_count:any;
  preauth_sub_amount:any;
  pending_hcos_count:any;
  pending_hcos_amount:any;
  claim_sub_count:any;
  claim_sub_amount:any;
  pending_nha_count:any;
  pending_nha_amount:any;
  pending_cghs_count:any;
  pending_cghs_amount:any;
  pending_pfms_count:any;
  pending_pfms_amount:any;
  claim_paid_count:any;
  claim_paid_amount:any;
  dm_amount:any;
  dm_pending:any;
  bank_pending:any;
  bank_pending_amount:any;
  preauth_sub_arr:any;
  //preauth_sub_amount_arr:any;
  pending_hcos_arr:any;
  //pending_hcos_amount_arr:any;
  claim_sub_arr:any;
  //claim_sub_amount_arr:any;
  pending_nha_arr:any;
  //pending_nha_amount_arr:any;
  pending_cghs_arr:any;
  //pending_cghs_amount_arr:any;
  pending_pfms_arr:any;
  //pending_pfms_amount_arr:any;
  claim_paid_arr:any;
  //claim_paid_amount_arr:any;
  cghs_state_name_arr:any;
  CGHSSTDBars:any;
  cghsdatareq:Capfdatareq;
  cghslistdata:any;
  CGHSDTDBars:any;
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

  CGHSLDTDBars:any;
  CGHSLDTD_Received_Count_arr:any;
  CGHSLDTD_Approved_Count_arr:any;
  CGHSLDTD_Reject_Count_arr:any;
  CGHSLDTD_Pending_Count_arr:any;
  CGHSLDTD_Date_arr:any;
  CGHSLDTD_Received_Amount_arr:any;
  CGHSLDTD_Approved_Amount_arr:any;
  CGHSLDTD_Reject_Amount_arr:any;
  CGHSLDTD_Pending_AMount_arr:any;
  CGHSLDTD_data_list:any;
  level:any;
  levelToggel:any='C';

  CGHSCLS_arr:any;
  CGHSCLS_Text_arr:any;
  CGHSCLS_State_Code_arr:any;
  CGHSCLS_Received_arr:any;
  CGHSCLS_Approved_arr:any;
  CGHSCLS_Reject_arr:any;
  CGHSCLS_Pending_arr:any;
  CGHSCLSBars:any;
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
  unittypeList:any;
  membertypeList:any;
  ddlforcetype:any="";
  ddlunittype:any="";
  ddlmembertype:any="";
  bank_rejected:any;
  bank_rejected_amount:any;
  CAPF_Aadhaar_Ver_per:any="0.00";
  capf_dllstate:any="";
  paiToggel:any='PAID';
  paidAmount:any;
  PaidCount:any;
  TDACount:any='NA';
  TDAAmount:any='NA';
  @ViewChild('CGHSSTDChart') CGHSSTDChart:any;
  @ViewChild('CGHSDTDChart') CGHSDTDChart:any;
  @ViewChild('CGHSLDTDChart') CGHSLDTDChart:any;
  @ViewChild('CGHSCSSChart') CGHSCSSChart:any;
  @ViewChild('modal') modal:any;

  constructor(public apiService: CapfApiserviceService,
    public router: Router) {
      this.cghsdatareq=new Capfdatareq();
      this.pmjReq=new Pmjreq();
      this.CGHSDTState_District="S";
      this.CGHS_State_Level_Summ="S";
      this.capftype="";
      this.capfForcetype="";
      this.encrdecrdervice=new EncrDecrService();
    }

  ngOnInit(): void {
    this.ddlforcetype="";
    this.GetUnitMaster();
    this.GetMemberMaster();
    this.GetCGHSTopHeadData(this.capftype,"","","",this.capfForcetype);
    //this.GetCGHSSTD(this.capftype,"TDS","C","","","");
    //this.GetCGHSDTD("TDD","T","","","","C");
    this.GetCAPFUserData(this.capftype,"","","","C",this.capfForcetype);
    this.GetCAPFBISData("","","","","");
    //this.GetCGHSUserStateData("","","","C");
    //this.GetCGHSStateLevelWise("NHA","T","","","","C");
    this.level="NHA";
    //this.GetCGHSCSS("","C","","","");
    this.levelcalimsummaryToggel="C";
    this.GetStateMaster();
    this.GetUploadDate();
    this.GetCAPFAadhaarVerPer();
    
   
  }
  bindHosp(event:any)
   {
    var val=event.target.value;
    this.ddldistrict=val;
   this.getHosp(this.ddlstate,val);

   }
   onToggle(id:any)
  {
    let el = <HTMLElement>document.getElementById(id);
    let capfuserdatacount = <HTMLScriptElement>document.getElementById('capfuserdatacount');
      let capfuserdataamount = <HTMLScriptElement>document.getElementById('capfuserdataamount');
      let cghsuserdatastatecount = <HTMLScriptElement>document.getElementById('cghsuserdatastatecount');
      let cghsuserdatastateamount = <HTMLScriptElement>document.getElementById('cghsuserdatastateamount');
      let STLac = <HTMLScriptElement>document.getElementById('STLac_CAPF');
      let CLSummaryCR = <HTMLScriptElement>document.getElementById('CLSummaryCR_CAPF');
    if(el.ariaPressed=="false")
    {
      if(id=="CAPF_statewise")
      {
        this.CGHSSTDBars.destroy();
        this.GetCGHSSTD(this.capftype,"TDS","A",this.ddlstate,this.ddldistrict,this.ddlhosp);
        STLac.style.display="inline-block";
      }
      if(id=="CAPF_datewise")
      {
        let elementW = <HTMLScriptElement>document.getElementById('CGHSTDW');
        let elementT = <HTMLScriptElement>document.getElementById('CGHSTDT');
        let elementA = <HTMLScriptElement>document.getElementById('CGHSTDA');

        elementW.className = '';
        elementT.className = 'active';
        elementA.className = '';

        this.CGHSDTDBars.destroy();
        this.GetCGHSDTD("TDD","T",this.ddlstate,this.ddldistrict,this.ddlhosp,"A");
      }
      if(id=="CAPF_togguserdata")
      {
        capfuserdatacount.style.display="none";
        capfuserdataamount.style.display="block";
        CLSummaryCR.style.display="inline-block";
      }
      if(id=="CAPF_togguserstatedata")
      {
        cghsuserdatastatecount.style.display="none";
        cghsuserdatastateamount.style.display="block";
      }

      if(id=="CAPF_CGHSLDTD")
      {
        //let elementW = <HTMLScriptElement>document.getElementById('CGHSLDTDW');
        //let elementT = <HTMLScriptElement>document.getElementById('CGHSLDTDT');
       

        //elementW.className = '';
       // elementT.className = 'active';
        

        this.CGHSLDTDBars.destroy();
        this.GetCGHSStateLevelWise(this.level,"T",this.ddlstate,this.ddldistrict,this.ddlhosp,"A");
        this.levelToggel='A';
      }
      if(id=="CAPF_levelcalimsummary")
      {
       // console.log("levelcalimsummary : "+this.levelcalimsummaryToggel)
        this.levelcalimsummaryToggel="A";
        this.CGHSCLSBars.destroy();
        this.GetCGHSCSS("",this.levelcalimsummaryToggel,this.ddlstate,this.ddldistrict,this.ddlhosp);
      }
    }
    else
    {
      if(id=="CAPF_statewise")
      {
        this.CGHSSTDBars.destroy();
        this.GetCGHSSTD(this.capftype,"TDS","C",this.ddlstate,this.ddldistrict,this.ddlhosp);
        STLac.style.display="none";
      }
      if(id=="CAPF_datewise")
      {
        let elementW = <HTMLScriptElement>document.getElementById('CGHSTDW');
        let elementT = <HTMLScriptElement>document.getElementById('CGHSTDT');
        let elementA = <HTMLScriptElement>document.getElementById('CGHSTDA');

        elementW.className = '';
        elementT.className = 'active';
        elementA.className = '';
        this.CGHSDTDBars.destroy();
        this.GetCGHSDTD("TDD","T",this.ddlstate,this.ddldistrict,this.ddlhosp,"C");
      }
      if(id=="CAPF_togguserdata")
      {
        capfuserdatacount.style.display="block";
        capfuserdataamount.style.display="none";
        CLSummaryCR.style.display="none";
      }
      if(id=="CAPF_togguserstatedata")
      {
        cghsuserdatastatecount.style.display="block";
        cghsuserdatastateamount.style.display="none";
      }
      if(id=="CAPF_CGHSLDTD")
      {
        //let elementW = <HTMLScriptElement>document.getElementById('CGHSLDTDW');
        //let elementT = <HTMLScriptElement>document.getElementById('CGHSLDTDT');
        

        //elementW.className = '';
        //elementT.className = 'active';
      

        this.CGHSLDTDBars.destroy();
        this.GetCGHSStateLevelWise(this.level,"T",this.ddlstate,this.ddldistrict,this.ddlhosp,"C");
        this.levelToggel='C';
      }
      if(id=="CAPF_levelcalimsummary")
      {
        this.levelcalimsummaryToggel="C";
        this.CGHSCLSBars.destroy();
        this.GetCGHSCSS("",this.levelcalimsummaryToggel,this.ddlstate,this.ddldistrict,this.ddlhosp);
      }
    }
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
  //this.CGHSSTDBars.destroy();
  //this.GetCGHSSTD(this.capftype,"TDS","C",this.ddlstate,this.ddldistrict,this.ddlhosp);
  //this.CGHSDTDBars.destroy();
  //this.GetCGHSDTD("TDD","T",this.ddlstate,this.ddldistrict,this.ddlhosp,"C");
  this.GetCAPFUserData(this.capftype,this.ddlstate,this.ddldistrict,this.ddlhosp,"C",this.capfForcetype);
  //this.CGHSLDTDBars.destroy();
 // this.GetCGHSStateLevelWise(this.level,"T",this.ddlstate,this.ddldistrict,this.ddlhosp,this.levelToggel);

  //this.CGHSCLSBars.destroy();
  //this.GetCGHSCSS("",this.levelcalimsummaryToggel,this.ddlstate,this.ddldistrict,this.ddlhosp);

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

  GetUnitMaster()
  {
    this.pmjReq.type=this.encrdecrdervice.encrypted('CAPFUM');
    if(this.ddlforcetype!="")
    this.pmjReq.state_code=this.encrdecrdervice.encrypted(this.ddlforcetype) ||"";
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
      this.cghsdatareq.type='TH';
      this.cghsdatareq.state_code=state_code;
      this.cghsdatareq.district_code=district_code;
      this.cghsdatareq.hosp_code=hosp_code;
      this.cghsdatareq.rpttype="";
      this.cghsdatareq.force_type=force_type;
      this.apiService.GetCAPFData(this.cghsdatareq).subscribe((response) => {
       
      if(response['status']=="true")
      {
        console.log(response['list']);
        this.cghslistdata=[];
        this.cghslistdata=response['list'];

        this.preauth_sub_count=this.getCommaValue(this.cghslistdata[0]['preauth_sub_count']);
        this.preauth_sub_amount=this.cghslistdata[0]['preauth_sub_amount'];
        this.pending_hcos_count=this.getCommaValue(this.cghslistdata[0]['pending_hcos_count']);

        this.pending_hcos_amount=this.cghslistdata[0]['pending_hcos_amount'];
        this.claim_sub_count=this.getCommaValue(this.cghslistdata[0]['claim_sub_count']);
        this.claim_sub_amount=this.cghslistdata[0]['claim_sub_amount'];
        this.pending_nha_count=this.getCommaValue(this.cghslistdata[0]['pending_nha_count']);
        this.pending_nha_amount=this.cghslistdata[0]['pending_nha_amount'];
        this.pending_cghs_count=this.getCommaValue(this.cghslistdata[0]['pending_cghs_count']);
        this.pending_cghs_amount=this.cghslistdata[0]['pending_cghs_amount'];
        this.pending_pfms_count=this.getCommaValue(this.cghslistdata[0]['pending_pfms_count']);
        this.pending_pfms_amount=this.cghslistdata[0]['pending_pfms_amount'];
        //this.claim_paid_count=this.getCommaValue(this.cghslistdata[0]['claim_paid_count']);
        //this.claim_paid_amount=this.cghslistdata[0]['claim_paid_amount'];
        this.PaidCount=this.getCommaValue(this.cghslistdata[0]['claim_paid_count']);
        this.paidAmount=this.cghslistdata[0]['claim_paid_amount']; 
        this.bank_pending=this.getCommaValue(this.cghslistdata[0]['bank_pending']);
        this.bank_pending_amount=this.cghslistdata[0]['bank_pending_amount'];
        this.dm_pending=this.getCommaValue(this.cghslistdata[0]['dm_pending']);
        this.dm_amount=this.cghslistdata[0]['dm_amount'];
        this.bank_rejected=this.getCommaValue(this.cghslistdata[0]['bank_rejected']);
        this.bank_rejected_amount=this.cghslistdata[0]['bank_rejected_amount'];
        var totalTDA=Number(this.cghslistdata[0]['pending_hcos_amount'])+Number(this.cghslistdata[0]['pending_nha_amount'])+Number(this.cghslistdata[0]['dm_amount'])+Number(this.cghslistdata[0]['pending_cghs_amount'])+Number(this.cghslistdata[0]['pending_pfms_amount'])+Number(this.cghslistdata[0]['bank_pending_amount'])+Number(this.cghslistdata[0]['bank_rejected_amount'])+Number(this.cghslistdata[0]['claim_paid_amount']);
        this.TDAAmount=Number(this.cghslistdata[0]['claim_sub_amount'])-totalTDA;
        if(this.paiToggel=="PAID")
        {
          this.claim_paid_count=this.PaidCount;
          this.claim_paid_amount=this.paidAmount;
        }
        else
        {
          this.claim_paid_count="NA";
          this.claim_paid_amount=this.TDAAmount;
        }

      }
      });
   }

   GetCAPFUserData(app_type:any,state_code:any,district_code:any,hosp_code:any,toggelType:any,force_type:any)
   {
      let capfuserdatacount = <HTMLScriptElement>document.getElementById('capfuserdatacount');
      let capfuserdataamount = <HTMLScriptElement>document.getElementById('capfuserdataamount');
      let CLSummaryCR = <HTMLScriptElement>document.getElementById('CLSummaryCR_CAPF');
      if(toggelType=="C")
      {
        capfuserdatacount.style.display='block';
        capfuserdataamount.style.display='none';
        CLSummaryCR.style.display='none';
      }
      if(toggelType=="A")
      {
        capfuserdatacount.style.display='none';
        capfuserdataamount.style.display='block';
        CLSummaryCR.style.display='inline-block';
      }
      this.cghsdatareq.app_type=app_type;
      this.cghsdatareq.type='ULD';
      this.cghsdatareq.state_code=state_code;
      this.cghsdatareq.district_code=district_code;
      this.cghsdatareq.hosp_code=hosp_code;
      this.cghsdatareq.rpttype="";
      this.cghsdatareq.force_type=force_type;
      this.apiService.GetCAPFUserData(this.cghsdatareq).subscribe((response) => {
       
      
      if(response['status']=="true")
      {
        this.cghsuserdata=[];
        this.cghsuserdata=response['list'];
      }
      });
   }

   GetCGHSUserStateData(state_code:any,district_code:any,hosp_code:any,toggelType:any)
   {
      let capfuserdatacount = <HTMLScriptElement>document.getElementById('cghsuserdatastatecount');
      let capfuserdataamount = <HTMLScriptElement>document.getElementById('cghsuserdatastateamount');
      if(toggelType=="C")
      {
        capfuserdatacount.style.display='block';
        capfuserdataamount.style.display='none';
      }
      if(toggelType=="A")
      {
        capfuserdatacount.style.display='none';
        capfuserdataamount.style.display='block';
      }
      this.cghsdatareq.type='USD';
      this.cghsdatareq.state_code="";
      this.cghsdatareq.district_code="";
      this.cghsdatareq.hosp_code="";
      this.cghsdatareq.rpttype="";
      this.apiService.GetCAPFUserData(this.cghsdatareq).subscribe((response) => {
      //console.log(response);
      if(response['status']=="true")
      {
        this.cghsuserstatedata=[];
        this.cghsuserstatedata=response['list'];
      }
      });
   }

   GetCGHSSTD(app_type:any,type:any,rpttype:any,state_code:any,district_code:any,hosp_code:any)
   {
    let STLac = <HTMLScriptElement>document.getElementById('STLac_CAPF');
    this.cghsdatareq.app_type=app_type;
    this.cghsdatareq.type=type;
    this.cghsdatareq.state_code=state_code;
    this.cghsdatareq.district_code=district_code;
    this.cghsdatareq.hosp_code=hosp_code;
    this.cghsdatareq.rpttype=rpttype;
    this.apiService.GetCAPFData(this.cghsdatareq).subscribe((response) => {

      console.log(response);
      if(response['status']=="true")
      {
        this.cghslistdata=[];
        this.cghslistdata=response['list'];

       //this.ACGDTcolor=[];

       this.preauth_sub_arr=[];
       //this.preauth_sub_amount_arr=[];
       this.pending_hcos_arr=[];
      // this.pending_hcos_amount_arr=[];
       this.claim_sub_arr=[];
       //this.claim_sub_amount_arr=[];
       this.pending_nha_arr=[];
       //this.pending_nha_amount_arr=[];
       this.pending_cghs_arr=[];
       //this.pending_cghs_amount_arr=[];
       this.pending_pfms_arr=[];
      // this.pending_pfms_amount_arr=[];
       this.claim_paid_arr=[];
       //this.claim_paid_amount_arr=[];
       this.cghs_state_name_arr=[];
       this.state_code_arr=[];
       this.district_code_arr=[];
       this.cghsstatewise=[];
       this.cghsstatewise=this.cghslistdata;
            for(var i in this.cghslistdata)
            {
              this.state_code_arr.push(this.cghslistdata[i]['state_code']);
              this.district_code_arr.push(this.cghslistdata[i]['district_code']);
              this.cghs_state_name_arr.push(this.cghslistdata[i]['state_name']);
              if(rpttype=="C")
              {
                this.preauth_sub_arr.push(this.cghslistdata[i]['preauth_sub_count']);
                this.pending_hcos_arr.push(this.cghslistdata[i]['pending_hcos_count']);
                this.claim_sub_arr.push(this.cghslistdata[i]['claim_sub_count']);
                this.pending_nha_arr.push(this.cghslistdata[i]['pending_nha_count']);
                this.pending_cghs_arr.push(this.cghslistdata[i]['pending_cghs_count']);
                this.pending_pfms_arr.push(this.cghslistdata[i]['pending_pfms_count']);
                this.claim_paid_arr.push(this.cghslistdata[i]['claim_paid_count']);

              }
              if(rpttype=="A")
              {
                this.preauth_sub_arr.push(this.cghslistdata[i]['preauth_sub_amount']);
                this.pending_hcos_arr.push(this.cghslistdata[i]['pending_hcos_amount']);
                this.claim_sub_arr.push(this.cghslistdata[i]['claim_sub_amount']);
                this.pending_nha_arr.push(this.cghslistdata[i]['pending_nha_amount']);
                this.pending_cghs_arr.push(this.cghslistdata[i]['pending_cghs_amount']);
                this.pending_pfms_arr.push(this.cghslistdata[i]['pending_pfms_amount']);
                this.claim_paid_arr.push(this.cghslistdata[i]['claim_paid_amount']);

/*
                this.cghsstatewise[i]['preauth_sub_count'].push(this.cghslistdata[i]['preauth_sub_amount']);
                this.cghsstatewise[i]['pending_hcos_count'].push(this.cghslistdata[i]['pending_hcos_amount']);
                this.cghsstatewise[i]['claim_sub_count'].push(this.cghslistdata[i]['claim_sub_amount']);
                this.cghsstatewise[i]['pending_nha_count'].push(this.cghslistdata[i]['pending_nha_amount']);
                this.cghsstatewise[i]['pending_cghs_count'].push(this.cghslistdata[i]['pending_cghs_amount']);
                this.cghsstatewise[i]['pending_pfms_count'].push(this.cghslistdata[i]['pending_pfms_amount']);
                this.cghsstatewise[i]['claim_paid_count'].push(this.cghslistdata[i]['claim_paid_amount']);
                */
              }
            }
            if(this.cghs_state_name_arr.length>=50)
            {
            //this.CGHSSTDCElement = this.CGHSSTDChart.nativeElement;
            //var px=(this.cghs_state_name_arr.length*50)+"px";
            //this.CGHSSTDCElement.style.maxWidth=px;
            }
            //this.CGHSSTDBars = new Chart(this.CGHSSTDChart.nativeElement, { type: 'bar',
         // data: {labels:this.cghs_state_name_arr,datasets:[]}});
         // this.CGHSSTDBars.destroy();
            let cpaf_tblstatewisecount = <HTMLScriptElement>document.getElementById('cpaf_tblstatewisecount');
            let capf_tblstatewiseamount = <HTMLScriptElement>document.getElementById('capf_tblstatewiseamount');
            let chartstatewise = <HTMLScriptElement>document.getElementById('capf_chartstatewise');
            //console.log("state_code : "+state_code);
            //console.log("district_code : "+district_code);
            if(state_code=="" || district_code=="")
            {
              cpaf_tblstatewisecount.style.display='none';
              capf_tblstatewiseamount.style.display='none';
              chartstatewise.style.display='block';
            }
            else
            {
              if(rpttype=="C")
              {
              cpaf_tblstatewisecount.style.display='block';
              capf_tblstatewiseamount.style.display='none';
              }
              if(rpttype=="A")
              {
                capf_tblstatewiseamount.style.display='block';
                cpaf_tblstatewisecount.style.display='none';
              }
              chartstatewise.style.display='none';
            }
            if(state_code=="" && district_code=="" && hosp_code=="")
            {
                this.state_name=this.cghslistdata[0]['state_name'];
                this.statedatehospwise="State";
                STLac.style.display="none";
            }
            else if(state_code!="" && district_code=="" && hosp_code=="")
            {
             
              this.district_name=this.cghslistdata[0]['state_name'];
                this.statedatehospwise="District( State - "+this.state_name+")";
                STLac.style.display="none";
            }
            else
            {
                this.statedatehospwise="Hospital(State - "+this.state_name+" : District - "+this.district_name+")";
                if(rpttype=="A")
                STLac.style.display="inline-block";
                else
                STLac.style.display="none";
            }
            $('#capfstatewisecount').DataTable().clear().destroy();
              setTimeout(()=>{
            $('#capfstatewisecount').DataTable( {
              pagingType: 'full_numbers',
              pageLength: 25,
              searching:true,
              paging:true,
              processing: true,
              lengthMenu : [10, 25,50],
              });
              }, 1);

              /*$('#capfstatewiseamount').DataTable().clear().destroy();
              setTimeout(()=>{
             $('#capfstatewiseamount').DataTable( {
              pagingType: 'full_numbers',
              pageLength: 25,
              searching:true,
              paging:true,
              processing: true,
              lengthMenu : [10, 25,50],
              });
              }, 1);*/

      this.CGHSSTDBars = new Chart(this.CGHSSTDChart.nativeElement, {
        type: 'bar',
        data: {
          labels: this.cghs_state_name_arr,
          datasets: [{
            label:'Pending at NHA'  ,
            data: this.pending_nha_arr,
            backgroundColor:'#FD807A', // array should have same number of elements as number of dataset
            //borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:14
          },{
            label:'Pending at DM'  ,
            data: this.pending_hcos_arr,
            backgroundColor:'#FFB8B8',
            borderSkipped: false,
            barThickness:14
          },{
            label:'Pending at SHA'  ,
            data: this.pending_cghs_arr,
            backgroundColor:'#58D1FF', // array should have same number of elements as number of dataset
            //borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:14
          }/*,{
            label:'Pending at PFMS'  ,
            data: this.pending_pfms_arr,
            backgroundColor:'#B4B4B4', // array should have same number of elements as number of dataset
            borderSkipped: false,
            barThickness:14
          }*/,{
            label:'Claim Paid'  ,
            data: this.claim_paid_arr,
            backgroundColor:'#CCA1FD', // array should have same number of elements as number of dataset
            //borderRadius: Number.MAX_VALUE,
            //borderRadius:3,
            borderSkipped: false,
            barThickness:14
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
              boxWidth:8,}, position:"bottom",}
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
          },
          onClick: (evt, item) => {
            let index = item[0]["index"];
                this.tbldisplaywithChart=true;
                let el = <HTMLElement>document.getElementById("CAPF_statewise");
                if(this.CGHSDTState_District=="S")
                {
                 this.CGHSSTDBars.destroy();
                 if(el.ariaPressed=="true")
                  this.GetCGHSSTD(this.capftype,"TDS","A",this.state_code_arr[index],"","");
                else
                 this.GetCGHSSTD(this.capftype,"TDS","C",this.state_code_arr[index],"","");
                 this.CGHSDTState_District="D";
                 this.ddlstate=this.state_code_arr[index];
                }
                else if(this.CGHSDTState_District=="D")
                {
                  this.CGHSSTDBars.destroy();
                 if(el.ariaPressed=="true")
                  this.GetCGHSSTD(this.capftype,"TDS","A",this.state_code_arr[index],this.district_code_arr[index],"");
                 else
                 this.GetCGHSSTD(this.capftype,"TDS","C",this.state_code_arr[index],this.district_code_arr[index],"");
                 this.CGHSDTState_District="F";

                 this.ddldistrict=this.district_code_arr[index];
                }
                else
                {
                 this.CGHSSTDBars.destroy();
                 if(el.ariaPressed=="true")
                    this.GetCGHSSTD(this.capftype,"TDS","A",this.ddlstate,"","");
                 else
                    this.GetCGHSSTD(this.capftype,"TDS","C",this.ddlstate,"","");
                 this.CGHSDTState_District="S";
                }

              //console.log(this.state_code);


          },
          scales:{x:{grid:{display:false},stacked:true,suggestedMin: 50,suggestedMax: 100,ticks:{

            maxRotation: 180,
            minRotation: 90,
            autoSkip: false,
            font:{size:12,family:'Roboto'},color:'#989898'
        }},y:{grid:{display:false},stacked:true,ticks:{

          font:{size:12,family:'Roboto'},color:'#989898'
      }}}
        }
      });

    }
    });
   }
   getCAPFReport(event:any)
   {
    var val=event.target.value;
    this.capftype=val;
    this.GetCGHSTopHeadData(this.capftype,"","","",this.capfForcetype);
    this.GetCAPFUserData(this.capftype,"","","","C",this.capfForcetype);
    
   }

   getCAPFReport_Force(event:any)
   {
    var val=event.target.value;
    
    this.capfForcetype=val;
    this.GetCGHSTopHeadData(this.capftype,"","","",this.capfForcetype);
    this.GetCAPFUserData(this.capftype,"","","","C",this.capfForcetype);
    
   }

   GetCGHSCSS(type:any,rpttype:any,state_code:any,district_code:any,hosp_code:any)
   {
    this.cghsdatareq.type='USD';
      this.cghsdatareq.state_code=state_code;
      this.cghsdatareq.district_code=district_code;
      this.cghsdatareq.hosp_code=hosp_code;
      this.cghsdatareq.rpttype="";
      this.apiService.GetCAPFUserData(this.cghsdatareq).subscribe((response) => {
       
      if(response['status']=="true")
      {
        this.CGHSCLS_arr=[];
        this.CGHSCLS_Text_arr=[];
        this.CGHSCLS_State_Code_arr=[];
        this.CGHSCLS_Received_arr=[];
        this.CGHSCLS_Approved_arr=[];
        this.CGHSCLS_Reject_arr=[];
        this.CGHSCLS_Pending_arr=[];
        this.CGHSCLS_arr=response['list'];
            for(var i in this.CGHSCLS_arr)
            {
              this.CGHSCLS_Text_arr.push(this.CGHSCLS_arr[i]['user_name']);
              this.CGHSCLS_State_Code_arr.push(this.CGHSCLS_arr[i]['state_code']);
              if(rpttype=="C")
              {
                this.CGHSCLS_Received_arr.push(this.CGHSCLS_arr[i]['received_count']);
                this.CGHSCLS_Approved_arr.push(this.CGHSCLS_arr[i]['approved_count']);
                this.CGHSCLS_Reject_arr.push(this.CGHSCLS_arr[i]['rejected_count']);
                this.CGHSCLS_Pending_arr.push(this.CGHSCLS_arr[i]['pending_count']);

              }
              if(rpttype=="A")
              {
                this.CGHSCLS_Received_arr.push(this.CGHSCLS_arr[i]['received_amount']);
                this.CGHSCLS_Approved_arr.push(this.CGHSCLS_arr[i]['approved_amount']);
                this.CGHSCLS_Reject_arr.push(this.CGHSCLS_arr[i]['rejected_amount']);
                this.CGHSCLS_Pending_arr.push(this.CGHSCLS_arr[i]['pending_amount']);

              }
            }

      this.CGHSCLSBars = new Chart(this.CGHSCSSChart.nativeElement, {
        type: 'bar',
        data: {
          labels: this.CGHSCLS_Text_arr,
          datasets: [{
            label:'Received'  ,
            data: this.CGHSCLS_Received_arr,
            backgroundColor:'#7A8AFB',
            borderSkipped: false,
            barThickness:14
          },{
            label:'Approved'  ,
            data: this.CGHSCLS_Approved_arr,
            backgroundColor:'#FEB8B8', // array should have same number of elements as number of dataset
            //borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:14
          },{
            label:'Rejected'  ,
            data: this.CGHSCLS_Reject_arr,
            backgroundColor:'#FD807A', // array should have same number of elements as number of dataset
            //borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:14
          },{
            label:'Pending'  ,
            data: this.CGHSCLS_Pending_arr,
            backgroundColor:'#B4B4B4', // array should have same number of elements as number of dataset
            borderSkipped: false,
            barThickness:14
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
              boxWidth:8,}, position:"bottom",}
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
          },onClick: (evt, item) => {
            let index = item[0]["index"];

                if(this.CGHS_State_Level_Summ=="S")
                {
               
                 this.CGHSCLSBars.destroy();
                 this.GetCGHSCSS("",this.levelcalimsummaryToggel,this.CGHSCLS_State_Code_arr[index],"","");
                 this.CGHS_State_Level_Summ="L";
                 //this.ddlstate=this.CGHSCLS_State_Code_arr[index];
                }
                else
                {
                  this.CGHSCLSBars.destroy();
                  this.GetCGHSCSS("",this.levelcalimsummaryToggel,this.ddlstate,"","");
                  this.CGHS_State_Level_Summ="S";
                }

              //console.log(this.state_code);


          },
          scales:{x:{grid:{display:false},stacked:true,suggestedMin: 50,suggestedMax: 100,ticks:{

            maxRotation: 180,
            minRotation: 90,
            autoSkip: false,
            font:{size:12,family:'Roboto'},color:'#989898'
        }},y:{grid:{display:false},stacked:true,ticks:{

          font:{size:12,family:'Roboto'},color:'#989898'
      }}}
        }
      });

    }
    });
   }



   GetCGHSDTD(type:any,rpttype:any,state_code:any,district_code:any,hosp_code:any,togtype:any)
   {
    this.cghsdatareq.type=type;
    this.cghsdatareq.state_code=state_code;
    this.cghsdatareq.district_code=district_code;
    this.cghsdatareq.hosp_code=hosp_code;
    this.cghsdatareq.rpttype=rpttype;
    this.apiService.GetCAPFData(this.cghsdatareq).subscribe((response) => {

      //console.log(response);
      if(response['status']=="true")
      {
        this.cghslistdata=[];
        this.cghslistdata=response['list'];

       //this.ACGDTcolor=[];

       this.preauth_sub_arr=[];
       //this.preauth_sub_amount_arr=[];
       this.pending_hcos_arr=[];
      // this.pending_hcos_amount_arr=[];
       this.claim_sub_arr=[];
       //this.claim_sub_amount_arr=[];
       this.pending_nha_arr=[];
       //this.pending_nha_amount_arr=[];
       this.pending_cghs_arr=[];
       //this.pending_cghs_amount_arr=[];
       this.pending_pfms_arr=[];
      // this.pending_pfms_amount_arr=[];
       this.claim_paid_arr=[];
       //this.claim_paid_amount_arr=[];
       this.cghs_state_name_arr=[];
            for(var i in this.cghslistdata)
            {
              this.cghs_state_name_arr.push(this.cghslistdata[i]['created_date']);
              if(togtype=="C")
              {
                this.preauth_sub_arr.push(this.cghslistdata[i]['preauth_sub_count']);
                this.pending_hcos_arr.push(this.cghslistdata[i]['pending_hcos_count']);
                this.claim_sub_arr.push(this.cghslistdata[i]['claim_sub_count']);
                this.pending_nha_arr.push(this.cghslistdata[i]['pending_nha_count']);
                this.pending_cghs_arr.push(this.cghslistdata[i]['pending_cghs_count']);
                this.pending_pfms_arr.push(this.cghslistdata[i]['pending_pfms_count']);
                this.claim_paid_arr.push(this.cghslistdata[i]['claim_paid_count']);
              }
              if(togtype=="A")
              {
                this.preauth_sub_arr.push(this.cghslistdata[i]['preauth_sub_amount']);
                this.pending_hcos_arr.push(this.cghslistdata[i]['pending_hcos_amount']);
                this.claim_sub_arr.push(this.cghslistdata[i]['claim_sub_amount']);
                this.pending_nha_arr.push(this.cghslistdata[i]['pending_nha_amount']);
                this.pending_cghs_arr.push(this.cghslistdata[i]['pending_cghs_amount']);
                this.pending_pfms_arr.push(this.cghslistdata[i]['pending_pfms_amount']);
                this.claim_paid_arr.push(this.cghslistdata[i]['claim_paid_amount']);

              }
            }

      this.CGHSDTDBars = new Chart(this.CGHSDTDChart.nativeElement, {
        type: 'line',
        data: {
          labels: this.cghs_state_name_arr,
          datasets: [/*{
            label:'Preauth Submitted'  ,
            data: this.preauth_sub_arr,
            backgroundColor:'#7A8AFB', // array should have same number of elements as number of dataset
            //borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:14

          },{
            label:'Pending at HCOs'  ,
            data: this.pending_hcos_arr,
            backgroundColor:'#FFB8B8', // array should have same number of elements as number of dataset
            //borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:14
          },{
            label:'Claims Submitted'  ,
            data: this.claim_sub_arr,
            backgroundColor:'#FBC774', // array should have same number of elements as number of dataset
            //borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:14
          },{
            label:'Pending at NHA'  ,
            data: this.pending_nha_arr,
            backgroundColor:'#FD807A', // array should have same number of elements as number of dataset
            //borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:14
          },*/{
            label:'Pending at CGHS'  ,
            data: this.pending_cghs_arr,
            backgroundColor: 'rgba(254, 236, 244,.7)',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: '#F54394',// array should have same number of elements as number of dataset
            borderWidth: 2,
            //fill:true,
            pointRadius:2,
            pointBorderColor:'#F54394',
          },{
            label:'Pending at PFMS'  ,
            data: this.pending_pfms_arr,
            backgroundColor: 'rgba(232, 231, 241,.7)',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: '#21C895',// array should have same number of elements as number of dataset
            borderWidth: 2,
            //fill:true,
            pointRadius:2,
            pointBorderColor:'#21C895',
          },{
            label:'Claim Paid'  ,
            data: this.claim_paid_arr,
            backgroundColor: 'rgba(235, 217, 190,.7)',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: '#F7B046',// array should have same number of elements as number of dataset
            borderWidth: 2,
            //fill:true,
            pointRadius:2,
            pointBorderColor:'#F7B046',

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
              boxWidth:8,}, position:"bottom",}
            ,
            datalabels: {
              display:false,

            },
          },
          indexAxis: 'x',
          elements: {
            line: {
              borderWidth: 0,
              tension:.4,
            }
          },
          scales:{x:{grid:{display:false},stacked:true,suggestedMin: 50,suggestedMax: 100,ticks:{

            maxRotation: 180,
            minRotation: 90,
            autoSkip: false,
            font:{size:12,family:'Roboto'},color:'#989898'
        }},y:{grid:{display:false},stacked:true,ticks:{

          font:{size:12,family:'Roboto'},color:'#989898'
      }}}
        }
      });

    }
    });
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

  CGHSTDclickme(type:any){

    this.CGHSDTDBars.destroy();
    this.GetCGHSDTD("TDD",type,this.ddlstate,this.ddldistrict,this.ddlhosp,"A");

    let elementW = <HTMLScriptElement>document.getElementById('CGHSTDW');
    let elementT = <HTMLScriptElement>document.getElementById('CGHSTDT');
    let elementA = <HTMLScriptElement>document.getElementById('CGHSTDA');
    //console.log(elementW);
    if(type=='W')
    {
      elementW.className = 'active';
      elementT.className = '';
      elementA.className = '';
    }
    if(type=='T')
    {
        elementW.className = '';
        elementT.className = 'active';
        elementA.className = '';
    }
    if(type=='A')
    {
        elementW.className = '';
        elementT.className = '';
        elementA.className = 'active';
    }

  }

  CGHSLDTDclickme(type:any){

    this.CGHSLDTDBars.destroy();
    this.GetCGHSStateLevelWise(this.level,type,this.ddlstate,this.ddldistrict,this.ddlhosp,this.levelToggel);


    /*let elementW = <HTMLScriptElement>document.getElementById('CGHSLDTDW');
    let elementT = <HTMLScriptElement>document.getElementById('CGHSLDTDT');
    
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
    if(type=='A')
    {
        elementW.className = '';
        elementT.className = '';
        
    }*/

  }

  GetCGHSStateLevelWise(type:any,rpttype:any,state_code:any,district_code:any,hosp_code:any,togtype:any)
   {
    this.cghsdatareq.type=type;
    this.cghsdatareq.state_code=state_code;
    this.cghsdatareq.district_code=district_code;
    this.cghsdatareq.hosp_code=hosp_code;
    this.cghsdatareq.rpttype=rpttype;
    this.apiService.GetCAPFUserData(this.cghsdatareq).subscribe((response) => {
     
      if(response['status']=="true")
      {
        this.CGHSLDTD_data_list=[];
        this.CGHSLDTD_data_list=response['list'];

       //this.ACGDTcolor=[];

       this.CGHSLDTD_Approved_Amount_arr=[];
       this.CGHSLDTD_Received_Amount_arr=[];
       this.CGHSLDTD_Reject_Amount_arr=[];
       this.CGHSLDTD_Pending_AMount_arr=[];
       this.CGHSLDTD_Date_arr=[];

       this.CGHSLDTD_Approved_Count_arr=[];
       this.CGHSLDTD_Received_Count_arr=[];
       this.CGHSLDTD_Reject_Count_arr=[];
       this.CGHSLDTD_Pending_Count_arr=[];

            for(var i in this.CGHSLDTD_data_list)
            {

              this.CGHSLDTD_Date_arr.push(this.CGHSLDTD_data_list[i]['user_name']);
              if(togtype=="C")
              {

                this.CGHSLDTD_Approved_Count_arr.push(Number(this.CGHSLDTD_data_list[i]['approved_count'])+Number(this.CGHSLDTD_data_list[i]['rejected_count']));
                this.CGHSLDTD_Received_Count_arr.push(this.CGHSLDTD_data_list[i]['received_count']);
                this.CGHSLDTD_Reject_Count_arr.push(this.CGHSLDTD_data_list[i]['rejected_count']);
                this.CGHSLDTD_Pending_Count_arr.push(this.CGHSLDTD_data_list[i]['pending_count']);

              }
              if(togtype=="A")
              {
                this.CGHSLDTD_Approved_Count_arr.push(Number(this.CGHSLDTD_data_list[i]['approved_amount'])+Number(this.CGHSLDTD_data_list[i]['rejected_amount']));
                this.CGHSLDTD_Received_Count_arr.push(this.CGHSLDTD_data_list[i]['received_amount']);
                this.CGHSLDTD_Reject_Count_arr.push(this.CGHSLDTD_data_list[i]['rejected_amount']);
                this.CGHSLDTD_Pending_Count_arr.push(this.CGHSLDTD_data_list[i]['pending_amount']);
              }
            }

      this.CGHSLDTDBars = new Chart(this.CGHSLDTDChart.nativeElement, {
        type: 'line',
        data: {
          labels: this.CGHSLDTD_Date_arr,
          datasets: [{
            label:'Received'  ,
            data: this.CGHSLDTD_Received_Count_arr,
            //backgroundColor:'#7A8AFB', // array should have same number of elements as number of dataset
            //borderRadius: Number.MAX_VALUE,
            //borderSkipped: false,
            //barThickness:14

            backgroundColor: 'rgba(248,228,181,.7)',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgba(248,228,181,.7)',// array should have same number of elements as number of dataset
            borderWidth: 2,
           // fill:true,
            pointRadius:2,
            pointBorderColor:'#EBA425',
          },{
            label:'Processed'  ,
            data: this.CGHSLDTD_Approved_Count_arr,
           // backgroundColor:'#FEB8B8', // array should have same number of elements as number of dataset
            //borderRadius: Number.MAX_VALUE,
            //borderSkipped: false,
            //barThickness:14
            backgroundColor: 'rgba(199, 245, 191,.7)',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgba(199, 245, 191,.7)',// array should have same number of elements as number of dataset
            borderWidth: 2,
            //fill:true,
            pointRadius:2,
            pointBorderColor:'#ACEDA1',

          }/*,{
            label:'Rejected'  ,
            data: this.CGHSLDTD_Reject_Count_arr,
            backgroundColor:'#FD807A', // array should have same number of elements as number of dataset
            //borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:14
          }*/,{
            label:'Pending'  ,
            data: this.CGHSLDTD_Pending_Count_arr,
            //backgroundColor:'#B4B4B4', // array should have same number of elements as number of dataset
            //borderSkipped: false,
            //barThickness:14
            backgroundColor: '#F54394',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: '#F54394',// array should have same number of elements as number of dataset
            borderWidth: 2,
            //fill:true,
            pointRadius:2,
            pointBorderColor:'#F54394',
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
          },
          indexAxis: 'x',
          elements: {
            line: {
              borderWidth: 0,
              tension:.4,
            }
          },
          scales:{x:{grid:{display:true},suggestedMin: 50,suggestedMax: 100,ticks:{

            maxRotation: 180,
            minRotation: 90,
            autoSkip: false,
            font:{size:12,family:'Roboto'},color:'#989898'
        }},y:{grid:{display:true},ticks:{

          font:{size:12,family:'Roboto'},color:'#989898'
      }}}
        }
      });

    }
    });
   }
   getLevel(event:any)
   {
    var val=event.target.value;
    this.level=val;
    this.CGHSLDTDBars.destroy();
    this.GetCGHSStateLevelWise(val,"T",this.ddlstate,this.ddldistrict,this.ddlhosp,this.levelToggel);
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
   onStateChange()
   {
    
    this.GetCAPFBISData("","","","","");
   }

   onForceChange()
   {
    this.GetUnitMaster();
    this.ddlunittype="";
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
      this.cghsdatareq.force_type=this.ddlforcetype || "";
      this.cghsdatareq.unit_type=this.ddlunittype || "";
      this.cghsdatareq.member_type=this.ddlmembertype || "";
      this.apiService.GetCAPFData(this.cghsdatareq).subscribe((response) => {
        
      if(response['status']=="true")
      {
        this.capfbisdata=[];
        this.capfbisdata=response['list'];
      }
      });
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


   GetCAPFAadhaarVerPer()
   {
      this.cghsdatareq.app_type="";
      this.cghsdatareq.type="";
      this.cghsdatareq.state_code="";
      this.cghsdatareq.district_code="";
      this.cghsdatareq.hosp_code="";
      this.cghsdatareq.rpttype="";
      this.cghsdatareq.force_type="";
      this.cghsdatareq.app_type="";
      this.cghsdatareq.unit_type="";
      this.cghsdatareq.member_type="";
      this.apiService.GetcapfAadhaarVer_Per(this.cghsdatareq).subscribe((response) => {
      
      if(response['status']=="true")
      {       
          this.CAPF_Aadhaar_Ver_per=response['per'];

      }
      });
   }
   tooltipClose(id:any)
  {
    let divid = <HTMLScriptElement>document.getElementById(id);
    divid.style.display="none";
  }
  tooltipOpen(id:any)
  {    
    let divid = <HTMLScriptElement>document.getElementById(id);
    
    divid.style.display="block";
  }
  onPaidTogg(id:any)
  {
    let el = <HTMLElement>document.getElementById(id);   
    if(el.ariaPressed=="false")
      {
        this.paiToggel="TDA";
      }
      else
      {
        this.paiToggel="PAID";
      }

      if(this.paiToggel=="PAID")
        {    
          this.claim_paid_count=this.PaidCount;
          this.claim_paid_amount=this.paidAmount;
        }
        else
        {
          this.claim_paid_count="NA";
          this.claim_paid_amount=this.TDAAmount;
        }
  }
}
