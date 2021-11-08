import budapest from '../../images/budapest.jpg';
import budapest2 from '../../images/budapest2.jpg';
import kaliningrad from '../../images/kaliningrad.jpg';
import thailand from '../../images/thailand.jpg';
import vietnam from '../../images/vietnam.jpg';
import vladimir from '../../images/vladimir.jpg';

export const initialCards = [
  {
    name: 'Владимир',
    link: vladimir
  },
  {
    name: 'Будапешт',
    link: budapest
  },
  {
    name: 'Калининград (Königsberg)',
    link: kaliningrad
  },
  {
    name: 'Будапешт',
    link: budapest2
  },
  {
    name: 'Тайланд',
    link: thailand
  },
  {
    name: 'Вьетнам',
    link: vietnam
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
export const formAdd = document.querySelector('.popup__form_type_add') // находим форму добавления карточки
export const formEdit = document.querySelector('.popup__form_type_edit'); // находим форму c редактированием профиля
export const nameInput = formEdit.querySelector('.popup__input_type_name'); // находим инпут с именем
export const jobInput = formEdit.querySelector('.popup__input_type_job'); // находим инпут с работой
