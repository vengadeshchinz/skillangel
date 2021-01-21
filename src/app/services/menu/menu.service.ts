import { Injectable } from '@angular/core';
import { url } from '../baseurl';
import { getTime, setTime,updatebgm, skillkitstatus, setdobdata, setfbdata, chkfbdata, chklogin, chkinitialcomp, session_id, getmedval } from '../menu/menu';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  baseurl = new url()
  constructor(private http: HttpClient) { }
  /////////////////////////////////
  getTime(uid: getTime) {
    return this.http.post(this.baseurl.serverurl + 'getTime', uid);
  }
  /////////////////////////////////
  setTime(currentdet: setTime) {
    return this.http.post(this.baseurl.serverurl + 'setTime', currentdet);
  }
  setdobdatadetails(setdobdata1: setdobdata) {
    return this.http.post(this.baseurl.serverurl + 'setdobdata', setdobdata1);
  }
  chkfbdatadetails(chkfbdata1: chkfbdata) {
    return this.http.post(this.baseurl.serverurl + 'chkfbdata', chkfbdata1);
  }
  setfbdatadetails(setfbdata1: setfbdata) {
    return this.http.post(this.baseurl.serverurl + 'setfbdata', setfbdata1);
  }
  checkSkillkitStatus(skillkitstatus1: skillkitstatus) {
    return this.http.post(this.baseurl.serverurl + 'getskillkitstatus', skillkitstatus1);
  }
  getLoginDet(logdata: chklogin) {
    return this.http.post(this.baseurl.serverurl + 'dayAfterLoginCheck', logdata);
  }
  chkinitialcompdetails(chkinitialcomp1: chkinitialcomp) {
    return this.http.post(this.baseurl.serverurl + 'chkinitialcomp', chkinitialcomp1);
  }
  getSessionid(s_id: session_id) {
    return this.http.post(this.baseurl.serverurl + 'getsession', s_id);
  }

  session_close(s_id: session_id) {
    return this.http.post(this.baseurl.serverurl + 'session_close', s_id);
  }
  getmedvaldetails(getmedval1: getmedval) {
    return this.http.post(this.baseurl.serverurl + 'getmedval', getmedval1);
  }
  updatebgmdetails(updatebgm1: updatebgm) {
    return this.http.post(this.baseurl.serverurl + 'updatebgm', updatebgm1);
  }
}
