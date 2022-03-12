import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type ChainInfo = {
  name: string;
  symbol: string;
  explorer: string;
  native_currency: string;
  decimals: number;
  rpcUrl: string;
};

type AssetInfo = {
  name: string;
  symbol: string;
  decimals: number;
  image: string;
};

type Chains = {
  [chainId: string]: ChainInfo;
};

type Assets = {
  [chainId: string]: {
    [contractAddress: string]: AssetInfo;
  };
};

type Reducers = {
  importToken: (
    state: AllAsset,
    action: PayloadAction<AssetInfo & { chainId: string; contractAddress: string }>
  ) => void;
};

export type AllAsset = {
  assets: Assets;
  chains: Chains;
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

const fetchChains = createAsyncThunk<Chains, undefined>(
  'fetchAssets/chains_data',
  type =>
    new Promise((resolve, reject) => {
      axios
        .get(`http://${process.env.NEXT_PUBLIC_ASSETS_URL}/chains_data`, {
          headers: { accept: 'application/json' }
        })
        .then(res => {
          if (res.status >= 400) reject(new Error(res?.data?.error || `Server responded with ${res.status}`));
          resolve(res?.data);
        });
    })
);

const assetsSlice = createSlice<AllAsset, Reducers>({
  name: 'assets',
  initialState: {
    assets: {},
    chains: {}
  },
  reducers: {
    importToken: (state, action) => {
      state.assets = {
        ...state.assets,
        [action.payload.chainId]: {
          ...state.assets[action.payload.chainId],
          [action.payload.contractAddress]: {
            ...state.assets[action.payload.chainId][action.payload.contractAddress],
            name: action.payload.name,
            decimals: action.payload.decimals,
            symbol: action.payload.symbol,
            image: action.payload.image
          }
        }
      };
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.assets = action.payload;
      })
      .addCase(fetchChains.fulfilled, (state, action) => {
        state.chains = action.payload;
      });
  }
});

export { fetchAssets, fetchChains };
export const { importToken } = assetsSlice.actions;
export const reducer = assetsSlice.reducer;
