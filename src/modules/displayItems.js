import { itemCountContainer, listItemsContainer } from './domSelector.js';
import fetchSingleShowComment from './popupComment.js';
import fetchSingleShow from './popupReservation.js';
import { BASE_URL, MOVIE_API } from './apiUrls.js';
import itemCounter from './itemCounter.js';

// createNew like
const createNewLike = async (id, likeCount, btnLike) => {
  btnLike.setAttribute('disabled', '');
  const response = await fetch(`${BASE_URL}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item_id: id }),
  });

  if (!response.ok && response.status !== 201) {
    return;
  }

  const responseLikes = await fetch(`${BASE_URL}/likes`);
  const result = await responseLikes.json();
  const likeData = result.find((item) => item.item_id === id);
  if (likeData) {
    likeCount.innerText = likeData.likes > 1 ? `${likeData.likes} likes` : `${likeData.likes} like`;
    btnLike.innerHTML = `<?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg fill="#ff7b00" height="22px" width="22px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
       viewBox="0 0 455 455" xml:space="preserve">
    <path d="M326.632,10.346c-38.733,0-74.991,17.537-99.132,46.92c-24.141-29.383-60.399-46.92-99.132-46.92
      C57.586,10.346,0,67.931,0,138.714c0,55.426,33.049,119.535,98.23,190.546c50.162,54.649,104.729,96.96,120.257,108.626l9.01,6.769
      l9.009-6.768c15.53-11.667,70.099-53.979,120.26-108.625C421.95,258.251,455,194.141,455,138.714
      C455,67.931,397.414,10.346,326.632,10.346z"/>
    </svg>`;
  }
};

// render the item list
const render = (data) => {
  if (data.length > 0) {
    listItemsContainer.innerHTML = '';

    data.forEach((i) => {
      const item = document.createElement('li');
      item.id = i.id;
      item.className = 'show-item';

      // create sho Img element
      const showImg = document.createElement('div');
      showImg.className = 'show-item-img';
      showImg.innerHTML = `<img src='${i.image.original}'>`;

      // create show info
      const showInfo = document.createElement('div');
      showInfo.className = 'show-info';

      // create tile for show info
      const title = document.createElement('h3');
      title.className = 'show-title';
      title.innerText = i.name;

      // like action
      const showLikeAction = document.createElement('div');
      showLikeAction.className = 'shwo-like-action';

      // like button
      const btnLike = document.createElement('button');
      btnLike.className = 'btn-like';
      btnLike.innerHTML = `<?xml version="1.0" encoding="iso-8859-1"?>
      <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
      <svg fill="#ff7b00" height="22px" width="22px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
         viewBox="0 0 455 455" xml:space="preserve">
      <path d="M326.632,10.346c-38.733,0-74.991,17.537-99.132,46.92c-24.141-29.384-60.398-46.92-99.132-46.92
        C57.586,10.346,0,67.931,0,138.714c0,55.426,33.05,119.535,98.23,190.546c50.161,54.647,104.728,96.959,120.257,108.626l9.01,6.769
        l9.01-6.768c15.529-11.667,70.098-53.978,120.26-108.625C421.949,258.251,455,194.141,455,138.714
        C455,67.931,397.414,10.346,326.632,10.346z M334.666,308.974c-41.259,44.948-85.648,81.283-107.169,98.029
        c-21.52-16.746-65.907-53.082-107.166-98.03C61.236,244.592,30,185.717,30,138.714c0-54.24,44.128-98.368,98.368-98.368
        c35.694,0,68.652,19.454,86.013,50.771l13.119,23.666l13.119-23.666c17.36-31.316,50.318-50.771,86.013-50.771
        c54.24,0,98.368,44.127,98.368,98.368C425,185.719,393.763,244.594,334.666,308.974z"/>
      </svg>`;

      // like count
      const likeCount = document.createElement('span');
      if (i.likes > 1) {
        likeCount.innerText = `${i.likes} likes`;
      } else {
        likeCount.innerHTML = `${i.likes} like`;
      }

      // btn like event to create new like
      btnLike.addEventListener('click', () => {
        createNewLike(i.id, likeCount, btnLike);
      });

      showLikeAction.append(btnLike, likeCount); // append like actions child element.

      showInfo.append(title, showLikeAction); // append in showInfo

      // show action
      const showActions = document.createElement('div');
      showActions.className = 'show-actions';

      // create child btn
      const commentBtn = document.createElement('button');
      commentBtn.className = 'btn-action btn-comment';
      commentBtn.innerText = 'Comments';
      commentBtn.addEventListener('click', (e) => {
        fetchSingleShowComment(e);
      });

      const reservationBtn = document.createElement('button');
      reservationBtn.className = 'btn-action btn-reservation';
      reservationBtn.innerText = 'Reservations';
      reservationBtn.addEventListener('click', (e) => {
        fetchSingleShow(e);
      });

      showActions.append(commentBtn, reservationBtn); // append child action buttons in showActions

      item.append(showImg, showInfo, showActions); // append clild all the elements in item.

      listItemsContainer.appendChild(item);
    });
    itemCounter(itemCountContainer, listItemsContainer);
  } else {
    listItemsContainer.innerHTML = '<p class="no-data">No Data Found</p>';
  }
};

const fetchTvShows = async () => {
  const response = await fetch(MOVIE_API);
  const result = await response.json();

  // call the Involment api to get likes
  const responseInvolvement = await fetch(`${BASE_URL}/likes/`);
  const likesResult = await responseInvolvement.json();

  // filter Array thats have Likes
  const filterArrWithLikes = [];
  result.forEach((item) => {
    likesResult.forEach((likeItem) => {
      if (item.id === likeItem.item_id) {
        filterArrWithLikes.push({ ...item, likes: likeItem.likes });
      }
    });
  });

  // filter Array thats have not likes
  let filterWithoutLikes = [];
  filterWithoutLikes = result.filter(
    (el) => !filterArrWithLikes.find((element) => element.id === el.id),
  ); //eslint-disable-line

  // modify the filterWithout array likes count 0;
  const modifiyFilterWithoutLikes = [];
  filterWithoutLikes.forEach((item) => {
    modifiyFilterWithoutLikes.push({ ...item, likes: 0 });
  });

  // join and sort the arrays
  const joinArr = modifiyFilterWithoutLikes.concat(filterArrWithLikes);
  joinArr.sort((a, b) => a.id - b.id);

  // call render function to display the item list
  render(joinArr);
};

export default fetchTvShows;
