import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface AudioPlayerState {
  display: boolean;
  audio?: {
    category: string;
    restriction: string;
    src: string;
  };
}

const initialState: AudioPlayerState = {
    display: false,
    audio: undefined
}

export const audioPlayerSlice = createSlice({
  name: "alertMsg",
  initialState,
  reducers: {
    play: (
      state,
      action: PayloadAction<{
        category: string;
        restriction: string;
        src: string;
      }>
    ) => {
        state.audio = action.payload;
        state.display = true;
    },
    closePlayer: (state) => {
      state.display = false;
      state.audio = undefined;
    },
  },
});

export const { play, closePlayer } = audioPlayerSlice.actions

export const playerState = (state: RootState) => state.audioPlayer.display;
export const currentAudio = (state: RootState) => state.audioPlayer.audio;

export default audioPlayerSlice.reducer