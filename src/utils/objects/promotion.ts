class Promotion {
  uid: string;
  title: string;
  type: string;
  data: any;
  date: Date;

  constructor(
      title: string,
      type: string,
      data: any,
      uid = "",
      date = new Date()
  ) {
    this.uid = uid;
    this.title = title;
    this.type = type;
    this.data = data;
    this.date = date;
  }

  toObject() {
    return {
      uid: this.uid,
      title: this.title,
      type: this.type,
      data: this.data,
      date: this.date.getMilliseconds(),
    };
  }

  static fromObject(data: any) {
    return new Promotion(
      data.title,
      data.type,
      data.data,
      data.uid,
      new Date(data.date)
    );
  }
}
export {Promotion};
