import {
  config,
  popupEditOpenBtn,
  popupAddOpenBtn,
  formAdd,
  formEdit,
  formUpdateAvatar,
  nameInput,
  jobInput,
  editPopupSubmitBtn
} from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
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

function checkCardStatus (userId, likesInfo, ownerUserId) {
  const status = {}; // объект для результата
  const arrayOfLikedUsersd = likesInfo.map(info => info['_id']); // создаем массив из id пользователей, поставивших лайк
  status['isLiked'] = arrayOfLikedUsersd.some(people => userId === people); // ищем пользователя в массиве выше
  status['isOwner'] = userId === ownerUserId; // сравнимаем id пользователя и id автора
  return status;
}

function createCard(item) { // функция для создания и возвращения карточки
  const card = new Card({
    name: item.name,
    link: item.link,
    handleCardClick: (cardName, cardlink) => { // в handleCardClick приходят параметры (cardName, cardlink), переданные в конструктор Card - item.name и item.link
      popupImage.open(cardName, cardlink); // открываем попап, передавая в него нужные параметры
    }
  }, '.card-template');
  const cardElement = card.generateCard(); // при генерации карточки, вешаются слушатели на ее элементы,
  // при нажатии на картинку вызывается handleCardClick, который мы описали выше
  return cardElement;
}

const popupAddForm = new PopupWithForm({ // ребенок Popup, этот экземпляр отвечает за сабмит формы и ее сброс при закрытии
  popupSelector: '.popup_type_add',
  handleFormSubmit: formData => { // в formData мы получаем объект с ключами - имена инпутов, указанные в index.html, и значениями - value самих инпутов
    const addedCardElement = createCard({ name: formData['place-name'], link: formData['place-link'] });
    // в параметрах createCard объект с данными добавляемой карточки
    cardList.addItem(addedCardElement, 'begin'); // второй параметр отвечает за отрисовку карточки в самом начале, без параметра карточка появится в конце
    popupAddForm.close(); // закрываем форму
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
    api.editUserInfo(formUserInfo)
      .then(serverUserInfo => { // ответ от сервера с данными о пользователе
        profileInfo.setUserInfo(serverUserInfo);
        popupEditForm.close();
      })
      .catch(err => console.log(err)) // обработчик ошибки
      .finally(() => showStatusLoading(editPopupSubmitBtn, false)); // скрыть прелоадер
  },
  renderLoading: showStatusLoading
});

popupEditForm.setEventListeners();

popupEditOpenBtn.addEventListener('click', () => {
  validatorForFormEdit.resetValidation()
  nameInput.value = profileInfo.getUserInfo()['name']; // заполняем поля инпутов текущими значениями, которые берем со страницы
  jobInput.value = profileInfo.getUserInfo()['job'];
  popupEditForm.open();
});

function showStatusLoading(buttonElement, isLoading) {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = 'Сохранить';
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30/',
  headers: {
    authorization: 'f8d069a4-3828-4aef-8f1b-77976b73046b',
    'Content-Type': 'application/json'
    }
  },
  showStatusLoading
);

const cardList = new Section({ // создаем экземляр класса Section, который отвечает за добавление карточек в контейнере
  renderer: item => { // в item приходит каждый элемент массива
    const cardElement = (item) => {}; // в cardElement получим элемент карточки
    cardList.addItem(cardElement); // добавляем в DOM
  }
}, '.places__cards');

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
  ])
  .then(res => {
    userId = res._id; // получаем id пользователя
    profileInfo.setUserInfo(res[0]); // в res[0] результат первого промиса в массиве, аналогично с остальными
    cardList.renderItems(res[1]); // вызываем метод класса, отрисовываем карточки при загрузке страницы
  })
  .catch(err => console.log(err));
