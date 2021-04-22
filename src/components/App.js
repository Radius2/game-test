import React, { useState, useEffect, useCallback, useRef } from 'react';

import { Content } from '../styledComponents/components';
import * as api from '../api/api';
import Search from './Search';
import Scroll from './scroll';
import { Route, Switch, Redirect } from 'react-router';
import Game from './Game';

function App() {
  const gamesPerList = 36;
  const [games, setGames] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [orderBy, setOrderBy] = useState({ name: 'rating ↓', value: '-rating' });
  const [platformFilter, setPlatformFilter] = useState({ id: [], name: 'ALL' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      getMoreGames(1);
    }, 500);
    return () => {
      clearTimeout(timer);
      console.log('delete');
      setGames([]);
      setCurPage(1);
    };
  }, [orderBy, search, platformFilter]);

  const getMoreGames = defaultValue => {
    console.log('call', curPage);
    api
      .getListOfGames(defaultValue ?? curPage, gamesPerList, orderBy.value, search, platformFilter)
      .then(resp => {
        setCurPage(prev => prev + 1);
        setGames(prev => [...prev, ...resp.data.results]);
      })
      .catch(err => console.log(err.response));
  };

  return (
    <Content maxWidth='1200px'>
      <Switch>
        <Route path='/' exact>
          <Search 
          orderBy={orderBy} 
          orderingHandler={order => setOrderBy(order)} 
          platformFilter={platformFilter} 
          platformHandler={platform => setPlatformFilter(platform)} 
          search={search}
          searchHandler={e => setSearch(e.target.value)}  />
          <Scroll getMoreGames={getMoreGames} games={games} />
        </Route>
        <Route path='/game/:slug' component={Game} />
        <Redirect to='/' />
      </Switch>
    </Content>
  );
}

export default App;
