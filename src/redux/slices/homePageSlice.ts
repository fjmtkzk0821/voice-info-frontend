import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiGetHome } from "../../utils/services/api";

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
    let res = await apiGetHome();
    dispatch(init(res.data));
  } catch (e) {
    console.log(e);
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
