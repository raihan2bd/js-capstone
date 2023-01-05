import { modalContainer } from './domSelector.js';

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

  const commentHeader = document.createElement('h3');
  commentHeader.className = 'comment-title';
  commentHeader.innerText = `Comments (${data.comments.length})`;

  const commentGroup = document.createElement('ul');
  commentGroup.className = 'comment-goup';

  let commentItems = '';

  if (data.comments.length > 0) {
    data.comments.forEach((item) => {
      commentItems += `<li class='comment-item'>
      ${item.creation_date} ${item.username} ${item.comment}</li>`;
    });
  }

  commentGroup.innerHTML = commentItems; // append comment list

  commentSection.append(commentHeader, commentGroup);

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

Form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const name = Form.elements['name'].value;
  const insight = Form.elements['insight'].value; 
  const commentData = {
    item_id: data.id,
    username: name,
    comment: insight
}
const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Y1Ocl2k5LoJdVEhHia5O/comments'
  createNewComment(url, commentData, commentSection)
})
  // append child elements in cardModal
  modalCard.append(btnCross, cardImg, title, des, cardSpec, commentSection, commentForm);

  modalContainer.innerHTML = '';
  modalContainer.append(modalCard); // append cardModal
};

const fetchSingleShowComment = async (e) => {
  modalContainer.classList.add('show');
  const { id } = e.target.parentElement.parentElement;
  const url = `https://api.tvmaze.com/episodes/${id}`;
  const res = await fetch(url);
  const result = await res.json();

  const commentRes = await fetch(
    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Y1Ocl2k5LoJdVEhHia5O/comments?item_id=${id}`,
  );

  let filterResult = { ...result };

  const commentResult = await commentRes.json();
  if (commentResult && !commentResult.error) {
    filterResult = { ...filterResult, comments: commentResult };
  } else {
    filterResult = { ...filterResult, comments: [] };
  }

  render(filterResult);
};

const createNewComment = async (url, data) =>{
  console.log("hello")
}


export default fetchSingleShowComment;
