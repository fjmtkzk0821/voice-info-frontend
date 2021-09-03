export class BaseMessage {
  status: MessageType;
  code: string;
  title: string;
  msg: string;

  constructor(status: MessageType, code: string, title: string, msg: string) {
    this.status = status;
    this.code = code;
    this.title = title;
    this.msg = msg;
  }

  toSerializable() {
    return {
      status: this.status,
      code: this.code,
      title: this.title,
      msg: this.msg,
    };
  }

  static fromPayload(payload: any): BaseMessage {
    let { status, code, title, msg } = payload;
    return new BaseMessage(status, code, title, msg);
  }
}

export enum MessageType {
  Success = "success",
  Info = "info",
  Error = "error",
  Fatal = "fatal",
}

export type Severity = "error" | "success" | "info" | "warning" | undefined;

export const getErrorMessage = (payload: any) => {
  return {
    status: MessageType.Error,
    code: payload.code,
    title: "ERROR",
    msg: payload.msg,
  };
}