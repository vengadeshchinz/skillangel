import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Datashare1Service {

  constructor() { }
  public isrep4_gauge: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public isrep5_gauge: BehaviorSubject<number> = new BehaviorSubject<number>(0);
}
