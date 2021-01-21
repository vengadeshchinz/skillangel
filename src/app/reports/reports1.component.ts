import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports1',
  template: `<div class="row justify-content-center"  ngxUiLoaderBlurred>
  <div class="col-12 col-sm-12 col-md-4 col-lg-4" style="text-align:center;background: #c02127; padding: 10px;
color: white; font-weight: bold; margin:10px; border-radius:10px; min-height: 60px;">
      <div class="col-12">0-20 </div>
      <div class="col-12" style="font-size: 12px; font-weight: bold;">
          {{reportWords[59]}}
      </div>
  </div>
  <div class="col-12 col-sm-12 col-md-4 col-lg-4" style="text-align:center;background: #f36723; padding: 10px;
color: white; font-weight: bold;  margin:10px; border-radius:10px;  min-height: 60px;">
      <div class="col-12">21-40 </div>
      <div class="col-12" style="font-size: 12px; font-weight: bold;">
          {{reportWords[60]}}
      </div>
  </div>
  <div class="col-12 col-sm-12 col-md-4 col-lg-4" style="text-align:center;background: #fdc012; padding: 10px;
color: black; font-weight: bold;  margin:10px; border-radius:10px;  min-height: 60px;">
      <div class="col-12">41-60 </div>
      <div class="col-12" style="font-size: 12px; font-weight: bold;">
          {{reportWords[61]}}</div>
  </div>
  <div class="col-12 col-sm-12 col-md-4 col-lg-4" style="text-align:center;background: #95c954;  padding: 10px;
color: black; font-weight: bold;  margin:10px; border-radius:10px;  min-height: 60px;">
      <div class="col-12">61-80 </div>
      <div class="col-12" style="font-size: 12px; font-weight: bold;">
          {{reportWords[62]}}</div>
  </div>
  <div class="col-12 col-sm-12 col-md-4 col-lg-4" style="text-align:center;background: #2be035; font-weight: bold; padding: 10px;
color: black; margin:10px; border-radius:10px;  min-height: 60px;">
      <div class="col-12">81-100 </div>
      <div class="col-12" style="font-size: 12px; font-weight: bold;">
          {{reportWords[63]}}</div>
  </div>
</div>
`
})
export class Reports1Component implements OnInit {
//////theme variables//////
colortheme = ['black', 'white'];
colortheme_bg;
colortheme_txt;


//////bspi container//////
element: any;
themechange: any;
reportWords: any;

// <ngx-ui-loader [loaderId]="'loader-reports1'"></ngx-ui-loader>

  constructor(
    private ngxService: NgxUiLoaderService,
    private router: Router) {}
  ngOnInit() {
    //////Initail function for defining basic varibles  - starts//////
    if (localStorage.getItem("uid") == "" || localStorage.getItem("uid") == null) {
      this.router.navigateByUrl('/login');
    } else {
      this.colortheme_bg = this.colortheme[parseInt(localStorage.getItem("isdark"))];
      if (parseInt(localStorage.getItem("isdark")) == 0) {
        this.colortheme_txt = this.colortheme[1];
      }
      else {
        this.colortheme_txt = this.colortheme[0];
      }

      this.ngxService.startLoader('loader-reports1');
     
      /////////////////////Get report/////////////////////////

      this.reportWords = JSON.parse(localStorage.getItem('langwords') || '[]');
      this.ngxService.stopLoader('loader-reports1');
    }
    //////Initail function for defining basic varibles  - ends//////
  }
}