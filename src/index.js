import './style.css';

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
