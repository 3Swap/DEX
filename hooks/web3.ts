/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import Web3 from 'web3';
import { injected, network } from '../connectors';
import { ChainId, hexToNumber } from '3swap-sdk';
import { isHex } from '../utils';

export const useChainId = (
  web3Ctx: Web3ReactContextInterface<Web3>,
  chainid: ChainId = ChainId.BINANCE_TESTNET
): number => {
  const [chainId, setChainId] = useState<number>(Number(chainid));
  useEffect(() => {
    const { ethereum } = window as any;

    if (ethereum && ethereum.on)
      ethereum.on('chainChanged', (chain: string | number) => {
        if (typeof chain === 'string')
          if (isHex(chain)) setChainId(hexToNumber(chain));
          else setChainId(parseInt(chain));
        else setChainId(chain);
      });

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

export const useWeb3WithNetworkConnector = (context: string = 'network') => {
  const { activate, active } = useWeb3React(context);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    activate(network, undefined, true).then(() => {
      setIsActive(true);
    });
  }, []);

  useEffect(() => {
    if (!isActive && active) setIsActive(true);
  }, [isActive, active]);

  return isActive;
};
