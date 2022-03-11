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
import { Web3GlobalProvider } from '../contexts/web3';
import { ToastProvider } from '../contexts/toast';

const getLibrary = (provider: any) => {
  return new Web3(provider);
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3GlobalProvider>
          <AssetsProvider>
            <ToastProvider>
              <Component {...pageProps} />
            </ToastProvider>
          </AssetsProvider>
        </Web3GlobalProvider>
      </Web3ReactProvider>
    </Provider>
  );
}

export default MyApp;
