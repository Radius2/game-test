import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { linkToCrop } from '../shared/commonFunction';
import { Row, Divider } from '../styledComponents/components';

const Card = styled.div`
  background: ${({ theme }) => theme.color.primary};
  min-width: 0;
  position: relative;
  margin: 8px;
  flex-basis: 250px;
  flex-grow: 1;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: tansform 1s;
  box-shadow: 2px 3px 5px 0px rgba(0, 0, 0, 0.15);
  overflow: visible;
  @media (min-width: 900px) {
    flex-basis: 300px;
  }
  @media (hover: hover) {
    overflow: hidden;
    padding-bottom: 16px;
    &:hover {
      overflow: visible;
      border-radius: ${({ theme }) => `${theme.borderRadius} ${theme.borderRadius} 0 0`};
      transform: scale(1.02);
      z-index: 200;
    }
  }
`;

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 60%;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(to bottom, rgba(255, 0, 0, 0) 0%, rgba(255, 0, 0, 0) 50%, ${({ theme }) => theme.color.primary} 100%);
  }
`;

const Img = styled.img`
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 17px 17px 0 0;
`;

const Rating = styled.p`
  position: absolute;
  overflow: hidden;
  z-index: 100;
  min-width: 30px;
  right: 8px;
  bottom: 8px;
  padding: 2px;
  font-weight: 700;
  border-radius: 6px;
  text-align: center;
  border: solid 3px ${({ theme }) => theme.color.contrast};
  color: ${({ theme }) => theme.color.contrast};
  background: ${({ theme }) => theme.color.primary};
`;

const ShortName = styled.h2`
  padding: 0 16px;
`;

const Additional = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.color.primary};
  border-radius: ${({ theme }) => `0 0 ${theme.borderRadius} ${theme.borderRadius}`};
  overflow: hidden;
  padding-top: 8px;
  @media (hover: hover) {
    position: absolute;
    z-index: 100;
    top: calc(100%);
    left: 0;
    box-shadow: 2px 3px 5px 0px rgba(0, 0, 0, 0.15);
  }
`;

const Property = styled.p``;
const Value = styled.p`
  font-weight: 700;
  text-align: right;
`;

const Button = styled.button`
  margin-top: 8px;
  background: ${({ theme }) => theme.color.primary};
  width: 100%;
  &:hover {
    background: ${({ theme }) => theme.color.secondary};
  }
`;

const Slug = props => {
  const history = useHistory();

  const derect = () => {
    history.push('game/' + props.slug);
  };

  return (
    <Card>
      <ImgContainer>
        <Img alt='img' src={linkToCrop(props.background_image)} />
        <Rating>{props.rating.toFixed(2)}</Rating>
      </ImgContainer>
      <ShortName>{props.name}</ShortName>
      <Additional>
        <Row justify='space-between'>
          <Property>relised:</Property>
          <Value>{props.released}</Value>
        </Row>
        <Divider />
        <Row justify='space-between'>
          <Property>genres:</Property>
          <Value>{props.genres?.reduce((prev, genr) => prev + ' ' + genr.name.toLowerCase() + ',', ' ').slice(0, -1)}</Value>
        </Row>
        <Divider />
        <Row justify='space-between'>
          <Property>platforms:</Property>
          <Value>{props.platforms?.reduce((prev, el) => prev + ' ' + el.platform.name.toLowerCase() + ',', '').slice(0, -1)}</Value>
        </Row>
        <Button onClick={derect}>More info</Button>
      </Additional>
    </Card>
  );
};

export default Slug;
