import './style.css';
import './assets/img/icons8-menu-rounded-24.png';

// enviroment API

const apiId = 'iEGE9SCgBGcN5YPRLEj5';//eslint-disable-line
const BASE_URL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiId}`; //eslint-disable-line

// external api url
const MOVIE_API = 'https://api.tvmaze.com/seasons/1/episodes';

const fetchdata = async () => {
  const res = await fetch(MOVIE_API);
  const result = await res.json();
  console.log(result);
};

window.onload = () => {
  fetchdata();
};
