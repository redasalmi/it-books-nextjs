import Head from 'next/head';
import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import Error from '../components/Error';
import BooksList from '../components/Books/List';
import Pagination from '../components/Pagination';

import fetchBooks from '../utils/fetchBooks';

const NewBooks = () => {
  const router = useRouter();
  const { search, page } = router.query;
  const hasSearched = !!(search && search?.length > 0);

  const { data: newBooksData, error: newBooksError } = useQuery(
    'newBooks',
    async () => fetchBooks('/new'),
    { enabled: false },
  );

  const { data: searchBooksData, error: searchBooksError } = useQuery(
    ['search', search, page],
    async () => fetchBooks(`/search/${search}/${page}`),
    { enabled: false },
  );

  if (newBooksError || searchBooksError) return <Error />;

  const { books, total } = hasSearched ? searchBooksData : newBooksData;

  const handlePageChange = (selectedPage) => {
    router.push(`/?search=${search}&page=${selectedPage}`);
    document.body.scrollIntoView({
      block: 'start',
      inline: 'nearest',
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Head>
        <meta
          name='description'
          content='Website for IT, Programming and Computer Science Books'
        />
        <title>It Books - New Released Books</title>
      </Head>

      {books && books?.length > 0 ? (
        <>
          <BooksList books={books} />

          {hasSearched ? (
            <Pagination
              activePage={parseInt(page, 10)}
              itemsCountPerPage={10}
              totalItemsCount={parseInt(total, 10)}
              handlePageChange={handlePageChange}
            />
          ) : null}
        </>
      ) : (
        <div className='text-center'>
          <h1>Sorry, No Books Found</h1>
        </div>
      )}
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { search, page } = query;
  const hasSearched = !!(search && search?.length > 0);

  const queryClient = new QueryClient();

  if (!hasSearched) {
    await queryClient.prefetchQuery('newBooks', async () => fetchBooks('/new'));
  } else {
    await queryClient.prefetchQuery(['search', search, page], async () =>
      fetchBooks(`/search/${search}/${page}`),
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default NewBooks;
