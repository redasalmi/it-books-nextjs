import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Pagination from 'react-js-pagination';
import BooksList from '../../../components/books/List';
import Error from '../../../components/Error';
import StyledPagination from '../../../styles/Pagination.style';
import { fetchBooks } from '../../../utils/fetcher';

const BookSearch = ({ booksInit }) => {
  const router = useRouter();
  const { query } = router;
  const { search, page } = query;

  const { data, error } = useSWR(`/search/${search}/${page}`, {
    initialData: booksInit,
  });

  if (error) return <Error />;

  const { total, books } = data;
  const booksTotal = parseInt(total, 10);
  const booksPerPage = 10;

  const handlePageChange = (selectedPage) => {
    router.push(`/book/${search}/${selectedPage}`);
  };

  return (
    <>
      <Head>
        <title>IT Books - {search} books</title>
      </Head>

      {booksTotal > 0 ? (
        <>
          <BooksList books={books} />

          <StyledPagination>
            <Pagination
              activePage={parseInt(page)}
              itemsCountPerPage={booksPerPage}
              totalItemsCount={booksTotal}
              onChange={handlePageChange}
              itemClass='page-item'
              linkClass='page-link'
              activeLinkClass=''
            />
          </StyledPagination>
        </>
      ) : (
        <div>
          <h1 className='text-center'>Sorry, No Books Found.</h1>
        </div>
      )}
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { search, page } = params;

  const resp = await fetchBooks(`/search/${search}/${page}`);
  const booksInit = await resp.json();

  return {
    props: { booksInit },
  };
}

export default BookSearch;
