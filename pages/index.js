import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Error from '../components/Error';
import BooksList from '../components/Books/List';
import Pagination from '../components/Pagination';

import fetchBooks from '../utils/fetchBooks';

const NewBooks = () => {
  const router = useRouter();
  const { search, page } = router.query;
  const hasSearched = !!(search && search?.length > 0);

  const { data: newBooks, error: newBooksError } = useSWR('/new');
  const { data: searchedBooks, error: searchBooksError } = useSWR(
    `/search/${search}/${page}`,
  );

  if (newBooksError || searchBooksError) return <Error />;

  const { books, total } = hasSearched ? searchedBooks : newBooks;

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

  const newBooksResource = '/new';
  const newBooks = !hasSearched ? await fetchBooks(newBooksResource) : [];

  const searchResource = `/search/${search}/${page}`;
  const searchedBooks = hasSearched ? await fetchBooks(searchResource) : [];

  return {
    props: {
      fallback: {
        [newBooksResource]: newBooks,
        [searchResource]: searchedBooks,
      },
    },
  };
}

export default NewBooks;
