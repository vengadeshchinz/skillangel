import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
import { LocaldatastorageService } from '../localdatastorage.service';
import { getreport, getrank, getskill, getallassscore, getcert, getSubSkillScore } from '../services/report/report';
import { ReportService } from '../services/report/report.service';
import { ThemeService } from '../services/profile/theme.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { IpService } from '../services/ip/ip.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatasharingServiceService } from "../services/ip/datasharing-service.service";
import { Datashare1Service } from "../services/ip/datashare1.service";
import { url } from ".././services/baseurl";
import { profileget } from '../services/profile/profile';
import { ProfileService } from '../services/profile/profile.service'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  url = new url();
  //////theme variables//////
  colortheme = ['black', 'white'];
  colortheme_bg;
  colortheme_txt;
  load1;
  //////report variables//////
  getSubSkillScore = new getSubSkillScore();
  after_post = false;
  getallassscore = new getallassscore();
  getcert = new getcert();
  capturedImage;
  @ViewChild('downloadLink', { static: true }) downloadLink: ElementRef;
  @ViewChild('newinfo', { static: false }) newinfo;
  @ViewChild('certificate', { static: false }) certificate;
  isfull_val = true;
  Assesment_names = ["Detailed Assesment", "Assesment 1"];

  public show: boolean = false;
  public buttonName: any = 'Show';
  getReport = new getreport();
  isReportGet: boolean;
  showBtn = -1;
  response: any;
  showUndoBtn(index) {
    this.showBtn = index;
  }
  blob_file;
  assesment_types: any = [];

  constructor(private ElementRef1: ElementRef, private ProfileService_ts: ProfileService, private datashare1Serviceserv: Datashare1Service,
    private dataSharingService: DatasharingServiceService, private modalService: NgbModal,
    private sanitizer: DomSanitizer, private ip: IpService, private HttpClient_ts: HttpClient,
    private localDataStorageService: LocaldatastorageService, private theme: ThemeService,
    private ngxService: NgxUiLoaderService,
    private reportService: ReportService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });


    this.dataSharingService.callscore_fn.subscribe(value => {
      if (value != -1) {
        var val_con = value;
        this.dataSharingService.callscore_fn.next(-1);
        this.scoreFn(val_con);
      }
    });





  }

  toDataURL(url_arg, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url_arg);
    xhr.responseType = 'blob';
    xhr.send();
  }


  conditional = [true,
    true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true,
    true];
  i; id: any;
  mrgin_Arr = [['1.5vw', '1.2vw', '.5vw', '3.5vw'], ['-4vw', '-5vw', '-6vw', '9vw']];
  val_val = 0;
  cyc_val = true;
  Assesment_names_arr = ["Initial Assesment", "Detailed Assesment", "Personalized Training-c1",
    "Personalized Training-c2", 'Post Assessment']
  Assesment_names_val = '';
  Cycle_val = false;
  argn_val = 0;
  cycle_score_bspt_Arr = [];
  score_val_Arr = [];

  scoreFn(argn) {
    //////function for setting Assement name on roadmap's distinct score popup  - starts//////
    console.log(argn);
    this.argn_val = argn;
    this.Cycle_val = false;
    this.cyc_val = false;

    if (argn == -1) {
      this.cyc_val = true;
    } else {

      if (argn == 0) {
        this.Assesment_names_val = this.Assesment_names_arr[0];
      }
      else if (argn > 0 && argn < 9) {
        this.Cycle_val = true;
        this.Assesment_names_val = this.Assesment_names_arr[1];
      }
      else if (argn > 8 && argn < 17) {
        if (localStorage.getItem("isfullschudle_stored") == '0') {
          this.Cycle_val = false;
          this.Assesment_names_val = this.Assesment_names_arr[4];
        }
        else {
          this.Cycle_val = true;
          this.Assesment_names_val = this.Assesment_names_arr[2];
        }
      }
      else if (argn > 16 && argn < 25) {
        this.Cycle_val = true;
        this.Assesment_names_val = this.Assesment_names_arr[3];
      }
      else {
        this.Assesment_names_val = this.Assesment_names_arr[4];
      }
    }
    //////function for setting Assement name on roadmap's distinct score popup  - ends//////
  }

  callass() {
    //////function for getting overall roadmap score  - starts//////
    this.load1 = true;
    this.ngxService.startLoader('loader-reports');
    this.conditional = [true,
      true, true, true, true, true, true, true, true,
      true, true, true, true, true, true, true, true,
      true, true, true, true, true, true, true, true,
      true];
    for (this.i = 0; this.i < 26; this.i++) {
      this.score_val_Arr[this.i] = [0, 0, 0, 0, 0];
      this.cycle_score_bspt_Arr[this.i] = 0;
    }
    localStorage.setItem("score_val_Arr", JSON.stringify(this.score_val_Arr));
    localStorage.setItem("cycle_score_bspt_Arr", JSON.stringify(this.cycle_score_bspt_Arr));
    localStorage.setItem("conditional", JSON.stringify(this.conditional));
    this.getallassscore.uid = localStorage.getItem("uid");
    this.getallassscore.year_status = 1;
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.getallassscore.timestamp = date_val.toString();
    this.getallassscore.hashcode = hash_val;

    this.reportService.getallassscoredetails(this.getallassscore).subscribe(
      (res) => {
        this.id = JSON.parse(JSON.stringify(res));
        console.log(this.id)
        if (this.id.code == "SA000") {

          for (this.i = 0; this.i < this.id.cyclescore.length; this.i++) {
            this.score_val_Arr[this.i][0] = parseInt(this.id.cyclescore[this.i][0]);
            this.score_val_Arr[this.i][1] = parseInt(this.id.cyclescore[this.i][1]);
            this.score_val_Arr[this.i][2] = parseInt(this.id.cyclescore[this.i][2]);
            this.score_val_Arr[this.i][3] = parseInt(this.id.cyclescore[this.i][3]);
            this.score_val_Arr[this.i][4] = parseInt(this.id.cyclescore[this.i][4]);
            this.cycle_score_bspt_Arr[this.i] = (this.score_val_Arr[this.i][0] + this.score_val_Arr[this.i][1] +
              this.score_val_Arr[this.i][2] + this.score_val_Arr[this.i][3] + this.score_val_Arr[this.i][4]) / 5;
            this.conditional[this.i] = false;
          }
          localStorage.setItem("score_val_Arr", JSON.stringify(this.score_val_Arr));
          localStorage.setItem("cycle_score_bspt_Arr", JSON.stringify(this.cycle_score_bspt_Arr));
          localStorage.setItem("conditional", JSON.stringify(this.conditional));

          this.ngxService.stopLoader('loader-reports');
          this.countsession = setInterval(() => { this.stopnewload(); }, 400);
          this.modalService.open(this.newinfo, { centered: true });


        }
        else {
          if (this.id.code == "SA1061" ||
            this.id.code == "SA1041" || this.id.code == "SA1040" || this.id.code == "SA1039") {
            localStorage.clear();
            this.router.navigateByUrl("/login");
          }
          else if (this.id.code == "SA1138") {

            this.ngxService.stopLoader('loader-reports');
            this.countsession = setInterval(() => { this.stopnewload(); }, 400);
            this.modalService.open(this.newinfo, { centered: true });
          }
        }
      });
    //////function for getting overall roadmap score  - ends//////
  }


  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  iaVal: any = [];
  iaAvg: any;
  postVal: any = [];
  postAvg: any;
  over_all_score_val: any = [];
  over_all_bspi: any = [];
  isShowcompare: boolean = false;
  //////////////////barchart////////////////////////////////
  public barChartLabels: string[] = [''];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  barChartOptions: any;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [
    { data: [0], label: 'Memory' },
    { data: [0], label: 'Visual Processing' },
    { data: [0], label: 'Focus And Attention' },
    { data: [0], label: 'Problem Solving' },
    { data: [0], label: 'Linguistics' }
  ];

  public barChartData1: ChartDataSets[] = [
    { data: [0], label: 'Memory' },
    { data: [0], label: 'Visual Processing' },
    { data: [0], label: 'Focus And Attention' },
    { data: [0], label: 'Problem Solving' },
    { data: [0], label: 'Linguistics' }
  ];
  public barChartData3: ChartDataSets[] = [
    { data: [0], label: 'Memory' },
    { data: [0], label: 'Visual Processing' },
    { data: [0], label: 'Focus And Attention' },
    { data: [0], label: 'Problem Solving' },
    { data: [0], label: 'Linguistics' }
  ];

  public barChartColors: Color[] = [
    { backgroundColor: '#da0404' },
    { backgroundColor: '#ffc000' },
    { backgroundColor: '#92d050' },
    { backgroundColor: '#ff6800' },
    { backgroundColor: '#00b0f0' }
  ]
  public barChartColors1: Color[] = [
    { backgroundColor: '#da0404' },
    { backgroundColor: '#ffc000' },
    { backgroundColor: '#92d050' },
    { backgroundColor: '#ff6800' },
    { backgroundColor: '#00b0f0' }
  ]
  skillVal = ["Memory", "Visual Processing", "Focus And Attention", "Problem Solving", "Linguistics"]
  barchart1: boolean;
  barchart2: boolean;
  gaugechart1: boolean;
  gaugechart2: boolean;
  chartPrevno: number = 0;
  data = [[10, 20, 30, 40, 50], [20, 40, 60, 80, 90], [10, 20, 30, 40, 50], [20, 40, 60, 80, 90], [10, 20, 30, 40, 50],
  [20, 40, 60, 80, 90], [10, 20, 30, 40, 50], [20, 40, 60, 80, 90], [10, 20, 30, 40, 50], [20, 40, 60, 80, 90], [10, 20, 30, 40, 50]]
  bspiVal = [10, 20, 30, 40, 50, 20, 40, 60, 80, 90, 100]
  avg_skill_val: any = [];
  avg_bspi: any = [];
  barchart1name: any;
  barchart2name: any;
  showbtn: boolean = true;
  showbtn_nodata: boolean = true;
  // ass_comp: number;
  /////////////////gauge//////////////////////////////////////////
  colorVal: any;
  element: any;
  themechange: any;
  public canvasWidth: number;
  public centralLabel = ''
  public name = '';
  chartWidth: number;
  needleValue: number = 0.00;
  needleValue1: number;
  options: any;
  options1: any;
  options2: any;
  reportWords: any;
  assessWords: any;
  ///////////////Resize canvasWidth gauge/////////////////////
  onResize() {
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
    //////function for getting screen size  - ends//////
  }

  mySubscription: any;
  skillkitRegular_btn: boolean = false;
  //////////////////////////////////////////////////
  @HostListener('window:resize', ['$event'])
  onResize1(event) {
    console.log(event.target.innerWidth);
    this.dataSharingService.isrep3_gauge.next(1);
    this.datashare1Serviceserv.isrep5_gauge.next(1);
    this.datashare1Serviceserv.isrep4_gauge.next(1);
  }
  isRankVis: boolean = true;
  roadmap() {
    //not used currently//////
    this.router.navigateByUrl('/certificate');
  }
  mob_val = true;
  countsession;
  stopnewload() {
    clearInterval(this.countsession);
    this.load1 = false;
  }

  cli() {
        //////function for open certificate popup //////
    this.modalService.open(this.certificate, { centered: true });
  }
  getProfile = new profileget();
  crt_url = this.url.dlcertificateUrl + localStorage.getItem("uid") + ".png";
  img_src = false;
  certificatefn() {
     //////function for generate certificate //////
    this.getProfile.uid = localStorage.getItem("uid");
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.getProfile.timestamp = date_val.toString();
    this.getProfile.hashcode = hash_val;
    this.load1 = true;
    this.ngxService.startLoader('loader-reports');
    this.ProfileService_ts.getprofile(this.getProfile).subscribe(
      (res) => {
        this.response = JSON.parse(JSON.stringify(res));
        if (this.response.code == "SA000") {
          console.log(this.response.gradename);
          var grade_val = 0;

          if (this.response.gradename == "Grade 1")
            grade_val = 1;
          else if (this.response.gradename == "Grade 2")
            grade_val = 2;
          else if (this.response.gradename == "Grade 3")
            grade_val = 3;
          else if (this.response.gradename == "Grade 4")
            grade_val = 4;
          else if (this.response.gradename == "Grade 5")
            grade_val = 5;
          else if (this.response.gradename == "Grade 6")
            grade_val = 6;
          else if (this.response.gradename == "Grade 7")
            grade_val = 7;
          else if (this.response.gradename == "Grade 8")
            grade_val = 8;
          else if (this.response.gradename == "Grade 9")
            grade_val = 9;
          else if (this.response.gradename == "Grade 10")
            grade_val = 10;
          else if (this.response.gradename == "Grade 11")
            grade_val = 11;
          else if (this.response.gradename == "Grade 12")
            grade_val = 12;

          console.log(grade_val);

          // this.post('http://hotsa.skillangels.com/certificateV1/certs.php', {
          //   uid : localStorage.getItem("uid"),
          //   currentLevel : grade_val.toString(),
          //   name :localStorage.getItem("uname")
          // });

          this.getcert.uid = localStorage.getItem("uid");
          this.getcert.currentLevel = grade_val.toString();
          this.getcert.name = localStorage.getItem("uname");
          this.reportService.getcertdetails(this.getcert).subscribe(
            (res1) => {
              this.response = JSON.parse(JSON.stringify(res1));
              console.log(this.response);
              if (this.response.status == 1) {

                this.crt_url = this.url.dlcertificateUrl + localStorage.getItem("uid") + ".png";
                this.img_src = true;
                this.ngxService.stopLoader('loader-reports');
                this.countsession = setInterval(() => { this.stopnewload(); }, 400);
              }
              else {

                this.img_src = false;
                this.ngxService.stopLoader('loader-reports');
                this.countsession = setInterval(() => { this.stopnewload(); }, 400);
              }


            }
          )
        }
        else {
          console.log("unable to generate");
          this.img_src = false;
          this.ngxService.stopLoader('loader-reports');
          this.countsession = setInterval(() => { this.stopnewload(); }, 400);
        }
      });


    // var res=  this.HttpClient_ts.get("http://hotsa.skillangels.com/certificateV1/certs.php");
    // console.log( JSON.parse(JSON.stringify(res)))
    // return this.HttpClient_ts.get('https://hotsa.skillangels.com/certificateV1/certs.php') // <-- Here
    // .subscribe(
    // (res: Response) => {
    //   var data = res;
    //   console.log(data)
    // },
    // (err: Error) => console.log(err)
    // );


    this.modalService.open(this.certificate, { centered: true });
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
  downloadUrl() {
     //////function for downloading certificate //////
    // this.toDataURL('https://pbs.twimg.com/profile_images/558329813782376448/H2cb-84q_400x400.jpeg',
    this.toDataURL(this.url.dlcertificateUrl + localStorage.getItem("uid") + ".png",
      function (dataUrl) {
        console.log(dataUrl);
        const a: any = document.createElement('a');
        a.href = dataUrl;
        a.download = (localStorage.getItem("uname"))[0].toUpperCase() + (localStorage.getItem("uname")).substr(1).toLowerCase() + ` Certificate.png`;
        document.body.appendChild(a);
        a.style = 'display: none';
        a.click();
        a.remove();
      })
  }



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
      var width = window.innerWidth;
      if (width < 768 && window.orientation != 90) {
        this.mob_val = false;
        this.val_val = 1;
        console.log('mobile device detected' + window.orientation)
      } else if (width >= 768 && width <= 992) {
        console.log('tablet detected');
        this.mob_val = true;
        this.val_val = 0;

      } else {
        this.mob_val = true;
        this.val_val = 0;
        console.log('desktop detected')

      }

      if (localStorage.getItem("isfullschudle_stored") == '0') {
        this.isfull_val = false;
      }
      else {
        this.isfull_val = true;
      }
      ///////////////////////////////////////////////////
      this.load1 = true;
      this.ngxService.startLoader('loader-reports');
      ////////////////Pick color////////////////////////////
      this.theme.currenttheme.subscribe(themename => this.themechange = themename)
      this.element = document.querySelector('.' + this.themechange)
      this.colorVal = getComputedStyle(this.element).getPropertyValue('--base-color');
      ////////////////////////barchart/////////////////////
      this.barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: true,
              ticks: {
                fontSize: 10,
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
                fontSize: 10,
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

      this.barchart1 = true;
      this.barchart2 = false;
      this.gaugechart1 = true;
      this.gaugechart2 = false;



      /////////////////gauge////////////////
      this.options = {
        hasNeedle: true,
        needleColor: this.colortheme_txt,
        needleStartValue: 50,
        arcColors: ["#c02127", "#f36723", "#fdc012", "#95c954", "#2be035"],
        arcDelimiters: [20, 40, 60, 80],
        rangeLabel: ["0", "100"],
        responsive: true
      };
      this.options1 = {
        hasNeedle: true,
        needleColor: this.colortheme_txt,
        needleStartValue: 50,
        arcColors: ["#c02127", "#f36723", "#fdc012", "#95c954", "#2be035"],
        arcDelimiters: [20, 40, 60, 80],
        rangeLabel: ["0", "100"],
        responsive: true
      };
      this.options2 = {
        hasNeedle: true,
        needleColor: "black",
        needleStartValue: 50,
        arcColors: ["#c02127", "#f36723", "#fdc012", "#95c954", "#2be035"],
        arcDelimiters: [20, 40, 60, 80],
        rangeLabel: ["0", "100"],
        responsive: true
      };
      if (window.innerWidth > 1500) {
        this.canvasWidth = window.innerWidth / 5;
      } else if (window.innerWidth > 1000) {
        this.canvasWidth = window.innerWidth / 5;
      } else if (window.innerWidth > 500) {
        this.canvasWidth = window.innerWidth / 3;
      } else {
        this.canvasWidth = window.innerWidth / 2;
      }

      /////////////////////Get report/////////////////////////

      this.reportWords = JSON.parse(localStorage.getItem('langwords') || '[]');
      this.assessWords = [this.reportWords[2], this.reportWords[40], this.reportWords[41] + " - C1", this.reportWords[41] + " - C2", this.reportWords[41] + " - C3", this.reportWords[41] + " - C4",
      this.reportWords[41] + " - C5", this.reportWords[41] + " - C6", this.reportWords[41] + " - C7", this.reportWords[41] + " - C8", this.reportWords[41] + " - C9"];

      this.barChartData = [
        { data: [0], label: this.reportWords[13] },
        { data: [0], label: this.reportWords[14] },
        { data: [0], label: this.reportWords[15] },
        { data: [0], label: this.reportWords[16] },
        { data: [0], label: this.reportWords[17] }
      ];
      this.skillVal = [this.reportWords[13], this.reportWords[14], this.reportWords[15],
      this.reportWords[16], this.reportWords[17]]

      this.barchart1name = this.reportWords[2]
      this.getReport.uid = localStorage.getItem("uid");
      this.getReport.eid = parseInt(localStorage.getItem("eid"));
      this.avg_skill_val = [];
      let date_val: Date;
      date_val = new Date();
      let hash_val = this.ip.gethash(date_val);
      this.getReport.timestamp = date_val.toString();
      this.getReport.hashcode = hash_val;
      //////API for getting report score & bspi- starts//////
      this.reportService.getreport(this.getReport).subscribe(
        (res) => {

          this.response = JSON.parse(JSON.stringify(res));

          this.getreportrank();
          if (this.response.code == "SA000") {
            this.iaVal = this.response.iaVal
            this.iaAvg = this.response.bspi_ia
            this.postVal = this.response.postVal
            this.postAvg = this.response.bspi_post
            this.avg_skill_val = this.response.avg_score_val;
            this.avg_bspi = this.response.avg_bspi;
            this.over_all_score_val = []
            console.log(this.avg_skill_val)
            if (this.avg_skill_val.length > 1) {
              this.isskillkitfn();
            }

            if (this.iaVal.length != 0) {
              this.assesment_types.push(this.reportWords[2])
              this.over_all_score_val.push(this.iaVal[0])
              this.over_all_bspi.push(this.iaAvg)
            }
            if (this.avg_skill_val.length != 0) {
              for (let i = 0; i < this.avg_skill_val.length; i++) {
                if (i == 0) {
                  this.assesment_types.push(this.reportWords[40])
                } else {
                  this.assesment_types.push(this.reportWords[41] + " - C" + (i))
                }
                this.over_all_score_val.push(this.avg_skill_val[i])
                this.over_all_bspi.push(this.avg_bspi[i])
              }

            }
            if (this.postVal.length != 0) {
              if (this.postVal[0].length == 5) {
                this.after_post = true;
              }
              else {
                this.after_post = false;
              }

              this.assesment_types.push(this.reportWords[45])
              this.over_all_score_val.push(this.postVal[0])
              this.over_all_bspi.push(this.postAvg)
            }

            if (this.assesment_types.length == 1) {
              this.isShowcompare = false;
            } else if (this.assesment_types.length == 0) {
              this.assesment_types.push(this.reportWords[2])
              this.isShowcompare = false;
            } else {
              this.isShowcompare = true;
            }


            this.barchart1name = this.assesment_types[this.chartPrevno]

            if (this.over_all_score_val.length == 0) {
              this.needleValue = 0.00;
              localStorage.setItem("rep3_needleValue", this.needleValue.toString());
              this.dataSharingService.isrep3_gauge.next(1);
            } else {
              this.barChartData = []
              this.barChartData1 = []
              for (let i = 0; i < this.over_all_score_val[0].length; i++) {
                this.barChartData.push({ data: [this.over_all_score_val[0][i]], label: this.skillVal[i] });
              }
              this.needleValue = this.over_all_bspi[this.chartPrevno];
              localStorage.setItem("rep3_needleValue", this.needleValue.toString());
              this.dataSharingService.isrep3_gauge.next(1);
              this.starCalculationFn();
            }
          } else {
            if (this.response.code == "SA1061" ||
              this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
              localStorage.clear();
              this.router.navigateByUrl("/login");
            }
          }
          //////API for getting report score & bspi- starts//////
        },
        (err) => {
        }
      );
    }
    //////Initail function for defining basic varibles  - ends//////
  }
  getskill = new getskill();
  skillkitVal: any = []
  isskillkitfn() {
    //////function for getting skillkit report status- starts//////
    console.log("coming this")
    this.getskill.uid = localStorage.getItem("uid");
    this.getskill.eid = parseInt(localStorage.getItem("eid"));
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.getskill.timestamp = date_val.toString();
    this.getskill.hashcode = hash_val;

    this.reportService.getskillkit(this.getReport).subscribe(
      (res) => {
        this.response = JSON.parse(JSON.stringify(res));
        console.log(this.response)
        if (this.response.code == "SA000") {
          this.skillkitVal = this.response.skillkitval;
        } else {
          if (this.response.code == "SA1061" ||
            this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
            localStorage.clear();
            this.router.navigateByUrl("/login");
          }
        }
      }
    )
    //////function for getting skillkit report status- starts//////
  }

  strCnt: any = []
  allstrCnt: any = []
  memStrcnt: number;
  vpStrcnt: number;
  faStrcnt: number;
  psStrcnt: number;
  linStrcnt: number;
  strCnt_all: number = 0;
  strCnt_all1: number = 0;
  isoverallstar: boolean = true;
  starCalculationFn() {
    //////function for calculating star- starts//////
    if (parseInt(localStorage.getItem("curr_assess_login")) == 1) {
      this.isoverallstar = true;
      this.strCnt = this.iaVal[0]
      if (this.iaVal.length != 0) {
        for (let j = 0; j < this.iaVal[0].length; j++) {
          if (this.strCnt[j] >= 0 && this.strCnt[j] < 20) {

            this.strCnt_all1 = 0
          }
          if (this.strCnt[j] >= 20 && this.strCnt[j] <= 40) {
            this.strCnt_all1 = 1;
          } else if (this.strCnt[j] > 40 && this.strCnt[j] <= 60) {

            this.strCnt_all1 = 2;
          } else if (this.strCnt[j] > 60 && this.strCnt[j] <= 80) {

            this.strCnt_all1 = 3;
          } else if (this.strCnt[j] > 80 && this.strCnt[j] <= 90) {

            this.strCnt_all1 = 4;
          } else if (this.strCnt[j] > 90 && this.strCnt[j] <= 100) {

            this.strCnt_all1 = 5;
          }
          this.strCnt_all += this.strCnt_all1;

        }
      }
    } else if (parseInt(localStorage.getItem("curr_assess_login")) == 3) {

      this.isoverallstar = true;
      this.strCnt = this.postVal[0]
      if (this.postVal.length != 0) {
        for (let j = 0; j < this.postVal[0].length; j++) {
          if (this.strCnt[j] >= 0 && this.strCnt[j] < 20) {

            this.strCnt_all1 = 0
          }
          if (this.strCnt[j] >= 20 && this.strCnt[j] <= 40) {
            this.strCnt_all1 = 1;
          } else if (this.strCnt[j] > 40 && this.strCnt[j] <= 60) {

            this.strCnt_all1 = 2;
          } else if (this.strCnt[j] > 60 && this.strCnt[j] <= 80) {

            this.strCnt_all1 = 3;
          } else if (this.strCnt[j] > 80 && this.strCnt[j] <= 90) {

            this.strCnt_all1 = 4;
          } else if (this.strCnt[j] > 90 && this.strCnt[j] <= 100) {

            this.strCnt_all1 = 5;
          }
          this.strCnt_all += this.strCnt_all1;
        }
      }
    } else {
      this.isoverallstar = false;
    }
    //////function for calculating star- ends//////
  }

  getrankreport = new getrank()
  totalUser: any = []
  totalUserName: any = []
  totalUserrank: any = []
  user_id: any;
  targetUser: any;
  colorvalRank = ['#ffbc24', '#b6b4b4', '#cd7f32', '#7077a5']
  colorvalRank_html = []
  getreportrank() {
    //////function for getting rank- starts//////
    this.totalUser = []
    this.totalUserName = []
    this.colorvalRank_html = []
    this.totalUserrank = []
    this.user_id = localStorage.getItem("uid");
    this.getrankreport.uid = localStorage.getItem("uid");
    this.getrankreport.eid = parseInt(localStorage.getItem("eid"));
    this.getrankreport.branch_id = localStorage.getItem('Branch_id_val');
    this.getrankreport.section_id = localStorage.getItem('Section_id_val');
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.getrankreport.timestamp = date_val.toString();
    this.getrankreport.hashcode = hash_val;

    this.reportService.getrank(this.getrankreport).subscribe(
      (res) => {
        this.response = JSON.parse(JSON.stringify(res));
        console.log(this.response)
        if (this.response.code == "SA000") {


          this.totalUser = JSON.parse(JSON.stringify(this.response.rank_list));

          for (let j = 0; j < this.totalUser.length; j++) {
            if (this.user_id == this.totalUser[j].uid) {
              this.targetUser = j;
            }
            this.totalUserName.push(this.totalUser[j].username)
            this.totalUserrank.push(this.totalUser[j].rank)
          }
          for (let i = 0; i < this.totalUser.length; i++) {
            if (this.totalUser[i].rank == 1) {
              this.colorvalRank_html.push(this.colorvalRank[i])
            } else if (this.totalUser[i].rank == 2) {
              this.colorvalRank_html.push(this.colorvalRank[i])
            } else if (this.totalUser[i].rank == 3) {
              this.colorvalRank_html.push(this.colorvalRank[i])
            } else {
              this.colorvalRank_html.push(this.colorvalRank[3])
            }
          }
          this.isReportGet = true;
          this.endLoader();
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
    //////function for getting rank- ends//////
  }

  endLoader() {
    //////function for endiing loader//////
    if (this.isReportGet == true) {
      try {

        this.ngxService.stopLoader('loader-reports');
        this.countsession = setInterval(() => { this.stopnewload(); }, 400);

      }
      catch {
      }
    }
  }
  checkcompare: boolean = true;
  showgraph: boolean = false;
  text_colorVal: any;
  chartval: number = 0;
  sub_chk = 0;
  SubSkill_chk = false;
  sub_val_vis = false;

  subskillname_Arr = ["chg", "vjha", "shkucja", "havch", "cbakjcn", "cvajcb"];
  subskillval_Arr = [10, 20, 30, 40, 50, 60];
  ia_val; post_val; clp_val;
  SubSkill(val) {
    console.log('SubSkill true' + val);
    //////function for subskill visibility//////
    this.SubSkill_chk = true;
    this.getSubSkillScore.uid = localStorage.getItem("uid");
    this.getSubSkillScore.eid = parseInt(localStorage.getItem("eid"));
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.getSubSkillScore.timestamp = date_val.toString();
    this.getSubSkillScore.hashcode = hash_val;
    this.load1 = true;
    this.ngxService.startLoader('loader-reports');
    this.reportService.getSubSkillScoreDetails(this.getSubSkillScore).subscribe(
      (res) => {
        this.subskillname_Arr = []; this.subskillval_Arr = [];
        this.response = JSON.parse(JSON.stringify(res));
        console.log(this.response)
       
        if (this.response.code == "SA000") {
          this.ia_val = this.response.iaVal;
          this.post_val = this.response.postVal;
          this.clp_val = this.response.avg_score_val;
          this.subskillname_Arr = []; this.subskillval_Arr = [];


          if (val == 0) {
            if (this.ia_val.length > 0) {
              this.sub_val_vis = true;
              for (this.i = 0; this.i < this.ia_val.length; this.i++) {
                this.subskillname_Arr[this.i] = this.ia_val[this.i][2];
                this.subskillval_Arr[this.i] = this.ia_val[this.i][0];
              }

            }
            else {
              this.sub_val_vis = false;
            }

          }
          else if (val == 1) {
            this.sub_val_vis = false;
            if (this.clp_val.length > 0) {
              var clp1inc = 0;
              for (this.i = 0; this.i < this.clp_val.length; this.i++) {
                if (this.clp_val[this.i][3] == "1") {
                  this.sub_val_vis = true;
                  this.subskillname_Arr[clp1inc] = this.clp_val[this.i][2];
                  this.subskillval_Arr[clp1inc] = this.clp_val[this.i][0];
                  clp1inc++;
                }
              }
            }
            else {
              this.sub_val_vis = false;
            }
          }
          else if (val == 2) {

            this.sub_val_vis = false;
            if (this.clp_val.length > 0) {
              var clp1inc1 = 0;
              for (this.i = 0; this.i < this.clp_val.length; this.i++) {
                if (this.clp_val[this.i][3] == "2") {
                  this.sub_val_vis = true;
                  this.subskillname_Arr[clp1inc1] = this.clp_val[this.i][2];
                  this.subskillval_Arr[clp1inc1] = this.clp_val[this.i][0];
                  clp1inc1++;
                }
              }
            }
            else {
              this.sub_val_vis = false;
            }

          }
          else if (val == 3) {
            this.sub_val_vis = false;
            if (this.clp_val.length > 0) {
              var clp1inc2 = 0;
              for (this.i = 0; this.i < this.clp_val.length; this.i++) {
                if (this.clp_val[this.i][3] == "3") {
                  this.sub_val_vis = true;
                  this.subskillname_Arr[clp1inc2] = this.clp_val[this.i][2];
                  this.subskillval_Arr[clp1inc2] = this.clp_val[this.i][0];
                  clp1inc2++;
                }
              }
            }
            else {
              this.sub_val_vis = false;
            }

          }
          else if (val == 4) {
            if (this.post_val.length > 0) {
              this.sub_val_vis = true;
              for (this.i = 0; this.i < this.post_val.length; this.i++) {
                this.subskillname_Arr[this.i] = this.post_val[this.i][2];
                this.subskillval_Arr[this.i] = this.post_val[this.i][0];
              }
            }
            else {
              this.sub_val_vis = false;
            }
          }


          this.ngxService.stopLoader('loader-reports');
          this.countsession = setInterval(() => { this.stopnewload(); }, 400);
        }
        else {
          if (this.response.code == "SA1061" ||
            this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
            localStorage.clear();
            this.router.navigateByUrl("/login");
          }
          if (this.response.code == "SA1234") {
            this.sub_val_vis = false;
            this.ngxService.stopLoader('loader-reports');
            this.countsession = setInterval(() => { this.stopnewload(); }, 400);
          }
        }
      });

    

  }
  Showchart(chartno: number) {
    //////function for setting chart1 data- starts//////
    this.SubSkill_chk = false;
    this.sub_chk = chartno;
    if (chartno <= 1 || chartno == 4) {
      this.skillkitRegular_btn = false;
    }
    if (chartno == 0) {
      this.isRankVis = true
    } else {
      this.isRankVis = false
    }

    this.skillkitRegular = true
    this.isskillkit_ava = false;
    this.isShowcompare = true
    this.checkcompare = true;
    this.showgraph = false;
    if (chartno == 2 || chartno == 3) {
      this.isskillkit_ava = true;
      this.chartval = chartno - 2;
      this.skillkitRegular_btn = true;
    }
    this.barchart2 = false;
    this.barChartData1 = []
    this.barchart1name = this.assesment_types[chartno]
    this.needleValue = this.over_all_bspi[chartno];
    localStorage.setItem("rep3_needleValue", this.needleValue.toString());
    this.dataSharingService.isrep3_gauge.next(1);
    this.barChartData = []
    for (let i = 0; i < this.over_all_score_val[0].length; i++) {
      this.barChartData.push({ data: [this.over_all_score_val[chartno][i]], label: this.skillVal[i] });
    }
    this.chartPrevno = chartno;
    //////function for setting chart1 data- ends//////
  }
  Showchart1(chartno: number) {
    //////function for setting chart2 data- starts//////
    this.SubSkill_chk = false;
    if (this.chartval == 0) {
      chartno = 2;
    } else if (this.chartval == 1) {
      chartno = 3;
    }
    this.skillkitRegular = true
    this.isskillkit_ava = false;
    this.isShowcompare = true
    this.checkcompare = true;
    this.showgraph = false;
    if (chartno == 2 || chartno == 3) {
      this.isskillkit_ava = true;
      this.chartval = chartno - 2;
      this.skillkitRegular_btn = true;
    }
    this.barchart2 = false;
    this.barChartData1 = []
    this.barchart1name = this.assesment_types[chartno]
    this.needleValue = this.over_all_bspi[chartno];
    localStorage.setItem("rep3_needleValue", this.needleValue.toString());
    this.dataSharingService.isrep3_gauge.next(1);
    this.barChartData = []
    for (let i = 0; i < this.over_all_score_val[0].length; i++) {
      this.barChartData.push({ data: [this.over_all_score_val[chartno][i]], label: this.skillVal[i] });
    }
    this.chartPrevno = chartno;
    //////function for setting chart2 data- ends//////
  }
  getDiffVal: any = []
  isskillkit_ava: boolean = false;
  comparechart(chartno: number) {
    //////function for setting compare chart basic names- starts//////
    this.isRankVis = false
    this.skillkitRegular = true;
    this.skillkitRegular_btn = false;
    if (this.chartPrevno != chartno) {
      this.getDiffVal = []
      var chartstatus = 0, tempno;
      this.checkcompare = false
      this.showgraph = true;
      this.barchart2 = true;
      this.barChartData1 = []
      if (chartno < this.chartPrevno) {
        tempno = chartno;
        chartno = this.chartPrevno;
        this.chartPrevno = tempno;
        chartstatus = 1;

      }

      this.barchart1name = this.assesment_types[this.chartPrevno]
      this.barchart2name = this.assesment_types[chartno]
      this.needleValue = this.over_all_bspi[this.chartPrevno];
      localStorage.setItem("rep5_needleValue", this.needleValue.toString());
      this.datashare1Serviceserv.isrep5_gauge.next(1);
      this.needleValue1 = this.over_all_bspi[chartno];
      localStorage.setItem("rep4_needleValue", this.needleValue1.toString());
      this.datashare1Serviceserv.isrep4_gauge.next(1);
      this.barChartData = []
      for (let i = 0; i < this.over_all_score_val[0].length; i++) {
        this.barChartData.push({ data: [this.over_all_score_val[this.chartPrevno][i]], label: this.skillVal[i] });
        this.barChartData1.push({ data: [this.over_all_score_val[chartno][i]], label: this.skillVal[i] });
        this.getDiffVal.push(this.over_all_score_val[chartno][i] - this.over_all_score_val[this.chartPrevno][i])
        console.log(this.getDiffVal)
      }
      if (chartstatus == 0) {
        this.chartPrevno = chartno;
      }

    }
    //////function for setting compare chart basic names- ends//////
  }
  skillkitRegular: boolean = true;
  Showskillkitchart() {
    //////function for setting skillkit chart data- starts//////
    this.SubSkill_chk = false;
    if (this.isskillkit_ava == true) {
      console.log(this.skillkitVal)
      this.skillkitRegular = false
      if (this.skillkitVal.length > 0) {
        if (this.skillkitVal.length == 2) {
          this.barChartData3 = []
          for (let i = 0; i < this.skillkitVal[this.chartval].length; i++) {
            this.barChartData3.push({ data: [this.skillkitVal[this.chartval][i]], label: this.skillVal[i] });
          }
        } else if (this.skillkitVal.length == 1) {
          if (this.chartval == 0) {
            this.barChartData3 = []
            for (let i = 0; i < this.skillkitVal[this.chartval].length; i++) {
              this.barChartData3.push({ data: [this.skillkitVal[this.chartval][i]], label: this.skillVal[i] });
            }
          } else {
            this.barChartData3 = []
            for (let i = 0; i < this.skillkitVal[0].length; i++) {
              this.barChartData3.push({ data: [0], label: this.skillVal[i] });
            }
          }
        }
      }
    }
    //////function for setting skillkit chart data- ends//////
  }



}
