import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
  })
export class EncrDecrService {
    pipe = new DatePipe('en-US');  
keys:any='nawzirriazu$#@$^@PMJAY';
encrypted(value:any) {
    let newDate =Date.now();
    var dt=String(this.pipe.transform(newDate, 'yyyy-MM-dd'));  
    var key=this.keys.trim();
    return CryptoJS.AES.encrypt( value.trim(), key.trim()).toString();
}
decrypted(value:any) {
    let newDate =Date.now();
    var dt=String(this.pipe.transform(newDate, 'yyyy-MM-dd'));  
    var key=this.keys.trim();    
    return CryptoJS.AES.decrypt( value,  key.trim() ).toString(CryptoJS.enc.Utf8);
}   

     
}
