/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState } from 'react';
import type { Contract } from 'web3-eth-contract';
import { numberToHex, Router, Token, TokenAmount, Trade, TradeType, Triad, WETH } from '3swap-sdk';
import { chainIdToRouterMap } from '../global/maps';
import { useToastContext } from './toast';
import { useWeb3Context } from './web3';
import { _raiseByDecimals, _toGwei, _toWei } from '../utils';
import Button from '../components/Button';
import BigNumber from 'bignumber.js';
import { useAssetsContext } from './assets';

type SwapContextType = {
  initiateContractApproval: (contract: Contract, amount: number, address: string) => Promise<void>;
  initiateAddLiquidity: (
    contract: Contract,
    token1: Token,
    token2: Token,
    token3: Token,
    amount1: number,
    amount2: number,
    amount3: number,
    deadlineInMins: number,
    gasPrice: number,
    gasLimit?: number
  ) => Promise<void>;
  initiateSwap: (
    contract: Contract,
    token1: Token,
    token2: Token,
    token3: Token,
    amount1: number,
    amount2: number,
    amount3: number,
    deadlineInMins: number,
    slippage: number,
    gasPrice: number,
    gasLimit?: number
  ) => Promise<void>;
};

const SwapContext = createContext<SwapContextType>({} as SwapContextType);

export const SwapProvider = ({ children }: any) => {
  const { showSuccessToast, showErrorToast } = useToastContext();
  const { isActive, chainId, account } = useWeb3Context();
  const { chains } = useAssetsContext();

  const initiateContractApproval = (contract: Contract, amount: number, address: string): Promise<void> =>
    new Promise((resolve, reject) => {
      if (isActive) {
        contract.methods
          .decimals()
          .call()
          .then((d: number) => {
            contract.methods
              .approve(chainIdToRouterMap[chainId as number], numberToHex(amount * 10 ** d))
              .send({ from: account })
              .then(() => {
                contract.methods
                  .symbol()
                  .call()
                  .then((n: string) => {
                    resolve(
                      showSuccessToast(
                        <>
                          <span>
                            Router approved to spend {amount} {n} on behalf of {account}{' '}
                          </span>
                        </>,
                        4
                      )
                    );
                  });
              })
              .catch(reject);
          });
      } else {
        reject(new Error('Please connect wallet first'));
      }
    });

  const initiateAddLiquidity = (
    contract: Contract,
    token1: Token,
    token2: Token,
    token3: Token,
    amount1: number,
    amount2: number,
    amount3: number,
    deadlineInMins: number,
    gasPrice: number,
    gasLimit = 8000000
  ): Promise<void> =>
    new Promise((resolve, reject) => {
      if (isActive && !!account) {
        const liquidityTokenAddress = Triad.getAddress(token1, token2, token3, chainId as number);
        if (token3.address().toLowerCase() === WETH[chainId as number].address().toLowerCase()) {
          contract.methods
            .addLiquidityETH(
              [token1.address(), token2.address(), token3.address()],
              [
                numberToHex(_raiseByDecimals(amount1, token1.decimals())),
                numberToHex(_raiseByDecimals(amount2, token2.decimals())),
                numberToHex(_toWei(amount3))
              ],
              [
                numberToHex(_raiseByDecimals(amount1, token1.decimals())),
                numberToHex(_raiseByDecimals(amount2, token2.decimals())),
                numberToHex(_toWei(amount3))
              ],
              account,
              Math.floor(Date.now() / 1000) + deadlineInMins * 60
            )

            .send({
              from: account,
              value: numberToHex(_toWei(amount3)),
              gasPrice: numberToHex(_toGwei(gasPrice)),
              gas: numberToHex(gasLimit)
            })
            .then(() => {
              const { ethereum } = window as unknown as Window & { ethereum: any };
              resolve(
                showSuccessToast(
                  <>
                    <span>Successfully created liquidity!</span>
                    <Button
                      color="#4500a0"
                      fontSize="14px"
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
                )
              );
            })
            .catch(reject);
        } else {
          contract.methods
            .addLiquidity(
              [token1.address(), token2.address(), token3.address()],
              [
                numberToHex(_raiseByDecimals(amount1, token1.decimals())),
                numberToHex(_raiseByDecimals(amount2, token2.decimals())),
                numberToHex(_raiseByDecimals(amount3, token3.decimals()))
              ],
              [
                numberToHex(_raiseByDecimals(amount1, token1.decimals())),
                numberToHex(_raiseByDecimals(amount2, token2.decimals())),
                numberToHex(_raiseByDecimals(amount3, token3.decimals()))
              ],
              account,
              Math.floor(Date.now() / 1000) + deadlineInMins * 60
            )
            .send({
              from: account,
              gasPrice: numberToHex(_toGwei(gasPrice)),
              gas: numberToHex(gasLimit)
            })
            .then(() => {
              const { ethereum } = window as unknown as Window & { ethereum: any };
              resolve(
                showSuccessToast(
                  <>
                    <span>Successfully created liquidity!</span>
                    <Button
                      color="#4500a0"
                      fontSize="14px"
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
                )
              );
            })
            .catch(reject);
        }
      }
    });

  const initiateSwap = (
    contract: Contract,
    token1: Token,
    token2: Token,
    token3: Token,
    amount1: number,
    amount2: number,
    amount3: number,
    deadlineInMins: number,
    slippage: number,
    gasPrice: number,
    gasLimit = 24000
  ): Promise<void> =>
    new Promise((resolve, reject) => {
      const tokenAmount1: TokenAmount = new TokenAmount(
        new BigNumber(`0x${(amount1 * 10 ** token1.decimals()).toString(16)}`),
        token1
      );
      const tokenAmount2: TokenAmount = new TokenAmount(
        new BigNumber(`0x${(amount2 * 10 ** token2.decimals()).toString(16)}`),
        token2
      );
      const tokenAmount3: TokenAmount = new TokenAmount(
        new BigNumber(`0x${(amount3 * 10 ** token3.decimals()).toString(16)}`),
        token3
      );
      const trade: Trade = new Trade(tokenAmount1, tokenAmount2, tokenAmount3, TradeType.EXACT_INPUT);
      const swapParams = Router.swapCallParameters(trade, chainId as number, {
        recipient: account as string,
        deadline: deadlineInMins * 60,
        slippage
      });

      if (swapParams.args.length === 5) {
        contract.methods[swapParams.methodName](
          swapParams.args[0],
          swapParams.args[1],
          swapParams.args[2],
          swapParams.args[3],
          swapParams.args[4]
        )
          .send({
            from: account,
            value: swapParams.value,
            gasPrice: numberToHex(_toGwei(gasPrice)),
            gasLimit: numberToHex(gasLimit)
          })
          .then((tx: any) => {
            resolve(
              showSuccessToast(
                <>
                  <span>Swap successful{''}!</span>
                  <a href={`${chains[`0x${(chainId as number).toString(16)}`].explorer}/tx/${tx.transactionHash}`}>
                    View on explorer
                  </a>
                </>,
                6
              )
            );
          })
          .catch(reject);
      } else {
        contract.methods[swapParams.methodName](
          swapParams.args[0],
          swapParams.args[1],
          swapParams.args[2],
          swapParams.args[3],
          swapParams.args[4],
          swapParams.args[5]
        )
          .send({
            from: account,
            value: swapParams.value,
            gasPrice: numberToHex(_toGwei(gasPrice)),
            gasLimit: numberToHex(gasLimit)
          })
          .then((tx: any) => {
            resolve(
              showSuccessToast(
                <>
                  <span>Swap successful{''}!</span>
                  <a href={`${chains[`0x${(chainId as number).toString(16)}`].explorer}/tx/${tx.transactionHash}`}>
                    View on explorer
                  </a>
                </>,
                6
              )
            );
          })
          .catch(reject);
      }
    });

  return (
    <SwapContext.Provider value={{ initiateAddLiquidity, initiateContractApproval, initiateSwap }}>
      {children}
    </SwapContext.Provider>
  );
};

export const useSwapContext = () => {
  const context = useContext(SwapContext);
  return context;
};
