
export class accLogin {
    username: string;
    password: string;
    type: number;
    mobileno:string;
    email:string;
    countrycode:string;
}



export class getWords {
    langid: number;
}

export class sessionid {
    uid: string;
    sessionid: string
}


export class getUsername {
    email: string;
    type: number;
}

export class insertlocation {
    uid: string;
    year_status: number;
    timestamp: string;
    hashcode: string;
    city: string;
    region: string;
    country: string;
}

export class login_otp_SA {
    mobileno: string;
    countrycode: string;
    type: 2;
    email:'';
    password: '';
}
export class otpverification_SA {
    mobileno: string;
    otp: string;
    uid: string;

}
export class newpwd_SA {
    newpassword: string;
    uid: string;
}