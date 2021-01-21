import { Component, Inject } from '@angular/core';
import {  MatDialogRef,  MAT_DIALOG_DATA } from '@angular/material';
import { url } from '../services/baseurl'
import { profileimgData } from '../services/profile/profile'
import { ProfileService } from '../services/profile/profile.service'
import { ToastrService } from 'ngx-toastr';
import { IpService } from '../services/ip/ip.service';
import { DatasharingServiceService } from "../services/ip/datasharing-service.service";
@Component({
    selector: 'gallery',
    templateUrl: 'gallery.html',
    styleUrls: ['./profile.component.scss']
})
export class galleryComponent {
    isUserLoggedIn: boolean;
    baseurl = new url()
    characterArr_url: any = []
    profileWords: any;
    image_names = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png',
        '9.png', '10.png']

    constructor(private dataSharingService: DatasharingServiceService,
        private ip: IpService, private profileService: ProfileService, private toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<galleryComponent>) {
        console.log(data.username)

        for (let i = 0; i < this.image_names.length; i++) {
            this.characterArr_url.push(this.baseurl.galleryurl + this.image_names[i])
        }
        this.profileWords = [...JSON.parse(localStorage.getItem('langwords') || '[]')];
    }

    onClose(): void {
        //////function for closing profile popup  - starts//////
        this.dialogRef.close(true);
        this.dataSharingService.isUserLoggedIn.next(true);
        //////function for closing profile popup  - ends//////
    }
    getProfiledata = new profileimgData()
    res_img: any;
    img_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    uploadfile(i) {
        //////function for updating profile image  - starts//////
        console.log(i)
        this.getProfiledata.uid = localStorage.getItem("uid");
        this.getProfiledata.newname = this.img_arr[i];
        let date_val: Date;
        date_val = new Date();
        let hash_val = this.ip.gethash(date_val);
        this.getProfiledata.timestamp = date_val.toString();
        this.getProfiledata.hashcode = hash_val;
        this.profileService.uploadprofile(this.getProfiledata).subscribe(
            res => {
                this.res_img = JSON.parse(JSON.stringify(res));
                console.log(this.res_img)
                if (this.res_img.code == "SA000") {
                    this.toastr.success(this.profileWords[121])
                }
            },
        );
        //////function for updating profile image  - ends//////
    }
}