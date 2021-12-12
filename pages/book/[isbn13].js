import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Error from '../../components/Error';
import Detail from '../../components/Books/Detail';

import fetchBooks from '../../utils/fetchBooks';

const BookDetail = () => {
  const { query } = useRouter();
  const { isbn13 } = query;

  const { data, error } = useSWR(`/books/${isbn13}`);
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
  const resource = `/books/${isbn13}`;
  const book = await fetchBooks(resource);

  return {
    props: {
      fallback: {
        [resource]: book,
      },
    },
  };
}

export default BookDetail;
