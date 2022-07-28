class StudioDocument {
  uid = "";
  name = "";
  intro = "";
  prefecture = "";
  link = "";
  visited: string[] = [];

  toObject() {
    return {
      uid: this.uid,
      name: this.name,
      intro: this.intro,
      prefecture: this.prefecture,
      link: this.link,
      visited: this.visited,
    };
  }

  static fromObject(data: any) {
    const doc = new StudioDocument();
    doc.uid = data.uid;
    doc.name = data.name;
    doc.intro = data.intro;
    doc.prefecture = data.prefecture;
    doc.link = data.link;
    doc.visited = data.visited;
    return doc;
  }
}

class StudioSearchCriteria {
  name = "";
  prefecture = "";

  toObject() {
    return {
      name: this.name,
      prefecture: this.prefecture,
    };
  }

  isMatch(doc: StudioDocument): boolean {
    if (this.name.length > 0 && !doc.name.includes(this.name)) {
      return false;
    }
    if (this.prefecture.length > 0 && doc.prefecture !== this.prefecture) {
      return false;
    }
    return true;
  }

  static fromObject(data: any) {
    const criteria = new StudioSearchCriteria();
    criteria.name = data.name;
    criteria.prefecture = data.perfecture;
  }
}

export { StudioDocument, StudioSearchCriteria };
