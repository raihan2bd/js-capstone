// import static files
import './style.css';
import './assets/img/icons8-menu-rounded-24.png';
import './assets/img/icons8-multiply-24.png';
import './assets/img/user.png';

import fetchTvShow from './modules/displayItems.js';
import {
  closeBtn,
  menuBtn,
  mobNavGroup,
  mobileNavlinks,
} from './modules/domSelector.js';

// toggle the menu
menuBtn.addEventListener('click', () => {
  mobNavGroup.classList.toggle('display-flex');
});

closeBtn.addEventListener('click', () => {
  mobNavGroup.classList.remove('display-flex');
});

mobileNavlinks.forEach((item) => {
  item.addEventListener('click', () => {
    mobNavGroup.classList.remove('display-flex');
  });
});

// load the item list on the fly.
window.onload = () => {
  fetchTvShow();
};
