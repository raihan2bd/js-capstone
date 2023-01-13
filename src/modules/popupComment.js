import { BASE_URL } from './apiUrls.js';
import commentCounter from './commentCounter.js';
import { modalContainer } from './domSelector.js';

const createNewComment = async (url, data, commentsContainer, Form) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok && response.status !== 201) {
    return;
  }

  const fetchComUrl = `${BASE_URL}/comments?item_id=${data.item_id}`;

  const commentResponse = await fetch(fetchComUrl);

  const result = await commentResponse.json();

  // manupulate the dom
  const commentTite = document.createElement('div');
  commentTite.className = 'comment-title';
  const commentHeader = document.createElement('h3');
  commentHeader.className = 'comment-header';
  commentHeader.innerHTML = 'Comments';
  const commentCount = document.createElement('p');
  commentCount.id = 'show_comment_count';
  commentCount.innerText = 0;

  commentTite.append(commentHeader, commentCount);

  const commentGroup = document.createElement('ul');
  commentGroup.className = 'comment-goup';

  let commentItems = '';

  if (result.length > 0) {
    result.forEach((item) => {
      commentItems += `<li class='comment-item'>
      <div class='user-info'>
        <div class='user-avatar'>
          <img src='./assets/img/user.png' alt='${item.username}'/>
        </div>
        <h4 class='user-name'>${item.username}</h4>
        <span class='submit-date'>${item.creation_date}</span>
      </div>
      <p class='user-data'>${item.comment}</p>
    </li>`;
    });
  }

  commentGroup.innerHTML = commentItems; // append comment list
  commentsContainer.innerHTML = '';

  commentCounter(commentCount, commentGroup);

  commentsContainer.append(commentTite, commentGroup);

  Form.elements.name.value = '';
  Form.elements.insight.value = '';
};

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

  const commentSection = document.createElement('div');
  commentSection.className = 'comment-section';

  const commentTite = document.createElement('div');
  commentTite.className = 'comment-title';
  const commentHeader = document.createElement('h3');
  commentHeader.className = 'comment-header';
  commentHeader.innerHTML = 'Comments';
  const commentCount = document.createElement('p');
  commentCount.id = 'show_comment_count';
  commentCount.innerText = 0;

  commentTite.append(commentHeader, commentCount);

  const commentGroup = document.createElement('ul');
  commentGroup.className = 'comment-goup';

  let commentItems = '';

  if (data.comments.length > 0) {
    data.comments.forEach((item) => {
      commentItems += `<li class='comment-item'>
        <div class='user-info'>
          <div class='user-avatar'>
            <img src='./assets/img/user.png' alt='${item.username}'/>
          </div>
          <h4 class='user-name'>${item.username}</h4>
          <span class='submit-date'>${item.creation_date}</span>
        </div>
        <p class='user-data'>${item.comment}</p>
      </li>`;
    });
  }

  commentGroup.innerHTML = commentItems; // append comment list

  commentCounter(commentCount, commentGroup);

  commentSection.append(commentTite, commentGroup);

  // Add comment
  const commentForm = document.createElement('div');
  commentForm.className = 'comment-form';
  const addComment = document.createElement('h3');
  addComment.className = 'comment-title';
  addComment.innerText = 'Add a comment';
  const Form = document.createElement('form');
  Form.innerHTML = `
<input type="text"  name="name" id="name" placeholder="Your name" maxlength="10" required>
<textarea id="insight" name="insight" placeholder="Your insights"></textarea>
<button type="submit" id="submitBtn">Submit</button>`;

  commentForm.append(addComment, Form);

  Form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = Form.elements.name.value;
    const insight = Form.elements.insight.value;
    const commentData = {
      item_id: data.id,
      username: name,
      comment: insight,
    };
    const url = `${BASE_URL}/comments`;
    createNewComment(url, commentData, commentSection, Form);
  });
  // append child elements in cardModal
  modalCard.append(
    btnCross,
    cardImg,
    title,
    des,
    cardSpec,
    commentSection,
    commentForm,
  );

  modalContainer.innerHTML = '';
  modalContainer.append(modalCard); // append cardModal
};

const fetchSingleShowComment = async (e) => {
  modalContainer.classList.add('show');
  const { id } = e.target.parentElement.parentElement;
  const url = `https://api.tvmaze.com/episodes/${id}`;
  const response = await fetch(url);
  const result = await response.json();

  const commentResponse = await fetch(`${BASE_URL}/comments?item_id=${id}`);

  let filterResult = { ...result };

  const commentResult = await commentResponse.json();
  if (commentResult && !commentResult.error) {
    filterResult = { ...filterResult, comments: commentResult };
  } else {
    filterResult = { ...filterResult, comments: [] };
  }

  render(filterResult);
};

export default fetchSingleShowComment;
