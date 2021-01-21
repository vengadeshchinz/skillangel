import { Injectable } from '@angular/core';
import { url } from '../baseurl';
import { profileget, themeUpdate,
   audioUpdate, langUpdate, getThemeScore, updatebasetheme,schChange,nameChange } from '../profile/profile';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseurl = new url()
  constructor(private http: HttpClient) { }
  /////////////////////
  getprofile(uid: profileget) {
    return this.http.post(this.baseurl.serverurl + 'getprofile', uid);
  }

  /////////////////////
  updatetheme(theme: themeUpdate) {
    return this.http.post(this.baseurl.serverurl + 'updatetheme', theme);
  }
  /////////////////////
  updateaudio(audio: audioUpdate) {
    return this.http.post(this.baseurl.serverurl + 'updateaudio', audio);
  }
  /////////////////////
  updatelang(lang: langUpdate) {
    return this.http.post(this.baseurl.serverurl + 'updatelang', lang);
  }
  /////////////////////
  getthemeusertotscore(uid: getThemeScore) {
    return this.http.post(this.baseurl.serverurl + 'getthemeusertotscore', uid);
  }
  /////////////////////
  getLanguagesProf(): Observable<null> {
    return this.http.post<null>(this.baseurl.serverurl + 'getLanguagesProf', null);
  }
  //////////////////////
  geticon(ImgData) {
    console.log(ImgData)
    return this.http.post(this.baseurl.serverurl + 'icon', ImgData);
  }
  //////////////////////
  uploadprofile(ImgData) {
    console.log(ImgData)
    return this.http.post(this.baseurl.serverurl + 'getProfileImg', ImgData);
  }
  newpwd_SA_sessionDetails(newpwd_SA_session) {
    console.log(newpwd_SA_session)
    return this.http.post(this.baseurl.serverurl + 'newpwd_SA_session', newpwd_SA_session);
  }

  /////////////////////
  updatebasethemeDetails(updatebasetheme1: updatebasetheme) {
    return this.http.post(this.baseurl.serverurl + 'updatebasetheme', updatebasetheme1);
  }

  schChangedetails(schChange1: schChange) {
      return this.http.post(this.baseurl.serverurl + 'schChange', schChange1);
  }
  nameChangedetails(nameChange1: nameChange) {
    return this.http.post(this.baseurl.serverurl + 'nameChange', nameChange1);
  }
  
}
