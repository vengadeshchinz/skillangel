import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IssueService } from ".././services/issue/issue.service";
import { Issue } from '.././services/issue/issue';
import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {
  userform: FormGroup;
  constructor(private ngxService: NgxUiLoaderService, private issueServ: IssueService, private formbuilder: FormBuilder, private router: Router) { }
  issueparam = new Issue();
  name = new FormControl();
  contact_no = new FormControl();
  issueid = new FormControl();
  userissues = new FormControl();
  email = new FormControl();
  ////////////2nd loader////////////
  countsession;
  load1:boolean;
  stopnewload() {   
    clearInterval(this.countsession);
    this.load1 = false;
  }
  ngOnInit() {
    this.load1 = true;
    this.ngxService.startLoader('loader-issue');
    this.userform = this.formbuilder.group(
      {
        name: [null, Validators.required],
        contact_no: [null, Validators.required],
        email: [null, Validators.required, Validators.email],
        issueid: [null, Validators.required],
        userissues: [null, Validators.required]
        //   confirmpassword: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
      })
    this.getIssue();
  }
  response: any = [];
  issuelist: any = [];
  
  //////Get issue list//////
  getIssue() {

    this.issueServ.getissue().subscribe(res => {
      this.response = JSON.parse(JSON.stringify(res));
      if (this.response.code == "SA000") {
        this.issuelist = this.response.result;
        console.log(this.issuelist)
        this.ngxService.stopLoader('loader-issue');
        this.countsession = setInterval(() => { this.stopnewload(); }, 400);
      } else {
        console.log('Nothig get')
      }

    });

  }
  selectedissue: string = '';
  //////Selected issue//////////
  getissueval(e) {

    this.selectedissue = this.issuelist[e - 1].issuename
    console.log(this.selectedissue)
  }
  //////Back to login//////
  backFn() {
    this.router.navigateByUrl('/login');
  }
  passContent: string = '';
  success: boolean;
  filename: string = '';
  ///////////////////////Issue update/////////////
  updateissue(name, issue, email, contact_no) {
    // console.log(name)
    // console.log(issue)
    // console.log(email)
    // console.log(contact_no)
    // console.log(this.selectedissue)
    this.load1 = true;
    this.ngxService.startLoader('loader-issue');
    if (!name || !issue || !email || !contact_no || !this.selectedissue) {
      // console.log('here')
      this.passContent = 'Please provide all details';
      this.success = false;
      this.ngxService.stopLoader('loader-issue');
      this.countsession = setInterval(() => { this.stopnewload(); }, 400);
    } else {
      this.passContent = '';
      this.success = true;
      this.issueparam.issuename = issue;
      this.issueparam.email = email;
      this.issueparam.mobile = contact_no;
      this.issueparam.issuetype = this.selectedissue;
      this.issueparam.name = name;
      if (this.filename != '') {
        this.issueparam.filename = this.filename.split('.').slice(0, -1).join('.');
      } else {
        this.issueparam.filename = '';
      }

      this.issueparam.doctype = this.ext;

      this.issueServ.sendissue(this.issueparam).subscribe(res => {
        this.response = JSON.parse(JSON.stringify(res));
        this.ngxService.stopLoader('loader-issue');
        this.countsession = setInterval(() => { this.stopnewload(); }, 400);
        if (this.response.code == "SA000") {
          // this.issuelist = this.response.result;
          console.log(this.response)
          this.passContent = 'Report sended';
          this.success = true;
        } else {
          this.passContent = 'Report send failed';
          this.success = false;
          console.log('Nothig get')
        }

      });

    }
  }

  /////////////////////Image selection////////////
  // logoselected(imageInput: any) {
  //   const file: File = imageInput.files[0];
  //   const reader = new FileReader();
  //   if (file) {
  //     this.clouduploadimage = file.name;
  //     // console.log(this.clouduploadimage);
  //     this.imagevalidator = true;
  //   }
  // }
  uploadedFiles: Array<File>;
  fileChange(element) {
    console.log(element)
    this.uploadedFiles = element.target.files;
  }
  ext: string = '';
  upload() {
    if (!this.uploadedFiles) {
    } else {
      this.load1 = true;
      this.ngxService.startLoader('loader-issue');
      let formData = new FormData();
      for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
      }
      // var fname = this.uploadedFiles[0].name;
// console.log('here')
      this.issueServ.fileUpload(formData).subscribe(res => {
        this.response = JSON.parse(JSON.stringify(res));


        if (this.response.code == "SA000") {
          // this.filename =this.response.filename;
          console.log(this.response.filename)
          this.filename = this.response.filename;
          var lastDot = this.filename.lastIndexOf('.');

          this.ext = this.filename.substring(lastDot + 1);

          this.passContent = 'File uploaded';
          this.success = true;
        } else {
          this.passContent = 'File upload failed';
          this.success = false;
          console.log('Nothig get')
        }
        this.ngxService.stopLoader('loader-issue');
        this.countsession = setInterval(() => { this.stopnewload(); }, 400);
      });
    }
  }



}
