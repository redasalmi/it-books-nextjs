import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Error from '../../../components/Error';
import Detail from '../../../components/books/Detail';
import { fetchBooks } from '../../../utils/fetcher';

const BookDetail = ({ book }) => {
  const { query } = useRouter();
  const { isbn13 } = query;

  const { data, error } = useSWR(`/books/${isbn13}`, { initialData: book });
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

  const resp = await fetchBooks(`/books/${isbn13}`);
  const book = await resp.json();

  return {
    props: { book },
  };
}

export default BookDetail;
