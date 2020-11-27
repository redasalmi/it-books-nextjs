import Head from 'next/head';
import useSWR from 'swr';
import BooksList from '../../../components/books/List';
import Error from '../../../components/Error';
import Spinner from '../../../components/Spinner';

const BookSearch = ({ search, page }) => {
  const { data, error } = useSWR(`/search/${search}/${page}`);

  if (error) return <Error />;
  if (!data) return <Spinner textMessage='Loading Search Result...' />;

  const { total, books } = data;

  return (
    <>
      <Head>
        <title>IT Books - {search} books</title>
      </Head>

      {parseInt(total, 10) > 0 ? (
        <BooksList books={books} />
      ) : (
        <div>
          <h1 className='text-center'>Sorry, No Books Found.</h1>
        </div>
      )}
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { search, page } = query;

  return {
    props: { search, page },
  };
}

export default BookSearch;
