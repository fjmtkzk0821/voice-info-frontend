import axios from "axios";
import { User } from "../../objects/user";

//cbp
const baseURL = "http://localhost:5001/voice-info/asia-northeast1/api";
//const baseUrl = "https://asia-northeast1-voice-info.cloudfunctions.net/api";

const apiRequest = axios.create({
  baseURL: baseURL,
});

export const apiSetAuthHeader = (token: string) => {
  apiRequest.defaults.headers.common["Authorization"] = token;
};

export const apiRemoveAuthHeader = () => {
  delete apiRequest.defaults.headers.common["Authorization"];
};

export const apiHomeGet = async () => await apiRequest.get("/home");

export const apiSeiyuListGet = async () => await apiRequest.get("/seiyu");
export const apiSeiyuGet = async (id: string) => await apiRequest.get(`/seiyu/${id}`);
//user
export const apiUserLogin = (data:any) => apiRequest.post("/login", data);
export const apiUserSignUp = (data:any) => apiRequest.post("/signup", data);
export const apiAvatarUpdate = (file: File) => {
  let tmpRequest = axios.create({
    method: "post",
    baseURL: baseURL,
    headers: {
      Authorization: localStorage.getItem("FBaseIdToken"),
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  });
  let formData = new FormData();
  formData.append("file", file);
  formData.append("props", JSON.stringify({
    required: true
  }));
  return tmpRequest.post("/user/image", formData);
};
export const apiUserBasicUpdate = (data: User) => apiRequest.post("/user/basic", data.toFirestore());
export const apiUserDetailUpdate = (data: User) => apiRequest.post("/user/detail", data.getDetailObject());
export const apiUserDLsiteScriptUpdate = (dlsiteScript: string) => {
  return apiRequest.post("/user/dlsiteScript", {script: dlsiteScript});
};

export const apiSampleInsert = (data: {type: string, file: File}) => {
  let formData = new FormData();
  formData.append("file", data.file);
  formData.append("type", data.type);

  return axios({
    method: "post",
    url: `${baseURL}/user/sample`,
    data: formData,
    headers: {
      'Authorization': localStorage.getItem("FBaseIdToken"),
      'Content-Type': "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  });
  //return tmpRequest.post("/user/sample", data);
};
export const apiSampleDelete = (sid: string) => {
  return apiRequest.post(`/user/sample/${sid}`);
};

