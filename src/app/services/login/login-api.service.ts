import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { accLogin, getWords, sessionid, getUsername, insertlocation, login_otp_SA, otpverification_SA, newpwd_SA } from './loginAPI';
import { Observable } from 'rxjs';
import { url } from '../baseurl';
@Injectable({
  providedIn: 'root'
})

export class LoginAPIService {
  baseurl = new url()
  constructor(private http: HttpClient) { }

  getAccDetails(accLogin1: accLogin): Observable<accLogin> {
    return this.http.post<accLogin>(this.baseurl.serverurl + 'accLogin', accLogin1);
  }
  getAccDetails_trail(accLogin1: accLogin): Observable<accLogin> {
    return this.http.post<accLogin>(this.baseurl.trailUrl + 'checklogin_ang', accLogin1);
  }
  getLanguages(): Observable<null> {
    return this.http.post<null>(this.baseurl.serverurl + 'getLanguages', null);
  }
  getLangWords(getWords1: getWords): Observable<getWords> {
    return this.http.post<getWords>(this.baseurl.serverurl + 'getSiteWords', getWords1);
  }
  setSessionid(setsession: sessionid): Observable<getWords> {
    return this.http.post<getWords>(this.baseurl.serverurl + 'setsessionid', setsession);
  }

  getUsernameDetails(getUsername1: getUsername): Observable<getUsername> {
    return this.http.post<getUsername>(this.baseurl.serverurl + 'getUsername', getUsername1);
  }
  insertlocationDetails(insertlocation1: insertlocation): Observable<insertlocation> {
    return this.http.post<insertlocation>(this.baseurl.serverurl + 'insertlocation', insertlocation1);
  }
  login_otp_SADetails(login_otp_SA1: login_otp_SA): Observable<login_otp_SA> {
    return this.http.post<login_otp_SA>(this.baseurl.serverurl + 'login_otp_SA', login_otp_SA1);
  }
  login_otp_demo(login_otp_SA1: login_otp_SA): Observable<login_otp_SA> {
    return this.http.post<login_otp_SA>(this.baseurl.trailUrl + 'checklogin_ang', login_otp_SA1);
  }
  otpverification_SADetails(otpverification_SA1: otpverification_SA): Observable<otpverification_SA> {
    return this.http.post<otpverification_SA>(this.baseurl.serverurl + 'otpverification_SA', otpverification_SA1);
  }
  otpverification_demo(otpverification_SA1: otpverification_SA): Observable<otpverification_SA> {
    return this.http.post<otpverification_SA>(this.baseurl.trailUrl + 'checkloginbyOTP_ang', otpverification_SA1);
  }

  newpwd_SADetails(newpwd_SA1: newpwd_SA): Observable<newpwd_SA> {
    return this.http.post<newpwd_SA>(this.baseurl.serverurl + 'newpwd_SA', newpwd_SA1);
  }
}
