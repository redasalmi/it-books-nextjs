import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import BooksList from '../../../components/Books/List';
import Pagination from '../../../components/Pagination';
import Error from '../../../components/Error';

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

    const main = document.querySelector('.container');
    main.scrollIntoView({
      block: 'start',
      inline: 'nearest',
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Head>
        <meta name='description' content={`${search} books search result`} />
        <title>IT Books - {search} books</title>
      </Head>

      {booksTotal > 0 ? (
        <>
          <BooksList books={books} />

          <Pagination
            activePage={parseInt(page)}
            itemsCountPerPage={booksPerPage}
            totalItemsCount={booksTotal}
            handlePageChange={handlePageChange}
          />
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
