import Head from 'next/head';
import useSWR from 'swr';

import Error from '../components/Error';
import BooksList from '../components/books/List';
import { fetchBooks } from '../utils/fetcher';

const NewBooks = ({ books }) => {
  const { data, error } = useSWR('/new', { initialData: books });

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

export async function getStaticProps() {
  const resp = await fetchBooks('/new');
  const books = await resp.json();

  return {
    props: { books },
  };
}

export default NewBooks;
