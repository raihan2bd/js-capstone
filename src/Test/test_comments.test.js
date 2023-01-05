import commentCounter from "../modules/commentCounter.js";

describe("Test Display Comment counter", () => {
  document.body.innerHTML = `
    <h3 class='comment-title'>Comments <span id='comment_count'>(0)</span></h3>
    <ul class='comment-item-group'>
      <li class='comment-item'>comment 1</li>
      <li class='comment-item'>comment 2</li>
      <li class='comment-item'>comment 3</li>
      <li class='comment-item'>comment 4</li>
      <li class='comment-item'>comment 5</li>
    </ul>`;

  test("Comment count should be 5", () => {
    const commentContainer = document.querySelector(".comment-item-group");
    const commentCountContainer = document.getElementById("comment_count");

    const count = commentCounter(commentCountContainer, commentContainer);
    expect(count).toBe(5);
  });

  test("Comment count innerText should be equal to comment container chlild count", () => {
    const commentContainer = document.querySelector(".comment-item-group");
    const commentCountContainer = document.getElementById("comment_count");

    const count = commentCounter(commentCountContainer, commentContainer);
    expect(commentContainer.childElementCount).toBe(count);
  });
});
