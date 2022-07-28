import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface MessageState {
  obj?: {
    type: "success" | "error" | "info" | "warning" | undefined;
    title: string;
    body: string;
  };
}

const initialState: MessageState = {
    obj: undefined,
}

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.obj = action.payload;
        },
        dismissMessage: (state) => {
            state.obj = undefined;
        }
    }
})

export const messageObj = (state: RootState) => state.message.obj;

export const { setMessage, dismissMessage } = messageSlice.actions;

export default messageSlice.reducer;