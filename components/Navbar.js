import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import StyledNavbar from '../styles/Navbar.style';
import SearchIcon from '../assets/svg/search.svg?component';

const Navbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState(router.query.search ?? '');

  useEffect(() => {
    if (router.pathname === '/') {
      setSearch('');
    }
  }, [router]);

  const handleSearchChange = (event) => setSearch(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search) {
      router.push(`/book/${search}/1`);
    }
  };

  return (
    <StyledNavbar>
      <div className='container navbar-container'>
        <div className='navbar-logo'>
          <Link href='/'>
            <a>IT Books</a>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className='navbar-form'>
          <input
            type='text'
            value={search}
            onChange={handleSearchChange}
            placeholder='Search books by title, author, ISBN'
          />

          <button type='submit' aria-label='search books'>
            <SearchIcon className='search-icon' />
          </button>
        </form>
      </div>
    </StyledNavbar>
  );
};

export default Navbar;
