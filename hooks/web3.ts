/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useState } from 'react';
import type Web3 from 'web3';
import JSBI from 'jsbi';
import type { Contract } from 'web3-eth-contract';
import { useWeb3Context } from '../contexts/web3';
import { _decodeFuncResult, _divideByDecimals, _encodeFuncData, _fromWei, _getSigHash } from '../utils';
import ERC20Abi from './assets/ERC20Abi.json';
import RouterAbi from './assets/RouterAbi.json';
import { useAssetsContext } from '../contexts/assets';
import { _request } from '../rpc';
import { hexToNumber, WETH } from '3swap-sdk';
import { chainIdToRouterMap } from '../global/maps';

const useContract = () => {
  const [contract, setContract] = useState<any>();
  const { library } = useWeb3Context();

  const createContract = useCallback(
    (abi: any, address: string) => {
      if (!!library) {
        setContract(new (library as Web3).eth.Contract(abi, address));
      }
    },
    [library]
  );

  return { contract, createContract };
};

export const useBalance = () => {
  const [balance, setBalance] = useState(0);
  const { account, chainId } = useWeb3Context();
  const { chains } = useAssetsContext();

  const fetchBalance = useCallback(
    (contract: string) => {
      if (!!account && !!chainId && !!chains && Object.keys(chains).length > 0) {
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
          const decimalsSighash = _getSigHash(ERC20Abi, 'decimals');
          const balanceOfSignature = _encodeFuncData(ERC20Abi, 'balanceOf', [account]);
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
              const resultDecoded = _decodeFuncResult(ERC20Abi, 'balanceOf', balanceResult);
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

export const useSwapRouterContract = () => {
  const { contract, createContract } = useContract();
  const { chainId } = useWeb3Context();

  const createSwapRouterContract = useCallback(() => {
    if (!!chainId) {
      createContract(RouterAbi, chainIdToRouterMap[chainId]);
    }
  }, [chainId]);
  return { contract, createSwapRouterContract };
};

export const useTokenContract = () => {
  const { contract, createContract } = useContract();
  const [deps] = useState(true);

  const createTokenContract = useCallback(
    (address: string) => {
      createContract(ERC20Abi, address);
    },
    [deps]
  );
  return { contract, createTokenContract };
};

export const useAllowance = () => {
  const [allowance, setAllowance] = useState(0);
  const { account } = useWeb3Context();

  const loadAllowance = useCallback(
    (contract: Contract, chainId: number) => {
      if (!!account) {
        contract.methods
          .decimals()
          .call()
          .then((dec: number) => {
            contract.methods
              .allowance(account, chainIdToRouterMap[chainId])
              .call()
              .then((al: number) => {
                setAllowance(_divideByDecimals(al, dec));
              });
          });
      }
    },
    [account]
  );

  return { allowance, loadAllowance };
};
