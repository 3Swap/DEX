/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useCallback, useState } from 'react';
import type { Contract } from 'web3-eth-contract';
import { numberToHex, Token, Triad, WETH } from '3swap-sdk';
import { chainIdToRouterMap } from '../global/maps';
import { useToastContext } from './toast';
import { useWeb3Context } from './web3';
import { _raiseByDecimals, _toWei } from '../utils';
import Button from '../components/Button';

type ApprovalType = {
  [chainId: number]: {
    [contract: string]: number;
  };
};

type SwapContextType = {
  approval: ApprovalType;
  initiateContractApproval: (contract: Contract, amount: number, address: string) => void;
  initiateAddLiquidity: (
    contract: Contract,
    token1: Token,
    token2: Token,
    token3: Token,
    amount1: number,
    amount2: number,
    amount3: number
  ) => void;
  initiateSwap?: (contract: Contract) => void;
};

const SwapContext = createContext<SwapContextType>({} as SwapContextType);

export const SwapProvider = ({ children }: any) => {
  const [approval, setApproval] = useState<ApprovalType>({});
  const { showSuccessToast, showErrorToast } = useToastContext();
  const { isActive, chainId, account } = useWeb3Context();

  const initiateContractApproval = useCallback((contract: Contract, amount: number, address: string) => {
    try {
      if (isActive) {
        contract.methods
          .decimals()
          .call()
          .then((d: number) => {
            contract.methods
              .approve(chainIdToRouterMap[chainId as number], amount * 10 ** d)
              .send({ from: account })
              .then(() => {
                contract.methods
                  .symbol()
                  .call()
                  .then((n: string) => {
                    setApproval(app => ({
                      ...app,
                      [chainId as number]: { ...app[chainId as number], [address]: amount }
                    }));
                    showSuccessToast(
                      <>
                        <span>
                          Router approved to spend {amount} {n} on behalf of {account}{' '}
                        </span>
                      </>,
                      4
                    );
                  });
              })
              .catch((error: any) =>
                showErrorToast(
                  <>
                    <span>
                      {error.message}
                      {''}!
                    </span>
                  </>,
                  4
                )
              );
          });
      } else {
        throw new Error('Please connect wallet first');
      }
    } catch (error: any) {
      showErrorToast(
        <>
          <span>
            {error.message}
            {''}!
          </span>
        </>,
        4
      );
    }
  }, []);

  const initiateAddLiquidity = useCallback(
    (
      contract: Contract,
      token1: Token,
      token2: Token,
      token3: Token,
      amount1: number,
      amount2: number,
      amount3: number
    ) => {
      try {
        if (isActive) {
          const liquidityTokenAddress = Triad.getAddress(token1, token2, token3, chainId as number);

          if (token3.address().toLowerCase() === WETH[chainId as number].address().toLowerCase()) {
            contract.methods
              .addLiquidityETH(
                { tokenA: token1.address(), tokenB: token2.address(), tokenC: token3.address() },
                {
                  amountA: numberToHex(_raiseByDecimals(amount1, token1.decimals())),
                  amountB: numberToHex(_raiseByDecimals(amount2, token2.decimals())),
                  amountC: 0
                },
                {
                  amountA: numberToHex(_raiseByDecimals(amount1, token1.decimals())),
                  amountB: numberToHex(_raiseByDecimals(amount2, token2.decimals())),
                  amountC: numberToHex(_toWei(amount3))
                },
                account
              )
              .send({
                from: account,
                value: numberToHex(_toWei(amount3))
              })
              .then(() => {
                const { ethereum } = window as unknown as Window & { ethereum: any };
                showSuccessToast(
                  <>
                    <span>Successfully created liquidity!</span>
                    <Button
                      color="#4500a0"
                      fontSize="18px"
                      title="Add liquidity token"
                      click={() => {
                        ethereum
                          .request({
                            method: 'wallet_watchAsset',
                            params: {
                              type: 'ERC20',
                              options: {
                                address: liquidityTokenAddress,
                                symbol: '3Swap V1',
                                decimals: 18,
                                image: '/3SwapLogo.png'
                              }
                            }
                          })
                          .then(console.log);
                      }}
                    />
                  </>,
                  10
                );
              });
          } else {
            contract.methods
              .addLiquidity(
                { tokenA: token1.address(), tokenB: token2.address(), tokenC: token3.address() },
                {
                  amountA: numberToHex(_raiseByDecimals(amount1, token1.decimals())),
                  amountB: numberToHex(_raiseByDecimals(amount2, token2.decimals())),
                  amountC: numberToHex(_raiseByDecimals(amount3, token3.decimals()))
                },
                {
                  amountA: numberToHex(_raiseByDecimals(amount1, token1.decimals())),
                  amountB: numberToHex(_raiseByDecimals(amount2, token2.decimals())),
                  amountC: numberToHex(_raiseByDecimals(amount3, token3.decimals()))
                },
                account
              )
              .send({
                from: account
              })
              .then(() => {
                const { ethereum } = window as unknown as Window & { ethereum: any };
                showSuccessToast(
                  <>
                    <span>Successfully created liquidity!</span>
                    <Button
                      color="#4500a0"
                      fontSize="18px"
                      title="Add liquidity token"
                      click={() => {
                        ethereum
                          .request({
                            method: 'wallet_watchAsset',
                            params: {
                              type: 'ERC20',
                              options: {
                                address: liquidityTokenAddress,
                                symbol: '3Swap V1',
                                decimals: 18,
                                image: '/3SwapLogo.png'
                              }
                            }
                          })
                          .then(console.log);
                      }}
                    />
                  </>,
                  10
                );
              });
          }
        }
      } catch (error) {}
    },
    []
  );

  return (
    <SwapContext.Provider value={{ initiateAddLiquidity, initiateContractApproval, approval }}>
      {children}
    </SwapContext.Provider>
  );
};

export const useSwapContext = () => {
  const context = useContext(SwapContext);
  return context;
};
