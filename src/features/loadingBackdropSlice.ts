import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface LoadingBackdropState {
    display: boolean;
}

const initialState: LoadingBackdropState = {
    display: false
}

export const loadingBackdropSlice = createSlice({
    name: "alertMsg",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.display = true
        },
        dismissLoading: (state) => {
            state.display = false
        }
    }
})

export const { setLoading, dismissLoading } = loadingBackdropSlice.actions

export const loadingState = (state: RootState) => state.loadingBackdrop.display;

export default loadingBackdropSlice.reducer