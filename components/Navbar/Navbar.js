import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import SearchIcon from '../../assets/svg/search.svg?component';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const router = useRouter();
  const initSearch = router?.query?.search;

  const [search, setSearch] = useState(initSearch ?? '');

  useEffect(() => {
    if (router.pathname === '/' && !initSearch) {
      setSearch('');
    }
  }, [router, initSearch]);

  const handleSearchChange = (event) => setSearch(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search) {
      router.push(`/?search=${search}&page=1`);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.container}`}>
        <div className={styles.logo}>
          <Link href='/'>
            <a>IT Books</a>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type='text'
            value={search}
            onChange={handleSearchChange}
            placeholder='Search books by title, author, ISBN'
          />

          <button type='submit' aria-label='search books'>
            <SearchIcon className={styles.searchIcon} />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
