import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from "../store";

interface BackdropState {
    status: boolean;
}

const initialState: BackdropState = {
    status: false
}

export const backdropSlice = createSlice({
    name: "backdrop",
    initialState,
    reducers: {
        setBackdropStatus: (state: BackdropState, action: PayloadAction<any>) => {
            state.status = action.payload;
        }
    }
});


export const setBackdrop = () => (dispatch: AppDispatch) => {
    dispatch(setBackdropStatus(true));
  }

export const dismissBackdrop = () => (dispatch: AppDispatch) => {
    dispatch(setBackdropStatus(false));
  }

export const {setBackdropStatus} = backdropSlice.actions;

export default backdropSlice.reducer;