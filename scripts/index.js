let popup = document.querySelector('.popup'); // находим div с классом popup
let popupCloseBtn = popup.querySelector('.popup__close-button'); // находим кнопку закрытия
let popupOpenBtn = document.querySelector('.profile__edit-button'); // находим кнопку редактирования
let formElement = document.querySelector('.popup__form'); // находим форму
let profileName = document.querySelector('.profile__name'); // находим заголовок с именем
let job = document.querySelector('.profile__job'); // находим параграф с работой
let nameInput = formElement.querySelector('.popup__input_type_name'); // находим инпут с именем
let jobInput = formElement.querySelector('.popup__input_type_job'); // находим инпут с работой

function openPopup() { // функция открытия попапчика
  popup.classList.add('popup_opened'); // попап становится видимым из-за display: flex
  nameInput.value = profileName.textContent; // содержимое из имени(h1) и работы(p) присвается соответствующим инпутам
  jobInput.value = job.textContent;
}

function closePopup() { // функция закрытия попапчика
  popup.classList.remove('popup_opened'); // попап снова невидим из-за display: none
}

function formSubmitHandler(evt) { // функция сохранения значений из инпутов
  evt.preventDefault();
  profileName.textContent = nameInput.value; // h1 и p присваиваются соответствующие значения из инпутов
  job.textContent = jobInput.value;
  closePopup();
}

popupOpenBtn.addEventListener('click', openPopup); // слушатель на кнопке редактировать
popupCloseBtn.addEventListener('click', closePopup); // слушатель на кнопке закрыть
formElement.addEventListener('submit', formSubmitHandler); // слушатель на форме



