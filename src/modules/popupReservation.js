import { BASE_URL } from './apiUrls.js';
import { modalContainer } from './domSelector.js';

const render = (data) => {
  // modal card
  const modalCard = document.createElement('div');
  modalCard.className = 'modal-card';

  // button
  const btnCross = document.createElement('button');
  btnCross.className = 'btn-cross';
  btnCross.innerHTML = '<img src="./assets/img/icons8-multiply-24.png" alt="X" />';
  btnCross.addEventListener('click', () => {
    modalContainer.classList.remove('show');
  });

  // card img
  const cardImg = document.createElement('div');
  cardImg.className = 'card-img';
  cardImg.innerHTML = `<img
  src="${data.image.original}"
  alt="${data.name}"
/>`;

  // card title
  const title = document.createElement('h2');
  title.className = 'card-title';
  title.innerText = data.name;

  // card des
  const des = document.createElement('div');
  des.className = 'card-des';
  des.innerHTML = data.summary;

  // card spec group
  const cardSpec = document.createElement('div');
  cardSpec.className = 'card-spec-group';
  cardSpec.innerHTML = `<ul class="card-spec">
  <li class="spec-item">Season: ${data.season}</li>
  <li class="spec-item">Duration: ${data.runtime}</li>
</ul>
<ul class="card-spec">
  <li class="spec-item">airdate: ${data.airdate}</li>
  <li class="spec-item">Rating: ${data.rating.average}</li>
</ul>`;

  const reservationSection = document.createElement('div');
  reservationSection.className = 'reservation-section';

  const reservationHeader = document.createElement('h3');
  reservationHeader.className = 'reservation-title';
  reservationHeader.innerText = `Reservations (${data.reservations.length})`;

  const reservationGroup = document.createElement('ul');
  reservationGroup.className = 'reservation-group';

  let reservationItems = '';

  if (data.reservations.length > 0) {
    data.reservations.forEach((item) => {
      reservationItems += `<li class='reservation-item'>
      ${item.date_start} - ${item.date_end} by ${item.username}</li>`;
    });
  }

  reservationGroup.innerHTML = reservationItems; // append reservation list

  reservationSection.append(reservationHeader, reservationGroup);

  // append child elements in cardModal
  // eslint-disable-next-line max-len
  modalCard.append(btnCross, cardImg, title, des, cardSpec, reservationSection);

  modalContainer.innerHTML = '';
  modalContainer.append(modalCard); // append cardModal
};

const fetchSingleShow = async (e) => {
  modalContainer.classList.add('show');
  const { id } = e.target.parentElement.parentElement;
  const url = `https://api.tvmaze.com/episodes/${id}`;
  const res = await fetch(url);
  const result = await res.json();

  const reservationRes = await fetch(`${BASE_URL}/reservations?item_id=${id}`);

  let filterResult = { ...result };

  const reservationResult = await reservationRes.json();
  if (reservationResult && !reservationResult.error) {
    filterResult = { ...filterResult, reservations: reservationResult };
  } else {
    filterResult = { ...filterResult, reservations: [] };
  }

  render(filterResult);
};

export default fetchSingleShow;
