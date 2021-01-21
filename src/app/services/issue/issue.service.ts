import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from '../baseurl';
import { Issue } from './issue';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  baseurl = new url()
  constructor(private http: HttpClient) { }
  getissue(): Observable<null> {
    return this.http.post<null>(this.baseurl.serverurl + 'getIssue', null);
  }

  sendissue(sendissue: Issue): Observable<Issue> {
    return this.http.post<Issue>(this.baseurl.serverurl + 'getUserIssue', sendissue);
  }

  fileUpload(formData): Observable<null> {
    return this.http.post<null>(this.baseurl.serverurl + 'fileupload', formData);
  }

}
