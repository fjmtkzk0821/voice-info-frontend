import { SeiyuDetailDocument, SeiyuDocument, SeiyuSampleDocument } from "../utils/objects/seiyu";
import { apiRequest, setAuthHeader } from "./api";

function getLink(path: string): string {
    return `/auth/${path}`;
}

const userLogin = async (data: {email: string, password: string}) => {
  const response = await apiRequest.post(getLink("login"), data);
  // console.log(response.data);
  if(response.data.data.accessToken) {
    setAuthHeader(response.data.data.accessToken);
  }
  return response.data;
};
const userSignUp = async (data: {email: string, password: string}) => (await apiRequest.post(getLink("signup"), data)).data;
const userResetPassword = async (email: string) => (await apiRequest.post(getLink("reset"), {email})).data;
const getAccountSetting = async () => (await apiRequest.get(getLink("account"))).data;
const seiyuRegister = async () => (await apiRequest.post(getLink("seiyu/register"))).data;
const getSeiyuBasic = async () => (await apiRequest.get(getLink("seiyu/basic"))).data;
const getSeiyuProfile = async () => (await apiRequest.get(getLink("seiyu/detail"))).data;
const getSeiyuSamples = async () => (await apiRequest.get(getLink("seiyu/samples"))).data;
const seiyuBasicUpdate = async (doc: any, avatar?: File) => {
  const formData = new FormData();
  if(avatar) {
    formData.append("avatar", avatar);
  }
  formData.append("data", JSON.stringify(doc));
  const config: any = {
    headers: {
      ...apiRequest.defaults.headers,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }
  };
  return (await apiRequest.post(getLink("seiyu/basic"), formData, config)).data;
}
const seiyuDetailUpdate = async (doc: any) => (await apiRequest.post(getLink("seiyu/detail"), doc)).data;
const seiyuSampleCreate = async (doc: any, sample?: File) => {
  const formData = new FormData();
  if(sample) {
    formData.append("sample", sample);
  }
  formData.append("data", JSON.stringify(doc));
  const config: any = {
    headers: {
      ...apiRequest.defaults.headers,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }
  };
  return (await apiRequest.post(getLink("seiyu/sample"), formData, config)).data;
}
const seiyuSampleDelete = async (uid: string) => (await apiRequest.delete(getLink(`seiyu/sample/${uid}`))).data;

export default {
  userLogin,
  userSignUp,
  seiyuRegister,
  getSeiyuBasic,
  getSeiyuProfile,
  getSeiyuSamples,
  seiyuBasicUpdate,
  seiyuDetailUpdate,
  seiyuSampleCreate,
  seiyuSampleDelete,
  getAccountSetting,
  userResetPassword,
};
