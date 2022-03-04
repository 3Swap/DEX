// A work-around for avoiding errors with SSR. Source: https://github.com/NoahZinsmeister/web3-react/issues/176
import { createWeb3ReactRoot } from '@web3-react/core';

const Web3NetworkRoot = createWeb3ReactRoot('network');

export default function Web3DefaultSSR({ children, getLibrary }: any) {
  return <Web3NetworkRoot getLibrary={getLibrary}>{children}</Web3NetworkRoot>;
}
