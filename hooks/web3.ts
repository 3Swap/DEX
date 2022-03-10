/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useState } from 'react';
import type Web3 from 'web3';
import JSBI from 'jsbi';
import type { Contract } from 'web3-eth-contract';
import { useWeb3Context } from '../contexts/web3';
import { _decodeFuncResult, _divideByDecimals, _encodeFuncData, _fromWei, _getSigHash } from '../utils';
import abi from './assets/ERC20Abi.json';
import { useAssetsContext } from '../contexts/assets';
import { _request } from '../rpc';
import { hexToNumber, WETH } from '3swap-sdk';

export const useContract = () => {
  const [contract, setContract] = useState<Contract>();
  const { library } = useWeb3Context();

  const createContract = useCallback((address: string) => {
    setContract(new (library as Web3).eth.Contract(<any>abi, address));
  }, []);

  return { contract, createContract };
};

export const useBalance = () => {
  const [balance, setBalance] = useState(0);
  const { account, chainId } = useWeb3Context();
  const { chains } = useAssetsContext();

  const fetchBalance = useCallback(
    (contract: string) => {
      if (!!account && !!chainId && !!chains) {
        const rpcUrl = chains[`0x${chainId?.toString(16)}`].rpcUrl;
        if (contract.toLowerCase() === WETH[chainId].address().toLowerCase()) {
          _request(rpcUrl, {
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_getBalance',
            params: [account, 'latest']
          }).then(balanceResult => {
            setBalance(parseFloat(_fromWei(hexToNumber(balanceResult)).toPrecision(4)));
          });
        } else {
          const decimalsSighash = _getSigHash(abi, 'decimals');
          const balanceOfSignature = _encodeFuncData(abi, 'balanceOf', [account]);
          _request(rpcUrl, {
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_call',
            params: [{ to: contract, data: decimalsSighash }, 'latest']
          }).then(decimalsResult => {
            const decimals =
              typeof decimalsResult === 'string' ? JSBI.toNumber(JSBI.BigInt(decimalsResult)) : decimalsResult;
            _request(rpcUrl, {
              jsonrpc: '2.0',
              id: 1,
              method: 'eth_call',
              params: [{ to: contract, data: balanceOfSignature }, 'latest']
            }).then(balanceResult => {
              const resultDecoded = _decodeFuncResult(abi, 'balanceOf', balanceResult);
              const bal =
                typeof resultDecoded[0] === 'string'
                  ? _divideByDecimals(parseInt(resultDecoded[0]), decimals).toPrecision(4)
                  : _divideByDecimals(resultDecoded[0], decimals).toPrecision(4);
              setBalance(parseFloat(bal));
            });
          });
        }
      } else {
        setBalance(0);
      }
    },
    [account, chainId, chains]
  );
  return { balance, fetchBalance };
};
