let popup = document.querySelector('.popup');
let popupCloseBtn = popup.querySelector('.popup__close');
let popupOpenBtn = document.querySelector('.edit-button');
let formElement = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let job = document.querySelector('.profile__job');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');

nameInput.value = profileName.textContent;
jobInput.value = job.textContent;

function popupToggle() {
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popupToggle();
}

popupOpenBtn.addEventListener('click', popupToggle);
popupCloseBtn.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);



