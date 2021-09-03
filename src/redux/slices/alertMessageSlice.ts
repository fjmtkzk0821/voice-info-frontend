import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseMessage } from "../../objects/BaseMessage";
import { AppDispatch } from "../store";

interface AlertMessageState {
  message: BaseMessage | null;
}

const initialState: AlertMessageState = {
  message: null,
};

export const alertMessageSlice = createSlice({
  name: "alert_message",
  initialState,
  reducers: {
    setAlert: (state: AlertMessageState, action: PayloadAction<any>) => {
      state.message = action.payload;
    },
    clearAlert: (state: AlertMessageState) => {
      state.message = null;
    },
  },
});

export const clearAlertSync = () => (dispatch: AppDispatch) => {
  dispatch(clearAlert());
}

export const { setAlert, clearAlert } = alertMessageSlice.actions;

export default alertMessageSlice.reducer;
