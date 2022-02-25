/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { injected, network } from '../connectors';
import { ChainId, hexToNumber } from '3swap-sdk';
import { isHex } from '../utils';

export const useChainId = (chainid: ChainId = ChainId.BINANCE_TESTNET): number => {
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
  }, []);
  return chainId;
};

export const useWeb3WithInjectedConnectorEagerly = (): boolean => {
  const { activate, active } = useWeb3React();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then(authorized => {
      if (authorized) {
        activate(injected, undefined, true).then(() => {
          setConnected(true);
        });
      } else {
        setConnected(false);
      }
    });
  }, []);

  useEffect(() => {
    if (!connected && active) setConnected(true);
  }, [connected, active]);

  return connected;
};

export const useWeb3WithNetworkConnector = (
  context: string = 'network',
  chainId: number = Number(ChainId.BINANCE_TESTNET)
) => {
  const { activate, active } = useWeb3React(context);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    network.changeChainId(chainId);
    activate(network, undefined, true).then(() => {
      setIsActive(true);
    });
  }, [chainId]);

  useEffect(() => {
    if (!isActive && active) setIsActive(true);
  }, [isActive, active]);

  return isActive;
};

export const useWeb3WithInjectedConnectorOnRequest = () => {
  const { library, activate } = useWeb3React<Web3>();
  const [isActive, setIsActive] = useState(false);

  function connect() {
    activate(injected, undefined, true).then(() => {
      setIsActive(true);
    });
  }

  return [{ ctx: library, activated: isActive }, connect] as [{ ctx: Web3; activated: boolean }, () => void];
};
