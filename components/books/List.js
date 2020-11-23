import Link from 'next/link';
import Image from 'next/image';
import StyledBooksList from '../../styles/BooksList';

const BooksList = ({ books }) => (
  <StyledBooksList>
    {books.map((book) => {
      const { title, image, isbn13 } = book;

      return (
        <div className='book-card' key={isbn13}>
          <Link href={`/book/detail/${isbn13}`}>
            <a>
              <Image
                src={image}
                alt={title}
                width={210}
                height={245}
                layout='responsive'
              />
              <p>{title}</p>
            </a>
          </Link>
        </div>
      );
    })}
  </StyledBooksList>
);

export default BooksList;
