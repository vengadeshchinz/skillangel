import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardAPIService } from '.././services/dashboard/dashboard-api.service';
import { getisfullschudle } from '.././services/dashboard/dashAPI';
import { getassstar } from './../services/trophies/trophies';
import { TrophiesService } from './../services/trophies/trophies.service';
import { LocaldatastorageService } from './../localdatastorage.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { IpService } from '../services/ip/ip.service';
import { getleaderscore } from '../services/report/report';
import { ReportService } from '../services/report/report.service';
@Component({
  selector: 'app-trophies',
  templateUrl: './trophies.component.html',
  styleUrls: ['./trophies.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class TrophiesComponent implements OnInit {
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
  //////trophies score variables//////
  @ViewChild('Trophies', { static: false }) Trophies;
  getisfullschudle = new getisfullschudle();
  response2: any;
  isfullschudle = 1;
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;
  i; j; k;
  id: any;
  trophiesTypeCnt = 3;
  skillTypeCnt = 5;
  MaxTrophyCnt = 25; //  (max 5 trophy for each assessment (5 for 5 skills) *  5 total assessment cnt)=25 
  htmlForArr = [];
  trophycntval = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  getassstar = new getassstar();
  ass_num_arr = []; ass_cycle_cnt_arr = [];
  ass_star_arr = [[], [], [], [], []];
  overallcntArr = [0, 0, 0];
  overallGoldPercent = "0%";
  overallSilverPercent = "0%";
  overallBronzePercent = "0%";
  trophyWords: any;
  langtype = ["en", "ta", "tlg", "arb"];
  lngVal = 1;
  assessWords: any;


  //////leaderboard score variables//////
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

  constructor(private reportService: ReportService,
    private ip: IpService, private DashboardAPIService_ts: DashboardAPIService, private NgbModalConfig_ts: NgbModalConfig, private modalService: NgbModal, private ngxService: NgxUiLoaderService,
    private LocaldatastorageService_ts: LocaldatastorageService, private TrophiesService_ts: TrophiesService,
    private router: Router) {
    NgbModalConfig_ts.backdrop = 'static';
    NgbModalConfig_ts.keyboard = false;
  }
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
    //////Initaial function with basic variable definitions  - starts//////
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };

    this.myParams = {
      particles: {
        number: {
          value: 200,
        },
        color: {
          value: '#ffbc24'
        },
        shape: {
          type: 'star',
        },
      }
    };




    localStorage.setItem("year_status", (1).toString());
    if (localStorage.getItem("uid") == "" || localStorage.getItem("uid") == null) {
      this.router.navigateByUrl('/login');
    }
    if (parseInt(localStorage.getItem("curr_assess_login")) == 1) {
      this.router.navigateByUrl('/login');
    }
    this.colortheme_bg = this.colortheme[parseInt(localStorage.getItem("isdark"))];
    this.colortheme_bg_base = this.colortheme_base[parseInt(localStorage.getItem("isdark"))];
    this.colortheme_bg_base_sec = this.colortheme_base_sec[parseInt(localStorage.getItem("isdark"))];
    this.colortheme_txt1 = this.colortheme_txt1_Arr[parseInt(localStorage.getItem("isdark"))];
    if (parseInt(localStorage.getItem("isdark")) == 0) {
      this.colortheme_txt = this.colortheme[1];
    }
    else {
      this.colortheme_txt = this.colortheme[0];
    }
    this.load1 = true;
    this.ngxService.startLoader('loader-trophies');
    //////function for getting trophies score//////
    this.trophyWords = JSON.parse(localStorage.getItem('langwords') || '[]');
    this.assessWords = [this.trophyWords[40], this.trophyWords[41] + " - C1", this.trophyWords[41] + " - C2", this.trophyWords[45]];
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
    this.getassstar.uid = localStorage.getItem("uid");
    this.getassstar.eid = Number(localStorage.getItem("eid"));
    this.getassstar.year_status = Number(localStorage.getItem("year_status"));
    if (this.getassstar.uid != null && this.getassstar.eid != null) {

      this.getisfullschudle.uid = localStorage.getItem("uid");
      this.getisfullschudle.year_status = Number(localStorage.getItem("year_status"));
      let date_val: Date;
      date_val = new Date();
      let hash_val = this.ip.gethash(date_val);
      this.getisfullschudle.timestamp = date_val.toString();
      this.getisfullschudle.hashcode = hash_val;

      this.DashboardAPIService_ts.getisfullschudleDetails(this.getisfullschudle).subscribe(
        res => {
          this.response2 = JSON.parse(JSON.stringify(res));

          if (this.response2.code == "SA000") {

            this.isfullschudle = this.response2.isfullschudle[0].isfullschudle;
            if (this.isfullschudle == 0) {
              this.assessWords = [];
              this.assessWords = [this.trophyWords[40], this.trophyWords[45]];
            }
            else {
              this.assessWords = [];
              this.assessWords = [this.trophyWords[40], this.trophyWords[41] + " - C1", this.trophyWords[41] + " - C2", this.trophyWords[45]];
            }

            let date_val1: Date;
            date_val1 = new Date();
            let hash_val1 = this.ip.gethash(date_val1);
            this.getassstar.timestamp = date_val1.toString();
            this.getassstar.hashcode = hash_val1;

            this.TrophiesService_ts.getassstarDetails(this.getassstar)
              .subscribe(
                res1 => {
                  this.id = JSON.parse(JSON.stringify(res1));
                  if (this.id.code == "SA000") {
                    console.log(this.id);
                    if (this.id.getassstar.length > 1) {
                      let lenthval = 0;
                      if (this.id.getassstar.length == 5) {
                        lenthval = Number(this.id.getassstar.length) - 1;
                      }
                      else {
                        console.log("lenthval");
                        lenthval = Number(this.id.getassstar.length) - 1;
                      }
                      for (this.i = 0; this.i < lenthval; this.i++) {
                        this.htmlForArr[this.i] = this.i;
                      }
                      for (this.i = 1; this.i < (lenthval + 1); this.i++) {

                        this.ass_num_arr[this.i - 1] = this.id.getassstar[this.i].countval;
                        this.ass_cycle_cnt_arr[this.i - 1] = this.id.getassstar[this.i].ass_status_id;
                        for (this.j = 0; this.j < this.skillTypeCnt; this.j++) {
                          if (this.j == 0) {
                            this.ass_star_arr[this.j][this.i - 1] = this.id.getassstar[this.i].ass_m_starcnt;
                          }
                          else if (this.j == 1) {
                            this.ass_star_arr[this.j][this.i - 1] = this.id.getassstar[this.i].ass_v_starcnt;
                          }
                          else if (this.j == 2) {
                            this.ass_star_arr[this.j][this.i - 1] = this.id.getassstar[this.i].ass_f_starcnt;
                          }
                          else if (this.j == 3) {
                            this.ass_star_arr[this.j][this.i - 1] = this.id.getassstar[this.i].ass_p_starcnt;
                          }
                          else if (this.j == 4) {
                            this.ass_star_arr[this.j][this.i - 1] = this.id.getassstar[this.i].ass_l_starcnt;
                          }
                        }
                      }
                      this.tropycalculationfn();
                    }
                    else {
                      console.log("play the game to win trophy");
                      this.htmlForArr[0] = 0;
                      try {
                        this.ngxService.stopLoader('loader-trophies');
                        this.countsession = setInterval(() => { this.stopnewload(); }, 400);
                       // this.callApi();
                        // this.ngxService.stopLoader('loader-trophies');
                        // this.countsession = setInterval(() => { this.stopnewload(); }, 400);
                      }
                      catch {
                      }
                    }
                  }
                  else {
                    console.log("error");
                    console.log(this.id.code);
                    if (this.id.code == "SA1061" ||
                      this.id.code == "SA1041" || this.id.code == "SA1040" || this.id.code == "SA1039") {
                      localStorage.clear();
                      this.router.navigateByUrl("/login");
                    }
                  }
                })
          }
          else {
            console.log(this.response2.code);
            if (this.response2.code == "SA1061" ||
              this.response2.code == "SA1041" || this.response2.code == "SA1040" || this.response2.code == "SA1039") {
              localStorage.clear();
              this.router.navigateByUrl("/login");
            }
          }
        })
    }
    else {
      this.router.navigate(['./menu']);
    }
    //////Initaial function with basic variable definitions  - ends//////
  }
  public tropycalculationfn() {
    //////function for calculating trophies- starts//////
    console.log(this.ass_num_arr.length)
    for (this.i = 0; this.i < this.ass_num_arr.length; this.i++) {
      if (this.i != 3) {
        for (this.j = 0; this.j < this.skillTypeCnt; this.j++) {
          if (this.ass_star_arr[this.j][this.i] > 9 && this.ass_star_arr[this.j][this.i] < 20) {
            this.trophycntval[this.i][2] = this.trophycntval[this.i][2] + 1; //bronze
          }
          else if (this.ass_star_arr[this.j][this.i] >= 20 && this.ass_star_arr[this.j][this.i] < 30) {
            this.trophycntval[this.i][1] = this.trophycntval[this.i][1] + 1; //silver
          }
          else if (this.ass_star_arr[this.j][this.i] >= 30 && this.ass_star_arr[this.j][this.i] <= 40) {
            this.trophycntval[this.i][0] = this.trophycntval[this.i][0] + 1; //gold
          }
        }
      }
    }
    console.log(this.trophycntval);
    for (this.i = 0; this.i < this.ass_num_arr.length; this.i++) {
      if (this.i != 3) {
        this.overallcntArr[0] = this.overallcntArr[0] + this.trophycntval[this.i][0];  //gold
        this.overallcntArr[1] = this.overallcntArr[1] + this.trophycntval[this.i][1];  //silver
        this.overallcntArr[2] = this.overallcntArr[2] + this.trophycntval[this.i][2];  //bronze
      }
    }
    try {
      this.ngxService.stopLoader('loader-trophies');
      this.countsession = setInterval(() => { this.stopnewload(); }, 400);
      //this.callApi();
      // this.ngxService.stopLoader('loader-trophies');
      // this.countsession = setInterval(() => { this.stopnewload(); }, 400);
    }
    catch {
    }
    //////function for calculating trophies- ends//////
  }
  public TrophiesFn() {
    //////function for trophies info popup open//////
    this.modalService.open(this.Trophies, { centered: true });
  }
  ///////////////back////////////
  isRoadMap:boolean=false;
  backFn() {
    this.isRoadMap = true;
  }
}
