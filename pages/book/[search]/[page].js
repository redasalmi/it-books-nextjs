import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Pagination from 'react-js-pagination';
import BooksList from '../../../components/books/List';
import Error from '../../../components/Error';
import Spinner from '../../../components/Spinner';
import StyledPagination from '../../../styles/Pagination.style';

const BookSearch = ({ search, page }) => {
  const router = useRouter();
  const { data, error } = useSWR(`/search/${search}/${page}`);

  if (error) return <Error />;
  if (!data) return <Spinner textMessage='Loading Search Result...' />;

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

export async function getServerSideProps({ query }) {
  const { search, page } = query;

  return {
    props: { search, page },
  };
}

export default BookSearch;
