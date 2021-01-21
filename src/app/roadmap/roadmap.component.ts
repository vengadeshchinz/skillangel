import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { getreport, getskill, getallassscore, getSubSkillScore, getcert } from '../services/report/report';
import { ReportService } from '../services/report/report.service';
import { ThemeService } from '../services/profile/theme.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { IpService } from '../services/ip/ip.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatasharingServiceService } from "../services/ip/datasharing-service.service";
import { url } from ".././services/baseurl";
import { profileget } from '../services/profile/profile';
import { ProfileService } from '../services/profile/profile.service'
//////////////////Chart
import { ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class RoadmapComponent implements OnInit {
  url = new url();
  //////theme variables//////
  colortheme = ['black', 'white'];
  colortheme_shad_val;
  colortheme_bg;
  colortheme_txt;
  colortheme_base = ['#0D0F12', 'white']
  colortheme_bg_base;
  colortheme_base_sec = ['#181C20', '#F0F0F0']
  colortheme_bg_base_sec;
  colortheme_txt1_Arr = ['rgba(255, 255, 255, 0.65)', 'black'];
  colortheme_txt1;

  color1; color2; color3; color4;
  load1;
  //////report variables//////
  color_val = [false, false, false, false, false, false, false, false];
  after_post = false;
  getallassscore = new getallassscore();
  isfull_val = true;
  getcert = new getcert();
  colorVal: any;
  element: any;
  themechange: any;
  public show: boolean = false;
  public buttonName: any = 'Show';
  getReport = new getreport();
  isReportGet: boolean;
  showBtn = -1;
  response: any;
  blob_file;
  assesment_types: any = [];
  crt_url = this.url.dlcertificateUrl + localStorage.getItem("uid") + ".png";
  img_src = false;
  constructor(
    private dataSharingService: DatasharingServiceService, private modalService: NgbModal,
    private ip: IpService,
    private theme: ThemeService,
    private ngxService: NgxUiLoaderService,
    private reportService: ReportService, private ProfileService_ts: ProfileService, private router: Router) {
    this.dataSharingService.callscore_fn.subscribe(value => {
      if (value != -1) {
        var val_con = value;
        this.dataSharingService.callscore_fn.next(-1);
        //  this.scoreFn(val_con);
      }
    });

    this.dataSharingService.backtoroad.subscribe(value => {
      if (value == 1) {
        this.backFn();
        this.dataSharingService.backtoroad.next(0);
    
      }
    });
  }
  @ViewChild('newinfo', { static: false }) newinfo;
  @ViewChild('certificate', { static: false }) certificate;
  conditional = [true,
    true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true,
    true];
  i; id: any;
  mrgin_Arr = [['1.5vw', '1.2vw', '.5vw', '3.5vw'], ['-4vw', '-5vw', '-6vw', '9vw']];
  val_val = 0;

  Assesment_names_arr = ["Initial Assesment", "Detailed Assesment", "Personalized Training-C1",
    "Personalized Training-C2", 'Post Assessment']
  Assesment_names_val = '';
  Cycle_val = false;
  argn_val = 0;
  cycle_score_bspt_Arr = [];
  score_val_Arr = [];
  isRoadMap: boolean = true;
  skillkitRegular_btn: boolean = false;
  isSkilkit: boolean = false;

  scoreFn(assname, argn) {

    if (assname != 1) {
      if (this.conditional[argn] == false) {
        this.subsco(assname, argn);
      }
      else {
        console.log("not completed")
      }
    }
    else if (assname == 1) {
      if (argn == 0) {
        if (this.conditional[0] == false) {
          this.subsco(assname, argn);
        }
      }
      else if (argn == 1) {
        if (this.conditional[8] == false) {
          this.subsco(assname, argn);
        }
      }
      else if (argn == 2) {
        if (this.conditional[16] == false) {
          this.subsco(assname, argn);
        }
      }
      else if (argn == 3) {
        if (this.conditional[24] == false) {
          this.subsco(assname, argn);
        }
      }
      else if (argn == 4) {
        if (this.conditional[25] == false) {
          this.subsco(assname, argn);
        }
      }
    }


  }
  subsco(assname, argn) {
    localStorage.setItem("roadback", (1).toString());
    this.isRoadMap = false;
    //////function for setting Assement name on roadmap's distinct score popup  - starts//////
    //console.log(assname);
    //console.log(argn);

    this.argn_val = argn;
    this.Cycle_val = false;

    // this.modalService.open(this.newinfo, { centered: true });
    if (argn == -1) {
      //console.log("argn -1");
    } else if (assname != 1) {

      if (argn == 0) {
        this.Assesment_names_val = this.Assesment_names_arr[0];
      }
      else if (argn > 0 && argn < 9) {
        this.Cycle_val = true;
        this.Assesment_names_val = this.Assesment_names_arr[1] + ' - Cycle - ' + argn;
      }
      else if (argn > 8 && argn < 17) {
        if (localStorage.getItem("isfullschudle_stored") == '0') {
          this.Cycle_val = false;
          this.Assesment_names_val = this.Assesment_names_arr[4];
        }
        else {
          this.Cycle_val = true;
          this.Assesment_names_val = this.Assesment_names_arr[2] + ' - Cycle - ' + argn;
        }
      }
      else if (argn > 16 && argn < 25) {
        this.Cycle_val = true;
        this.Assesment_names_val = this.Assesment_names_arr[3] + ' - Cycle - ' + argn;
      }
      else {
        this.Assesment_names_val = this.Assesment_names_arr[4];
      }
      console.log(argn)
      console.log(this.score_val_Arr)
      console.log(argn < this.score_val_Arr.length)
      if (argn < this.score_val_Arr.length) {
        this.changeBarChartVal(assname, argn);
      } else {
        this.barChartData = []
        this.needleValue = 0.0
        for (let i = 0; i < this.skillVal.length; i++) {
          this.barChartData.push({ data: [0], label: this.skillVal[i] });
        }
      }
      // cycle_score_bspt_Arr
      // this.getReport()
    } else if (assname == 1) {
      // //console.log('here')
      if (argn == 0) {
        this.Assesment_names_val = this.Assesment_names_arr[0];
      } else if (argn == 1) {
        this.Assesment_names_val = this.Assesment_names_arr[1];
      } else if (argn == 2) {
        this.Assesment_names_val = this.Assesment_names_arr[2];
      } else if (argn == 3) {
        this.Assesment_names_val = this.Assesment_names_arr[3];
      } else if (argn == 4) {
        this.Assesment_names_val = this.Assesment_names_arr[4];
      }
      console.log(this.over_all_score_val)
      console.log(argn < this.over_all_score_val.length)
      if (argn < this.over_all_score_val.length) {
        this.changeBarChartVal(assname, argn);
      } else {
        this.barChartData = []
        this.needleValue = 0.0
        for (let i = 0; i < this.skillVal.length; i++) {
          this.barChartData.push({ data: [0], label: this.skillVal[i] });
        }
        this.isSkilkit = true;
        this.SubSkill_chk = false;
        this.isBtnVis = false;
      }
    }
    //////function for setting Assement name on roadmap's distinct score popup  - ends//////
  }

  changeChart(assname) {
    //console.log(this.selectedChart)
    //console.log(assname)
    this.changeBarChartVal(assname, this.selectedChart)
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

  toDataURL(url_arg, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('POST', url_arg);
    xhr.responseType = 'blob';
    xhr.send();
  }

  selectedChart: number;
  isBtnVis: boolean = false;

  changeBarChartVal(assname, argn) {
    this.isSkilkit = true;
    this.SubSkill_chk = false;


    this.selectedChart = argn;
    this.sub_chk = argn;
    // console.log('here')
    console.log(this.over_all_score_val)

    if (assname == 1) {
      this.isBtnVis = true;
      if (this.over_all_score_val.length > 0) {

        if (argn <= 1 || argn == 4) {
          this.skillkitRegular_btn = false;
        } else {
          this.skillkitRegular_btn = true;
        }
        if (argn == 4) {
          if (localStorage.getItem("isfullschudle_stored") == '0') {
            argn = 2
          } else {
            argn = 4;
          }
        }
        if (argn < this.over_all_score_val.length) {
          this.barChartData = []
          this.needleValue = 0.0
          for (let i = 0; i < this.over_all_score_val[argn].length; i++) {
            this.barChartData.push({ data: [this.over_all_score_val[argn][i]], label: this.skillVal[i] });
          }
          this.needleValue = this.over_all_bspi[argn];
        }

      }
    }
    else {
      this.barChartData = []
      this.needleValue = 0.0
      this.isBtnVis = false;
      this.skillkitRegular_btn = false;
      //  //console.log( this. over_all_score_val[argn]) 
      for (let i = 0; i < this.score_val_Arr[argn].length; i++) {
        this.barChartData.push({ data: [this.score_val_Arr[argn][i]], label: this.skillVal[i] });
      }

      this.needleValue = this.cycle_score_bspt_Arr[argn];
    }

  }

  // isskillkit_ava: boolean = false;
  skillkitRegular: boolean = true;

  Showskillkitchart() {
    this.isSkilkit = false;
    this.SubSkill_chk = false;
    //////function for setting skillkit chart data- starts//////
    // this.SubSkill_chk = false;
    // if (this.isskillkit_ava == true) {
    //console.log(this.skillkitVal)
    this.skillkitRegular = false
    if (this.skillkitVal.length > 0) {
      if (this.selectedChart == 2 || this.selectedChart == 3) {
        this.barChartData = []
        for (let i = 0; i < this.skillkitVal[this.selectedChart - 2].length; i++) {
          this.barChartData.push({ data: [this.skillkitVal[this.selectedChart - 2][i]], label: this.skillVal[i] });
        }
      } else {
        this.barChartData = []
        for (let i = 0; i < this.skillVal.length; i++) {
          this.barChartData.push({ data: [0], label: this.skillVal[i] });
        }
      }
    } else {
      this.barChartData = []
      for (let i = 0; i < this.skillVal.length; i++) {
        this.barChartData.push({ data: [0], label: this.skillVal[i] });
      }
    }
    // }
    //////function for setting skillkit chart data- ends//////
  }

  ///////////////////Subskill change///////////
  SubSkill_chk: boolean = false;
  sub_val_vis: boolean = false;
  sub_chk = 0

  SubSkill() {
    console.log('here')
    console.log(this.clp_val)
    let val = this.selectedChart;

    this.SubSkill_chk = true;
    this.isSkilkit = false;
    this.subskillname_Arr = []; this.subskillval_Arr = [];
    if (val == 1) {
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
  }

  callass() {
    //////function for getting overall roadmap score  - starts//////
    this.load1 = true;
    this.ngxService.startLoader('loader-roadmap');
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
        //console.log(this.id)
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
          this.dataSharingService.new_pass.next(1);
          // this.ngxService.stopLoader('loader-roadmap');
          // this.countsession = setInterval(() => { this.stopnewload(); }, 400);
          this.getReportScore();
        }
        else {
          if (this.id.code == "SA1061" ||
            this.id.code == "SA1041" || this.id.code == "SA1040" || this.id.code == "SA1039") {
            localStorage.clear();
            this.router.navigateByUrl("/login");
          }
          else if (this.id.code == "SA1138") {
            this.dataSharingService.new_pass.next(1);
            this.ngxService.stopLoader('loader-roadmap');
            this.countsession = setInterval(() => { this.stopnewload(); }, 400);

          }
        }
      });
    //////function for getting overall roadmap score  - ends//////
  }

  ngOnDestroy() {

  }

  //////Function for getting report score & bspi- starts//////
  iaVal: any = [];
  iaAvg: any;
  postVal: any = [];
  postAvg: any;
  over_all_score_val: any = [];
  over_all_bspi: any = [];
  isShowcompare: boolean = false;
  avg_skill_val: any = [];
  avg_bspi: any = [];
  skillkitVal: any = []
  barchart1name: any;
  barchart2name: any;
  chartPrevno: number = 0;
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
  /////////////////gauge//////////////////////////////////////////
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
  getReportScore() {
    let date_val: Date;
    date_val = new Date();
    let hash_val = this.ip.gethash(date_val);
    this.getReport.uid = localStorage.getItem("uid");
    this.getReport.eid = parseInt(localStorage.getItem("eid"));
    this.getReport.timestamp = date_val.toString();
    this.getReport.hashcode = hash_val;
    this.reportService.getreport(this.getReport).subscribe(
      (res) => {

        this.response = JSON.parse(JSON.stringify(res));

        // this.getreportrank();
        if (this.response.code == "SA000") {
          this.iaVal = this.response.iaVal
          this.iaAvg = this.response.bspi_ia
          this.postVal = this.response.postVal
          this.postAvg = this.response.bspi_post
          this.avg_skill_val = this.response.avg_score_val;
          this.avg_bspi = this.response.avg_bspi;
          this.over_all_score_val = []
          console.log('comes here')
          if (this.avg_skill_val.length > 1) {
            this.isskillkitfn();
          } else {
            console.log('comes here1')
            this.getSubSkillScore.uid = localStorage.getItem("uid");
            this.getSubSkillScore.eid = parseInt(localStorage.getItem("eid"));
            let date_val: Date;
            date_val = new Date();
            let hash_val = this.ip.gethash(date_val);
            this.getSubSkillScore.timestamp = date_val.toString();
            this.getSubSkillScore.hashcode = hash_val;
            this.reportService.getSubSkillScoreDetails(this.getSubSkillScore).subscribe(
              (res) => {
                this.subskillname_Arr = []; this.subskillval_Arr = [];
                this.response = JSON.parse(JSON.stringify(res));
                console.log(this.response)

                if (this.response.code == "SA000") {
                  this.ia_val = this.response.iaVal;
                  this.post_val = this.response.postVal;
                  this.clp_val = this.response.avg_score_val;
                  // console.log(this.ia_val)
                  //console.log(this.post_val)
                  console.log(this.clp_val)

                }
                else {
                  if (this.response.code == "SA1061" ||
                    this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
                    localStorage.clear();
                    this.router.navigateByUrl("/login");
                  }
                  // if (this.response.code == "SA1234") {              

                  // }
                }
              });
          }

          if (this.iaVal.length != 0) {
            this.assesment_types.push(this.radmapWords[2])
            this.over_all_score_val.push(this.iaVal[0])
            this.over_all_bspi.push(this.iaAvg)
          }
          if (this.avg_skill_val.length != 0) {
            for (let i = 0; i < this.avg_skill_val.length; i++) {
              if (i == 0) {
                this.assesment_types.push(this.radmapWords[40])
              } else {
                this.assesment_types.push(this.radmapWords[41] + " - C" + (i))
              }
              this.over_all_score_val.push(this.avg_skill_val[i])
              this.over_all_bspi.push(this.avg_bspi[i])
            }

          }
          if (this.postVal.length != 0) {
            //   console.log(this.postVal +" jedsklfjklsdjflkdjdlfs")
            if (this.postVal[0].length == 5) {
              this.after_post = true;
            }
            else {
              this.after_post = false;
            }

            this.assesment_types.push(this.radmapWords[45])
            this.over_all_score_val.push(this.postVal[0])
            this.over_all_bspi.push(this.postAvg)
          }

          if (this.assesment_types.length == 1) {
            this.isShowcompare = false;
          } else if (this.assesment_types.length == 0) {
            this.assesment_types.push(this.radmapWords[2])
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
            //console.log(this.over_all_score_val)
            for (let i = 0; i < this.over_all_score_val[0].length; i++) {

              this.barChartData.push({ data: [this.over_all_score_val[0][i]], label: this.skillVal[i] });
            }
            this.needleValue = this.over_all_bspi[this.chartPrevno];
            localStorage.setItem("rep3_needleValue", this.needleValue.toString());
            this.dataSharingService.isrep3_gauge.next(1);
            this.starCalculationFn();
            this.ngxService.stopLoader('loader-roadmap');
            this.countsession = setInterval(() => { this.stopnewload(); }, 400);
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
    )
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

  getSubSkillScore = new getSubSkillScore();
  subskillname_Arr = []; subskillval_Arr = [];
  ia_val; post_val; clp_val;
  isskillkitfn() {
    //////function for getting skillkit report status- starts//////
    // console.log("coming this")
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
        //console.log(this.response)
        if (this.response.code == "SA000") {
          this.skillkitVal = this.response.skillkitval;
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
              //console.log(this.response)

              if (this.response.code == "SA000") {
                this.ia_val = this.response.iaVal;
                this.post_val = this.response.postVal;
                this.clp_val = this.response.avg_score_val;
                //console.log(this.ia_val)
                //console.log(this.post_val)
                //console.log(this.clp_val)
                this.ngxService.stopLoader('loader-reports');
                this.countsession = setInterval(() => { this.stopnewload(); }, 400);

              }
              else {
                if (this.response.code == "SA1061" ||
                  this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
                  localStorage.clear();
                  this.router.navigateByUrl("/login");
                }
                // if (this.response.code == "SA1234") {              

                // }
              }
            });
        } else {
          if (this.response.code == "SA1061" ||
            this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
            localStorage.clear();
            this.router.navigateByUrl("/login");
          }
          if (this.response.code == 'SA026') {
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
                //console.log(this.response)

                if (this.response.code == "SA000") {
                  this.ia_val = this.response.iaVal;
                  this.post_val = this.response.postVal;
                  this.clp_val = this.response.avg_score_val;
                  // //console.log(this.ia_val)
                  // //console.log(this.post_val)
                  // //console.log(this.clp_val)
                  this.ngxService.stopLoader('loader-reports');
                  this.countsession = setInterval(() => { this.stopnewload(); }, 400);
                }
                else {
                  if (this.response.code == "SA1061" ||
                    this.response.code == "SA1041" || this.response.code == "SA1040" || this.response.code == "SA1039") {
                    localStorage.clear();
                    this.router.navigateByUrl("/login");
                  }
                  // if (this.response.code == "SA1234") {              

                  // }
                }
              });
          }
        }
      }
    )
    //////function for getting skillkit report status- starts//////
  }

  // public canvasWidth: number;
  // public centralLabel = ''
  // public name = '';
  // needleValue: number = 0.00;
  // options: any;
  // options1: any;
  // options2: any;

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

  //////////////////////////////////////////////////
  @HostListener('window:resize', ['$event'])
  onResize1(event) {
    // console.log(event.target.innerWidth);
    // location.reload();

  }
  radmapWords;
  mob_val = true;
  countsession;
  stopnewload() {
    clearInterval(this.countsession);
    this.load1 = false;
  }

  getProfile = new profileget();
  skillVal = ["Memory", "Visual Processing", "Focus And Attention", "Problem Solving", "Linguistics"]
  ngOnInit() {
    //////Initail function for defining basic varibles  - starts//////
    if (localStorage.getItem("uid") == "" || localStorage.getItem("uid") == null) {
      this.router.navigateByUrl('/login');
    } else {
      var d=window.innerWidth;
      console.log("window.innerWidth"+window.innerWidth)
      this.color_val[parseInt(localStorage.getItem("currenttheme"))] = true;
      this.theme.currenttheme.subscribe(themename => this.themechange = themename)
      this.element = document.querySelector('.' + this.themechange)
      this.colorVal = getComputedStyle(this.element).getPropertyValue('--base-color');
      this.color4 = this.colortheme[0];
      this.color3 = getComputedStyle(this.element).getPropertyValue('--accent-color');
      this.colortheme_bg = this.colortheme[parseInt(localStorage.getItem("isdark"))];
      this.colortheme_bg_base_sec = this.colortheme_base_sec[parseInt(localStorage.getItem("isdark"))];
      this.colortheme_txt1 = this.colortheme_txt1_Arr[parseInt(localStorage.getItem("isdark"))];
      if (parseInt(localStorage.getItem("isdark")) == 0) {
        this.colortheme_txt = this.colortheme[1];
        this.color1 = this.colortheme_base[0];
        this.color2 = '#E90B89';

      }
      else {
        this.colortheme_txt = this.colortheme[0];
        this.color1 = this.colortheme_base[1];
        this.color2 = '#E90B89';
      }
      var width = window.innerWidth;
      if (width < 768 && window.orientation != 90) {
        this.mob_val = false;
        this.val_val = 1;
        //console.log('mobile device detected' + window.orientation)
      } else if (width >= 768 && width <= 992) {
        //console.log('tablet detected');
        this.mob_val = true;
        this.val_val = 0;

      } else {
        this.mob_val = true;
        this.val_val = 0;
        //console.log('desktop detected')

      }

      if (localStorage.getItem("isfullschudle_stored") == '0') {
        this.isfull_val = false;
      }
      else {
        this.isfull_val = true;
      }
    }


    // this.options2 = {
    //   hasNeedle: true,
    //   needleColor:  'gray',
    //   needleStartValue: 50,
    //   arcColors: ["#c02127", "#f36723", "#fdc012", "#95c954", "#2be035"],
    //   arcDelimiters: [20, 40, 60, 80],
    //   rangeLabel: ["0", "100"],
    //   responsive: true
    // };
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

    this.radmapWords = JSON.parse(localStorage.getItem('langwords') || '[]');

    // this.skillVal = [this.radmapWords[13], this.radmapWords[14], this.radmapWords[15],
    //   this.radmapWords[16], this.radmapWords[17]]
    ////////////////////////barchart/////////////////////
    this.barChartData = [
      { data: [0], label: this.radmapWords[13] },
      { data: [0], label: this.radmapWords[14] },
      { data: [0], label: this.radmapWords[15] },
      { data: [0], label: this.radmapWords[16] },
      { data: [0], label: this.radmapWords[17] }
    ];
    this.barchart1name = this.radmapWords[2]
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        xAxes: [
          {
            display: true,
            ticks: {
              fontSize: 12,
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
            size: 15
          },
          color: this.colortheme_txt
        }
      },
      legend: {
        position: 'bottom',
        labels: {
          fontSize: 9,
          fontColor: this.colortheme_txt
        },
      }
    };

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
      needleColor: this.colortheme_txt,
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


    this.callass();

    //////Initail function for defining basic varibles  - ends//////
    if (parseInt(localStorage.getItem("curr_assess_login")) > 1 && parseInt(localStorage.getItem("assessment_check")) > 1) {
      this.istrophybtn = true;
    }
  }
  istrophybtn: boolean = false;
  getskill = new getskill();

  backFn() {
    this.isRoadMap = true;
    localStorage.setItem("roadback","0");
  }
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

  cli() {
    //////function for open certificate popup //////
    this.modalService.open(this.certificate, { centered: true });
  }
  ///////////////////////Trophies//////////////////
  istrophy: boolean = false
  trophy() {
    this.istrophy = true;
  }
  isleaderboard: boolean = false
  leader() {
    this.isleaderboard = true;
  }

}
