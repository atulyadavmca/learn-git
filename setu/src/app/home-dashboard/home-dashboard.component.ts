import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart,registerables } from 'chart.js';
import { ChartResp } from '../model/chart-resp';
import { Pmjreq } from '../model/pmjreq';
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
//declare var jsPDF: any;
@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})


export class HomeDashboardComponent implements OnInit {
  pmjReq:Pmjreq;
  statename:StnameReq;
  treatpatientreq:TreatPatientReq;
  Today:any
  IToday:any
  IOverall:any
  Overall:any
  HOoday:any
  HOverall:any
  stateList:any;
  stateList_HOSP:any;
  DistrictList:any;
  DistrictList_HOSP:any;
  HospList:any;
  ACGGtxtArr:any;
  ACGGBars:any;
  ACGGTextArr:any;
  ACGGValueArr:any;
  ACGGcolor:any;

  ACGAtxtArr:any;
  ACGABars:any;
  ACGATextArr:any;
  ACGAValueArr:any;
  ACGAcolor:any;


  ACGDTtxtArr:any;
  ACGDTBars:any;
  ACGDTTextArr:any;
  ACGDTValueArr:any;
  ACGDTcolor:any;



  ACIGtxtArr:any;
  ACIGBars:any;
  ACIGTextArr:any;
  ACIGValueArr:any;
  ACIGcolor:any;

  ACIAtxtArr:any;
  ACIABars:any;
  ACIATextArr:any;
  ACIAValueArr:any;
  ACIAcolor:any;


  ACIDTtxtArr:any;
  ACIDTBars:any;
  ACIDTTextArr:any;
  ACIDTValueArr:any;
  ACIDTcolor:any;


  //barsACIS: any;
  //ACISTextArr:any;
  //ACISValueArr:any;
  //ACIStxtArr:any;


  HAGtxtArr:any;
  HAGBars:any;
  HAGTextArr:any;
  HAGValueArr:any;
  HAGcolor:any;

  HAAtxtArr:any;
  HAABars:any;
  HAATextArr:any;
  HAAValueArr:any;
  HAAcolor:any;


  HADTtxtArr:any;
  HADTBars:any;
  HADTTextArr:any;
  HADTValueArr:any;
  HADTcolor:any;


  HETDtxtArr:any;
  HETDBars:any;
  HETDTextArr:any;
  HETDValueArr:any;
  HETDcolor:any;


  barsHAS: any;
  HASTextArr:any;
  HASValueArr:any;
  HAStxtArr:any;

  barsTP: any;
  TPTextArr:any;
  TPValueArr:any;
  TPtxtArr:any;
  TPIDtxtArr:any;

  HEBbars: any;
  HEBTextArr:any;
  HEBValueArr:any;
  HEBtxtArr:any;

  barsHES: any;
  HESTextArr:any;
  HESValueArr:any;
  HEStxtArr:any;

  bars3: any;
  HPRAFTextArr:any;
  HPRAFValueArr:any;
  txtArr:any;
  chResp:ChartResp;

  state:any;
  state_name:any;
  district:any;
  stateDist:any;
  HTPublic:any;
  HTPrivate:any;
  uploadDate:any;

  state_code:any;
arr:any;
HAAValTotal:any;
  jsonDataACGG:any;
jsonDataACGTD:any;
jsonDataHAS:any;
jsonDataTP:any;
jsonDataHATD:any;
jsonDataACGS:any;
jsonDataHAG:any;
jsonDataACGA:any;
jsonDataHAA:any;
jsonDataHES:any;
jsonDataHEB:any;
jsonDataHETD:any;

HPRAFState_District:any;
HASState_District:any;
HESState_District:any;
table:any;
TP_state_code:any;
TP_district_code:any
TP_hosp_code:any;
DistrictselectedLevel:any;
StateselectedLevel:any;
DistrictError:any;
StateError:any;
HospError:any;
rows:any;
HTOverall:any;
HOLast30Days:any;
ITLast30Days:any;

PROCTextArr:any;
PROCValueArr:any;
jsonDataPROC:any;
PROCbars:any;
PROCExportFile:any;
SPECTextArr:any;
SPECValueArr:any;
jsonDataSPEC:any;
SPECbars:any;
SPECExportFile:any;
bars4:any;
tblSAProduct:any;
tblHeader:any;
count_0_5:any=0;
count_5_10:any=0;
count_g_10:any=0;
total:any=0;
hosptoptype:any;
pipe = new DatePipe('en-US');
encrdecrdervice:EncrDecrService;


pageData = {
  ehcpList: [] as any[],
  ehcpHospList: [] as any[]
}
totalData = {
  ehcpList: [] as any[],
  ehcpHospList: [] as any[]
}

  @ViewChild('hprafChart') hprafChart:any;
  @ViewChild('hprafChart1') hprafChart1:any;
  @ViewChild('PROCChart') PROCChart:any;
  @ViewChild('SPECChart') SPECChart:any;
  @ViewChild('barACGGender') barACGGender:any;
  @ViewChild('barACGAge') barACGAge:any;
  @ViewChild('ACGTDChart') ACGTDChart:any;
  @ViewChild('chart11') chart11: any;
  //public chartOptions: Partial<ChartOptions>;
  //@ViewChild('ACIS') ACIS: any;
  //@ViewChild('barACIGender') barACIGender:any;
  //@ViewChild('barACIAge') barACIAge:any;
  //@ViewChild('ACITDChart') ACITDChart:any;


  @ViewChild('HAS') HAS: any;
  @ViewChild('HEBChart') HEBChart: any;
  @ViewChild('HES') HES: any;
  @ViewChild('barHAGender') barHAGender:any;
  @ViewChild('barHAAge') barHAAge:any;
  @ViewChild('HATDChart') HATDChart:any;
  @ViewChild('HETDChart') HETDChart:any;
  @ViewChild('TPChart') TPChart:any;
  @ViewChild('TAGChart') TAGChart:any;
  @ViewChild('BISCTDChart') BISCTDChart:any;
  
  
  hprafChartElement: any;
  hprafChartElement1: any;
  HASElement: any;
  TPElement: any;
  HESElement: any;
  name:any;
  tag1:any;
  tag2:any;
  tag3:any;
  tag4:any;
  tag5:any;
  code:any;
  TAGTextArr:any;
  TAGArr:any;
  TAGValueArr:any;
  jsonDataTAG:any;
  TAGbars:any;
  TAGChartElement: any;
  TAGState_District:any;
  dtOptions: any = {};
  tpdata:any;
  userdetailsReq:UserdetailsReq;
  SAData:any;
  tblHeaderTreated:any;

  BISCCTDTcolor:any;
  BISCCTDTTextArr:any;
  BISCCTDtxtArr:any;
  BISCCTDTextArr:any;
  jsonDataBISCCTD:any;
  BISCCTDBars:any;
  BISCCTDValueArr:any;
  BISCCTDValue_Delivery_Arr:any;

  constructor(public apiService: ApiserviceService,
    public router: Router) {
      //localStorage.setItem('userid', "");
      this.pmjReq=new Pmjreq();
      this.chResp=new ChartResp();
      this.statename=new StnameReq();
      this.treatpatientreq=new TreatPatientReq();
      this.state="";
      this.state_name="" ;
      this.HPRAFState_District="S";
      this.TAGState_District="S";
      this.HASState_District="S";
      this.HESState_District="S";
      this.TP_state_code="";
      this.TP_district_code="";
      this.TP_hosp_code="";
      this.userdetailsReq=new UserdetailsReq();
      this.encrdecrdervice=new EncrDecrService();
      this.hosptoptype="HA";
    }

    //**********************Export***************** */ 
  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';
  exportPDF(type:any,filename:any)
  {
    //var doc = new jsPDF();
    if(type=='ACGS')
    {
      var textName="";
      if(this.HPRAFState_District=="S")
      textName="State Name";
      if(this.HPRAFState_District=="D")
      textName="District Name";
      this.exportToPDF(this.jsonDataACGS,filename,textName,"Total");
    }
    if(type=='HAS')
    {
      var textName="";
      if(this.HASState_District=="S")
      textName="State Name";
      if(this.HASState_District=="D")
      textName="District Name";

      this.exportToPDF(this.jsonDataHAS,filename,textName,"Total");
    }
    if(type=='HES')
    {
      var textName="";
      if(this.HESState_District=="S")
      textName="State Name";
      if(this.HESState_District=="D")
      textName="District Name";
      this.exportToPDF(this.jsonDataHES,filename,textName,"Total");
    }
    if(type=='ACGG')
    {
      this.exportToPDF(this.jsonDataACGG,filename,"Gender Name","Total");
    }
    if(type=='ACGA')
    {
      this.exportToPDF(this.jsonDataACGA,filename,"Age","Total");
    }
    if(type=='HAG')
    {
      this.exportToPDF(this.jsonDataHAG,filename,"Gender Name","Total");
    }
    if(type=='HAA')
    {
      this.exportToPDF(this.jsonDataHAA,filename,"Age","Total");
    }
    if(type=='HEB')
    {
      this.exportToPDF(this.jsonDataHEB,filename,"Bed Interval","Total");
    }
    if(type=='ACGTD')
    {
      this.exportToPDF(this.jsonDataACGTD,filename,"Date", "Total");
    }
    if(type=='HATD')
    {
      this.exportToPDF(this.jsonDataHATD,filename,"Date","Total");
    }
    if(type=='HETD')
    {
      this.exportToPDF(this.jsonDataHETD,filename,"Date","Total");
    }
    if(type=='TMSPROC')
    {
      this.exportToPDF(this.jsonDataPROC,filename+"_"+this.PROCExportFile+".pdf","Procedure Name","Total");
    }
    if(type=='TMSSPEC')
    {
      this.exportToPDF(this.jsonDataSPEC,filename+"_"+this.SPECExportFile+".pdf","Speciality","Total");
    }
    if(type=='HBAT')
    {
      this.exportToPDF_HBAT(this.tpdata,filename);
    }
    if(type=='TAGD')
    {
      this.exportToPDF_TAG(this.jsonDataTAG,filename);
    }
    if(type=='BISCTD')
    {
      this.exportToPDF_BIS(this.jsonDataBISCCTD,filename+".pdf");
    }
  }
  OpenLogin()
  {this.router.navigate(['/login']); }

  headRows(text:any,value:any) {
    return [{text: text, value: value}];
  }

  

  headRows_HBAT() {
    return [{sno:'S.No.',patientname: 'Name', treatmentdate: 'Discharge Date', amount: 'Amount'}];
  }

  headRows_BIS() {
    return [{sno:'S.No.',date: 'Date', total: 'eKYC Request Received', delivery_total: 'Card Delivered'}];
  }

  headRows_TAGD() {
        return [{sno:'S.No.',name:'State/District Name', tag1_count:'SECC Target Families',tag2_count:'Beneficiary Have Card',tag3_count: 'Tagged Families', tag4_count: 'Card to be Created', tag5_count: 'Ujjwala Families'}];
  }
  bodyRows(JSONRes:any) {
    //console.log(JSONRes);
    JSONRes.length = JSONRes.length || 10;
    let body = [];
    var j=1;
    for(var i in JSONRes)
    {
      body.push({
        sno: j++,
        state_name: JSONRes[i]["state_name"],
        district_name: JSONRes[i]["district_name"],
        hospital_name: JSONRes[i]["hospital_name"],
        patientname: JSONRes[i]["patientname"],
        treatmentdate: JSONRes[i]["treatmentdate"] ,
        amount: JSONRes[i]["amount"]        
      });
    }
   
    return body;
  }

  bodyRows_TAGD(JSONRes:any) {
    //console.log(JSONRes);
    JSONRes.length = JSONRes.length || 10;
    let body = [];
    var j=1;
    for(var i in JSONRes)
    {
      body.push({
        sno: j++,
        name: JSONRes[i]["name"],
        tag1_count: JSONRes[i]["tag1_count"],
        tag2_count: JSONRes[i]["tag2_count"],
        tag3_count: JSONRes[i]["tag3_count"],
        tag4_count: JSONRes[i]["tag4_count"],
        tag5_count: JSONRes[i]["tag5_count"],      
      });
    }
   
    return body;
  }

  bodyRows1(JSONRes:any) {
    //console.log(JSONRes);
    JSONRes.length = JSONRes.length || 10;
    let body = [];
    var j=1;
    for(var i in JSONRes)
    {
      body.push({        
        text: JSONRes[i]["text"],
        value:this.getCommaValue(JSONRes[i]["value"] )             
      });
    }
   
    return body;
  }

  bodyRows_BIS(JSONRes:any) {
    //console.log(JSONRes);
    JSONRes.length = JSONRes.length || 10;
    let body = [];
    var j=1;
    for(var i in JSONRes)
    {
      body.push({        
        date: JSONRes[i]["text"],
        total:this.getCommaValue(JSONRes[i]["total"] ),
        delivery_total:this.getCommaValue(JSONRes[i]["delivery_total"] ) , 
        sno: String(j) 
      });
      j=j+1;
    }
   
    return body;
  }
  
  exportToPDF(jsonData:any,filename:any,text:any,value:any)
  {
    var doc = new jsPDF();    
    autoTable(doc, {  
  
      columnStyles: { europe: { halign: 'right' } }, 
      body:this.bodyRows1(jsonData),     
      head:this.headRows(text,value),    
  })
  
  doc.save(filename)
  }

  exportToPDF_BIS(jsonData:any,filename:any)
  {
   
    var doc = new jsPDF();    
    autoTable(doc, {  
  
      columnStyles: { europe: { halign: 'right' } }, 
      body:this.bodyRows_BIS(jsonData),     
      head:this.headRows_BIS(),    
  })
  
  doc.save(filename)
  }

  exportToPDF_HBAT(jsonData:any,filename:any)
  {
    var doc = new jsPDF();    
    autoTable(doc, {  
  
      columnStyles: { europe: { halign: 'center' } }, 
      body:this.bodyRows(jsonData),     
      head:this.headRows_HBAT(),    
  })
  doc.save(filename)
  }

  exportToPDF_TAG(jsonData:any,filename:any)
  {
    var doc = new jsPDF();    
    autoTable(doc, {  
  
      columnStyles: { europe: { halign: 'center' } }, 
      body:this.bodyRows_TAGD(jsonData),     
      head:this.headRows_TAGD(),    
  })
  doc.save(filename)
  }


  CreateTableToExport(data:any,Headertext:any)
  {
    let tble="<table border='1'>"; 
  tble+="<tr><td>"+Headertext+"</td><td>Total</td></tr>";
  for(var i in data)
  {
    
    if(data[i]['text'].length<8)
    {
    var txt=String(data[i]['text'])+" MonthAndYear";
    //console.log("txt : "+txt);
      tble+="<tr><td>"+txt+"</td><td>"+this.getCommaValue(data[i]['value'])+"</td></tr>";
    }
    else    
      tble+="<tr><td>"+data[i]['text']+"</td><td>"+this.getCommaValue(data[i]['value'])+"</td></tr>";
  }
  tble+="</table>";
  return tble;
  }
  CreateTableToExport1(data:any)
  {
    var j=0;
    let tble="<table border='1'>"; 
    tble+="<tr><td colspan='4'>"+this.tblHeaderTreated+"</td></tr>";
  tble+="<tr><td>S.No.</td><td>Patient Name</td><td>Discharge Date</td><td>Amount</td></tr>";
  for(var i in data)
  {
  tble+="<tr><td>"+j+1+"</td><td>"+data[i]['patientname']+"</td><td>"+data[i]['treatmentdate']+"</td><td>"+data[i]['amount']+"</td></tr>";
  }
  tble+="</table>";
  return tble;
  }

  CreateTableToExport_BIS(data:any)
  {
    let tble="<table border='1'>"; 
  tble+="<tr><td>Date</td><td>eKYC Request Received</td><td>Card Delivered</td></tr>";
  for(var i in data)
  {
  tble+="<tr><td>"+data[i]['text']+"</td><td>"+this.getCommaValue(data[i]['total'])+"</td><td>"+this.getCommaValue(data[i]['delivery_total'])+"</td></tr>";
  }
  tble+="</table>";
  return tble;
  }
  
  CreateTableToExportTAG(data:any)
  {
    var j=0;
    let tble="<table border='1'>"; 
  tble+="<tr><td>S.No.</td><td>State/District Name</td><td>SECC Target Families</td><td>Beneficiary Have Card</td><td>Tagged Families</td><td>Card to be Created</td> <td>Ujjwala Families</td></tr>";
  for(var i in data)
  {
  tble+="<tr><td>"+j+1+"</td><td>"+data[i]['name']+"</td><td>"+data[i]['tag1_count']+"</td><td>"+data[i]['tag2_count']+"</td><td>"+data[i]['tag3_count']+"</td><td>"+data[i]['tag4_count']+"</td><td>"+data[i]['tag5_count']+"</td></tr>";
  }
  tble+="</table>";
  return tble;
  }

  exportexcel(type:any,filename:any)
  {
    
    if(type=='ACGS')
    {
      var textName="";
      if(this.HPRAFState_District=="S")
      textName="State Name";
      if(this.HPRAFState_District=="D")
      textName="District Name";
      var data=this.CreateTableToExport(this.jsonDataACGS,textName);
      //console.log(data);
    this.exportExcel(data,filename);
    //this.exportExce1l(this.jsonDataACGS,filename);
    }
    if(type=='HAS')
    {
      var textName="";
      if(this.HASState_District=="S")
      textName="State Name";
      if(this.HASState_District=="D")
      textName="District Name";
      var data=this.CreateTableToExport(this.jsonDataHAS,textName);

      this.exportExcel(data,filename);
    }
    if(type=='HES')
    {
      var textName="";
      if(this.HESState_District=="S")
      textName="State Name";
      if(this.HESState_District=="D")
      textName="District Name";
      var data=this.CreateTableToExport(this.jsonDataHES,textName);
      this.exportExcel(data,filename);
    }
    if(type=='ACGG')
    {
      var data=this.CreateTableToExport(this.jsonDataACGG,"Gender Nmae");
      this.exportExcel(data,filename);
    }
    if(type=='HAG')
    {
      var data=this.CreateTableToExport(this.jsonDataHAG,"Gender Name");
      this.exportExcel(data,filename);
      //this.exportExcel(this.jsonDataHAG,filename);
    }
    if(type=='HEB')
    {
      var data=this.CreateTableToExport(this.jsonDataHEB,"Bed Interval");
      this.exportExcel(data,filename);
      //this.exportExcel(this.jsonDataHEB,filename);
    }
    if(type=='ACGA')
    {
      var data=this.CreateTableToExport(this.jsonDataACGA,"Age");
      this.exportExcel(data,filename);
      //this.exportExcel(this.jsonDataACGA,filename);
    }
    if(type=='ACGTD')
    {
      var data=this.CreateTableToExport(this.jsonDataACGTD,"Date");
      this.exportExcel(data,filename);
      //this.exportExcel(this.jsonDataACGTD,filename);
    }
    if(type=='HATD')
    {
      var data=this.CreateTableToExport(this.jsonDataHATD,"Date");
      this.exportExcel(data,filename);
      //this.exportExcel(this.jsonDataHATD,filename);
    }
    if(type=='HETD')
    {
      var data=this.CreateTableToExport(this.jsonDataHETD,"Date");
      this.exportExcel(data,filename);

      //this.exportExcel(this.jsonDataHETD,filename);
    }
    if(type=='HAA')
    {
      var data=this.CreateTableToExport(this.jsonDataHAA,"Age");
      this.exportExcel(data,filename);

      //this.exportExcel(this.jsonDataHAA,filename);
    }
    if(type=='HBAT')
    {
      var data=this.CreateTableToExport1(this.tpdata);
      this.exportExcel(data,filename);
      //this.exportExcel(this.tpdata,filename);
    }
    if(type=='TMSPROC')
    {
      var data=this.CreateTableToExport(this.jsonDataPROC,"Procedure Name");
      this.exportExcel(data,filename+"_"+this.PROCExportFile);
      //this.exportExcel(this.tpdata,filename);
    }
    if(type=='TMSSPEC')
    {
      var data=this.CreateTableToExport(this.jsonDataSPEC,"Speciality");
      this.exportExcel(data,filename+"_"+this.SPECExportFile);
      //this.exportExcel(this.tpdata,filename);
    }
    if(type=='TAGD')
    {
      var data=this.CreateTableToExportTAG(this.jsonDataTAG);
      this.exportExcel(data,filename);
      //this.exportExcel(this.tpdata,filename);
    }
    if(type=="BISCTD")
    {
      var data=this.CreateTableToExport_BIS(this.jsonDataBISCCTD);
      this.exportExcel(data,filename);
    }
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

  exportExce1l(jsonData: any[], fileName: string): void {
    let tble="<table><tr><td colspan='2'>Benificiaries Verified</td></tr>";
    tble+="<tr><td>Today</td><td>13,246</td></tr>";
    tble+="<tr><td>Overall</td><td>13.24 Cr</td></tr>";
    tble+="<table>";
    var div = document.createElement('div');
    div.innerHTML = tble.trim();

    //this.table=tble;
    const source = div.firstChild;

    
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const ws1: XLSX.WorkSheet = XLSX.utils.table_to_sheet(source);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    XLSX.utils.book_append_sheet(workbook, ws1, 'Sheet2');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile1(excelBuffer, fileName);
  }

  private saveExcelFile1(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }

  //****************************************End************************** */
  ngOnInit(): void {

    setTimeout(()=>{                          
      $('#tblHospDeatils').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 10,
        searching:true,
        paging:true,
        processing: true,
       
        lengthMenu : [10, 25,50],
    } );
    }, 1);
    this.GetTopHeadData("","");
    this.GetStateMaster(); 
    this.GetStateMaster_Hosp();    
    this.GetACPStateWise("ACGS","","",""); 
    this.GetHEB("HEB","","","",""); 
    
    this.ACGGender("","");
    this.ACGAge("","");   
    this.GetACGTD("ACGTD","T","","");
    this.GetHospitalAuthTop(this.hosptoptype,"","")

    //this.GetACIStateWise("ACIS","","9",""); 
    //this.ACIGender("","");
    //this.ACIAge("","");   
    //this.GetACITD("ACITD","T","","");

    this.GetHAStateWise("HAS","","",""); 
    this.GetHEStateWise("HES","","",""); 
    this.HAGender("","");
    this.HAAge("","");   
    this.GetHATD("HATD","T","","");
    this.GetHETD("HETD","T","","");
    this.stateDist="State/UT";
    this.GetUploadDate();
    this.GetPocedure("TMSPROC","C","","");
    this.GetSpeciality("TMSSPEC","C","","");
    //this.GetTreatedPatient("1","","");
    this.PROCExportFile="Count";
    this.SPECExportFile="Count";
    //this.GetBISCCTD("BISCCTD","T","","");
    //this.GetTAGData('TAGD',"","","");
    this.GetEHCP_Details("","","");
    
    let divbenavailtreatment= <HTMLScriptElement>document.getElementById('divbenavailtreatment');
    divbenavailtreatment.style.display="none";


    

  }

  GetACPStateWise(type:any,rpttype:any,state_code:any,district_code:any)
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
     
      this.HPRAFTextArr = [];
      this.HPRAFValueArr = [];
      this.txtArr = [];
      this.arr=[];
      this.jsonDataACGS=[];
        
        this.txtArr=this.chResp.list;
        this.jsonDataACGS = this.chResp.list;
          for(var i in this.txtArr)
          {
            this.HPRAFTextArr.push(this.txtArr[i]['text']);
            this.HPRAFValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));           
          }
        
          this.hprafChartElement = this.hprafChart.nativeElement;
          var px=(this.HPRAFValueArr.length*16)+"px";
          this.hprafChartElement.style.height=px;

          const gradient = this.hprafChart.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 600);
          gradient.addColorStop(0, 'rgba(138,153,216,1)');
          gradient.addColorStop(.3, 'rgba(150,186,235,.8)');
          gradient.addColorStop(.6, 'rgba(158,208,247,.06)');
          gradient.addColorStop(.9, 'rgba(179,224,252,.04)');
          gradient.addColorStop(1, 'rgba(255,255,255,.001)');
          this.bars3 = new Chart(this.hprafChart.nativeElement, { type: 'bar',        
          data: {labels:this.HPRAFTextArr,datasets:[]}});
          this.bars3.destroy();

          
      this.bars3 = new Chart(this.hprafChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.HPRAFTextArr,
          datasets: [{  
            label:'Ayushman Cards Created'  ,        
            data: this.HPRAFValueArr,
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
            this.statename.state_name=this.HPRAFTextArr[index];   
            this.apiService.GetStateCode(this.statename).subscribe((response) => { 
             if(response['status']=="true")
              {
                if(this.HPRAFState_District=="S")
                {
                  this.bars3.destroy();
                  this.GetACPStateWise("ACGS","",response['state_code'],"");
                  this.HPRAFState_District="D";                  
                }
                else
                {
                  this.bars3.destroy();
                  this.GetACPStateWise("ACGS","",this.state,"");
                  this.HPRAFState_District="S";
                }
              }
              else
              {                
               this.bars3.destroy();
               this.GetACPStateWise("ACGS","",this.state,"");
               this.HPRAFState_District="S";
              }
              //console.log(this.state_code);
            });            
            
  
          }//,scales:{x:{grid:{display:false}},y:{grid:{display:false}}}
          
        }
        
      });

      


    }
    });
   }


   GetHEB(type:any,rpttype:any,state_code:any,district_code:any,onChangeFlag:any)
   {

    this.pmjReq.type=type;  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;    
    
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => { 
          this.chResp=response; 
         
        if(this.chResp.status=="true")
    {
     
      if(onChangeFlag=='')
      {
      this.HEBTextArr = [];
      this.HEBValueArr = [];
      this.HEBtxtArr = [];
      //this.jsonDataHPRAF=[];
        
        this.HEBtxtArr=this.chResp.list;
     
        this.jsonDataHEB=this.chResp.list;
        //console.log(this.HPRAFTextArr[0]['text']);
          for(var i in this.HEBtxtArr)
          {
            this.HEBTextArr.push(this.HEBtxtArr[i]['text']);
            this.HEBValueArr.push(this.HEBtxtArr[i]['value']);
          }
         
          const gradient = this.HEBChart.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 600);
          gradient.addColorStop(0, 'rgba(97,198,79,1)');
          gradient.addColorStop(1, 'rgba(255,255,255,1)');

          this.HEBbars = new Chart(this.HEBChart.nativeElement, {
            type: 'bar',        
            data: {
              labels: this.HEBTextArr,
              datasets: [{  
                label:'Bed Strength'  ,        
                data: this.HEBValueArr,
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
         else
         {
          this.HEBbars.data.datasets[0]['data']=[];
          this.HEBTextArr = [];
          this.HEBValueArr = [];
          this.HEBtxtArr = [];
          //this.jsonDataHPRAF=[];
            
            this.HEBtxtArr=this.chResp.list;
         
            this.jsonDataHEB=this.chResp.list;
            //console.log(this.HPRAFTextArr[0]['text']);
              for(var i in this.HEBtxtArr)
              {
                this.HEBbars.data.datasets[0]['data'].push(this.HEBtxtArr[i]['value']);
              }
              this.HEBbars.update();
          
         } 
    }
    });
   }


  
/*
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
     
      this.ACISTextArr = [];
      this.ACISValueArr = [];
      this.ACIStxtArr = [];
      //this.jsonDataHPRAF=[];
        
        this.ACIStxtArr=this.chResp.list;
        var arrState = this.chResp.list;
        //this.jsonDataHPRAF=arrState;
        //console.log(this.HPRAFTextArr[0]['text']);
          for(var i in this.ACIStxtArr)
          {
            this.ACISTextArr.push(this.ACIStxtArr[i]['text']);
            this.ACISValueArr.push(this.ACIStxtArr[i]['value']);
          }
        
        
      this.barsACIS = new Chart(this.ACIS.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.ACISTextArr,
          datasets: [{  
            label:''  ,        
            data: this.ACISValueArr,
            backgroundColor:'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
          }]
        },
        options: {
          plugins:{
            legend:{display: false}
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
*/
   GetHAStateWise(type:any,rpttype:any,state_code:any,district_code:any)
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
     
      this.HASTextArr = [];
      this.HASValueArr = [];
      this.HAStxtArr = [];
      //this.jsonDataHPRAF=[];
        
        this.HAStxtArr=this.chResp.list;
        this.jsonDataHAS=this.chResp.list;
        var arrState = this.chResp.list;
        //this.jsonDataHPRAF=arrState;
        //console.log(this.chResp.list);
          for(var i in this.HAStxtArr)
          {
            this.HASTextArr.push(this.HAStxtArr[i]['text']);
            this.HASValueArr.push((Number(this.HAStxtArr[i]['value'])/100000.00).toFixed(2));
          }

          
          this.HASElement = this.HAS.nativeElement;
          var px=(this.HASValueArr.length*16)+"px";
          this.HASElement.style.height=px;

          this.barsHAS = new Chart(this.HAS.nativeElement, { type: 'bar',        
          data: {labels:this.HASTextArr,datasets:[]}});
          this.barsHAS.destroy();

      this.barsHAS = new Chart(this.HAS.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.HASTextArr,
          datasets: [{  
            label:'Authorised Hospital Admissions'  ,        
            data: this.HASValueArr,
            //backgroundColor:'#DFEEF7', // array should have same number of elements as number of dataset            
            backgroundColor:'#7eb2ef',
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness:9
          }]
        },
        options: {
          plugins:{
            legend:{display: false},datalabels: {
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
          indexAxis: 'y',scales:{x:{grid:{display:false,drawBorder:false},position:'top',ticks:{         
            autoSkip: false,font:{size:11,family:'Roboto'},color:'#989898'
        }},y:{grid:{display:false,drawBorder:false},ticks:{         
            autoSkip: false,font:{size:11,family:'Roboto'},color:'#989898'
        }}}, 
          elements: {
            line: {
              borderWidth: 0,
              
            }
          },
          
          onClick: (evt, item) => {
             let index = item[0]["index"];
             this.statename.state_name=this.HASTextArr[index];   
             this.apiService.GetStateCode(this.statename).subscribe((response) => { 
              if(response['status']=="true")
               {
                 if(this.HASState_District=="S")
                 {
                  this.barsHAS.destroy();
                  this.GetHAStateWise("HAS","",response['state_code'],"");
                  this.HASState_District="D";
                 }
                 else
                 {
                  this.barsHAS.destroy();
                  this.GetHAStateWise("HAS","",this.state,"");
                  this.HASState_District="S";
                 }
               }
               else
               {                
                this.barsHAS.destroy();
                this.GetHAStateWise("HAS","",this.state,"");
                this.HASState_District="S";
               }
               //console.log(this.state_code);
             });          
   
           }
        }
      });
    }
    });
   }


   GetTreatedPatient(state_code:any,district_code:any,hosp_code:any)
   {

    
    this.treatpatientreq.state_code=state_code;
    this.treatpatientreq.district_code=district_code;
    this.treatpatientreq.hosp_code=hosp_code;    
    
    this.apiService.GetTreatedPatient(this.treatpatientreq).subscribe((response) => { 
          this.chResp=response; 
        
        if(this.chResp.status=="true")
    {
      
      this.tpdata=this.chResp.list
      setTimeout(()=>{                          
        $('#datatableexample').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 10,
          searching:true,
          paging:true,
          processing: true,
          destroy: true,
          lengthMenu : [10, 25,50]
      } );
      }, 1);
      
      //console.log("Test "+this.chResp.list?.text);  
     /*
      this.TPTextArr = [];
      this.TPValueArr = [];
      this.TPtxtArr = [];
      this.TPIDtxtArr = [];
      //this.jsonDataHPRAF=[];
        
        this.TPtxtArr=this.chResp.list;
        this.jsonDataTP=this.chResp.list;
        var arrState = this.chResp.list;
        //this.jsonDataHPRAF=arrState;
        //console.log(this.chResp.list);
          for(var i in this.TPtxtArr)
          {
            this.TPTextArr.push(this.TPtxtArr[i]['text']);
            this.TPValueArr.push(this.TPtxtArr[i]['value']);
            this.TPIDtxtArr.push(this.TPtxtArr[i]['id']);
          }
          this.TPElement = this.TPChart.nativeElement;
          var px=(this.TPValueArr.length*19)+"px";
          this.TPElement.style.height=px;
        
      this.barsTP = new Chart(this.TPChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.TPTextArr,
          datasets: [{  
            label:'Treated Patient'  ,        
            data: this.TPValueArr,
            backgroundColor:'#4F98C3', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
           // barThickness:12
          }]
        },
        options: {
          plugins:{
            legend:{display: false},datalabels: {
              display: false,
              align: 'end',
              color:'red'
            },
            tooltip: {
              callbacks: {
                  label: function(context) {
                    
                      let label = context.dataset.label || '';

                      return label +": " + context.parsed.y;
                  }
              }
          }
          },          
          indexAxis: 'x',scales:{x:{grid:{display:false},position:'bottom'},y:{grid:{display:false}}}, 
          elements: {
            line: {
              borderWidth: 0,
              
            }
          },
          
          onClick: (evt, item) => {
             let index = item[0]["index"];
             var Id=this.TPIDtxtArr[index];
             console.log("ID: "+Id);   
             console.log("state_code: "+this.TP_state_code); 
            if (this.TP_state_code!="" && this.TP_district_code=="" && this.TP_hosp_code=="")
            {
              this.TP_district_code= Id;
              console.log("district_code: "+Id);  
              this.barsTP.destroy();
              this.GetTreatedPatient(this.TP_state_code, this.TP_district_code,"");
            }
            else if (this.TP_state_code!="" && this.TP_district_code!="" && this.TP_hosp_code=="")
            {
              //this.TP_hosp_code= Id;              
            }
            else
            {
                this.TP_state_code= Id;
                console.log("state_cdoe: "+Id); 
                this.barsTP.destroy();
                this.GetTreatedPatient(this.TP_state_code,"","");
            }
           }
        }
      });*/
    }
    });
   }

   BindPatientDetails()
   {   
    //console.log("Rizwan1234 "+ $("#ddlState option:selected").text());
     if($('#ddlState').val()=="")
     {
       this.StateError="Please select state.";
     }
     
     else if($('#ddlDistrict').val()=="")
     {
      this.DistrictError="Please select district.";
     }
     
     else if($('#ddlHosp').val()=="")
     {
      this.HospError="Please select hospital.";
     }
     else
     {
      this.StateError="";
      this.DistrictError="";
      this.HospError="";
      this.tblHeaderTreated="";
      this.tblHeaderTreated="State Name : "+$("#ddlState option:selected").text()+", District Name : "+$("#ddlDistrict option:selected").text()+", Hospital Name : "+$("#ddlHosp option:selected").text();
      this.GetPatientDetails($('#ddlState').val(),$('#ddlDistrict').val(),$('#ddlHosp').val()); 
     }
    
   }
   GetPatientDetails(state_code:any,district_code:any,hosp_code:any)
   {

    
    this.treatpatientreq.state_code=state_code;
    this.treatpatientreq.district_code=district_code;
    this.treatpatientreq.hosp_code=hosp_code;    
    this.tpdata=[];
    this.apiService.GetPatientDetails(this.treatpatientreq).subscribe((response) => { 
          this.chResp=response; 
       
        if(this.chResp.status=="true")
    {
      let divbenavailtreatment= <HTMLScriptElement>document.getElementById('divbenavailtreatment');
      divbenavailtreatment.style.display="block";
      this.tpdata=this.chResp.list
      
      
      $('#datatableexample').DataTable().clear().destroy();
      setTimeout(()=>{  
        
//$("#datatableexample").empty();                        
        $('#datatableexample').DataTable( {
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


   GetHEStateWise(type:any,rpttype:any,state_code:any,district_code:any)
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
     
      this.HESTextArr = [];
      this.HESValueArr = [];
      this.HEStxtArr = [];
      //this.jsonDataHPRAF=[];
        
        this.HEStxtArr=this.chResp.list;
        this.jsonDataHES=this.chResp.list;
      // console.log(this.chResp.list);
          for(var i in this.HEStxtArr)
          {
            this.HESTextArr.push(this.HEStxtArr[i]['text']);
            this.HESValueArr.push(this.HEStxtArr[i]['value']);
          }
        
          this.HESElement = this.HES.nativeElement;
          var px=(this.HESValueArr.length*16)+"px";
          this.HESElement.style.height=px;

          this.barsHES = new Chart(this.HES.nativeElement, { type: 'bar',        
          data: {labels:this.HESTextArr,datasets:[]}});
          this.barsHES.destroy();

      this.barsHES = new Chart(this.HES.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.HESTextArr,
          datasets: [{  
            label:'Hospital Empanelled'  ,        
            data: this.HESValueArr,
            //backgroundColor:'#DCF4D8', // array should have same number of elements as number of dataset 
            backgroundColor:'#63d94f',           
            barThickness:9,
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false
          }]
        },
        options: {
          plugins:{
            legend:{display: false},datalabels: {
              display: false,
              align: 'end',
              color:'red'
            },tooltip: {
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
                      return context.parsed.x+"";
                  }
              }
          },
          },          
          indexAxis: 'y',scales:{x:{grid:{display:false,drawBorder:false},position:'top',ticks:{         
            autoSkip: false,font:{size:11,family:'Roboto'},color:'#989898'
        }},y:{grid:{display:false,drawBorder:false},ticks:{         
            autoSkip: false,font:{size:11,family:'Roboto'},color:'#989898'
        }}}, 
          elements: {
            line: {
              borderWidth: 0,
              
            }
          },
          onClick: (evt, item) => {
            let index = item[0]["index"];
            this.statename.state_name=this.HESTextArr[index];   
            this.apiService.GetStateCode(this.statename).subscribe((response) => { 
             if(response['status']=="true")
              {
                if(this.HESState_District=="S")
                 {
                  this.barsHES.destroy();
                  this.GetHEStateWise("HES","",response['state_code'],"");
                  this.HESState_District="D";
                 }
                 else
                 {
                  this.barsHES.destroy();
                  this.GetHEStateWise("HES","",this.state,"");
                  this.HESState_District="S";
                 }
              }
              else
              {                
               this.barsHES.destroy();
               this.GetHEStateWise("HES","",this.state,"");
               this.HESState_District="S";
              }
              //console.log(this.state_code);
            });          
  
          }
        }
      });
    }
    });
   }

   ACGGender(state_code:any,district_code:any)
   {
    this.pmjReq.type="ACGG";  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";     
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => {  
      this.chResp=response;            
      if(this.chResp.status=="true")
      {
        
       this.ACGGcolor=[];
       this.ACGGcolor.push('#f5bed7');   
       this.ACGGcolor.push('#80A7F1');  
       //this.ACGGcolor.push('#F1C880');      
           
        this.ACGGcolor.push('#EF6973');

        this.ACGGTextArr = [];
        this.ACGGValueArr = [];
        this.ACGGtxtArr = [];
        //this.jsonDataHPRAF=[];
          
          this.ACGGtxtArr=this.chResp.list;
          this.jsonDataACGG=this.chResp.list;
          this.jsonDataACGG=this.chResp.list;
          //console.log(this.chResp.list);  
          //var arrState = this.chResp.list;
          //this.jsonDataHPRAF=arrState;
          //console.log(this.HPRAFTextArr[0]['text']);
            for(var i in this.ACGGtxtArr)
            {
              this.ACGGTextArr.push(this.ACGGtxtArr[i]['text']);
              this.ACGGValueArr.push(this.ACGGtxtArr[i]['value']);
            }

              
      this.ACGGBars = new Chart(this.barACGGender.nativeElement, {
        type: 'doughnut',        
        data: {
          labels: this.ACGGTextArr,
          datasets: [{  
            label:'Gender'  ,        
            data: this.ACGGValueArr,
            backgroundColor: this.ACGGcolor, // array should have same number of elements as number of dataset
            //borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 0,
            spacing:1
          }]
        },
        options: {
          plugins:{
            legend:{
              labels:{
               
                boxHeight:10,
                boxWidth:10,
                font:{size:13} ,
              },
              position:"right"
            },
            datalabels: {
              display:false,
              color:'white',
              
            }
          },
          indexAxis: 'x',
        
          elements: {
            line: {
              borderWidth: 0,             
            }
          },cutout:50
        }
      });

    }
    });
     
   }

/*
   ACIGender(state_code:any,district_code:any)
   {
    this.pmjReq.type="ACIG";  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";     
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => {  
      this.chResp=response;            
      if(this.chResp.status=="true")
      {
        
       this.ACIGcolor=[];
        this.ACIGcolor.push('#FFDDCE');
        this.ACIGcolor.push('#F5D33F');
        this.ACIGcolor.push('#3C8DBC');
        this.ACIGTextArr = [];
        this.ACIGValueArr = [];
        this.ACIGtxtArr = [];
        //this.jsonDataHPRAF=[];
          
          this.ACIGtxtArr=this.chResp.list;
          //console.log(this.chResp.list);  
          //var arrState = this.chResp.list;
          //this.jsonDataHPRAF=arrState;
          //console.log(this.HPRAFTextArr[0]['text']);
            for(var i in this.ACIGtxtArr)
            {
              this.ACIGTextArr.push(this.ACIGtxtArr[i]['text']);
              this.ACIGValueArr.push(this.ACIGtxtArr[i]['value']);
            }

              
      this.ACIGBars = new Chart(this.barACIGender.nativeElement, {
        type: 'pie',        
        data: {
          labels: this.ACIGTextArr,
          datasets: [{  
            label:'Gender'  ,        
            data: this.ACIGValueArr,
            backgroundColor: this.ACIGcolor, // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
          }]
        },
        options: {
          plugins:{
            legend:{
              labels:{
                boxHeight:15,
                padding:27,
                
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
*/

   HAGender(state_code:any,district_code:any)
   {
    this.pmjReq.type="HAG";  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";     
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => {  
      this.chResp=response;            
      if(this.chResp.status=="true")
      {
        
       this.HAGcolor=[];
       
       this.HAGcolor.push('#f5bed7'); 
        this.HAGcolor.push('#80A7F1');  
        
        //this.HAGcolor.push('#F1C880');      
                
         this.HAGcolor.push('#EF6973');

      
        this.HAGTextArr = [];
        this.HAGValueArr = [];
        this.HAGtxtArr = [];
        //this.jsonDataHPRAF=[];
          
          this.HAGtxtArr=this.chResp.list;
          this.jsonDataHAG=this.chResp.list;
          
            for(var i in this.HAGtxtArr)
            {
              this.HAGTextArr.push(this.HAGtxtArr[i]['text']);
              this.HAGValueArr.push(this.HAGtxtArr[i]['value']);
            }

              
      this.HAGBars = new Chart(this.barHAGender.nativeElement, {
        type: 'doughnut',        
        data: {
          labels: this.HAGTextArr,
          datasets: [{  
            label:'Gender'  ,        
            data: this.HAGValueArr,
            backgroundColor: this.HAGcolor, // array should have same number of elements as number of dataset
            //borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 0,
            spacing:1
          }]
        },
        options: {
          plugins:{
            legend:{
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
          },cutout:50
        }
      });

    }
    });
     
   }

   ACGAge(state_code:any,district_code:any)
   {
    this.pmjReq.type="ACGA";  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";     
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => {  
      this.chResp=response;            
      if(this.chResp.status=="true")
      {
        
       this.ACGAcolor=[];
       
        this.ACGATextArr = [];
        this.ACGAValueArr = [];
        this.ACGAtxtArr = [];
        /*
        this.ACGAcolor.push('#E6AD28');
        this.ACGAcolor.push('#F0CE7E');
        this.ACGAcolor.push('#F6E2B3');
        this.ACGAcolor.push('#FAEFD4');

        this.ACGAcolor.push('#FDF7E9');
        this.ACGAcolor.push('#F8F1E7');
*/

this.ACGAcolor.push('#149198');
        this.ACGAcolor.push('#9bced1');
        this.ACGAcolor.push('#cfe4e5');
        this.ACGAcolor.push('#11686c');

        this.ACGAcolor.push('#2eccd3');
        this.ACGAcolor.push('#94bfc1');
        this.ACGAtxtArr=this.chResp.list;
        this.jsonDataACGA=this.chResp.list;
          //console.log(this.chResp.list);          
            for(var i in this.ACGAtxtArr)
            {
              this.ACGATextArr.push(this.ACGAtxtArr[i]['text']);
              this.ACGAValueArr.push(this.ACGAtxtArr[i]['value']);
              
            }

              
      this.ACGABars = new Chart(this.barACGAge.nativeElement, {
        type: 'doughnut',        
        data: {
          labels: this.ACGATextArr,
          datasets: [{  
            label:'Age'  ,        
            data: this.ACGAValueArr,
            backgroundColor: this.ACGAcolor, // array should have same number of elements as number of dataset
            //borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 0,
            spacing:1
          }]
        },
        options: {
          plugins:{
            legend:{
              labels:{
                boxHeight:10,
                boxWidth:10,
                font:{size:13}              
              },
              position:"right"//,maxWidth:100,maxHeight:20  
            }
            ,
            datalabels: {
              display:false,
              color:'white'
            }
          },
          indexAxis: 'x',
        
          elements: {
            line: {
              borderWidth: 0,
              
            }
          },cutout:50
        }
      });

    }
    });
     
   }

/*
   ACIAge(state_code:any,district_code:any)
   {
    this.pmjReq.type="ACIA";  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";     
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => {  
      this.chResp=response;            
      if(this.chResp.status=="true")
      {
        
       this.ACIAcolor=[];
       
        this.ACIATextArr = [];
        this.ACIAValueArr = [];
        this.ACIAtxtArr = [];
        this.ACIAtxtArr=this.chResp.list;
          //console.log(this.chResp.list);          
            for(var i in this.ACIAtxtArr)
            {
              this.ACIATextArr.push(this.ACIAtxtArr[i]['text']);
              this.ACIAValueArr.push(this.ACIAtxtArr[i]['value']);
              this.ACIAcolor.push(this.getRandomColor());
            }

              
      this.ACIABars = new Chart(this.barACIAge.nativeElement, {
        type: 'pie',        
        data: {
          labels: this.ACIATextArr,
          datasets: [{  
            label:'Age'  ,        
            data: this.ACIAValueArr,
            backgroundColor: this.ACIAcolor, // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
          }]
        },
        options: {
          plugins:{
            legend:{
              labels:{
                boxHeight:15,
                padding:27,
                
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
*/

   HAAge(state_code:any,district_code:any)
   {
    this.pmjReq.type="HAA";  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";     
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => {  
      this.chResp=response;            
      if(this.chResp.status=="true")
      {
        
       this.HAAcolor=[];
       
        this.HAATextArr = [];
        this.HAAValueArr = [];
        this.HAAtxtArr = [];
        this.HAAcolor.push('#1E6DC9');
        this.HAAcolor.push('#75A4DC');
        this.HAAcolor.push('#ABC6E7');
        this.HAAcolor.push('#CDDCEE');

        this.HAAcolor.push('#E2EAF3');
        this.HAAcolor.push('#0c4a95');
        this.HAAtxtArr=this.chResp.list;
        this.jsonDataHAA=this.chResp.list;
          //console.log(this.chResp.list); 
          this.HAAValTotal=0;
          for(var i in this.HAAtxtArr)
            {
              this.HAAValTotal=this.HAAValTotal+Number(this.HAAtxtArr[i]['value'])
            
            }

            for(var j in this.HAAtxtArr)
            {
              this.HAATextArr.push(this.HAAtxtArr[j]['text']);
              this.HAAValueArr.push((Number(this.HAAtxtArr[j]['value'])*100.00/this.HAAValTotal).toFixed(2));
            
            }

              
      this.HAABars = new Chart(this.barHAAge.nativeElement, {
        type: 'doughnut',        
        data: {
          labels: this.HAATextArr,
          datasets: [{  
            label:'Age'  ,        
            data: this.HAAValueArr,
            backgroundColor: this.HAAcolor, // array should have same number of elements as number of dataset
           // borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 0,
            spacing:1
          }]
        },
        options: {
          plugins:{
            legend:{
              labels:{
                boxHeight:10,
                boxWidth:10,
                font:{size:13}     
              },
              position:"right"
            },tooltip: {
              callbacks: {
                  label: function(context) {
                   // console.log(context);
                      let label = context.label;
                      //console.log(label);

                      return label +": " +context.parsed+"%";
                  }
              }
          }
            ,
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
          },cutout:50
        }
      });

    }
    });
     
   }


   getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  GetStateMaster()
  {
    this.pmjReq.type=this.encrdecrdervice.encrypted('SM');  
    this.pmjReq.state_code="";
    this.pmjReq.district_code="";
    this.pmjReq.rpttype="";     
   this.apiService.GetStateDist(this.pmjReq).subscribe((response) => { 
    //  console.log(response);            
       if(response['status']=="true")
   {
     this.stateList=response['list'];
    //  console.log(this.stateList);
   }
   });
    
  }

  GetStateMaster_Hosp()
  {
    this.pmjReq.type=this.encrdecrdervice.encrypted('SMHOSP');  
    this.pmjReq.state_code="";
    this.pmjReq.district_code="";
    this.pmjReq.rpttype="";     
   this.apiService.GetStateDist(this.pmjReq).subscribe((response) => {     
       if(response['status']=="true")
   {
     this.stateList_HOSP=response['list'];
     //console.log(this.stateList);
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

    this.pmjReq.type='ACP';  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetTopHeadData(this.pmjReq).subscribe((response) => {
      //console.log(response);
    if(response['status']=="true")
    {
      
      this.IToday=this.getCommaValue(response['today']);
      this.IOverall=this.getCommaValue(response['overall']);   
      this.ITLast30Days=this.getCommaValue(response['last30_days']);   
      //this.IToday=response['today'];
      //this.IOverall=response['overall']; 
      
    }
    });
    
    
    
    this.pmjReq.type='';  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetHospitalType(this.pmjReq).subscribe((response) => {
      //console.log(response);
    if(response['status']=="true")
    {      
      this.HTPublic=this.getCommaValue(Number(response['public_count']).toString());
      this.HTPrivate=this.getCommaValue(response['private_count'].toString());
      this.HTOverall= this.getCommaValue((Number(response['public_count'])+Number(response['private_count'])).toString());
    }
    });

   }
   GetHospitalAuthTop(type:any,state_code:any,district_code:any)
   {
    this.pmjReq.type=type;  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype="";
    this.apiService.GetTopHeadData(this.pmjReq).subscribe((response) => {
     
    if(response['status']=="true")
    {      
      if(type=="PAAA")
      {
        if(Number(response['today'])==0)
            {
              this.HOoday=Number(response['today']);
            }
            else if(Number(response['today'])>=10000000)
            {
            this.HOoday=(Number(response['today'])/10000000).toFixed(2) + 'Cr';
            }
            else if(Number(response['today'])<10000000 && Number(response['today'])>=100000)
            {
              this.HOoday=(Number(response['today'])/100000).toFixed(2) + 'L';
            }
            else
            {
              this.HOoday=(Number(response['today'])/1000).toFixed(2) + 'K';
            }

            if(Number(response['overall'])>=10000000)
            {
            this.HOverall=(Number(response['overall'])/10000000).toFixed(2) + 'Cr';
            }
            else if(Number(response['overall'])<10000000 && Number(response['overall'])>=100000)
            {
              this.HOverall=(Number(response['overall'])/100000).toFixed(2) + 'L';
            }
            else
            {
              this.HOverall=(Number(response['overall'])/1000).toFixed(2) + 'K';
            }

            if(Number(response['last30_days'])>=10000000)
            {
            this.HOLast30Days=(Number(response['last30_days'])/10000000).toFixed(2) + 'Cr';
            }
            else if(Number(response['last30_days'])<10000000 && Number(response['last30_days'])>=100000)
            {
              this.HOLast30Days=(Number(response['last30_days'])/100000).toFixed(2) + 'L';
            }
            else
            {
              this.HOLast30Days=(Number(response['last30_days'])/1000).toFixed(2) + 'K';
            }
      }
      else
      {
          this.HOoday=this.getCommaValue(response['today']);
          this.HOverall=this.getCommaValue(response['overall']);
          this.HOLast30Days=this.getCommaValue(response['last30_days']);
      }
      //this.HToday=response['today'];
      //this.HOverall=response['overall'];
    }
    });
   }
getDistrict(state_code:any)
{
  
  this.pmjReq.type=this.encrdecrdervice.encrypted('DM');  
  if(state_code!="")
    this.pmjReq.state_code=this.encrdecrdervice.encrypted(state_code);
  this.pmjReq.district_code="";
  this.pmjReq.rpttype="";     
 this.apiService.GetStateDist(this.pmjReq).subscribe((response) => { 
              
     if(response['status']=="true")
 {
   this.DistrictList=response['list'];
  }
  else
  {this.DistrictList=null}
 });

}

getDistrictHOSP(state_code:any)
{
  
  this.pmjReq.type=this.encrdecrdervice.encrypted('DMHOSP'); 
  if(state_code!="") 
  this.pmjReq.state_code=this.encrdecrdervice.encrypted(state_code);
  else
  this.pmjReq.state_code="";
  this.pmjReq.district_code="";
  this.pmjReq.rpttype="";     
 this.apiService.GetStateDist(this.pmjReq).subscribe((response) => { 
              
     if(response['status']=="true")
 {
   this.DistrictList_HOSP=response['list'];
  }
  else
  {this.DistrictList_HOSP=null}
 });

}

getHosp(state_code:any,district_code:any)
{
  
  this.pmjReq.type=this.encrdecrdervice.encrypted('HM'); 
  if(state_code!="") 
  this.pmjReq.state_code=this.encrdecrdervice.encrypted(state_code);
  if(district_code!="")
  this.pmjReq.district_code=this.encrdecrdervice.encrypted(district_code);
  this.pmjReq.rpttype="";     
 this.apiService.GetStateDist(this.pmjReq).subscribe((response) => { 
   //console.log(response);            
     if(response['status']=="true")
 {
   this.HospList=response['list'];
  }
 });

}

   bindDistrict(event:any)
   { 
    var val=event.target.value;
    
    this.getDistrictHOSP(val);
    this.getHosp("","");
    $('#ddlHosp').val("");
    if(val!="")
    {
      this.StateError="";     
    }
    else
    {
      this.StateError="Please select state.";
    }
   }
   bindHosp(event:any)
   { 
    var val=event.target.value;
   var state= $('#ddlState').val(); 
  
   this.getHosp(state,val);
    if(val!="")
    {
      this.DistrictError="";
    }
    else
    {
      this.DistrictError="Please select district.";
    }
   }

   bindHosp1(event:any)
   { 
    var val=event.target.value;
   
    if(val!="")
    {
      this.HospError="";
    }
    else
    {
      this.HospError="Please select hospital.";
    }
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

    let HETDT= <HTMLScriptElement>document.getElementById('HETDT');
let HATDT= <HTMLScriptElement>document.getElementById('HATDT');
let ACGTDT= <HTMLScriptElement>document.getElementById('ACGTDT');


let HETDW= <HTMLScriptElement>document.getElementById('HETDW');
let HATDW= <HTMLScriptElement>document.getElementById('HATDW');
let ACGTDW= <HTMLScriptElement>document.getElementById('ACGTDW');

let HETDA= <HTMLScriptElement>document.getElementById('HETDA');
let HATDA= <HTMLScriptElement>document.getElementById('HATDA');
let ACGTDA= <HTMLScriptElement>document.getElementById('ACGTDA');
HETDT.className = 'active';
HATDT.className = 'active';
ACGTDT.className = 'active';

HETDW.className = '';
HATDW.className = '';
ACGTDW.className = '';

HETDA.className = '';
HATDA.className = '';
ACGTDA.className = '';

     this.bars3.destroy();
     this.GetACPStateWise("ACGS","",val,"");

     this.GetTopHeadData(val,"");
    
     this.GetHospitalAuthTop(this.hosptoptype,val,"")

     this.ACGGBars.destroy();
    this.ACGGender(val,"");
    this.ACGABars.destroy();
    this.ACGAge(val,""); 
    
    this.ACGDTBars.destroy();
    this.GetACGTD("ACGTD","T",val,"");

    this.barsHAS.destroy();
    this.GetHAStateWise("HAS","",val,""); 

    this.barsHES.destroy();
    this.GetHEStateWise("HES","",val,""); 

    this.HAGBars.destroy();
    this.HAGender(val,"");

    this.HAABars.destroy();
    this.HAAge(val,""); 
    
    this.HADTBars.destroy();
    this.GetHATD("HATD","T",val,"");

    
    this.GetHEB("HEB","",val,"","Y");
    

    this.HETDBars.destroy();
    this.GetHETD("HETD","T",val,"");

    
    
    let speciality = <HTMLElement>document.getElementById('speciality');
    //speciality.ariaPressed='false';
    let procedure = <HTMLElement>document.getElementById('procedure');
    //procedure.ariaPressed='false';
   // console.log("procedure.ariaPressed : "+procedure.ariaPressed);
    if(procedure.ariaPressed=="false")
    {      
          this.PROCbars.destroy();
          this.GetPocedure("TMSPROC","C",val,""); 
          this.SPECExportFile ="Count";      
    }
    else
    {
          this.PROCbars.destroy();
          this.GetPocedure("TMSPROC","A",val,""); 
          this.PROCExportFile ="Amount";
      
    }

    
    if(speciality.ariaPressed=="false")
    {      
          this.SPECbars.destroy();
          this.GetSpeciality("TMSSPEC","C",val,""); 
          this.PROCExportFile ="Count";      
    }
    else
    {
          this.SPECbars.destroy();
          this.GetSpeciality("TMSSPEC","A",val,""); 
          this.PROCExportFile ="Amount";
      
    }
  }

  ACGTDclickme(type:any){

    this.ACGDTBars.destroy();
    if(this.state==undefined)
    {
      this.state='';
    }
    if(this.district==undefined)
    {
      this.district='';
    }
    
    this.GetACGTD('ACGTD',type,this.state,this.district);
    let elementW = <HTMLScriptElement>document.getElementById('ACGTDW');
    let elementT = <HTMLScriptElement>document.getElementById('ACGTDT');
    let elementA = <HTMLScriptElement>document.getElementById('ACGTDA');
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

  BISCTDclickme(type:any){

    this.BISCCTDBars.destroy();
    if(this.state==undefined)
    {
      this.state='';
    }
    if(this.district==undefined)
    {
      this.district='';
    }
    
    this.GetBISCCTD('BISCCTD',type,this.state,this.district);
    let elementW = <HTMLScriptElement>document.getElementById('BISCTDW');
    let elementT = <HTMLScriptElement>document.getElementById('BISCTDT');
    let elementA = <HTMLScriptElement>document.getElementById('BISCTDA');
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

/*
  ACITDclickme(type:any){

    this.ACIDTBars.destroy();
    if(this.state==undefined)
    {
      this.state='';
    }
    if(this.district==undefined)
    {
      this.district='';
    }
    
    this.GetACITD('ACITD',type,this.state,this.district);
    let elementW = <HTMLScriptElement>document.getElementById('ACITDW');
    let elementT = <HTMLScriptElement>document.getElementById('ACITDT');
    let elementA = <HTMLScriptElement>document.getElementById('ACITDA');
    console.log(elementW);
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
*/
  HATDclickme(type:any){

    this.HADTBars.destroy();
    if(this.state==undefined)
    {
      this.state='';
    }
    if(this.district==undefined)
    {
      this.district='';
    }
    
    this.GetHATD('HATD',type,this.state,this.district);
    let elementW = <HTMLScriptElement>document.getElementById('HATDW');
    let elementT = <HTMLScriptElement>document.getElementById('HATDT');
    let elementA = <HTMLScriptElement>document.getElementById('HATDA');
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


  HETDclickme(type:any){

    this.HETDBars.destroy();
    if(this.state==undefined)
    {
      this.state='';
    }
    if(this.district==undefined)
    {
      this.district='';
    }
    
    this.GetHETD('HETD',type,this.state,this.district);
    let elementW = <HTMLScriptElement>document.getElementById('HETDW');
    let elementT = <HTMLScriptElement>document.getElementById('HETDT');
    let elementA = <HTMLScriptElement>document.getElementById('HETDA');
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

  GetACGTD(type:any,rpttype:any,state_code:any,district_code:any)
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
       
        this.ACGDTTextArr = [];
        this.ACGDTValueArr = [];
        this.ACGDTtxtArr = [];
        this.ACGDTTextArr=this.chResp.list;
        this.jsonDataACGTD=this.chResp.list;
         // console.log(this.chResp.list);          
            for(var i in this.ACGDTTextArr)
            {
              this.ACGDTtxtArr.push(this.ACGDTTextArr[i]['text']);
              this.ACGDTValueArr.push(this.ACGDTTextArr[i]['value']);
              //this.ACGDTcolor.push(this.getRandomColor());
            } 
            //this.HASElement = this.HAS.nativeElement;
          //var px=(this.HASValueArr.length*19)+"px";
          //this.HASElement.style.height=px; 
          //const gradient = this.ACGTDChart.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 600);
          //gradient.addColorStop(0, 'rgba(248,228,181,.7)');
         // gradient.addColorStop(0, 'rgba(248,242,231,1)');
          
     
      this.ACGDTBars = new Chart(this.ACGTDChart.nativeElement, {
        type: 'line',        
        data: {
          labels: this.ACGDTtxtArr,
          datasets: [{  
            label:'Ayushman Card Created - Trends'  ,        
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


   GetBISCCTD(type:any,rpttype:any,state_code:any,district_code:any)
   {       
    this.apiService.GetSetuCardData({
      "type":type,
      "state_code":state_code,
      "district_code":district_code,
      "agency_code":"",
      "fromdate": "",
      "todate":"",
      "rpttype":rpttype
    }).subscribe((response: any)=>{             
      this.chResp=response;            
      if(this.chResp.status=="true")
      {
        
       this.BISCCTDTcolor=[];
       
        this.BISCCTDTTextArr = [];
        this.BISCCTDValueArr = [];
        this.BISCCTDValue_Delivery_Arr=[];
        this.BISCCTDtxtArr = [];
        this.BISCCTDTextArr=this.chResp.list;
        this.jsonDataBISCCTD=this.chResp.list;
         // console.log(this.chResp.list);          
            for(var i in this.BISCCTDTextArr)
            {
              this.BISCCTDtxtArr.push(this.BISCCTDTextArr[i]['text']);
              this.BISCCTDValueArr.push(this.BISCCTDTextArr[i]['total']);
              this.BISCCTDValue_Delivery_Arr.push(this.BISCCTDTextArr[i]['delivery_total']);
              //this.ACGDTcolor.push(this.getRandomColor());
            } 
           
      this.BISCCTDBars = new Chart(this.BISCTDChart.nativeElement, {
        type: 'line',        
        data: {
          labels: this.BISCCTDtxtArr,
          datasets: [{  
            label:'Card Delivered'  ,        
            data: this.BISCCTDValue_Delivery_Arr,
            backgroundColor: 'rgba(56, 199, 101,.5)',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgba(56, 199, 101,.5)',// array should have same number of elements as number of dataset
            borderWidth: 1.5,
            fill:true,
            pointRadius:2,
            pointBorderColor:'#38c765',
            yAxisID: 'second-y-axis',
            //backgroundColor:gradient,
          },{  
            label:'eYKC Request Received'  ,        
            data: this.BISCCTDValueArr,
            backgroundColor: 'rgba(159, 199, 201,.7)',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgba(159, 199, 201,.7)',// array should have same number of elements as number of dataset
            borderWidth: 1.5,
            fill:true,
            pointRadius:2,
            pointBorderColor:'#9fc7c9',
            //backgroundColor:gradient,
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
          indexAxis: 'x',scales:{x:{suggestedMin: 50,suggestedMax: 100,ticks:{          
            
            maxRotation: 180,
            minRotation: 90,
            autoSkip: false,
            font:{size:12,family:'Roboto'},color:'#989898'
        },stacked:true},y:{ticks:{         
            
          font:{size:12,family:'Roboto'},color:'#989898'
      },position:"right",stacked:true}},         
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

   /*
   GetACITD(type:any,rpttype:any,state_code:any,district_code:any)
   {       
    this.pmjReq.type=type;  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;    
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => {             
      this.chResp=response;            
      if(this.chResp.status=="true")
      {
        
       this.ACIDTcolor=[];
       
        this.ACIDTTextArr = [];
        this.ACIDTValueArr = [];
        this.ACIDTtxtArr = [];
        this.ACIDTTextArr=this.chResp.list;
          console.log(this.chResp.list);          
            for(var i in this.ACIDTTextArr)
            {
              this.ACIDTtxtArr.push(this.ACIDTTextArr[i]['text']);
              this.ACIDTValueArr.push(this.ACIDTTextArr[i]['value']);
              //this.ACGDTcolor.push(this.getRandomColor());
            }     
      this.ACIDTBars = new Chart(this.ACITDChart.nativeElement, {
        type: 'line',        
        data: {
          labels: this.ACIDTtxtArr,
          datasets: [{  
            label:'Ayushman Card In Process Trained'  ,        
            data: this.ACIDTValueArr,
            backgroundColor: this.getRandomColor(),//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
          }]
        },
        options: {
          plugins:{
            legend:{display: false}
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
   */
   GetHATD(type:any,rpttype:any,state_code:any,district_code:any)
   {       
    this.pmjReq.type=type;  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;    
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => {             
      this.chResp=response;            
      if(this.chResp.status=="true")
      {
        
       this.HADTcolor=[];
       
        this.HADTTextArr = [];
        this.HADTValueArr = [];
        this.HADTtxtArr = [];
        this.HADTTextArr=this.chResp.list;
        this.jsonDataHATD=this.chResp.list;
          //console.log(this.chResp.list);          
            for(var i in this.HADTTextArr)
            {
              this.HADTtxtArr.push(this.HADTTextArr[i]['text']);
              this.HADTValueArr.push(this.HADTTextArr[i]['value']);
              //this.ACGDTcolor.push(this.getRandomColor());
            }     
      this.HADTBars = new Chart(this.HATDChart.nativeElement, {
        type: 'line',        
        data: {
          labels: this.HADTtxtArr,
          datasets: [{  
            label:'Authorised Hospital Admission - Trends'  ,        
            data: this.HADTValueArr,
            backgroundColor: 'rgba(227,242,251,.7)',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgba(227,242,251,.7)',// array should have same number of elements as number of dataset
            borderWidth: 1.5,
            fill:true,
            pointRadius:2,
            pointBorderColor:'#2A99EB',
          }]
        },
        options: {
          plugins:{
            legend:{display: false},
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
              tension:.4
            }
          },
        }
      });

    }
    });
   }


   GetHETD(type:any,rpttype:any,state_code:any,district_code:any)
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
        
       this.HETDcolor=[];
       
        this.HETDTextArr = [];
        this.HETDValueArr = [];
        this.HETDtxtArr = [];
        this.HETDTextArr=this.chResp.list;
        this.jsonDataHETD=this.chResp.list;
          //console.log(this.chResp.list);          
            for(var i in this.HETDTextArr)
            {
              this.HETDtxtArr.push(this.HETDTextArr[i]['text']);
              this.HETDValueArr.push(this.HETDTextArr[i]['value']);
              //this.ACGDTcolor.push(this.getRandomColor());
            }     
      this.HETDBars = new Chart(this.HETDChart.nativeElement, {
        type: 'line',        
        data: {
          labels: this.HETDtxtArr,
          datasets: [{  
            label:'Hospital Empanelment - Trends'  ,        
            data: this.HETDValueArr,
            backgroundColor: 'rgba(199, 245, 191,.7)',//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgba(199, 245, 191,.7)',// array should have same number of elements as number of dataset
            borderWidth: 1.5,
            fill:true,
            pointRadius:2,
            pointBorderColor:'#ACEDA1',
          }]
        },
        options: {
          plugins:{
            legend:{display: false},
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
              tension:.4
            }
          },
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
 GetStateCode(statename:any)
   { 
     this.state_code="";          
    this.statename.state_name=statename;   
    this.apiService.GetStateCode(this.statename).subscribe((response) => { 
      
      if(response['status']=="true")
      {
      this.state_code= response['state_code'];
      }
      
    });
    return this.state_code;
  }
  onToggle(id:any)
  {
    let el = <HTMLElement>document.getElementById(id);
    
    if(el.ariaPressed=="false")
    {
      if(id=="procedure")
      {
          this.PROCbars.destroy();
          this.GetPocedure("TMSPROC","A",this.state,"");
          this.PROCExportFile ="Amount";
      }
      if(id=="speciality")
      {
          this.SPECbars.destroy();
          this.GetSpeciality("TMSSPEC","A",this.state,""); 
          this.SPECExportFile ="Amount";
      }
      if(id=="hospauthamount")
      {
        this.hosptoptype="PAAA";
        this.GetHospitalAuthTop(this.hosptoptype,this.state,"")
      }
    }
    else
    {
      if(id=="procedure")
      {
          this.PROCbars.destroy();
          this.GetPocedure("TMSPROC","C",this.state,""); 
          this.PROCExportFile ="Count";
      }
      if(id=="speciality")
      {
          this.SPECbars.destroy();
          this.GetSpeciality("TMSSPEC","C",this.state,""); 
          this.SPECExportFile ="Count";
      }
      if(id=="hospauthamount")
      {
        this.hosptoptype="HA";
        this.GetHospitalAuthTop(this.hosptoptype,this.state,"")
      }
    }
}

  GetPocedure(type:any,rpttype:any,state_code:any,district_code:any)
   {

    this.pmjReq.type=type;  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;    
    
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => { 
          this.chResp=response; 
         
        if(this.chResp.status=="true")
    {
      
     
      this.PROCTextArr = [];
      this.PROCValueArr = [];
      this.txtArr = [];
      this.arr=[];
      this.jsonDataPROC=[];
        
        this.txtArr=this.chResp.list;
        this.jsonDataPROC = this.chResp.list;
          for(var i in this.txtArr)
          {
            this.PROCTextArr.push(this.txtArr[i]['text']);
            this.PROCValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));           
          }
        
          //this.hprafChartElement = this.hprafChart.nativeElement;
          //var px=(this.HPRAFValueArr.length*19)+"px";
          //this.hprafChartElement.style.height=px;
          const gradient = this.PROCChart.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 600);
          gradient.addColorStop(0, 'rgba(136,211,163,1)');
          gradient.addColorStop(1, 'rgba(147,190,226,.5)');
      this.PROCbars = new Chart(this.PROCChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.PROCTextArr,
          datasets: [{  
            label:'Procedure'  ,        
            data: this.PROCValueArr,
            backgroundColor:gradient, // array should have same number of elements as number of dataset
            //borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            //borderWidth: 1,
            barThickness:9,
            barPercentage:0.5,
            //borderRadius:10,
            categoryPercentage:0.5,
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
            autoSkip: false,font:{size:11}
        }},y:{grid:{display:false,drawBorder:false},ticks:{         
            autoSkip: false,font:{size:11}
            //,crossAlign: "far",
        }}},         
          elements: {
            line: {
              borderWidth: 0,              
            }
          },
          //,scales:{x:{grid:{display:false}},y:{grid:{display:false}}}
        }
        
      });
    }
    });
  
   }
/*
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
            this.tag1.push(this.TAGArr[i]['tag1_count']);
            this.tag2.push(this.TAGArr[i]['tag2_count']);
            this.tag3.push(this.TAGArr[i]['tag3_count']);
            this.tag4.push(this.TAGArr[i]['tag4_count']);
            this.tag5.push(this.TAGArr[i]['tag5_count']);
            this.code.push(this.TAGArr[i]['code']);
            
          }   
          
          this.TAGChartElement = this.TAGChart.nativeElement;
          var px=(this.TAGArr.length*5)+"px";
          this.TAGChartElement.style.height=px;

          //this.TAGChartElement = this.TAGChart.nativeElement;
          //var px=(this.TAGArr.length*16)+"px";
          //this.TAGChartElement.style.height=px;

          this.TAGbars = new Chart(this.TAGChart.nativeElement, { type: 'bar',        
          data: {labels:this.TAGTextArr,datasets:[]}});
          this.TAGbars.destroy();

      this.TAGbars = new Chart(this.TAGChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.TAGTextArr,
          datasets: [{  
            label:'SECC Target Families'  ,        
            data: this.tag1,
            backgroundColor:'#006B71', // array should have same number of elements as number of dataset
            //barThickness:12,            
            borderRadius: Number.MAX_VALUE,
            //borderSkipped: false,
          },{  
            label:'Beneficiary have card'  ,        
            data: this.tag2,
            backgroundColor:'#00939B', // array should have same number of elements as number of dataset
            //barThickness:12,            
            borderRadius: Number.MAX_VALUE,
            //borderSkipped: false,
            
          },{  
            label:'Tagged Families'  ,        
            data: this.tag3,
            backgroundColor:'#71D0D7', // array should have same number of elements as number of dataset
            //barThickness:12,            
            borderRadius: Number.MAX_VALUE,
            //borderSkipped: false,
          },{  
            label:'Card to be Created'  ,        
            data: this.tag4,
            backgroundColor:'#AADCDF', // array should have same number of elements as number of dataset
            //barThickness:12,            
            borderRadius: Number.MAX_VALUE,
            //borderSkipped: false,
          },{  
            label:'Ujjwala Families'  ,        
            data: this.tag5,
            backgroundColor:'#9FC3F0', // array should have same number of elements as number of dataset
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
   }*/

   GetSpeciality(type:any,rpttype:any,state_code:any,district_code:any)
   {

    this.pmjReq.type=type;  
    this.pmjReq.state_code=state_code;
    this.pmjReq.district_code=district_code;
    this.pmjReq.rpttype=rpttype;    
    
    this.apiService.GetDataList(this.pmjReq).subscribe((response) => { 
          this.chResp=response; 
          //console.log (response);   
        if(this.chResp.status=="true")
    {
     
      this.SPECTextArr = [];
      this.SPECValueArr = [];
      this.txtArr = [];
      this.arr=[];
      this.jsonDataSPEC=[];
        
        this.txtArr=this.chResp.list;
        this.jsonDataSPEC = this.chResp.list;
          for(var i in this.txtArr)
          {
            this.SPECTextArr.push(this.txtArr[i]['text']);
            this.SPECValueArr.push((Number(this.txtArr[i]['value'])/100000.00).toFixed(2));           
          }
        
      this.SPECbars = new Chart(this.SPECChart.nativeElement, {
        type: 'bar',        
        data: {
          labels: this.SPECTextArr,
          datasets: [{  
            label:'Specilality'  ,        
            data: this.SPECValueArr,
            //backgroundColor:'#D7D79E', // array should have same number of elements as number of dataset
            backgroundColor:'#80ace1',
            //borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            //borderWidth: 1,
            barThickness:9,
            barPercentage:0.5,
            //borderRadius:10,
            categoryPercentage:0.5,
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
            autoSkip: false,font:{size:11},
        }},y:{grid:{display:false,drawBorder:false},ticks:{         
            autoSkip: false,font:{size:11},crossAlign: "far",
        }}},         
          elements: {
            line: {
              borderWidth: 0,              
            }
          },
          //,scales:{x:{grid:{display:false}},y:{grid:{display:false}}}
        }
        
      });
    }
    });
  
   }
   getSA()
   {
    this.userdetailsReq.userid="";  
    this.userdetailsReq.password="";
    
    this.apiService.GetSAReport(this.userdetailsReq).subscribe((response) => {
      
      this.SAData=[];
      var tble="";
    if(response['status']=="true")
    {      
      this.SAData=response['data']
      //console.log(this.CreateTableToExportGETSA(this.SAData));
      
      tble=this.CreateTableToExportGETSA(this.SAData);
    }
    //this.exportExcel(data,filename);
    this.exportExcel(tble,"SA_Productivity_Report");
    });
   }

   CreateTableToExportGETSA(data:any)
  {
    
    var j=0;
    let newDate = new Date(String(data[0]['rpt_dat']));
    var dt=String(this.pipe.transform(newDate, 'd MMMM, y'));
    
    var header="SA Productivity report as "+"on Date "+"("+String(dt)+")";
    
    var count_0_5=0;
    var count_5_10=0;
    var count_g_10=0;
    var total=0;
    let tble="<table border='1'>";
    tble+="<tr><td colspan='6' align='center'>"+String(header)+"</td> </tr>";
    tble+="<tr><td></td><td></td><td colspan='3' align='center'>Amount Range</td><td></td></tr>";
    tble+="<tr><td>SNO</td><td>SA NAME</td><td>0 - 500</td><td>501 to 10,000</td><td>Greater than 10,000</td><td>Total Processed</td></tr>";
    for(var i in data)
    {
      j=j+1;
    tble+="<tr><td>"+j+"</td><td>"+data[i]['sa_name']+"</td><td>"+data[i]['count_0_5']+"</td><td>"+data[i]['count_5_10']+"</td><td>"+data[i]['count_g_10']+"</td><td>"+data[i]['total_processed']+"</td></tr>";
    count_0_5=count_0_5+Number(data[i]['count_0_5']);
    count_5_10=count_5_10+Number(data[i]['count_5_10']);
    count_g_10=count_g_10+Number(data[i]['count_g_10']);
    total=total+Number(data[i]['total_processed']);
    }
    tble+="<tr><td></td><td>Grand Total</td><td>"+count_0_5+"</td><td>"+count_5_10+"</td><td>"+count_g_10+"</td><td>"+total+"</td></tr>";
    tble+="</table>";  
    
  return tble;
  }

  GetEHCP_Details(state_code:any,district_code:any,hosp_type:any)
   {
    this.apiService.GetEHCP_Details({     
      "state_code":state_code,
      "district_code":district_code,
      "hosp_type":hosp_type,
      "age":""
    }).subscribe((resp: any)=>{
      this.pageData.ehcpList = resp.data;  
    
      if(resp.data.length) {
        const keys = Object.keys(resp.data[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.data.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.ehcpList = [totalData]
      } else {
        this.totalData.ehcpList = []
      }
      
    })
   }
   GetEHCP_Hosp_Details(state_code:any,district_code:any,hosp_type:any,age:any)
   {
    this.apiService.GetEHCP_Details({     
      "state_code":state_code,
      "district_code":district_code,
      "hosp_type":hosp_type,
      "age":age
    }).subscribe((resp: any)=>{
      this.pageData.ehcpHospList = resp.data;  
      
      if(resp.data.length) {
        const keys = Object.keys(resp.data[0]).filter(key=>key !== 'text');
        const totalData: any = {
          text: 'Total'
        }
        keys.forEach(key=>{
          totalData[key] = resp.data.reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
        })
        this.totalData.ehcpHospList = [totalData]
      } else {
        this.totalData.ehcpHospList = []
      }
      

      $('#tblHospDeatils').DataTable().clear().destroy();
      
      setTimeout(()=>{      
                    
        $('#tblHospDeatils').DataTable( {       
               
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
   getDrill(state_code:any,district_code:any,hosp_type:any)
   {
   
    if(state_code!="" && district_code!="" && hosp_type!="")
    {
      this.GetEHCP_Details("","","");
    }
    else
    {
      
     this.GetEHCP_Details(state_code,district_code,hosp_type);
    }
   }
   getHospDetails(state_code:any,district_code:any,hosp_type:any,age:any)
   {

    
    if(state_code!="" && district_code!="" && hosp_type!="")
    {
      let divActiveUser = <HTMLScriptElement>document.getElementById('divHosp_Details'); 
      divActiveUser.style.display="block";
      this.GetEHCP_Hosp_Details(state_code,district_code,hosp_type,age);
    }
   

   }
   closeUserModel()
  {
    let divActiveUser = <HTMLScriptElement>document.getElementById('divHosp_Details'); 
    divActiveUser.style.display="none";
  }
  getReport(val:any)
  {}
}
