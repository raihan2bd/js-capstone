const commentCounter = (countContainer, commentContainer) => {
  const count = commentContainer.childElementCount;
  countContainer.innerText = `(${count})`;
  return count;
};

export default commentCounter;
