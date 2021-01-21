import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dashData, scoreData, assessData,dashDatacrowny,getisfullschudle} from './dashAPI';
import { url } from '../baseurl';


@Injectable({
  providedIn: 'root'
})

export class DashboardAPIService {
  baseurl = new url()
  constructor(private http: HttpClient) { }

  getDashDetails(dashData1: dashData) {
    return this.http.post(this.baseurl.serverurl + 'getDashData', dashData1);
  }

  dateBasedScores(scoreData1: scoreData){
    return this.http.post(this.baseurl.serverurl + 'getscoredata', scoreData1);
  }

  assessmentBasedscores(assessData1: assessData){
    return this.http.post(this.baseurl.serverurl + 'getAssessmentData', assessData1);
  }
  
  crownyDetails(dashDatacrowny1: dashDatacrowny){
    return this.http.post(this.baseurl.serverurl + 'getCrownyData', dashDatacrowny1);
  }
  getisfullschudleDetails(getisfullschudle1: getisfullschudle){
    return this.http.post(this.baseurl.serverurl + 'getisfullschudle', getisfullschudle1);
  }

}
