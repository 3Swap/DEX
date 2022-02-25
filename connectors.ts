import { ChainId } from '3swap-sdk';
import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({
  supportedChainIds: [
    ChainId.AVALANCHE_TESTNET,
    ChainId.BINANCE_TESTNET,
    ChainId.FANTOM_TESTNET,
    ChainId.MATIC_TESTNET,
    ChainId.ROPSTEN
  ]
});
