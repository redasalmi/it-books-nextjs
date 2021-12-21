import Head from 'next/head';
import { SWRConfig } from 'swr';
import type { AppProps } from 'next/app';

import Navbar from '~/components/Navbar';
import Welcome from '~/components/Welcome';
import Footer from '~/components/Footer';

import fetchBooks from '~/utils/fetchBooks';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';
import '~/styles/index.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
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
