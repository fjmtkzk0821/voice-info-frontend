// const common = require("../util/common");
// const { CustomError } = require("../util/error_message");
// const { CODE_ERROR_GENERAL } = require("../util/message_string");

export class UserCredential {
  email: string;
  password: string;
  confirmPW: string;
  constructor(email: string, password: string, confirmPW: string) {
    this.email = email;
    this.password = password;
    this.confirmPW = confirmPW;
  }

  //   checkRegisterValid() {
  //     if (!common.validEmail(this.email))
  //       throw new CustomError(CODE_ERROR_GENERAL, "Email format is not correct.");
  //     if (this.password.trim() === "")
  //       throw new CustomError(
  //         CODE_ERROR_GENERAL,
  //         "Password should not be empty."
  //       );
  //     if (this.password !== this.confirmPW)
  //       throw new CustomError(CODE_ERROR_GENERAL, "Passwords must be the same.");
  //   }

  //   checkLoginValid() {
  //     if (!common.validEmail(this.email))
  //       throw new CustomError(CODE_ERROR_GENERAL, "Email format is not correct.");
  //   }
}

export class User {
  uid: string;
  avatar: {
      link: string,
      name: string
  };
  email: string;
  gender: string;
  intro: string;
  name: string;
  page: string;
  public: boolean;
  role: string;
  twitter: string;

  constructor(data: any) {
    this.uid = data.uid;
    this.avatar = data.avatar;
    this.email = data.email;
    this.gender = data.gender;
    this.intro = data.intro;
    this.name = data.name;
    this.page = data.page;
    this.public = data.public;
    this.role = data.role;
    this.twitter = data.twitter;
  }

  changeData(key: string, val: any): User {
    let obj = this as any;
    for (let k in obj) {
      if (k === key) {
        obj[k] = val;
        break;
      }
    }
    return obj;
  }

  toFirestore() {
    return {
      public: this.public,
      name: this.name,
      gender: this.gender,
      intro: this.intro,
      twitter: this.twitter,
      email: this.email,
      page: this.page,
    };
  }

  getBasicObject() {
    return {
      public: this.public,
      role: this.role,
      avatar: this.avatar,
      name: this.name,
      gender: this.gender,
      intro: this.intro,
      twitter: this.twitter,
      email: this.email,
      page: this.page,
    };
  }

  static empty() {
      return new User({
        uid: "",
        avatar: {
            link: "",
            name: ""
        },
        email: "",
        gender: "",
        intro: "",
        name: "",
        page: "",
        public: false,
        role: "seiyu",
        twitter: ""
      });
  }
}

export class Seiyu extends User {
  able: any;
  equip: any;
  experiences: any;
  feeDetail: any;
  hires: any;
  jozu: any;
  otherDetail: any;
  precaution: any;
  statusDetail: any;
  wish: any;
  samples: never[];
  dlsiteScript: any;
  
  constructor(basic: any, detail: any) {
    super(basic);
    this.able = detail.able;
    this.equip = detail.equip;
    this.experiences = detail.experiences;
    this.feeDetail = detail.feeDetail;
    this.hires = detail.hires;
    this.jozu = detail.jozu;
    this.otherDetail = detail.otherDetail;
    this.precaution = detail.precaution;
    this.statusDetail = detail.statusDetail;
    this.wish = detail.wish;
    this.samples = [];
  }

  setSamples(samples: never[]) {
    this.samples = samples;
  }

  setDLSiteScript(dlsiteScript: any) {
    this.dlsiteScript = dlsiteScript;
  }

  getDetailObject() {
    return {
      able: this.able,
      equip: this.equip,
      experiences: this.experiences,
      feeDetail: this.feeDetail,
      otherDetail: this.otherDetail,
      precaution: this.precaution,
      statusDetail: this.statusDetail,
      jozu: this.jozu,
      wish: this.wish,
      hires: this.hires,
    };
  }

  toSimpleObject() {
    return {
      uid: this.uid,
      avatar: this.avatar,
      gender: this.gender,
      intro: this.intro,
      name: this.name,
      hires: this.hires,
      samples: this.samples,
    };
  }

  toStandardObject() {
    return {
      uid: this.uid,
      able: this.able,
      avatar: this.avatar,
      dlsiteScript: this.dlsiteScript,
      email: this.email,
      equip: this.equip,
      experiences: this.experiences,
      feeDetail: this.feeDetail,
      gender: this.gender,
      intro: this.intro,
      name: this.name,
      otherDetail: this.otherDetail,
      page: this.page,
      precaution: this.precaution,
      public: this.public,
      role: this.role,
      statusDetail: this.statusDetail,
      twitter: this.twitter,
      jozu: this.jozu,
      wish: this.wish,
      hires: this.hires,
      samples: this.samples,
    };
  }

  static empty() {
    return new Seiyu(
      {
        public: false,
        role: "seiyu",
        avatar: ["", ""],
        name: "",
        gender: "",
        intro: "",
        twitter: "",
        email: "",
        page: "",
      },
      {
        able: {
          R: false,
          R15: false,
          R18: false,
        },
        jozu: [],
        wish: [],
        equip: "",
        experiences: "",
        feeDetail: "",
        otherDetail: "",
        precaution: "",
        statusDetail: "",
        hires: false,
      }
    );
  }
}

export class Circle extends User {
  equip: any;
  experiences: any;
  dlsite: any;
  constructor(basic: any, detail: any) {
    super(basic);
    this.equip = detail.equip;
    this.experiences = detail.experiences;
    this.dlsite = detail.dlsite;
  }

  getDetailObject() {
    return {
      equip: this.equip,
      experiences: this.experiences,
      dlsite: this.dlsite,
    };
  }

  toStandardObject() {
    return {
      uid: this.uid,
      avatar: this.avatar,
      dlsite: this.dlsite,
      email: this.email,
      equip: this.equip,
      experiences: this.experiences,
      gender: this.gender,
      intro: this.intro,
      name: this.name,
      page: this.page,
      public: this.public,
      role: this.role,
      twitter: this.twitter,
    };
  }

  static empty() {
    return new Circle(
      {
        public: false,
        role: "circle",
        avatar: ["", ""],
        name: "",
        gender: "",
        intro: "",
        twitter: "",
        email: "",
        page: "",
      },
      {
        equip: "",
        experiences: "",
        dlsite: "",
      }
    );
  }
}