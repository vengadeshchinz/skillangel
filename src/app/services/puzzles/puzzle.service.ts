import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  private hotsSource = new BehaviorSubject(false);
  private hotsSource1 = new BehaviorSubject(false);
  currenthots = this.hotsSource.asObservable();
  currenthots1 = this.hotsSource1.asObservable();

  constructor() { }
  changehots(isHots: boolean, isPuzzle: boolean) {
    this.hotsSource.next(isHots)
    this.hotsSource1.next(isPuzzle)
  }
}
