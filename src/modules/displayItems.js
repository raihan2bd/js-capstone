const render = (data, container) => {
  if (data.length > 0) {
    container.innerHTML = '';

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
      likeCount.innerText = '5 likes';

      showLikeAction.append(btnLike, likeCount); // append like actions child element.

      showInfo.append(title, showLikeAction); // append in showInfo

      // show action
      const showActions = document.createElement('div');
      showActions.className = 'show-actions';

      // create child btn
      const commentBtn = document.createElement('button');
      commentBtn.className = 'btn-action btn-comment';
      commentBtn.innerText = 'Comments';

      const reservationBtn = document.createElement('button');
      reservationBtn.className = 'btn-action btn-reservation';
      reservationBtn.innerText = 'Reservations';

      showActions.append(commentBtn, reservationBtn); // append child action buttons in showActions

      item.append(showImg, showInfo, showActions); // append clild all the elements in item.

      container.appendChild(item);
    });
  } else {
    container.innerHTML = '<p class="no-data">No Data Found</p>';
  }
};

const fetchTvShows = async (url, container) => {
  const res = await fetch(url);
  const result = await res.json();

  render(result, container);
};

export default fetchTvShows;
