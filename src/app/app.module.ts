import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PuzzlesComponent } from './puzzles/puzzles.component';
import { ReportsComponent } from './reports/reports.component';
import { ProfileComponent } from './profile/profile.component';
import { galleryComponent } from './profile/gallery.component';
import { TrophiesComponent } from './trophies/trophies.component';
import { MenuComponent } from './menu/menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePipe } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule, MatSidenavModule } from '@angular/material';
import { MatProgressBarModule, MatCardModule } from '@angular/material';
import { GaugeChartModule } from 'angular-gauge-chart'
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule, MatListModule } from '@angular/material'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AngularMaterialModule } from './angular-material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { TooltipModule } from 'ng2-tooltip-directive';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgbDateFRParserFormatter } from "./menu/Ngb"
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule
} from '@angular/material';
import { SkillkitComponent } from './skillkit/skillkit.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { ParticlesModule } from 'angular-particle';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { SidebarModule } from 'ng-sidebar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Reports1Component } from './reports/reports1.component';
import { Reports2Component } from './reports/reports2.component';
import { Reports3Component } from './reports/reports3.component'
import { Reports4Component } from './reports/reports4.component';
import { Reports5Component } from './reports/reports5.component';
import { Dashboard1Component } from './dashboard/dashboard1.component';
import { RedirectComponent } from './redirect/redirect.component';
import { IssueComponent } from './issue/issue.component';
@NgModule({
  declarations: [
    Dashboard1Component,
    Reports1Component,
    Reports2Component,
    Reports3Component,
    Reports4Component,
    Reports5Component,
    AppComponent,
      LoginComponent,
    DashboardComponent,
    PuzzlesComponent,
    ReportsComponent,
    ProfileComponent,
    galleryComponent,
    TrophiesComponent,
    MenuComponent,
    SkillkitComponent,
    RoadmapComponent,
    LeaderboardComponent,
    RedirectComponent,
    IssueComponent

  ],
  imports: [
    MatSlideToggleModule,
    SidebarModule.forRoot(),
    Ng2TelInputModule,
    RoundProgressModule,
    FontAwesomeModule,
    AngularMaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatCardModule,
    GaugeChartModule,
    ToastrModule.forRoot(),
    ChartsModule,
    NgxAudioPlayerModule,
    NgxUiLoaderModule,
    FlexLayoutModule,
    MatGridListModule, NgCircleProgressModule.forRoot({
      // "radius": 60,
      // "space": -10,
      // "outerStrokeGradient": true,
      // "outerStrokeWidth": 10,
      // "outerStrokeColor": "#4882c2",
      // "outerStrokeGradientStopColor": "#53a9ff",
      // "innerStrokeColor": "#e7e8ea",
      // "innerStrokeWidth": 10,
      // "title": "UI",
      // "animateTitle": false,
      // "animationDuration": 1000,
      // "showUnits": false,
      // "showBackground": false,
      // "clockwise": false,
      // "startFromZero": false
    }),
    HttpClientModule,
    TooltipModule,
    NgbPaginationModule,
    NgbAlertModule,
    ParticlesModule

  ],
  entryComponents: [galleryComponent],
  providers: [{
    provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter
  },
    DatePipe

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
