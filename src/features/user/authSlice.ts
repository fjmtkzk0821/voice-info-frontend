import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { SeiyuDetailDocument, SeiyuDocument, SeiyuSampleDocument } from "../../utils/objects/seiyu";
import UserDocument from "../../utils/objects/user";
import { cleanAuthHeader } from "../../services/api";

export interface authSliceState {
  data?: any;
  seiyuBasic?: any;
  seiyuDetail?: any;
  seiyuSamples?: Array<any>;
}

const initialState: authSliceState = {
  data: undefined,
  seiyuBasic: undefined,
  seiyuDetail: undefined,
  seiyuSamples: undefined,
};

// export const registerAsync = createAsyncThunk(
//     "auth/register",
//     async (formData: {email: string, password: string}, thunkAPI) => {
//       thunkAPI.dispatch(setLoading());
//       try {
//         const response = await authService.userSignUp(formData);
//         const { code, message, data } = response;
//         thunkAPI.dispatch(setMessage(new BaseMessage(code, message).toObject()));
//         //return response.data;
//       } catch (err) {
//         if (axios.isAxiosError(err)) {
//           const { code, message } = err.response?.data;
//           thunkAPI.dispatch(
//             setMessage(
//               new BaseMessage(code, message, BaseMessageType.ERROR).toObject()
//             )
//           );
//         }
//       }
//         thunkAPI.dispatch(dismissLoading());
//     }
//   );
  
  // export const signInAsync = createAsyncThunk(
  //   "auth/login",
  //   async (formData: { email: string; password: string }, thunkAPI) => {
  //     thunkAPI.dispatch(setLoading());
  //     let userDoc = undefined;
  //     try {
  //       const { code, message, data } = await authService.userLogin(formData);
  //       thunkAPI.dispatch(setMessage(new BaseMessage(code, message).toObject()));
  //       userDoc = UserDocument.fromObject(data);
  //       const navigate = useNavigate();
  //       navigate("..", {replace: true});
  //     } catch (err) {
  //       if (axios.isAxiosError(err)) {
  //         const { code, message } = err.response?.data;
  //         thunkAPI.dispatch(
  //           setMessage(
  //             new BaseMessage(code, message, BaseMessageType.ERROR).toObject()
  //           )
  //         );
  //       }
  //     } finally {
  //       thunkAPI.dispatch(dismissLoading());
  //       return userDoc;
  //     }
  //   }
  // );

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUserData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    // loadSeiyuBasic: (state, action: PayloadAction<any>) => {
    //   state.seiyuBasic = action.payload;
    // },
    // loadSeiyuDetail: (state, action: PayloadAction<any>) => {
    //   state.seiyuDetail = action.payload;
    // },
    // loadSeiyuSamples: (
    //   state,
    //   action: PayloadAction<Array<SeiyuSampleDocument>>
    // ) => {
    //   state.seiyuSamples = action.payload.map((val) => val.toObject());
    // },
    logout: (state) => {
      cleanAuthHeader();
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(signInAsync.fulfilled, (state, action) => {
    //   state.data = action.payload;
    // });
  },
});

export const {loadUserData} = authSlice.actions;

export const isAuthenticated = (state: RootState) =>
  state.auth.data !== undefined && localStorage.getItem("accessToken") != null;
export const userDataState = (state: RootState) => state.auth.data as UserDocument;
// export const seiyuBasicState = (state: RootState) => state.auth.seiyuBasic as SeiyuDocument;
// export const seiyuDetailState = (state: RootState) => state.auth.seiyuDetail as SeiyuDetailDocument;
// export const seiyuSamplesState = (state: RootState) => state.auth.seiyuSamples?.map((val) => val as SeiyuSampleDocument);

export default authSlice.reducer;