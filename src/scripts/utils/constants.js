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
export const formUpdateAvatar = document.querySelector('.popup__form_type_update-avatar');
export const nameInput = formEdit.querySelector('.popup__input_type_name'); // находим инпут с именем
export const jobInput = formEdit.querySelector('.popup__input_type_job'); // находим инпут с работой
export const editPopupSubmitBtn = formEdit.querySelector('.popup__button');
