class AudioObj {
  title: string;
  category: string;
  restriction: string;
  src: string;

  constructor(
    title: string,
    category: string,
    restriction: string,
    src: string
  ) {
    this.title = title;
    this.category = category;
    this.restriction = restriction;
    this.src = src;
  }
}

export default AudioObj