import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from '../services/profile/theme.service'
import { LanguageService } from '../services/profile/language.service'
import { url } from '../services/baseurl'
import { ProfileService } from '../services/profile/profile.service'
import { getWords } from '.././services/login/loginAPI';
import { LoginAPIService } from '.././services/login/login-api.service';
import {
  profileget, themeUpdate, audioUpdate, langUpdate, getThemeScore,
  newpwd_SA_session, updatebasetheme, schChange, nameChange
} from '../services/profile/profile'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { galleryComponent } from './gallery.component';
import { IpService } from '../services/ip/ip.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { DatasharingServiceService } from "../services/ip/datasharing-service.service";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  mobile_no = "";
  schol_vis = false;
  //////theme variables//////
  updatebasetheme = new updatebasetheme();
  colortheme = ['black', 'white'];
  colortheme_shad = ['white', '#ffffff36'];
  colortheme_shad_val;
  colortheme_bg;
  colortheme_txt;
  colortheme_base = ['#0D0F12', 'white']
  colortheme_bg_base;
  colortheme_base_sec = ['#181C20', '#F0F0F0']
  colortheme_bg_base_sec;
  colortheme_txt1_Arr = ['rgba(255, 255, 255, 0.65)', 'black'];
  colortheme_txt1;


  isdarktheme: number;
  isUserLoggedIn: boolean;
  numbers = [1, 2, 3, 4, 5, 6];

  //////profile page variables//////
  @ViewChild('reset_pass', { static: false }) reset_pass;
  coupon = "";
  newpwd_SA_session = new newpwd_SA_session();
  twitter_href = "https://twitter.com/intent/tweet?text=%20" + this.coupon;
  watsapp_href = "https://web.whatsapp.com/send?text=" + this.coupon;
  fb_href="https://www.facebook.com/sharer/sharer.php?u=https://hots.skillangels.com&quote="+this.coupon;
  mail_href = "https://mail.google.com/mail/?extsrc=mailto&url=mailto%3A%3Fto%3D%26subject%3Dskillangels%26body%3D" + this.coupon;
  linkedin_href = "https://www.linkedin.com/shareArticle?mini=true&url=https://hots.skillangels.com&title=skillangels&summary=" + this.coupon;
  skype_href = "skype:Echo123/chat?text=" + this.coupon;
  f_fb_href="https://www.facebook.com/sharer/sharer.php?u=https://hots.skillangels.com&quote="+this.coupon;
  ////////////////////////////////
  color_val = [false, false, false, false, false, false, false, false];
  baseurl = new url()
  response: any;
  sharevis = false;
  isTrue: boolean = false;
  isVisible() {
    this.isTrue = !this.isTrue;
  }
  lockopen: any = []
  opened_themes: number = 10;
  getProfile = new profileget()
  themeupdate = new themeUpdate()
  getThemeScore = new getThemeScore()
  getWords = new getWords();
  response1: any;
  langmap = new Map();
  profileWords: any;
  langList: any = [];
  isProfileGet: boolean = false;
  islangGet: boolean = false;
  isScoreThemeGet: boolean = false;
  rank: number;
  ///////////////////////
  soundurl1: any
  soundurl2: any
  soundurl3: any
  soundurl4: any
  soundurl5: any
  soundurl6: any
  soundurl7: any
  audioupdate = new audioUpdate()
  langupdate = new langUpdate()

  /////////////profileimg///////
  imageUrl: any = "";
  imageUrl1: any = "";
  imgExt = "png";

  //profile words 
  selectword: string;
  selpuzzleaudioword: string;
  themeword: string;
  selthemeword: string;
  sellangword: string;
  rankword: string;
  uname: string;
  grade: string;
  section: string;
  school: string;

  ////////////////////////////////profile img
  img_upload: boolean = false;
  res_img: any;
  registrationForm = this.fb.group({
    file: [null],
  })
  @ViewChild('fileInput', { static: true }) el: ElementRef;
  ch_ano_img: boolean = false;
  passContent = "";
  images: any;
  changeIMG: boolean = false;
  only_coupon = "";
  coupon_card_val = false;
  save_btn = false;
  value_val = "";
  contactForm: any;
  newpass_val = "";
  newpass_con_val = "";
  newpass_error = "";
  timeint_val: any;

  copyMessage(val: string) {
    //////function for copying coupon code  - starts//////
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    //////function for copying coupon code  - ends//////
  }

  basetheme(arg) {
    //////function for updating base theme  - starts//////
    this.updatebasetheme.uid = localStorage.getItem("uid");
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.updatebasetheme.timestamp = date_val.toString();
    this.updatebasetheme.hashcode = hash_val;

    this.updatebasetheme.basetheme = arg;
    this.toastr.success("Basetheme updated successfully");
    localStorage.setItem("isdark", arg.toString());
    this.dataSharingService.isdarktheme.next(arg);
    this.dataSharingService.isloader_sta.next(1);
    this.profileService.updatebasethemeDetails(this.updatebasetheme).subscribe(
      (res) => {
        this.response = JSON.parse(JSON.stringify(res));
        console.log(this.response)
        if (this.response.code == "SA000") {
          console.log("success");
        } else {
          if (this.response.code == "SA1061" ||
            this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
            localStorage.clear();
            this.router.navigateByUrl("/login");
          }

        }
      },
      (err) => {
      }
    );
    //////function for updating base theme  - ends//////
  }
  popup_fn() {
    this.color_val[parseInt(localStorage.getItem("currenttheme"))] = true;
    //////function for reset password popup open  - starts//////
    this.modalService.open(this.reset_pass, { centered: true });
  }
  mypass() {
    //////function for updating new password  - starts//////
    console.log(this.newpass_val);
    if (this.newpass_val != "" && this.newpass_val != null && this.newpass_con_val != "" && this.newpass_con_val != null) {
      if (this.newpass_val == this.newpass_con_val) {

        let date_val: Date;
        date_val = new Date();
        let hash_val = this.ip.gethash(date_val);
        this.newpwd_SA_session.timestamp = date_val.toString();
        this.newpwd_SA_session.hashcode = hash_val;
        this.newpwd_SA_session.newpassword = this.newpass_val;
        this.newpwd_SA_session.uid = localStorage.getItem("uid");
        this.load1 = true;
        this.ngxService.startLoader('loader-profile');
        this.profileService.newpwd_SA_sessionDetails(this.newpwd_SA_session).subscribe(res => {
          this.response = JSON.parse(JSON.stringify(res));
          console.log(this.response);
          this.ngxService.stopLoader('loader-profile');
          this.countsession = setInterval(() => { this.stopnewload(); }, 400);
          if (this.response.code == "SA000") {
            this.newpass_val = "";
            this.newpass_con_val = "";
            this.newpass_error = "Password Changed Successfully!";
          }
          else {
            this.newpass_val = "";
            this.newpass_con_val = "";
            this.newpass_error = "Something Went Wrong Try Again!";
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
    //////function for updating new password  - ends//////
  }

  callOtp2() {
    //////function for closing reset password otp popup- starts//////
    clearTimeout(this.timeint_val);
    this.newpass_error = "";
    //////function for closing reset password otp popup- ends//////
  }

  uploadFile(event) {
    //////function for updating browsed image- starts//////
    this.changeIMG = true;
    this.img_upload = false;
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {

      if (!this.validateImage(event.target.files[0].name)) {
        this.ch_ano_img = true;
        this.passContent = this.profileWords[122];
        return false;
      }
      else {
        this.img_upload = true;
        this.imgExt = event.target.files[0].name.substring(event.target.files[0].name.lastIndexOf('.') + 1);
        reader.readAsDataURL(file);
        this.images = file;
        reader.onload = () => {
          this.imageUrl1 = reader.result;
          this.registrationForm.patchValue({
            file: reader.result
          });
        }
        this.cd.markForCheck();
        this.updateImg();
      }
    }
    //////function for updating browsed image- ends//////
  }
  isbtnVisible: boolean = false;

  validateImage(name: string) {
    //////function for updating browsed image validation- starts//////
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'webp' || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'jpg') {
      return true;
    }
    else {
      return false;
    }
    //////function for updating browsed image validation- ends//////
  }
  callshare() {
    //////function for opening share container- starts//////
    this.sharevis = !this.sharevis;
    //////function for opening share container- ends//////
  }
  updateImg() {
    //////function for saving profile image on node- starts//////
    if (this.img_upload == true) {
      var nameoffile = localStorage.getItem("username") + "." + this.imgExt;
      const formData = new FormData();
      formData.append('file', this.images, nameoffile);
      this.profileService.geticon(formData).subscribe(
        res => {
          this.res_img = JSON.parse(JSON.stringify(res));
          if (this.res_img.status == "SA000") {
            this.toastr.success(this.profileWords[121])
          }
        },
      );
    }
    //////function for saving profile image on node- starts//////
  }

  openDialog() {
    //////function for galleryComponent open- starts//////
    this.dialog.open(galleryComponent, {
      height: '800px',
      width: '800px',
      panelClass: 'my-dialog',
      data: {
      }, disableClose: true
    });
    //////function for galleryComponent open- ends//////
  }

  setWords() {
    //////function for setting site word- starts//////
    this.selectword = this.profileWords[31];
    this.selpuzzleaudioword = this.profileWords[29];
    this.themeword = this.profileWords[28];
    this.selthemeword = this.profileWords[32];
    this.sellangword = this.profileWords[30];
    this.rankword = this.profileWords[1];
    //////function for setting site word- ends//////
  }
  image: any;
  uname_1: string;
  getImgContent() {
    //////function for getting site profile image//////
    console.log(this.sanitizer.bypassSecurityTrustUrl(this.imageUrl))
    this.image = this.sanitizer.bypassSecurityTrustStyle(`url(${this.imageUrl})`);
  }


  constructor(private dataSharingService: DatasharingServiceService, private NgbModalConfig_ts: NgbModalConfig, private modalService: NgbModal,
    private ip: IpService, private sanitizer: DomSanitizer, public fb: FormBuilder, private cd: ChangeDetectorRef, private toastr: ToastrService, public theme: ThemeService, private lang: LanguageService, private ngxService: NgxUiLoaderService,
    private http: HttpClient, private profileService: ProfileService, private LoginAPIService_ts: LoginAPIService, private dialog: MatDialog, private router: Router) {
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
      if (this.isUserLoggedIn == true) {
        console.log(this.isUserLoggedIn + "this.isUserLoggedIn");
        this.dataSharingService.isloader_sta.next(1);
        this.dataSharingService.isUserLoggedIn.next(false);
        this.ngOnInit();
      }
    });

    this.dataSharingService.isdarktheme.subscribe(value => {
      this.ngOnInit();
    });
  }

  themename_sel: any;
  langflag: number;
  islangflag: boolean = false;
  isProfileimg: boolean = false;
  imgName: string;
  potrait_val = 'none';
  share_val = false;


  sharincall() {
    //////function for share container visibility- starts//////
    if (this.share_val == true) {
      this.share_val = false;
    }
    else {
      this.share_val = true;
    }
    //////function for share container visibility- ends//////
  }

  countsession;
  load1;
  stopnewload() {
    clearInterval(this.countsession);
    this.load1 = false;
  }
  edit_schol_vis = false;
  schChange = new schChange();
  edit_school = "";
  addschool() {
    this.edit_schol_vis = true;
  }
  save_schFn() {

    ////////////////function for changeing school name////////////////////
    if (this.edit_school != "" && this.edit_school != null) {
      this.schChange.uid = localStorage.getItem("uid");
      this.schChange.schname = this.edit_school;
      let date_val: Date;
      date_val = new Date();
      let hash_val = this.ip.gethash(date_val);
      this.schChange.timestamp = date_val.toString();
      this.schChange.hashcode = hash_val;
      this.load1 = true;
      this.ngxService.startLoader('loader-profile');
      this.profileService.schChangedetails(this.schChange).subscribe(
        (res) => {
          this.response = JSON.parse(JSON.stringify(res));
          if (this.response.code == "SA000") {
            this.school = this.edit_school;
            if (this.school == "-") {
              this.schol_vis = false;
            }
            else {
              this.schol_vis = true;
            }
            this.toastr.success("School name updated successfully!")
            this.edit_schol_vis = false;
            this.edit_school = "";
            this.ngxService.stopLoader('loader-profile');
            this.countsession = setInterval(() => { this.stopnewload(); }, 400);
          }
          else {
            this.edit_school = "";
            this.toastr.success("something went wrong!")
            this.edit_schol_vis = false;
            this.ngxService.stopLoader('loader-profile');
            this.countsession = setInterval(() => { this.stopnewload(); }, 400);
          }
        })
    }
    else {
      this.toastr.success("please fill the school name!")
      this.edit_schol_vis = false;
    }
    ////////////////function for changeing school name////////////////////
  }

  nameChange = new nameChange();
  edit_name = "";
  edit_name_vis = false;
  addname() {
    this.edit_name_vis = true;
  }
  save_nameFn() {
    ////////////////function for changeing user name////////////////////
    if (this.edit_name != "" && this.edit_name != null) {
      this.nameChange.uid = localStorage.getItem("uid");
      this.nameChange.name = this.edit_name;
      let date_val: Date;
      date_val = new Date();
      let hash_val = this.ip.gethash(date_val);
      this.nameChange.timestamp = date_val.toString();
      this.nameChange.hashcode = hash_val;
      this.load1 = true;
      this.ngxService.startLoader('loader-profile');
      this.profileService.nameChangedetails(this.nameChange).subscribe(
        (res) => {
          this.response = JSON.parse(JSON.stringify(res));
          if (this.response.code == "SA000") {
            this.uname_1 = this.edit_name;
            this.dataSharingService.user_name_pass.next(this.uname_1);
            this.toastr.success("user name updated successfully!")
            this.edit_name_vis = false;
            this.edit_name = "";
            this.ngxService.stopLoader('loader-profile');
            this.countsession = setInterval(() => { this.stopnewload(); }, 400);
          }
          else {
            this.edit_name = "";
            this.toastr.success("something went wrong!")
            this.edit_name_vis = false;
            this.ngxService.stopLoader('loader-profile');
            this.countsession = setInterval(() => { this.stopnewload(); }, 400);
          }
        })
    }
    else {
      this.toastr.success("please fill the user name!")
      this.edit_name_vis = false;
    }
    ////////////////function for changeing user name////////////////////
  }
  eye_type = 'password';
  show = false;
  onClick() {
    //////function for setting new password visible //////
    if (this.eye_type === 'password') {
      this.eye_type = 'text';
      this.show = true;
    } else {
      this.eye_type = 'password';
      this.show = false;
    }
  }
  eye_type1 = 'password';
  show1 = false;
  onClick1() {
    //////function for setting confrim password visible //////
    if (this.eye_type1 === 'password') {
      this.eye_type1 = 'text';
      this.show1 = true;
    } else {
      this.eye_type1 = 'password';
      this.show1 = false;
    }
  }
  pro_dob_val;
  ngOnInit() {
    //////Initaial function with basic variable definitions  - starts//////
    localStorage.setItem("profileReturnStatus", (0).toString());
    if (localStorage.getItem("uid") == "" || localStorage.getItem("uid") == null) {
      this.router.navigateByUrl('/login');
    }


    var width = window.innerWidth;
    if (width < 768 && window.orientation != 90) {
      this.potrait_val = '-webkit-center';
      console.log(this.potrait_val + 'mobile device detected' + window.orientation)
    } else if (width >= 768 && width <= 992) {
      console.log('tablet detected')
      this.potrait_val = 'none';
    } else {
      console.log('desktop detected')
      this.potrait_val = 'none';
    }
    this.colortheme_bg = this.colortheme[parseInt(localStorage.getItem("isdark"))];
    this.colortheme_shad_val = this.colortheme_shad[parseInt(localStorage.getItem("isdark"))];
    this.colortheme_bg_base_sec = this.colortheme_base_sec[parseInt(localStorage.getItem("isdark"))];
    this.colortheme_txt1 = this.colortheme_txt1_Arr[parseInt(localStorage.getItem("isdark"))];
    if (parseInt(localStorage.getItem("isdark")) == 0) {
      this.colortheme_txt = this.colortheme[1];
    }
    else {
      this.colortheme_txt = this.colortheme[0];
    }
    this.load1 = true;
    this.ngxService.startLoader('loader-profile');
    this.changeIMG = false;


    //////////////////////////////////////////////
    this.soundurl1 = this.baseurl.soundUrl + "sound_1.mp3";
    this.soundurl2 = this.baseurl.soundUrl + "sound_2.mp3";
    this.soundurl3 = this.baseurl.soundUrl + "sound_3.mp3";
    this.soundurl4 = this.baseurl.soundUrl + "sound_4.mp3";
    this.soundurl5 = this.baseurl.soundUrl + "sound_5.mp3";
    this.soundurl6 = this.baseurl.soundUrl + "sound_6.mp3";
    this.soundurl7 = this.baseurl.soundUrl + "sound_7.mp3";

    /////////////////////////getting user details///////////////////////

    var date_date = localStorage.getItem("pro_dob").substring(0, 10).split('-')
    this.pro_dob_val = date_date[2] + '-' + date_date[1] + '-' + date_date[0]

    this.getProfile.uid = localStorage.getItem("uid");
    this.getThemeScore.uid = localStorage.getItem("uid");
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.getProfile.timestamp = date_val.toString();
    this.getProfile.hashcode = hash_val;

    this.profileService.getprofile(this.getProfile).subscribe(
      (res) => {
        this.response = JSON.parse(JSON.stringify(res));
        if (this.response.code == "SA000") {
          console.log(this.response)
          this.uname = this.response.username;
          this.uname_1 = this.response.uname;
          console.log("this.response.gradename" + this.response.gradename);
          this.only_coupon = this.response.referral;
          this.coupon = "Coupon Code:" + this.response.referral;
          this.twitter_href = "https://twitter.com/intent/tweet?text=%20" + this.coupon;
          this.watsapp_href = "https://web.whatsapp.com/send?text=" + this.coupon;
          this.fb_href = "https://www.facebook.com/dialog/feed?app_id=365252714638350&href=%7B%7Bhttps%3A%2F%2Fhots.skillangels.com%7D%7D&picture=http%3A%2F%2Fplacekitten.com%2F500%2F500";
          this.mail_href = "https://mail.google.com/mail/?extsrc=mailto&url=mailto%3A%3Fto%3D%26subject%3Dskillangels%26body%3D" + this.coupon;
          this.linkedin_href = "https://www.linkedin.com/shareArticle?mini=true&url=https://hots.skillangels.com&title=skillangels&summary=" + this.coupon;
          this.skype_href = "skype:Echo123/chat?text=" + this.coupon;
          this.f_fb_href="https://www.facebook.com/sharer/sharer.php?u=https://hots.skillangels.com&quote="+this.coupon;
          this.grade = this.response.gradename;
          this.section = this.response.secname;
          this.school = this.response.schname;
          console.log(this.response.schname + "this.response.schname")
          if (this.school == "-") {
            this.schol_vis = false;
          }
          else {
            this.schol_vis = true;
          }
          this.mobile_no = this.response.mobile;
          this.langflag = this.response.lang_flag;
          this.rank = this.response.rank;
          this.imgName = this.response.imagename;
          this.imageUrl = this.baseurl.imageurl + this.imgName;
          console.log(" this.imageUrl" + this.imageUrl)
          this.imageUrl1 = '/assets/images/Profile/Profile.png';
          //////////////////////////////getimage///////////////
          this.getImgContent();
          if (this.langflag == 0) {
            this.islangflag = false
          } else {
            this.islangflag = true
          }
          this.isProfileGet = true;

          this.profileService.getLanguagesProf().subscribe(
            (res1) => {
              this.response = JSON.parse(JSON.stringify(res1));
              if (this.response.code == "SA000") {
                for (let i = 0; i < this.response.result.length; i++) {
                  this.langList.push(this.response.result[i].original_name)
                }
                this.islangGet = true;
                for (let j = 0; j < this.theme.gradient_color.length; j++) {
                  if (j < this.opened_themes) {
                    this.lockopen.push('lock_open');
                  }
                }

                this.endLoader();
              } else {
                this.islangGet = true;

              }
            },
            (err) => {
            }
          );
        } else {
          if (this.response.code == "SA1061" ||
            this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
            localStorage.clear();
            this.router.navigateByUrl("/login");
          }
          this.isProfileGet = true;
        }
      },
      (err) => {
      }
    );

    this.theme.currenttheme.subscribe(themename => this.themechange = themename)
    this.profileWords = [...JSON.parse(localStorage.getItem('langwords') || '[]')];
    this.setWords();
    //////Initaial function with basic variable definitions  - ends//////
  }
  endLoader() {
    //////function for stoping loader  - starts//////
    if (this.islangGet == true && this.isProfileGet == true) {
      try {
        this.ngxService.stopLoader('loader-profile');
        this.countsession = setInterval(() => { this.stopnewload(); }, 400);
      }
      catch {
      }
    }
    //////function for stoping loader  - ends//////
  }
  //////////////////////////////////////////////
  themechange: any;
  ChangeTheme(e) {
    //////function for updating theme  - starts//////
    if (e < this.opened_themes) {
      this.themechange = this.theme.themenames[e];
      localStorage.setItem("currenttheme", (e + 1).toString());
      this.theme.changeTheme(this.themechange)
      this.toastr.success(this.themeword + " " + (e + 1) + " " + this.profileWords[46])
      this.themeupdate.themename = "Theme " + (e + 1);
      this.themeupdate.uid = localStorage.getItem("uid");
      let date_val: Date;
      date_val = new Date();
      let hash_val = this.ip.gethash(date_val);
      this.themeupdate.timestamp = date_val.toString();
      this.themeupdate.hashcode = hash_val;

      this.profileService.updatetheme(this.themeupdate).subscribe(
        (res) => {
          this.response = JSON.parse(JSON.stringify(res));
          if (this.response.code == "SA000") {
            console.log("success");
          } else {
            if (this.response.code == "SA1061" ||
              this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
              localStorage.clear();
              this.router.navigateByUrl("/login");
            }
          }
        },
        (err) => {
        }
      );
    } else {
      this.toastr.error(this.profileWords[47])
    }
    //////function for updating theme  - ends//////
  }

  changedLang: any;
  ChangeLanguage(e) {
    //////function for updating language  - starts//////
    this.langupdate.uid = localStorage.getItem("uid");
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.langupdate.timestamp = date_val.toString();
    this.langupdate.hashcode = hash_val;

    this.langupdate.langid = e + 1;
    this.toastr.success(this.sellangword + " " + this.langList[this.langupdate.langid - 1] + " " + this.profileWords[46])
    this.profileService.updatelang(this.langupdate).subscribe(
      (res) => {
        this.response = JSON.parse(JSON.stringify(res));
        if (this.response.code == "SA000") {
          console.log("updatelang success")
        } else {
          if (this.response.code == "SA1061" ||
            this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
            localStorage.clear();
            this.router.navigateByUrl("/login");
          }
        }
      },
      (err) => {
      }
    );
    this.lang.loadSiteWords(this.langupdate.langid, 1);
    this.setWords();
    //////function for updating language  - ends//////
  }

  //////////////////////////////////////////////

  @ViewChild('audio1', { static: false }) audio1: any;
  @ViewChild('audio2', { static: false }) audio2: any;
  @ViewChild('audio3', { static: false }) audio3: any;
  @ViewChild('audio4', { static: false }) audio4: any;
  @ViewChild('audio5', { static: false }) audio5: any;
  @ViewChild('audio6', { static: false }) audio6: any;
  audiomute1: number = 0.1;
  audiomute2: number = 0.1;
  audiomute3: number = 0.1;
  audiomute4: number = 0.1;
  audiomute5: number = 0.1;
  audiomute6: number = 0.1;
  audioStop() {
    //////function for audio1 control  - starts//////
    if (this.audiomute1 == this.audio1.volume) {
      if (!this.audio1.isPlaying) {
        this.audio1.player.nativeElement.play();
        this.audio2.player.nativeElement.pause();
        this.audio3.player.nativeElement.pause();
        this.audio4.player.nativeElement.pause();
        this.audio5.player.nativeElement.pause();
        this.audio6.player.nativeElement.pause();
        this.justcall(1);
        var con = this;
        this.audio1.player.nativeElement.addEventListener('ended', function () {
          con.justcall(2);
        }, false);

      }
      else {
        this.justcall(2);
      }
    }
    this.audiomute1 = this.audio1.volume;
    //////function for audio1 control  - ends//////
  }





  justcall(arg) {
    this.dataSharingService.ismusic.next(arg);
  }
  audioStop1() {
    //////function for audio2 control  - starts//////
    if (this.audiomute2 == this.audio2.volume) {
      if (!this.audio2.isPlaying) {
        console.log("entered 2")
        this.audio2.player.nativeElement.play();
        this.audio1.player.nativeElement.pause();
        this.audio3.player.nativeElement.pause();
        this.audio4.player.nativeElement.pause();
        this.audio5.player.nativeElement.pause();
        this.audio6.player.nativeElement.pause();
        this.justcall(1);
        var con = this;
        this.audio2.player.nativeElement.addEventListener('ended', function () {
          con.justcall(2);
        }, false);

      }
      else {
        this.justcall(2);
      }
    }
    this.audiomute2 = this.audio2.volume;
    //////function for audio2 control  - ends//////
  }

  audioStop2() {
    //////function for audio3 control  - starts//////
    if (this.audiomute3 == this.audio3.volume) {
      if (!this.audio3.isPlaying) {
        this.audio3.player.nativeElement.play();
        this.audio1.player.nativeElement.pause();
        this.audio2.player.nativeElement.pause();
        this.audio4.player.nativeElement.pause();
        this.audio5.player.nativeElement.pause();
        this.audio6.player.nativeElement.pause();
        this.justcall(1);
        var con = this;
        this.audio3.player.nativeElement.addEventListener('ended', function () {
          con.justcall(2);
        }, false);

      }
      else {
        this.justcall(2);
      }
    }
    this.audiomute3 = this.audio3.volume
    //////function for audio3 control  - ends//////
  }

  audioStop3() {
    //////function for audio4 control  - starts//////
    if (this.audiomute4 == this.audio4.volume) {
      if (!this.audio4.isPlaying) {
        this.audio4.player.nativeElement.play();
        this.audio1.player.nativeElement.pause();
        this.audio2.player.nativeElement.pause();
        this.audio3.player.nativeElement.pause();
        this.audio5.player.nativeElement.pause();
        this.audio6.player.nativeElement.pause();
        this.justcall(1);
        var con = this;
        this.audio4.player.nativeElement.addEventListener('ended', function () {
          con.justcall(2);
        }, false);

      }
      else {
        this.justcall(2);
      }
    }
    this.audiomute4 = this.audio4.volume
    //////function for audio4 control  - ends//////
  }

  audioStop4() {
    //////function for audio5 control  - starts//////
    if (this.audiomute5 == this.audio5.volume) {
      if (!this.audio5.isPlaying) {
        this.audio5.player.nativeElement.play();
        this.audio1.player.nativeElement.pause();
        this.audio2.player.nativeElement.pause();
        this.audio3.player.nativeElement.pause();
        this.audio4.player.nativeElement.pause();
        this.audio6.player.nativeElement.pause();
        this.justcall(1);
        var con = this;
        this.audio5.player.nativeElement.addEventListener('ended', function () {
          con.justcall(2);
        }, false);

      }
      else {
        this.justcall(2);
      }
    }
    this.audiomute5 = this.audio5.volume
    //////function for audio5 control  - ends//////
  }


  audioStop5() {
    //////function for audio6 control  - starts//////
    if (this.audiomute6 == this.audio6.volume) {
      if (!this.audio6.isPlaying) {
        this.audio6.player.nativeElement.play();
        this.audio1.player.nativeElement.pause();
        this.audio2.player.nativeElement.pause();
        this.audio3.player.nativeElement.pause();
        this.audio4.player.nativeElement.pause();
        this.audio5.player.nativeElement.pause();
        this.justcall(1);
        var con = this;
        this.audio6.player.nativeElement.addEventListener('ended', function () {
          con.justcall(2);
        }, false);
      }
      else {
        this.justcall(2);
      }
    }
    this.audiomute6 = this.audio6.volume
    //////function for audio6 control  - ends//////
  }

  selectaudio(e) {
    //////function for updating audio  - starts//////
    this.audioupdate.uid = localStorage.getItem("uid");
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.audioupdate.timestamp = date_val.toString();
    this.audioupdate.hashcode = hash_val;
    this.audioupdate.audioname = "Music " + e.target.id;
    this.toastr.success(this.profileWords[48] + " " + e.target.id + " " + this.profileWords[46])
    this.profileService.updateaudio(this.audioupdate).subscribe(
      (res) => {
        this.response = JSON.parse(JSON.stringify(res));
        if (this.response.code == "SA000") {
          console.log("updateaudio success")
        } else {
          if (this.response.code == "SA1061" ||
            this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
            localStorage.clear();
            this.router.navigateByUrl("/login");
          }
        }
      },
      (err) => {
      }
    );
    //////function for updating audio  - ends//////
  }

  event_val() {
    //////function for calling certificate   - starts//////
    localStorage.setItem("roadmap_chk", '1');
    this.router.navigateByUrl("/roadmap");
  }

  newclick() {
    //////function for setting edit option of username visible //////
    this.edit_name = "";
    this.edit_name_vis = false;
  }

  newclick1() {
    //////function for setting edit option of school visible //////
    this.edit_school = "";
    this.edit_schol_vis = false;
  }


}
