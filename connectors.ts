import { ChainId, URLS } from '3swap-sdk';
import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';

export const injected = new InjectedConnector({
  supportedChainIds: (() => {
    let chainIds: Array<number> = [];

    for (const key in ChainId) chainIds = [...chainIds, Number(ChainId[key])];

    return chainIds;
  })()
});

export const network = new NetworkConnector({
  urls: (() => {
    let links: { [chainId: number]: string } = {};

    for (const key in ChainId) links = { ...links, [Number(ChainId[key])]: URLS[Number(ChainId[key])] };

    return links;
  })(),
  defaultChainId: Number(ChainId.BINANCE_TESTNET)
});
