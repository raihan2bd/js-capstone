import { BASE_URL } from "./apiUrls.js";
import { modalContainer } from "./domSelector.js";
import reservationCounter from "./reservationCounter.js";

const createNewReservation = async (url, data, reservationContainer, Form) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok && res.status !== 201) {
    return;
  }

  const fetchComUrl = `${BASE_URL}/reservations?item_id=${data.item_id}`;

  const resp = await fetch(fetchComUrl);

  const result = await resp.json();

  // manupulate the dom
  const reservationHeader = document.createElement("h3");
  reservationHeader.className = "reservation-title";
  reservationHeader.innerHTML = `Reservations <span id='show_comment_count'>(0)</span>`;

  const reservationGroup = document.createElement("ul");
  reservationGroup.className = "reservation-group";

  let reservationItems = "";

  if (result.length > 0) {
    result.forEach((item) => {
      reservationItems += `<li class='reservation-item'>
      ${item.date_start} - ${item.date_end} by ${item.username}</li>`;
    });
  }

  reservationGroup.innerHTML = reservationItems; // append reservation list
  reservationContainer.innerHTML = "";

  reservationCounter(reservationHeader.children[0], reservationGroup);

  reservationContainer.append(reservationHeader, reservationGroup);

  Form.elements.name.value = "";
  Form.elements.start_date.value = "";
  Form.elements.end_date.value = "";
};

const render = (data) => {
  // modal card
  const modalCard = document.createElement("div");
  modalCard.className = "modal-card";

  // button
  const btnCross = document.createElement("button");
  btnCross.className = "btn-cross";
  btnCross.innerHTML =
    '<img src="./assets/img/icons8-multiply-24.png" alt="X" />';
  btnCross.addEventListener("click", () => {
    modalContainer.classList.remove("show");
  });

  // card img
  const cardImg = document.createElement("div");
  cardImg.className = "card-img";
  cardImg.innerHTML = `<img
  src="${data.image.original}"
  alt="${data.name}"
/>`;

  // card title
  const title = document.createElement("h2");
  title.className = "card-title";
  title.innerText = data.name;

  // card des
  const des = document.createElement("div");
  des.className = "card-des";
  des.innerHTML = data.summary;

  // card spec group
  const cardSpec = document.createElement("div");
  cardSpec.className = "card-spec-group";
  cardSpec.innerHTML = `<ul class="card-spec">
  <li class="spec-item">Season: ${data.season}</li>
  <li class="spec-item">Duration: ${data.runtime}</li>
</ul>
<ul class="card-spec">
  <li class="spec-item">airdate: ${data.airdate}</li>
  <li class="spec-item">Rating: ${data.rating.average}</li>
</ul>`;

  const reservationSection = document.createElement("div");
  reservationSection.className = "reservation-section";

  const reservationHeader = document.createElement("h3");
  reservationHeader.className = "reservation-title";
  reservationHeader.innerHTML = `Reservations <span id='show_comment_count'>(0)</span>`;

  const reservationGroup = document.createElement("ul");
  reservationGroup.className = "reservation-group";

  let reservationItems = "";

  if (data.reservations.length > 0) {
    data.reservations.forEach((item) => {
      reservationItems += `<li class='reservation-item'>
      ${item.date_start} - ${item.date_end} by ${item.username}</li>`;
    });
  }

  reservationGroup.innerHTML = reservationItems; // append reservation list

  reservationCounter(reservationHeader.children[0], reservationGroup);

  reservationSection.append(reservationHeader, reservationGroup);

  // Add comment
  const reservationForm = document.createElement("div");
  reservationForm.className = "reservation-form";
  const addReservation = document.createElement("h3");
  addReservation.className = "reservation-title";
  addReservation.innerText = "Add a Reservation";
  const Form = document.createElement("form");
  Form.innerHTML = `
  <input type="text"  name="name" id="name" placeholder="Your name" maxlength="10" required>
  <label for='start_date'>Add your start date below</label>
  <input type="date"  name="start_date" id="start_date" placeholder="Add your start date here." required>
  <label for='end_date'>Add your end date below</label>
  <input type="date"  name="end_date" id="end_date" placeholder="Add your end date here." required>
  <button type="submit" id="submitBtn">Reserve</button>`;

  reservationForm.append(addReservation, Form);

  Form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = Form.elements.name.value;
    const startDate = Form.elements.start_date.value;
    const endDate = Form.elements.end_date.value;
    const reserveData = {
      item_id: data.id,
      username: name,
      date_start: startDate,
      date_end: endDate,
    };
    const url = `${BASE_URL}/reservations/`;
    createNewReservation(url, reserveData, reservationSection, Form);
  });

  // append child elements in cardModal
  // eslint-disable-next-line max-len
  modalCard.append(
    btnCross,
    cardImg,
    title,
    des,
    cardSpec,
    reservationSection,
    reservationForm
  );

  modalContainer.innerHTML = "";
  modalContainer.append(modalCard); // append cardModal
};

const fetchSingleShow = async (e) => {
  modalContainer.classList.add("show");
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
