import ja from "../assets/lang/ja.json";
import { currentLanguage } from "./common";

const stringStorage = {
  ja: ja,
};

export const getString = (section: string, stringKey: string, lang = currentLanguage) => {
  if (!lang) return "";
  if (!(stringStorage as any)[lang][section][stringKey]) return stringKey;
  return (stringStorage as any)[lang][section][stringKey];
};
