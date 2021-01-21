import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  skillcheck, getskillkitgames, getskillkitscore, getgamesstatus,
  getskillkitsnd, getskillkitquescnt, getskillkitorggame, skillkitdet
} from './skillkitAPI';
import { Observable } from 'rxjs';
import { url } from '../baseurl';

@Injectable({
  providedIn: 'root'
})
export class SkillkitService {

  baseurl = new url()
  constructor(private http: HttpClient) { }

  checkSkilllist(skillcheck1: skillcheck): Observable<skillcheck> {
    return this.http.post<skillcheck>(this.baseurl.serverurl + 'checkskilllist', skillcheck1);
  }


  getskillkitscoredetails(getskillkitscore1: getskillkitscore): Observable<getskillkitscore> {
    return this.http.post<getskillkitscore>(this.baseurl.serverurl + 'getskillkitscore', getskillkitscore1);
  }

  getSkillKitGamesDetails(getskillkitgames1: getskillkitgames): Observable<getskillkitgames> {
    return this.http.post<getskillkitgames>(this.baseurl.serverurl + 'getskillkitgames', getskillkitgames1);
  }

  getskillkitsnddetails(getskillkitsnd1: getskillkitsnd): Observable<getskillkitsnd> {
    return this.http.post<getskillkitsnd>(this.baseurl.serverurl + 'getskillkitsnd', getskillkitsnd1);
  }

  getskillkitquescntdetails(getskillkitquescnt1: getskillkitquescnt): Observable<getskillkitquescnt> {
    return this.http.post<getskillkitquescnt>(this.baseurl.serverurl + 'getskillkitquescnt', getskillkitquescnt1);
  }

  getskillkitorggameDetails(getskillkitorggame1: getskillkitorggame): Observable<getskillkitorggame> {
    return this.http.post<getskillkitorggame>(this.baseurl.serverurl + 'getskillkitorggame', getskillkitorggame1);
  }

  getskillkitdet(skillkitdet1: skillkitdet): Observable<skillkitdet> {
    return this.http.post<skillkitdet>(this.baseurl.serverurl + 'checkskillkittoday', skillkitdet1);
  }
  get_skill_detail(get_skill_detail: skillcheck): Observable<skillcheck> {
    return this.http.post<skillcheck>(this.baseurl.serverurl + 'get_skill_detail', get_skill_detail);
  }
  get_skill_lost_cycle(skillkitdet2: skillkitdet): Observable<skillkitdet> {
    return this.http.post<skillkitdet>(this.baseurl.serverurl + 'check_lost_cycle', skillkitdet2);
  }
  getgamesstatusdetails(getgamesstatus1: getgamesstatus): Observable<getgamesstatus> {
    return this.http.post<getgamesstatus>(this.baseurl.serverurl + 'getgamesstatus', getgamesstatus1);
  }
}
