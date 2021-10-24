import { initialCards } from './cards-array.js';
import { config } from './config.js'
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const ESC_CODE = 'Escape';
const popupEdit = document.querySelector('.popup_type_edit'); // находим элемент с классом popup_type_edit
const popupEditOpenBtn = document.querySelector('.profile__edit-button'); // находим кнопку редактирования
const popupAdd = document.querySelector('.popup_type_add'); // находим элемент с классом popup_type_add
const popupAddOpenBtn = document.querySelector('.profile__add-button'); // находим кнопку добавить карточку
const formAdd = document.querySelector('.popup_type_add') // находим форму добавления карточки
const placeNameInput = formAdd.querySelector('.popup__input_type_place-name') // находим инпут с названием места
const placeLinkInput = formAdd.querySelector('.popup__input_type_place-link') // находим инпут с линком картинки
const popupImage = document.querySelector('.popup_type_image'); // находим элемент с классом popup_type_image
const formEdit = document.querySelector('.popup__form_type_edit'); // находим форму c редактированием профиля
const profileName = document.querySelector('.profile__name'); // находим заголовок с именем
const job = document.querySelector('.profile__job'); // находим параграф с работой
const nameInput = formEdit.querySelector('.popup__input_type_name'); // находим инпут с именем
const jobInput = formEdit.querySelector('.popup__input_type_job'); // находим инпут с работой
const cards = document.querySelector('.places__cards'); // находим список карточек

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

function addListenersToCloseModal (modal) { // функция добавления слушателя для закрытия попапа
  modal.querySelector('.popup__close-button').addEventListener('click', () => closePopup(modal));
  modal.addEventListener('mousedown', (evt) => {
    if (evt.target == evt.currentTarget) closePopup(evt.target);
  })
}

addListenersToCloseModal(popupEdit);
addListenersToCloseModal(popupAdd);
addListenersToCloseModal(popupImage);

function addListenerToOpenModal(button, modal) { // функция добавления слушателя для открытия попапов
  button.addEventListener('click', () => openPopup(modal)); // button - на что вешается слушатель, modal - какой попап открывать
}

addListenerToOpenModal(popupAddOpenBtn, popupAdd); // вешаем слушатели для открытия попапов

popupEditOpenBtn.addEventListener('click', () => {
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

function submitFormAdd(evt) { // функция submit формы по добавлению карточек
  evt.preventDefault();

  const card = new Card ({name: placeNameInput.value, link: placeLinkInput.value}, '.card-template');
  const cardElement = card.generateCard();
  cards.prepend(cardElement);

  evt.target.reset(); // очистка инпутов
  evt.target.querySelector('.popup__button').setAttribute('disabled', ''); // отключаем кнопку
  closePopup(formAdd); // закрытие формы
}

addListenerToSubmitForm(formAdd, submitFormAdd); // вешаем слушатели для submit форм
addListenerToSubmitForm(formEdit, submitFormEdit);

initialCards.forEach((item) => {
  const card = new Card (item, '.card-template');
  const cardElement = card.generateCard();

  cards.append(cardElement);
});

const validatorForFormEdit = new FormValidator (config, formEdit);
validatorForFormEdit.enableValidation();

const validatorForFormAdd =  new FormValidator (config, formAdd);
validatorForFormAdd.enableValidation();
