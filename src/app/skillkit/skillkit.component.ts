import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import {
  trigger,
  transition,
  animate,
  style
} from "@angular/animations";
import { PuzzlesqueryService } from "../services/puzzles/puzzlesquery.service";
import { IpService } from '../services/ip/ip.service';
import { pgmstatus } from ".././services/puzzles/puzzlesquery";
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { SkillkitService } from '.././services/skillkit/skillkit.service';
import { skillcheck, getskillkitgames, getskillkitscore, getskillkitsnd, getskillkitquescnt, getskillkitorggame, getgamesstatus } from '.././services/skillkit/skillkitAPI';
import { url } from '.././services/baseurl';
import { LocaldatastorageService } from '../localdatastorage.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import shuffle from 'shuffle-array';

@Component({
  selector: 'app-skillkit',
  templateUrl: './skillkit.component.html',
  styleUrls: ['./skillkit.component.scss'],
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
  ]
})
export class SkillkitComponent implements OnInit {
  collection = [];
  //////theme variables//////
  colortheme_base = ['rgb(19, 19, 19)', 'rgb(243, 242, 242)']
  colortheme_bg_base;
  colortheme = ['black', 'white'];
  colortheme_bg;
  colortheme_txt;
  //////skillkit variables//////
  pgmstatus = new pgmstatus();
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

  formateddate = "";
  dbdateval = "";
  myinterval = null;
  user: string;
  popval: boolean;
  popstar = true;
  @ViewChild('skillkitmodel', { static: false }) skillkitmodel;
  getgamesstatus = new getgamesstatus();
  openmodel = 0;
  fullsessionchk = 0;
  skillkit_strikethroughval = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ];
  oneGameComChk = 0;
  getskillkitorggame = new getskillkitorggame();
  scorequestionCntTotalCount = []
  testval = 0;
  questionCntSkillArr = [];
  questionCntTotalCount = [];
  imgsrcArr = ["", "", "", "", ""];
  l: any;
  sndval = 1;
  skillkit_ass_status = -1;
  skillcntval = 5;
  id: any;
  gamename = "";
  skillkitWords: any;
  isskillkit: number;
  skillcheck = new skillcheck();
  getskillkitgames = new getskillkitgames();
  getskillkitscore = new getskillkitscore();
  getskillkitsnd = new getskillkitsnd();
  getskillkitquescnt = new getskillkitquescnt();
  uid: number;
  skid: number;
  mavg: number;
  vavg: number;
  favg: number;
  pavg: number;
  lavg: number;
  playval = [false, false, false, false, false];
  tempskills: any = [];
  tempskillsgrade: any = [];
  eligibleSkills: any = [];
  eligibleSkillsGrade: any = [];
  gameid = 0;
  url = new url();
  todayDate: Date;
  gameurl = this.url.skillkiturl;
  angurl = this.url.puzzleurl;
  skillkit_playtxt = [];
  skillkit_playtxtval = [];
  i: any;
  j: any;
  k: any;
  starArr = [];
  skillkitGamesArr = [];
  skillkitGamesSKillArr = [];
  skillkitGamesIdArr = [];
  skillkitScoreGameIdArr = []; ScoreArr = []; ScoreSkillIdArr = []; skillkitMaxScoreArr = [];
  playSkillCnt = 0;
  skillcnt = [];
  skillindex = [];
  skillkit_strikeStatus = false;
  skillkitsndstatus = false;
  chkgamefinishStatus = 0;

  // starcalContent = "Stars Awarded on a given day. Based on score obtained in the game or based on average score in the game. Every day the stars are refreshed.";
  // StrickcalContent = "attempt calculation";
  startweenval = [[false, false, false, false, false], [false, false, false, false, false], [false, false, false, false, false],
  [false, false, false, false, false], [false, false, false, false, false]]

  popmsgArr = []
  greetingmsgArr = []
  session_id: string;

  constructor(private PuzzlesqueryService_ts: PuzzlesqueryService, private ip: IpService,
    private NgbModalConfig_ts: NgbModalConfig, private modalService: NgbModal, private router: Router,
    private ngxService: NgxUiLoaderService, private SkillkitService_ts: SkillkitService,
    private LocaldatastorageService_ts: LocaldatastorageService) {
    NgbModalConfig_ts.backdrop = 'static';
    NgbModalConfig_ts.keyboard = false;
  }
  countsession;
  load1;
  stopnewload() {
    clearInterval(this.countsession);
    this.load1 = false;
  }
  ngOnInit() {
    //////Initaial function with basic variable definitions  - starts//////
    localStorage.setItem("year_status", (1).toString());
    if (localStorage.getItem("uid") == "" || localStorage.getItem("uid") == null) {
      this.router.navigateByUrl('/login');
    }
    this.colortheme_bg = this.colortheme[parseInt(localStorage.getItem("isdark"))];
    this.colortheme_bg_base = this.colortheme_base[parseInt(localStorage.getItem("isdark"))];
    if (parseInt(localStorage.getItem("isdark")) == 0) {
      this.colortheme_txt = this.colortheme[1];
    }
    else {
      this.colortheme_txt = this.colortheme[0];
    }
    this.formateddate = (formatDate(new Date(), 'dd-MM-yyyy', 'en-US')).toString();
    localStorage.setItem("mychkDashPopStatus", "0");
    this.skillkit_ass_status = (parseInt(localStorage.getItem("isskillkit"))) - ((parseInt(localStorage.getItem("isskillkit"))) * (Number(2)));

    localStorage.setItem("returnSkillkitGamesPlay", (0).toString());
    this.load1 = true;
    this.ngxService.startLoader('loader-skillkit');
    this.todayDate = new Date();
    this.skillkitWords = JSON.parse(localStorage.getItem('langwords') || '[]');
    this.skillkit_playtxt = [
      this.skillkitWords[22], //play
      this.skillkitWords[42], //palyagain
      this.skillkitWords[43],  //completed
      this.skillkitWords[44], //timeexpired
      this.skillkitWords[54],//continue
      this.skillkitWords[123]    //locked 
    ];
    this.popmsgArr = [this.skillkitWords[167], this.skillkitWords[208]];
    this.greetingmsgArr = [this.skillkitWords[209], this.skillkitWords[210]];


    for (this.i = 0; this.i < 5; this.i++) {
      this.skillkit_playtxtval[this.i] = this.skillkit_playtxt[0];
    }

    this.tempskills = JSON.parse(localStorage.getItem('eligibleSkills') || '[]');
    this.tempskillsgrade = JSON.parse(localStorage.getItem('eligibleSkillsGrade') || '[]');
    for (this.i = 0; this.i < 5; this.i++) {
      this.eligibleSkills[this.i] = parseInt(this.tempskills[this.i]);
      this.eligibleSkillsGrade[this.i] = parseInt(this.tempskillsgrade[this.i]);
      if (parseInt(this.tempskills[this.i]) == 1) {
        this.playSkillCnt = this.playSkillCnt + 1;
      }
    }
    console.log("entered skillkit")
    console.log("isskillkit" + (parseInt(localStorage.getItem("isskillkit"))));
    console.log("skillkit_ass_status" + this.skillkit_ass_status)
    console.log("playSkillCnt" + this.playSkillCnt)
    console.log("eligibleSkills" + this.eligibleSkills)
    console.log("eligibleSkillsGrade" + this.eligibleSkillsGrade)
    this.session_id = localStorage.getItem("session_id");

    this.getskillkitgames.uid = localStorage.getItem("uid");
    this.getskillkitgames.eid = parseInt(localStorage.getItem("eid"));
    this.getskillkitgames.skid = parseInt(localStorage.getItem("isskillkit"));
    this.getskillkitgames.year_status = parseInt(localStorage.getItem("year_status"));
    this.getskillkitgames.gamecnt = this.playSkillCnt;
    this.getskillkitgames.mgrade = this.eligibleSkillsGrade[0];
    this.getskillkitgames.vgrade = this.eligibleSkillsGrade[1];
    this.getskillkitgames.fgrade = this.eligibleSkillsGrade[2];
    this.getskillkitgames.pgrade = this.eligibleSkillsGrade[3];
    this.getskillkitgames.lgrade = this.eligibleSkillsGrade[4];

    this.getskillkitscore.uid = localStorage.getItem("uid");
    this.getskillkitscore.eid = parseInt(localStorage.getItem("eid"));
    this.getskillkitscore.skid = parseInt(localStorage.getItem("isskillkit"));
    this.getskillkitscore.year_status = parseInt(localStorage.getItem("year_status"));

    this.getskillkitquescnt.uid = localStorage.getItem("uid");
    this.getskillkitquescnt.eid = parseInt(localStorage.getItem("eid"));
    this.getskillkitquescnt.ass_status_id = this.skillkit_ass_status;
    this.getskillkitquescnt.skid = parseInt(localStorage.getItem("isskillkit"));
    this.getskillkitquescnt.year_status = parseInt(localStorage.getItem("year_status"));

    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.getskillkitgames.timestamp = date_val.toString();
    this.getskillkitgames.hashcode = hash_val;

    //////Initaial function for getting skillkit games - starts//////
    this.SkillkitService_ts.getSkillKitGamesDetails(this.getskillkitgames)
      .subscribe(
        res => {
          this.id = JSON.parse(JSON.stringify(res));
          console.log("entered");
          console.log(this.id)
          if (this.id.code == "SA000") {

            if (this.id.mychkattempt == 0) {

              if (this.id.getskillkitgames[0].gamecount >= this.playSkillCnt) {
                this.skillcnt = [0, 0, 0, 0, 0];
                if (this.id.getskillkitgames.length > this.playSkillCnt) {
                  for (let i = 0; i < this.id.getskillkitgames.length; i++) {
                    if (this.id.getskillkitgames[i].skill_id == 1) {
                      this.skillcnt[0]++;
                    } else if (this.id.getskillkitgames[i].skill_id == 2) {
                      this.skillcnt[1]++;
                    } else if (this.id.getskillkitgames[i].skill_id == 3) {
                      this.skillcnt[2]++;
                    } else if (this.id.getskillkitgames[i].skill_id == 4) {
                      this.skillcnt[3]++;
                    } else if (this.id.getskillkitgames[i].skill_id == 5) {
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
                  for (this.i = 0; this.i < this.id.getskillkitgames.length; this.i++) {
                    this.skillkitGamesArr[this.i] = this.id.getskillkitgames[this.i].gamename;
                    this.skillkitGamesSKillArr[this.i] = this.id.getskillkitgames[this.i].skill_id;
                    this.skillkitGamesIdArr[this.i] = this.id.getskillkitgames[this.i].game_id;
                  }
                } else {
                  let chooseindex = 0;
                  for (this.i = 0; this.i < this.playSkillCnt; this.i++) {
                    console.log("this is i  " + this.i)
                    if (this.skillcnt[this.i] == 1) {
                      this.skillkitGamesArr[this.i] = this.id.getskillkitgames[chooseindex].gamename;
                      this.skillkitGamesSKillArr[this.i] = this.id.getskillkitgames[chooseindex].skill_id;
                      this.skillkitGamesIdArr[this.i] = this.id.getskillkitgames[chooseindex].game_id;
                      chooseindex++;
                    } else {
                      let scount = this.skillcnt[this.i];
                      let csindex = chooseindex + scount;
                      chooseindex = this.newrandom(chooseindex, csindex);
                      console.log(this.id.getskillkitgames[chooseindex].gamename)
                      this.skillkitGamesArr[this.i] = this.id.getskillkitgames[chooseindex].gamename;
                      this.skillkitGamesSKillArr[this.i] = this.id.getskillkitgames[chooseindex].skill_id;
                      this.skillkitGamesIdArr[this.i] = this.id.getskillkitgames[chooseindex].game_id;
                      chooseindex = csindex;
                    }
                  }
                }

                console.log(this.skillkitGamesIdArr)
                console.log(this.skillkitGamesSKillArr)
              }
              else {
                console.log("games not found");
                this.load1 = true;
                this.ngxService.startLoader('loader-skillkit');
              }
            }
            else {
              for (this.i = 0; this.i < 5; this.i++) {
                if (this.i == 0) {
                  this.skillkitGamesArr[this.i] = this.id.getskillkitgames[0].mem_name;
                  this.skillkitGamesSKillArr[this.i] = 1;
                  this.skillkitGamesIdArr[this.i] = this.id.getskillkitgames[0].mem_game_id;
                }
                else if (this.i == 1) {
                  this.skillkitGamesArr[this.i] = this.id.getskillkitgames[0].vp_name;
                  this.skillkitGamesSKillArr[this.i] = 2;
                  this.skillkitGamesIdArr[this.i] = this.id.getskillkitgames[0].vp_game_id;
                }
                else if (this.i == 2) {
                  this.skillkitGamesArr[this.i] = this.id.getskillkitgames[0].fa_name;
                  this.skillkitGamesSKillArr[this.i] = 3;
                  this.skillkitGamesIdArr[this.i] = this.id.getskillkitgames[0].fa_game_id;
                }
                else if (this.i == 3) {
                  this.skillkitGamesArr[this.i] = this.id.getskillkitgames[0].ps_name;
                  this.skillkitGamesSKillArr[this.i] = 4;
                  this.skillkitGamesIdArr[this.i] = this.id.getskillkitgames[0].ps_game_id;
                }
                else if (this.i == 4) {
                  this.skillkitGamesArr[this.i] = this.id.getskillkitgames[0].lin_name;
                  this.skillkitGamesSKillArr[this.i] = 5;
                  this.skillkitGamesIdArr[this.i] = this.id.getskillkitgames[0].lin_game_id;
                }
              }
            }

            //////Initaial function for getting skillkit games from skillkit_cycle_entry table- starts//////
            //////////////////////////////////////////////////////////
            this.getskillkitorggame.uid = localStorage.getItem("uid");
            this.getskillkitorggame.eid = Number(localStorage.getItem("eid"));
            this.getskillkitorggame.year_status = Number(localStorage.getItem("year_status"));
            this.getskillkitorggame.ass_status_id = this.skillkit_ass_status;
            this.getskillkitorggame.skid = parseInt(localStorage.getItem("isskillkit"));
            this.getskillkitorggame.date = new Date();
            //////////////////////work///////////////////////
            this.getskillkitorggame.mem = -9;
            this.getskillkitorggame.vp = -9;
            this.getskillkitorggame.fa = -9;
            this.getskillkitorggame.ps = -9;
            this.getskillkitorggame.lin = -9;
            this.getskillkitorggame.memnam = "empty";
            this.getskillkitorggame.vpnam = "empty";
            this.getskillkitorggame.fanam = "empty";
            this.getskillkitorggame.psnam = "empty";
            this.getskillkitorggame.linnam = "empty";

            for (this.i = 0; this.i < 5; this.i++) {

              if (this.i < this.skillkitGamesIdArr.length) {

                if (this.skillkitGamesSKillArr[this.i] == 1) {
                  this.getskillkitorggame.mem = this.skillkitGamesIdArr[this.i];
                  this.getskillkitorggame.memnam = this.skillkitGamesArr[this.i];
                }
                else if (this.skillkitGamesSKillArr[this.i] == 2) {
                  this.getskillkitorggame.vp = this.skillkitGamesIdArr[this.i];
                  this.getskillkitorggame.vpnam = this.skillkitGamesArr[this.i]
                }
                else if (this.skillkitGamesSKillArr[this.i] == 3) {
                  this.getskillkitorggame.fa = this.skillkitGamesIdArr[this.i];
                  this.getskillkitorggame.fanam = this.skillkitGamesArr[this.i]
                }
                else if (this.skillkitGamesSKillArr[this.i] == 4) {
                  this.getskillkitorggame.ps = this.skillkitGamesIdArr[this.i]
                  this.getskillkitorggame.psnam = this.skillkitGamesArr[this.i]
                }
                else if (this.skillkitGamesSKillArr[this.i] == 5) {
                  this.getskillkitorggame.lin = this.skillkitGamesIdArr[this.i];
                  this.getskillkitorggame.linnam = this.skillkitGamesArr[this.i];
                }
              }
            }
            ////////////////////////////
            this.getskillkitorggame.skillcnt = this.playSkillCnt;
            let date_val1: Date;
            date_val1 = new Date();
            let hash_val1 = this.ip.gethash(date_val1);
            this.getskillkitorggame.timestamp = date_val1.toString();
            this.getskillkitorggame.hashcode = hash_val1;

            this.SkillkitService_ts.getskillkitorggameDetails(this.getskillkitorggame).subscribe(res1 => {
              this.id = JSON.parse(JSON.stringify(res1));
              console.log(this.id);
              if (this.id.code == "SA000") {
                console.log("this.id.code" + this.id)

                if (this.id.skillkitorggamechk != 0) {

                  for (this.i = 0; this.i < 5; this.i++) {
                    if (this.i == 0) {
                      this.skillkitGamesArr[this.i] = this.id.getskillkitorggame[0].mem_name;
                      this.skillkitGamesSKillArr[this.i] = 1;
                      this.skillkitGamesIdArr[this.i] = this.id.getskillkitorggame[0].mem_game_id;
                    }
                    else if (this.i == 1) {
                      this.skillkitGamesArr[this.i] = this.id.getskillkitorggame[0].vp_name;
                      this.skillkitGamesSKillArr[this.i] = 2;
                      this.skillkitGamesIdArr[this.i] = this.id.getskillkitorggame[0].vp_game_id;
                    }
                    else if (this.i == 2) {
                      this.skillkitGamesArr[this.i] = this.id.getskillkitorggame[0].fa_name;
                      this.skillkitGamesSKillArr[this.i] = 3;
                      this.skillkitGamesIdArr[this.i] = this.id.getskillkitorggame[0].fa_game_id;
                    }
                    else if (this.i == 3) {
                      this.skillkitGamesArr[this.i] = this.id.getskillkitorggame[0].ps_name;
                      this.skillkitGamesSKillArr[this.i] = 4;
                      this.skillkitGamesIdArr[this.i] = this.id.getskillkitorggame[0].ps_game_id;
                    }
                    else if (this.i == 4) {
                      this.skillkitGamesArr[this.i] = this.id.getskillkitorggame[0].lin_name;
                      this.skillkitGamesSKillArr[this.i] = 5;
                      this.skillkitGamesIdArr[this.i] = this.id.getskillkitorggame[0].lin_game_id;
                    }
                  }
                  console.log("inside skillkitGamesArr" + this.skillkitGamesArr)
                }
                else {
                  var dummygame_nameArr = ["empty", "empty", "empty", "empty", "empty"];
                  var dummygame_id = [0, 0, 0, 0, 0];
                  var dummyskill_id = [0, 0, 0, 0, 0];
                  for (this.j = 0; this.j < this.skillkitGamesSKillArr.length; this.j++) {
                    dummygame_nameArr[this.skillkitGamesSKillArr[this.j] - 1] = this.skillkitGamesArr[this.j];
                    dummygame_id[this.skillkitGamesSKillArr[this.j] - 1] = this.skillkitGamesIdArr[this.j];
                    dummyskill_id[this.skillkitGamesSKillArr[this.j] - 1] = this.skillkitGamesSKillArr[this.j];
                  }
                  this.skillkitGamesArr = dummygame_nameArr;
                  this.skillkitGamesIdArr = dummygame_id;
                  this.skillkitGamesSKillArr = dummyskill_id;

                }

                this.getskillscoreFn();


              }
              else {
                console.log(this.id.code);
                this.load1 = true;
                this.ngxService.startLoader('loader-skillkit');
                if (this.id.code == "SA1061" ||
                  this.id.code == "SA1041" || this.id.code == "SA1040" || this.id.code == "SA1039") {
                  localStorage.clear();
                  this.router.navigateByUrl("/login");
                }
              }
            })
            //////Initaial function for getting skillkit games from skillkit_cycle_entry table- ends//////


          }
          else {
            console.log(this.id.code);
            this.load1 = true;
            this.ngxService.startLoader('loader-skillkit');
            if (this.id.code == "SA1061" ||
              this.id.code == "SA1041" || this.id.code == "SA1040" || this.id.code == "SA1039") {
              localStorage.clear();
              this.router.navigateByUrl("/login");
            }
          }
          //////Initaial function for getting skillkit games- ends//////
        })
  }

  getskillscoreFn() {
    //////function for getting skillkit score- starts//////
    console.log("this.skillkitGamesArr.length" + this.skillkitGamesArr.length)
    console.log("this.skillkitGamesArr.length" + this.skillkitGamesArr)
    for (this.i = 0; this.i < this.skillkitGamesArr.length; this.i++) {
      if (this.skillkitGamesArr[this.i] == "empty") {
        console.log("empty");
      }
      else {
        this.imgsrcArr[this.skillkitGamesSKillArr[this.i] - 1] = ("../assets/GameImage/" + this.skillkitGamesArr[this.i] + ".png").toString();
      }

    }

    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.getskillkitquescnt.timestamp = date_val.toString();
    this.getskillkitquescnt.hashcode = hash_val;

    this.SkillkitService_ts.getskillkitquescntdetails(this.getskillkitquescnt)
      .subscribe(
        res => {
          this.id = JSON.parse(JSON.stringify(res));
          console.log(this.id)
          if (this.id.code == "SA000") {
            if (this.id.getskillkitquescnt.length > 0) {
              for (this.i = 0; this.i < this.id.getskillkitquescnt.length; this.i++) {
                this.questionCntSkillArr[this.i] = this.id.getskillkitquescnt[this.i].skill_id;
                this.playval[this.id.getskillkitquescnt[this.i].skill_id - 1] = false;
                this.skillkit_playtxtval[this.id.getskillkitquescnt[this.i].skill_id - 1] = this.skillkit_playtxt[4];
              }

              for (this.i = 0; this.i < this.id.getskillkitquescnt.length; this.i++) {
                this.questionCntTotalCount[this.i] = this.id.getskillkitquescnt[this.i].count;
              }

            }
            else {

              this.openmodel = 1;
            }
            let date_val2: Date;
            date_val2 = new Date();
            let hash_val2 = this.ip.gethash(date_val2);
            this.getskillkitscore.timestamp = date_val2.toString();
            this.getskillkitscore.hashcode = hash_val2;

            this.SkillkitService_ts.getskillkitscoredetails(this.getskillkitscore)
              .subscribe(
                res2 => {
                  this.id = JSON.parse(JSON.stringify(res2));
                  console.log(this.id)
                  if (this.id.code == "SA000") {
                    console.log("this.id.getskillkitscore.length" + this.id.getskillkitscore.length)
                    if (this.id.getskillkitscore.length > 0) {
                      if (this.openmodel == 1) {
                        this.openmodel = 0;
                      }
                      this.oneGameComChk = this.id.getskillkitscore.length;
                      for (this.i = 0; this.i < this.id.getskillkitscore.length; this.i++) {
                        this.skillkitMaxScoreArr[this.i] = this.id.getskillkitscore[this.i].max;
                        this.skillkitScoreGameIdArr[this.i] = this.id.getskillkitscore[this.i].game_id;
                        this.ScoreArr[this.i] = this.id.getskillkitscore[this.i].sum;
                        this.ScoreSkillIdArr[this.i] = this.id.getskillkitscore[this.i].skillid;
                        this.scorequestionCntTotalCount[this.i] = this.id.getskillkitscore[this.i].count;
                      }


                      this.getgamesstatus.uid = localStorage.getItem("uid");
                      this.getgamesstatus.eid = Number(localStorage.getItem("eid"));
                      this.getgamesstatus.year_status = Number(localStorage.getItem("year_status"));
                      let date_val3: Date;
                      date_val3 = new Date();
                      let hash_val3 = this.ip.gethash(date_val3);
                      this.getgamesstatus.timestamp = date_val3.toString();
                      this.getgamesstatus.hashcode = hash_val3;

                      this.SkillkitService_ts.getgamesstatusdetails(this.getgamesstatus)
                        .subscribe(
                          res3 => {
                            this.id = JSON.parse(JSON.stringify(res3));
                            console.log(this.id)
                            if (this.id.code == "SA000") {
                              console.log("this.id.statusflag" + this.id.statusflag);
                              this.chkgamefinishStatus = this.id.statusflag;
                              this.calculateGamesscore();
                              this.getingSndFn();
                            }
                            else {
                              console.log(this.id.code);
                              this.load1 = true;
                              this.ngxService.startLoader('loader-skillkit');
                              if (this.id.code == "SA1061" ||
                                this.id.code == "SA1041" || this.id.code == "SA1040" || this.id.code == "SA1039") {
                                localStorage.clear();
                                this.router.navigateByUrl("/login");
                              }
                            }
                          })


                    } else {
                      if (this.openmodel == 1) {
                        this.openmodel = 1;
                      }
                      else {
                        console.log("this.openmodel = this.openmodel");

                      }

                      console.log("play the games")
                      this.skillkit_strikeStatus = true;
                      this.loaderEndFn();
                      this.getingSndFn();

                    }

                  }
                  else {
                    console.log(this.id.code);
                    this.load1 = true;
                    this.ngxService.startLoader('loader-skillkit');
                    if (this.id.code == "SA1061" ||
                      this.id.code == "SA1041" || this.id.code == "SA1040" || this.id.code == "SA1039") {
                      localStorage.clear();
                      this.router.navigateByUrl("/login");
                    }
                  }
                })
          }
          else {
            console.log(this.id.code);
            this.load1 = true;
            this.ngxService.startLoader('loader-skillkit');
            if (this.id.code == "SA1061" ||
              this.id.code == "SA1041" || this.id.code == "SA1040" || this.id.code == "SA1039") {
              localStorage.clear();
              this.router.navigateByUrl("/login");
            }
          }
        })
    //////function for getting skillkit score- ends//////
  }

  getingSndFn() {
    //////function for getting skillkit sound- starts//////
    this.getskillkitsnd.uid = localStorage.getItem("uid");
    this.getskillkitsnd.eid = Number(localStorage.getItem("eid"));
    this.getskillkitsnd.year_status = Number(localStorage.getItem("year_status"));
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.getskillkitsnd.timestamp = date_val.toString();
    this.getskillkitsnd.hashcode = hash_val;

    this.SkillkitService_ts.getskillkitsnddetails(this.getskillkitsnd).subscribe(
      res => {
        this.id = JSON.parse(JSON.stringify(res));
        console.log(this.id);
        if (this.id.code == "SA000") {
          console.log("this.id.datedetails");
          console.log(this.id.datedetails);
          if (this.id.datedetails != 0) {
            this.dbdateval = (formatDate(this.id.datedetails, 'dd-MM-yyyy', 'en-US')).toString();

          }

          this.sndval = this.id.getskillkitsnd[0].selected_music;
          this.skillkitsndstatus = true;
          this.loaderEndFn();
        }
        else {
          this.skillkitsndstatus = true;
          this.loaderEndFn();
          if (this.id.code == "SA1061" ||
            this.id.code == "SA1041" || this.id.code == "SA1040" || this.id.code == "SA1039") {
            localStorage.clear();
            this.router.navigateByUrl("/login");
          }
        }
      })
    //////function for getting skillkit sound- ends//////
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
  calculateGamesscore() {
    //////function for getting skillkit score calculating- starts//////
    for (this.i = 0; this.i < this.skillkitScoreGameIdArr.length; this.i++) {
      if (this.skillkitMaxScoreArr[this.i] >= 20
        && this.skillkitMaxScoreArr[this.i] <= 40) {
        this.starArr[this.i] = 1;
      }
      else if (this.skillkitMaxScoreArr[this.i] > 40
        && this.skillkitMaxScoreArr[this.i] <= 60) {
        this.starArr[this.i] = 2;
      }
      else if (this.skillkitMaxScoreArr[this.i] > 60
        && this.skillkitMaxScoreArr[this.i] <= 80) {
        this.starArr[this.i] = 3;
      }
      else if (this.skillkitMaxScoreArr[this.i] > 80
        && this.skillkitMaxScoreArr[this.i] <= 90) {
        this.starArr[this.i] = 4;
      }
      else if (this.skillkitMaxScoreArr[this.i] > 90
        && this.skillkitMaxScoreArr[this.i] <= 100) {
        this.starArr[this.i] = 5;
      }
    }

    for (this.i = 0; this.i < this.startweenval.length; this.i++) {
      for (this.j = 0; this.j < this.startweenval.length; this.j++) {
        if (this.i < this.ScoreSkillIdArr.length) {
          if (this.j < this.starArr[this.i]) {
            this.startweenval[this.ScoreSkillIdArr[this.i] - 1][this.j] = true;
          }
          else {
            this.startweenval[this.ScoreSkillIdArr[this.i] - 1][this.j] = false;
          }
        }

      }
    }


    for (this.i = 0; this.i < this.playval.length; this.i++) {
      if (this.i < this.ScoreSkillIdArr.length) {
        if (this.scorequestionCntTotalCount[this.i] < 5) {
          this.playval[this.ScoreSkillIdArr[this.i] - 1] = false;

          if (this.oneGameComChk == this.playSkillCnt) {
            if (this.chkgamefinishStatus == 1) {
              this.skillkit_playtxtval[this.ScoreSkillIdArr[this.i] - 1] = this.skillkit_playtxt[1];
            }
            else {
              this.openmodel = 2;
              this.playval[this.ScoreSkillIdArr[this.i] - 1] = true;
              this.skillkit_playtxtval[this.ScoreSkillIdArr[this.i] - 1] = this.skillkit_playtxt[5];
            }

          }
          else {
            this.playval[this.ScoreSkillIdArr[this.i] - 1] = true;
            this.skillkit_playtxtval[this.ScoreSkillIdArr[this.i] - 1] = this.skillkit_playtxt[5];
          }

          for (this.k = 0; this.k < this.questionCntSkillArr.length; this.k++) {
            if (this.ScoreSkillIdArr[this.i] == this.questionCntSkillArr[this.k]) {
              this.skillkit_playtxtval[this.ScoreSkillIdArr[this.i] - 1] = this.skillkit_playtxt[4];
            }
          }
        }
        else {
          this.fullsessionchk++;
          if (this.fullsessionchk == this.playSkillCnt) {
            this.openmodel = 0;
          }
          this.playval[this.ScoreSkillIdArr[this.i] - 1] = true;
          this.skillkit_playtxtval[this.ScoreSkillIdArr[this.i] - 1] = this.skillkit_playtxt[2];
        }


      }

      for (this.j = 0; this.j < this.playval.length; this.j++) {
        console.log("coming");
        if (this.i < this.scorequestionCntTotalCount.length) {
          if (this.j < Number(this.scorequestionCntTotalCount[this.i])) {
            this.skillkit_strikethroughval[this.ScoreSkillIdArr[this.i] - 1][
              this.j
            ] = true;
          } else {
            this.skillkit_strikethroughval[this.ScoreSkillIdArr[this.i] - 1][
              this.j
            ] = false;
          }
        }


      }

      if ((this.i) == Number(this.playval.length - 1)) {
        this.skillkit_strikeStatus = true;
        this.loaderEndFn();
      }

    }

    //////function for getting skillkit score calculating- ends//////

  }
  loaderEndFn() {
    //////function for stoping loader- starts//////
    if (
      this.skillkitsndstatus == true &&
      this.skillkit_strikeStatus == true
    ) {
      this.callnewinfo();
    }
    //////function for stoping loader- ends//////
  }
  event_label = false;
  callnewinfo() {
    //////function for getting sbc,hots event promgram staus- starts//////
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
        this.ngxService.stopLoader('loader-skillkit');
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
    //////function for getting sbc,hots event promgram staus- ends//////
  }
  eventClick() {
     //////function for loading external url //////
    window.open(this.event_url[this.event_val], '_self');
  }
  callmsgfn() {
     //////function for calls skillkitmodelFn only if  openmodel > 0//////
    if (this.openmodel > 0) {
      this.skillkitmodelFn();
    }
    
  }

  callmeFn(a) {
      //////function for loops until content popup closes//////
    localStorage.setItem("chkDashPopStatus", "0");
    clearInterval(this.myinterval);
    if (a == "0") {
      this.skillkitmodelFn();
      clearInterval(this.myinterval);
    }
    else {
      clearInterval(this.myinterval);
      this.myinterval = setInterval(() => {
        this.callmeFn(localStorage.getItem("chkDashPopStatus"));
      }, 1000);
    }
  }

  skill_gameplay(skill) {
    //////function for loading html skillkit games- starts//////
    if (
      localStorage.getItem("uid") == "" ||
      localStorage.getItem("uid") == null
    ) {
      this.router.navigateByUrl("/login");
    }
    else {
      let date_val: Date;
      date_val = new Date();
      var date_v1 = date_val.getFullYear() + '-' + (date_val.getMonth() + 1) + '-' + date_val.getDate();
      var time_v1 = date_val.getHours() + ":" + date_val.getMinutes() + ":" + date_val.getSeconds();
      var dateTime_v1 = date_v1 + ' ' + time_v1;

      let hash_val = this.ip.gethash(dateTime_v1);
      if (skill== 0) {
        this.gamename = this.skillkitGamesArr[0];
        this.gameid = this.skillkitGamesIdArr[0];
      }
      else if (skill == 1) {
        this.gamename = this.skillkitGamesArr[1];
        this.gameid = this.skillkitGamesIdArr[1];
      }
      else if (skill == 2) {
        this.gamename = this.skillkitGamesArr[2];
        this.gameid = this.skillkitGamesIdArr[2];
      }
      else if (skill == 3) {
        this.gamename = this.skillkitGamesArr[3];
        this.gameid = this.skillkitGamesIdArr[3];
      }
      else if (skill== 4) {
        this.gamename = this.skillkitGamesArr[4];
        this.gameid = this.skillkitGamesIdArr[4];
      }
      localStorage.setItem("returnSkillkitGamesPlay", (1).toString());
      this.post(this.gameurl, {
        gamename: this.gamename, angurl: this.angurl, uid: localStorage.getItem("uid"), gameid: this.gameid,
        eid: Number(localStorage.getItem("eid")), date: this.todayDate, ass_status: this.skillkit_ass_status,
        year_status: Number(localStorage.getItem("year_status")),
        ass_slot: "", skillkit_id: Number(localStorage.getItem("isskillkit")),
        testtype: 0,
        isass2train: "",
        // ass_slot: "", skillkit_id: 1,
        sndval: this.sndval,
        session_id: this.session_id,
        timestamp: dateTime_v1,
        hashcode: hash_val
      });
    }
    //////function for loading html skillkit games- ends//////
  }


  post(path, params) {
    //////function for loading html skillkit games postfn- starts//////
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
    //////function for loading html skillkit games postfn- ends//////
  }

  public skillkitmodelFn() {
    //////function for popup- starts//////
    if (this.openmodel == 2) {
      this.popstar = false;
      if (this.formateddate == this.dbdateval) {
        if (localStorage.getItem("loginpopupskillkit_date") == "0") {
          localStorage.setItem("loginpopupskillkit", "0");
          localStorage.setItem("loginpopupskillkit_date", "1");
        }

      }
    }
    if (localStorage.getItem("mychkDashPopStatus") == "0") {
      localStorage.setItem("mychkDashPopStatus", "1");

      if (localStorage.getItem("loginpopupskillkit") == "0") {
        localStorage.setItem("loginpopupskillkit", "1");
        this.modalService.open(this.skillkitmodel, { centered: true });
      }

    }
    //////function for popup- ends//////
  }
  myclose() {
    localStorage.setItem("mychkDashPopStatus", "0");
  }
  puzzlesfn(){
    localStorage.setItem("puzzleReturnStatus", (1).toString());
       this.router.navigateByUrl("/redirect");
  }
}
