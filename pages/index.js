import {
  initialCards,
  config,
  popupEditOpenBtn,
  popupAddOpenBtn,
  formAdd,
  formEdit,
  nameInput,
  jobInput
} from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

const validatorForFormEdit = new FormValidator (config, formEdit);
validatorForFormEdit.enableValidation();

const validatorForFormAdd =  new FormValidator (config, formAdd);
validatorForFormAdd.enableValidation();

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

const popupAddForm = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: formData => {
    const addedCard = new Section({
      items: [ {name: formData['place-name'], link: formData['place-link']} ],
      renderer: (item) => {
        const card = new Card({
          name: item.name,
          link: item.link,
          handleCardClick: (cardName, cardLink) => {
            const popupImage = new PopupWithImage({ name: cardName, link: cardLink }, '.popup_type_image');
            popupImage.open();
            popupImage.setEventListeners();
          }
        }, '.card-template');
        const cardElement = card.generateCard();

        addedCard.addItem(cardElement);
      }
    }, '.places__cards', 'begin');
    popupAddForm.close();
    addedCard.renderItems();
  }
});

popupAddOpenBtn.addEventListener('click', () => {
  validatorForFormAdd.resetValidation()
  popupAddForm.open();
  popupAddForm.setEventListeners();
});

const profileInfo = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__job' });

const popupEditForm = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: formData => {
    profileInfo.setUserInfo(formData.name, formData.job);
    popupEditForm.close();
  }
});

popupEditOpenBtn.addEventListener('click', () => {
  validatorForFormEdit.resetValidation()
  nameInput.value = profileInfo.getUserInfo()['name'];
  jobInput.value = profileInfo.getUserInfo()['job'];
  popupEditForm.open();
  popupEditForm.setEventListeners();
});
