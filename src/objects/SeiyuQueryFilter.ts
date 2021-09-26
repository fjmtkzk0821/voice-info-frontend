import { isForInStatement } from "typescript";
import { didContainString } from "../utils/commonTools";

export default class SeiyuQueryFilter {
  able:
    | {
        R: Boolean;
        R15: Boolean;
        R18: Boolean;
      }
    | any;
  charactor: string;
  gender: "M" | "F" | "NG" | "" | string;
  hires: Boolean;
  name: string;
  sample: string;

  constructor() {
    this.able = {
      R: false,
      R15: false,
      R18: false,
    };
    this.charactor = "";
    this.gender = "";
    this.hires = false;
    this.name = "";
    this.sample = "";
  }

  changeCriteria(key: string, val: any): SeiyuQueryFilter {
    // console.log(this);
    let obj = this as any;
    for (let k in obj) {
      if (k === key) {
        obj[k] = val;
        break;
      }
    }
    return obj;
  }

  filter(item: any) {
    for (let key of Object.keys(this.able))
      if (this.able[key] && !item.able[key]) return false;
    if (this.charactor.length > 0) {
      let exist = false;
      for (let chara of item.jozu) {
        if (didContainString(chara, this.charactor)) {
          exist = true;
          break;
        }
      }
      if (!exist) return false;
    }
    if (this.gender.length > 0 && this.gender !== item.gender) return false;
    if (this.name.length > 0 && !didContainString(item.name, this.name))
      return false;
    if (
      this.sample.length > 0 &&
      !item.samples.some((s: any) => {
        return didContainString(s.type, this.sample);
      })
    )
      return false;
    if (this.hires && !item.hires) return false;
    return true;
  }

  static clone(filter: SeiyuQueryFilter): SeiyuQueryFilter {
    return Object.assign(Object.getPrototypeOf(filter), filter);
  }
}
