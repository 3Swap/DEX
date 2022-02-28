import '../styles/globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/css/brands.min.css';
import '@fortawesome/fontawesome-free/css/regular.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core';
import Web3 from 'web3';
import type { AppProps } from 'next/app';

const Web3NetworkRoot = createWeb3ReactRoot('network');

const getLibrary = (provider: any) => {
  return new Web3(provider);
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3NetworkRoot getLibrary={getLibrary}>
        <Component {...pageProps} />
      </Web3NetworkRoot>
    </Web3ReactProvider>
  );
}

export default MyApp;
