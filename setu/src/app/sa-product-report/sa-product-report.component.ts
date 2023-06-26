import { DatePipe, getNumberOfCurrencyDigits } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cghsdatareq } from '../model/cghsdatareq';
import { CghssaProductReq } from '../model/cghssa-product-req';
import { EncrDecrService } from '../model/encr-decr-service';
import { ApiserviceService } from '../service/apiservice.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Pmjreq } from '../model/pmjreq';
@Component({
  selector: 'app-sa-product-report',
  templateUrl: './sa-product-report.component.html',
  styleUrls: ['./sa-product-report.component.css']
})
export class SaProductReportComponent implements OnInit {
  //datatablesa:any;
  capfuserdata:any;
  role:any;
  encrdecrdervice:EncrDecrService;
  encdecKey:any;
  userid:any;
  cghssaproduct:CghssaProductReq;
  cghsdatareq=new Cghsdatareq();
  cghspatinetdata:any=[];
  case_no:any="";
  Error:any="";
  notfound:any="";
  jsonData:any;
  type:any;
  pipe = new DatePipe('en-US');
  txtfromdate_create:any;
  txttodate_create:any;
  saproductivityheader:any;
  doclist:any;
  pmjReq:Pmjreq;
  ddldoc:any;
  pageData = {
    datatablesa: [] as any[] ,
    cghsentityagedata: [] as any[]    
  }
  totalData = {
    datatablesa: [] as any[] ,
    cghsentityagedata: [] as any[] 
  }

  constructor(public apiService: ApiserviceService,
    public router: Router) { 
      this.cghssaproduct=new CghssaProductReq();
      this.encrdecrdervice=new EncrDecrService();
      this.pmjReq=new Pmjreq();
      this.encdecKey=this.encrdecrdervice.keys;
      this.role=this.encrdecrdervice.decrypted(localStorage.getItem('role'));
      this.userid=this.encrdecrdervice.decrypted(localStorage.getItem('userid'));
      if(this.userid=="")
    {
      this.router.navigate(['login']);
    }
    if(this.userid!="" && this.role!="5" && this.role!="1") 
      this.router.navigate(['login']);

      this.type="D";
      this.txtfromdate_create="";
      this.txttodate_create="";
      this.ddldoc="";
    }
    fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    fileExtension = '.xlsx';
  ngOnInit(): void {
    this.GetDocMaster();
    this.GetCGHSSAProduct("","",this.type);
    this.GetCGHSUserData("","","","C");
    this.GetCGHSEntityAgeData("","","","CEX");
    let divdttables = <HTMLScriptElement>document.getElementById('divdttables');
      divdttables.style.display='none';
      let divError = <HTMLScriptElement>document.getElementById('divError');
      divError.style.display='none';
  }
  logout()
  {
    this.router.navigate(['/pmjayhome']); 
  }
  CreateTableToExport(data:any)
  {
    let tble="<table border='1'>"; 
  tble+="<thead><tr ><td colspan='18'>Summary of Claims by Sanctioning Authority "+this.saproductivityheader+" date</td></tr>";
  tble+="<tr ><td colspan='2'></td><td colspan='8'>Auto Approved</td><td colspan='8'>Manual Approved</td></tr>";
  tble+="<tr style=><td colspan='2'></td><td colspan='2'>500 and Below</td><td colspan='2'>501 - 10,000</td><td colspan='2'>10,001 and Above</td><td colspan='2'>Total</td><td colspan='2'>500 and Below</td><td colspan='2'>501 - 10,000</td><td colspan='2'>10,001 and Above</td><td colspan='2'>Total</td></tr>";
  tble+="<tr>";
  tble+="<th>Sanctioning Authority</th>";
  /*tble+="<th>Login ID</th> ";*/
  tble+="<th>Date</th> ";                                                 
  tble+="<th>Count</th>";
  tble+="<th>Amount</th>";
  tble+="<th>Count</th>";
  tble+="<th>Amount</th>";
  tble+="<th>Count</th>";
  tble+="<th>Amount</th>";
  tble+="<th>Count</th>";
  tble+="<th>Amount</th>";
  tble+="<th>Count</th>";
  tble+="<th>Amount</th>";
  tble+="<th>Count</th>";
  tble+="<th>Amount</th>";
  tble+="<th>Count</th>";
  tble+="<th>Amount</th>";
  tble+="<th>Count</th>";
  tble+="<th>Amount</th>";
  tble+="</tr>";
  tble+="</thead>";
  for(var i in data)
  {
    tble+="<tr >";
    tble+="<td >"+data[i]['first_name']+" </td>";
   /* tble+="<td >"+data[i]['login_name']+"</td>";*/                                                  
    tble+="<td>"+data[i]['date']+"</td>";                                                  
    tble+="<td>"+data[i]['a_count_0_5']+"</td>";
    tble+="<td>"+data[i]['a_amount_0_5']+"</td>";
    tble+="<td>"+data[i]['a_count_5_10']+"</td>";
    tble+="<td>"+data[i]['a_amount_5_10']+"</td>";
    tble+="<td>"+data[i]['a_count_g_10']+"</td>";
    tble+="<td>"+data[i]['a_amount_g_10']+"</td>";
    tble+="<td>"+data[i]['a_tt']+"</td>";
    tble+="<td>"+data[i]['a_amount_tt']+"</td>";
    tble+="<td>"+data[i]['m_count_0_5']+"</td>";
    tble+="<td>"+data[i]['m_amount_0_5']+"</td>";
    tble+="<td>"+data[i]['m_count_5_10']+"</td>";
    tble+="<td>"+data[i]['m_amount_5_10']+"</td>";
    tble+="<td>"+data[i]['m_count_g_10']+"</td>";
    tble+="<td>"+data[i]['m_amount_g_10']+"</td>";
    tble+="<td>"+data[i]['m_tt']+"</td>";
    tble+="<td>"+data[i]['m_amount_tt']+"</td>";
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


  exportexcel(filename:any)
  {
    
    
      var data=this.CreateTableToExport(this.jsonData);
      //console.log(data);
    this.exportExcel(data,filename);
    //this.exportExce1l(this.jsonDataACGS,filename);
    
  }

  getReport(type:any)
  {}
  bindReport()
  {
    var dtTO="";
    var   dtfrom="";
    /*var fromDate=String($('#txtfromdate_create').val());
    var   toDate=String($('#txttodate_create').val());
   
    if(fromDate!=null)
    {
    let newDate = new Date(String(fromDate));
     dtfrom=String(this.pipe.transform(newDate, 'yyyy-MM-dd'));
    }
    if(toDate!=null)
    {
    let newDatetO = new Date(String(toDate));
     dtTO=String(this.pipe.transform(newDatetO, 'yyyy-MM-dd'));
    }*/
   
     this.GetCGHSSAProduct(dtfrom,dtTO,this.type);
  }
  GetCGHSSAProduct(fromdate:any,todate:any,type:any)
  {
    console.log("this.txtfromdate_create : "+this.txtfromdate_create);
    let datatablesa = <HTMLScriptElement>document.getElementById('datatablesa');
    let datatablesasum = <HTMLScriptElement>document.getElementById('datatablesasum');
    if(type=="D")
    {
      datatablesasum.style.display="none";
      datatablesa.style.display="block";
      
    }
    if(type=="S")
    {
      datatablesasum.style.display="block";
      datatablesa.style.display="none";
      
    }

    var dtTO="";
    var   dtfrom="";
    if(this.txtfromdate_create!="")
    {
    let newDate = new Date(String(this.txtfromdate_create));
     dtfrom=String(this.pipe.transform(newDate, 'yyyy-MM-dd'));
    }
    if(this.txttodate_create!="")
    {
    let newDatetO = new Date(String(this.txttodate_create));
     dtTO=String(this.pipe.transform(newDatetO, 'yyyy-MM-dd'));
    }

    this.cghssaproduct.type=type;
    this.cghssaproduct.fromdate=dtfrom;  
    this.cghssaproduct.todate=dtTO;  
    this.cghssaproduct.doc_name=this.ddldoc||"";
   this.apiService.GetCGHSSAReport(this.cghssaproduct).subscribe((response) => { 
      if(response['status']=="true")
   {
    this.jsonData=[];
    this.pageData.datatablesa=response['data'];
     this.jsonData=response['data'];

     if(dtfrom=="" && dtTO=="")
     {
      let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
      var dt=String(this.pipe.transform(yesterday, 'dd-MM-yyyy'));
        this.saproductivityheader=" as on "+dt;
     }

     if(dtfrom!="" && dtTO=="")
     {
      let yesterday = new Date(String(dtfrom));
      var dt=String(this.pipe.transform(yesterday, 'dd-MM-yyyy'));
        this.saproductivityheader=" as on "+dt;
     }

     if(dtfrom!="" && dtTO!="")
     {
      let fromdt = new Date(String(dtfrom));
      let todt = new Date(String(dtTO));
      //var dt=String(this.pipe.transform(yesterday, 'dd-MM-yyyy'));
        this.saproductivityheader=" During Period from "+String(this.pipe.transform(fromdt, 'dd-MM-yyyy')) + " to "+String(this.pipe.transform(todt, 'dd-MM-yyyy'));
     }

     if(response['data'].length) {
      const keys = Object.keys(response['data'][0]).filter(key=>key !== 'text');
      const totalData: any = {
        text: 'Total'
      }
      keys.forEach(key=>{
        totalData[key] = response['data'].reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
      })
      this.totalData.datatablesa = [totalData]
    } else {
      this.totalData.datatablesa = []
    }  

    if(type=="D")
    {
      $('#datatablesa').DataTable().clear().destroy();
     setTimeout(()=>{  
       
//$("#datatableexample").empty();                        
       $('#datatablesa').DataTable( {
         //destroy:true, 
         pagingType: 'full_numbers',
         pageLength: 50,
         searching:true,
         paging:true,
         processing: true,  
         columnDefs:[{targets:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],orderable:false,searchable:false}],              
         lengthMenu : [10, 25,50],          
       
     });
     }, 1);
      
    }
    if(type=="S")
    {
      $('#datatablesasum').DataTable().clear().destroy();
     setTimeout(()=>{  
       
//$("#datatableexample").empty();                        
       $('#datatablesasum').DataTable( {
         //destroy:true, 
         pagingType: 'full_numbers',
         pageLength: 50,
         searching:true,
         paging:true,
         processing: true,  
         columnDefs:[{targets:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],orderable:false,searchable:false}],              
         lengthMenu : [10, 25,50],          
       
     });
     }, 1);
      
    }

     
   }
   });
    
  }
  getdateFormat(dt:any)
  {
    var getdt="";
    if(dt!="")
    {
    let yesterday = new Date(String(dt));
      getdt=String(this.pipe.transform(yesterday, 'dd-MM-yyyy'));
    }
    return getdt;
  }
  getCommaValue(nStr:any)
  {
    nStr=String(nStr).replace(".0","");
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
  getNumber(val:any)
  {
    var num;
    num=Number(val);
    if(num>0)
    num=String(num.toFixed(0));
    else
    num=0;
    return num;
  }
  onToggle(id:any)
  {
    let el = <HTMLElement>document.getElementById(id);
    let CLSummaryCR = <HTMLScriptElement>document.getElementById('CLSummaryCR_CAPF');
    let capfuserdatacount = <HTMLScriptElement>document.getElementById('capfuserdatacount');
      let capfuserdataamount = <HTMLScriptElement>document.getElementById('capfuserdataamount');
      if(el.ariaPressed=="false")
      {
        if(id=="CAPF_togguserdata")
        {
          capfuserdatacount.style.display="none";
          capfuserdataamount.style.display="block";
          CLSummaryCR.style.display="inline-block";
        }
      }
      else
      {
        if(id=="CAPF_togguserdata")
        {
          capfuserdatacount.style.display="block";
          capfuserdataamount.style.display="none";
          CLSummaryCR.style.display="none";
        }
      }
  }

  GetCGHSUserData(state_code:any,district_code:any,hosp_code:any,toggelType:any)
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
      this.cghsdatareq.type='SCVL';
      this.cghsdatareq.state_code=state_code;
      this.cghsdatareq.district_code=district_code;
      this.cghsdatareq.hosp_code=hosp_code;
      this.cghsdatareq.rpttype="";
      this.apiService.GetCGHSUserData(this.cghsdatareq).subscribe((response) => {
      //console.log(response);
      if(response['status']=="true")
      {
        this.capfuserdata=[];
        this.capfuserdata=response['list'];
      }
      });
   }
   
   GetCGHSPatientData() {
    let divdttables = <HTMLScriptElement>document.getElementById('divdttables');
      divdttables.style.display='none';
      let divError = <HTMLScriptElement>document.getElementById('divError');
      divError.style.display='none';
      
    if(this.case_no!="")
    {
    this.apiService.GetCGHSPatientData({      
      "state_code":"",
      "district_code":"",
      "hosp_code":"",
      "case_no":this.case_no
      
    }).subscribe((resp: any)=>{   
      console.log(resp);   
      this.cghspatinetdata = resp.list;    
      if(resp.list.length>0)
      {
        divdttables.style.display='block';
        this.notfound="";
        divError.style.display="none";
      }
      else
      {
        this.notfound="Record not found!!!"
        divError.style.display="block";
      }
    })
  }
  else
  {
   
    this.Error="Please case number!!";
  }
}

getOption(opt:any)
  {
    let divcghscexdata = <HTMLScriptElement>document.getElementById('divcghscexdata');
      let divcghscpddata = <HTMLScriptElement>document.getElementById('divcghscpddata');
      if(opt=="CEX")
      {
        divcghscexdata.style.display='block';
        divcghscpddata.style.display='none';
      }
      if(opt=="CPD")
      {
        divcghscexdata.style.display='none';
        divcghscpddata.style.display='block';
      }   
  }

  GetCGHSEntityAgeData(state_code:any,district_code:any,hosp_code:any,level:any)
   {    
    
    let divcghscexdata = <HTMLScriptElement>document.getElementById('divcghscexdata');
      let divcghscpddata = <HTMLScriptElement>document.getElementById('divcghscpddata');
      if(level=="CEX")
      {
        divcghscexdata.style.display='block';
        divcghscpddata.style.display='none';
      }
      if(level=="CPD")
      {
        divcghscexdata.style.display='none';
        divcghscpddata.style.display='block';
      }
      this.cghsdatareq.type='CGHSEA';  
      this.cghsdatareq.state_code=state_code;
      this.cghsdatareq.district_code=district_code;
      this.cghsdatareq.hosp_code=hosp_code;
      this.cghsdatareq.rpttype="";
      this.apiService.GetCGHSUserAgeData(this.cghsdatareq).subscribe((response) => {
       
      if(response['status']=="true")
      {
        this.pageData.cghsentityagedata=[];
        this.pageData.cghsentityagedata=response['list'];  
        
        if(response['list'].length) {
          const keys = Object.keys(response['list'][0]).filter(key=>key !== 'text');
          const totalData: any = {
            text: 'Total'
          }
          keys.forEach(key=>{
            totalData[key] = response['list'].reduce((s: number, item:any)=>{return s+Number(item[key])}, 0)
          })
          this.totalData.cghsentityagedata = [totalData]
        } else {
          this.totalData.cghsentityagedata = []
        }   
      }
      });    
   }
   getRDOption(val:any)
   {
    this.type=val;
    
   
     this.GetCGHSSAProduct("","",this.type);
   }
   getEntityName(entityid:any)
   {
    var name="";
    if(entityid=="ISA_1")
        name="GHPL (Old)";
    else if(entityid=="ISA_2")
        name="MediAssist";
    else if(entityid=="ISA_3")
        name="GHPL";
    else if(entityid=="ISA_4")
        name="Medsave";
    else if(entityid=="ISA_5")
        name="MD India";
    else if(entityid=="ISA_6")
        name="Genins";
    else if(entityid=="ISA_7")
        name="Paramount";
    else if(entityid=="ISA_8")
        name="Safeway";
    else if(entityid=="ISA_9")
        name="Vidal";
    else if(entityid=="")
        name="NA";
    else
        name=entityid;
    
        return name;
   }

   GetDocMaster()
  {
    this.pmjReq.type=this.encrdecrdervice.encrypted('CGHSSADM');  
    this.pmjReq.state_code="";
    this.pmjReq.district_code="";
    this.pmjReq.rpttype="";     
   this.apiService.GetStateDist(this.pmjReq).subscribe((response) => { 
     //console.log(response);            
       if(response['status']=="true")
   {
     this.doclist=response['list'];
     //console.log(this.stateList);
   }
   });
    
  }
}
