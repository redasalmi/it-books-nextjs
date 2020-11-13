import styled, { keyframes } from 'styled-components';

const scale = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }

  from {
    transform: scale(0.5);
    opacity: 0.5;
  }
`;

const StyledSpinner = styled.div`
  display: flex;
  justify-content: space-around;
  width: 140px;
  height: 40px;

  div {
    width: 40px;
    height: 40px;
    background-color: ${(props) => props.theme.navbarBg};
    border-radius: 50%;
    animation: ${scale} 0.4s linear infinite alternate;
  }

  div:nth-child(2) {
    animation-delay: 0.4s;
  }
`;

export default StyledSpinner;
