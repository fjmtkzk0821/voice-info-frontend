import { MessageType } from "../objects/BaseMessage";

export const UnknownError = {
  status: MessageType.Error,
  code: "Unknown Error",
  header: "ERROR",
  msg: "Please contact website manager.",
};

export const LoginSuccess = {
    status: MessageType.Success,
    code: "",
    header: "SUCCESS",
    msg: "Login successfully.",
  };
  
export const SignupSuccess = {
  status: MessageType.Success,
  code: "",
  header: "SUCCESS",
  msg: "Account created.",
};

export const UpdateSuccess = {
  status: MessageType.Success,
  code: "",
  header: "SUCCESS",
  msg: "Updated successfully.",
};