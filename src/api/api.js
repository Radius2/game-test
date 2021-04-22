import axios from 'axios';

const API_KEY = '6623e661b3f54c9d8fa11a4e1f9c9612';

const api = axios.create({
  baseURL: 'https://api.rawg.io/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export function getListOfGames(page, pageSize, ordering, search, platforms) {
  const searchRequest = search ? `&search=${search}` : '';
  const orderingRequest = ordering ? `&ordering=${ordering}` : '';
  const searchPlatforms = platforms.id.length ? `&platforms=${platforms.id.reduce((prev,el)=>(prev+el+','),'').slice(0, -1)}` : '';
  return api.get(`/games?key=${API_KEY}${searchRequest}&page=${page}&page_size=${pageSize}${orderingRequest}${searchPlatforms}`);
}

export function getGameInfo(id) {
  return api.get(`/games/${id}?key=${API_KEY}`);
}

export function getGameImg(id){
  return api.get(`/games/${id}/screenshots?key=${API_KEY}`);
}
