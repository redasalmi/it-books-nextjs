import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import SearchIcon from '../../assets/svg/search.svg';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const router = useRouter();
  const initSearch = router?.query?.search;

  const [search, setSearch] = React.useState(initSearch || '');

  React.useEffect(() => {
    if (router.pathname === '/' && !initSearch) {
      setSearch('');
    }
  }, [router, initSearch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value);

  const handleSubmit = (event: React.FormEvent) => {
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
