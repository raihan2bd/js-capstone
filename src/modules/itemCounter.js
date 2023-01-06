const itemCounter = (countContainer, itemContainer) => {
  const count = itemContainer.childElementCount;
  countContainer.innerText = `(${count})`;
  return count;
};

export default itemCounter;
