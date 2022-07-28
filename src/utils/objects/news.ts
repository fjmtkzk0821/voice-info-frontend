class News {
  uid: string;
  type: string;
  title: string;
  content: string;
  author: string;
  date: Date;

  constructor(
    type: string,
    title: string,
    content: string,
    author: string,
    uid = "",
    date = new Date()
  ) {
    this.uid = uid;
    this.type = type;
    this.title = title;
    this.content = content;
    this.author = author;
    this.date = date;
  }

  toObject() {
    return {
      uid: this.uid,
      type: this.type,
      title: this.title,
      content: this.content,
      author: this.author,
      date: this.date.getMilliseconds(),
    };
  }

  static fromObject(data: any) {
    let test = new Date(data.date);
    // console.log(test);
    return new News(
      data.type,
      data.title,
      data.content,
      data.author,
      data.uid,
      new Date(data.date)
    );
  }
}

export {News};
