let popup = document.querySelector('.popup');
let popupCloseBtn = popup.querySelector('.popup__close');
let popupOpenBtn = document.querySelector('.edit-button');

function popupToggle() {
  popup.classList.toggle('popup_opened');
}
function clickOverlay(event) {
  if (event.target === event.currentTarget) {
    popupToggle();
  }
}

popup.addEventListener('click', clickOverlay);
popupOpenBtn.addEventListener('click', popupToggle);
popupCloseBtn.addEventListener('click', popupToggle);

let likeButton = document.querySelectorAll('.like-button');

for (let i = 0; i < likeButton.length; i++) {
  function pressLike() {
    likeButton[i].classList.toggle('like-button_liked');
  }
  likeButton[i].addEventListener('click', pressLike);
}

let formElement = document.querySelector('.popup__form');
let submitButton = formElement.querySelector('.popup__button');
let profileName = document.querySelector('.profile__name');
let job = document.querySelector('.profile__job');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');

nameInput.value = profileName.textContent;
jobInput.value = job.textContent;

  function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popupToggle();
  }

submitButton.addEventListener ('click', formSubmitHandler);
