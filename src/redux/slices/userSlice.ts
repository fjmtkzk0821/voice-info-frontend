import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getErrorMessage } from "../../objects/BaseMessage";
import { User } from "../../objects/user";
import {
  LoginSuccess,
  SignupSuccess,
  UnknownError,
  UpdateSuccess,
} from "../../utils/presetMessage";
import {
  apiAvatarUpdate,
  apiRemoveAuthHeader,
  apiSampleDelete,
  apiSampleInsert,
  apiSeiyuGet,
  apiSetAuthHeader,
  apiUserBasicUpdate,
  apiUserDetailUpdate,
  apiUserDLsiteScriptUpdate,
  apiUserLogin,
  apiUserSignUp,
} from "../../utils/services/api";
import { AppDispatch } from "../store";
import { clearAlert, setAlert } from "./alertMessageSlice";
import { setBackdrop, dismissBackdrop } from "./backdropSlice";

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
    setProfile: (state: UserState, action: PayloadAction<any>) => {
      state.profile = action.payload;
    },
    setPartial: (state: UserState, action: PayloadAction<any>) => {
      state.profile = {
        ...state.profile,
        ...action.payload,
      };
    },
    pushSample: (state: UserState, action: PayloadAction<any>) => {
      state.profile.samples.push(action.payload);
    },
    removeSample: (state: UserState, action: PayloadAction<any>) => {
      state.profile.samples = (state.profile.samples as Array<any>).filter(
        (s, index) => {
          return s.sid !== action.payload;
        }
      );
    },
  },
});

export const loginAsync =
  (userData: any, history: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setBackdrop());
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
    } finally {
      dispatch(dismissBackdrop());
    }
  };

export const logoutAsync =
  (history: any = null) =>
  (dispatch: AppDispatch) => {
    dispatch(setBackdrop());
    removeAuthHeader();
    localStorage.removeItem("uid");
    dispatch(cleanUser());
    if (history) history.push("/");
    dispatch(dismissBackdrop());
  };

export const registerAsync =
  (userData: any, history: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setBackdrop());
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
    }finally {
      dispatch(dismissBackdrop());
    }
  };

export const fetchProfileAsync =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setBackdrop());
      let res = await apiSeiyuGet(id);
      dispatch(setProfile(res.data));
    } catch (e: any) {
      if (e.response) {
        console.log(e);
        let message = getErrorMessage(e.response.data);
        dispatch(setAlert(message));
      } else {
        dispatch(setAlert(UnknownError));
      }
    } finally {
      dispatch(dismissBackdrop());
    }
  };

export const updateBasicInformationAsync =
  (data: User, avatar: File | null) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setBackdrop());
      let res = await apiUserBasicUpdate(data);
      if (avatar !== null) {
        res = await apiAvatarUpdate(avatar);
        data.avatar = res.data;
      }
      dispatch(setPartial(data.getBasicObject()));
      dispatch(setAlert(UpdateSuccess));
    } catch (e: any) {
      if (e.response) {
        console.log(e);
        let message = getErrorMessage(e.response.data);
        dispatch(setAlert(message));
      } else {
        dispatch(setAlert(UnknownError));
      }
    } finally {
      dispatch(dismissBackdrop());
    }
    window.scrollTo(0, 0);
  };

export const updateDetailInformationAsync =
  (data: User) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setBackdrop());
      let res = await apiUserDetailUpdate(data);
      console.log(res.data);
      dispatch(setPartial(data.getDetailObject()));
      dispatch(setAlert(UpdateSuccess));
    } catch (e: any) {
      if (e.response) {
        console.log(e.response.data);
        let message = getErrorMessage(e.response.data);
        dispatch(setAlert(message));
      } else {
        dispatch(setAlert(UnknownError));
      }
    } finally {
      dispatch(dismissBackdrop());
    }
    window.scrollTo(0, 0);
  };

  export const updateDLsiteScriptAsync =
  (dlsiteScript: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setBackdrop());
      let res = await apiUserDLsiteScriptUpdate(dlsiteScript);
      console.log(res.data);
      dispatch(setPartial({dlsiteScript: dlsiteScript}));
      dispatch(setAlert(UpdateSuccess));
    } catch (e: any) {
      if (e.response) {
        console.log(e.response.data);
        let message = getErrorMessage(e.response.data);
        dispatch(setAlert(message));
      } else {
        dispatch(setAlert(UnknownError));
      }
    } finally {
      dispatch(dismissBackdrop());
    }
    window.scrollTo(0, 0);
  };

export const insertSampleAsync =
  (data: { type: string; file: File }) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setBackdrop());
      let res = await apiSampleInsert(data);
      dispatch(pushSample(res.data.payload));
      dispatch(setAlert(UpdateSuccess));
    } catch (e: any) {
      if (e.response) {
        console.log(e);
        let message = getErrorMessage(e.response.data);
        dispatch(setAlert(message));
      } else {
        console.log(e);
        dispatch(setAlert(UnknownError));
      }
    } finally {
      dispatch(dismissBackdrop());
    }
    window.scrollTo(0, 0);
  };

export const deleteSampleAsync =
  (sid: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setBackdrop());
      let res = await apiSampleDelete(sid);
      dispatch(removeSample(sid));
      dispatch(setAlert(UpdateSuccess));
    } catch (e: any) {
      if (e.response) {
        console.log(e);
        let message = getErrorMessage(e.response.data);
        dispatch(setAlert(message));
      } else {
        dispatch(setAlert(UnknownError));
      }
    } finally {
      dispatch(dismissBackdrop());
    }
    window.scrollTo(0, 0);
  };

export const setAuthHeader = (token: string) => {
  const firebaseIdToken = `Bearer ${token}`;
  localStorage.setItem("FBaseIdToken", firebaseIdToken);
  apiSetAuthHeader(firebaseIdToken);
};

export const removeAuthHeader = () => {
  localStorage.removeItem("FBaseIdToken");
  apiRemoveAuthHeader();
};

export const {
  setUser,
  cleanUser,
  setProfile,
  setPartial,
  pushSample,
  removeSample,
} = userSlice.actions;

export default userSlice.reducer;
