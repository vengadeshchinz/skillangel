import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { formatDate } from '@angular/common';
import { Router } from "@angular/router";
import {
  trigger,
  transition,
  animate,
  style
} from "@angular/animations";
import {
  getgame,
  getScore,
  getTrophy,
  getquescnt,
  getsnd,
  getgamec2,
  getorggame,
  getass2trainchk,
  getDaChk,
  pgmstatus

} from ".././services/puzzles/puzzlesquery";
import { url } from ".././services/baseurl";
import { LocaldatastorageService } from "../localdatastorage.service";
import { PuzzlesqueryService } from "../services/puzzles/puzzlesquery.service";
import { NgbTooltipConfig } from "@ng-bootstrap/ng-bootstrap";
import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService
import { TimerService } from "../services/menu/timer.service";
import { PuzzleService } from "../services/puzzles/puzzle.service";
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { IpService } from '../services/ip/ip.service';
import shuffle from 'shuffle-array';
import { DashboardAPIService } from '.././services/dashboard/dashboard-api.service';
import { dashData } from '.././services/dashboard/dashAPI';

@Component({
  selector: "app-puzzles",
  templateUrl: "./puzzles.component.html",
  styleUrls: ["./puzzles.component.scss"],
  animations: [
    trigger("slideInOut", [
      transition(":enter", [
        style({ transform: "translateY(-100%)" }),
        animate("200ms ease-in", style({ transform: "translateY(0%)" }))
      ]),
      transition(":leave", [
        animate("200ms ease-in", style({ transform: "translateY(-100%)" }))
      ])
    ])
  ],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class PuzzlesComponent implements OnInit {
  collection = [];
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
  //////puzzles variables//////
  pgmstatus = new pgmstatus();
  styleArr_Vpheadingfont = [null, '8px', null, null, null]; style_Vpheadingfont;
  styleArr_faheadingfont = [null, '8.8px', '14px', null, null]; style_faheadingfont;
  styleArr_psheadingfont = [null, '14.5px', null, null, null]; style_psheadingfont;
  stopPlayingMsg = "";
  showcontentpopup = 0;
  getDaChkStatus = false;
  getDaChk = new getDaChk();
  g_formateddate = "";
  g_dbdateval = "";
  myinterval = null;
  popval: boolean;
  datevar = "";
  enddateval: Date;
  enddateval1 = 0;
  popstar = true;

  event_val = 0;
  event_heading = ["Super Brain challenge1", "Super Brain challenge2",
    "Higher Order Thinking Skills", "Carrier Improvement Program"];
  event_heading_srt = ["SBC1", "SBC2",
    "HOTS", "CIP"];
  event_msg = ["Congratulations! You have unlocked the Super Brain Challenge! Click on the link below to take part in this exciting contest!",
    "Congratulations! You have unlocked the Super Brain Challenge! Click on the link below to take part in this exciting contest!",
    "Congratulations! You have unlocked the HOTS Olympiad! Click on the link below to take part in this exciting contest!",
    "Congratulations! You have unlocked the Carrier Improvement Program (CIP)!  Click on the link below to take part in this exciting contest!"
  ];
  event_nm = ["SBC1", "SBC2", "HOTS", "CIP"];
  event_url = ["https://www.schools.skillangels.com", "https://www.schools.skillangels.com"
    , "https://www.schools.skillangels.com", "https://www.schools.skillangels.com"]
  con_val = true;
  @ViewChild('newinfo', { static: false }) newinfo;
  @ViewChild('puzzlecontent', { static: false }) puzzlecontent;
  @ViewChild('puzzlesmsg', { static: false }) puzzlesmsg;
  fullsessionchk = 0;
  openmodel = 0;
  popmsgArr = [];
  greetingmsgArr = [];
  @ViewChild('puzzlesinfo', { static: false }) puzzlesinfo;
  @ViewChild('crownies_pop', { static: false }) crownies_pop;

  istrainingdata = 0;
  getass2trainchk = new getass2trainchk();
  MaxScoreArr = [];
  getorggame = new getorggame();
  getgamec2 = new getgamec2();
  hotSbcval = 1;
  assessWords = [];
  assname = "";
  sndval = 1;
  getsnd = new getsnd();
  gamename = "";
  setflag = 0;
  istimerchange: boolean;
  sessionTime = 120;
  state: string = "smaller";
  id: any;
  imgsrcArr = ["", "", "", "", ""];
  fiveGameComChk = 0;
  getTrophy = new getTrophy();
  getgame = new getgame();
  getScore = new getScore();
  getquescnt = new getquescnt();
  url = new url();
  gameurl = this.url.gameurl;
  angurl = this.url.puzzleurl;
  strikeStatus: boolean = false;
  strikethroughval = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ];
  startweenval = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ];
  tropyVal = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false]
  ];
  GameNameArr = [];
  GameSkillArr = [];
  GameIdArr = [];
  skillcnt = [];
  skillindex = [];
  questionCntTotalCount = [];
  l;
  i;
  j;
  k;
  gameid = 0;
  ScoreGameIdArr = [];
  SumOfScoreArr = [];
  GamePlayCountArr = [];
  GameskillidArr = [];
  ass_status = 0;
  starArr = [];
  playval = [false, false, false, false, false];
  TotalScore = 100;
  progressval = ["", "", "", "", ""];
  progressPrecent = [0, 0, 0, 0, 0];

  skillTypeCnt = 5;
  avg_Trophy_score_arr = [[], [], [], [], []]; //[[mem],[vp],[fa],[ps],[lin]]]
  avg_Trophy_score_arr_status1 = [];
  avg_Trophy_score_arr_status1_skillid = [];
  TotalCycleCnt = 0;
  TrophyStarArr = [0, 0, 0, 0, 0];
  gameQueryStatus = false;
  trophyQueryStatus = false;
  puzzleWords: any;
  langtype = ["en", "ta", "tlg", "arb"];
  lngVal = 1;
  playtxt = [];
  playtxtval = [];
  todayDate: Date;
  isHots: boolean;
  questionCntSkillArr = []
  isTrophyShow: boolean = true;///////doesn't show trophy-false
  isPuzzlePlay: boolean = true;///////doesn't show puzzle-false
  attemp_arr = [5, 5, 5, 5, 5];
  constructor(private DashboardAPIService_ts: DashboardAPIService,
    private ip: IpService,
    private NgbModalConfig_ts: NgbModalConfig, private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    config: NgbTooltipConfig,
    private router: Router,
    private LocaldatastorageService_ts: LocaldatastorageService,
    private PuzzlesqueryService_ts: PuzzlesqueryService,
    private PuzzleServ: PuzzleService,
    private timeserv: TimerService
  ) {
    this.state = this.state == "larger" ? "smaller" : "larger";
    config.placement = "top";
    config.triggers = "click";
  }
  puzzles: boolean = true;
troimgArr=['../assets/images/t0.png','../assets/images/t0.png','../assets/images/t0.png','../assets/images/t0.png','../assets/images/t0.png'];

  countsession;
  load1;
  stopnewload() {
    clearInterval(this.countsession);
    this.load1 = false;
  }
  public barChartLabels = ['Memory', 'VisualProcessing', 'Focus&Attention', 'ProblemSolving','Linguistics'];
  public barChartType: string = 'horizontalBar';
  public barChartLegend: boolean = false;
  barChartOptions: any;
  public barChartPlugins = [pluginDataLabels];
  public barChartData3: ChartDataSets[] = [
    {data: [0, 0, 0, 0, 0], label: 'Score'}
  ];
  public barChartColors: Color[] = [
    { backgroundColor: ['#F25858','#FFBE4B', '#97C865','#F1904E','#7ED0EE']}
  ]
  public canvasWidth: number;
  onResize(event) {
    //////function for getting screen size -start//////
    if (window.innerWidth > 1500) {
      this.canvasWidth = window.innerWidth / 5;
    } else if (window.innerWidth > 1000) {
      this.canvasWidth = window.innerWidth / 5;
    } else if (window.innerWidth > 500) {
      this.canvasWidth = window.innerWidth / 3;
    } else {
      this.canvasWidth = window.innerWidth / 2;
    }
    //////function for getting screen size -ends//////
  }
  potrait_val = true;
  skillVal=[];
  ngOnInit() {

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
    //////Initaial function with basic variable definitions  - starts//////
    localStorage.setItem("year_status", (1).toString());
    localStorage.setItem("puzzleReturnStatus", (0).toString());
    localStorage.setItem("sbcgamesstatus", "0");
    if (
      localStorage.getItem("uid") == "" ||
      localStorage.getItem("uid") == null
    ) {
      this.router.navigateByUrl("/login");
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

    this.g_formateddate = (formatDate(new Date(), 'dd-MM-yyyy', 'en-US')).toString()
    localStorage.setItem("mychkDashPopStatusgames", "0");
    localStorage.setItem("chkDashPopStatus", (0).toString());

    this.session_id = localStorage.getItem("session_id");
    if (parseInt(localStorage.getItem("curr_assess_login")) != 2) {
      this.isTrophyShow = false;
    }

    this.todayDate = new Date();
    this.timeserv.currenttimerchange.subscribe(timeChange => (this.istimerchange = timeChange));
    this.PuzzleServ.currenthots.subscribe(isHotsChange => (this.isHots = isHotsChange));
    this.PuzzleServ.currenthots1.subscribe(isPuzzleChange => (this.puzzles = isPuzzleChange));
    console.log("this.istimerchange" + this.istimerchange);

    this.load1 = true;
    this.ngxService.startLoader('loader-01');
    this.gameQueryStatus = false;
    this.trophyQueryStatus = false;
    this.puzzleWords = JSON.parse(localStorage.getItem("langwords") || "[]");
    console.log(this.puzzleWords);


    this.style_Vpheadingfont = this.styleArr_Vpheadingfont[parseInt(localStorage.getItem('currentlangNo')) - 1];
    this.style_faheadingfont = this.styleArr_faheadingfont[parseInt(localStorage.getItem('currentlangNo')) - 1];
    this.style_psheadingfont = this.styleArr_psheadingfont[parseInt(localStorage.getItem('currentlangNo')) - 1];
    this.popmsgArr = ['A new set of puzzles is ready for you to solve!',
      this.puzzleWords[168], this.puzzleWords[169], 'Please complete all the puzzles on the Puzzles page atleast once to start solving the Skillkit puzzles again.',
      this.puzzleWords[171], this.puzzleWords[172]]
    this.greetingmsgArr = ['Solve them all! You will receive the next set ',
      this.puzzleWords[174], this.puzzleWords[175],
      'Move to the Puzzles page to continue solving puzzles.', this.puzzleWords[177], this.puzzleWords[178]]

    this.playtxt = [
      this.puzzleWords[22],   //play
      this.puzzleWords[42],   //palyagain
      this.puzzleWords[43],   //completed
      this.puzzleWords[44],   //timeexpired
      this.puzzleWords[54],    //continue
      this.puzzleWords[123]    //locked
    ];
    this.assessWords = [this.puzzleWords[2], this.puzzleWords[40], this.puzzleWords[41] + " - C1",
    this.puzzleWords[41] + " - C2", this.puzzleWords[45], this.puzzleWords[120]];
    console.log(this.playtxt);
    for (this.i = 0; this.i < 5; this.i++) {
      this.playtxtval[this.i] = this.playtxt[0];
    }
    for (this.i = 0; this.i < 5; this.i++) {
      if (this.istimerchange == false) {
        console.log("this.istimerchange false")
      } else if (this.istimerchange == true) {
        this.playval[this.i] = true;
        this.playtxtval[this.i] = this.playtxt[3];
      }
    }
    ///////////////////////////////
    console.log("memory" + this.gameurl);
    console.log(this.angurl);

    console.log("year_status" + Number(localStorage.getItem("year_status")));
    this.getgame.uid = localStorage.getItem("uid");
    this.getgame.eid = Number(localStorage.getItem("eid"));
    this.getgame.year_status = Number(localStorage.getItem("year_status"));

    this.getScore.date = new Date();
    this.getScore.eid = Number(localStorage.getItem("eid"));
    this.getScore.uid = localStorage.getItem("uid");
    this.getScore.year_status = Number(localStorage.getItem("year_status"));

    this.getquescnt.date = new Date();
    this.getquescnt.eid = Number(localStorage.getItem("eid"));
    this.getquescnt.uid = localStorage.getItem("uid");
    this.getquescnt.year_status = Number(localStorage.getItem("year_status"));

    this.stopPlayingMsg = this.puzzleWords[73];

    if (parseInt(localStorage.getItem("curr_assess_login")) > 1 && parseInt(localStorage.getItem("curr_assess_login")) < 3) {
      this.stopPlayingMsg = this.puzzleWords[73];

    }
    else if (parseInt(localStorage.getItem("curr_assess_login")) > 2 && parseInt(localStorage.getItem("curr_assess_login")) < 6) {
      this.stopPlayingMsg = this.puzzleWords[179];
    }
    else if (parseInt(localStorage.getItem("curr_assess_login")) > 3) {
      this.stopPlayingMsg = this.puzzleWords[180];
    }

    this.isPuzzlePlay = true;

    this.barChartOptions = {
      scaleShowVerticalLines: true,
      responsive: true,
      scales: {
        xAxes: [
          {
            display: true,
            ticks: {
              beginAtZero: true,
              max: 100,
              fontSize: 13,
              fontColor: this.colortheme_txt
            },
            gridLines: { color: 'rgb(110, 110, 110)' }
          }
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              beginAtZero: true,
              max: 100,
              fontSize: 13,
              fontColor: this.colortheme_txt
            },
            gridLines: { color: 'rgb(110, 110, 110)' }
          }
        ],

      },
      plugins: {
        datalabels: {
          anchor: 'top',
          align: 'center',
          font: {
            size: 14
          },
          color: this.colortheme_txt
        }
      },
      legend: {
        position: 'bottom',
        labels: {
          fontSize: 8,
          fontColor: this.colortheme_txt
        },
      }
    };
    
    this.skillVal = [this.puzzleWords[13], 'VisualProcessing','Focus&Attention',
    'ProblemSolving', this.puzzleWords[17]];
    this.getGame();
    //////Initaial function with basic variable definitions  - ends//////

  }

  getGame() {
    //////function for getting IA,DA,PC1 games for first time - starts//////
    console.log("There is  puzzle  12")
    if (this.getgame.uid != null && this.getgame.eid != null && this.getgame.year_status != null) {
      let date_val: Date;
      date_val = new Date();
      let hash_val = this.ip.gethash(date_val);
      this.getgame.timestamp = date_val.toString();
      this.getgame.hashcode = hash_val;

      this.PuzzlesqueryService_ts.getgamedetails(this.getgame).subscribe(res => {
        this.id = JSON.parse(JSON.stringify(res));
        console.log("getgames");
        console.log(this.id);

        if (this.id.code == "SA000") {

          this.getgameFn();

        } else {

          console.log("getgamesc2");
          if (this.id.code == "SA226" || this.id.code == "SA230") {

            ///////////////////hots/////////////////////////
            if (this.hotSbcval == 0) {
              this.ngxService.stopLoader('loader-01');
              this.countsession = setInterval(() => { this.stopnewload(); }, 400);
              localStorage.setItem("ass_status", (4).toString());
              this.isHots = true;
              this.puzzles = false;
              this.PuzzleServ.changehots(this.isHots, this.puzzles)
            }
            else if (this.hotSbcval == 1) {
              //////function for getting pc2 & post games for first time  - starts//////
              this.getgamec2.uid = localStorage.getItem("uid");
              this.getgamec2.eid = Number(localStorage.getItem("eid"));
              this.getgamec2.ass_status_id = 2;
              this.getgamec2.year_status = Number(localStorage.getItem("year_status"));
              let date_val1: Date;
              date_val1 = new Date();
              let hash_val1 = this.ip.gethash(date_val1);
              this.getgamec2.timestamp = date_val1.toString();
              this.getgamec2.hashcode = hash_val1;

              this.PuzzlesqueryService_ts.getgamec2details(this.getgamec2).subscribe(res1 => {
                this.id = JSON.parse(JSON.stringify(res1));
                console.log("getgamesc2");
                console.log(this.id);

                if (this.id.code == "SA000") {
                  this.getgameFn();
                }
                else {
                  this.ngxService.stopLoader('loader-01');
                  this.countsession = setInterval(() => { this.stopnewload(); }, 400);
                  this.isPuzzlePlay = false;
                  if (this.id.code == "SA1061" ||
                    this.id.code == "SA1041" || this.id.code == "SA1040" || this.id.code == "SA1039") {
                    localStorage.clear();
                    this.router.navigateByUrl("/login");
                  }
                }
              })


              //////function for getting pc2 & post games for first time  - ends//////

            }
            //////////////////////////////////////////

          } else if (this.id.code == "SA247" || this.id.code == "SA251") {

            ///////////////////sbc/////////////////////////
            if (this.hotSbcval == 0) {
              this.ngxService.stopLoader('loader-01');
              this.countsession = setInterval(() => { this.stopnewload(); }, 400);
              localStorage.setItem("ass_status", (5).toString());
              localStorage.setItem("sbcgamesstatus", "1");
              this.router.navigate(["./login"]);
            }
            else if (this.hotSbcval == 1) {
              //////function for getting pc2 & post games for first time  - starts//////
              this.getgamec2.uid = localStorage.getItem("uid");
              this.getgamec2.eid = Number(localStorage.getItem("eid"));
              this.getgamec2.ass_status_id = 3;
              this.getgamec2.year_status = Number(localStorage.getItem("year_status"));
              let date_val2: Date;
              date_val2 = new Date();
              let hash_val2 = this.ip.gethash(date_val2);
              this.getgamec2.timestamp = date_val2.toString();
              this.getgamec2.hashcode = hash_val2;

              this.PuzzlesqueryService_ts.getgamec2details(this.getgamec2).subscribe(res2 => {
                this.id = JSON.parse(JSON.stringify(res2));
                console.log("getgamesc2");
                console.log(this.id);

                if (this.id.code == "SA000") {
                  this.getgameFn();
                }
                else {
                  this.ngxService.stopLoader('loader-01');
                  this.countsession = setInterval(() => { this.stopnewload(); }, 400);
                  this.isPuzzlePlay = false;
                  if (this.id.code == "SA1061" ||
                    this.id.code == "SA1041" || this.id.code == "SA1040" || this.id.code == "SA1039") {
                    localStorage.clear();
                    this.router.navigateByUrl("/login");
                  }
                }
              })
            }
            //////function for getting pc2 & post games for first time  - ends//////

          } else {
            this.ngxService.stopLoader('loader-01');
            this.countsession = setInterval(() => { this.stopnewload(); }, 400);
            this.isPuzzlePlay = false;
            if (this.id.code == "SA1061" ||
              this.id.code == "SA1041" || this.id.code == "SA1040" || this.id.code == "SA1039") {
              localStorage.clear();
              this.router.navigateByUrl("/login");
            }
          }
        }
      });
    } else {
      this.router.navigate(["./menu"]);
    }
    //////function for getting IA,DA,PC1 games for first time - ends//////
  }



  getgameFn() {
    //////function for locking over all puzzles page games - starts//////
    if (parseInt(localStorage.getItem("assessment_check")) == 0) {
      console.log("There is no puzzle");
      this.stopPlayingMsg = this.puzzleWords[181];
      this.isPuzzlePlay = false;
      this.ngxService.stopLoader('loader-01');
      this.countsession = setInterval(() => { this.stopnewload(); }, 400);
    } else if (parseInt(localStorage.getItem("curr_assess_login")) <= parseInt(localStorage.getItem("assessment_check"))) {
      this.stopPlayingMsg = this.puzzleWords[73];
      this.isPuzzlePlay = true;
      if (parseInt(localStorage.getItem("curr_assess_login")) > 1 && parseInt(localStorage.getItem("curr_assess_login")) < 3) {
        this.stopPlayingMsg = this.puzzleWords[73];

      }
      else if (parseInt(localStorage.getItem("curr_assess_login")) > 2 && parseInt(localStorage.getItem("curr_assess_login")) < 6) {
        this.stopPlayingMsg = this.puzzleWords[179];
      }
      else if (parseInt(localStorage.getItem("curr_assess_login")) > 3) {
        this.stopPlayingMsg = this.puzzleWords[180];
      }

      this.getgames3Fn();
      console.log("There is  puzzle  1")


    } else {
      if (this.id.ass_status < parseInt(localStorage.getItem("curr_assess_login"))) {
        console.log("There is  puzzle 1 onsameday")
        this.stopPlayingMsg = this.puzzleWords[73];
        this.isPuzzlePlay = true;
        if (parseInt(localStorage.getItem("curr_assess_login")) > 1 && parseInt(localStorage.getItem("curr_assess_login")) < 3) {
          this.stopPlayingMsg = this.puzzleWords[73];

        }
        else if (parseInt(localStorage.getItem("curr_assess_login")) > 2 && parseInt(localStorage.getItem("curr_assess_login")) < 6) {
          this.stopPlayingMsg = this.puzzleWords[179];
        }
        else if (parseInt(localStorage.getItem("curr_assess_login")) > 3) {
          this.stopPlayingMsg = this.puzzleWords[180];
        }
        this.getgames3Fn();
      }
      else {
        if (parseInt(localStorage.getItem("curr_assess_login")) > 1 && parseInt(localStorage.getItem("curr_assess_login")) < 3) {
          this.stopPlayingMsg = this.puzzleWords[73];

        }
        else if (parseInt(localStorage.getItem("curr_assess_login")) > 2 && parseInt(localStorage.getItem("curr_assess_login")) < 6) {
          this.stopPlayingMsg = this.puzzleWords[179];
        }
        else if (parseInt(localStorage.getItem("curr_assess_login")) > 3) {
          this.stopPlayingMsg = this.puzzleWords[180];
        }
        console.log("There is no puzzle  11")
        this.isPuzzlePlay = false;
        this.ngxService.stopLoader('loader-01');
        this.countsession = setInterval(() => { this.stopnewload(); }, 400);
      }
    }


    //////function for locking over all puzzles page games - ends//////


  }
  getgames3Fn() {
    //////function for checking games count - starts//////
    if (this.id.ass_status == 2 && this.id.mychkattempt == 1) {
      this.getgame2Fn();
    } else {
      if (this.id.gamedetails.length > 4) {
        this.getgame2Fn();
      }
      else {
        this.ngxService.stopLoader('loader-01');
        this.countsession = setInterval(() => { this.stopnewload(); }, 400);
        this.isPuzzlePlay = false;
      }
    }
  }
  getgame2Fn() {
    //////function for randomly selecting 5 game from over all grade games- starts//////
    console.log(this.id.gamedetails);
    console.log(this.id.ass_status);
    this.ass_status = this.id.ass_status;
    this.LocaldatastorageService_ts.setdata(
      "ass_status",
      this.ass_status.toString()
    );
    localStorage.setItem("ass_status", this.ass_status.toString());
    if (parseInt(localStorage.getItem("ass_status")) != 2) {
      this.isTrophyShow = false;

    }
    if (this.ass_status == 1) {
      this.assname = this.assessWords[0];
    }
    else if (this.ass_status == 3) {
      this.assname = this.assessWords[4];
    }
    else if (this.ass_status == 6) {
      this.assname = this.assessWords[5];
    }
    else if (this.ass_status == 2) {
      if (this.id.traincntval == 1) {
        this.assname = this.assessWords[1];
      }
      else if (this.id.traincntval == 2) {
        this.assname = this.assessWords[2];
      }
      else if (this.id.traincntval == 3) {
        this.assname = this.assessWords[3];
      }
    }
    if (this.ass_status == 2 && this.id.mychkattempt == 1) {

      for (this.i = 0; this.i < 5; this.i++) {
        if (this.i == 0) {
          this.GameNameArr[this.i] = this.id.gamedetails[0].mem_name;
          this.GameSkillArr[this.i] = 1;
          this.GameIdArr[this.i] = this.id.gamedetails[0].mem_game_id;
        }
        else if (this.i == 1) {
          this.GameNameArr[this.i] = this.id.gamedetails[0].vp_name;
          this.GameSkillArr[this.i] = 2;
          this.GameIdArr[this.i] = this.id.gamedetails[0].vp_game_id;
        }
        else if (this.i == 2) {
          this.GameNameArr[this.i] = this.id.gamedetails[0].fa_name;
          this.GameSkillArr[this.i] = 3;
          this.GameIdArr[this.i] = this.id.gamedetails[0].fa_game_id;
        }
        else if (this.i == 3) {
          this.GameNameArr[this.i] = this.id.gamedetails[0].ps_name;
          this.GameSkillArr[this.i] = 4;
          this.GameIdArr[this.i] = this.id.gamedetails[0].ps_game_id;
        }
        else if (this.i == 4) {
          this.GameNameArr[this.i] = this.id.gamedetails[0].lin_name;
          this.GameSkillArr[this.i] = 5;
          this.GameIdArr[this.i] = this.id.gamedetails[0].lin_game_id;
        }
      }
    } else {


      this.skillcnt = [0, 0, 0, 0, 0];
      if (this.id.gamedetails.length > 5) {
        for (let i = 0; i < this.id.gamedetails.length; i++) {
          if (this.id.gamedetails[i].skill_id == 1) {
            this.skillcnt[0]++;
          } else if (this.id.gamedetails[i].skill_id == 2) {
            this.skillcnt[1]++;
          } else if (this.id.gamedetails[i].skill_id == 3) {
            this.skillcnt[2]++;
          } else if (this.id.gamedetails[i].skill_id == 4) {
            this.skillcnt[3]++;
          } else if (this.id.gamedetails[i].skill_id == 5) {
            this.skillcnt[4]++;
          }
        }
      }

      for (let i = 0; i < 5; i++) {
        if (this.skillcnt[i] > 1) {
          this.skillindex.push(i);
        }
      }

      if (this.skillindex.length == 0) {
        for (this.i = 0; this.i < this.id.gamedetails.length; this.i++) {
          this.GameNameArr[this.i] = this.id.gamedetails[this.i].gamename;
          this.GameSkillArr[this.i] = this.id.gamedetails[this.i].skill_id;
          this.GameIdArr[this.i] = this.id.gamedetails[this.i].game_id;
        }
      } else {
        let chooseindex = 0;
        for (this.i = 0; this.i < 5; this.i++) {
          console.log("this is i  " + this.i)
          if (this.skillcnt[this.i] == 1) {
            this.GameNameArr[this.i] = this.id.gamedetails[chooseindex].gamename;
            this.GameSkillArr[this.i] = this.id.gamedetails[chooseindex].skill_id;
            this.GameIdArr[this.i] = this.id.gamedetails[chooseindex].game_id;
            chooseindex++;
          } else {
            let scount = this.skillcnt[this.i];
            let csindex = chooseindex + scount;
            chooseindex = this.newrandom(chooseindex, csindex);
            console.log(this.id.gamedetails[chooseindex].gamename)
            this.GameNameArr[this.i] = this.id.gamedetails[chooseindex].gamename;
            this.GameSkillArr[this.i] = this.id.gamedetails[chooseindex].skill_id;
            this.GameIdArr[this.i] = this.id.gamedetails[chooseindex].game_id;
            chooseindex = csindex;
          }
        }
      }
      console.log(this.GameNameArr[0]);

    }
    //////function for randomly selecting 5 game from over all grade games- ends//////



    //////function for getting games from game_cycle_entry table (random games got stored in this table)- starts//////
    this.getorggame.uid = localStorage.getItem("uid");
    this.getorggame.eid = Number(localStorage.getItem("eid"));
    this.getorggame.year_status = Number(localStorage.getItem("year_status"));
    this.getorggame.ass_status_id = Number(this.LocaldatastorageService_ts.getdata("ass_status"));
    this.getorggame.date = new Date();
    this.getorggame.mem = this.GameIdArr[0]
    this.getorggame.vp = this.GameIdArr[1]
    this.getorggame.fa = this.GameIdArr[2]
    this.getorggame.ps = this.GameIdArr[3]
    this.getorggame.lin = this.GameIdArr[4];
    this.getorggame.memnam = this.GameNameArr[0]
    this.getorggame.vpnam = this.GameNameArr[1]
    this.getorggame.fanam = this.GameNameArr[2]
    this.getorggame.psnam = this.GameNameArr[3]
    this.getorggame.linnam = this.GameNameArr[4];
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.getorggame.timestamp = date_val.toString();
    this.getorggame.hashcode = hash_val;


    this.PuzzlesqueryService_ts.getorggamedetails(this.getorggame).subscribe(res => {
      this.id = JSON.parse(JSON.stringify(res));
      console.log(this.id);
      if (this.id.code == "SA000") {
        console.log("this.id.code" + this.id)
        console.log(this.id)

        if (this.id.orggamechk != 0) {

          for (this.i = 0; this.i < 5; this.i++) {
            if (this.i == 0) {
              this.GameNameArr[this.i] = this.id.getorggame[0].mem_name;
              this.GameSkillArr[this.i] = 1;
              this.GameIdArr[this.i] = this.id.getorggame[0].mem_game_id;
            }
            else if (this.i == 1) {
              this.GameNameArr[this.i] = this.id.getorggame[0].vp_name;
              this.GameSkillArr[this.i] = 2;
              this.GameIdArr[this.i] = this.id.getorggame[0].vp_game_id;
            }
            else if (this.i == 2) {
              this.GameNameArr[this.i] = this.id.getorggame[0].fa_name;
              this.GameSkillArr[this.i] = 3;
              this.GameIdArr[this.i] = this.id.getorggame[0].fa_game_id;
            }
            else if (this.i == 3) {
              this.GameNameArr[this.i] = this.id.getorggame[0].ps_name;
              this.GameSkillArr[this.i] = 4;
              this.GameIdArr[this.i] = this.id.getorggame[0].ps_game_id;
            }
            else if (this.i == 4) {
              this.GameNameArr[this.i] = this.id.getorggame[0].lin_name;
              this.GameSkillArr[this.i] = 5;
              this.GameIdArr[this.i] = this.id.getorggame[0].lin_game_id;
            }
          }
          console.log("inside GameNameArr" + this.GameNameArr)
        }

        if (Number(this.LocaldatastorageService_ts.getdata("ass_status")) == 2) {

          this.getass2trainchk.uid = localStorage.getItem("uid");
          this.getass2trainchk.eid = Number(localStorage.getItem("eid"));
          this.getass2trainchk.year_status = Number(localStorage.getItem("year_status"));
          this.getass2trainchk.ass_status_id = Number(this.LocaldatastorageService_ts.getdata("ass_status"));
          let date_val3: Date;
          date_val3 = new Date();
          let hash_val3 = this.ip.gethash(date_val3);
          this.getass2trainchk.timestamp = date_val3.toString();
          this.getass2trainchk.hashcode = hash_val3;


          this.PuzzlesqueryService_ts.getass2trainchkdetails(this.getass2trainchk).subscribe(res3 => {
            this.id = JSON.parse(JSON.stringify(res3));
            console.log(this.id.getass2trainchk);
            if (this.id.code == "SA000") {
              if (this.id.getass2trainchk == 0) {
                console.log("this.id.getass2trainchk == 0");
                this.getass2trainchkFn();
              }
              else {
                this.getass2trainchkFn();
              }

            }
            else {
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
          this.getscorefn();
        }




      }
      else if (this.id.code == "SA451") {
        console.log(this.id.code);
        this.stopPlayingMsg = this.puzzleWords[73];
        this.isPuzzlePlay = false;
        this.ngxService.stopLoader('loader-01');
        this.countsession = setInterval(() => { this.stopnewload(); }, 400);
      }
      else {

        console.log(this.id.code);
        if (this.id.code == "SA1061" ||
          this.id.code == "SA1041" || this.id.code == "SA1040" || this.id.code == "SA1039") {
          localStorage.clear();
          this.router.navigateByUrl("/login");
        }
      }
    })
    //////function for getting games from game_cycle_entry table (random games got stored in this table)- ends//////
  }
  getass2trainchkFn() {
    this.istrainingdata = 0;
    this.getscorefn();
  }
  getscorefn() {

    for (this.i = 0; this.i < 5; this.i++) {
      this.imgsrcArr[this.i] = ("../assets/GameImage/" + this.GameNameArr[this.i] + ".png").toString();
    }
    
    this.getquescnt.istrainingdata = this.istrainingdata;
    this.getquescnt.ass_status = Number(this.LocaldatastorageService_ts.getdata("ass_status"));
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.getquescnt.timestamp = date_val.toString();
    this.getquescnt.hashcode = hash_val;
    //////function for getting no of question completed per games- starts//////
    this.PuzzlesqueryService_ts.getquescntdetails(this.getquescnt).subscribe(res => {
      this.id = JSON.parse(JSON.stringify(res));
      console.log("getquescnt");
      console.log(this.id);
      if (this.id.code == "SA000") {
        if (this.id.getquescnt.length > 0) {
          this.openmodel = 5;
          for (this.i = 0; this.i < this.id.getquescnt.length; this.i++) {
            this.questionCntSkillArr[this.i] = this.id.getquescnt[this.i].skill_id;
            this.playval[this.id.getquescnt[this.i].skill_id - 1] = false;
            this.playtxtval[this.id.getquescnt[this.i].skill_id - 1] = this.playtxt[4];
          }

          for (this.i = 0; this.i < this.id.getquescnt.length; this.i++) {
            this.questionCntTotalCount[this.i] = this.id.getquescnt[this.i].count;
          }

          for (this.i = 0; this.i < 5; this.i++) {
            if (this.istimerchange == false) {
              console.log("this.istimerchange val false")
            } else if (this.istimerchange == true) {
              this.playval[this.i] = true;
              this.playtxtval[this.i] = this.playtxt[3];
            }
          }
        }
        else {
          this.openmodel = 1;
        }
        console.log(this.playval);
        //////function for getting games score- starts//////
        this.getScore.istrainingdata = this.istrainingdata;
        this.getScore.ass_status = Number(this.LocaldatastorageService_ts.getdata("ass_status"));
        let date_val4: Date;
        date_val4 = new Date();
        let hash_val4 = this.ip.gethash(date_val4);
        this.getScore.timestamp = date_val4.toString();
        this.getScore.hashcode = hash_val4;

        this.PuzzlesqueryService_ts.getgamescoredetails(this.getScore).subscribe(
          res4 => {
            this.id = JSON.parse(JSON.stringify(res4));
            console.log(this.id);
            if (this.id.code == "SA000") {

              if (this.istrainingdata == 0) {
                this.trophyqueryFn();
              }
              else {
                this.trophyQueryStatus = true;
                this.isTrophyShow = false;
                this.getDaChkfn();
              }
              console.log(this.id);
              if (this.id.gameScoredetails.length > 0) {
                if (this.openmodel == 1) {
                  this.openmodel = 0;
                }

                this.fiveGameComChk = this.id.gameScoredetails.length;
                for (
                  this.i = 0;
                  this.i < this.id.gameScoredetails.length;
                  this.i++
                ) {
                  this.MaxScoreArr[this.i] = this.id.gameScoredetails[
                    this.i
                  ].max;
                  this.ScoreGameIdArr[this.i] = this.id.gameScoredetails[
                    this.i
                  ].game_id;
                  this.SumOfScoreArr[this.i] = this.id.gameScoredetails[
                    this.i
                  ].sum;
                  this.GamePlayCountArr[this.i] = this.id.gameScoredetails[
                    this.i
                  ].count;
                  this.GameskillidArr[this.i] = this.id.gameScoredetails[
                    this.i
                  ].skillid;
                  console.log("this.GameskillidArr" + this.GameskillidArr);
                }

                this.StarCalculationFn();
              } else {
                console.log("play the game");
                this.strikeStatus = true;
                this.gameQueryStatus = true;
                if (this.openmodel == 1) {
                  this.openmodel = 1;
                }
                else {
                  console.log("this.openmodel = this.openmodel")

                }
                this.loaderEndFn();
              }
            } else {
              console.log(this.id.code);
              if (this.id.code == "SA1061" ||
                this.id.code == "SA1041" || this.id.code == "SA1040" || this.id.code == "SA1039") {
                localStorage.clear();
                this.router.navigateByUrl("/login");
              }
            }
          }
        );
        //////function for getting games score- ends//////
      }
      else {
        console.log(this.id.code);
        if (this.id.code == "SA1061" ||
          this.id.code == "SA1041" || this.id.code == "SA1040" || this.id.code == "SA1039") {
          localStorage.clear();
          this.router.navigateByUrl("/login");
        }
      }
    })
    //////function for getting no of question completed per games- ends//////
  }



  newrandom(min, max) {
    console.log(min + "min,max" + max);
    var l = [];
    this.collection = [];

    for (let v = min; v < max; v++) {
      this.collection.push(v);
    }

    l = shuffle(this.collection);
    var ran_val = l[0];
    return ran_val;
  }
  getRandomNum(min, max) {
    console.log("old random");
    // return Math.floor(Math.random() * (max - min) + min);
  }

  trophyqueryFn() {
    //////function for getting overall 8 cycle score for trophies- starts//////
    this.getTrophy.uid = localStorage.getItem("uid");
    this.getTrophy.year_status = Number(localStorage.getItem("year_status"));
    this.getTrophy.ass_status = Number(
      this.LocaldatastorageService_ts.getdata("ass_status")
    );
    this.getTrophy.eid = Number(localStorage.getItem("eid"));
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.getTrophy.timestamp = date_val.toString();
    this.getTrophy.hashcode = hash_val;

    this.PuzzlesqueryService_ts.gettrophysdetails(this.getTrophy).subscribe(
      res => {
        this.id = JSON.parse(JSON.stringify(res));

        console.log(this.id);
        if (this.id.code == "SA000") {

          this.getDaChkfn();
          if (this.id.message != "trophy Selected Successfully ass2 remove") {
            console.log("tropy remove if");
            if (this.id.getTrophy.length > 0) {
              console.log("tropy remove if >0");
              this.TotalCycleCnt = this.id.getTrophy.length;
              if (this.ass_status == 2) {
                for (this.i = 0; this.i < this.id.getTrophy.length; this.i++) {
                  for (this.j = 0; this.j < this.skillTypeCnt; this.j++) {
                    if (this.j == 0) {
                      this.avg_Trophy_score_arr[this.j][
                        this.i
                      ] = this.id.getTrophy[this.i].max_m_score;
                    } else if (this.j == 1) {
                      this.avg_Trophy_score_arr[this.j][
                        this.i
                      ] = this.id.getTrophy[this.i].max_v_score;
                    } else if (this.j == 2) {
                      this.avg_Trophy_score_arr[this.j][
                        this.i
                      ] = this.id.getTrophy[this.i].max_f_score;
                    } else if (this.j == 3) {
                      this.avg_Trophy_score_arr[this.j][
                        this.i
                      ] = this.id.getTrophy[this.i].max_p_score;
                    } else if (this.j == 4) {
                      this.avg_Trophy_score_arr[this.j][
                        this.i
                      ] = this.id.getTrophy[this.i].max_l_score;
                    }
                  }
                }

                this.trophyCalculationFn();
              } else {
                console.log("tropy remove if >0 else");
                for (this.i = 0; this.i < this.id.getTrophy.length; this.i++) {
                  this.avg_Trophy_score_arr_status1[this.i] = this.id.getTrophy[this.i].score;
                  this.avg_Trophy_score_arr_status1_skillid[this.i] = this.id.getTrophy[this.i].skill_id;
                }

                this.trophyCalculationFn();
              }
            } else {
              console.log("paly the game to win trophy");
              this.trophyQueryStatus = true;
              this.loaderEndFn();
            }


          }
          else {
            console.log("tropy remove else");
            this.trophyQueryStatus = true;
            this.loaderEndFn();
          }

        } else {

          console.log(this.id.code);
          if (this.id.code == "SA1061" ||
            this.id.code == "SA1041" || this.id.code == "SA1040" || this.id.code == "SA1039") {
            localStorage.clear();
            this.router.navigateByUrl("/login");
          }
        }
      }
    );
    //////function for getting overall 8 cycle score for trophies- ends//////
  }

  trophyCalculationFn() {
    //////function for getting trophies calculation- starts//////
    console.log("trophyCalculationFn called");
    console.log(this.avg_Trophy_score_arr);
    if (this.ass_status == 2) {
      console.log("trophyCalculationFn called22");
      for (this.i = 0; this.i < this.TotalCycleCnt; this.i++) {
        for (this.j = 0; this.j < this.skillTypeCnt; this.j++) {
          if (
            this.avg_Trophy_score_arr[this.j][this.i] >= 20 &&
            this.avg_Trophy_score_arr[this.j][this.i] <= 40
          ) {
            this.TrophyStarArr[this.j] = this.TrophyStarArr[this.j] + 1;
          } else if (
            this.avg_Trophy_score_arr[this.j][this.i] > 40 &&
            this.avg_Trophy_score_arr[this.j][this.i] <= 60
          ) {
            this.TrophyStarArr[this.j] = this.TrophyStarArr[this.j] + 2;
          } else if (
            this.avg_Trophy_score_arr[this.j][this.i] > 60 &&
            this.avg_Trophy_score_arr[this.j][this.i] <= 80
          ) {
            this.TrophyStarArr[this.j] = this.TrophyStarArr[this.j] + 3;
          } else if (
            this.avg_Trophy_score_arr[this.j][this.i] > 80 &&
            this.avg_Trophy_score_arr[this.j][this.i] <= 90
          ) {
            this.TrophyStarArr[this.j] = this.TrophyStarArr[this.j] + 4;
          } else if (
            this.avg_Trophy_score_arr[this.j][this.i] > 90 &&
            this.avg_Trophy_score_arr[this.j][this.i] <= 100
          ) {
            this.TrophyStarArr[this.j] = this.TrophyStarArr[this.j] + 5;
          }

        }
      }
    } else {
      console.log("trophyCalculationFn called22else");
      for (this.j = 0; this.j < this.TotalCycleCnt; this.j++) {
        if (
          this.avg_Trophy_score_arr_status1[this.j] >= 20 &&
          this.avg_Trophy_score_arr_status1[this.j] <= 40
        ) {
          this.TrophyStarArr[
            this.avg_Trophy_score_arr_status1_skillid[this.j] - 1
          ] =
            this.TrophyStarArr[
            this.avg_Trophy_score_arr_status1_skillid[this.j] - 1
            ] + 1;
        } else if (
          this.avg_Trophy_score_arr_status1[this.j] > 40 &&
          this.avg_Trophy_score_arr_status1[this.j] <= 60
        ) {
          this.TrophyStarArr[
            this.avg_Trophy_score_arr_status1_skillid[this.j] - 1
          ] =
            this.TrophyStarArr[
            this.avg_Trophy_score_arr_status1_skillid[this.j] - 1
            ] + 2;
        } else if (
          this.avg_Trophy_score_arr_status1[this.j] > 60 &&
          this.avg_Trophy_score_arr_status1[this.j] <= 80
        ) {
          this.TrophyStarArr[
            this.avg_Trophy_score_arr_status1_skillid[this.j] - 1
          ] =
            this.TrophyStarArr[
            this.avg_Trophy_score_arr_status1_skillid[this.j] - 1
            ] + 3;
        } else if (
          this.avg_Trophy_score_arr_status1[this.j] > 80 &&
          this.avg_Trophy_score_arr_status1[this.j] <= 90
        ) {
          this.TrophyStarArr[
            this.avg_Trophy_score_arr_status1_skillid[this.j] - 1
          ] =
            this.TrophyStarArr[
            this.avg_Trophy_score_arr_status1_skillid[this.j] - 1
            ] + 4;
        } else if (
          this.avg_Trophy_score_arr_status1[this.j] > 90 &&
          this.avg_Trophy_score_arr_status1[this.j] <= 100
        ) {
          this.TrophyStarArr[
            this.avg_Trophy_score_arr_status1_skillid[this.j] - 1
          ] =
            this.TrophyStarArr[
            this.avg_Trophy_score_arr_status1_skillid[this.j] - 1
            ] + 5;
        }
      }

      for (this.i = 0; this.i < this.skillTypeCnt; this.i++) {
        this.TrophyStarArr[this.i] = this.TrophyStarArr[this.i] * 8;
      }
    }

    for (this.i = 0; this.i < this.skillTypeCnt; this.i++) {
      if (this.TrophyStarArr[this.i] > 9 && this.TrophyStarArr[this.i] < 20) {
        this.troimgArr[this.i]='../assets/images/t1.png';
        this.tropyVal[this.i][2] = true;
      } else if (
        this.TrophyStarArr[this.i] >= 20 &&
        this.TrophyStarArr[this.i] < 30
      ) {
        this.troimgArr[this.i]='../assets/images/t2.png';
        this.tropyVal[this.i][1] = true;
      } else if (
        this.TrophyStarArr[this.i] >= 30 &&
        this.TrophyStarArr[this.i] <= 40
      ) {
        this.troimgArr[this.i]='../assets/images/t3.png';
        this.tropyVal[this.i][0] = true;
      }
      if (this.i == this.skillTypeCnt - 1) {
        console.log("if (this.i == this.skillTypeCnt - 1)");
        this.trophyQueryStatus = true;
        this.loaderEndFn();

      }
    }
    //////function for getting trophies calculation- ends//////
  }

  StarCalculationFn() {
    //////function for getting star calculation- starts//////
    for (this.i = 0; this.i < this.ScoreGameIdArr.length; this.i++) {
      if (
        this.MaxScoreArr[this.i] >= 20 &&
        this.MaxScoreArr[this.i] <= 40
      ) {
        this.starArr[this.i] = 1;
      } else if (
        this.MaxScoreArr[this.i] > 40 &&
        this.MaxScoreArr[this.i] <= 60
      ) {
        this.starArr[this.i] = 2;
      } else if (
        this.MaxScoreArr[this.i] > 60 &&
        this.MaxScoreArr[this.i] <= 80
      ) {
        this.starArr[this.i] = 3;
      } else if (
        this.MaxScoreArr[this.i] > 80 &&
        this.MaxScoreArr[this.i] <= 90
      ) {
        this.starArr[this.i] = 4;
      } else if (
        this.MaxScoreArr[this.i] > 90 &&
        this.MaxScoreArr[this.i] <= 100
      ) {
        this.starArr[this.i] = 5;
      }
    }

    for (this.i = 0; this.i < this.startweenval.length; this.i++) {
      for (this.j = 0; this.j < this.startweenval.length; this.j++) {
        if (this.i < this.GameskillidArr.length) {
          if (this.j < this.starArr[this.i]) {
            this.startweenval[this.GameskillidArr[this.i] - 1][this.j] = true;
          } else {
            this.startweenval[this.GameskillidArr[this.i] - 1][this.j] = false;
          }
        }
      }
    }

    console.log("this is startween");
    console.log(this.startweenval);

    if (this.ass_status == 2) {
      if (this.istrainingdata == 0) {
        for (this.i = 0; this.i < this.playval.length; this.i++) {

          if (this.i < this.GamePlayCountArr.length) {
            if (this.GamePlayCountArr[this.i] < 5) {
              this.openmodel = 2;
              this.playval[this.GameskillidArr[this.i] - 1] = false;

              if (this.istimerchange == false) {
                if (this.fiveGameComChk == this.skillTypeCnt) {
                  this.playtxtval[this.GameskillidArr[this.i] - 1] = this.playtxt[1];
                }
                else {
                  this.openmodel = 5;
                  this.playval[this.GameskillidArr[this.i] - 1] = true;
                  this.playtxtval[this.GameskillidArr[this.i] - 1] = this.playtxt[5];
                }

              } else if (this.istimerchange == true) {
                if (this.fiveGameComChk == this.skillTypeCnt) {
                  console.log("this.fiveGameComChk == this.skillTypeCnt");
                }
                else {
                  this.openmodel = 5;
                }
                this.playval[this.GameskillidArr[this.i] - 1] = true;
                this.playtxtval[this.GameskillidArr[this.i] - 1] = this.playtxt[3];
              }

              for (this.k = 0; this.k < this.questionCntSkillArr.length; this.k++) {
                if (this.GameskillidArr[this.i] == this.questionCntSkillArr[this.k]) {

                  if (this.istimerchange == false) {
                    this.playtxtval[this.GameskillidArr[this.i] - 1] = this.playtxt[4];
                  } else if (this.istimerchange == true) {
                    this.playval[this.GameskillidArr[this.i] - 1] = true;
                    this.playtxtval[this.GameskillidArr[this.i] - 1] = this.playtxt[3];
                  }
                }
              }


            } else {
              this.fullsessionchk++;
              if (this.fiveGameComChk == this.skillTypeCnt) {
                if (this.fullsessionchk == this.skillTypeCnt) {
                  this.openmodel = 3;
                }
              }
              this.playval[this.GameskillidArr[this.i] - 1] = true;
              this.playtxtval[this.GameskillidArr[this.i] - 1] = this.playtxt[2];
            }
          }
          if (this.i < this.GamePlayCountArr.length) {
            this.attemp_arr[this.GameskillidArr[this.i] - 1] = 5 - Number(this.GamePlayCountArr[this.i]);
          }
          for (this.j = 0; this.j < this.playval.length; this.j++) {
            console.log("coming");
            if (this.i < this.GamePlayCountArr.length) {
              if (this.j < Number(this.GamePlayCountArr[this.i])) {
                this.strikethroughval[this.GameskillidArr[this.i] - 1][
                  this.j
                ] = true;
              } else {
                this.strikethroughval[this.GameskillidArr[this.i] - 1][
                  this.j
                ] = false;
              }
            }

          }
          if (this.i == this.playval.length - 1) {
            this.strikeStatus = true;
            this.loaderEndFn();
          }
        }
      }
      else {
        this.scorefunction();
      }

    } else {

      this.scorefunction();

    }
    for (this.i = 0; this.i < this.playval.length; this.i++) {

      this.progressval[this.GameskillidArr[this.i] - 1] = this.MaxScoreArr[this.i];
      this.progressPrecent[this.GameskillidArr[this.i] - 1] = this.MaxScoreArr[this.i];
    }
    this.barChartData3 = [];
    this.barChartData3.push({ data: [this.progressPrecent[0],this.progressPrecent[1],this.progressPrecent[2],
      this.progressPrecent[3],this.progressPrecent[4]], label: 'Score' });
    for (this.i = 0; this.i < this.playval.length; this.i++) {

      this.progressval[this.GameskillidArr[this.i] - 1] = this.MaxScoreArr[this.i];
      this.progressPrecent[this.GameskillidArr[this.i] - 1] = this.MaxScoreArr[this.i];
      
      if (this.i == this.playval.length - 1) {
        this.gameQueryStatus = true;
        this.loaderEndFn();
      }
    }

    //////function for getting star calculation- ends//////
  }
  scorefunction() {
    //////function for getting star calculation of initial,post and daily puzzles- starts//////
    for (this.i = 0; this.i < this.playval.length; this.i++) {

      if (this.i < this.GamePlayCountArr.length) {
        if (this.GamePlayCountArr[this.i] < 1) {
          this.openmodel = 5;
          this.playval[this.GameskillidArr[this.i] - 1] = false;
          if (this.istimerchange == false) {
            this.playtxtval[this.GameskillidArr[this.i] - 1] = this.playtxt[0];
          } else if (this.istimerchange == true) {
            this.playval[this.GameskillidArr[this.i] - 1] = true;
            this.playtxtval[this.GameskillidArr[this.i] - 1] = this.playtxt[3];
          }
          for (this.k = 0; this.k < this.questionCntSkillArr.length; this.k++) {
            if (this.GameskillidArr[this.i] == this.questionCntSkillArr[this.k]) {
              if (this.istimerchange == false) {
                this.playtxtval[this.GameskillidArr[this.i] - 1] = this.playtxt[4];
              } else if (this.istimerchange == true) {
                this.playval[this.GameskillidArr[this.i] - 1] = true;
                this.playtxtval[this.GameskillidArr[this.i] - 1] = this.playtxt[3];
              }
            }
          }

        } else {
          this.fullsessionchk++;
          if (this.fullsessionchk == this.skillTypeCnt) {
            this.openmodel = 6;
          }
          this.playval[this.GameskillidArr[this.i] - 1] = true;
          this.playtxtval[this.GameskillidArr[this.i] - 1] = this.playtxt[3];
          for (this.l = 0; this.l < this.questionCntTotalCount.length; this.l++) {
            if (this.GameskillidArr[this.i] == this.questionCntSkillArr[this.l]) {
              if (this.questionCntTotalCount[this.l] < 10) {
                this.playtxtval[this.GameskillidArr[this.i] - 1] = this.playtxt[3];
              }
              else {
                this.playtxtval[this.GameskillidArr[this.i] - 1] = this.playtxt[2];
              }
            }
          }
        }
      }


      for (this.j = 0; this.j < this.playval.length; this.j++) {
        if (this.i < this.GamePlayCountArr.length) {
          this.strikethroughval[this.GameskillidArr[this.i] - 1][
            this.j
          ] = false;
        }

      }
      if (this.i == this.playval.length - 1) {
        this.strikeStatus = true;
        this.loaderEndFn();
      }
    }
    //////function for getting star calculation of initial,post and daily puzzles- starts//////
  }
  getDaChkfn() {
    //////function for getting puzzles_info(content popup shown only one time before DA starting) popup status - starts//////
    if (this.ass_status > 1) {

      if (parseInt(localStorage.getItem("curr_assess_login")) > 1) {

        this.getDaChk.uid = localStorage.getItem("uid");
        this.getDaChk.year_status = Number(localStorage.getItem("year_status"));
        let date_val: Date;
        date_val = new Date();
        let hash_val = this.ip.gethash(date_val);
        this.getDaChk.timestamp = date_val.toString();
        this.getDaChk.hashcode = hash_val;

        this.PuzzlesqueryService_ts.getDaChkdetails(this.getDaChk).subscribe(
          res => {
            this.id = JSON.parse(JSON.stringify(res));
            console.log(this.id);
            if (this.id.code == "SA000") {
              this.ngxService.stopLoader('loader-01');
              this.countsession = setInterval(() => { this.stopnewload(); }, 400);
              console.log(this.id.getDaChk);

              if (this.id.getDaChk == 1) {
                this.showcontentpopup = 1;
              } else {
                this.showcontentpopup = 0;
              }

              this.getDaChkStatus = true;
              this.loaderEndFn();

            }
            else {

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

        this.getDaChkStatus = true;
        this.loaderEndFn();
      }
    }
    else {

      this.getDaChkStatus = true;
      this.loaderEndFn();
    }
    //////function for getting puzzles_info(content popup shown only one time before DA starting) popup status - ends//////
  }
  loader_chk = 1;
  dashData = new dashData();
  response: any;
  crn_val = 0;
  iscrown = false;
  loaderEndFn() {
    //////function for loader end - starts//////
    console.log("this.gameQueryStatus " + this.gameQueryStatus + " this.trophyQueryStatus " + this.trophyQueryStatus
      + "this.strikeStatus " + this.strikeStatus + "this.getDaChkStatus " + this.getDaChkStatus);
    if (
      this.gameQueryStatus == true &&
      this.trophyQueryStatus == true &&
      this.strikeStatus == true &&
      this.getDaChkStatus == true
    ) {
      console.log("loader if")
      if (this.loader_chk == 1) {
        this.loader_chk = 0;
        try {

          // this.dashData.uid = localStorage.getItem("uid");
          // this.dashData.eid = Number(localStorage.getItem("eid"));
          // this.dashData.section_id = localStorage.getItem('Section_id_val');
          // this.dashData.branch_id = localStorage.getItem('Branch_id_val');
          // let date_val: Date;
          // date_val = new Date();
          // let hash_val = this.ip.gethash(date_val);
          // this.dashData.timestamp = date_val.toString();
          // this.dashData.hashcode = hash_val;

          // this.DashboardAPIService_ts.getDashDetails(this.dashData)
          //   .subscribe(
          //     res => {
          //       this.response = JSON.parse(JSON.stringify(res));
          //       console.log("this.response");
          //       console.log(this.response);
          //       if (this.response.code == "SA000") {
          //         if (this.response.result.length == 0) {
          //           this.crn_val = 0;
          //         }
          //         else {
          //           this.crn_val = this.response.result[0].totalcrowny;
          //         }

          //////function for  getting sound- starts//////
          console.log("entered stop" + this.strikeStatus);
          this.getsnd.uid = localStorage.getItem("uid");
          this.getsnd.eid = Number(localStorage.getItem("eid"));
          this.getsnd.ass_status_id = Number(this.LocaldatastorageService_ts.getdata("ass_status"));
          this.getsnd.year_status = Number(localStorage.getItem("year_status"));
          let date_val: Date;
          date_val = new Date();
          let hash_val = this.ip.gethash(date_val);
          this.getsnd.timestamp = date_val.toString();
          this.getsnd.hashcode = hash_val;

          this.PuzzlesqueryService_ts.getsnddetails(this.getsnd).subscribe(
            res => {
              this.id = JSON.parse(JSON.stringify(res));
              console.log(this.id);
              if (this.id.code == "SA000") {
                console.log("this.id.gamesdatedetails");
                console.log(this.id.gamesdatedetails);
                if (this.id.gamesdatedetails != 0) {
                  this.enddateval = this.id.gamesdatedetails;
                  if (this.id.dateData1 != 0) {
                    this.g_dbdateval = (formatDate(this.id.dateData1, 'dd-MM-yyyy', 'en-US')).toString();
                  }
                }
                else {
                  this.enddateval1 = 1;
                }

                this.sndval = this.id.getsnd[0].selected_music;
                console.log(parseInt(localStorage.getItem("curr_assess_login")))
                console.log('parseInt(localStorage.getItem("curr_assess_login"))')

                if (parseInt(localStorage.getItem("curr_assess_login")) == 2) {
                  this.dashData.uid = localStorage.getItem("uid");
                  this.dashData.eid = Number(localStorage.getItem("eid"));
                  this.dashData.section_id = localStorage.getItem('Section_id_val');
                  this.dashData.branch_id = localStorage.getItem('Branch_id_val');
                  let date_val: Date;
                  date_val = new Date();
                  let hash_val = this.ip.gethash(date_val);
                  this.dashData.timestamp = date_val.toString();
                  this.dashData.hashcode = hash_val;
                  this.iscrown = true;
                  this.DashboardAPIService_ts.getDashDetails(this.dashData)
                    .subscribe(
                      res => {
                        this.response = JSON.parse(JSON.stringify(res));
                        console.log("this.response");
                        console.log(this.response);
                        if (this.response.code == "SA000") {
                          if (this.response.result.length == 0) {
                            this.crn_val = 0;
                          }
                          else {
                            this.crn_val = this.response.result[0].totalcrowny;
                          }
                          this.callnewinfo();
                        } else {
                          if (this.id.code == "SA1061" ||
                            this.id.code == "SA1041" || this.id.code == "SA1040" || this.id.code == "SA1039") {
                            localStorage.clear();
                            this.router.navigateByUrl("/login");
                          }
                        }
                      })
                } else {
                  if (parseInt(localStorage.getItem("curr_assess_login")) == 3) {
                    this.iscrown = true;
                  }
                  else {
                    this.iscrown = false;
                  }

                  this.callnewinfo();
                }



                console.log("loader")

              }
              else {
                console.log(this.id.code);
                if (this.id.code == "SA1061" ||
                  this.id.code == "SA1041" || this.id.code == "SA1040" || this.id.code == "SA1039") {
                  localStorage.clear();
                  this.router.navigateByUrl("/login");
                }
              }
            })
          //////function for  getting sound- ends//////

          //   }
          //   else {

          //   }
          // });


        } catch {
          console.log("loader if catch")
        }
      }

    }
    //////function for loader end - ends//////
  }
  event_label = false;
  callnewinfo() {
    //////function for getting program(sbc,hots,carrier etc) status - starts//////
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.pgmstatus.uid = localStorage.getItem("uid");
    this.pgmstatus.timestamp = date_val.toString();
    this.pgmstatus.hashcode = hash_val;
    this.pgmstatus.year_status = Number(localStorage.getItem("year_status"));
    this.PuzzlesqueryService_ts.pgmstatusdetails(this.pgmstatus).subscribe(
      res => {
        this.id = JSON.parse(JSON.stringify(res));
        console.log(this.id);
        this.ngxService.stopLoader('loader-01');
        this.countsession = setInterval(() => { this.stopnewload(); }, 400);
        if (this.id.code == "SA000") {

          if (this.id.pgmstatus[0].sbc1 == 0) {
            this.event_url[0] = this.id.pgmstatus[0].url;
            this.event_val = 0;
            this.con_val = true;
            this.event_label = true;
            if (localStorage.getItem("event_label_status") == "0") {
              localStorage.setItem("event_label_status", "1");
              this.modalService.open(this.newinfo, { centered: true });
            }
            else {
              this.callmsgfn();
            }

          }
          else if (this.id.pgmstatus[0].sbc2 == 0) {
            this.event_url[1] = this.id.pgmstatus[0].url;
            this.event_val = 1;
            this.con_val = true;
            this.event_label = true;
            if (localStorage.getItem("event_label_status") == "0") {
              localStorage.setItem("event_label_status", "1");
              this.modalService.open(this.newinfo, { centered: true });
            }
            else {
              this.callmsgfn();
            }
          }
          else if (this.id.pgmstatus[0].hots == 0) {
            this.event_url[2] = this.id.pgmstatus[0].url;
            this.event_val = 2;
            this.con_val = false;
            this.event_label = true;
            if (localStorage.getItem("event_label_status") == "0") {
              localStorage.setItem("event_label_status", "1");
              this.modalService.open(this.newinfo, { centered: true });
            }
            else {
              this.callmsgfn();
            }
          }
          else if (this.id.pgmstatus[0].cip == 0) {
            this.event_url[3] = this.id.pgmstatus[0].url;
            this.event_val = 3;
            this.con_val = false;
            this.event_label = true;
            if (localStorage.getItem("event_label_status") == "0") {
              localStorage.setItem("event_label_status", "1");
              this.modalService.open(this.newinfo, { centered: true });
            }
            else {
              this.callmsgfn();
            }
          }
          else {
            this.event_label = false;
            this.callmsgfn();
          }
        }
        else {
          console.log(this.id.code);
          if (this.id.code == "SA1061" || this.id.code == "SA1041" || this.id.code == "SA1040" || this.id.code == "SA1039") {
            localStorage.clear();
            this.router.navigateByUrl("/login");
          }
          if (this.id.code == "SA1107") {
            this.event_label = false;
            this.callmsgfn();
          }
        }
      });
    //////function for getting program(sbc,hots,carrier etc) status - ends//////
  }


  eventClick() {
    //////function for calling event site (hots,sbc) //////
    window.open(this.event_url[this.event_val], '_self');
  }
  callmsgfn() {
    //////function for calling popup open function- starts//////
    if (this.showcontentpopup == 1) {
      console.log("enter showcontentpopup")
      this.puzzlecontentfn();
    }
    else {
      console.log("enter showcontentpopup else")
      if (this.openmodel > 0) {
        this.puzzlesmsgFn();
      }
    }
    //////function for calling popup open function- ends//////
  }
  callmeFn(a) {
    //////function for popup status checking loop until popup close- starts//////
    localStorage.setItem("chkDashPopStatus", "0")
    clearInterval(this.myinterval);
    if (a == "0") {
      this.puzzlesmsgFn();
      clearInterval(this.myinterval);
    }
    else {
      clearInterval(this.myinterval);
      this.myinterval = setInterval(() => {
        this.callmeFn(localStorage.getItem("chkDashPopStatus"));
      }, 1000);

    }
    //////function for popup status checking- ends//////
  }
  gameplay(skill) {
    //////function for calling html puzzles from site- starts//////
    if (
      localStorage.getItem("uid") == "" ||
      localStorage.getItem("uid") == null
    ) {
      this.router.navigateByUrl("/login");
    } else {
      let date_val: Date;
      date_val = new Date();
      var date_v1 = date_val.getFullYear() + '-' + (date_val.getMonth() + 1) + '-' + date_val.getDate();
      var time_v1 = date_val.getHours() + ":" + date_val.getMinutes() + ":" + date_val.getSeconds();
      var dateTime_v1 = date_v1 + ' ' + time_v1;

      let hash_val = this.ip.gethash(dateTime_v1);
      if (skill == 0) {
        this.gamename = this.GameNameArr[0];
        this.gameid = Number(this.GameIdArr[0]);
      } else if (skill == 1) {
        this.gamename = this.GameNameArr[1];
        this.gameid = Number(this.GameIdArr[1]);
      } else if (skill == 2) {
        this.gamename = this.GameNameArr[2];
        this.gameid = Number(this.GameIdArr[2]);
      } else if (skill == 3) {
        this.gamename = this.GameNameArr[3];
        this.gameid = Number(this.GameIdArr[3]);
      } else if (skill == 4) {
        this.gamename = this.GameNameArr[4];
        this.gameid = Number(this.GameIdArr[4]);
      }
      localStorage.setItem("puzzleReturnStatus", (1).toString());
      console.log(this.gameurl)
      this.post(this.gameurl, {
        gamename: this.gamename,
        angurl: this.angurl,
        uid: localStorage.getItem("uid"),
        gameid: this.gameid,
        eid: Number(localStorage.getItem("eid")),
        date: this.todayDate,
        ass_status: Number(this.LocaldatastorageService_ts.getdata("ass_status")),
        ass_slot: Number(localStorage.getItem("isschedule")),
        skillkit_id: "",
        year_status: Number(localStorage.getItem("year_status")),
        testtype: "",
        isass2train: this.istrainingdata,
        sndval: this.sndval,
        session_id: this.session_id,
        timestamp: dateTime_v1,
        hashcode: hash_val
      });
    }
    //////function for calling html puzzles from site - ends//////
  }
  session_id: string;
  call() {
    //////function for timer visibility updating//////
    if (this.setflag == 0) {
      for (this.i = 0; this.i < 5; this.i++) {
        if (this.istimerchange == true) {
          this.playval[this.i] = true;
          this.playtxtval[this.i] = this.playtxt[3];
          this.setflag = -1;
        }
      }
    }
  }
  post(path, params) {
    //////function for post method to call html games //////
    let method = "post"; // Set method to post by default if not specified.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);

        form.appendChild(hiddenField);
      }
    }
    document.body.appendChild(form);
    form.submit();
  }
  PuzzlesFn() {
    //////function for info popup open //////
    this.modalService.open(this.puzzlesinfo, { centered: true });
  }
  public puzzlesmsgFn() {
    //////function for all popup open //////
    console.log("call me");
    if (this.openmodel == 1 || this.openmodel == 3 || this.openmodel == 5) {
      if (this.enddateval1 != 1) {
        this.datevar = "on " + (formatDate(this.enddateval, 'dd-MM-yyyy', 'en-US')).toString();
        if (this.openmodel == 3) {
          if (this.g_formateddate == this.g_dbdateval) {
            if (localStorage.getItem("loginpopupgames_date") == "0") {
              localStorage.setItem("loginpopupgames", "0");
              localStorage.setItem("loginpopupgames_date", "1");
            }
          }
        }
      }
    }
    if (this.openmodel == 5) {
      this.popstar = false;
    }
    if (localStorage.getItem("mychkDashPopStatusgames") == "0") {
      localStorage.setItem("mychkDashPopStatusgames", "1");

      if (localStorage.getItem("loginpopupgames") == "0") {
        localStorage.setItem("loginpopupgames", "1");
        if (this.ass_status == 2) {
          this.modalService.open(this.puzzlesmsg, { centered: true });
        }
        else {
          localStorage.setItem("mychkDashPopStatusgames", "0");
        }
      }
    }

  }
  myclose() {
    //////function for dash popup close //////
    localStorage.setItem("mychkDashPopStatusgames", "0");
  }

  puzzlecontentfn() {
    //////function for content popup close //////
    if (localStorage.getItem("mychkDashPopStatusgames") == "0") {
      localStorage.setItem("mychkDashPopStatusgames", "1");
      this.modalService.open(this.puzzlecontent, { centered: true });
    }
  }
  puzzlecontentclose() {

    //////function for popup close //////
    localStorage.setItem("mychkDashPopStatusgames", "0");
    if (this.openmodel > 0) {
      this.puzzlesmsgFn();
    }

  }

  infofn() {
    //////function for info popup open //////
    this.modalService.open(this.crownies_pop, { centered: true });
  }
  calllead() {
    localStorage.setItem("roadReturnStatus", (1).toString());
    this.router.navigateByUrl("/redirect");
  }
}
