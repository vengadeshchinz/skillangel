import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { accLogin, sessionid, getUsername, insertlocation, login_otp_SA, otpverification_SA, newpwd_SA } from ".././services/login/loginAPI";
import { LoginAPIService } from ".././services/login/login-api.service";
import { ThemeService } from "../services/profile/theme.service";
import { LanguageService } from "../services/profile/language.service";
import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { v4 as uuid } from 'uuid';
import { DatasharingServiceService } from "../services/ip/datasharing-service.service";
import { IpService } from '../services/ip/ip.service';
import { url } from ".././services/baseurl";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  //////login variables declaration//////
  newpwd_SA = new newpwd_SA();
  hashcode_api = 'B2C@Ed$6';
  login_otp_SA = new login_otp_SA();
  otpverification_SA = new otpverification_SA();
  ipAddress: any;
  insertlocation = new insertlocation();
  isUserLoggedIn: boolean;
  auth2: any;
  fb_val = 0;
  getUsername = new getUsername();
  @ViewChild('loginRef', { static: true }) loginElement: ElementRef;
  @ViewChild("schedule", { static: false }) schedule;
  @ViewChild("crctschedule", { static: false }) crctschedule;
  @ViewChild("sessionshow", { static: false }) sessionshow;
  display: any;
  @ViewChild('timeset', { static: true }) timeinput: ElementRef<any>;
  ngAfterViewInit() {
    console.log(this.timeinput)
    // if (this.opt_btn1==true) {
    this.display = this.timeinput.nativeElement;

    // }
    // this.display = this.input.nativeElement;
  }
  accLogin = new accLogin();
  public username: string;
  public password: string;
  response: any;
  response1: any;
  entrytheme: number;
  themechange: any;
  entrylang: number;
  langtxt: any;
  langmap = new Map();
  langresponse: any;
  errmsg: string;
  iserr: boolean;
  model_val = true;
  istimer: boolean = false;
  //////login variables declaration//////
  loginfn() {
    clearTimeout(this.timelimt_val);
    location.reload();
  }
  ngOnInit() {
    //////Initaial function with basic variable definitions  - starts//////
    this.iserr = false;
    console.log(localStorage.getItem("uid"));
    localStorage.setItem("hashcode_api", this.hashcode_api);
    if (
      localStorage.getItem("uid") != "" &&
      localStorage.getItem("uid") != null
    ) {
      this.router.navigateByUrl("/menu");
    }
    else {
      this.callLanguages();
      this.fbLibrary();
    }
    //////Initaial function with basic variable definitions  - ends//////
  }


  sessionModal() {
    //////function for opening session popup  - starts//////
    this.modalService.open(this.sessionshow, {
      centered: true,
      backdrop: "static"
    });
    //////function for opening session popup  - ends//////
  }

  scheduleModal() {
    //////function for opening not schedule popup  - starts//////
    // this.modalService.open(this.schedule, {
    //   centered: true,
    //   backdrop: "static"
    // });
    this.callWords();
    //////function for opening not schedule popup  - ends//////
  }
  crctscheduleModal() {
    //////function for opening correct schedule popup  - starts//////
    // this.modalService.open(this.crctschedule, {
    //   centered: true,
    //   backdrop: "static"
    // });
    this.callWords();
    //////function for opening correct schedule popup  - ends//////
  }
  cancelModal() {
    //////function for closing popup  - starts//////
    this.router.navigateByUrl("/login");
    this.modalService.dismissAll();
    //////function for closing popup  - ends//////
  }

  constructor(
    private ip: IpService,
    private LoginAPIService_ts: LoginAPIService,
    private theme: ThemeService,
    private lang: LanguageService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private modalService: NgbModal,
    private dataSharingService: DatasharingServiceService,

  ) {
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
      if (this.isUserLoggedIn == true) {
        console.log(this.isUserLoggedIn + "this.isUserLoggedIn");
        this.dataSharingService.isUserLoggedIn.next(false);
      }

    });
  }
  callme() {
    //////function for login with fb mail  - starts//////
    this.getUsername.email = localStorage.getItem("fbmail");
    this.getUsername.type = 1;
    if (this.getUsername.email != "" && this.getUsername.email != null) {
      this.ngxService.startLoader('loader-login');
      localStorage.setItem("fbmail", "");
      this.LoginAPIService_ts.getUsernameDetails(this.getUsername).subscribe(res => {
        console.log(JSON.parse(JSON.stringify(res)));
        this.response = JSON.parse(JSON.stringify(res));
        this.ngxService.stopLoader('loader-login');
        if (this.response.code == "SA000") {
          this.username = this.response.username;
          this.password = this.response.password;
          this.checkLogin();
        }
        else {
          this.errmsg = "Invalid email!";
          this.iserr = true;
        }
      })
    }
    else {
      this.errmsg = "Invalid email";
      this.iserr = true;
    }
    //////function for login with fb mail  - ends//////
  }
  callLanguages() {
    //////function for getting language  - starts//////
    this.LoginAPIService_ts.getLanguages().subscribe(res => {
      this.langresponse = JSON.parse(JSON.stringify(res));
      if (this.langresponse.code == "SA000") {
        let languages = new Array();
        for (let i = 0; i < this.langresponse.result.length; i++) {
          languages.push(this.langresponse.result[i].lang_name);
        }
        this.lang.langListname = languages;
      }
      if (localStorage.getItem("fbmail") != "" && localStorage.getItem("fbmail") != null) {
        this.callme();
      }
    });
    //////function for getting language  - ends//////
  }
  uname: string;
  url = new url();
  trailUrl = this.url.trailUrl;
  homeUrl = this.url.homeUrl;
  regUrl = this.url.regUrl;
  checkLogin() {

    //////function for login with username & password - starts//////
    this.theme.currenttheme.subscribe(
      themename => (this.themechange = themename)
    );
    this.lang.currentLang.subscribe(lang => (this.langtxt = lang));
    this.accLogin.username = this.username;
    this.accLogin.password = this.password;

    if (this.accLogin.username != "" && this.accLogin.username != null &&
      this.accLogin.password != "" && this.accLogin.password != null) {
      this.ngxService.startLoader('loader-login');
      console.log(this.username);
      this.LoginAPIService_ts.getAccDetails(this.accLogin).subscribe(res => {
        console.log(JSON.parse(JSON.stringify(res)));
        this.response = JSON.parse(JSON.stringify(res));
        if (this.response.code == "SA000") {
          this.ngxService.stopLoader('loader-login');
          localStorage.setItem("dob_password", (this.password).toString());
          this.uname = this.response.result[0].name

          console.log(this.response.result[0].todaydate + "ssssss" + this.response.result[0].enddate)
          if (this.response.result[0].todaydate <= this.response.result[0].enddate) {
            if (!this.response.result[0].current_session_id) {
              console.log("entered")
              if (this.response.curr_assess == 1) {
                this.callSiteWords();
                console.log("Entered 1")
              }
              else if (this.response.isschedule == 0) {
                this.callSiteWords();
                console.log("Entered1")
              } else {
                this.callSiteWords();
              }
            } else {
              this.sessionModal();
            }
          } else {
            this.errmsg = "Time expired";
          }
          console.log(!this.response.result[0].current_session_id)


        } else {
          this.accLogin.type = 1;
          this.accLogin.mobileno = this.username;
          this.accLogin.email = '';
          this.accLogin.countrycode = '';
          this.LoginAPIService_ts.getAccDetails_trail(this.accLogin)
            .subscribe(
              res => {
                this.ngxService.stopLoader('loader-login');
                this.response = JSON.parse(JSON.stringify(res));
                console.log(this.response);
                if (this.response.response == "1") {
                  this.post(`${this.trailUrl}trialgames`)
                } else {
                  this.errmsg = "Invalid Username or Password";
                  this.iserr = true;
                }
              }
            )
          // this.errmsg = "Invalid Username or Password";
          // this.iserr = true;
        }
      });
    }
    else {
      this.errmsg = "Please fill all the required field!";
      this.iserr = true;
    }
    //////function for login with username & password - ends//////
  }

  callothermodels() {
    //////function for calling one popup after other - starts//////
    this.modalService.dismissAll();
    if (this.response.curr_assess == 1) {
      this.callSiteWords();
      console.log("Entered")
    }
    else if (this.response.isschedule == 0) {
      this.callSiteWords();
      console.log("Entered1")
    } else {
      this.callSiteWords();
    }
    //////function for calling one popup after other - ends//////
  }

  callWords() {
    //////function for cloaing popup- starts//////
    this.modalService.dismissAll();
    this.callSiteWords();
    //////function for cloaing popup- ends//////
  }
  public list: string[] = [];
  session_id = new sessionid();
  gen() {
    //////function for getting session_id- starts//////
    this.list.push(uuid());
    console.log(this.list[0])
    this.session_id.uid = localStorage.getItem("uid")
    this.session_id.sessionid = this.list[0];
    this.ngxService.startLoader('loader-login');
    this.LoginAPIService_ts.setSessionid(this.session_id).subscribe(res => {

      this.response = JSON.parse(JSON.stringify(res));
      console.log(this.response)

      if (this.response.code == "SA000") {
        localStorage.setItem("session_id", this.list[0]);

        this.ip.getIPAddress().subscribe((res1: any) => {
          this.ipAddress = res1.ip;
          localStorage.setItem("my_ip", this.ipAddress.toString())
          console.log("this.ipAddress" + this.ipAddress);
          if (localStorage.getItem("my_ip") != "") {
            this.lang.loadSiteWords(this.lang_val, 0);
          }
        });

      } else {
        this.ngxService.stopLoader('loader-login');
      }
    });
    //////function for getting session_id- ends//////
  }
  lang_val: any;
  callSiteWords() {
    //////function for getting user details- starts//////
    console.log(this.response.result[0]);
    console.log(this.response)
    localStorage.setItem("username", this.response.result[0].user_name);
    localStorage.setItem("uname", this.response.result[0].name);
    localStorage.setItem("uid", this.response.result[0].id);
    localStorage.setItem("Branch_id_val", this.response.result[0].branch_id);
    localStorage.setItem("Section_id_val", this.response.result[0].section_id);
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

    localStorage.setItem("logcheck", "1");
    localStorage.setItem("currentlangNo", this.response.result[0].selected_lang);
    localStorage.setItem("roadmap_chk", '0');
    localStorage.setItem("music_val", this.response.result[0].selected_music);
    localStorage.setItem("roadReturnStatus", (0).toString());
    localStorage.setItem("roadback", (0).toString());

    if (this.response.result[0].bgm == "ON") {
      localStorage.setItem("music_data_status", '1');
    }
    else {
      localStorage.setItem("music_data_status", '0');
    }

    localStorage.setItem("isfullschudle_stored", this.response.result[0].isfullschudle);
    localStorage.setItem("rep3_needleValue", '0');
    localStorage.setItem("rep4_needleValue", '0');
    localStorage.setItem("rep5_needleValue", '0');
    localStorage.setItem("dash_needleValue", '0');
    localStorage.setItem("pro_dob", this.response.result[0].dob);
    if (parseInt(localStorage.getItem("logincount")) == 1) {
      localStorage.setItem("timercount", "0");
    }
    this.lang_val = this.response.result[0].selected_lang;
    this.gen();
    //////function for getting user details- ends//////
  }

  callRegister() {
    // this.router.navigateByUrl("/register");
  }



  googleInitialize() {
    //////function for getting access from gmail- starts//////
    this.ngxService.startLoader('loader-login');
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '534590850892-v3eero47acaqqsuuiucujqbe1ufc7k67.apps.googleusercontent.com',
          cookie_policy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLogin();
      });
    }
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));

  }

  prepareLogin() {

    this.auth2.signIn().then(
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        localStorage.setItem("fbmail", profile.getEmail());
        this.auth2.signOut();
        this.ngxService.stopLoader('loader-login');
        window.location.reload();

      }, (error) => {
        this.ngxService.stopLoader('loader-login');

      });
    //////function for getting access from gmail- ends//////
  }



  fbLibrary() {
    //////function for getting access from fb- starts//////
    (window as any).fbAsyncInit = function () {
      window['FB'].init({
        appId: '1628922830615524',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });
      window['FB'].AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    //////function for getting access from fb- ends//////
  }
  eye_type = 'password';
  show = false;
  onClick() {
    //////function setting new password visible- starts//////
    if (this.eye_type === 'password') {
      this.eye_type = 'text';
      this.show = true;
    } else {
      this.eye_type = 'password';
      this.show = false;
    }
    //////function setting new password visible- ends//////
  }
  eye_type1 = 'password';
  show1 = false;
  onClick1() {
    /////function setting confrim password visible- starts//////
    if (this.eye_type1 === 'password') {
      this.eye_type1 = 'text';
      this.show1 = true;
    } else {
      this.eye_type1 = 'password';
      this.show1 = false;
    }
    /////function setting confrim password visible- ends//////
  }
  login() {
    //////function for getting access from fb- starts//////
    this.ngxService.startLoader('loader-login');
    window['FB'].login((response) => {
      console.log('login response', response);
      if (response.authResponse) {
        console.log('login response', response.authResponse.accessToken);
        window['FB'].api('/me', {
          fields: 'last_name, first_name, email'
        }, (userInfo) => {
          this.response = JSON.parse(JSON.stringify(userInfo));
          console.log(this.response.email);
          localStorage.setItem("fbmail", this.response.email);
          this.ngxService.stopLoader('loader-login');
          window.location.reload();

        });

      } else {
        this.errmsg = "User login failed";
        this.iserr = true;
        console.log('User login failed');
      }
    }, { scope: 'email' });
    //////function for getting access from fb- ends//////
  }
  otp_val = "";
  opt_btn_new = true;
  timeint_val: any;
  opt_btn = false;
  opt_btn1 = false;
  countryCode = "+91";
  phoneno;
  phone_err = "";
  otp_uid = ""; otp_otp = ""; otp_mn = "";
  otp_error = "";
  ard_val = 0;
  for_vis = true;
  callOtp(ard) {
    //////function for showing otp page -starts//////
    this.model_val = false;
    this.iserr = false;
    this.phoneno = "";
    this.phone_err = "";
    if (ard == 1) {
      this.for_vis = true;
    }
    else {
      this.for_vis = false;
    }
    if (this.opt_btn == false) {
      this.opt_btn = true;
      this.opt_btn_new = false;
      this.ard_val = ard;

    }
    else {
      this.opt_btn_new = true;
      this.opt_btn = false;
      this.ard_val = ard;
    }
    //////function for showing otp page -ends//////
  }
  demoid = '';
  loadbase() {
    window.open(this.homeUrl, '_self');
  }
  reg_new() {
    window.open(this.regUrl, '_self');
  }
  callOtpSubmit(arg) {
    //////function for showing otp submit -starts//////
    console.log("this.phoneno" + this.phoneno)
    this.login_otp_SA.mobileno = this.phoneno;
    this.login_otp_SA.countrycode = this.countryCode;
    if (this.phoneno != "" && this.phoneno != null) {
      this.ngxService.startLoader('loader-login');
      this.LoginAPIService_ts.login_otp_SADetails(this.login_otp_SA).subscribe(res => {
        this.response = JSON.parse(JSON.stringify(res));
        console.log(this.response);

        if (this.response.code == "SA000") {
          this.ngxService.stopLoader('loader-login');
          this.otp_uid = this.response.uid; this.otp_otp = this.response.otp; this.otp_mn = this.response.mobileno;
          if (arg == 1) {
            clearTimeout(this.timelimt_val);
            this.timelimt();

            this.phone_err = "OTP send sucessfully";
            this.timeint_val = setTimeout(() => {
              this.callOtp1(1);
            }, 500);
          }
          else {
            clearTimeout(this.timelimt_val);
            this.timelimt();

            this.otp_val = "";
            this.otp_error = "OTP send sucessfully";
          }

        }
        else {
          // if (arg == 1)
          //   this.phone_err = "please enter the valid contact no!";
          // else
          //   this.otp_error = "please enter the valid contact no!";

          this.login_otp_SA.type = 2;
          this.login_otp_SA.email = '';
          this.login_otp_SA.password = '';
          this.otp_mn = this.phoneno;
          this.LoginAPIService_ts.login_otp_demo(this.login_otp_SA)
            .subscribe(
              res => {
                this.ngxService.stopLoader('loader-login');
                this.response = JSON.parse(JSON.stringify(res));
                console.log(this.response);
                if (this.response.response == "1") {
                  this.demoid = this.response.demoid;
                  if (arg == 1) {
                    clearTimeout(this.timelimt_val);
                    this.timelimt();

                    this.phone_err = "OTP send sucessfully";
                    this.timeint_val = setTimeout(() => {
                      this.callOtp1(1);
                    }, 500);
                  }
                  else {
                    clearTimeout(this.timelimt_val);
                    this.timelimt();
                    // 
                    this.otp_val = "";
                    this.otp_error = "OTP send sucessfully";
                  }
                  // this.post(`${this.trailUrl}trialgames`);
                } else {
                  if (arg == 1)
                    this.phone_err = "please enter the valid contact no!";
                  else
                    this.otp_error = "please enter the valid contact no!";
                }
              }
            )
        }
      });
    }
    else {
      if (arg == 1)
        this.phone_err = "please enter contact no!";
      else
        this.otp_error = "please enter the valid contact no!";

    }
    //////function for showing otp submit -ends//////
  }

  timelimt_val: any;
  timelimt() {
    // this.timelimt_val = setTimeout(() => {
    //   this.timelimt1();
    // }, 120000);
    console.log('here')
    this.istimer = true;
    this.msgsendstop = 0;
    clearInterval(this.interTime);
    var fiveMinutes = 60 * 10;
    this.display = document.querySelector('#timeset');
    console.log(this.display)
    this.startTimer1(fiveMinutes, this.display);

  }
  timelimt1() {
    clearTimeout(this.timelimt_val);
    this.otp_error = "OTP Time Expires!"
    this.timelimt_val = setTimeout(() => {
      this.loginfn();
    }, 400);

  }
  countryChange(country: any) {
    //////function for changing country code on otp page -starts//////
    this.countryCode = "+" + country.dialCode;
    console.log("this.countryCode" + this.countryCode)
    //////function for changing country code on otp page -ends//////
  }

  callOtp1(arg) {
    //////function for reseting otp page - starts//////
    clearTimeout(this.timeint_val);
    this.otp_error = "";
    this.otp_val = "";
    if (arg == 0 || arg == 1) {

      if (this.opt_btn1 == false) {
        this.opt_btn1 = true;
        this.opt_btn = false;
        this.opt_btn_new = false;
      }
      else {
        this.opt_btn1 = false;
        this.opt_btn = false;
        this.opt_btn_new = true;
        this.ard_val = 0;

      }
    }
    else {
      this.opt_btn1 = false;
      this.opt_btn = false;
      this.opt_btn_new = false;
      this.opt_btn2 = true;
    }
    //////function for reseting otp page - ends//////
  }
  isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }
  callOtpSubmit1() {
    if (this.msgsendstop == 0) {
    if (this.demoid != '') {
      if (this.otp_val != "" && this.otp_val != null) {
        if (this.isNumber(this.otp_val) == true) {
          this.otpverification_SA.mobileno = this.otp_mn;
          this.otpverification_SA.otp = this.otp_val;
          this.otpverification_SA.uid = this.demoid;
          this.ngxService.startLoader('loader-login');
          this.LoginAPIService_ts.otpverification_demo(this.otpverification_SA).subscribe(res => {
            this.response = JSON.parse(JSON.stringify(res));
            console.log(this.response);
            this.ngxService.stopLoader('loader-login');
            if (this.response.response == "1") {
              clearTimeout(this.timelimt_val);
              if (this.ard_val == 1) {
                //this.username = this.response.result[0].user_name;
                // this.password = this.response.result[0].password;
                // this.checkLogin();
                this.post(`${this.trailUrl}trialgames`);
              }
              else {
                // this.demoid = this.response.demoid;
                this.callOtp1(2);
              }


            }
            else {
              this.otp_error = "Invalid OTP!"
            }
          });
        }
        else {
          this.otp_error = "Invalid OTP Type!"
        }
      }
      else {
        this.otp_error = "Please Enter OTP!"
      }
    } else {
      //////function for verifing otp and getting access to login -starts//////
      console.log("this.otp_val" + this.otp_val)
      this.otpverification_SA.mobileno = this.otp_mn;
      this.otpverification_SA.otp = this.otp_val;
      this.otpverification_SA.uid = this.otp_uid;
      console.log("this.isNumber" + this.isNumber(this.otp_val));
      if (this.otp_uid != "" && this.otp_uid != null && this.otp_val != "" && this.otp_val != null) {
        if (this.isNumber(this.otp_val) == true) {
          /////////////////////
          this.ngxService.startLoader('loader-login');
          this.LoginAPIService_ts.otpverification_SADetails(this.otpverification_SA).subscribe(res => {
            this.response = JSON.parse(JSON.stringify(res));
            console.log(this.response);
            this.ngxService.stopLoader('loader-login');
            if (this.response.code == "SA000") {
              clearTimeout(this.timelimt_val);
              if (this.ard_val == 1) {
                this.username = this.response.result[0].user_name;
                this.password = this.response.result[0].password;
                this.checkLogin();
              }
              else {
                this.reset_uid = this.response.result[0].id;
                this.callOtp1(2);
              }


            }
            else {
              this.otp_error = "Invalid OTP!"
            }
          });
          /////////////
        }
        else {
          this.otp_error = "Invalid OTP Type!"
        }
      }
    }
  }
  }
  opt_btn2 = false;
  newpass_val = "";
  newpass_con_val = "";
  newpass_error = "";
  reset_uid = "";
  callOtp2() {
    //////function for closing otp page -starts//////
    clearTimeout(this.timeint_val);
    this.model_val = true;
    this.for_vis = true;
    this.newpass_error = "";
    this.opt_btn2 = false;
    this.newpass_val = "";
    this.newpass_con_val = "";
    this.ard_val = 0;

    this.otp_val = "";
    this.opt_btn_new = true;
    this.opt_btn = false;
    this.opt_btn1 = false;
    this.countryCode = "+91";
    this.phoneno = "";
    this.phone_err = "";
    this.otp_uid = "";
    this.otp_otp = "";
    this.otp_mn = "";
    this.otp_error = "";
    //////function for closing otp page -ends//////

  }
  callOtpSubmit2() {
    //////function for verifing otp and reseting password -starts//////
    if (this.msgsendstop == 0) {
      if (this.newpass_val != "" && this.newpass_val != null && this.newpass_con_val != "" && this.newpass_con_val != null) {
        if (this.newpass_val == this.newpass_con_val) {

          this.newpwd_SA.newpassword = this.newpass_val;
          this.newpwd_SA.uid = this.otp_uid;
          this.ngxService.startLoader('loader-login');
          this.LoginAPIService_ts.newpwd_SADetails(this.newpwd_SA).subscribe(res => {
            this.response = JSON.parse(JSON.stringify(res));
            console.log(this.response);
            this.ngxService.stopLoader('loader-login');
            if (this.response.code == "SA000") {
              this.newpass_error = "Password Reseted Successfully!";

            }
            else {
              this.newpass_error = "Something Went Wrong, Retry!";

            }
            this.timeint_val = setTimeout(() => {
              this.callOtp2();
            }, 800);
          });

        }
        else {
          this.newpass_error = "Invalid Confirm Password";
        }
      }
      else {
        this.newpass_error = "Please fill all the required field!";
      }
    }
  }
  //////function for verifing otp and reseting password -ends//////

  ///////////////////Call issue report ///////////////
  gotoReport() {
    this.router.navigateByUrl('/issue');
  }
  ///////////////////////////call trail/////////////////////
  post(path) {
    //////function for post method to call html games //////
    let method = "post"; // Set method to post by default if not specified.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
    // for (var key in params) {
    //   if (params.hasOwnProperty(key)) {
    //     var hiddenField = document.createElement("input");
    //     hiddenField.setAttribute("type", "hidden");
    //     hiddenField.setAttribute("name", key);
    //     hiddenField.setAttribute("value", params[key]);

    //     form.appendChild(hiddenField);
    //   }
    // }
    document.body.appendChild(form);
    form.submit();
  }
  //////////////////////////////OTP Timer////////////////
  interTime;
  msgsendstop: number = 0;
  timerStartVal = 10;
  startTimer1(duration, display) {
    console.log("startTimer1")
    let timer = duration, minutes, seconds;
    this.interTime = setInterval(() => {
      minutes = timer / 60;
      seconds = timer % 60;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      // console.log(display)
      // console.log(seconds)
      display.textContent = parseInt(minutes) + ":" + seconds;

      if (--timer < 0) {
        //timer = duration;
        this.msgsendstop = 1;
        console.log("timer  comes")
        console.log(timer)
        this.otp_error = "OTP Time Expires!"
        // clearInterval(this.interTime);

        clearInterval(this.interTime);

        // clearInterval(this.interTime);
      }
      console.log(timer)
      // else if(timer<=0){
      // 	clearInterval(interTime);
      // }

    }, 1000);
  }



}
