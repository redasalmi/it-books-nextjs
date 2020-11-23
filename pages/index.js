import Head from 'next/head';
import useSWR from 'swr';
import BooksList from '../components/books/List';
import Error from '../components/Error';
import Spinner from '../components/Spinner';

const NewBooks = () => {
  const { data, error } = useSWR('/new');

  if (error) return <Error />;
  if (!data) return <Spinner textMessage='Loading New Released Books...' />;

  return (
    <>
      <Head>
        <title>It Books - New Released Books</title>
      </Head>

      <BooksList books={data.books} />
    </>
  );
};

export default NewBooks;
