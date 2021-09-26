import { configureStore } from "@reduxjs/toolkit";
import audioPlayerReducer from "./slices/audioPlayerSlice";
import homePageReducer from "./slices/homePageSlice";
import alertMessageReducer from './slices/alertMessageSlice'
import userReducer from './slices/userSlice'
import dataStorageReducer from './slices/dataStorageSlice';
import backdropReducer from './slices/backdropSlice';

export const store = configureStore({
  reducer: {
    backdrop: backdropReducer,
    alertMessage: alertMessageReducer,
    audioPlayer: audioPlayerReducer,
    homePage: homePageReducer,
    user: userReducer,
    data: dataStorageReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
