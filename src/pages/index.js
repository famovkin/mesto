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
import './index.css';

const validatorForFormEdit = new FormValidator (config, formEdit);
validatorForFormEdit.enableValidation();

const validatorForFormAdd =  new FormValidator (config, formAdd);
validatorForFormAdd.enableValidation();

// создаем экземпляр класса PopupWithImage, он отвечает за передачу заголовка и ссылки на фото в попап с изображением
const popupImage = new PopupWithImage('.popup_type_image');

popupImage.setEventListeners();

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

const cardList = new Section({ // создаем экземляр класса Section, который отвечает за добавление карточек в контейнере
  items: initialCards,
  renderer: (item) => { // в item приходит каждый элемент массива initialCards
    const cardElement = createCard(item); // в cardElement получим элемент карточки

    cardList.addItem(cardElement);
  }
}, '.places__cards');

cardList.renderItems(); // вызываем метод класса, отрисовываем карточки при загрузке страницы

const popupAddForm = new PopupWithForm({ // ребенок Popup, этот экземпляр отвечает за сабмит формы и ее сброс при закрытии
  popupSelector: '.popup_type_add',
  handleFormSubmit: formData => { // в formData мы получаем объект с ключами - имена инпутов, указанные в index.html, и значениями - value самих инпутов
    const addedCard = new Section({ // экземляр класса отвечает за отрисовку карточки с полученными данными
      items: [ {name: formData['place-name'], link: formData['place-link']} ], // в item передаем массив, состоящий из объекта,
      // значения которого мы берем из formData, обращаясь к его свойствам через квадратные скобки
      renderer: (item) => { // item - элемент массива из поля items
        const card = new Card({
          name: item.name,
          link: item.link,
          handleCardClick: (cardName, cardLink) => {
            popupImage.open(cardName, cardLink); // передаем ссылку на фото и заголовок при открытии попапа с изображением
          }
        }, '.card-template');
        const cardElement = card.generateCard();

        addedCard.addItem(cardElement);
      }
    }, '.places__cards', 'begin'); // последний параметр отвечает за отрисовку карточки в самом начале, без параметра карточка появится в конце
    popupAddForm.close(); // закрываем форму
    addedCard.renderItems(); // отрисовываем карточку
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
  handleFormSubmit: formData => { // в formData мы получается объект с ключами - имена инпутов, указанные в index.html, и значениями - value самих инпутов
    profileInfo.setUserInfo(formData.name, formData.job); // в параметрах метода те значения, которые мы установим на странице
    popupEditForm.close();
  }
});

popupEditForm.setEventListeners();

popupEditOpenBtn.addEventListener('click', () => {
  validatorForFormEdit.resetValidation()
  nameInput.value = profileInfo.getUserInfo()['name']; // заполняем поля инпутов текущими значениями, которые берем со страницы
  jobInput.value = profileInfo.getUserInfo()['job'];
  popupEditForm.open();
});
