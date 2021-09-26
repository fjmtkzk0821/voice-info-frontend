import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { getErrorMessage } from "../../objects/BaseMessage";
import { UnknownError } from "../../utils/presetMessage";
import { apiSeiyuGet, apiSeiyuListGet } from "../../utils/services/api";
import { AppDispatch } from "../store";
import { setAlert } from "./alertMessageSlice";
import { setBackdrop, dismissBackdrop } from "./backdropSlice";

interface DataStorageState {
  seiyuData: {
    init: Boolean;
    list: Array<any>;
    current: any;
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
    current: null,
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
      state.seiyuData.init = true;
      state.seiyuData.list = action.payload;
      state.seiyuData.config = {
        currentPage: 1,
        totalPage: Math.ceil(action.payload.size / 15),
        pageSize: 15,
      };
      // state.seiyuData = {
      //   init: true,
      //   list: action.payload,
      //   config: {
      //     currentPage: 1,
      //     totalPage: Math.ceil(action.payload.size / 15),
      //     pageSize: 15,
      //   },
      // };
    },
    setCurrentData: (state: DataStorageState, action: PayloadAction<any>) => {
      state.seiyuData.current = action.payload;
    },
  },
});

export const fetchSeiyuListDataAsync = () => async (dispatch: any) => {
  try {
    dispatch(setBackdrop());
    let res = await apiSeiyuListGet();
    dispatch(setSeiyuData(res.data));
  } catch (e: any) {
    if (e.response) {
      console.log(e);
      let message = getErrorMessage(e.response.data);
      dispatch(setAlert(message));
    } else {
      dispatch(setAlert(UnknownError));
    }
  }finally {
    dispatch(dismissBackdrop());
  }
};

export const fetchSeiyuProfileAsync =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setBackdrop());
      let res = await apiSeiyuGet(id);
      dispatch(setCurrentData(res.data));
    } catch (e: any) {
      if (e.response) {
        console.log(e);
        let message = getErrorMessage(e.response.data);
        dispatch(setAlert(message));
      } else {
        dispatch(setAlert(UnknownError));
      }
    } finally {
      dispatch(dismissBackdrop());
    }
  };

export const { setSeiyuData, setCurrentData } = dataStorageSlice.actions;

export default dataStorageSlice.reducer;
