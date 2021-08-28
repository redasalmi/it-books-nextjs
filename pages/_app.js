import { useState } from 'react';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

import Navbar from '../components/Navbar';
import Welcome from '../components/Welcome';
import Footer from '../components/Footer';

import '../styles/index.scss';

const MyApp = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Navbar />
          <Welcome />

          <main className='container content'>
            <Component {...pageProps} />
          </main>

          <Footer />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
