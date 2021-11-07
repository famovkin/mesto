import { initialCards } from '../scripts/cards-array.js';
import { config } from '../scripts/config.js'
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';

const ESC_CODE = 'Escape';
const popupEdit = document.querySelector('.popup_type_edit'); // находим элемент с классом popup_type_edit
const popupEditOpenBtn = document.querySelector('.profile__edit-button'); // находим кнопку редактирования
const popupAddOpenBtn = document.querySelector('.profile__add-button'); // находим кнопку добавить карточку
const popupAdd = document.querySelector('.popup_type_add'); // находим попап с классом popup_type_add
const formAdd = document.querySelector('.popup__form_type_add') // находим форму добавления карточки
const placeNameInput = formAdd.querySelector('.popup__input_type_place-name') // находим инпут с названием места
const placeLinkInput = formAdd.querySelector('.popup__input_type_place-link') // находим инпут с линком картинки
const popupImage = document.querySelector('.popup_type_image'); // находим элемент с классом popup_type_image
const formEdit = document.querySelector('.popup__form_type_edit'); // находим форму c редактированием профиля
const profileName = document.querySelector('.profile__name'); // находим заголовок с именем
const job = document.querySelector('.profile__job'); // находим параграф с работой
const nameInput = formEdit.querySelector('.popup__input_type_name'); // находим инпут с именем
const jobInput = formEdit.querySelector('.popup__input_type_job'); // находим инпут с работой
const cards = document.querySelector('.places__cards'); // находим список карточек
const headingInPopupImage = popupImage.querySelector('.popup__heading');
const imageInPopupImage = popupImage.querySelector('.popup__image');
const popups = document.querySelectorAll('.popup');

function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopup(modal) { // функция закрытия попапа
  modal.classList.remove('popup_opened'); // удаление класса, который отображает попап
  window.removeEventListener('keydown', closeByEsc);
}

function openPopup(modal) { // функция открытия попапа, в параметр modal передаем тип попапа
  modal.classList.add('popup_opened'); // попап становится видимым из-за display: flex
  window.addEventListener('keydown', closeByEsc);
}

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close-image')) {
      closePopup(popup);
    }
  });
});

const validatorForFormEdit = new FormValidator (config, formEdit);
validatorForFormEdit.enableValidation();

const validatorForFormAdd =  new FormValidator (config, formAdd);
validatorForFormAdd.enableValidation();

popupAddOpenBtn.addEventListener('click', () => {
  validatorForFormAdd.resetValidation();
  openPopup(popupAdd);
});

popupEditOpenBtn.addEventListener('click', () => {
  validatorForFormEdit.resetValidation();
  openPopup(popupEdit);
  nameInput.value = profileName.textContent; // содержимое из имени(h1) и работы(p) присвоится соответствующим инпутам
  jobInput.value = job.textContent;
});

function addListenerToSubmitForm(form, submitFunc) { // фукнция добавления слушателя для submit формы
  form.addEventListener('submit', submitFunc); // form - сама форма, submitFunc - функция, которая выполнится
}

function submitFormEdit(evt) { // функция сохранения значений из инпутов
  evt.preventDefault();

  profileName.textContent = nameInput.value; // h1 и p присваиваются соответствующие значения из инпутов
  job.textContent = jobInput.value;

  closePopup(popupEdit); // вызываем функцию закрытия попапа, передаем параметр формы редактирования
}

function handleCardClick(name, link) {
  imageInPopupImage.src = link;
  imageInPopupImage.alt = name;
  headingInPopupImage.textContent = name;
  openPopup(popupImage);
}

function generateAndAddCard(cardInfo, position) {
  const card = new Card (cardInfo, '.card-template', handleCardClick);
  const cardElement = card.generateCard();

  if (position === 'begin') {
    cards.prepend(cardElement);
  } else {
    cards.append(cardElement);
  }
}

function submitFormAdd(evt) { // функция submit формы по добавлению карточек
  evt.preventDefault();

  generateAndAddCard({name: placeNameInput.value, link: placeLinkInput.value}, 'begin');

  evt.target.reset(); // очистка инпутов
  closePopup(popupAdd); // закрытие формы
}

addListenerToSubmitForm(formAdd, submitFormAdd); // вешаем слушатели для submit форм
addListenerToSubmitForm(formEdit, submitFormEdit);

initialCards.forEach((item) => {
  generateAndAddCard(item);
});
