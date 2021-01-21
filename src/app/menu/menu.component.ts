import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { DashboardAPIService } from '.././services/dashboard/dashboard-api.service';
import { getisfullschudle } from '.././services/dashboard/dashAPI';
import { ThemeService } from '../services/profile/theme.service'
import { MenuService } from '../services/menu/menu.service'
import { LanguageService } from '../services/profile/language.service'
import { LocaldatastorageService } from '../localdatastorage.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { getTime, setTime } from '../services/menu/menu';
import { TimerService } from '../services/menu/timer.service';
import { updatebgm, skillkitstatus, setdobdata, chkfbdata, setfbdata, chklogin, chkinitialcomp, session_id, getmedval } from '.././services/menu/menu';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { SkillkitService } from '.././services/skillkit/skillkit.service';
import { skillcheck, skillkitdet } from '.././services/skillkit/skillkitAPI';
import { PuzzleService } from "../services/puzzles/puzzle.service";
import { NgbDatepickerConfig } from "@ng-bootstrap/ng-bootstrap";
import { v4 as uuid } from 'uuid';
import { sessionid, insertlocation } from ".././services/login/loginAPI";
import { LoginAPIService } from ".././services/login/login-api.service";
import { IpService } from '../services/ip/ip.service';
import { DatasharingServiceService } from "../services/ip/datasharing-service.service";
import { url } from '../services/baseurl';
import { ConnectionService } from 'ng-connection-service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})

export class MenuComponent {

  status = 'ONLINE';
  isConnected = true;
  // isDashRoute
  //////theme variables//////
  baseurl = new url();
  colortheme = ['black', 'white'];
  colortheme_bg;
  colortheme_txt;
  colortheme_base = ['#0D0F12', 'white']
  colortheme_bg_base;
  colortheme_base_sec = ['#181C20', '#F0F0F0']
  colortheme_bg_base_sec;
  colortheme_txt1_Arr = ['rgba(255, 255, 255, 0.65)', 'black'];
  colortheme_txt1;
  whitetheme=false;
  //////menu variables//////
  ipAddress: string;
  insertlocation = new insertlocation();

  styleArr_dashicontxt = ['-17px', '-30px', '-14px', null, null];
  styleArr_puzzleicontxt = ['-12px', '-23px', null, null, null];
  styleArr_skillkiticontxt = ['-13px', '-23px', null, null, null];
  styleArr_reporticontxt = ['-10px', '-23px', null, null, null];
  styleArr_tropyicontxt = ['-13px', '-27px', '-4px', null, null];
  styleArr_profileicontxt = ['-10px', '-23px', null, null, null];
  styleArr_leadericontxt = ['-20px', '-47px', '-24px', null, null];
  style_dashicontxt;
  style_puzzleicontxt;
  style_skillkiticontxt;
  style_reporticontxt;
  style_tropyicontxt;
  style_leadericontxt;
  style_profileicontxt;
  medvalArr = [0, 0, 0, 0, 0];
  MenuprofileReturnStatus = 0;
  puzzleOrskillkitStatus = 0;
  getisfullschudle = new getisfullschudle();
  response2: any;
  isfullschudle = 1;
  @ViewChild('dashinfo', { static: false }) dashinfo;
  @ViewChild('logout', { static: false }) logout;
  @ViewChild('noint', { static: false }) noint;
  @ViewChild('feedback', { static: false }) feedback;
  @ViewChild('content1', { static: false }) content1;
  ugrade = 0;
  newfbchkvar = 0;
  event_id = 1;
  errorcontent: boolean = false;
  errorcontenttxt = "";
  dobModelinput: boolean = false;
  closeResult: string;
  dobdata: any = null;
  dobdata1: any = null;
  modalReference = null;
  feedmodalReference = null;
  tempdataformate = "";
  setdobdata = new setdobdata();
  slectedval = [[false, false, false, false], [false, false, false, false], [false, false, false]]
  assexptxt = ""
  protxt = ""
  solvetxt = ""
  destxtvalue = "";
  chkinitialcomp = new chkinitialcomp();
  nowDate = new Date();
  todaydob: any;
  chkfbdata = new chkfbdata();
  setfbdata = new setfbdata();
  logData = new chklogin();
  year_status = 1;
  feederrorbol: boolean = false;
  feederrortxt = "";
  feedbackshow = 0;
  public dashboard: boolean = false;
  public puzzles: boolean = false;
  public reports: boolean = false;
  public reports1: boolean = false;
  public roadmap: boolean = false;
  public trophies: boolean = false;
  public leader: boolean = false;
  public skillkit: boolean = false;
  public profile: boolean = false;
  public sbc: boolean = false;
  public chkpuzzle: boolean;
  public chkskillkit: boolean;
  skillkitstatus = new skillkitstatus();
  skillcheck = new skillcheck();
  response1: any;
  response: any;
  themechange: any;
  uid: string;
  title = 'Skillangels-schools';
  goodday: string;
  username: string;
  menuWords: any;
  currentskillkit: number;
  playedgamescnt: number;
  iscompleted: number;
  eligibleSkills: any = [];
  eligibleSkillsGrade: any = [];
  i: any;
  skid: number;
  mavg: number;
  vavg: number;
  favg: number;
  pavg: number;
  lavg: number;
  medianval: number;
  mem_medianval: number;
  vp_medianval: number;
  fa_medianval: number;
  ps_medianval: number;
  lin_medianval: number;
  usereligiblity: boolean;
  sharebtnarr = [false, false];
  sharebtntxt = "";
  hopbtnarr = [false, false];
  hopbtntxt = "";
  logoutsuss = 0;
  skillkitreq = new skillkitdet();
  getmedval = new getmedval();
  //timer related
  countDownTimer;
  timerEntry: number = 0;
  getCurrentTimerVal = new setTime()
  istimerchange: boolean = false;
  timeChange: boolean;
  getTimeDet = new getTime()
  timerStartVal: number = 0;
  isHots: boolean;
  //////menu variables//////
  @ViewChild('top', { static: false }) top;
  chk_val = 0;

  constructor(private connectionService: ConnectionService, private dataSharingService: DatasharingServiceService, private ip: IpService, private DashboardAPIService_ts: DashboardAPIService, private LoginAPIService_ts: LoginAPIService, private timeserv: TimerService, public config: NgbDatepickerConfig, private router: Router, private PuzzleServ: PuzzleService, NgbModalConfig_ts: NgbModalConfig,
    private localDataStorageService: LocaldatastorageService, private ngxService_menu: NgxUiLoaderService,
    private theme: ThemeService, private MenuService_ts: MenuService, private lang: LanguageService, private modalService: NgbModal, private SkillkitService_ts: SkillkitService) {
    NgbModalConfig_ts.backdrop = 'static';
    NgbModalConfig_ts.keyboard = false;
    const currentDate1 = new Date();
    const day = currentDate1.getDate();
    const month = currentDate1.getMonth() + 1;
    const year = currentDate1.getFullYear();
    this.config.maxDate = { year, month, day };
    this.dataSharingService.isdarktheme.subscribe(value => {
      this.colortheme_bg = this.colortheme[parseInt(localStorage.getItem("isdark"))];
      this.colortheme_bg_base = this.colortheme_base[parseInt(localStorage.getItem("isdark"))];
      this.colortheme_bg_base_sec = this.colortheme_base_sec[parseInt(localStorage.getItem("isdark"))];
      this.colortheme_txt1 = this.colortheme_txt1_Arr[parseInt(localStorage.getItem("isdark"))];
      if (parseInt(localStorage.getItem("isdark")) == 0) {
        this.whitetheme=false;
        this.colortheme_txt = this.colortheme[1];
      }
      else {
        this.whitetheme=true;
        this.colortheme_txt = this.colortheme[0];
      }
    });

    this.dataSharingService.isloader_sta.subscribe(value => {
      if (value == 1) {
        this.top.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.dataSharingService.isloader_sta.next(0);
      }
    });

    this.dataSharingService.ismusic.subscribe(value => {
      if (value == 1) {
        //pause    
        this.music_val = false;
        this.music_data.volume = 0;
        this.chk_val = 1;
      }
      else if (value == 2) {

        if (localStorage.getItem("music_data_status") == "1") {
          //play
          this.music_val = true;
          this.music_data.volume = 0.1;
          this.chk_val = 0;
        }
        else {
          //pause
          this.music_val = false;
          this.music_data.volume = 0;
          this.chk_val = 0;
        }
        this.dataSharingService.ismusic.next(0);
      }
      else {
        //value 0
      }
    });

    this.dataSharingService.user_name_pass.subscribe(value => {
      if (value != "") {
        this.uname = value;
        localStorage.setItem("uname", value);
        this.dataSharingService.user_name_pass.next("");
      }
    });



    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
        location.reload();
      }
      else {
        this.status = "OFFLINE";
        clearInterval(this.countsession);
        clearInterval(this.countDownTimer);
        this.modalService.open(this.noint, { centered: true });

      }

    })


  }

  public _opened: boolean = false;
  public _modeNum: number = 0;
  public _MODES: Array<string> = ['over', 'push', 'slide'];
  public _POSITIONS: Array<string> = ['left', 'right', 'top', 'bottom'];
  public open_side = false;



  public _toggleOpened(): void {
    //////sidebar open function//////
    this._opened = !this._opened;
  }

  public _toggleMode(): void {
    //////sidebar mode function//////
    this._modeNum++;

    if (this._modeNum === this._MODES.length) {
      this._modeNum = 0;
    }
  }

  //////sidebar functions//////
  public _onOpenStart(): void {
    console.info('Sidebar opening');
    this.open_side = true;
  }

  public _onOpened(): void {
    console.info('Sidebar opened');
    this.open_side = true;
  }

  public _onCloseStart(): void {
    console.info('Sidebar closing');
    this.open_side = false;
  }

  public _onClosed(): void {
    console.info('Sidebar closed');
    this.open_side = false;
  }

  public _onTransitionEnd(): void {
    console.info('Transition ended');
  }

  public _onBackdropClicked(): void {
    console.info('Backdrop clicked');
  }
  //////sidebar function//////





  openModal1() {
    //////function for opening DOB password setting popup //////
    this.modalReference = this.modalService.open(this.content1, { centered: true, backdrop: 'static' });
  }
  display: any;
  @ViewChild('time', { static: false }) input: ElementRef<any>;
  ngAfterViewInit() {
    if (localStorage.getItem("dob_password") == "demouser") {
      this.openModal1();

      if (parseInt(localStorage.getItem("curr_assess_login")) != 1) {
        if (parseInt(localStorage.getItem("assessment_check")) > 1) {
          if (parseInt(localStorage.getItem("timercount")) == 0) {
            console.log("this.input.nativeElement.value");
            this.display = this.input.nativeElement;
          }
        }
      }
    }
    else {
      console.log("coming to else" + localStorage.getItem("curr_assess_login"))
      console.log("coming to else" + localStorage.getItem("assessment_check"))
      console.log("coming to else" + localStorage.getItem("timercount"))
      console.log(localStorage)
      if (parseInt(localStorage.getItem("curr_assess_login")) != 1) {
        if (parseInt(localStorage.getItem("assessment_check")) > 1) {
          if (parseInt(localStorage.getItem("timercount")) == 0) {
            console.log("this.input.nativeElement.value");
            this.gotToPage()

          }
        }
      }
    }
  }

  gotToPage(): void {
    setTimeout(() => this.call(), 1000); // 2500 is millisecond
  }
  call() {
    //////function for DOB password getting //////
    if (parseInt(localStorage.getItem("curr_assess_login")) != 1) {
      if (parseInt(localStorage.getItem("assessment_check")) > 1) {
        if (parseInt(localStorage.getItem("timercount")) == 0) {
          if (this.input != null) {
            this.display = this.input.nativeElement;
            this.initTimer()
            localStorage.setItem("timercount", "1");
          } else {
            this.gotToPage();
          }

        }
      }
    }
  }
  countDownTimer1: any
  valueChanged(value: string) {
    //////function for getting feedback popup textfield data//////
    this.destxtvalue = value;
  }

  assexp(event) {
    //////function for feedback question1 data reset -starts//////
    if (event.target.id == "Joyful & Engaging") {
      this.slectedval = [[true, false, false, false],
      [this.slectedval[1][0], this.slectedval[1][1], this.slectedval[1][2], this.slectedval[1][3]],
      [this.slectedval[2][0], this.slectedval[2][1], this.slectedval[2][2]]]
    }
    else if (event.target.id == "Happy & Involved") {
      this.slectedval = [[false, true, false, false],
      [this.slectedval[1][0], this.slectedval[1][1], this.slectedval[1][2], this.slectedval[1][3]],
      [this.slectedval[2][0], this.slectedval[2][1], this.slectedval[2][2]]]
    }
    else if (event.target.id == "Neutral") {
      this.slectedval = [[false, false, true, false],
      [this.slectedval[1][0], this.slectedval[1][1], this.slectedval[1][2], this.slectedval[1][3]],
      [this.slectedval[2][0], this.slectedval[2][1], this.slectedval[2][2]]]
    }
    else if (event.target.id == "Dull") {
      this.slectedval = [[false, false, false, true],
      [this.slectedval[1][0], this.slectedval[1][1], this.slectedval[1][2], this.slectedval[1][3]],
      [this.slectedval[2][0], this.slectedval[2][1], this.slectedval[2][2]]]
    }
    this.assexptxt = event.target.id;
    //////function for feedback question1 data reset -ends//////
  }
  pro(event) {
    //////function for feedback question2 data reset -starts//////
    if (event.target.id == "Challenging Puzzles") {
      this.slectedval = [
        [this.slectedval[0][0], this.slectedval[0][1], this.slectedval[0][2], this.slectedval[0][3]],
        [true, false, false, false],
        [this.slectedval[2][0], this.slectedval[2][1], this.slectedval[2][2]]]
    }
    else if (event.target.id == "Animation") {
      this.slectedval = [
        [this.slectedval[0][0], this.slectedval[0][1], this.slectedval[0][2], this.slectedval[0][3]],
        [false, true, false, false],
        [this.slectedval[2][0], this.slectedval[2][1], this.slectedval[2][2]]]
    }
    else if (event.target.id == "Scoring") {
      this.slectedval = [
        [this.slectedval[0][0], this.slectedval[0][1], this.slectedval[0][2], this.slectedval[0][3]],
        [false, false, true, false],
        [this.slectedval[2][0], this.slectedval[2][1], this.slectedval[2][2]]]
    }
    else if (event.target.id == "Rewards") {
      this.slectedval = [[this.slectedval[0][0], this.slectedval[0][1], this.slectedval[0][2], this.slectedval[0][3]],
      [false, false, false, true],
      [this.slectedval[2][0], this.slectedval[2][1], this.slectedval[2][2]]]
    }
    this.protxt = event.target.id;
    //////function for feedback question2 data reset -ends//////
  }
  solve(event) {
    //////function for feedback question3 data reset -starts//////
    if (event.target.id == "Daily") {
      this.slectedval = [
        [this.slectedval[0][0], this.slectedval[0][1], this.slectedval[0][2], this.slectedval[0][3]],
        [this.slectedval[1][0], this.slectedval[1][1], this.slectedval[1][2], this.slectedval[1][3]],
        [true, false, false]]
    }
    else if (event.target.id == "Weekly") {
      this.slectedval = [[this.slectedval[0][0], this.slectedval[0][1], this.slectedval[0][2], this.slectedval[0][3]],
      [this.slectedval[1][0], this.slectedval[1][1], this.slectedval[1][2], this.slectedval[1][3]],
      [false, true, false]]
    }
    else if (event.target.id == "Seldom") {
      this.slectedval = [[this.slectedval[0][0], this.slectedval[0][1], this.slectedval[0][2], this.slectedval[0][3]],
      [this.slectedval[1][0], this.slectedval[1][1], this.slectedval[1][2], this.slectedval[1][3]],
      [false, false, true]]
    }

    this.solvetxt = event.target.id;
    //////function for feedback question3 data reset -ends//////
  }
  callfeedback() {
    //////function for feedback eligibility chk -starts//////
    this.chkinitialcomp.uid = localStorage.getItem("uid");
    this.chkinitialcomp.event_id = this.event_id;
    this.chkinitialcomp.ass_status_id = 1;
    this.chkinitialcomp.year_status = this.year_status;

    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.chkinitialcomp.timestamp = date_val.toString();
    this.chkinitialcomp.hashcode = hash_val;
    this.ngxService_menu.startLoader('loader-master');
    this.MenuService_ts.chkinitialcompdetails(this.chkinitialcomp)
      .subscribe(
        res => {
          this.response1 = JSON.parse(JSON.stringify(res));
          console.log(this.response1.message);
          this.ngxService_menu.stopLoader('loader-master');
          if (this.response1.code == "SA000") {
            if (this.response1.chkinitialcomp == 1) {

              if (localStorage.getItem("newfbchkvar") == "1") {
                if (this.feedbackshow == 0) {
                  if (this.logoutsuss == 0) {
                    this.feedmodalReference = this.modalService.open(this.feedback, { centered: false });
                    this.feedbackshow = 1;
                  }
                }
              }
              else {
                if (this.logoutsuss == 0) {
                  this.logoutModal();
                }
              }
            }
            else {
              if (this.logoutsuss == 0) {
                this.logoutModal();

              }
            }
          }
          else {
            console.log(this.response1.code);
            if (this.response1.code == "SA1061" ||
              this.response1.code == "SA1041" || this.response1.code == "SA1040" || this.response1.code == "SA1039") {
              localStorage.clear();
              this.router.navigateByUrl("/login");
            }
          }
        })


    //////function for feedback eligibility chk -ends//////
  }

  onclickfeedback() {
    //////function for feedback submit -starts//////
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.setfbdata.timestamp = date_val.toString();
    this.setfbdata.hashcode = hash_val;

    this.setfbdata.uid = localStorage.getItem("uid");
    this.setfbdata.year_status = this.year_status;
    this.setfbdata.assexptxt = this.assexptxt;
    this.setfbdata.htpins = this.hopbtntxt;
    this.setfbdata.protxt = this.protxt;
    this.setfbdata.solvetxt = this.solvetxt;
    this.setfbdata.shareexp = this.sharebtntxt;
    if (this.destxtvalue == "") {
      this.setfbdata.desctxt = "NotEntered";
    }
    else {
      this.setfbdata.desctxt = this.destxtvalue;
    }

    if (this.assexptxt != "" && this.hopbtntxt != "" && this.protxt != "" && this.solvetxt != "" && this.sharebtntxt != "") {
      this.ngxService_menu.startLoader('loader-master');
      this.MenuService_ts.setfbdatadetails(this.setfbdata)
        .subscribe(
          res => {
            this.response1 = JSON.parse(JSON.stringify(res));
            console.log(this.response1.message);
            this.ngxService_menu.stopLoader('loader-master');
            if (this.response1.code == "SA000") {
              localStorage.setItem("newfbchkvar", (0).toString());
              this.feederrorbol = false;
              this.feederrortxt = "";
              this.feedmodalReference.close();
              this.clearfbFn();
              this.feedbackshow = 0;
              this.logoutModal();
            } else {
              if (this.response1.code == "SA1061" ||
                this.response1.code == "SA1041" || this.response1.code == "SA1040" || this.response1.code == "SA1039") {
                localStorage.clear();
                this.router.navigateByUrl("/login");
              }
              console.log(this.response1.code);
              this.feederrorbol = false;
              this.feederrortxt = "";
              this.feedmodalReference.close();
              this.clearfbFn();
              this.feedbackshow = 0;

              this.logoutModal();
            }
          })
    }
    else {
      this.feederrorbol = true;
      this.feederrortxt = this.menuWords[138];
    }
    //////function for feedback submit -ends//////
  }
  clearfbFn() {
    //////function for feedback cancel -starts//////
    this.sharebtnarr = [false, false];
    this.hopbtnarr = [false, false];
    this.slectedval = [[false, false, false, false], [false, false, false, false], [false, false, false]];
    this.assexptxt = "";
    this.protxt = "";
    this.solvetxt = "";
    this.hopbtntxt = "";
    this.sharebtntxt = "";
    this.destxtvalue = "";
    this.feederrorbol = false;
    this.feederrortxt = "";
    //////function for feedback cancel -ends//////
  }
  sharebtn(event) {
    //////function for feedback question4 data reset -start//////
    if (event.target.id == "Yes") {
      this.sharebtnarr = [true, false];
    }
    else {
      this.sharebtnarr = [false, true];
    }
    this.sharebtntxt = event.target.id;
    //////function for feedback question4 data reset -ends//////
  }

  hopbtn(event) {
    //////function for feedback question5 data reset -start//////
    if (event.target.id == "Yes") {
      this.hopbtnarr = [true, false];
    }
    else {
      this.hopbtnarr = [false, true];
    }
    this.hopbtntxt = event.target.id;
    //////function for feedback question5 data reset -ends//////
  }
  onskipfeedback() {
    //////function for feedback skip -start//////
    this.clearfbFn();
    this.feedbackshow = 0;
    this.logoutModal();
    //////function for feedback skip -start//////
  }
  isbtndisable: boolean = false;
  colorVal: string = 'red'

  ondob_passwordFn() {
    //////function for DOB password submit -start//////
    this.dobdata = JSON.parse(JSON.stringify(this.dobdata1));
    let array = [];
    for (let key in this.dobdata) {
      if (this.dobdata.hasOwnProperty(key)) {
        array.push(this.dobdata[key]);
      }
    }

    if (array.length > 0) {

      if (array.length == 3) {

        this.dobdata = JSON.parse(JSON.stringify(this.dobdata));

        if (this.dobdata.month < 10) {

          this.dobdata.month = "0" + this.dobdata.month;
        }
        if (this.dobdata.day < 10) {

          this.dobdata.day = "0" + this.dobdata.day;
        }
        this.tempdataformate = (this.dobdata.day).toString() + (this.dobdata.month).toString() + (this.dobdata.year).toString();


        this.setdobdata.uid = localStorage.getItem("uid");
        this.setdobdata.dobdata = this.tempdataformate;
        this.setdobdata.year_status = this.year_status;
        let date_val: Date;
        date_val = new Date();
        let hash_val = this.ip.gethash(date_val);
        this.setdobdata.timestamp = date_val.toString();
        this.setdobdata.hashcode = hash_val;

        this.ngxService_menu.startLoader('loader-master');
        this.MenuService_ts.setdobdatadetails(this.setdobdata)
          .subscribe(
            res => {
              this.response1 = JSON.parse(JSON.stringify(res));
              console.log(this.response1.code);
              this.ngxService_menu.stopLoader('loader-master');
              if (this.response1.code == "SA000") {
                localStorage.setItem("dob_password", (this.tempdataformate).toString());
                setTimeout(() => this.modalReference.close(), 2000);
                if (parseInt(localStorage.getItem("curr_assess_login")) != 1) {
                  if (parseInt(localStorage.getItem("assessment_check")) > 1) {
                    if (parseInt(localStorage.getItem("timercount")) == 0) {
                      this.initTimer()
                      localStorage.setItem("timercount", "1");
                    }
                  }
                }
                this.errorcontent = true;
                this.isbtndisable = true;
                this.colorVal = 'green';
                this.errorcontenttxt = this.menuWords[139] + localStorage.getItem("dob_password");

              }
              else {
                if (this.response1.code == "SA1061" ||
                  this.response1.code == "SA1041" || this.response1.code == "SA1040" || this.response1.code == "SA1039") {
                  localStorage.clear();
                  this.router.navigateByUrl("/login");
                }
                console.log(this.response1.code);
                this.errorcontenttxt = this.response1.message;
                this.errorcontent = true;
              }

            })

      }
      else {
        this.errorcontenttxt = this.menuWords[140];
        this.errorcontent = true;
      }
    }
    else {
      this.errorcontenttxt = this.menuWords[141];
      this.errorcontent = true;
    }
    //////function for DOB password submit -ends//////
  }


  toggle = nav => nav.open = !nav.open;
  @ViewChild('drawer', { static: false }) drawer: MatSidenav;
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

  isBiggerScreen() {
    //////function for getting Big screen -start//////
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
    //////function for getting Big screen -ends//////
  }

  gotoDash() {
    //////function for opening dashboard page -start//////
    console.log("entered gotoDash 1")
    this.top.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.puzzles = false;
    this.dashboard = true;
    this.profile = false;
    this.reports = false;
    this.trophies = false;
    this.skillkit = false;
    this.sbc = false;
    this.isHots = false;
    this.leader = false;
    this.roadmap = false;
    this.PuzzleServ.changehots(this.isHots, this.puzzles)
  }

  gotoPuzzles() {
    //////function for opening puzzles page-start//////
    this.top.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    console.log("entered gotoPuzzles")
    this.puzzles = true;
    this.dashboard = false;
    this.profile = false;
    this.reports = false;
    this.trophies = false;
    this.skillkit = false;
    this.sbc = false;
    this.isHots = false;
    this.leader = false;
    this.roadmap = false;
    this.PuzzleServ.changehots(this.isHots, this.puzzles)
  }
  countsession_report;
  gotoReport() {
    //////function for opening report page-start//////
    this.top.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.puzzles = false;
    this.dashboard = false;
    this.profile = false;
    this.reports = false;
    this.reports1 = true;
    this.trophies = false;
    this.skillkit = false;
    this.sbc = false;
    this.isHots = false;
    this.leader = false;
    this.roadmap = false;
    this.PuzzleServ.changehots(this.isHots, this.puzzles);
    this.countsession_report = setInterval(() => { this.gotoReport1(); }, 20);
  }
  gotoReport1() {
    clearInterval(this.countsession_report);
    this.top.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.reports = true;
    this.reports1 = false;
  }
  gotoRoadmap() {
    //////function for opening roadmap page-start//////
    this.top.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.puzzles = false;
    this.dashboard = false;
    this.profile = false;
    this.reports = false;
    this.roadmap = true;
    this.trophies = false;
    this.skillkit = false;
    this.sbc = false;
    this.isHots = false;
    this.leader = false;
    this.PuzzleServ.changehots(this.isHots, this.puzzles);
    if(localStorage.getItem("roadback")=="1"){
      localStorage.setItem("roadback","0");
      this.dataSharingService.backtoroad.next(1);
    }
  }
  gotoLeader() {
    //////function for opening leader page-start//////
    this.top.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.puzzles = false;
    this.dashboard = false;
    this.profile = false;
    this.reports = false;
    this.trophies = false;
    this.skillkit = false;
    this.sbc = false;
    this.isHots = false;
    this.leader = true;
    this.roadmap = false;
    this.PuzzleServ.changehots(this.isHots, this.puzzles)
  }

  gotoTrophies() {
    //////function for opening trophies page-start//////
    this.top.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.puzzles = false;
    this.dashboard = false;
    this.profile = false;
    this.reports = false;
    this.trophies = true;
    this.skillkit = false;
    this.sbc = false;
    this.isHots = false;
    this.leader = false;
    this.roadmap = false;
    this.PuzzleServ.changehots(this.isHots, this.puzzles)
  }

  gotoExtras() {
    //////function for opening skillkit page-start//////
    this.top.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    console.log("go to extrass")
    this.puzzles = false;
    this.dashboard = false;
    this.profile = false;
    this.reports = false;
    this.trophies = false;
    this.skillkit = true;
    this.sbc = false;
    this.isHots = false;
    this.leader = false;
    this.roadmap = false;
    this.PuzzleServ.changehots(this.isHots, this.puzzles)
  }

  gotoProfile() {
    //////function for opening profile page-start//////
    this.top.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.puzzles = false;
    this.dashboard = false;
    this.profile = true;
    this.reports = false;
    this.trophies = false;
    this.skillkit = false;
    this.sbc = false;
    this.isHots = false;
    this.leader = false;
    this.roadmap = false;
    this.PuzzleServ.changehots(this.isHots, this.puzzles)
  }


  gotoSbc() {
    //////function for opening sbc page-start//////
    this.top.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.puzzles = false;
    this.dashboard = false;
    this.profile = false;
    this.reports = false;
    this.trophies = false;
    this.skillkit = false;
    this.sbc = true;
    this.isHots = false;
    this.leader = false;
    this.roadmap = false;
    this.PuzzleServ.changehots(this.isHots, this.puzzles)
  }

  gotoHots() {
    //////function for opening hots page-start//////
    this.top.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.puzzles = false;
    this.dashboard = false;
    this.profile = false;
    this.reports = false;
    this.trophies = false;
    this.skillkit = false;
    this.sbc = false;
    this.isHots = true;
    this.leader = false;
    this.roadmap = false;
    this.PuzzleServ.changehots(this.isHots, this.puzzles)
  }

  /////////////////////
  isDashRoute: boolean;
  isDashRouteTimer: boolean;
  logoutWord: string;
  uname: string;
  isskillset_16: number;

  potrait_val = true;
  music_arr = ['sound_1.mp3', 'sound_2.mp3', 'sound_3.mp3',
    'sound_4.mp3', 'sound_5.mp3', 'sound_6.mp3'];


  musicon() {
    //////function for bg sound on//////
    this.chk_val = 0;
    if (localStorage.getItem("music_data_status") == "1") {
      this.music_val = true;
      this.music_data.volume = 0.1;
      this.music_data.play();
    }
    else {
      this.music_val = false;
      this.music_data.volume = 0;
      this.music_data.pause();
    }


  }

  music_data;
  music_val = false;
  updatebgm = new updatebgm();
  musiccall(val) {
    if (this.chk_val == 0) {
      if (val == 1) {
        this.updatebgm.bgm = "ON";
      }
      else {
        this.updatebgm.bgm = "OFF";
      }


      this.ngxService_menu.startLoader('loader-master');
      this.updatebgm.uid = localStorage.getItem("uid");
      let date_val: Date;
      date_val = new Date();
      let hash_val = this.ip.gethash(date_val);
      this.updatebgm.timestamp = date_val.toString();
      this.updatebgm.hashcode = hash_val;

      this.MenuService_ts.updatebgmdetails(this.updatebgm).subscribe(
        (res) => {
          this.response = JSON.parse(JSON.stringify(res));

          console.log(this.response)
          if (this.response.code == "SA000") {
            if (val == 1) {
              this.music_val = true;
              this.music_data.volume = 0.1;
              this.music_data.play();
              localStorage.setItem("music_data_status", "1");
            }
            else {
              this.music_val = false;
              this.music_data.volume = 0;
              this.music_data.pause();
              localStorage.setItem("music_data_status", "0");
            }
            this.ngxService_menu.stopLoader('loader-master');

          } else {

            if (this.response.code == "SA1061" ||
              this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
              this.ngxService_menu.stopLoader('loader-master');
              localStorage.clear();
              this.router.navigateByUrl("/login");
            }
          }
        },
        (err) => {
        }
      );

    }


  }
  ngOnInit() {
    //////Initaial function with basic variable definitions  - starts//////
    if (localStorage.getItem("uid") == "" || localStorage.getItem("uid") == null) {
      console.log("uid empty")
      clearInterval(this.countDownTimer);
      clearInterval(this.countsession);
      localStorage.clear();

      this.modalService.dismissAll();
      this.logoutsuss = 1;
      this.router.navigateByUrl('/login');
    } else if ((JSON.parse(localStorage.getItem('langwords') || '[]')).length < 1) {
      console.log("no data called logout")
      clearInterval(this.countDownTimer);
      clearInterval(this.countsession);

      localStorage.clear();

      this.modalService.dismissAll();
      this.logoutsuss = 1;
      this.router.navigateByUrl('/login');
    }
    else {
     
      this.ngxService_menu.startLoader('loader-master');


      this.music_data = new Audio(this.baseurl.soundUrl + this.music_arr[parseInt(localStorage.getItem("music_val")) - 1]);
      this.music_data.addEventListener('ended', function () {
        this.play();
      }, false);
      this.music_data.volume = 0;



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
      this.menuWords = JSON.parse(localStorage.getItem('langwords') || '[]');
      this.logoutWord = this.menuWords[69]
      this.theme.currenttheme.subscribe(themename => this.themechange = themename)
      this.theme.changeTheme(this.theme.themenames[localStorage.getItem("currenttheme")]);



      this.style_dashicontxt = this.styleArr_dashicontxt[parseInt(localStorage.getItem('currentlangNo')) - 1];
      this.style_puzzleicontxt = this.styleArr_puzzleicontxt[parseInt(localStorage.getItem('currentlangNo')) - 1];
      this.style_skillkiticontxt = this.styleArr_skillkiticontxt[parseInt(localStorage.getItem('currentlangNo')) - 1];
      this.style_reporticontxt = this.styleArr_reporticontxt[parseInt(localStorage.getItem('currentlangNo')) - 1];
      this.style_tropyicontxt = this.styleArr_tropyicontxt[parseInt(localStorage.getItem('currentlangNo')) - 1];
      this.style_profileicontxt = this.styleArr_profileicontxt[parseInt(localStorage.getItem('currentlangNo')) - 1];
      this.style_leadericontxt = this.styleArr_leadericontxt[parseInt(localStorage.getItem('currentlangNo')) - 1];



      this.uid = localStorage.getItem("uid");
      this.username = localStorage.getItem("username");
      this.uname = localStorage.getItem("uname");

      this.istimerchange = false;
      this.timeserv.changetime(this.istimerchange)
      this.timeserv.currenttimerchange.subscribe(timeChange => this.istimerchange = timeChange)

      this.isHots = false
      this.puzzles = false
      this.PuzzleServ.changehots(this.isHots, this.puzzles)
      this.PuzzleServ.currenthots.subscribe(
        isHotsChange => (this.isHots = isHotsChange)
      );
      this.PuzzleServ.currenthots1.subscribe(
        isPuzzleChange => (this.puzzles = isPuzzleChange)
      );

      this.getmedvalFn();

    }

    //////Initaial function with basic variable definitions  - ends//////
  }

  getmedvalFn() {
    //////function for getting median value  - starts//////
    this.getmedval.uid = localStorage.getItem("uid");
    this.getmedval.eid = this.event_id;
    this.getmedval.year_status = this.year_status;
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.getmedval.timestamp = date_val.toString();
    this.getmedval.hashcode = hash_val;


    this.MenuService_ts.getmedvaldetails(this.getmedval).subscribe(
      res => {
        console.log(JSON.parse(JSON.stringify(res)));
        this.response = JSON.parse(JSON.stringify(res));
        this.session_master_check();
        if (this.response.code == "SA000") {
          this.medvalArr[0] = this.response.medval[0].mem_medianval;
          this.medvalArr[1] = this.response.medval[0].vp_medianval;
          this.medvalArr[2] = this.response.medval[0].fa_medianval;
          this.medvalArr[3] = this.response.medval[0].ps_medianval;
          this.medvalArr[4] = this.response.medval[0].lin_medianval;

        }
        else {
          if (this.response.code == "SA1061" ||
            this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
            localStorage.clear();
            this.router.navigateByUrl("/login");
          }
        }
      });
    //////function for getting median value  - stops//////
  }


  curr_master_sess_id: string;
  session_master_id = new sessionid();
  session_master_check() {
    //////function for getting session and skillkit status  - starts//////
    this.session_master_id.uid = localStorage.getItem("uid")
    if (!this.session_master_id.uid) {
      this.ngxService_menu.stopLoader('loader-master');
      this.callLogout();
      clearInterval(this.countsession);
    } else {
      console.log(this.sessionid.uid)
      this.MenuService_ts.getSessionid(this.session_master_id).subscribe(res1 => {
        this.response = JSON.parse(JSON.stringify(res1));
        if (this.response.code == "SA000") {
          this.curr_master_sess_id = this.response.current_session_id
          if (this.curr_master_sess_id == localStorage.getItem("session_id")) {
            this.skillkitreq.uid = localStorage.getItem("uid");
            let date_val1: Date;
            date_val1 = new Date();
            let hash_val1 = this.ip.gethash(date_val1);
            this.skillkitreq.timestamp = date_val1.toString();
            this.skillkitreq.hashcode = hash_val1;
            this.SkillkitService_ts.getskillkitdet(this.skillkitreq).subscribe(
              res2 => {
                console.log(JSON.parse(JSON.stringify(res2)));
                this.response = JSON.parse(JSON.stringify(res2));
                if (this.response.code == "SA000") {
                  this.skid = this.response.isskillkit;
                  this.currentskillkit = this.response.isskillkit;
                  if (this.response.isskillkit == 3) {

                    let date_val: Date;
                    date_val = new Date();
                    let hash_val = this.ip.gethash(date_val);
                    this.skillkitreq.timestamp = date_val.toString();
                    this.skillkitreq.hashcode = hash_val;
                    this.SkillkitService_ts.get_skill_lost_cycle(this.skillkitreq).subscribe(
                      res => {
                        console.log(JSON.parse(JSON.stringify(res)));
                        this.response = JSON.parse(JSON.stringify(res));
                        if (this.response.code == "SA000") {
                          this.ngxService_menu.stopLoader('loader-master');
                          this.isskillset_16 = this.response.isskillset;
                          this.dayAfterLoginCheck();
                        }
                        else {
                          if (this.response.code == "SA1061" ||
                            this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
                            localStorage.clear();
                            this.router.navigateByUrl("/login");
                          }
                        }
                      })
                  } else {
                    this.dayAfterLoginCheck();
                  }
                }
                else {
                  console.log("console");
                  if (this.response.code == "SA1061" ||
                    this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
                    localStorage.clear();
                    this.router.navigateByUrl("/login");
                  }
                }
              })
          } else {
            this.session_close_check = 1;
            this.ngxService_menu.stopLoader('loader-master');
            this.callLogout();
          }

        }
      });
    }
    //////function for getting session and skillkit status  - ends//////
  }

  entrytheme: number;
  dayAfterLoginCheck() {
    console.log(localStorage)
    //////function for getting autologin details  - starts//////
    this.logData.userid = localStorage.getItem("uid");
    console.log(this.logData.userid);
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.logData.timestamp = date_val.toString();
    this.logData.hashcode = hash_val;

    if (localStorage.getItem("logcheck") == "1") {
      localStorage.setItem("logcheck", "0");
      this.strapprocessInitfn();
      this.sessionidCheck();
    } else {
      this.ngxService_menu.startLoader('loader-master');

      this.MenuService_ts.getLoginDet(this.logData)
        .subscribe(
          res3 => {

            this.response = JSON.parse(JSON.stringify(res3));
            if (this.response.code == "SA140") {
              localStorage.setItem("logcheck", "0");
              console.log("entered SA140")
              this.strapprocessInitfn();
              this.sessionidCheck()
            }
            else if (this.response.code == "SA000") {
              this.ngxService_menu.startLoader('loader-master');
              if (this.response.result[0].todaydate <= this.response.result[0].enddate) {
                localStorage.clear();
                //////////////
                localStorage.setItem("logcheck", "0");
                localStorage.setItem("username", this.response.result[0].user_name);
                localStorage.setItem("uname", this.response.result[0].name);
                localStorage.setItem("uid", this.response.result[0].id);
                localStorage.setItem("Branch_id_val", this.response.result[0].branch_id);
                localStorage.setItem("Section_id_val", this.response.result[0].section_id);
                console.log(this.response.result[0])

                /////////////////Theme & Lang////////////////
                this.entrytheme = this.response.result[0].selected_theme - 1;
                this.theme.changeTheme(this.theme.themenames[this.entrytheme]);
                localStorage.setItem("currenttheme", this.entrytheme.toString());
                localStorage.setItem("currentlang", this.response.result[0].selected_lang);
                localStorage.setItem("logincount", this.response.logincount);
                localStorage.setItem("isschedule", this.response.isschedule);
                localStorage.setItem("justlogged", "0");
                localStorage.setItem("year_status", this.response.result[0].current_year_status);
                localStorage.setItem("eid", "1");
                localStorage.setItem("playedtime", this.response.playedtime);
                localStorage.setItem("totaltime", this.response.result[0].total_time);
                localStorage.setItem("isskillkit", this.response.result[0].isskillkit);
                localStorage.setItem("loginpopupskillkit", "0");
                localStorage.setItem("loginpopupskillkit_date", "0");
                localStorage.setItem("loginpopupgames", "0");
                localStorage.setItem("loginpopupgames_date", "0");
                localStorage.setItem("timercount", "1");
                localStorage.setItem("assessment_check", this.response.assessment_check);
                localStorage.setItem("curr_assess_login", this.response.curr_assess);
                localStorage.setItem("event_label_status", "0");
                localStorage.setItem("isdark", this.response.result[0].select_base_theme);
                if (parseInt(localStorage.getItem("logincount")) == 1) {
                  localStorage.setItem("timercount", "0");
                }
                this.lang.loadSiteWords(this.response.result[0].selected_lang, 0);

                ////
                localStorage.setItem("puzzleReturnStatus", (0).toString())
                localStorage.setItem("returnSkillkitGamesPlay", (0).toString())
                localStorage.setItem("hotsReturnStatus", (0).toString());
                localStorage.setItem("sbcReturnStatus", (0).toString())
                localStorage.setItem("sbcgamesstatus", "0");
                localStorage.setItem("currentlangNo", this.response.result[0].selected_lang);
                localStorage.setItem("roadmap_chk", '0');

                if (this.response.result[0].bgm == "ON") {
                  localStorage.setItem("music_data_status", "1");
                }
                else {
                  localStorage.setItem("music_data_status", "0");
                }
                localStorage.setItem("isfullschudle_stored", this.response.result[0].isfullschudle);

                localStorage.setItem("rep3_needleValue", '0');
                localStorage.setItem("rep4_needleValue", '0');
                localStorage.setItem("rep5_needleValue", '0');
                localStorage.setItem("dash_needleValue", '0');
                localStorage.setItem("pro_dob", this.response.result[0].dob);
                localStorage.setItem("music_val", this.response.result[0].selected_music);
                localStorage.setItem("roadReturnStatus", (0).toString());
                localStorage.setItem("roadback", (0).toString());
                this.gen();
              } else {
                this.ngxService_menu.stopLoader('loader-master');
                this.callLogout()
              }

            }
            else {
              if (this.response.code == "SA1061" ||
                this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
                localStorage.clear();
                this.router.navigateByUrl("/login");
              }
              console.log("coming2")
              this.ngxService_menu.stopLoader('loader-master');
              this.callLogout();
            }
          }
          ,
          (err) => {
            console.log(err)
          });
    }
    //////function for getting autologin details  - ends//////
  }

  public list: string[] = [];
  session_id = new sessionid();
  gen() {
    //////function for getting session details and setting geolocation  - starts//////
    this.list.push(uuid());
    console.log(this.list[0])
    this.session_id.uid = localStorage.getItem("uid")
    this.session_id.sessionid = this.list[0];

    this.ngxService_menu.startLoader('loader-master');
    this.LoginAPIService_ts.setSessionid(this.session_id).
      subscribe(res4 => {

        this.response = JSON.parse(JSON.stringify(res4));
        console.log(this.response)

        if (this.response.code == "SA000") {
          localStorage.setItem("session_id", this.list[0]);
          this.ip.getIPAddress().subscribe((res5: any) => {

            this.ipAddress = res5.ip;
            localStorage.setItem("my_ip", this.ipAddress.toString())
            console.log("this.ipAddress" + this.ipAddress);
            if (localStorage.getItem("my_ip") != "") {
              this.ngxService_menu.startLoader('loader-master');
              this.ip.getUser().subscribe(res6 => {

                this.response = JSON.parse(JSON.stringify(res6));
                console.log(this.response);
                console.log(this.response.geoplugin_countryName);
                console.log(this.response.geoplugin_city);
                let date_val: Date;
                date_val = new Date();
                let hash_val = this.ip.gethash(date_val);

                this.insertlocation.uid = localStorage.getItem("uid");
                this.insertlocation.year_status = 1;
                this.insertlocation.timestamp = date_val.toString();
                this.insertlocation.hashcode = hash_val;
                this.insertlocation.city = this.response.geoplugin_city;
                this.insertlocation.region = this.response.geoplugin_region;
                this.insertlocation.country = this.response.geoplugin_countryName;

                this.LoginAPIService_ts.insertlocationDetails(this.insertlocation).subscribe(res => {
                  this.response = JSON.parse(JSON.stringify(res));
                  if (this.response.code == "SA000") {
                    this.strapprocessInitfn();
                    this.sessionidCheck();
                  }
                  else {
                    console.log(this.response.code);
                    if (this.response.code == "SA1061" ||
                      this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
                      localStorage.clear();
                      this.router.navigateByUrl("/login");
                    }
                  }
                })
              })
            }
            else {
              this.ngOnInit();
            }
          });

        }
      });
    //////function for getting session details and setting geolocation  - ends//////
  }
  sessionid = new session_id();
  curr_sess_id: any;
  countsession;
  mySession: any;
  sessionidCheck() {
    //////function for session chking loop  - starts//////
    this.sessionidCheck_time();
  }
  session_close_check: number = 0;
  sessionidCheck_time() {

    this.sessionid.uid = localStorage.getItem("uid");


    this.countsession = setInterval(() => {

      if (!this.sessionid.uid) {
        this.callLogout()
        clearInterval(this.countsession);
      } else {
        console.log(this.sessionid.uid)
        this.MenuService_ts.getSessionid(this.sessionid).subscribe(res => {
          this.response = JSON.parse(JSON.stringify(res));
          if (this.response.code == "SA000") {
            this.curr_sess_id = this.response.current_session_id
            if (this.curr_sess_id == localStorage.getItem("session_id")) {
              console.log("this.curr_sess_id == localStorage.getItem session_id");
            } else {
              this.session_close_check = 1;
              this.callLogout();
            }

          }
        });
      }

    }, 10000);
    //////function for session chking loop  - ends//////
  }


  strapprocessInitfn() {
    //////function for feedback completed chk and auto call initial page   - starts//////
    console.log("strapprocessInitfn")
    if (localStorage.getItem("uid") == "" || localStorage.getItem("uid") == null) {
      this.router.navigateByUrl('/login');
    } else {
      /////////////////
      let date_val: Date;
      date_val = new Date();
      let hash_val = this.ip.gethash(date_val);
      this.chkfbdata.timestamp = date_val.toString();
      this.chkfbdata.hashcode = hash_val;
      this.chkfbdata.uid = localStorage.getItem("uid");
      this.chkfbdata.year_status = this.year_status;
      console.log(this.chkfbdata);
      this.ngxService_menu.startLoader('loader-master');
      this.MenuService_ts.chkfbdatadetails(this.chkfbdata)
        .subscribe(
          res => {
            this.response1 = JSON.parse(JSON.stringify(res));
            console.log(this.response1.chkfbdata);
            if (this.response1.code == "SA000") {

              if (this.response1.chkfbdata.length == 0) {
                this.newfbchkvar = 1;
                localStorage.setItem("newfbchkvar", (1).toString())
              }
              else {
                this.newfbchkvar = 0;
                localStorage.setItem("newfbchkvar", (0).toString())
              }


              if (parseInt(localStorage.getItem("curr_assess_login")) == 1) {
                this.callgotoPuzzlesFn();
              }
              else if (parseInt(localStorage.getItem("assessment_check")) == 0 || parseInt(localStorage.getItem("assessment_check")) == 1) {
                this.callgotoPuzzlesFn();
              } else {
                console.log("entered here1")
                this.isDashRoute = true;
                this.isDashRouteTimer = true;


                if (parseInt(localStorage.getItem("timercount")) == 0) {
                  this.timerStartVal = parseInt(localStorage.getItem("playedtime"))
                  this.checkPuzzle();
                  this.call();
                  console.log("checkPuzzle 2")
                } else {
                  this.getTimeDet.uid = localStorage.getItem("uid")
                  console.log("checkPuzzle getTimeDet")
                  let date_val2: Date;
                  date_val2 = new Date();
                  let hash_val2 = this.ip.gethash(date_val2);
                  this.getTimeDet.timestamp = date_val2.toString();
                  this.getTimeDet.hashcode = hash_val2;
                  this.ngxService_menu.startLoader('loader-master');
                  this.MenuService_ts.getTime(this.getTimeDet)
                    .subscribe(
                      res7 => {
                        this.response = JSON.parse(
                          JSON.stringify(res7));

                        if (this.response.code == "SA000") {
                          localStorage.setItem("playedtime", this.response.played_time);
                          localStorage.setItem("assessment_check", this.response.assessment_check);
                          this.timerStartVal = this.response.played_time
                          console.log("checkPuzzle 3")
                          this.initTimer()
                          this.checkPuzzle();

                        }
                        else {
                          if (this.response.code == "SA1061" ||
                            this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
                            localStorage.clear();
                            this.router.navigateByUrl("/login");
                          }
                        }
                      })
                }
              }

            }
            else {
              console.log(this.response1.code);
              if (this.response1.code == "SA1061" ||
                this.response1.code == "SA1041" || this.response1.code == "SA1040" || this.response1.code == "SA1039") {
                localStorage.clear();
                this.router.navigateByUrl("/login");
              }
            }
          })
      ////////////
    }
    //////function for feedback completed chk and auto call initial page   - ends//////
  }

  callgotoPuzzlesFn() {
    this.ngxService_menu.stopLoader('loader-master');
    this.gotoPuzzles();
    this.checkPuzzle();
    this.isDashRoute = false;
    this.isDashRouteTimer = false;
  }
  checkPuzzle() {
    //////function for resulting to profile or other pages directly   - starts//////
    if (parseInt(localStorage.getItem("profileReturnStatus")) == 1) {
      this.ngxService_menu.stopLoader('loader-master');
      this.gotoProfile();
      this.MenuprofileReturnStatus = 1;
      localStorage.setItem("profileReturnStatus", (0).toString())
    }

    if (parseInt(localStorage.getItem("puzzleReturnStatus")) == 1) {
      this.ngxService_menu.stopLoader('loader-master');
      this.puzzleOrskillkitStatus = 1;
      this.gotoPuzzles();
      localStorage.setItem("puzzleReturnStatus", (0).toString())
    }
    if (parseInt(localStorage.getItem("returnSkillkitGamesPlay")) == 1) {
      this.ngxService_menu.stopLoader('loader-master');
      this.gotoExtras();
      localStorage.setItem("returnSkillkitGamesPlay", (0).toString())
    }
    if (parseInt(localStorage.getItem("hotsReturnStatus")) == 1) {
      this.ngxService_menu.stopLoader('loader-master');
      this.gotoHots();
      localStorage.setItem("hotsReturnStatus", (0).toString());
    }
    if (parseInt(localStorage.getItem("sbcReturnStatus")) == 1 || localStorage.getItem("sbcgamesstatus") == "1") {
      this.ngxService_menu.stopLoader('loader-master');
      this.gotoSbc();
      localStorage.setItem("sbcReturnStatus", (0).toString())
      localStorage.setItem("sbcgamesstatus", "0");
    }
    console.log("checkPuzzle 4")

    this.checkskillkit();
    //////function for resulting to profile or other pages directly   - starts//////
  }

  startTimer(duration, display) {
    //////function for timer   - starts//////
    let timer = duration, minutes, seconds;

    this.countDownTimer = setInterval(() => {
      minutes = timer / 60;
      seconds = timer % 60;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = parseInt(minutes) + ":" + seconds;

      if (timer % 60 == 0) {
        if (this.timerEntry == 0) {
          this.timerEntry = 1;
        } else {
          this.getCurrentTimerVal.uid = localStorage.getItem("uid")
          this.getCurrentTimerVal.currenttime = timer / 60;
          let date_val: Date;
          date_val = new Date();
          let hash_val = this.ip.gethash(date_val);
          this.getCurrentTimerVal.timestamp = date_val.toString();
          this.getCurrentTimerVal.hashcode = hash_val;

          this.MenuService_ts.setTime(this.getCurrentTimerVal).subscribe(
            res => {
              console.log(JSON.parse(JSON.stringify(res)));
              this.response = JSON.parse(JSON.stringify(res));
              if (this.response.code == "SA000") {
                console.log("success");
              }
              else {
                if (this.response.code == "SA1061" ||
                  this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
                  localStorage.clear();
                  this.router.navigateByUrl("/login");
                }
              }
            })
          console.log("console.log(timer)" + timer)
        }
      }

      if (--timer < 0) {
        if (timer == -1) {
          console.log("coming timer change " + this.istimerchange)
          this.istimerchange = true;
          this.timeserv.changetime(this.istimerchange)
        }
        clearInterval(this.countDownTimer);
      }
    }, 1000);
    //////function for timer   - ends//////
  }
  timerentry: number = 0
  initTimer() {
    //////function for timer eligibility chk  - starts//////
    if (parseInt(localStorage.getItem("curr_assess_login")) == 4 ||
      parseInt(localStorage.getItem("curr_assess_login")) == 5 || parseInt(localStorage.getItem("curr_assess_login")) == 6 ||
      parseInt(localStorage.getItem("curr_assess_login")) == 3 || parseInt(localStorage.getItem("ass_status")) == 3) {
      this.isDashRouteTimer = false;
      console.log("coming timer false")
    } else {
      console.log("coming timer true" + this.isDashRouteTimer)
      if (this.timerentry == 0) {
        const totalMin = 60 * this.timerStartVal;
        console.log("total min   " + totalMin)
        if (parseInt(localStorage.getItem("timercount")) != 0) {
          this.display = document.querySelector('#time');
        }
        console.log(this.display)
        // Start the tiemr
        this.startTimer(totalMin, this.display);
        this.timerentry++;
      }
    }
    //////function for timer eligibility chk  - ends//////
  }
  close_uid = new session_id()
  callLogout() {
    //////function for logout popup  - starts//////
    if (this.session_close_check == 1) {
      clearInterval(this.countDownTimer);
      clearInterval(this.countsession);

      this.music_data.pause();
      localStorage.clear();

      this.modalService.dismissAll();
      this.logoutsuss = 1;
      this.router.navigateByUrl('/login');
    } else {
      this.close_uid.uid = localStorage.getItem("uid");
      this.MenuService_ts.session_close(this.close_uid).subscribe(
        res => {
          console.log(JSON.parse(JSON.stringify(res)));
          this.response = JSON.parse(JSON.stringify(res));
          if (this.response.code == "SA000") {
            clearInterval(this.countDownTimer);
            clearInterval(this.countsession);

            this.music_data.pause();
            localStorage.clear();
            this.modalService.dismissAll();
            this.logoutsuss = 1;
            this.router.navigateByUrl('/login');
          }

        })
    }
    //////function for logout popup  - ends//////
  }

  logoutModal() {
    //////function for logout popup open - starts//////
    if (this.logoutsuss == 0) {
      this.modalService.open(this.logout, { centered: true });

    }
    //////function for logout popup open - ends//////
  }
  checkskillkit() {
    //////function for getting getisfullschudle - starts//////
    this.getisfullschudle.uid = this.uid;
    this.getisfullschudle.year_status = this.year_status;
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.getisfullschudle.timestamp = date_val.toString();
    this.getisfullschudle.hashcode = hash_val;
    this.ngxService_menu.startLoader('loader-master');
    this.DashboardAPIService_ts.getisfullschudleDetails(this.getisfullschudle).subscribe(
      res => {
        this.response2 = JSON.parse(JSON.stringify(res));

        if (this.response2.code == "SA000") {
          this.isfullschudle = this.response2.isfullschudle[0].isfullschudle;
          if (this.isfullschudle == 0) {
            console.log("this.skid" + this.skid)
            console.log("this.currentskillkit" + this.currentskillkit)
            this.chkskillkit = false;
            this.chkpuzzle = true;
            this.showpuzzlefirst();
          }
          else {
            console.log("this.skid" + this.skid)
            console.log("this.currentskillkit" + this.currentskillkit)
            if (this.skid == 0 || this.isskillset_16 == 0) {

              this.chkskillkit = false;
              this.chkpuzzle = true;
              this.showpuzzlefirst();
            } else {
              this.chkSkills();
            }
          }

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
    //////function for getting getisfullschudle - ends//////
  }


  chkSkills() {
    //////function for getting skillkit games eligibility - starts//////
    console.log("coming chkskills")
    this.skillcheck.uid = this.uid;
    this.skillcheck.skid = this.skid;
    this.skillcheck.year_status = this.year_status;
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.skillcheck.timestamp = date_val.toString();
    this.skillcheck.hashcode = hash_val;
    this.ngxService_menu.startLoader('loader-master');
    this.SkillkitService_ts.checkSkilllist(this.skillcheck)
      .subscribe(
        res => {
          this.response = JSON.parse(JSON.stringify(res));
          console.log(this.response)
          console.log("skillkit checking")
          if (this.response.code == "SA000") {
            this.ugrade = this.response.grade;
            if (this.response.daychkval == 0) {
              let date_val3: Date;
              date_val3 = new Date();
              let hash_val3 = this.ip.gethash(date_val3);
              this.skillcheck.timestamp = date_val3.toString();
              this.skillcheck.hashcode = hash_val3;
              this.ngxService_menu.startLoader('loader-master');
              this.SkillkitService_ts.get_skill_detail(this.skillcheck).subscribe(
                res8 => {
                  console.log(JSON.parse(JSON.stringify(res8)));
                  this.response = JSON.parse(JSON.stringify(res8));
                  if (this.response.code == "SA000") {
                    this.mavg = parseInt(this.response.result[0].avg_m_score);
                    this.vavg = parseInt(this.response.result[0].avg_v_score);
                    this.favg = parseInt(this.response.result[0].avg_f_score);
                    this.pavg = parseInt(this.response.result[0].avg_p_score);
                    this.lavg = parseInt(this.response.result[0].avg_l_score);
                    this.medianval = this.response.medianval[0].medianval;
                    this.mem_medianval = this.response.medianval[0].mem_medianval;
                    this.vp_medianval = this.response.medianval[0].vp_medianval;
                    this.fa_medianval = this.response.medianval[0].fa_medianval;
                    this.ps_medianval = this.response.medianval[0].ps_medianval;
                    this.lin_medianval = this.response.medianval[0].lin_medianval;
                    localStorage.setItem("isskillkit", this.response.skill_id);
                    if (this.mavg < this.mem_medianval) {
                      this.eligibleSkills[0] = 1;
                      if ((this.mavg < this.mem_medianval) && (this.mavg >= (this.mem_medianval - 5))) {
                        if (this.ugrade == 1 || this.ugrade == 2)
                          this.eligibleSkillsGrade[0] = 1;
                        else
                          this.eligibleSkillsGrade[0] = (this.ugrade - 1);
                      }
                      else {
                        if (this.ugrade == 1 || this.ugrade == 2)
                          this.eligibleSkillsGrade[0] = 1;
                        else
                          this.eligibleSkillsGrade[0] = (this.ugrade - 2);
                      }
                    } else {
                      this.eligibleSkills[0] = 0;
                      this.eligibleSkillsGrade[0] = -9;
                    }

                    if (this.vavg < this.vp_medianval) {
                      this.eligibleSkills[1] = 1;
                      if ((this.vavg < this.vp_medianval) && (this.vavg >= (this.vp_medianval - 5))) {
                        if (this.ugrade == 1 || this.ugrade == 2)
                          this.eligibleSkillsGrade[1] = 1;
                        else
                          this.eligibleSkillsGrade[1] = (this.ugrade - 1);
                      }
                      else {
                        if (this.ugrade == 1 || this.ugrade == 2)
                          this.eligibleSkillsGrade[1] = 1;
                        else
                          this.eligibleSkillsGrade[1] = (this.ugrade - 2);
                      }
                    } else {
                      this.eligibleSkills[1] = 0;
                      this.eligibleSkillsGrade[1] = -9;
                    }

                    if (this.favg < this.fa_medianval) {
                      this.eligibleSkills[2] = 1;
                      if ((this.favg < this.fa_medianval) && (this.favg >= (this.fa_medianval - 5))) {
                        if (this.ugrade == 1 || this.ugrade == 2)
                          this.eligibleSkillsGrade[2] = 1;
                        else
                          this.eligibleSkillsGrade[2] = (this.ugrade - 1);
                      }
                      else {
                        if (this.ugrade == 1 || this.ugrade == 2)
                          this.eligibleSkillsGrade[2] = 1;
                        else
                          this.eligibleSkillsGrade[2] = (this.ugrade - 2);
                      }
                    } else {
                      this.eligibleSkills[2] = 0;
                      this.eligibleSkillsGrade[2] = -9;
                    }

                    if (this.pavg < this.ps_medianval) {
                      this.eligibleSkills[3] = 1;
                      if ((this.pavg < this.ps_medianval) && (this.pavg >= (this.ps_medianval - 5))) {
                        if (this.ugrade == 1 || this.ugrade == 2)
                          this.eligibleSkillsGrade[3] = 1;
                        else
                          this.eligibleSkillsGrade[3] = (this.ugrade - 1);
                      }
                      else {
                        if (this.ugrade == 1 || this.ugrade == 2)
                          this.eligibleSkillsGrade[3] = 1;
                        else
                          this.eligibleSkillsGrade[3] = (this.ugrade - 2);
                      }
                    } else {
                      this.eligibleSkills[3] = 0;
                      this.eligibleSkillsGrade[3] = -9;
                    }

                    if (this.lavg < this.lin_medianval) {
                      this.eligibleSkills[4] = 1;
                      if ((this.lavg < this.lin_medianval) && (this.lavg >= (this.lin_medianval - 5))) {
                        if (this.ugrade == 1 || this.ugrade == 2)
                          this.eligibleSkillsGrade[4] = 1;
                        else
                          this.eligibleSkillsGrade[4] = (this.ugrade - 1);
                      }
                      else {
                        if (this.ugrade == 1 || this.ugrade == 2)
                          this.eligibleSkillsGrade[4] = 1;
                        else
                          this.eligibleSkillsGrade[4] = (this.ugrade - 2);
                      }

                    } else {
                      this.eligibleSkills[4] = 0;
                      this.eligibleSkillsGrade[4] = -9;
                    }

                    var count = 0;
                    for (this.i = 0; this.i < 5; this.i++) {
                      if (this.eligibleSkills[this.i] == 1) {
                        count++
                      }
                    }

                    if (count > 0) {
                      this.usereligiblity = true;
                      this.skillkitstatus.skillcnt = count;
                    }
                    else {
                      this.usereligiblity = false;
                    }
                    localStorage.setItem("eligibleSkills", JSON.stringify(this.eligibleSkills));
                    localStorage.setItem("eligibleSkillsGrade", JSON.stringify(this.eligibleSkillsGrade));
                    this.showSkillkit();
                  }
                  else {
                    if (this.response.code == "SA1061" ||
                      this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
                      localStorage.clear();
                      this.router.navigateByUrl("/login");
                    }
                  }
                })
            } else if (this.response.daychkval == 1) {
              this.chkskillkit = false;
              this.chkpuzzle = true;
              this.showpuzzlefirst();
            } else if (this.response.daychkval == 2) {
              let date_val4: Date;
              date_val4 = new Date();
              let hash_val4 = this.ip.gethash(date_val4);
              this.skillcheck.timestamp = date_val4.toString();
              this.skillcheck.hashcode = hash_val4;
              this.ngxService_menu.startLoader('loader-master');
              this.SkillkitService_ts.get_skill_detail(this.skillcheck).subscribe(
                res9 => {
                  console.log(JSON.parse(JSON.stringify(res9)));
                  this.response = JSON.parse(JSON.stringify(res9));
                  if (this.response.code == "SA000") {
                    this.mavg = parseInt(this.response.result[0].avg_m_score);
                    this.vavg = parseInt(this.response.result[0].avg_v_score);
                    this.favg = parseInt(this.response.result[0].avg_f_score);
                    this.pavg = parseInt(this.response.result[0].avg_p_score);
                    this.lavg = parseInt(this.response.result[0].avg_l_score);
                    this.medianval = this.response.medianval[0].medianval;
                    this.mem_medianval = this.response.medianval[0].mem_medianval;
                    this.vp_medianval = this.response.medianval[0].vp_medianval;
                    this.fa_medianval = this.response.medianval[0].fa_medianval;
                    this.ps_medianval = this.response.medianval[0].ps_medianval;
                    this.lin_medianval = this.response.medianval[0].lin_medianval;
                    localStorage.setItem("isskillkit", this.response.skill_id)
                    if (this.mavg < this.mem_medianval) {
                      this.eligibleSkills[0] = 1;
                      if ((this.mavg < this.mem_medianval) && (this.mavg >= (this.mem_medianval - 5))) {
                        if (this.ugrade == 1 || this.ugrade == 2)
                          this.eligibleSkillsGrade[0] = 1;
                        else
                          this.eligibleSkillsGrade[0] = (this.ugrade - 1);
                      }
                      else {
                        if (this.ugrade == 1 || this.ugrade == 2)
                          this.eligibleSkillsGrade[0] = 1;
                        else
                          this.eligibleSkillsGrade[0] = (this.ugrade - 2);
                      }
                    } else {
                      this.eligibleSkills[0] = 0;
                      this.eligibleSkillsGrade[0] = -9;
                    }

                    if (this.vavg < this.vp_medianval) {
                      this.eligibleSkills[1] = 1;
                      if ((this.vavg < this.vp_medianval) && (this.vavg >= (this.vp_medianval - 5))) {
                        if (this.ugrade == 1 || this.ugrade == 2)
                          this.eligibleSkillsGrade[1] = 1;
                        else
                          this.eligibleSkillsGrade[1] = (this.ugrade - 1);
                      }
                      else {
                        if (this.ugrade == 1 || this.ugrade == 2)
                          this.eligibleSkillsGrade[1] = 1;
                        else
                          this.eligibleSkillsGrade[1] = (this.ugrade - 2);
                      }
                    } else {
                      this.eligibleSkills[1] = 0;
                      this.eligibleSkillsGrade[1] = -9;
                    }

                    if (this.favg < this.fa_medianval) {
                      this.eligibleSkills[2] = 1;
                      if ((this.favg < this.fa_medianval) && (this.favg >= (this.fa_medianval - 5))) {
                        if (this.ugrade == 1 || this.ugrade == 2)
                          this.eligibleSkillsGrade[2] = 1;
                        else
                          this.eligibleSkillsGrade[2] = (this.ugrade - 1);
                      }
                      else {
                        if (this.ugrade == 1 || this.ugrade == 2)
                          this.eligibleSkillsGrade[2] = 1;
                        else
                          this.eligibleSkillsGrade[2] = (this.ugrade - 2);
                      }
                    } else {
                      this.eligibleSkills[2] = 0;
                      this.eligibleSkillsGrade[2] = -9;
                    }

                    if (this.pavg < this.ps_medianval) {
                      this.eligibleSkills[3] = 1;
                      if ((this.pavg < this.ps_medianval) && (this.pavg >= (this.ps_medianval - 5))) {
                        if (this.ugrade == 1 || this.ugrade == 2)
                          this.eligibleSkillsGrade[3] = 1;
                        else
                          this.eligibleSkillsGrade[3] = (this.ugrade - 1);
                      }
                      else {
                        if (this.ugrade == 1 || this.ugrade == 2)
                          this.eligibleSkillsGrade[3] = 1;
                        else
                          this.eligibleSkillsGrade[3] = (this.ugrade - 2);
                      }
                    } else {
                      this.eligibleSkills[3] = 0;
                      this.eligibleSkillsGrade[3] = -9;
                    }

                    if (this.lavg < this.lin_medianval) {
                      this.eligibleSkills[4] = 1;
                      if ((this.lavg < this.lin_medianval) && (this.lavg >= (this.lin_medianval - 5))) {
                        if (this.ugrade == 1 || this.ugrade == 2)
                          this.eligibleSkillsGrade[4] = 1;
                        else
                          this.eligibleSkillsGrade[4] = (this.ugrade - 1);
                      }
                      else {
                        if (this.ugrade == 1 || this.ugrade == 2)
                          this.eligibleSkillsGrade[4] = 1;
                        else
                          this.eligibleSkillsGrade[4] = (this.ugrade - 2);
                      }

                    } else {
                      this.eligibleSkills[4] = 0;
                      this.eligibleSkillsGrade[4] = -9;
                    }

                    var count = 0;
                    for (this.i = 0; this.i < 5; this.i++) {
                      if (this.eligibleSkills[this.i] == 1) {
                        count++
                      }
                    }

                    if (count > 0) {
                      this.usereligiblity = true;
                      this.skillkitstatus.skillcnt = count;
                    }
                    else {
                      this.usereligiblity = false;
                    }
                    localStorage.setItem("eligibleSkills", JSON.stringify(this.eligibleSkills));
                    localStorage.setItem("eligibleSkillsGrade", JSON.stringify(this.eligibleSkillsGrade));
                    this.showSkillkit1();
                  }
                  else {
                    if (this.response.code == "SA1061" ||
                      this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
                      localStorage.clear();
                      this.router.navigateByUrl("/login");
                    }
                  }
                })
            }
          }
          else {
            if (this.response.code == "SA1061" ||
              this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
              localStorage.clear();
              this.router.navigateByUrl("/login");
            }
          }
        })
    //////function for getting skillkit games eligibility - ends//////
  }

  showSkillkit() {
    //////function for showing puzzles or skillkit with timer - starts//////
    if (this.usereligiblity == true) {
      this.isDashRouteTimer = false;
      clearInterval(this.countDownTimer);
      this.chkskillkit = true;
      this.chkpuzzle = false;
      this.showskillkitfirst();
    } else {
      this.chkskillkit = false;
      this.chkpuzzle = true;
      this.showpuzzlefirst();
      console.log("chkpuzzle  1" + this.chkpuzzle)
    }
    //////function for showing puzzles or skillkit with timer - ends//////
  }
  showSkillkit1() {
    //////function for showing puzzles or skillkit - starts//////
    if (this.usereligiblity == true) {
      this.chkskillkit = true;
      this.chkpuzzle = true;
      this.showskillkitfirst();
    } else {
      this.chkskillkit = false;
      this.chkpuzzle = true;
      this.showpuzzlefirst();
      console.log("chkpuzzle  1" + this.chkpuzzle)
    }
    //////function for showing puzzles or skillkit - ends//////
  }


  checkskillkitcompletestatus() {
    //////function for skillkit complete status  - starts//////
    this.skillkitstatus.uid = this.uid;
    this.skillkitstatus.event_id = this.event_id;
    this.skillkitstatus.skillid = this.skid;
    this.skillkitstatus.year_status = this.year_status;
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.skillkitstatus.timestamp = date_val.toString();
    this.skillkitstatus.hashcode = hash_val;

    this.MenuService_ts.checkSkillkitStatus(this.skillkitstatus)
      .subscribe(
        res => {
          this.response = JSON.parse(JSON.stringify(res));
          console.log(this.response);
          if (this.response.code == "SA000") {
            if (this.response.skillkitstatus == 1) {
              this.chkskillkit = true;
              this.chkpuzzle = false;
              this.showskillkitfirst();
              this.isDashRouteTimer = false;
              clearInterval(this.countDownTimer);
              console.log("chkpuzzle  1" + this.chkpuzzle)

            }
            else {
              this.chkskillkit = false;
              this.chkpuzzle = true;
              this.showpuzzlefirst();
              console.log("chkpuzzle  1" + this.chkpuzzle)

            }

          }
          else {
            console.log(this.response.code);
            if (this.response.code == "SA1061" ||
              this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
              localStorage.clear();
              this.router.navigateByUrl("/login");
            }
          }
        })
    //////function for skillkit complete status  - ends//////
  }

  infoFn() {
    //////function for dashboard info popup open - starts//////
    this.modalService.open(this.dashinfo, { centered: true });
  }
  showpuzzlefirst() {
    //////function for puzzles page open - starts//////
    this.ngxService_menu.stopLoader('loader-master');
    this.dashboard = false;
    if (localStorage.getItem("roadReturnStatus") == "0") {
      if (this.MenuprofileReturnStatus == 1) {
        this.puzzles = false;
      }
      else {
        if (localStorage.getItem("roadmap_chk") == '1') {
          localStorage.setItem("roadmap_chk", '0');
          this.profile = true;
        } else {
          this.puzzles = true;
        }
      }
    }
    else {
      localStorage.setItem("roadReturnStatus", (0).toString());
      this.leader = true;
    }
    //////function for puzzles page open - ends//////
  }
  showskillkitfirst() {
    //////function for skillkit page open - starts//////
    this.ngxService_menu.stopLoader('loader-master');
    this.dashboard = false;
    if (localStorage.getItem("roadReturnStatus") == "0") {
      if (this.puzzleOrskillkitStatus == 0) {
        if (this.MenuprofileReturnStatus == 1) {
          this.skillkit = false;
        }
        else {
          if (localStorage.getItem("roadmap_chk") == '1') {
            localStorage.setItem("roadmap_chk", '0');
            this.profile = true;
          } else {
            this.skillkit = true;
          }
        }
      }
      else {
        if (this.MenuprofileReturnStatus == 1) {
          this.puzzles = false;
        }
        else {
          if (localStorage.getItem("roadmap_chk") == '1') {
            localStorage.setItem("roadmap_chk", '0');
            this.profile = true;
          } else {
            this.puzzles = true;
          }

        }
      }
    }
    else {
      localStorage.setItem("roadReturnStatus", (0).toString());
      this.leader = true;
    }
    //////function for skillkit page open - ends//////
  }

}

