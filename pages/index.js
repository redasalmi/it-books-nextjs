import Head from 'next/head';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import Error from '../components/Error';
import BooksList from '../components/Books/List';

import fetchBooks from '../utils/fetchBooks';

const NewBooks = () => {
  const { data, error } = useQuery('newBooks', async () => fetchBooks('/new'), {
    enabled: false,
  });

  if (error) return <Error />;

  return (
    <>
      <Head>
        <meta
          name='description'
          content='Website for IT, Programming and Computer Science Books'
        />
        <title>It Books - New Released Books</title>
      </Head>

      <BooksList books={data.books} />
    </>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('newBooks', async () => fetchBooks('/new'));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default NewBooks;
