import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { DashboardAPIService } from '.././services/dashboard/dashboard-api.service';
import { scoreData, dashData, assessData, dashDatacrowny, getisfullschudle } from '.././services/dashboard/dashAPI';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ThemeService } from '../services/profile/theme.service'
import { LocaldatastorageService } from '../localdatastorage.service';
import { LanguageService } from '../services/profile/language.service'
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { IpService } from '../services/ip/ip.service';
import { DatasharingServiceService } from "../services/ip/datasharing-service.service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  //////theme variables//////
  colortheme = ['black', 'white'];
  colortheme_bg;
  colortheme_txt;
  //////login variables declaration//////
  styleArr_listheading = [null, '13px', null, null, null];
  style_listheading;
  styleArr_skillprogress = [null, '13px', null, null, null];
  style_skillprogress;
  @ViewChild('content', { static: false }) content;
  isfullschudle = 1;
  year_status = 1;
  closeResult: string;
  uid: string;
  eventid: number;
  getisfullschudle = new getisfullschudle();
  scoreData = new scoreData();
  dashData = new dashData();
  assessData = new assessData();
  dashDatacrowny = new dashDatacrowny();
  title = 'ng-calendar-demo';
  selectedDate = new Date();
  onlyDate: string;
  onlyDatepar: string;
  year: any;

  temp1: string;
  DayAndDate: string;
  public canvasWidth;
  public centralLabel = ''
  public name = '';
  chartWidth: any = 400;
  needleValue: any = 0;

  options: any;
  countDownTimer;
  firstlogin: boolean;
  secondlogin: boolean;
  thirdlogin: boolean;
  username: string;
  justlogged: string;
  popupval = 0;
  //response variables
  response: any;
  response1: any;
  response2: any;
  response3: any;
  //dash box datum
  rank: number;
  curr_assess: number;
  crowny: number;
  prebspi: number;
  //progressbar datum
  memscore: number = 0;
  vpscore: number = 0;
  fascore: number = 0;
  psscore: number = 0;
  lingscore: number = 0;
  //gauge chart related
  quesAttempted: number = 0;
  quesSolved: number = 0;
  minTrained: number = 0;
  todayCrowny: number = 0;
  mybspi: number = 0;
  prevcrowny: number;
  crownyToShow: number;

  elements: any = [];
  headElements = [];
  dashWords: any;
  assessWords: any;
  colorVal: any;
  element: any;
  themechange: any;

  constructor(private dataSharingService: DatasharingServiceService,
    private ip: IpService, private DashboardAPIService_ts: DashboardAPIService, private datePipe: DatePipe, private theme: ThemeService,
    private localDataStorageService: LocaldatastorageService, private ngxService: NgxUiLoaderService,
    private lang: LanguageService, private modalService: NgbModal, private dialog: MatDialog, private router: Router) {

  }

  countsession;
  load1;
  stopnewload() {
    clearInterval(this.countsession);
    this.load1 = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.dataSharingService.isdash_gauge.next(1);
      }
  @ViewChild('updatecrowny', { static: false }) input: ElementRef<any>;
  ngAfterViewInit() {
    //excute after html loading/////
    if (this.justlogged == "0") {
      this.openModal();
      localStorage.setItem("justlogged", "1");
    }
    this.display = this.input.nativeElement;
  }

  openModal() {
    // this.modalService.open(this.content, { centered: true, backdrop: 'static' });
  }



  onSelect(type: string, event: MatDatepickerInputEvent<Date>) {
    //////date picker function starts//////
    this.load1 = true;
    this.ngxService.startLoader('loader-db');
    this.selectedDate = event.value;
    const dateString = this.selectedDate.toDateString();
    this.onlyDate = this.datePipe.transform(new Date(dateString), "yyyy-MM-dd");
    console.log("this.onlyDate" + this.onlyDate)
    this.getScoreData(2);
    //////date picker function ends//////
  }

  ngOnDestroy() {
  }

  ngOnInit() {

    //////Initial loader function starts//////
    if (localStorage.getItem("uid") == "" || localStorage.getItem("uid") == null) {
      this.router.navigateByUrl('/login');
    }
    this.colortheme_bg = this.colortheme[parseInt(localStorage.getItem("isdark"))];
    if (parseInt(localStorage.getItem("isdark")) == 0) {
      this.colortheme_txt = this.colortheme[1];
    }
    else {
      this.colortheme_txt = this.colortheme[0];
    }
    if (parseInt(localStorage.getItem("curr_assess_login")) == 0) {
      this.router.navigateByUrl('/login');
    }


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

    this.justlogged = localStorage.getItem("justlogged");


    this.username = localStorage.getItem("username");
    var logcnt = localStorage.getItem("logincount");
    if (logcnt == "1") {
      this.firstlogin = true;
      this.secondlogin = false;
      this.thirdlogin = false;
    } else if (logcnt == "2") {
      this.firstlogin = false;
      this.secondlogin = true;
      this.thirdlogin = false;
    } else {
      this.thirdlogin = true;
      this.firstlogin = false;
      this.secondlogin = false;
    }
    this.dashWords = JSON.parse(localStorage.getItem('langwords') || '[]');


    this.style_listheading = this.styleArr_listheading[parseInt(localStorage.getItem('currentlangNo')) - 1];
    this.style_skillprogress = this.styleArr_skillprogress[parseInt(localStorage.getItem('currentlangNo')) - 1];



    this.selectedDate = new Date();
    const dateString = this.selectedDate.toDateString();
    this.onlyDate = this.datePipe.transform(new Date(dateString), "yyyy-MM-dd");
    this.onlyDatepar = this.datePipe.transform(new Date(dateString), "yyyy-MM-dd");
    this.uid = localStorage.getItem("uid");
    this.eventid = parseInt(localStorage.getItem("eid"));
    console.log("this is uid " + this.uid);
    this.headElements = [this.dashWords[6], this.dashWords[7], "BSPI", this.dashWords[125]]

    this.assessWords = [this.dashWords[2], this.dashWords[40], this.dashWords[41] + " - C1", this.dashWords[41] + " - C2", this.dashWords[45]];
    this.load1 = true;
    this.ngxService.startLoader('loader-db');
    this.getDashData();
    this.element = document.querySelector('.headrow ')
    console.log(this.element + " : theme change");

    this.colorVal = getComputedStyle(this.element).getPropertyValue('color');
    this.options = {
      hasNeedle: true,
      needleColor: this.colortheme_txt,
      needleStartValue: 50,
      arcColors: ["#c02127", "#f36723", "#fdc012", "#95c954"],
      arcDelimiters: [25, 50, 75],
      rangeLabel: ["0", "100"],
    };

    //////Initial loader function ends//////
  }
  curr_assess_dash: string;
  dashpopclose() {
    console.log("dashpopup close");
  }
  getDashData() {
    //////function for getting score,rank and bspi  - starts//////
    this.dashData.uid = this.uid;
    this.dashData.eid = this.eventid;
    this.dashData.section_id = localStorage.getItem('Section_id_val');
    this.dashData.branch_id = localStorage.getItem('Branch_id_val');
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.dashData.timestamp = date_val.toString();
    this.dashData.hashcode = hash_val;

    this.DashboardAPIService_ts.getDashDetails(this.dashData)
      .subscribe(
        res => {
          this.response = JSON.parse(JSON.stringify(res));
          console.log("this.response");
          console.log(this.response);
          this.getScoreData(1);
          if (this.response.code == "SA000") {
            if (this.response.result.length == 0) {
              this.crowny = 0;
              this.rank = 0;
              this.prebspi = 0.00;
            } else {
              this.crowny = this.response.result[0].totalcrowny;
              this.rank = this.response.rank;
              this.prebspi = this.response.result[0].totalscore / 5;
            }
            this.curr_assess = this.response.curr_assess;
            if (this.curr_assess.toString() == "Initial Assessment") {
              this.curr_assess_dash = this.dashWords[2]
            } else if (this.curr_assess.toString() == "Detailed Assessment") {
              this.curr_assess_dash = this.dashWords[40]
            } else if (this.curr_assess.toString() == "Personalized Training C1") {
              this.curr_assess_dash = this.dashWords[3] + " - C1"
            } else if (this.curr_assess.toString() == "Personalized Training C2") {
              this.curr_assess_dash = this.dashWords[3] + " - C2"
            } else if (this.curr_assess.toString() == "HOTS") {
              this.curr_assess_dash = "HOTS"
            } else if (this.curr_assess.toString() == "SBC") {
              this.curr_assess_dash = "SBC"
            } else if (this.curr_assess.toString() == "Post Assessment") {
              this.curr_assess_dash = this.dashWords[45]
            } else if (this.curr_assess.toString() == "Daily Puzzles") {
              this.curr_assess_dash = this.dashWords[120]
            }

          } else {
            if (this.response.code == "SA1061" ||
              this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
              localStorage.clear();
              this.router.navigateByUrl("/login");
            }
          }
        })
    //////function for getting score,rank and bspi  - starts//////
  }


  getScoreData(fromtype) {
    //////function for getting score of current day - starts//////
    this.scoreData.uid = this.uid;
    this.scoreData.eid = this.eventid;
    this.scoreData.year_status = this.year_status;
    this.scoreData.selDate = this.onlyDate;
    console.log("sc oreDatathis.onlyDate" + this.onlyDate);
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.scoreData.timestamp = date_val.toString();
    this.scoreData.hashcode = hash_val;

    this.DashboardAPIService_ts.dateBasedScores(this.scoreData)
      .subscribe(
        res => {
          this.response1 = JSON.parse(JSON.stringify(res));
          console.log(this.response1);
          if (fromtype == 1) {
            this.getAssessData();
          }
          if (this.response1.code == "SA000") {
            if (this.response1.todaysPlayVal == 0) {
              this.memscore = 0; this.vpscore = 0; this.fascore = 0; this.psscore = 0; this.lingscore = 0;
              this.mybspi = 0.00;
              this.quesAttempted = 0; this.quesSolved = 0; this.minTrained = 0;
            }
            else {
              console.log(this.response1.todaysPlayVal);
              console.log(this.response1.dailyscoredata);
              this.memscore = 0; this.vpscore = 0; this.fascore = 0; this.psscore = 0; this.lingscore = 0;
              this.mybspi = 0.00;
              this.quesAttempted = 0; this.quesSolved = 0; this.minTrained = 0;
              for (var i = 0; i < this.response1.dailyscoredata.length; i++) {
                this.quesAttempted = this.quesAttempted + Number(this.response1.dailyscoredata[i].ansquescnt);
                this.quesSolved = this.quesSolved + Number(this.response1.dailyscoredata[i].correctcnt);
                this.minTrained = this.minTrained + Number(this.response1.dailyscoredata[i].responsetime);
                this.mybspi = this.mybspi + Number(this.response1.dailyscoredata[i].avgscore);
                if (this.response1.dailyscoredata[i].skillid == 1)
                  this.memscore = this.response1.dailyscoredata[i].avgscore;
                else if (this.response1.dailyscoredata[i].skillid == 2)
                  this.vpscore = this.response1.dailyscoredata[i].avgscore;
                else if (this.response1.dailyscoredata[i].skillid == 3)
                  this.fascore = this.response1.dailyscoredata[i].avgscore;
                else if (this.response1.dailyscoredata[i].skillid == 4)
                  this.psscore = this.response1.dailyscoredata[i].avgscore;
                else if (this.response1.dailyscoredata[i].skillid == 5)
                  this.lingscore = this.response1.dailyscoredata[i].avgscore;

              }
              this.mybspi = this.mybspi / 5;
              // this.mybspi = Math.round(this.mybspi / 5);
            }


            this.needleValue = this.mybspi;
            localStorage.setItem("dash_needleValue", this.mybspi.toString())
            this.dataSharingService.isdash_gauge.next(1);
            if (fromtype == 2) {
              this.ngxService.stopLoader('loader-db');
              this.countsession = setInterval(() => { this.stopnewload(); }, 400);
            }
          } else {
            if (this.response1.code == "SA1061" ||
              this.response1.code == "SA1041" || this.response1.code == "SA1040" || this.response1.code == "SA1039") {
              localStorage.clear();
              this.router.navigateByUrl("/login");
            }
          }
        })
    //////function for getting score of current day - ends//////
  }

  getAssessData() {
    //////function for getting overall score - starts//////
    this.assessData.uid = this.uid;
    this.assessData.eid = this.eventid;


    this.getisfullschudle.uid = this.uid;
    this.getisfullschudle.year_status = this.year_status;
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
            this.assessWords = [this.dashWords[2], this.dashWords[40], this.dashWords[45]];
          }
          else {
            this.assessWords = [];
            this.assessWords = [this.dashWords[2], this.dashWords[40], this.dashWords[41] + " - C1", this.dashWords[41] + " - C2", this.dashWords[45]];
          }
          let date_val1: Date;
          date_val1 = new Date();
          let hash_val1 = this.ip.gethash(date_val1);
          this.assessData.timestamp = date_val1.toString();
          this.assessData.hashcode = hash_val1;
          this.DashboardAPIService_ts.assessmentBasedscores(this.assessData)
            .subscribe(
              res1 => {
                this.response2 = JSON.parse(JSON.stringify(res1));
                console.log(this.response2);
                this.getCrownyData();
                this.elements = [];

                if (this.response2.code == "SA000") {
                  for (let i = 0; i < this.response2.result.length; i++) {
                    if (this.response2.result.length == 0) {
                      this.elements.push({
                        assesstype: this.assessWords[i],
                        score: 0,
                        bspi: 0,
                        star: 0
                      });
                    }
                    else {
                      if (i < this.response2.result.length) {
                        this.elements.push({
                          assesstype: this.assessWords[parseInt(this.response2.result[i].assessnum) - 1],
                          score: this.response2.result[i]['assessscore'],
                          bspi: this.response2.result[i]['assessbspi'],
                          star: this.response2.result[i]['assessstar'],
                        });
                      } else {
                        this.elements.push({
                          assesstype: this.assessWords[parseInt(this.response2.result[i].assessnum) - 1],
                          score: 0,
                          bspi: 0,
                          star: 0
                        });
                      }
                    }
                  }
                } else {
                  if (this.response.code == "SA1061" ||
                    this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
                    localStorage.clear();
                    this.router.navigateByUrl("/login");
                  }
                }
              })

        }
        else {
          if (this.response2.code == "SA1061" ||
            this.response2.code == "SA1041" || this.response2.code == "SA1040" || this.response2.code == "SA1039") {
            localStorage.clear();
            this.router.navigateByUrl("/login");
          }
        }
      })
    //////function for getting overall score - starts//////

  }

  getCrownyData() {
    //////function for getting overall crownies and current day crownies - starts//////
    this.dashDatacrowny.uid = this.uid;
    this.dashDatacrowny.year_status = this.year_status;
    this.dashDatacrowny.selDate = this.onlyDatepar;
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.dashDatacrowny.timestamp = date_val.toString();
    this.dashDatacrowny.hashcode = hash_val;

    this.DashboardAPIService_ts.crownyDetails(this.dashDatacrowny)
      .subscribe(
        res => {

          this.response3 = JSON.parse(JSON.stringify(res));

          if (this.response3.code == "SA000") {

            if (this.response3.addedcrowny.length > 0) {
              if (this.response3.addedcrowny[0].addedcrowny == null)
                this.todayCrowny = 0;
              else
                this.todayCrowny = this.response3.addedcrowny[0].addedcrowny;

            }
            else {
              this.todayCrowny = 0;
            }

            try {
              this.ngxService.stopLoader('loader-db');
              this.countsession = setInterval(() => { this.stopnewload(); }, 400);
              this.justlogged = localStorage.getItem("justlogged");
              if (this.justlogged == "1") {
                this.crownyToShow = this.crowny;
                localStorage.setItem("justlogged", "2");
                localStorage.setItem("prevcrowny", this.crowny.toString())
              } else {
                this.prevcrowny = parseInt(localStorage.getItem("prevcrowny"));
                if (this.prevcrowny != this.crowny) {
                  this.crownyToShow = this.prevcrowny;
                  this.initializeTimer();
                } else {
                  this.crownyToShow = this.crowny;
                }
              }
            }
            catch {
            }
          } else {
            if (this.response3.code == "SA1061" ||
              this.response3.code == "SA1041" || this.response3.code == "SA1040" || this.response3.code == "SA1039") {
              localStorage.clear();
              this.router.navigateByUrl("/login");
            }
            try {
              this.ngxService.stopLoader('loader-db');
              this.countsession = setInterval(() => { this.stopnewload(); }, 400);
            }
            catch {
            }
          }
        })
    //////function for getting overall crownies and current day crownies - ends//////
  }

  initializeTimer() {
    //////function for getting animating crownies value - starts//////
    this.countDownTimer = setInterval(() => {
      this.initializeCrownyrun();
    }, 1000);
  }
  display: any;
  initializeCrownyrun() {
    console.log("Now entering intialize crowny run")
    clearInterval(this.countDownTimer);
    const startcnt = this.prevcrowny;
    this.crownyRun(this.display, startcnt);

  }

  crownyRun(display, startcnt) {
    this.countDownTimer = setInterval(() => {
      if (startcnt != this.crowny) {
        startcnt++;
        display.textContent = startcnt;
      }
      else {
        clearInterval(this.countDownTimer);
      }
    }, 75);
    localStorage.setItem("prevcrowny", this.crowny.toString())
  }
  //////function for getting animating crownies value - ends//////
}


