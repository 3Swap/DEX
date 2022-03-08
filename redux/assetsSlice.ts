import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type AssetInfo = {
  name: string;
  symbol: string;
  decimals: number;
  image: string;
};

type Assets = {
  [chainId: string]: {
    [contractAddress: string]: AssetInfo;
  };
};

export type AllAsset = {
  assets: Assets;
};

const fetchAssets = createAsyncThunk<Assets, undefined>(
  'fetchAssets/assets_data',
  type =>
    new Promise((resolve, reject) => {
      axios
        .get(`http://${process.env.NEXT_PUBLIC_ASSETS_URL}/assets_data`, {
          headers: { accept: 'application/json' }
        })
        .then(res => {
          if (res.status >= 400) reject(new Error(res?.data?.error || `Server responded with ${res.status}`));
          resolve(res?.data);
        });
    })
);

const assetsSlice = createSlice<AllAsset, {}>({
  name: 'assets',
  initialState: {
    assets: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAssets.fulfilled, (state, action) => {
      state.assets = action.payload;
    });
  }
});

export { fetchAssets };
export const reducer = assetsSlice.reducer;
