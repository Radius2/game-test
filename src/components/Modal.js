import React from 'react';
import styled from 'styled-components';

const View = styled.div`
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  position: relative;
  padding: 8px;
  object-fit: contain;
  width: 100%;
  height: 100%;
`;
const ButtonRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 25%;
  z-index: 1001;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  &:focus {
    background-color: rgba(0, 0, 0, 0.4);
  }
  @media (hover: hover) {
    &:hover {
      &:before {
        background-color: rgba(0, 0, 0, 0.4);
        font-size: 3rem;
        content: '>';
      }
    }
  }
`;

const ButtonLeft = styled(ButtonRight)`
  left: 0;
  @media (hover: hover) {
    &:hover {
      &:before {
        content: '<';
      }
    }
  }
`;

const Modal = ({ img, click, next, prev }) => {
  return (
    <View onClick={click}>
      <ButtonLeft
        onClick={e => {
          e.stopPropagation();
          prev();
        }}
      />
      <ButtonRight
        onClick={e => {
          e.stopPropagation();
          prev();
        }}
      />
      <Img src={img} alt='' />
    </View>
  );
};

export default Modal;
