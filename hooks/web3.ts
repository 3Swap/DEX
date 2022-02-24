/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import Web3 from 'web3';
import { injected } from '../connectors';

export const useChainId = (web3Ctx: Web3ReactContextInterface<Web3>): number => {
  const [chainId, setChainId] = useState(1);
  useEffect(() => {
    web3Ctx.library?.eth.getChainId().then(chain => setChainId(chain));
  }, []);
  return chainId;
};

export const useWeb3WithInjectedConnector = (): boolean => {
  const { activate, active } = useWeb3React();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then(authorized => {
      if (authorized) {
        activate(injected, undefined, true).then(() => {
          setConnected(true);
        });
      } else {
        setConnected(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!connected && active) setConnected(true);
  }, [connected, active]);

  return connected;
};
