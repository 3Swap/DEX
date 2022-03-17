import {
  BYTECODE_HASH,
  Factories,
  FEES_DENOMINATOR,
  FEES_NUMERATOR,
  Token,
  TokenAmount,
  Trade,
  TradeType,
  _100
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
  const tokenAmount1 = new TokenAmount(
    new BigNumber(amount1).multipliedBy(new BigNumber(10).pow(token1.decimals())),
    token1
  );
  const tokenAmount2 = new TokenAmount(
    new BigNumber(amount2).multipliedBy(new BigNumber(10).pow(token2.decimals())),
    token2
  );
  const tokenAmount3 = new TokenAmount(
    new BigNumber(amount3).multipliedBy(new BigNumber(10).pow(token3.decimals())),
    token3
  );
  const trade = new Trade(tokenAmount1, tokenAmount2, tokenAmount3, TradeType.EXACT_INPUT);
  return parseFloat(trade.minAmountOut(slippage).divideByDecimal().toPrecision(7));
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
  const amountA = new BigNumber(amount1).multipliedBy(new BigNumber(10).pow(token1.decimals()));
  const amountB = new BigNumber(amount2).multipliedBy(new BigNumber(10).pow(token2.decimals()));
  const amountWithFee = amountA.plus(amountB).multipliedBy(FEES_NUMERATOR);
  const numerator = amountWithFee.multipliedBy(reserve3);
  const denominator = reserve1.plus(reserve2).multipliedBy(FEES_DENOMINATOR).plus(amountWithFee);
  return parseFloat(
    numerator
      .dividedBy(denominator)
      .dividedBy(10 ** token3.decimals())
      .toNumber()
      .toPrecision(4)
  );
};

export const _calculatePriceImpact = (
  reserves: Array<string>,
  token1: Token,
  token2: Token,
  amount1: number,
  amount2: number
) => {
  const reserve1 = new BigNumber(reserves[0]);
  const reserve2 = new BigNumber(reserves[1]);
  const reserve3 = new BigNumber(reserves[2]);

  const _constantProduct = reserve1.plus(reserve2).multipliedBy(reserve3);
  const _marketPrice = reserve1.plus(reserve2).dividedBy(reserve3);

  const addition1 = new BigNumber(amount1).multipliedBy(new BigNumber(10).pow(token1.decimals()));
  const addition2 = new BigNumber(amount2).multipliedBy(new BigNumber(10).pow(token2.decimals()));
  const _newSummedReserveAmount = reserve1.plus(reserve2).plus(addition1.plus(addition2));
  const _inReserve3 = _constantProduct.dividedBy(_newSummedReserveAmount);
  const _received = reserve3.minus(_inReserve3);
  const _pricePerToken3 = addition1.plus(addition2).dividedBy(_received);
  return parseFloat(
    _pricePerToken3.minus(_marketPrice).dividedBy(_pricePerToken3).multipliedBy(_100).toNumber().toPrecision(4)
  );
};
