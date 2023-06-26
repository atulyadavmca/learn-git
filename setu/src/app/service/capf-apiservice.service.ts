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
export class CapfApiserviceService {

 StateServiceAPIURL:string = 'https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/statedist/1.0';

 GetCAPFDataURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/capfdata/1.0";
 //GetCAPFDataURL:any="http://localhost:8080/api/pmjdashboard/capfdata/1.0";
 GetCAPFUserDataURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/capfuserdata/1.0";
 //GetCAPFUserDataURL:any="http://localhost:8080/api/pmjdashboard/capfuserdata/1.0";
 GetSAReportURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/saproduct/1.0";
 GetCAPFUploadDateURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/getcapfupdatedate/1.0";
 GetcapfdmshaactivityURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/capfdmshaactivity/1.0";
 GetcapfdmpendingURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/capfdmpending/1.0";

 GetCAPFBISBenDataURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/capfbisben/1.0";

 GetCAPFAadhaarVerPerURL:any="https://dashboard.pmjay.gov.in/pmjservice/api/pmjdashboard/capfaadhaarverper/1.0";

 //StateServiceAPIURL:string = 'http://localhost:8080/api/pmjdashboard/statedist/1.0';
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



  GetCAPFData(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetCAPFDataURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetCAPFBISBenData(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetCAPFBISBenDataURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetCAPFUserData(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetCAPFUserDataURL, JSON.stringify(item), this.httpOptions)
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
  GetCAPFUploadDate(): Observable<any> {
    return this.http.get(this.GetCAPFUploadDateURL).pipe(
         catchError(this.handleError)
    );
  }

  Getcapfdmshaactivity(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetcapfdmshaactivityURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  Getcapfdmpending(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetcapfdmpendingURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  GetcapfAadhaarVer_Per(item:any): Observable<any> {
    return this.http
      .post<any>(this.GetCAPFAadhaarVerPerURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}


