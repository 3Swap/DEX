import { ChainId } from '3swap-sdk';
import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({ supportedChainIds: Object.keys(ChainId).map(chain => Number(chain)) });
