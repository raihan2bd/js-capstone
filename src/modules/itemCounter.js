export const itemCounter = (countContainer, itemContainer) => {
  const count = itemContainer.childElementCount;
  countContainer.innerText = `(${count})`;
};
