import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../store";

interface AudioPlayerState {
    enable: Boolean,
    current: any,
}

const initialState: AudioPlayerState = {
    enable: false,
    current: null
}

export const audioPlayerSlice = createSlice({
    name: "audio_player",
    initialState,
    reducers: {
        set: (state: AudioPlayerState, action: PayloadAction<any>) => {
            state.enable = true;
            state.current = action.payload;
        },
        dispose: (state: AudioPlayerState) => {
            state.enable = false;
            state.current = null;
        }
    }
});

export const setAudio = (audio: any) => (dispatch: AppDispatch) => {
    dispatch(set(audio));
}

export const disposeAudio = () => (dispatch: AppDispatch) => {
    dispatch(dispose());
}

export const {set, dispose} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;