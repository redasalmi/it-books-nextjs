import Link from 'next/link';
import Image from 'next/image';

import blurData from '../../../utils/blurData';
import styles from './List.module.scss';
import type { Book } from '../../../types/book';

interface BooksListProps {
  books: Book[];
}

const BooksList = ({ books }: BooksListProps) => (
  <div className={styles.list}>
    {books.map(({ title, image, isbn13 }) => (
      <div className={styles.book} key={isbn13}>
        <Link href={`/book/${isbn13}`}>
          <a>
            <Image
              src={image}
              alt={title}
              width={210}
              height={245}
              layout='responsive'
              loading='lazy'
              placeholder='blur'
              blurDataURL={blurData(210, 245)}
            />
            <p>{title}</p>
          </a>
        </Link>
      </div>
    ))}
  </div>
);

export default BooksList;
