import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasharingServiceService {
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isdarktheme: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public ismusic: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public isloader_sta: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public callscore_fn: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  public user_name_pass: BehaviorSubject<string> = new BehaviorSubject<string>("");
  
  public can_gauge: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public new_pass: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public isdash_gauge: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  public isrep3_gauge: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  public backtoroad: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  constructor() { }
}
