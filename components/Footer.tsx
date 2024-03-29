import GithubIcon from '~/assets/svg/github.svg';
import styles from '~/styles/components/footer.module.scss';

const Footer = () => (
  <footer className={`footer ${styles.footer}`}>
    <div className={`container ${styles.content}`}>
      <p>
        All of these books and information are brought to you by the{' '}
        <a
          target='_blank'
          rel='noreferrer noopener'
          href='https://api.itbook.store/'
        >
          IT Bookstore API
        </a>
      </p>

      <a
        target='_blank'
        rel='noreferrer noopener'
        aria-label='itbooks github repository'
        href='https://github.com/redasalmi/it-books-nextjs'
      >
        <GithubIcon />
      </a>
    </div>
  </footer>
);

export default Footer;
