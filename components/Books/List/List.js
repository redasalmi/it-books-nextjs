import Link from 'next/link';
import Image from 'next/image';

import blurData from '../../../utils/blurData';
import styles from './List.module.scss';

const BooksList = ({ books }) => (
  <div className={styles.list}>
    {books.map(({ title, image, isbn13 }) => (
      <div className={styles.book} key={isbn13}>
        <Link href={`/book/detail/${isbn13}`}>
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
