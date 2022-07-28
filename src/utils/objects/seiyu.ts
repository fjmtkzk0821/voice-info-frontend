import {isStringEmpty} from "../common";
// import {getUrlFromStorageBucket} from "../common";

class SeiyuDocument {
  uid = "";
  name = "";
  gender: "f" | "m" | "o" | "NG" | string = "NG";
  avatar = "no_img.jpg";
  intro = "";
  email = "";
  hires = false;
  restric: { r: boolean; r15: boolean; r18: boolean } = {
    r: false,
    r15: false,
    r18: false,
  };
  possible: string[] = [];
  wish: string[] = [];
  social: SeiyuSocialLinkDocument[] = [];
  publish = false;
  samples: SeiyuSampleDocument[] = [];
  personal = "";
  twitter = "";

  toObject() {
    return {
      uid: this.uid,
      name: this.name,
      gender: this.gender,
      avatar: this.avatar,
      intro: this.intro,
      email: this.email,
      hires: this.hires,
      restric: this.restric,
      possible: this.possible,
      wish: this.wish,
      social: this.social.map((s) => s.toObject()),
      publish: this.publish,
      personal: this.personal,
      twitter: this.twitter,
    };
  }

  static fromObject(data: any) {
    const doc = new SeiyuDocument();
    doc.uid = data.uid;
    doc.name = data.name;
    doc.gender = data.gender;
    doc.avatar = data.avatar;
    doc.intro = data.intro;
    doc.email = data.email;
    doc.hires = data.hires;
    doc.restric = data.restric;
    doc.possible = data.possible;
    doc.wish = data.wish;
    doc.social = (data.social as Array<any>).map((s) => {
      const socialDoc = new SeiyuSocialLinkDocument();
      socialDoc.platform = s.platform;
      socialDoc.url = s.url;
      socialDoc.display = s.display;
      return socialDoc;
    });
    doc.samples = data.samples?(data.samples as Array<any>).map((s) => {
      const sampleDoc = new SeiyuSampleDocument();
      sampleDoc.uid = s.uid;
      sampleDoc.cat = s.cat;
      sampleDoc.restric = s.restric;
      sampleDoc.url = s.url;
      sampleDoc.filename = s.filename;
      sampleDoc.pid = s.pid;
      return sampleDoc;
    }):[];
    doc.publish = data.publish;
    doc.personal = data.personal;
    doc.twitter = data.twitter;
    return doc;
  }
}

class SeiyuDetailDocument {
  uid = "";
  reception: { type: "txt" | "tweet"; content: string } = {
    type: "txt",
    content: "",
  };
  precaution = "";
  fee = "";
  equip = "";
  exp: { type: "txt" | "dlsite"; content: string } = {
    type: "txt",
    content: "",
  };
  other = "";

  toObject() {
    return {
      uid: this.uid,
      reception: this.reception,
      precaution: this.precaution,
      fee: this.fee,
      equip: this.equip,
      exp: this.exp,
      other: this.other,
    };
  }

  static fromObject(data: any) {
    const doc = new SeiyuDetailDocument();
    doc.uid = data.uid;
    doc.reception = data.reception;
    doc.precaution = data.precaution;
    doc.fee = data.fee;
    doc.equip = data.equip;
    doc.exp = data.exp;
    doc.other = data.other;
    return doc;
  }
}

class SeiyuSampleDocument {
  uid = "";
  cat = "";
  restric: "r" | "r15" | "r18" | string = "r";
  url = "";
  filename = "";
  pid = "";

  toObject() {
    const obj = {
      uid: this.uid,
      cat: this.cat,
      restric: this.restric,
      url: this.url,
      filename: this.filename,
      pid: this.pid,
    };
    if (!isStringEmpty(this.uid)) {
      obj.uid = this.uid;
    }
    return obj;
  }

  static fromObject(obj: {
    uid: string;
    cat: string;
    restric: string;
    url: string;
    filename: string;
    pid: string;
  }): SeiyuSampleDocument {
    const doc = new SeiyuSampleDocument();
    doc.uid = obj.uid;
    doc.cat = obj.cat;
    doc.restric = obj.restric;
    doc.url = obj.url;
    doc.filename = obj.filename;
    doc.pid = obj.url;
    return doc;
  }
}

class SeiyuSocialLinkDocument {
  platform = "";
  url = "";
  display = false;

  toObject() {
    return {
      platform: this.platform,
      url: this.url,
      display: this.display,
    };
  }
}

class SeiyuSearchCriteria {
  restric: "r"|"r15"|"r18"| string = "";
  name = "";
  gender: "f" | "m" | "NG" | string = "";
  vocalType = "";
  sampleCat = ""; 
  hires = false;

  toObject() {
    return {
      restric: this.restric,
      name: this.name,
      gender: this.gender,
      vocalType: this.vocalType,
      sampleCat: this.sampleCat,
      hires: this.hires
    }
  }

  isMatch(doc: SeiyuDocument): boolean {
    if(this.restric.length > 0 && !Object.entries(doc.restric).some((e) => e[0] === this.restric && e[1])) {
      return false;
    }
    if(this.name.length > 0 && !doc.name.includes(this.name)) {
      return false;
    }
    if(this.gender.length > 0 && !doc.gender.includes(this.gender)) {
      return false;
    }
    if(this.vocalType.length > 0 && doc.possible
      .concat(doc.wish)
      .every((value) => !value.includes(this.vocalType))) {
        return false;
      }
    if(this.hires && !doc.hires) {
      return false;
    }

    if (
      this.sampleCat.length > 0 &&
      !doc.samples.some((s) => s.cat.includes(this.sampleCat))
    ) {
      return false;
    }

    return true;
  }

  static fromObject(data: any) {
    const criteria = new SeiyuSearchCriteria();
    criteria.restric = data.restric;
    criteria.name = data.name;
    criteria.gender = data.gender;
    criteria.vocalType = data.vocalType;
    criteria.sampleCat = data.sampleCat;
    criteria.hires = data.hires;
    return criteria;
  }
}

export {
  SeiyuDocument,
  SeiyuDetailDocument,
  SeiyuSampleDocument,
  SeiyuSocialLinkDocument,
  SeiyuSearchCriteria,
};
