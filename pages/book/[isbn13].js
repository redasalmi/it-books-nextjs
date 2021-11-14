import Head from 'next/head';
import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import Error from '../../components/Error';
import Detail from '../../components/Books/Detail';

import fetchBooks from '../../utils/fetchBooks';

const BookDetail = () => {
  const { query } = useRouter();
  const { isbn13 } = query;

  const { data, error } = useQuery(
    ['book', isbn13],
    async () => fetchBooks(`/books/${isbn13}`),
    {
      enabled: false,
    },
  );
  const { title, desc } = data;

  if (error) return <Error />;

  return (
    <>
      <Head>
        <meta name='description' content={desc} />
        <title>IT Books - {title}</title>
      </Head>

      <Detail book={data} />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { isbn13 } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['book', isbn13], async () =>
    fetchBooks(`/books/${isbn13}`),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default BookDetail;
