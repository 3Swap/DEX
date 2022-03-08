/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllAsset, fetchAssets } from '../redux/assetsSlice';

const AssetsContext = createContext<AllAsset>({} as AllAsset);

export const AssetsProvider = ({ children }: any) => {
  const { assets } = useSelector<any, any>(state => state.assets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAssets());
  }, []);

  return <AssetsContext.Provider value={{ assets }}>{children}</AssetsContext.Provider>;
};

export const useAssetsContext = () => {
  const context = useContext(AssetsContext);
  return context;
};
