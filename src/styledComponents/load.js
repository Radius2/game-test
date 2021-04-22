import styled, {keyframes} from 'styled-components';

const load = keyframes`
0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
`;

export const Loading = styled.div`
  border-radius: 25%;
  width: 2.5em;
  height: 2.5em;
  animation-fill-mode: both;
  animation: ${load} 1.8s infinite ease-in-out;
  color: ${({theme})=>theme.color.primary};
  font-size: 8px;
  margin-top: -16px;
  margin-bottom: 30px;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  animation-delay: -0.16s;
  &:before,
  :after {
    content: '';
    position: absolute;
    top: 0;
    border-radius: 25%;
    width: 2.5em;
    height: 2.5em;
    animation-fill-mode: both;
    animation: ${load} 1.8s infinite ease-in-out;
  }
  &:before {
    left: -3.5em;
    animation-delay: -0.32s;
  }
  &:after {
    left: 3.5em;
  }
`;
