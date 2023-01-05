import itemCounter from "../modules/itemCounter.js";
/**
 * @jest-environment jsdom
 */

describe("Test Display Item counter", () => {
  document.body.innerHTML = `
    <h1 class='title'>Favorite Tv Shows <span id='item_count'>(0)</span></h1>
    <ul class='items'>
      <li class='item'>item 1</li>
      <li class='item'>item 2</li>
      <li class='item'>item 3</li>
      <li class='item'>item 4</li>
      <li class='item'>item 5</li>
    </ul>`;

  test("Item count should be 5", () => {
    const itemContainer = document.querySelector(".items");
    const itemCountContainer = document.getElementById("item_count");

    const count = itemCounter(itemCountContainer, itemContainer);
    expect(count).toBe(5);
  });

  test("Item count innterText should be equal to item container chlild count", () => {
    const itemContainer = document.querySelector(".items");
    const itemCountContainer = document.getElementById("item_count");

    const count = itemCounter(itemCountContainer, itemContainer);
    expect(itemContainer.childElementCount).toBe(count);
  });
});
