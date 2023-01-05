const itemCounter = (countContainer, itemContainer) => {
  const count = itemContainer.childElementCount;
  countContainer.innerText = `(${count})`;
};

export default itemCounter;
