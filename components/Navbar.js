import { useState } from 'react';
import { useRouter } from 'next/router';
import StyledNavbar from '../styles/Navbar.style';
import SearchIcon from '../assets/svg/search.svg';

const Navbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState(router.query.search ?? '');

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
          <a href='/'>IT Books</a>
        </div>

        <form onSubmit={handleSubmit} className='navbar-form'>
          <input
            type='text'
            value={search}
            onChange={handleSearchChange}
            placeholder='Search books by title, author, ISBN'
          />

          <button type='submit'>
            <SearchIcon className='search-icon' />
          </button>
        </form>
      </div>
    </StyledNavbar>
  );
};

export default Navbar;
