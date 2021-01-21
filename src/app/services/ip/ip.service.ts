import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as sha1 from 'js-sha1';
@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(private http: HttpClient) { }
  public getIPAddress() {
    return this.http.get("https://api.ipify.org/?format=json");
  }
  public getUser() {
    return this.http.get(`http://www.geoplugin.net/json.gp?ip=` + localStorage.getItem("my_ip"));
  }
  public gethash(date_val) {
    let msgtohash = localStorage.getItem("session_id") + 'B2C@Ed$6' + date_val;
    let hash = sha1(msgtohash)
    return hash;
  }
}
