import Head from 'next/head';
import { SWRConfig } from 'swr';

import Navbar from '../components/Navbar';
import Welcome from '../components/Welcome';
import Footer from '../components/Footer';

import fetchBooks from '../utils/fetchBooks';
import '../styles/index.scss';

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher: fetchBooks,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        fallback: pageProps?.fallback,
      }}
    >
      <Navbar />
      <Welcome />
      <main className='container content'>
        <Component {...pageProps} />
      </main>
      <Footer />
    </SWRConfig>
  </>
);

export default MyApp;
