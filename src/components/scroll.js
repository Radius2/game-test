import React from 'react';
import styled from 'styled-components';
import {Row } from '../styledComponents/components';
import { Loading } from '../styledComponents/load';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from './Slug';

const StyledInfiniteScroll = styled(InfiniteScroll)`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  flex-grow: 1;
  width: 100%;
`;


const scroll = ({games,getMoreGames}) => {
    return games.length ? (
        <StyledInfiniteScroll
          dataLength={games.length}
          next={getMoreGames}
          hasMore
          loader={
            <Row>
              <Loading />
            </Row>
          }
          scrollThreshold='0px'
          endMessage='The end'>
          {games.map((game, index) => (
            <Card key={game.slug} {...game} />
          ))}
        </StyledInfiniteScroll>
      ) : (
        <Row>
          <Loading />
        </Row>
      )
}

export default scroll;