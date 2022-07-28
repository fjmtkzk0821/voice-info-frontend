class RelatedLink {
    url: string;
    cover: string;

    constructor(url: string, cover: string) {
        this.url = url;
        this.cover = cover;
    }

    toObject() {
      return {
        url: this.url,
        cover: this.cover,
      };
    }

    static fromObject(data: any) {
        return new RelatedLink(data.url, data.cover);
    }
}

export default RelatedLink;