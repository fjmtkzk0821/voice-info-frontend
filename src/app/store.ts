import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import messageReducer from '../features/messageSlice';
import audioPlayerReducer from '../features/audioPlayerSlice';
import loadingBackdropReducer from '../features/loadingBackdropSlice';
import authReducer from '../features/user/authSlice';
import coreReducer from '../features/public/coreSlice';

export const store = configureStore({
  reducer: {
    core: coreReducer,
    counter: counterReducer,
    message: messageReducer,
    audioPlayer: audioPlayerReducer,
    loadingBackdrop: loadingBackdropReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
