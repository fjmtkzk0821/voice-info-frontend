import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getErrorMessage } from "../../objects/BaseMessage";
import {
  LoginSuccess,
  SignupSuccess,
  UnknownError,
} from "../../utils/presetMessage";
import {
  apiRemoveAuthHeader,
  apiSetAuthHeader,
  apiUserLogin,
  apiUserSignUp,
} from "../../utils/services/api";
import { AppDispatch } from "../store";
import { clearAlert, setAlert } from "./alertMessageSlice";

interface UserState {
  authenticated: Boolean;
  credenials: any;
  profile: any;
  samples: any;
}

const initialState: UserState = {
  authenticated: false,
  credenials: {},
  profile: null,
  samples: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.authenticated = true;
      state.credenials = action.payload;
    },
    cleanUser: (state: UserState) => {
      state.authenticated = false;
      state.credenials = null;
    },
  },
});

export const loginAsync =
  (userData: any, history: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(clearAlert());
      let res = await apiUserLogin(userData);
      setAuthHeader(res.data.token);
      localStorage.setItem("uid", res.data.uid);
      dispatch(setUser({ uid: res.data.uid }));
      history.push("/");
      dispatch(setAlert(LoginSuccess));
    } catch (e: any) {
      if (e.response) {
        console.log(e);
        let message = getErrorMessage(e.response.data);
        dispatch(setAlert(message));
      } else {
        dispatch(setAlert(UnknownError));
      }
    }
  };

export const logoutAsync = (history: any) => (dispatch: AppDispatch) => {
  removeAuthHeader();
  localStorage.removeItem("uid");
  dispatch(cleanUser());
  history.push("/");
};

export const registerAsync =
  (userData: any, history: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(clearAlert());
      let res = await apiUserSignUp(userData);
      setAuthHeader(res.data.token);
      localStorage.setItem("uid", res.data.uid);
      dispatch(setUser({ uid: res.data.uid }));
      history.push("/");
      dispatch(setAlert(SignupSuccess));
    } catch (e: any) {
      if (e.response) {
        console.log(e);
        let message = getErrorMessage(e.response.data);
        dispatch(setAlert(message));
      } else {
        dispatch(setAlert(UnknownError));
      }
    }
  };

const setAuthHeader = (token: string) => {
  const firebaseIdToken = `Bearer ${token}`;
  localStorage.setItem("FBaseIdToken", firebaseIdToken);

  apiSetAuthHeader(firebaseIdToken);
};

const removeAuthHeader = () => {
  localStorage.removeItem("FBaseIdToken");
  apiRemoveAuthHeader();
};

export const { setUser, cleanUser } = userSlice.actions;

export default userSlice.reducer;
