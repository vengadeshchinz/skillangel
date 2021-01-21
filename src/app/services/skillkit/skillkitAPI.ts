
export class skillcheck {
    uid: string;
    skid: number;
    year_status: number;
    timestamp: string;
    hashcode: string;
}

export class getskillkitgames {
    uid: string;
    eid: number;
    skid: number;
    gamecnt: number;
    year_status: number;
    mgrade: number;
    vgrade: number;
    fgrade: number;
    pgrade: number;
    lgrade: number;
    timestamp: string;
    hashcode: string;
}

export class getskillkitscore {
    uid: string;
    eid: number;
    skid: number;
    testNo: number;
    year_status: number;
    timestamp: string;
    hashcode: string;
}

export class getskillkitsnd {
    uid: string;
    eid: number;
    year_status: number;
    timestamp: string;
    hashcode: string;
}
export class getskillkitquescnt {
    uid: string;
    eid: number;
    ass_status_id: number;
    skid: number;
    testNo: number;
    year_status: number;
    timestamp: string;
    hashcode: string;
}

export class getskillkitorggame {
    uid: string;
    eid: number;
    year_status: number;
    skid: number;
    ass_status_id: number;
    date: Date;
    mem: number;
    vp: number;
    fa: number;
    ps: number;
    lin: number;
    memnam: string;
    vpnam: string;
    fanam: string;
    psnam: string;
    linnam: string;
    skillcnt: number;
    timestamp: string;
    hashcode: string;
}

export class skillkitdet {
    uid: string;
    timestamp: string;
    hashcode: string;
}

export class getgamesstatus {
    uid: string;
    eid: number;
    year_status: number;
    timestamp: string;
    hashcode: string;
}
