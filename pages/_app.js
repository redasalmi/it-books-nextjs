import Head from 'next/head';
import { SWRConfig } from 'swr';
import { ThemeProvider } from 'styled-components';
import Navbar from '../components/Navbar';
import Welcome from '../components/Welcome';
import Footer from '../components/Footer';
import fetchBase from '../utils/fetch';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../styles/theme';
import 'fontsource-roboto';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetchBase(resource, init).then((res) => res.json()),
        }}
      >
        <GlobalStyle />

        <ThemeProvider theme={theme}>
          <Navbar />
          <Welcome />

          <main className='container content'>
            <Component {...pageProps} />
          </main>

          <Footer />
        </ThemeProvider>
      </SWRConfig>
    </>
  );
};

export default MyApp;
