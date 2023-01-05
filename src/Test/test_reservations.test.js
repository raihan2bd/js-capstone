import reservationCounter from '../modules/reservationCounter.js';

describe('Test Display Reservation counter', () => {
  document.body.innerHTML = `
    <h3 class='reservation-title'>reservations <span id='reservation_count'>(0)</span></h3>
    <ul class='reservation-item-group'>
      <li class='reservation-item'>Reservation 1</li>
      <li class='reservation-item'>Reservation 2</li>
      <li class='reservation-item'>Reservation 3</li>
      <li class='reservation-item'>Reservation 4</li>
      <li class='reservation-item'>Reservation 5</li>
    </ul>`;

  test('Reservation count should be 5', () => {
    const reservationContainer = document.querySelector(
      '.reservation-item-group',
    );
    const reservationCountContainer = document.getElementById('reservation_count');

    const count = reservationCounter(
      reservationCountContainer,
      reservationContainer,
    );
    expect(count).toBe(5);
  });

  test('Reservation count innerText should be equal to reservation container chlild count', () => {
    const reservationContainer = document.querySelector(
      '.reservation-item-group',
    );
    const reservationCountContainer = document.getElementById('reservation_count');

    const count = reservationCounter(
      reservationCountContainer,
      reservationContainer,
    );
    expect(reservationContainer.childElementCount).toBe(count);
  });
});
