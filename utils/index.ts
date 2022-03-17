import {
  BYTECODE_HASH,
  Factories,
  FEES_DENOMINATOR,
  FEES_NUMERATOR,
  Token,
  TokenAmount,
  Trade,
  TradeType
} from '3swap-sdk';
import { Interface } from '@ethersproject/abi';
import { getCreate2Address } from '@ethersproject/address';
import { keccak256, pack } from '@ethersproject/solidity';
import BigNumber from 'bignumber.js';

export const isHex = (str: string): boolean => {
  return /^[0-9a-fA-F]+$/.test(str);
};

export const _encodeFuncData = (abi: any, func: string, data: Array<any>) => {
  const abiInterface = new Interface(abi);
  return abiInterface.encodeFunctionData(func, data);
};

export const _decodeFuncResult = (abi: any, func: string, data: any) => {
  const abiInterface = new Interface(abi);
  return abiInterface.decodeFunctionResult(func, data);
};

export const _getSigHash = (abi: any, func: string) => {
  const abiInterface = new Interface(abi);
  return abiInterface.getSighash(func);
};

export const _fromWei = (amt: number | bigint) => {
  return Number(amt) / 10 ** 18;
};

export const _divideByDecimals = (amt: number | bigint, decimals: number) => {
  return Number(amt) / 10 ** decimals;
};

export const _toWei = (amt: number | bigint) => {
  return Number(amt) * 10 ** 18;
};

export const _raiseByDecimals = (amt: number | bigint, decimals: number) => {
  return Number(amt) * 10 ** decimals;
};

export const _toGwei = (amt: number) => {
  return amt * 10 ** 9;
};

export const _calculateMinimumReceived = (
  token1: Token,
  token2: Token,
  token3: Token,
  amount1: number,
  amount2: number,
  amount3: number,
  slippage: number
) => {
  console.log('Here');
  const tokenAmount1 = new TokenAmount(new BigNumber(`0x${(amount1 * 10 ** token1.decimals()).toString(16)}`), token1);
  const tokenAmount2 = new TokenAmount(new BigNumber(`0x${(amount2 * 10 ** token2.decimals()).toString(16)}`), token2);
  const tokenAmount3 = new TokenAmount(new BigNumber(`0x${(amount3 * 10 ** token3.decimals()).toString(16)}`), token3);
  const trade = new Trade(tokenAmount1, tokenAmount2, tokenAmount3, TradeType.EXACT_INPUT);
  return trade.minAmountOut(slippage).divideByDecimal();
};

export const _computeCreate2Address = (chainId: number, address1: string, address2: string, address3: string) => {
  let addresses =
    address1.toLowerCase() < address2.toLowerCase() ? [address1, address2, address3] : [address2, address1, address3];
  addresses =
    addresses[1].toLowerCase() < addresses[2].toLowerCase()
      ? [addresses[0], addresses[1], addresses[2]]
      : [addresses[0], addresses[2], addresses[1]];
  return getCreate2Address(
    Factories[chainId],
    keccak256(['bytes'], [pack(['address', 'address', 'address'], [addresses[0], addresses[1], addresses[2]])]),
    BYTECODE_HASH
  );
};

export const _getAmountOutFromReserves = (
  reserves: Array<string>,
  amount1: number,
  amount2: number,
  token1: Token,
  token2: Token,
  token3: Token
) => {
  const reserve1 = new BigNumber(reserves[0]);
  const reserve2 = new BigNumber(reserves[1]);
  const reserve3 = new BigNumber(reserves[2]);
  const amountA = new BigNumber(`0x${(amount1 * 10 ** token1.decimals()).toString(16)}`);
  const amountB = new BigNumber(`0x${(amount2 * 10 ** token2.decimals()).toString(16)}`);
  const amountWithFee = amountA.plus(amountB).multipliedBy(FEES_NUMERATOR);
  const numerator = amountWithFee.multipliedBy(reserve3);
  const denominator = reserve1.plus(reserve2).multipliedBy(FEES_DENOMINATOR).plus(amountWithFee);
  return numerator
    .dividedBy(denominator)
    .dividedBy(10 ** token3.decimals())
    .toNumber();
};
