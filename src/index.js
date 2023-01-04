// import static files
import './style.css';
import './assets/img/icons8-favorite-30.png';
import './assets/img/icons8-menu-rounded-24.png';

import fetchTvShow from './modules/displayItems.js';

// enviroment API

const apiId = "iEGE9SCgBGcN5YPRLEj5"; //eslint-disable-line
const BASE_URL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiId}`; //eslint-disable-line

// external api url
const MOVIE_API = 'https://api.tvmaze.com/seasons/1/episodes';

// // Select dom elements
const tvSHowContainer = document.querySelector('.show-group');

window.onload = () => {
  fetchTvShow(MOVIE_API, tvSHowContainer);
};
