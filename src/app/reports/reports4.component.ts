import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { Datashare1Service } from "../services/ip/datashare1.service";
import { ThemeService } from '../services/profile/theme.service';
@Component({
  selector: 'app-reports4',
  template: `<div *ngIf="vis">
  <rg-gauge-chart id="guagechart" [canvasWidth]="canvasWidth" [needleValue]="needleValue "
  [centralLabel]="centralLabel" [options]="options" [name]="name">
</rg-gauge-chart></div>
`,
  styleUrls: ['./reports.component.scss']
})
export class Reports4Component implements OnInit {
  //////theme variables//////
  colortheme = ['black', 'white'];
  colortheme_bg;
  colortheme_txt;
  //////login variables declaration/////
  public canvasWidth;
  public centralLabel = ''
  public name = '';
  chartWidth: any = 400;
  needleValue: any = 0;
  vis = false;
  options: any;



  constructor(private datashare1Serviceserv: Datashare1Service,
    private ngxService: NgxUiLoaderService, private theme: ThemeService,
    private router: Router) {

    this.datashare1Serviceserv.isrep4_gauge.subscribe(value => {
      if (value != 0) {
        this.callme();
      }

    });

  }
  colorVal: any;
  element: any;
  themechange: any;
  ngOnInit() {
    //////Initail function for defining basic varibles  - starts//////
    if (localStorage.getItem("uid") == "" || localStorage.getItem("uid") == null) {
      this.router.navigateByUrl('/login');
    } else {
      this.theme.currenttheme.subscribe(themename => this.themechange = themename)
      this.element = document.querySelector('.' + this.themechange)
      this.colorVal = getComputedStyle(this.element).getPropertyValue('--accent-color');
      this.colortheme_bg = this.colortheme[parseInt(localStorage.getItem("isdark"))];
      if (parseInt(localStorage.getItem("isdark")) == 0) {
        this.colortheme_txt = this.colortheme[1];
      }
      else {
        this.colortheme_txt = this.colortheme[0];
      }

    }
    //////Initail function for defining basic varibles  - ends//////
  }
  callme() {

    //////screen size detecting code//////
    if (window.innerWidth > 1500) {
      this.canvasWidth = window.innerWidth / 5;
    } else if (window.innerWidth > 1000) {
      this.canvasWidth = window.innerWidth / 5;
    } else if (window.innerWidth > 500) {
      this.canvasWidth = window.innerWidth / 3;
    } else {
      this.canvasWidth = window.innerWidth / 2;
    }
    this.vis = true;
    this.theme.currenttheme.subscribe(themename => this.themechange = themename)
      this.element = document.querySelector('.' + this.themechange)
      this.colorVal = getComputedStyle(this.element).getPropertyValue('--accent-color');
    this.needleValue = parseInt(localStorage.getItem("rep4_needleValue"));
    this.options = {
      hasNeedle: true,
      needleColor: this.colorVal,
      needleStartValue: 50,
      arcColors: ["#c02127", "#f36723", "#fdc012", "#95c954"],
      arcDelimiters: [25, 50, 75],
      rangeLabel: ["0", "100"],
    };
  }
}