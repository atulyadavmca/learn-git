import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ChartResp } from '../model/chart-resp';
import {retry, catchError } from 'rxjs/operators';

import { Topheadresp } from '../model/topheadresp';
import { HospitalTypeResp } from '../model/hospital-type-resp';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  
  
 ServiceAPIURL:string = 'https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/topheaddata/1.0';
 ServiceDataAPIURL:string = 'https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/datalist/1.0';  
 StateServiceAPIURL:string = 'https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/statedist/1.0';
 HospitalTypeAPIURL:string = 'https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/hospitaltype/1.0';
 GetUploadDateURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/getupdatedate/1.0";
 GetStateCodeURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/stcode/1.0";
 GetACIVMethodURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/verificationmethod/1.0";
 GetACIApprovalPendingURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/aciapprovalpending/1.0";
 GetPreauthTypeURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/preauthtype/1.0";
 GetEmpanelledActiveURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/empanelledactive/1.0";
 GetPortabilityCaseURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/portabilitycase/1.0";
 GetPerMinURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/permin/1.0";
 GetUserDetailsURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/userdetails/1.0";
 
 GetACGTrendURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/acgtrend/1.0";
 GetTMSPreauthTrendURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/tmstrend/1.0";
 GetTMSClaimURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/tmsclaim/1.0";
 GetTMSActiveURL:string = 'https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/tmsactive/1.0';
 GetCardRefusedURL:string = 'https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/cardrefused/1.0';
 GetTMSSubmitInprocessURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/submitinprocess/1.0";
 GetTreatedPatientURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/treatedpatient/1.0";
 GetPatientDetailsURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/patientdetails/1.0";
 GetPMJReportsURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/pmjreports/1.0";
 GetPMJTrendURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/pmjtrend/1.0";
 GetFamilyCardStatusURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/familycardstatus/1.0";
 
 GetLoginHistoryURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/loginhistory/1.0";
 GetBenCardDetailsURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/getbenbardbetails/1.0";
 GetCGHSDataURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/cghsdata/1.0";
 GetCGHSUserDataURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/cghsuserdata/1.0";
 GetSAReportURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/saproduct/1.0";
 GetCGHSUploadDateURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/getcghsupdatedate/1.0";
 GetCGHSSAReportURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/cghssaproduct/1.0";
 GetconsolidateddashboardURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/consolidateddashboard/1.0";
 GetstatedistblockvillageURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/statedistblockvillage/1.0";
 SetuCardAPIURL: string = 'https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/setucardreport/1.0';

 AyushmanCardAPIURL: string = 'https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/getayushmancard/1.0';
 GetCardDriveURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/carddrive/1.0";
 //GetCardDriveURL:any="http://localhost:8080/api/pmjdashboard/carddrive/1.0";
 GetCGHSPatientDataURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/cghspatientdata/1.0";
 GetCardDriveUploadDateURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/getcarddriveupdatedate/1.0";
 GetDriveInsightsUploadDateURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/getdriveinsightsupdatedate/1.0";
 GetCGHSUserAgeDataURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/cghsuseragedata/1.0";
 GetCGHSAmountLevelDataURL="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/cghsclaimamountlevel/1.0";
 GetCGHSLevelTrendsURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/cghsleveltrends/1.0";
 GetotpURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/getotp/1.0";
 GetVerifyotpURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/verifyotp/1.0";
 GetEHCPURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/ehcpdetails/1.0";

 GetTMSCALIM_S_D_H_URL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/tmsclaim_s_d_h_wise/1.0";

 GetBIS_SDBV_URL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/bis_sdbv/1.0";
 BISStateDistURL:string = 'https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/bisstatedist/1.0';
 GetTMSCALIM_TAT_URL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/tmsclaimtat/1.0"; 
 GetERUPI_URL:any="https://dashboard.pmjay.gov.in/pmjservicetest/api/erupidashboard/erupihome/1.0";

 GetCard_Delivery_URL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/carddelivery/1.0";
 

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  
  
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  GetStateDist(item:any): Observable<ChartResp> {
    return this.http
      .post<ChartResp>(this.StateServiceAPIURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetTopHeadData(item:any): Observable<Topheadresp> {
    return this.http
      .post<Topheadresp>(this.ServiceAPIURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetDataList(item:any): Observable<ChartResp> {
    return this.http
      .post<ChartResp>(this.ServiceDataAPIURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  

  GetDataList1(item:any): Observable<any> {
    return this.http
      .post<any>(this.ServiceDataAPIURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  GetHospitalType(item:any): Observable<HospitalTypeResp> {
    return this.http
      .post<HospitalTypeResp>(this.HospitalTypeAPIURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  GetUploadDate(): Observable<any> {
    return this.http.get(this.GetUploadDateURL).pipe(
         catchError(this.handleError)
    );
  }
  GetCGHSUploadDate(): Observable<any> {
    return this.http.get(this.GetCGHSUploadDateURL).pipe(
         catchError(this.handleError)
    );
  }
  GetStateCode(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetStateCodeURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetACIVMethod(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetACIVMethodURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetACIApprovalPending(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetACIApprovalPendingURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  GetPreauthType(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetPreauthTypeURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  GetEmpanelledActive(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetEmpanelledActiveURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetPortabilityCases(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetPortabilityCaseURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetPerMin(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetPerMinURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetUserDetails(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetUserDetailsURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetACGTrend(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetACGTrendURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetTMSTrend(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetTMSPreauthTrendURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetTMSCalim(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetTMSClaimURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  GetTMSActive(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetTMSActiveURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetCardRefused(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetCardRefusedURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetTMSSubmitInprocess(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetTMSSubmitInprocessURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetTreatedPatient(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetTreatedPatientURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetPatientDetails(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetPatientDetailsURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetPMJReports(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetPMJReportsURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetPMJTrend(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetPMJTrendURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetFamilyCardStatus(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetFamilyCardStatusURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetLoginHistory(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetLoginHistoryURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetBenCardDetails(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetBenCardDetailsURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  GetCGHSData(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetCGHSDataURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetCGHSPatientData(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetCGHSPatientDataURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  GetCGHSUserData(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetCGHSUserDataURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetCGHSAmountLevel(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetCGHSAmountLevelDataURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetCGHSUserAgeData(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetCGHSUserAgeDataURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetCGHSLevelTrends(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetCGHSLevelTrendsURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetSAReport(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetSAReportURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetCGHSSAReport(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetCGHSSAReportURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetConsolidatedDashboard(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetconsolidateddashboardURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetStateDistrict_Block_Village(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetstatedistblockvillageURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetStateDist_Setu(item:any): Observable<ChartResp> {
    return this.http
      .post<ChartResp>(this.StateServiceAPIURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetSetuCardData(item:any): Observable<ChartResp> {
    return this.http
      .post<ChartResp>(this.SetuCardAPIURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetAyushmanCardData(item:any): Observable<ChartResp> {
    return this.http
      .post<ChartResp>(this.AyushmanCardAPIURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetCardDrive(item:any): Observable<ChartResp> {
    return this.http
      .post<ChartResp>(this.GetCardDriveURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetCardDriveUploadDate(): Observable<any> {
    return this.http.get(this.GetCardDriveUploadDateURL).pipe(
         catchError(this.handleError)
    );
  }
  GetDriveInsightsUploadDate(): Observable<any> {
    return this.http.get(this.GetDriveInsightsUploadDateURL).pipe(
         catchError(this.handleError)
    );
  }

  GetOTP(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetotpURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  VerifyOTP(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetVerifyotpURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetEHCP_Details(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetEHCPURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetTMSCALIM_S_D_H(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetTMSCALIM_S_D_H_URL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  } 
  GetBIS_SDBV(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetBIS_SDBV_URL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  } 
  GetBISStateDist(item:any): Observable<any> {
    return this.http
      .post<any>(this.BISStateDistURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  GetTMSCALIM_TAT(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetTMSCALIM_TAT_URL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  } 
  GetERUPI_Report(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetERUPI_URL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  } 

  GetCard_Delivery_Report(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetCard_Delivery_URL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  } 
}


