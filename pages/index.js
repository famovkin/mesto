import {
  initialCards,
  config,
  popupEditOpenBtn,
  popupAddOpenBtn,
  ESC_CODE,
  popupAdd,
  formAdd,
  placeNameInput,
  placeLinkInput,
  popupImage,
  popupEdit,
  formEdit,
  profileName,
  job,
  nameInput,
  jobInput,
  cards,
  headingInPopupImage,
  imageInPopupImage,
  popups
} from '../scripts/utils/constants.js';
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';

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

function submitFormAdd(evt) { // функция submit формы по добавлению карточек
  evt.preventDefault();

  generateAndAddCard({name: placeNameInput.value, link: placeLinkInput.value}, 'begin');

  evt.target.reset(); // очистка инпутов
  closePopup(popupAdd); // закрытие формы
}

addListenerToSubmitForm(formAdd, submitFormAdd); // вешаем слушатели для submit форм
addListenerToSubmitForm(formEdit, submitFormEdit);
