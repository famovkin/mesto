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
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';

const validatorForFormEdit = new FormValidator (config, formEdit);
validatorForFormEdit.enableValidation();

const validatorForFormAdd =  new FormValidator (config, formAdd);
validatorForFormAdd.enableValidation();

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

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      name: item.name,
      link: item.link,
      handleCardClick: (cardName, cardlink) => {
        const popupImage = new PopupWithImage({ name: cardName, link: cardlink }, '.popup_type_image');
        popupImage.open();
        popupImage.setEventListeners();
      }
    }, '.card-template');
    const cardElement = card.generateCard();

    cardList.addItem(cardElement);
  }
}, '.places__cards');

cardList.renderItems();
