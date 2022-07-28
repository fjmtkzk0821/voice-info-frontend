import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface coreSliceState {
    isInitialized: boolean;
    promotion: any[] | undefined;
    news: any[] | undefined;
    link: any[] | undefined;
    seiyu: any[] | undefined;
    searchCriteria: any | undefined;
}

const initialState: coreSliceState = {
    isInitialized: false,
    promotion: undefined,
    news: undefined,
    link: undefined,
    seiyu: undefined,
    searchCriteria: undefined,
}

export const coreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    setIndexData: (
      state,
      action: PayloadAction<{ promotion: any[]; news: any[]; link: any[]; seiyu: any[] }>
    ) => {
      state.isInitialized = true;
      state.news = action.payload.news;
      state.promotion = action.payload.promotion;
      state.link = action.payload.link;
      state.seiyu = action.payload.seiyu;
    },
    setSearchCriteria: (state, action: PayloadAction<any>) => {
      state.searchCriteria = action.payload;
    },
    setCachedSeiyuList: (state, action: PayloadAction<any>) => {
      state.seiyu = action.payload;
    }
  },
});

export const {setInitialized, setIndexData, setSearchCriteria, setCachedSeiyuList} = coreSlice.actions;

export const isInitialized = (state: RootState) => state.core.isInitialized;
export const getNews = (state: RootState) => state.core.news;
export const getPromotion = (state: RootState) => state.core.promotion;
export const getRelatedLink = (state: RootState) => state.core.link;
export const getCachedSeiyuList = (state: RootState) => state.core.seiyu;
export const getCachedCriteria = (state: RootState) => state.core.searchCriteria;

export default coreSlice.reducer;