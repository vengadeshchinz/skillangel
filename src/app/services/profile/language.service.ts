import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocaldatastorageService } from '../../localdatastorage.service';
import { getWords } from '../../services/login/loginAPI';
import { LoginAPIService } from '../../services/login/login-api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currlang: any;
  getWords = new getWords();
  langtxt: any;
  response1: any;
  langmap = new Map();
  langListname = []
  langList = ["English", "தமிழ்", "తెలుగు", "عربى"]
  ///////////////////////////////
  private langSource = new BehaviorSubject(this.langtxt);
  currentLang = this.langSource.asObservable();

  constructor(private router: Router, private localDataStorageService: LocaldatastorageService,
    private LoginAPIService_ts: LoginAPIService) { }

  changeLanguage(lang: any) {
    this.currlang = this.langListname.indexOf(lang);
    localStorage.setItem("currentlang", this.currlang);
    this.langSource.next(lang);
  }


  loadSiteWords(langid: number, fromPg: number) {

    this.getWords.langid = langid;

    this.LoginAPIService_ts.getLangWords(this.getWords)
      .subscribe(
        res => {

          this.response1 = JSON.parse(JSON.stringify(res));
          if (this.response1.code == "SA000") {
            if (this.response1.result.length == 0) {
              console.log("this.response1");
            } else {
              let templang = new Array();
              for (let k = 0; k < this.response1.result.length; k++) {
                this.langmap.set(this.response1.result[k].wordnum, this.response1.result[k].ol_words);
              }

              for (var j = 0; j < this.response1.result.length; j++) {
                templang.push(this.langmap.get(j + 1));
              }
              this.langtxt = templang;
              this.changeLanguage(this.langtxt);
              localStorage.setItem("langwords", JSON.stringify(this.langtxt));
              this.router.navigateByUrl('/menu');

              if (fromPg != 0) {
                location.reload();
              }
            }
          }
        })
  }

}
