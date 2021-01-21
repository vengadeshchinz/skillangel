import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatasharingServiceService } from "../services/ip/datasharing-service.service";
import { ThemeService } from '../services/profile/theme.service';
@Component({
    selector: 'app-reports2',
    template: `  <div>
    <div class="row justify-content-center" style="margin-top: 4vw;margin-bottom: 1vw;">
      <div class="col-1 col-lg-1"></div>
      <div class="col-2 col-lg-2">
          <div class="row innerborder22 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(0)"
              [ngStyle]="{'background-color': conditional[0] ? color1 : color2,'color': conditional[0] ?  color3 : color4}">
              1 - INITIAL ASSESSMENT (IA)
          </div>
      </div>
      <div class="col-1 col-lg-1" style="margin-left:12vw;text-align: -webkit-center;">
      </div>
      <div class="col-6 col-lg-6"></div>
  </div>




  <div class="row justify-content-center" style="margin-top:1vw;">
      <div class="col-2 col-lg-2"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(1)"
              [ngStyle]="{'background-color': conditional[1] ?  color1 : color2,'color': conditional[1] ?  color3 : color4}">
              CYCLE 01
          </div>
      </div>
      <div class="col-1 col-lg-1" [ngStyle]="{'margin-left':mrgin_Arr[val_val][3]}"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>

  </div>
  <div class="row justify-content-center">
      <div class="col-2 col-lg-2"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1" [ngStyle]="{'margin-right': '12vw'}">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(8)"
              [ngStyle]="{'background-color': conditional[8] ?  color1 : color2,'color': conditional[8] ?  color3 : color4}">
              CYCLE 08
          </div>
      </div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1" style="margin-left:25px;">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(2)"
              [ngStyle]="{'background-color': conditional[2] ?  color1 : color2,'color': conditional[2] ?  color3 : color4}">
              CYCLE 02
          </div>
      </div>
      <div class="col-1 col-lg-1" [ngStyle]="{'margin-left':mrgin_Arr[val_val][3]}"></div>
  </div>
  <div class="row justify-content-center" style="margin-bottom: 1.5vw;margin-top: 1.5vw;">
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1" style="align-self: center;margin-right: 5.2vw;">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(7)"
              [ngStyle]="{'background-color': conditional[7] ?  color1 : color2,'color': conditional[7] ?  color3 : color4}">
              CYCLE 07
          </div>
      </div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-2 col-lg-2">
          <div class="row innerborder22 justify-content-center" style="margin-left:-7px;"
              [ngStyle]="{'background-color': true ?  color1 : color2,'color': true ?  color3 : color4}">
              2 - DETAILED ASSESSMENT (DA)
          </div>
      </div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1" style="align-self: center;margin-left: 7.2vw;">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(3)"
              [ngStyle]="{'background-color': conditional[3] ?  color1 : color2,'color': conditional[3] ?  color3 : color4}">
              CYCLE 03
          </div>
      </div>
  </div>
  <div class="row justify-content-center">
      <div class="col-2 col-lg-2"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1" [ngStyle]="{'margin-right': '12vw'}">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(6)"
              [ngStyle]="{'background-color': conditional[6] ?  color1 : color2,'color': conditional[6] ?  color3 : color4}">
              CYCLE 06
          </div>
      </div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1" style="margin-left:25px;">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(4)"
              [ngStyle]="{'background-color': conditional[4] ?  color1 : color2,'color': conditional[4] ?  color3 : color4}">
              CYCLE 04
          </div>
      </div>
      <div class="col-1 col-lg-1" [ngStyle]="{'margin-left':mrgin_Arr[val_val][3]}"></div>

  </div>
  <div class="row justify-content-center" style="margin-bottom: 5vw;">
      <div class="col-2 col-lg-2"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(5)"
              [ngStyle]="{'background-color': conditional[5] ?  color1 : color2,'color': conditional[5] ?  color3 : color4}">
              CYCLE 05
          </div>
      </div>
      <div class="col-1 col-lg-1" [ngStyle]="{'margin-left':mrgin_Arr[val_val][3]}"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>
  </div>




  <div *ngIf="isfull_val" class="row justify-content-center" style="margin-top: 5vw;">
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(09)"
              [ngStyle]="{'background-color': conditional[09] ?  color1 : color2,'color': conditional[09] ?  color3 : color4}">
              CYCLE 09
          </div>
      </div>
      <div class="col-1 col-lg-1" [ngStyle]="{'margin-left':mrgin_Arr[val_val][3]}"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-2 col-lg-2"></div>

  </div>
  <div *ngIf="isfull_val" class="row justify-content-center">
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1" [ngStyle]="{'margin-right': '12vw'}">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(16)"
              [ngStyle]="{'background-color': conditional[16] ?  color1 : color2,'color': conditional[16] ?  color3 : color4}">
              CYCLE 16
          </div>
      </div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1" style="margin-left:25px;">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(10)"
              [ngStyle]="{'background-color': conditional[10] ?  color1 : color2,'color': conditional[10] ?  color3 : color4}">
              CYCLE 10
          </div>
      </div>

      <div class="col-1 col-lg-1" [ngStyle]="{'margin-left':mrgin_Arr[val_val][3]}"></div>
      <div class="col-2 col-lg-2"></div>
  </div>
  <div *ngIf="isfull_val" class="row justify-content-center"
      style=" margin-bottom: 1vw;margin-top: 1vw;">
      <div class="col-1 col-lg-1" style="align-self: center;margin-left:-2px"
          [ngStyle]="{'margin-right': mrgin_Arr[val_val][2]}">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(15)"
              [ngStyle]="{'background-color': conditional[15] ?  color1 : color2,'color': conditional[15] ?  color3 : color4}">
              CYCLE 15
          </div>
      </div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-2 col-lg-2" style="margin-right: 31px;margin-left:2px">
          <div class="row innerborder22 justify-content-center"
              [ngStyle]="{'background-color': true ?  color1 : color2,'color': true ?  color3 : color4}">
              3 PERSONALIZED TRAINING (C1)
          </div>
      </div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1" style="align-self: center;"
          [ngStyle]="{'margin-left': mrgin_Arr[val_val][2]}">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(11)"
              [ngStyle]="{'background-color': conditional[11] ?  color1 : color2,'color': conditional[11] ?  color3 : color4}">
              CYCLE 11
          </div>
      </div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>
  </div>
  <div *ngIf="isfull_val" class="row justify-content-center">
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1" [ngStyle]="{'margin-right': '12vw'}">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(14)"
              [ngStyle]="{'background-color': conditional[14] ?  color1 : color2,'color': conditional[14] ?  color3 : color4}">
              CYCLE 14
          </div>
      </div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1" style="margin-left:25px;">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(12)"
              [ngStyle]="{'background-color': conditional[12] ?  color1 : color2,'color': conditional[12] ?  color3 : color4}">
              CYCLE 12
          </div>
      </div>
      <div class="col-1 col-lg-1" [ngStyle]="{'margin-left':mrgin_Arr[val_val][3]}"></div>
      <div class="col-2 col-lg-2"></div>

  </div>
  <div *ngIf="isfull_val" class="row justify-content-center" style="margin-bottom: 5vw;">
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(13)"
              [ngStyle]="{'background-color': conditional[13] ?  color1 : color2,'color': conditional[13] ?  color3 : color4}">
              CYCLE 13
          </div>
      </div>
      <div class="col-1 col-lg-1" [ngStyle]="{'margin-left':mrgin_Arr[val_val][3]}"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-2 col-lg-2"></div>
  </div>





  <div *ngIf="isfull_val" class="row justify-content-center" style="margin-top: 5vw;">
      <div class="col-2 col-lg-2"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1" ></div>
      <div class="col-1 col-lg-1">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(17)"
              [ngStyle]="{'background-color': conditional[17] ?  color1 : color2,'color': conditional[17] ?  color3 : color4}">
              CYCLE 17
          </div>
      </div>
      <div class="col-1 col-lg-1" [ngStyle]="{'margin-left':mrgin_Arr[val_val][3]}"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>
  </div>
  <div *ngIf="isfull_val" class="row justify-content-center">
      <div class="col-2 col-lg-2"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1" [ngStyle]="{'margin-right': '12vw'}">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(24)"
              [ngStyle]="{'background-color': conditional[24] ?  color1 : color2,'color': conditional[24] ?  color3 : color4}">
              CYCLE 24
          </div>
      </div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1" style="margin-left:25px;">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(18)"
              [ngStyle]="{'background-color': conditional[18] ?  color1 : color2,'color': conditional[18] ?  color3 : color4}">
              CYCLE 18
          </div>
      </div>
      <div class="col-1 col-lg-1" [ngStyle]="{'margin-left':mrgin_Arr[val_val][3]}"></div>

  </div>
  <div *ngIf="isfull_val" class="row justify-content-center"
      style="margin-bottom: 1.5vw;margin-top: 1.5vw;">
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1" style="align-self: center;margin-right: 5.2vw;">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(23)"
              [ngStyle]="{'background-color': conditional[23] ?  color1 : color2,'color': conditional[23] ?  color3 : color4}">
              CYCLE 23
          </div>
      </div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-2 col-lg-2">
          <div class="row innerborder22 justify-content-center" style="margin-left:-7px;"
              [ngStyle]="{'background-color': true ?  color1 : color2,'color': true ?  color3 : color4}">
              4 PERSONALIZED TRAINING (C2)
          </div>
      </div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1" style="align-self: center;margin-left: 7.2vw;">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(19)"
              [ngStyle]="{'background-color': conditional[19] ?  color1 : color2,'color': conditional[19] ?  color3 : color4}">
              CYCLE 19
          </div>
      </div>
  </div>
  <div *ngIf="isfull_val" class="row justify-content-center">
      <div class="col-2 col-lg-2"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1" [ngStyle]="{'margin-right': '12vw'}">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(22)"
              [ngStyle]="{'background-color': conditional[22] ?  color1 : color2,'color': conditional[22] ?  color3 : color4}">
              CYCLE 22
          </div>
      </div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1" style="margin-left:25px;">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(20)"
              [ngStyle]="{'background-color': conditional[20] ?  color1 : color2,'color': conditional[20] ?  color3 : color4}">
              CYCLE 20
          </div>
      </div>
      <div class="col-1 col-lg-1" [ngStyle]="{'margin-left':mrgin_Arr[val_val][3]}"></div>

  </div>
  <div *ngIf="isfull_val" class="row justify-content-center" style="margin-bottom: 2vw;">
      <div class="col-2 col-lg-2"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1">
          <div class="row innerborder11 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(21)"
              [ngStyle]="{'background-color': conditional[21] ?  color1 : color2,'color': conditional[21] ?  color3 : color4}">
              CYCLE 21
          </div>
      </div>
      <div class="col-1 col-lg-1" [ngStyle]="{'margin-left':mrgin_Arr[val_val][3]}"></div>
      <div class="col-1 col-lg-1"></div>
      <div class="col-1 col-lg-1"></div>

  </div>




  <div class="row justify-content-center" style="margin-top: 5vw;margin-bottom: 3vw;">
      <div class="col-1 col-lg-1"></div>
      <div class="col-2 col-lg-2" *ngIf="isfull_val">
          <div class="row innerborder22 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(25)"
              [ngStyle]="{'background-color': conditional[25] ?  color1 : color2,'color': conditional[25] ?  color3 : color4}">
              5 - POST ASSESSMENT (PA)
          </div>
      </div>
      <div class="col-2 col-lg-2" *ngIf="!isfull_val">
          <div class="row innerborder22 animated pulse infinite newtxt_col justify-content-center"
              style="cursor: pointer;" (click)="scoreFn(9)"
              [ngStyle]="{'background-color': conditional[9] ?  color1 : color2,'color': conditional[9] ?  color3 : color4}">
              3 - POST ASSESSMENT (PA)
          </div>
      </div>
      <div class="col-1 col-lg-1" style="margin-left:12vw;text-align: -webkit-center;">
      </div>
      <div class="col-6 col-lg-6"></div>
  </div>
</div>`,
    styleUrls: ['../roadmap/roadmap.component.scss']
})
export class Reports2Component implements OnInit {
    //////theme variables//////
    colortheme = ['black', 'white'];
    colortheme_base = ['rgb(19, 19, 19)', 'rgb(243, 242, 242)'];
    colortheme_bg;
    colortheme_txt;
    color1; color2; color3; color4;

    //////bspi container//////
    element: any;
    themechange: any;
    reportWords: any;

    mrgin_Arr = [['1.5vw', '1.2vw', '.5vw', '3.5vw'], ['-4vw', '-5vw', '-6vw', '9vw']];
    val_val = 0;
    isfull_val = true;
    score_val_Arr = [];
    cycle_score_bspt_Arr = [];
    conditional = [];

    constructor(private theme: ThemeService,
        private dataSharingService: DatasharingServiceService, private router: Router) {

        this.dataSharingService.new_pass.subscribe(value => {
            if (value != 0) {
                this.dataSharingService.new_pass.next(0);
                this.callfn();
            }
        });

    }
    ngOnInit() {
        //////Initail function for defining basic varibles  - starts//////
        if (localStorage.getItem("uid") == "" || localStorage.getItem("uid") == null) {
            this.router.navigateByUrl('/login');
        } else {
            this.theme.currenttheme.subscribe(themename => this.themechange = themename)
            this.element = document.querySelector('.' + this.themechange)
            this.colortheme_bg = this.colortheme[parseInt(localStorage.getItem("isdark"))];
            this.color4 = this.colortheme[0];
            this.color3 = getComputedStyle(this.element).getPropertyValue('--accent-color');
            if (parseInt(localStorage.getItem("isdark")) == 0) {
                this.colortheme_txt = this.colortheme[1];
                this.color1 = this.colortheme_base[0];
                this.color2 = getComputedStyle(this.element).getPropertyValue('--accent-color');
            }
            else {
                this.colortheme_txt = this.colortheme[0];
                this.color1 = this.colortheme_base[1];
                this.color2 = getComputedStyle(this.element).getPropertyValue('--accent-color');
            }

            var width = window.innerWidth;
            if (width < 768 && window.orientation != 90) {
                this.val_val = 1;
                console.log('mobile device detected' + window.orientation)
            } else if (width >= 768 && width <= 992) {
                console.log('tablet detected');
                this.val_val = 0;

            } else {
                this.val_val = 0;
                console.log('desktop detected')

            }
            /////////////////////Get report/////////////////////////

            this.reportWords = JSON.parse(localStorage.getItem('langwords') || '[]');

            if (localStorage.getItem("isfullschudle_stored") == '0') {
                this.isfull_val = false;
            }
            else {
                this.isfull_val = true;
            }



        }
        //////Initail function for defining basic varibles  - ends//////
    }


    scoreFn(arg) {

        //////function for setting Assement name on roadmap's distinct score popup //////
        this.dataSharingService.callscore_fn.next(arg);
    }

    callfn() {
        //////function for reseting roadmap's score //////
        this.score_val_Arr = JSON.parse(localStorage.getItem("score_val_Arr"));
        this.cycle_score_bspt_Arr = JSON.parse(localStorage.getItem("cycle_score_bspt_Arr"));
        this.conditional = JSON.parse(localStorage.getItem("conditional"));
        console.log(this.conditional)

    }
}