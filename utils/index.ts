import { Interface } from '@ethersproject/abi';

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
