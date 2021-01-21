import { Component, OnInit } from '@angular/core';
import { IpService } from '../services/ip/ip.service';
import { HttpClient } from '@angular/common/http';
import { getleaderscore } from '../services/report/report';
import { ReportService } from '../services/report/report.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class LeaderboardComponent implements OnInit {
  //////theme variables//////
  colortheme = ['black', 'white'];
  colortheme_bg;
  colortheme_txt;
  colortheme_base = ['#0D0F12', 'white']
  colortheme_bg_base;
  colortheme_base_sec = ['#181C20', '#F0F0F0']
  colortheme_bg_base_sec;
  colortheme_txt1_Arr = ['rgba(255, 255, 255, 0.65)', 'black'];
  colortheme_txt1;
  //////leaderboard score variables//////
  getleaderscore = new getleaderscore();
  isleader = true;
  toplistArr = [false, false, false];
  imageurl = [];
  colorArr = ['#ffc107', '#8a8a8a', '#af500c', '#9176c7'];
  mycolor = [];
  list = [];
  nameArr = [];
  gradeArr = [];
  SchoolArr = [];
  bspiArr = [];
  potrait_val = true;
  public canvasWidth: number;

  constructor(private reportService: ReportService, private router: Router,
    private ip: IpService, private HttpClient_ts: HttpClient, private ngxService: NgxUiLoaderService) { }

  onResize(event) {
    //////function for getting screen size  - starts//////
    if (window.innerWidth > 1500) {
      this.canvasWidth = window.innerWidth / 5;
    } else if (window.innerWidth > 1000) {
      this.canvasWidth = window.innerWidth / 5;
    } else if (window.innerWidth > 500) {
      this.canvasWidth = window.innerWidth / 3;
    } else {
      this.canvasWidth = window.innerWidth / 2;
    }
    window.location.reload();
    //////function for getting screen size  - ends//////
  }
  cnt_val = 0;
  cnt_val1 = 0;

  countsession;
  load1;
  stopnewload() {
    clearInterval(this.countsession);
    this.load1 = false;
  }
  ngOnInit() {
    this.load1 = true;
    this.ngxService.startLoader('loader-lb');
    //////Initaial function with basic variable definitions  - starts//////
    if (localStorage.getItem("uid") == "" || localStorage.getItem("uid") == null) {
      this.router.navigateByUrl('/login');
    }
    this.colortheme_bg = this.colortheme[parseInt(localStorage.getItem("isdark"))];
    this.colortheme_bg_base_sec = this.colortheme_base_sec[parseInt(localStorage.getItem("isdark"))];
    this.colortheme_txt1 = this.colortheme_txt1_Arr[parseInt(localStorage.getItem("isdark"))];
    if (parseInt(localStorage.getItem("isdark")) == 0) {
      this.colortheme_txt = this.colortheme[1];
    }
    else {
      this.colortheme_txt = this.colortheme[0];
    }

    var width = window.innerWidth;
    if (width < 768 && window.orientation != 90) {
      this.potrait_val = false;
      console.log(this.potrait_val + 'mobile device detected' + window.orientation)
    } else if (width >= 768 && width <= 992) {
      console.log('tablet detected')
      this.potrait_val = true;

    } else {
      console.log('desktop detected')
      this.potrait_val = true;
    }


    this.callApi();
    //////Initaial function with basic variable definitions  - ends//////
  }
  id: any;
  // getleaderscore = new getleaderscore();
  callApi() {
    //////function for getting scores and other user details  - starts//////
    this.getleaderscore.uid = localStorage.getItem("uid");
    this.getleaderscore.section_id = localStorage.getItem('Section_id_val');
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.getleaderscore.timestamp = date_val.toString();
    this.getleaderscore.hashcode = hash_val;

    this.reportService.getleaderscoredetails(this.getleaderscore).subscribe(
      (res) => {
        this.id = JSON.parse(JSON.stringify(res));
        console.log(this.id)
        if (this.id.code == "SA000") {
          try {
            this.ngxService.stopLoader('loader-lb');
            this.countsession = setInterval(() => { this.stopnewload(); }, 400);
          }
          catch {

          }

          if (this.id.leaderscore.length > 0) {
            this.isleader = true;

            var i = 0;
            for (i = 0; i < this.id.leaderscore.length; i++) {
              this.list[i] = i;
              this.bspiArr[i] = this.id.leaderscore[i].bspi;
              this.nameArr[i] = this.id.leaderscore[i].name;
              this.gradeArr[i] = this.id.leaderscore[i].grade;
              this.SchoolArr[i] = 'skillangels';
              this.imageurl[i] = '../assets/images/Gallery/' + parseInt(this.id.leaderscore[i].profile) + '.png';
              if (i < 3) {
                this.toplistArr[i] = true;
              }
            }
            this.cnt_val = 0;
            this.cnt_val1 = 0;
            for (i = 0; i < this.list.length; i++) {
              if (this.bspiArr[i] == this.bspiArr[0]) {
                this.cnt_val = this.cnt_val + 1;
                this.cnt_val1 = this.cnt_val1 + 1;
                this.mycolor[i] = this.colorArr[0];
              }
              else if (this.bspiArr[i] == this.bspiArr[this.cnt_val]) {
                this.cnt_val1 = this.cnt_val1 + 1;
                this.mycolor[i] = this.colorArr[1];
              }
              else if (this.bspiArr[i] == this.bspiArr[this.cnt_val1]) {
                this.mycolor[i] = this.colorArr[2];
              }
              else {
                this.mycolor[i] = this.colorArr[3];
              }
            }
          }
          else {
            this.isleader = false;
          }
        }
        else {
          console.log(this.id.code);

          if (this.id.code == 'SA1215') {
            this.isleader = false;
            try {
              this.ngxService.stopLoader('loader-lb');
              this.countsession = setInterval(() => { this.stopnewload(); }, 400);
            }
            catch {

            }
          }

        }
      });
  }
  //////function for getting scores and other user details  - ends//////
   ///////////////back////////////
   isRoadMap:boolean=false;
   backFn() {
     this.isRoadMap = true;
   }
}

