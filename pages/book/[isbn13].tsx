import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { GetServerSideProps } from 'next';

import Error from '~/components/Error';
import Detail from '~/components/BookDetail';

import fetchBooks from '~/utils/fetchBooks';
import type { BookData } from '~/types/book';

const BookDetail = () => {
  const { query } = useRouter();
  const { isbn13 } = query;

  const { data, error } = useSWR<BookData>(`/books/${isbn13}`);

  if (error) return <Error />;

  return (
    <>
      <Head>
        <meta name='description' content={data?.desc} />
        <title>IT Books - {data?.title}</title>
      </Head>

      <Detail book={data!} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { isbn13 } = params!;
  const resource = `/books/${isbn13}`;
  const book: BookData = await fetchBooks(resource);

  return {
    props: {
      fallback: {
        [resource]: book,
      },
    },
  };
};

export default BookDetail;
