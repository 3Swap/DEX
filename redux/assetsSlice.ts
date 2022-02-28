import { createSlice } from '@reduxjs/toolkit';

type AssetData = {
  name: string;
  image: string;
  socialProfiles: Array<string>;
  contractAddress: string;
};

type AssetReducers = {
  loadAssets: (state: Array<AssetData>) => void;
};

const assetsSlice = createSlice<Array<AssetData>, AssetReducers>({
  name: 'assets',
  initialState: [
    {
      name: '',
      image: '',
      socialProfiles: [],
      contractAddress: ''
    }
  ],
  reducers: {
    loadAssets: (state: AssetData[]) => {
      // Load asset data from server
    }
  }
});

export const { loadAssets } = assetsSlice.actions;
export const reducer = assetsSlice.reducer;
