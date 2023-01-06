const reservationCounter = (countContainer, reservationContainer) => {
  const count = reservationContainer.childElementCount;
  countContainer.innerText = `(${count})`;
  return count;
};

export default reservationCounter;
