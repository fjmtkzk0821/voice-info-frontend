import axios from "axios";

//cbp
// const apiBaseURL = "http://localhost:5001/voice-info/asia-northeast1/api";
const apiBaseURL = "https://asia-northeast1-voice-info.cloudfunctions.net/api";

const apiRequest = axios.create({
    baseURL: apiBaseURL,
    // baseURL:"https://us-central1-onsei-info.cloudfunctions.net/api"
  });

const setAuthHeader = (token: string) => {
  apiRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("accessToken", token);
};
  
const cleanAuthHeader = () => {
  delete apiRequest.defaults.headers.common["Authorization"];
  localStorage.removeItem("accessToken");
};

export {apiRequest, setAuthHeader, cleanAuthHeader};
