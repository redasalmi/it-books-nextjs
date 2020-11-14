import Head from 'next/head';
import useSWR from 'swr';
import Error from '../components/Error';
import Spinner from '../components/Spinner';

const NewBooks = () => {
  const { data, error } = useSWR('/new');
  console.log(data);

  if (error) return <Error />;
  if (!data) return <Spinner textMessage='Loading latest books...' />;

  return (
    <>
      <Head>
        <title>It Books</title>
      </Head>

      <h1>Hello To IT Books</h1>
    </>
  );
};

export default NewBooks;
