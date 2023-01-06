import { itemCountContainer, listItemsContainer } from './domSelector.js';
import fetchSingleShowComment from './popupComment.js';
import fetchSingleShow from './popupReservation.js';
import { BASE_URL, MOVIE_API } from './apiUrls.js';
import itemCounter from './itemCounter.js';

// createNew like
const createNewLike = async (id, likeCount) => {
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
      btnLike.innerHTML = "<img src='./assets/img/icons8-favorite-30.png' alt='favorite'>";

      // like count
      const likeCount = document.createElement('span');
      if (i.likes > 1) {
        likeCount.innerText = `${i.likes} likes`;
      } else {
        likeCount.innerHTML = `${i.likes} like`;
      }

      // btn like event to create new like
      btnLike.addEventListener('click', () => {
        createNewLike(i.id, likeCount);
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
