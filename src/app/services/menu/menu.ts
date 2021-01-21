export class getTime {
  uid: string;
  timestamp: string;
  hashcode: string;
}

export class setTime {
  uid: string;
  currenttime: number;
  timestamp: string;
  hashcode: string;
}
export class skillkitstatus {
  uid: string;
  event_id: number;
  skillid: number;
  year_status: number;
  skillcnt: number;
  timestamp: string;
  hashcode: string;
}

export class setdobdata {
  uid: string;
  dobdata: string;
  year_status: number;
  timestamp: string;
  hashcode: string;
}

export class chkfbdata {
  uid: string;
  year_status: number;
  timestamp: string;
  hashcode: string;
}

export class setfbdata {
  uid: string;
  year_status: number;
  assexptxt: string;
  htpins: string;
  protxt: string;
  solvetxt: string;
  shareexp: string;
  desctxt: string;
  timestamp: string;
  hashcode: string;
}
export class chklogin {
  userid: string;
  timestamp: string;
  hashcode: string;
}


export class chkinitialcomp {
  uid: string;
  event_id: number;
  ass_status_id: number;
  year_status: number;
  timestamp: string;
  hashcode: string;
}

export class session_id {
  uid: string;
}
export class getmedval {
  uid: string;
  eid: number;
  year_status: number;
  timestamp: string;
  hashcode: string;
}

export class updatebgm {
  uid: string;
  bgm: string;
  timestamp: string;
  hashcode: string;
}