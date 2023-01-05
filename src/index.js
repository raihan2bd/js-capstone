// import static files
import './style.css';
import './assets/img/icons8-favorite-30.png';
import './assets/img/icons8-menu-rounded-24.png';
import './assets/img/icons8-multiply-24.png';

import fetchTvShow from './modules/displayItems.js';

// load the item list on the fly.
window.onload = () => {
  fetchTvShow();
};
