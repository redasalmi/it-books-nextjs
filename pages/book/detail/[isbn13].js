import Head from 'next/head';
import useSWR from 'swr';
import Error from '../../../components/Error';
import Spinner from '../../../components/Spinner';
import Detail from '../../../components/books/Detail';

const BookDetail = ({ isbn13 }) => {
  const { data, error } = useSWR(`/books/${isbn13}`);

  if (error) return <Error />;
  if (!data) return <Spinner textMessage='Loading Book Detail...' />;

  return (
    <>
      <Head>
        <title>IT Books - {data.title}</title>
      </Head>

      <Detail book={data} />
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { isbn13 } = query;

  return {
    props: { isbn13 },
  };
}

export default BookDetail;
