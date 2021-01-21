import { Injectable } from '@angular/core';
import { url } from '../baseurl';
import { getreport, getrank, getskill, getcyclescore, getallassscore, getleaderscore, getcert,getSubSkillScore } from '../report/report';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseurl = new url()
  constructor(private http: HttpClient) { }
  /////////////////////
  getreport(req_data: getreport) {
    return this.http.post(this.baseurl.serverurl + 'getreport', req_data);
  }
  ///////////////////////////////
  getrank(req_data1: getrank) {
    return this.http.post(this.baseurl.serverurl + 'getRank', req_data1);
  }
  ///////////////////////////////
  getskillkit(req_data2: getskill) {
    return this.http.post(this.baseurl.serverurl + 'getskillkit', req_data2);
  }
  ///////////////////////////////
  getcyclescoredetails(getcyclescore1: getcyclescore) {
    return this.http.post(this.baseurl.serverurl + 'getallassscore', getcyclescore1);
  }
  ///////////////////////////////
  getallassscoredetails(getallassscore1: getallassscore) {
    return this.http.post(this.baseurl.serverurl + 'getallassscore', getallassscore1);
  }
  ///////////////////////////////
  getleaderscoredetails(getleaderscore1: getleaderscore) {
    return this.http.post(this.baseurl.serverurl + 'getleaderscore', getleaderscore1);
  }

  ///////////////////////////////
  getcertdetails(getcert1: getcert) {
    return this.http.post(this.baseurl.gencertificateUrl, getcert1);
  }

  ///////////////////////////////
  getSubSkillScoreDetails(getSubSkillScore1: getSubSkillScore) {
    return this.http.post(this.baseurl.serverurl + 'getSubSkillScore', getSubSkillScore1);
  }
}
