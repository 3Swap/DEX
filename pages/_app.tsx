import type { AppProps } from 'next/app';
import GlobalStyle from '../styles/GlobalStyle.style';
import Layout from './Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
