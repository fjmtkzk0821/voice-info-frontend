import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { apiSeiyuList } from "../../utils/services/api";

interface DataStorageState {
  seiyuData: {
    init: Boolean;
    list: Array<any>;
    config: {
      currentPage: number;
      totalPage: number;
      pageSize: number;
    };
  };
}

const initialState: DataStorageState = {
  seiyuData: {
    init: false,
    list: [],
    config: {
      currentPage: 1,
      totalPage: 1,
      pageSize: 15,
    },
  },
};

export const dataStorageSlice = createSlice({
  name: "data_storage",
  initialState,
  reducers: {
    setSeiyuData: (state: DataStorageState, action: PayloadAction<any>) => {
      state.seiyuData = {
        init: true,
        list: action.payload,
        config: {
          currentPage: 1,
          totalPage: Math.ceil(action.payload.size / 15),
          pageSize: 15,
        },
      };
    },
  },
});

export const fetchSeiyuDataAsync = (page: number) => async (dispatch: any) => {
  try {
    let res = await apiSeiyuList();
    dispatch(setSeiyuData(res.data));
  } catch (e) {
    console.log(e);
  }
};

export const { setSeiyuData } = dataStorageSlice.actions;

export default dataStorageSlice.reducer;
