/* eslint-disable react-hooks/exhaustive-deps */
import type Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import React, { useState, useCallback, useEffect, createContext, useContext } from 'react';
import { injected } from '../connectors';

type Web3GlobalContextType = {
  account?: string | null;
  chainId?: number;
  isActive: boolean;
  switchChain: (chainId: string) => void;
  connectWallet: () => void;
  disconnectWallet: () => void;
  localChainId?: number;
  library?: Web3;
};

const Web3Context = createContext<Web3GlobalContextType>({} as Web3GlobalContextType);

export const Web3GlobalProvider = ({ children }: any) => {
  const [isActive, setIsActive] = useState(false);
  const { activate, account, deactivate, chainId, library } = useWeb3React<Web3>();
  const [localChainId, setLocalChainId] = useState(0x61);

  useEffect(() => {
    injected.isAuthorized().then(authorized => {
      if (authorized) {
        activate(injected, undefined, true).then(() => {
          setIsActive(true);
        });
      }
    });
  }, []);

  const connectWallet = useCallback(() => {
    activate(injected, undefined, true).then(() => {
      setIsActive(true);
    });
  }, []);

  const disconnectWallet = useCallback(() => {
    deactivate();
    setIsActive(false);
  }, []);

  const switchChain = useCallback((chainId: string) => {
    const { ethereum } = window as unknown as Window & { ethereum: any };

    if (ethereum) {
      ethereum
        .request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }]
        })
        .then(() => {
          setLocalChainId(parseInt(chainId));
        })
        .catch((error: any) => {
          // This code means the chain hasn't been added yet
          if (error.code === 4902) {
            // Fetch chain info from server
            ethereum.request({ method: 'wallet_addEthereumChain', params: [] }).then(console.log);
          }
        });
    }
  }, []);

  return (
    <Web3Context.Provider
      value={{
        isActive,
        chainId,
        switchChain,
        account,
        connectWallet,
        disconnectWallet,
        localChainId,
        library
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => {
  const context = useContext(Web3Context);
  return context;
};
