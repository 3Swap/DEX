/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from '@web3-react/core';
import React, { useState, useCallback, useEffect, createContext, useContext } from 'react';
import { injected } from '../connectors';

type Web3GlobalContextType = {
  account?: string | null;
  chainId: string | number;
  isActive: boolean;
  switchChain: (chainId: string) => void;
  connectWallet: () => void;
  disconnectWallet: () => void;
};

const Web3Context = createContext<Web3GlobalContextType>({} as Web3GlobalContextType);

export const Web3GlobalProvider = ({ children }: any) => {
  const [chainId, setChainId] = useState(0x61);
  const [isActive, setIsActive] = useState(false);
  const { activate, account, deactivate } = useWeb3React();

  const { ethereum } = window as unknown as Window & { ethereum: any };

  useEffect(() => {
    injected.isAuthorized().then(authorized => {
      if (authorized) {
        activate(injected, undefined, true).then(() => {
          setIsActive(true);
        });
      }
    });
  }, []);

  useEffect(() => {
    injected.on('Web3ReactUpdated', update => {
      if (update.chainId) setChainId(parseInt(update.chainId));
    });
  }, []);

  const connectWallet = useCallback(() => {
    activate(injected, undefined, true).then(() => {
      setIsActive(true);
    });
  }, []);

  const disconnectWallet = useCallback(() => {
    deactivate();
  }, []);

  const switchChain = useCallback(
    (chainId: string) => {
      if (ethereum) {
        ethereum
          .request({ method: 'wallet_switchEthereumChain', params: [{ chainId }] })
          .then(console.log)
          .catch((error: any) => {
            // This code means the chain hasn't been added yet
            if (error.code === 4902) {
              // Fetch chain info from server
              ethereum.request({ method: 'wallet_addEthereumChain', params: [] }).then(console.log);
            }
          });
      }
    },
    [ethereum]
  );

  return (
    <Web3Context.Provider value={{ isActive, chainId, switchChain, account, connectWallet, disconnectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => {
  const context = useContext(Web3Context);
  return context;
};
