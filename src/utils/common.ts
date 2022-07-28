function isStringEmpty(str: string): boolean {
    if (str !== undefined && str.length > 0) {
      return false;
    }
    return true;
  }
  
  function getUrlFromStorageBucket(filename: string, type = "media"): string {
    // return `http://localhost:9199/v0/b/voice-info.appspot.com/o/${filename}?alt=${type}`;
    return `https://firebasestorage.googleapis.com/v0/b/voice-info.appspot.com/o/${filename}?alt=${type}`;
  }

  function isValidEmailAddress(val: string): boolean {
    const reg = new RegExp(
      "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
    );
    return reg.test(val);
  }

  function scroll2Top() {
    document.documentElement.scrollTop = 0;
  }

  function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  function openInNewTab(url: string) {
    window.open(url, "_blank");
  }

  function shuffle<Type>(array: Type[]) :Type[] {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({value}) => value);
  }

  const currentLanguage = "ja";

export {
  isStringEmpty,
  getUrlFromStorageBucket,
  isValidEmailAddress,
  scroll2Top,
  getRandomInt,
  currentLanguage,
  openInNewTab,
  shuffle
};