import StyledFooter from '../styles/Footer.style';
import GithubIcon from '../assets/svg/github.svg';

const Footer = () => (
  <StyledFooter className='footer'>
    <div className='container'>
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
  </StyledFooter>
);

export default Footer;
