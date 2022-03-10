import '../styles/globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/css/brands.min.css';
import '@fortawesome/fontawesome-free/css/regular.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import store from '../redux/store';
import { AssetsProvider } from '../contexts/assets';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Web3GlobalProvider } from '../contexts/web3';

// Import dynamically to prevent trouble with SSR
const Web3NetworkRoot = dynamic(() => import('../components/Web3NetworkRoot'), {
  ssr: false
});

const getLibrary = (provider: any) => {
  return new Web3(provider);
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3NetworkRoot getLibrary={getLibrary}>
          <Web3GlobalProvider>
            <AssetsProvider>
              <Component {...pageProps} />
            </AssetsProvider>
          </Web3GlobalProvider>
        </Web3NetworkRoot>
      </Web3ReactProvider>
    </Provider>
  );
}

export default MyApp;
