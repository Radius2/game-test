import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Row, Divider } from '../styledComponents/components';
import { Loading } from '../styledComponents/load';
import parser from 'html-react-parser';
import * as api from '../api/api';
import Modal from './Modal';

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: stretch;
`;

const WrapRow = styled(Row)`
  padding: 0;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const Column = styled.div`
  height: max-content;
  margin: 8px;
  max-width: 480px;
  flex-shrink: 2;
  flex-basis: 320px;
  flex-grow: 1;
  display: flex;
  flex-flow: column;
`;

const Name = styled.h1`
  margin: 16px 8px;
`;

const Poster = styled.img`
  margin: 0 auto;
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-height: 260px;
  max-width: 460px;
  min-height: 0px;
  min-width: 0px;
  border-radius: 5px;
`;

const Preview = styled(Poster)`
  position: relative;
  margin: 8px;
  flex-basis: 100px;
  max-height: 102px;
  max-width: 184px;
  cursor: pointer;
`;

const Feature = styled.div`
  flex-basis: 300px;
  flex-grow: 1;
  max-width: 600px;
  width: 100%;
  padding: 16px 0;
  margin: 8px;
  align-self: flex-start;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.color.primary};
`;

const Property = styled.p``;

const Value = styled.p`
  font-weight: 700;
  text-align: right;
`;

const Website = styled.a`
  margin: 8px auto;
`;
const About = styled.h3`
  margin-left: 32px;
`;

const Description = styled.div`
  margin: 16px 8px;
`;

const Game = ({ match }) => {
  const [game, setGame] = useState({});
  const [imgArray, setImgArray] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const [curIndex, setCurIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api
      .getGameInfo(match.params.slug)
      .then(({ data }) => {
        setGame(data);
        setLoading(false);
        return api.getGameImg(match.params.slug);
      })
      .then(({ data }) => setImgArray(data.results))
      .catch(err => {
        setLoading(false);
      });
  }, []);

  const next = () => {
    curIndex === imgArray.length - 1 ? setCurIndex(0) : setCurIndex(prev => prev + 1);
  };
  const prev = () => {
    curIndex === 0 ? setCurIndex(imgArray.length - 1) : setCurIndex(prev => prev - 1);
  };

  return loading ? (
    <Row>
      <Loading />
    </Row>
  ) : (
    <Container>
      {showModal ? <Modal img={imgArray[curIndex].image} click={() => setShowModal(false)} next={next} prev={prev} /> : null}
      <Name>{game.name}</Name>
      <WrapRow>
        <Column>
          <Poster src={game['background_image']} alt='poster' />
          <WrapRow justify='flex-start'>
            {imgArray.map(({ image, id }, index) =>
              index <= 6 ? (
                <Preview
                  key={id}
                  onClick={() => {
                    setCurIndex(index);
                    setShowModal(true);
                  }}
                  src={image}
                  alt='screenshot'
                />
              ) : null
            )}
          </WrapRow>
        </Column>
        <Feature>
          <Row justify='space-between'>
            <Property>relised:</Property>
            <Value>{game.released ? game.released : 'no info'}</Value>
          </Row>
          <Divider />
          <Row justify='space-between'>
            <Property>rating:</Property>
            <Value>{game.rating ? game.rating.toFixed(2) : 'no info'}</Value>
          </Row>
          <Divider />
          <Row justify='space-between'>
            <Property>genres:</Property>
            <Value>{game.genres ? game.genres.reduce((prev, genr) => prev + ' ' + genr.name.toLowerCase() + ',', ' ').slice(0, -1) : 'no info'}</Value>
          </Row>
          <Divider />
          <Row justify='space-between'>
            <Property>platforms:</Property>
            <Value>
              {game.platforms ? game.platforms.reduce((prev, el) => prev + ' ' + el.platform.name.toLowerCase() + ',', '').slice(0, -1) : 'no info'}
            </Value>
          </Row>
          <Row>
            <Website href={game.website}>official site</Website>
          </Row>
        </Feature>
      </WrapRow>
      <Description>
        <About>About</About>
        <br />
        {parser(game.description)}
      </Description>
    </Container>
  );
};

export default Game;
