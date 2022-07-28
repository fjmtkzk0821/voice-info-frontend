export enum BaseMessageType {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
}

class BaseMessage {
  type: BaseMessageType;
  title: string;
  body: string;

  constructor(title: string, body:string, type = BaseMessageType.SUCCESS) {
      this.type = type;
      this.title = title;
      this.body = body;
  }

  toObject() {
      return {
          type: this.type,
          title: this.title,
          body: this.body,
      }
  }
}

export default BaseMessage;
