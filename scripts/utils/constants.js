export const initialCards = [
  {
    name: 'Владимир',
    link: './images/vladimir.jpg'
  },
  {
    name: 'Будапешт',
    link: './images/budapest.jpg'
  },
  {
    name: 'Калининград (Königsberg)',
    link: './images/kaliningrad.jpg'
  },
  {
    name: 'Будапешт',
    link: './images/budapest2.jpg'
  },
  {
    name: 'Тайланд',
    link: './images/thailand.jpg'
  },
  {
    name: 'Вьетнам',
    link: './images/vietnam.jpg'
  }
];

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const popupEditOpenBtn = document.querySelector('.profile__edit-button'); // находим кнопку редактирования
export const popupAddOpenBtn = document.querySelector('.profile__add-button'); // находим кнопку добавить карточку
export const ESC_CODE = 'Escape';
export const popupAdd = document.querySelector('.popup_type_add'); // находим попап с классом popup_type_add
export const formAdd = document.querySelector('.popup__form_type_add') // находим форму добавления карточки
export const placeNameInput = formAdd.querySelector('.popup__input_type_place-name') // находим инпут с названием места
export const placeLinkInput = formAdd.querySelector('.popup__input_type_place-link') // находим инпут с линком картинки
export const popupImage = document.querySelector('.popup_type_image'); // находим элемент с классом popup_type_image
export const popupEdit = document.querySelector('.popup_type_edit'); // находим элемент с классом popup_type_edit
export const formEdit = document.querySelector('.popup__form_type_edit'); // находим форму c редактированием профиля
export const profileName = document.querySelector('.profile__name'); // находим заголовок с именем
export const job = document.querySelector('.profile__job'); // находим параграф с работой
export const nameInput = formEdit.querySelector('.popup__input_type_name'); // находим инпут с именем
export const jobInput = formEdit.querySelector('.popup__input_type_job'); // находим инпут с работой
export const cards = document.querySelector('.places__cards'); // находим список карточек
export const headingInPopupImage = popupImage.querySelector('.popup__heading');
export const imageInPopupImage = popupImage.querySelector('.popup__image');
export const popups = document.querySelectorAll('.popup');
