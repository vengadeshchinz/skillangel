import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pgmstatus, getgame, getScore, getTrophy, getquescnt, getsnd, getgamec2, getorggame, getass2trainchk, getDaChk } from './puzzlesquery';
import { url } from '../baseurl';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PuzzlesqueryService {
  baseurl = new url()
  constructor(private http: HttpClient) { }
  getgamedetails(getgame1: getgame): Observable<getgame> {
    return this.http.post<getgame>(this.baseurl.serverurl + 'getgame', getgame1);
  }

  getgamescoredetails(getScore1: getScore): Observable<getScore> {
    return this.http.post<getScore>(this.baseurl.serverurl + 'getScore', getScore1);
  }

  gettrophysdetails(getTrophy1: getTrophy): Observable<getTrophy> {
    return this.http.post<getTrophy>(this.baseurl.serverurl + 'getTrophy', getTrophy1);
  }

  getquescntdetails(getquescnt1: getquescnt): Observable<getquescnt> {
    return this.http.post<getquescnt>(this.baseurl.serverurl + 'getquescnt', getquescnt1);
  }
  getsnddetails(getsnd1: getsnd): Observable<getsnd> {
    return this.http.post<getsnd>(this.baseurl.serverurl + 'getsnd', getsnd1);
  }

  getgamec2details(getgamec21: getgamec2): Observable<getgamec2> {
    return this.http.post<getgamec2>(this.baseurl.serverurl + 'getgamec2', getgamec21);
  }

  getorggamedetails(getorggame1: getorggame): Observable<getorggame> {
    return this.http.post<getorggame>(this.baseurl.serverurl + 'getorggame', getorggame1);
  }

  getass2trainchkdetails(getass2trainchk1: getass2trainchk): Observable<getass2trainchk> {
    return this.http.post<getass2trainchk>(this.baseurl.serverurl + 'getass2trainchk', getass2trainchk1);
  }

  getDaChkdetails(getDaChk1: getDaChk): Observable<getDaChk> {
    return this.http.post<getDaChk>(this.baseurl.serverurl + 'getDaChk', getDaChk1);
  }

  pgmstatusdetails(pgmstatus1: pgmstatus): Observable<pgmstatus> {
    return this.http.post<pgmstatus>(this.baseurl.serverurl + 'pgmstatus', pgmstatus1);
  }

}
