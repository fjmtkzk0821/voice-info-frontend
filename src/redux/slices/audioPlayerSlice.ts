import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface AudioPlayerState {
    visible: Boolean,
    current: any,
}

const initialState: AudioPlayerState = {
    visible: false,
    current: null
}

export const audioPlayerSlice = createSlice({
    name: "audio_player",
    initialState,
    reducers: {
        set: (state: AudioPlayerState, action: PayloadAction<any>) => {
            state.visible = true;
            state.current = action.payload;
        },
        dispose: (state: AudioPlayerState) => {
            state.visible = false;
            state.current = null;
        }
    }
});

export const {set, dispose} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;