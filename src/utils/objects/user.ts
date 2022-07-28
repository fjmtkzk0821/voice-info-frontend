class UserDocument {
    uid: string;
    email: string;
    twitter: string;
    isSeiyu: boolean;

    constructor(uid:string, email: string, twitter = "", isSeiyu = false) {
      this.uid = uid;
      this.email = email;
      this.twitter = twitter;
      this.isSeiyu = isSeiyu;
    }

    toObject() {
      return {
        uid: this.uid,
        email: this.email,
        twitter: this.twitter,
        isSeiyu: this.isSeiyu,
      };
    }

    static fromObject(obj: any): UserDocument {
      return new UserDocument(obj.uid, obj.email, obj.twitter ?? "", obj.isSeiyu ?? false);
    }
}

export default UserDocument;
