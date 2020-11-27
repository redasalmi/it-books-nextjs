import Link from 'next/link';
import Image from 'next/image';
import StyledBookDetail from '../../styles/BookDetail.style';

const BookDetail = ({ book }) => {
  const {
    title,
    image,
    subtitle,
    authors,
    publisher,
    year,
    pages,
    language,
    rating,
    isbn10,
    isbn13,
    desc,
  } = book;

  return (
    <StyledBookDetail>
      <nav className='book-detail-nav'>
        <ul>
          <li>
            <Link href='/'>
              <a>It Books</a>
            </Link>
          </li>
          <li>{title}</li>
        </ul>
      </nav>

      <div className='book-detail'>
        <div className='img-col'>
          <Image
            src={image}
            alt={title}
            width={210}
            height={245}
            layout='responsive'
          />

          <div>
            <h3>{title}</h3>
            <h3>{subtitle}</h3>
          </div>
        </div>

        <div className='info-col'>
          <table>
            <tbody>
              <tr>
                <td>Title</td>
                <td>{title}</td>
              </tr>

              <tr>
                <td>Subtitle</td>
                <td>{subtitle}</td>
              </tr>

              <tr>
                <td>Authors</td>
                <td>{authors}</td>
              </tr>

              <tr>
                <td>Publisher</td>
                <td>{publisher}</td>
              </tr>

              <tr>
                <td>Year</td>
                <td>{year}</td>
              </tr>

              <tr>
                <td>Pages</td>
                <td>{pages}</td>
              </tr>

              <tr>
                <td>Language</td>
                <td>{language}</td>
              </tr>

              <tr>
                <td>Rating</td>
                <td>{`${rating}/5`}</td>
              </tr>

              <tr>
                <td>ISBN-10</td>
                <td>{isbn10}</td>
              </tr>

              <tr>
                <td>ISBN-13</td>
                <td>{isbn13}</td>
              </tr>

              <tr>
                <td>Description</td>
                <td>{desc}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </StyledBookDetail>
  );
};

export default BookDetail;
