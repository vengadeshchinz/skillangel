import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getassstar } from './trophies';
import { url } from '../baseurl';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TrophiesService {
  baseurl = new url()
  constructor(private http: HttpClient) { }

  getassstarDetails(getassstar1: getassstar): Observable<getassstar> {
    return this.http.post<getassstar>(this.baseurl.serverurl + 'getassstar', getassstar1);
  }

}
