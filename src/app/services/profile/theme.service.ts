
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocaldatastorageService } from '../../localdatastorage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themenames = ["theme_cyan", "theme_indigo", "theme_purple", "theme_blue", "theme_orange", "theme_red", "theme_deep_purple", "theme_green", "theme_brown", "theme_blue_grey"]
  gradient_color = ['linear-gradient( 140deg,#00BCD4 50%, #00ACC1 50%)',
    'linear-gradient(140deg, #3F51B5 50%,#5C6BC0 50%)',
    'linear-gradient(140deg, #9C27B0 50%,#BA68C8 50%)',
    'linear-gradient(140deg,#2196F3 50%,#1976D2 50%)',
    'linear-gradient(140deg,#FF9800 50%,#FB8C00 50%)',
    'linear-gradient(140deg, #F44336 50%,#E53935 50%)',
    'linear-gradient(140deg,#673AB7 50%,#512DA8 50%)',

    'linear-gradient(140deg,#8BC34A 50%,#9CCC65 50%)',

    'linear-gradient(140deg,#795548 50%,#5D4037 50%)',
    'linear-gradient(140deg,#607D8B 50%,#37474F 50%)'];

  private themeSource = new BehaviorSubject(this.themenames[Number(this.localDataStorageService.getdata("currenttheme"))]);
  currenttheme = this.themeSource.asObservable();

  constructor(private localDataStorageService: LocaldatastorageService) { }
  currtheme: any;

  changeTheme(themename: string) {
    this.currtheme = this.themenames.indexOf(themename);
    localStorage.setItem("currenttheme", this.currtheme);
    this.themeSource.next(themename)
  }
}