// import static files
import './style.css';
import './assets/img/icons8-favorite-30.png';
import './assets/img/icons8-menu-rounded-24.png';
import './assets/img/icons8-multiply-24.png';

import fetchTvShow from './modules/displayItems.js';

// enviroment API

const apiId = 'Y1Ocl2k5LoJdVEhHia5O';
const BASE_URL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiId}`;

// external api url
const MOVIE_API = 'https://api.tvmaze.com/seasons/1/episodes';

window.onload = () => {
  fetchTvShow(MOVIE_API, BASE_URL);
};
