import {
  config,
  popupEditOpenBtn,
  popupAddOpenBtn,
  formAdd,
  formEdit,
  formUpdateAvatar,
  nameInput,
  jobInput,
  editPopupSubmitBtn,
  confirmPopupBtn,
  addPopupSubmitBtn,
  updateAvatarButton,
  updateAvatarSubmitBtn,
  profileAvatar
} from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import PopupWithError from '../scripts/components/PopupWithError.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import './index.css';

const validatorForFormEdit = new FormValidator (config, formEdit);
validatorForFormEdit.enableValidation();

const validatorForFormAdd =  new FormValidator (config, formAdd);
validatorForFormAdd.enableValidation();

const validatorForFormUpdateAvatar =  new FormValidator (config, formUpdateAvatar);
validatorForFormUpdateAvatar.enableValidation();

// создаем экземпляр класса PopupWithImage, он отвечает за передачу заголовка и ссылки на фото в попап с изображением
const popupImage = new PopupWithImage('.popup_type_image');

popupImage.setEventListeners();

let userId;

function isUserInLikesArray (array, userId) {
  const arrayOfLikedUsers = array.map(info => info['_id']); // создаем массив из id пользователей, поставивших лайк
  return arrayOfLikedUsers.some(people => userId === people); // ищем пользователя в массиве выше, возвращаем булево значение
}

function checkCardStatus (userId, likesInfo, ownerUserId) {
  const status = {}; // объект для результата
  status['isLiked'] = isUserInLikesArray(likesInfo, userId)
  status['isOwner'] = userId === ownerUserId; // сравнимаем id пользователя и id автора
  return status;
}

function showStatusLoading(buttonElement, isLoading, initialText) {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = initialText;
  }
}

function createCard(item) { // функция для создания и возвращения карточки
  const card = new Card({
    name: item.name,
    link: item.link,
    id: item._id,
    whoLiked: item.likes,
    ownerId: item.owner._id
    },
    {
      handleCardClick: (cardName, cardlink) => popupImage.open(cardName, cardlink),
      handleDeleteBtnClick: (cardId, cardElement) => {
        confirmPopup.open();
        confirmPopup.getDelCardInfo(cardId, cardElement);
      },
      handleLikeBtnClick: cardId => {
        if (isUserInLikesArray(card.whoLiked, userId)) { // проверяем стоит ли лайк от пользователя
          api.removeLike(cardId) // вызывает лайк или дизлайк
          .then(res => {
            card.renderLikes(res.likes, res.likes.length); // отрисовываем изменения
          })
          .catch(err => errorPopup.open(err));
        } else {
          api.pressLike(cardId)
          .then(res => {
            card.renderLikes(res.likes, res.likes.length);
          })
          .catch(err => errorPopup.open(err));
        }
      }
    }, '.card-template');
  const cardElement = card.generateCard(checkCardStatus(userId, item.likes, item.owner._id));
  // в generateCard придет объект с 2 булевыми значениями
  return cardElement;
}

const popupAddForm = new PopupWithForm({ // ребенок Popup, этот экземпляр отвечает за сабмит формы и ее сброс при закрытии
  popupSelector: '.popup_type_add',
  handleFormSubmit: formData => { // в formData мы получаем объект с ключами - имена инпутов, указанные в index.html, и значениями - value самих инпутов
    showStatusLoading(addPopupSubmitBtn, true); // показываем прелоадер
    new Promise((resolve, reject) => { // проверяем есть ли картинка по урлу
      const image = document.createElement('img');
      image.src = formData['place-link'];
      image.addEventListener('load', () => resolve(formData)); // пробрасываем данные, если все ок
      image.addEventListener('error', () => reject());
    })
      .then((formData) => {
        api.addNewCard({ name: formData['place-name'], link: formData['place-link'] })
          .then(serverCardInfo => { // данные с сервера о добавленной карточке
            const cardElementFromForm = createCard(serverCardInfo); // создаем элемент
            cardList.addItem(cardElementFromForm, 'begin'); // без второго параметра карточка появится в конце
          })
          .catch(err => errorPopup.open(err));
      })
      .catch(() => errorPopup.open('Что-то не так с фотографией, попробуйте загрузить другую'))
      .finally(() => {
        showStatusLoading(addPopupSubmitBtn, false, popupAddForm.initialTextButton); // убираем прелоадер
        popupAddForm.close();
      });
  }
});

popupAddForm.setEventListeners(); // вешаем слушатели на форму

popupAddOpenBtn.addEventListener('click', () => { // слушатель на кнопку плюс
  validatorForFormAdd.resetValidation() // сбрасываем валидацию, чтобы стереть предыдущие ошибки, если они были
  popupAddForm.open(); // открываем форму
});

// создаем экземпляр класса UserInfo, он отвечает за отображение информации о пользователе на странице
const profileInfo = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__job' });

const popupEditForm = new PopupWithForm({ // ребенок Popup, этот экземпляр отвечает за сабмит формы и ее сброс при закрытии
  popupSelector: '.popup_type_edit',
  handleFormSubmit: formUserInfo => { // в formUserInfo мы получаем объект с ключами - имена инпутов, указанные в index.html, и значениями - value самих инпутов
    showStatusLoading(editPopupSubmitBtn, true);
    api.editUserInfo(formUserInfo)
      .then(serverUserInfo => { // ответ от сервера с данными о пользователе
        profileInfo.setUserInfo(serverUserInfo);
      })
      .catch(err => errorPopup.open(err))
      .finally(() => {
        showStatusLoading(editPopupSubmitBtn, false, popupEditForm.initialTextButton);
        popupEditForm.close();
      });
  }
});

popupEditForm.setEventListeners();

popupEditOpenBtn.addEventListener('click', () => {
  validatorForFormEdit.resetValidation();
  nameInput.value = profileInfo.getUserInfo()['name']; // заполняем поля инпутов текущими значениями, которые берем со страницы
  jobInput.value = profileInfo.getUserInfo()['job'];
  popupEditForm.open();
});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30/',
  headers: {
    authorization: 'f8d069a4-3828-4aef-8f1b-77976b73046b',
    'Content-Type': 'application/json'
    }
  },
  showStatusLoading,
  (textError, statusError) => { // функция отображения попапа с ошибкой от сервера
    errorPopup.open(textError, statusError);
  }
);

const cardList = new Section({ // создаем экземляр класса Section, который отвечает за добавление карточек в контейнере
  renderer: item => { // в item приходит каждый элемент массива
    const cardElement = createCard(item); // в cardElement получим элемент карточки
    cardList.addItem(cardElement); // добавляем в DOM
  }
}, '.places__cards');

Promise.all([
  api.getUserInfo(), // запрос на данные профиля
  api.getInitialCards() // и на массив карточек
  ])
    .then(res => {
      profileAvatar.src = res[0].avatar;
      userId = res[0]._id; // получаем id пользователя
      profileInfo.setUserInfo(res[0]); // в res[0] результат первого промиса в массиве, аналогично с остальными
      cardList.renderItems(res[1]); // вызываем метод класса, отрисовываем карточки при загрузке страницы
    })
    .catch(err => errorPopup.open(err));

const confirmPopup = new PopupWithConfirmation({
  popupSelector: '.popup_type_confirm',
  handleFormSubmit: ({ cardId, cardElement }) => {
    showStatusLoading(confirmPopupBtn, true);
    api.deleteCard(cardId)
      .then(() => {
        cardElement.remove();
      })
      .catch(err => errorPopup.open(err))
      .finally(() => {
        showStatusLoading(confirmPopupBtn, false, confirmPopup.initialTextButton);
        confirmPopup.close();
      });
  }
});

confirmPopup.setEventListeners();

const updateAvatarForm = new PopupWithForm({
  popupSelector: '.popup_type_update-avatar',
  handleFormSubmit: formAvatarInfo => {
    showStatusLoading(updateAvatarSubmitBtn, true);
    new Promise((resolve, reject) => {
      const image = document.createElement('img');
      image.src = formAvatarInfo['avatar-link'];
      image.addEventListener('load', () => resolve(formAvatarInfo));
      image.addEventListener('error', () => reject());
    })
      .then(formAvatarInfo => {
        api.updateProfileAvatar(formAvatarInfo['avatar-link'])
          .then(serverAvatarInfo => {
            profileAvatar.src = serverAvatarInfo.avatar;
          })
          .catch(err => errorPopup.open(err))
      })
      .catch(() => errorPopup.open('Что-то не так с аватаркой, попробуйте загрузить другую'))
      .finally(() => {
        showStatusLoading(updateAvatarSubmitBtn, false);
        updateAvatarForm.close();
      });
  }
});

updateAvatarForm.setEventListeners();

updateAvatarButton.addEventListener('click', () => {
  validatorForFormUpdateAvatar.resetValidation();
  updateAvatarForm.open();
});

const errorPopup = new PopupWithError('.popup_type_error');

errorPopup.setEventListeners();
