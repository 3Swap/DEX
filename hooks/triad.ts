/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { useAssetsContext } from '../contexts/assets';
import { useWeb3Context } from '../contexts/web3';
import { _request } from '../rpc';
import { _computeCreate2Address, _decodeFuncResult, _getSigHash } from '../utils';
import abi from './assets/TriadAbi.json';

export const useTriad = () => {
  const [isExistentTriad, setIsExistentTriad] = useState(false);
  const { chainId, localChainId } = useWeb3Context();
  const { chains } = useAssetsContext();

  const checkTriadExistence = useCallback(
    async (address1: string, address2: string, address3: string) => {
      if ((!!chainId || !!localChainId) && Object.keys(chains).length > 0) {
        const triad = _computeCreate2Address(
          (chainId as number) || (localChainId as number),
          address1,
          address2,
          address3
        );
        const funcHash = _getSigHash(abi, 'getReserves');
        const callValue = await _request(
          chains[`0x${((chainId as number) || (localChainId as number)).toString(16)}`].rpcUrl,
          {
            method: 'eth_call',
            id: 1,
            jsonrpc: '2.0',
            params: [{ to: triad, data: funcHash }, 'latest']
          }
        );
        setIsExistentTriad(callValue !== '0x' && callValue !== '0x0');
      }
    },
    [chainId, localChainId, chains]
  );
  return { isExistentTriad, checkTriadExistence };
};

export const useReserves = () => {
  const [reserves, setReserves] = useState<string[]>([]);
  const { chainId, localChainId } = useWeb3Context();
  const { chains } = useAssetsContext();

  const loadReserves = useCallback(
    async (address1: string, address2: string, address3: string) => {
      if ((!!chainId || !!localChainId) && !!chains && Object.keys(chains).length > 0) {
        const triad = _computeCreate2Address(
          (chainId as number) || (localChainId as number),
          address1,
          address2,
          address3
        );
        const funcHash = _getSigHash(abi, 'getReserves');
        const result = await _request(
          chains[`0x${((chainId as number) || (localChainId as number)).toString(16)}`].rpcUrl,
          {
            method: 'eth_call',
            id: 1,
            jsonrpc: '2.0',
            params: [{ to: triad, data: funcHash }, 'latest']
          }
        );
        const [reserve1, reserve2, reserve3] = _decodeFuncResult(abi, 'getReserves', result);
        setReserves([reserve1.toHexString(), reserve2.toHexString(), reserve3.toHexString()]);
      }
    },
    [chainId, localChainId]
  );
  return { reserves, loadReserves };
};
