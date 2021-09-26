import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiHomeGet } from "../../utils/services/api";
import { dismissBackdrop, setBackdrop } from "./backdropSlice";

interface HomePageState {
  init: Boolean;
  notices: Array<any>;
  seiyuList: Array<any>;
}

const initialState: HomePageState = {
  init: false,
  notices: [],
  seiyuList: [],
};

export const homePageSlice = createSlice({
  name: "home_page",
  initialState,
  reducers: {
    init: (state: HomePageState, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.init = true;
      state.notices = action.payload.notices;
      state.seiyuList = action.payload.seiyuList;
    },
  },
});

export const fetchDataAsync = () => async (dispatch: any) => {
  try {
    dispatch(setBackdrop());
    let res = await apiHomeGet();
    dispatch(init(res.data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(dismissBackdrop());
  }
};

// export const isInitialized = (state: HomePageState) => state.init;
// export const getPageData = (state: HomePageState) => {
//   return {
//     notices: state.notices,
//     seityList: state.seiyuList,
//   };
// };

export const { init } = homePageSlice.actions;

export default homePageSlice.reducer;
