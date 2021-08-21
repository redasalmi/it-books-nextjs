import Head from 'next/head';
import { SWRConfig } from 'swr';

import Navbar from '../components/Navbar';
import Welcome from '../components/Welcome';
import Footer from '../components/Footer';

import { fetcher } from '../utils/fetcher';
import 'fontsource-roboto';
import '../styles/index.scss';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetcher(resource, init).then((res) => res.json()),
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
};

export default MyApp;
