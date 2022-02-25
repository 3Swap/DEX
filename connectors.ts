import { ChainId } from '3swap-sdk';
import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({
  supportedChainIds: (() => {
    let chainIds: Array<number> = [];
    for (const key in ChainId) {
      chainIds = [...chainIds, Number(ChainId[key])];
    }
    return chainIds;
  })()
});
