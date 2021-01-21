import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  timerchange: boolean = false;
  constructor() { }
  private timerchangesrc = new BehaviorSubject(this.timerchange);
  currenttimerchange = this.timerchangesrc.asObservable();
  changetime(istimerchange: boolean) {
    this.timerchangesrc.next(istimerchange)
  }
}
