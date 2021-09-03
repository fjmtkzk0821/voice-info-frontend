import ja from "../assets/lang/ja.json";

const stringStorage = {
  ja: ja,
};

export const getString = <
  T extends any,
  K1 extends T,
  K2 extends K1,
  K3 extends K2
>(
  lang: K1,
  section: K2,
  stringKey: K3
) => {
  if (!lang) return "";
  if (!(stringStorage as any)[lang][section][stringKey]) return stringKey;
  return (stringStorage as any)[lang][section][stringKey];
};
