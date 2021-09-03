import axios from "axios";

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

export const apiGetHome = async () => await apiRequest.get("/home");

export const apiSeiyuList = async () => await apiRequest.get("/seiyu");

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
export const apiUserBasicUpdate = (data: any) => apiRequest.post("/user/basic", data);