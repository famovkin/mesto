const popupEdit = document.querySelector('.popup_type_edit'); // находим элемент с классом popup_type_edit
const popupEditCloseBtn = popupEdit.querySelector('.popup__close-button'); // находим кнопку закрытия у формы редактирования
const popupEditOpenBtn = document.querySelector('.profile__edit-button'); // находим кнопку редактирования
const popupAdd = document.querySelector('.popup_type_add'); // находим элемент с классом popup_type_add
const popupAddCloseBtn = popupAdd.querySelector('.popup__close-button'); // находим кнопку закрытия у формы добавления карточек
const popupAddOpenBtn = document.querySelector('.profile__add-button'); // находим кнопку добавить карточку
const formAdd = document.querySelector('.popup_type_add') // находим форму добавления карточки
const placeNameInput = formAdd.querySelector('.popup__input_type_place-name') // находим инпут с названием места
const placeLinkInput = formAdd.querySelector('.popup__input_type_place-link') // находим инпут с линком картинки
const popupImage = document.querySelector('.popup_type_image'); // находим элемент с классом popup_type_image
const popupImageCloseBtn = popupImage.querySelector('.popup__close-button'); // находим кнопку закрытия у попапа с фуллсайз фото
const formEdit = document.querySelector('.popup__form_type_edit'); // находим форму c редактированием профиля
const profileName = document.querySelector('.profile__name'); // находим заголовок с именем
const job = document.querySelector('.profile__job'); // находим параграф с работой
const nameInput = formEdit.querySelector('.popup__input_type_name'); // находим инпут с именем
const jobInput = formEdit.querySelector('.popup__input_type_job'); // находим инпут с работой

function openPopup(modal) { // функция открытия попапчика, в параметр modal передаем тип попапа
  modal.classList.add('popup_opened'); // попап становится видимым из-за display: flex
  if (modal.classList.contains('popup_type_edit')) { // если это форма редактирования, то (читай комментарий ниже)
    nameInput.value = profileName.textContent; // содержимое из имени(h1) и работы(p) присвается соответствующим инпутам
    jobInput.value = job.textContent;
  }
}

function closePopup(modal) { // функция закрытия попапчика, в параметр modal передаем тип попапа
  modal.classList.remove('popup_opened'); // попап снова невидим из-за display: none
}

function formSubmitEdit(evt) { // функция сохранения значений из инпутов
  evt.preventDefault();
  profileName.textContent = nameInput.value; // h1 и p присваиваются соответствующие значения из инпутов
  job.textContent = jobInput.value;
  closePopup(popupEdit); // вызываем функцию закрытия попапа, передаем параметр формы редатирования
}

popupEditOpenBtn.addEventListener('click', () => openPopup(popupEdit)); // слушатель на кнопке редактировать
popupEditCloseBtn.addEventListener('click', () => closePopup(popupEdit)); // слушатель на кнопке закрыть в попапе редактирования
popupAddOpenBtn.addEventListener('click', () => openPopup(popupAdd)); // слушатель на кнопке добавления карточки
popupAddCloseBtn.addEventListener('click', () => closePopup(popupAdd)); // слушатель на кнопке закрыть в попапе добавления карточки
popupImageCloseBtn.addEventListener('click', () => closePopup(popupImage));
formEdit.addEventListener('submit', formSubmitEdit); // слушатель submit на форме редактирования

const initialCards = [
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

const cards = document.querySelector('.places__cards'); // находим список карточек

function addCard(item, position = 'begin') { // функция добавления карточки, item - карточка, position - параметр, который определяет место добавления
  const cardTemplate = document.querySelector('.card-template').content; // находим шаблон карточки
  const cardElement = cardTemplate.cloneNode(true); // клонируем шаблон карточки, параметр true говорит, что мы клонируем вместе с содержимым

  cardElement.querySelector('.card__image').src = item.link; // в img (находим по классу) вставляем в атрибут src значение ключа link
  cardElement.querySelector('.card__title').textContent = item.name; // наполняем заголовок h2 (находим по классу) берем значение из ключа name

  setListenersToCard(cardElement); // вызываем функцию, которая вешает слушатели на кнопки карточки

  if (position === 'begin') cards.prepend(cardElement); // проверка параметра position
  if (position === 'end') cards.append(cardElement);
}

function formSubmitAdd(evt) { // функция сабмита формы по добавлению карточек
  evt.preventDefault();
  addCard({link: placeLinkInput.value, name: placeNameInput.value}); // второй параметр не указан, используется дефолтное значение begin
  placeLinkInput.value = ''; // очистка инпутов
  placeNameInput.value = '';
  closePopup(evt.currentTarget); // закрытие формы, обработчик висит на форме, поэтому currentTarget
}

formAdd.addEventListener('submit', formSubmitAdd);

function deleteCard(evt) { // функция удаления карточки
  const card = evt.currentTarget.closest('.card'); // ищется ближайший родитель с классом card
  card.remove();
}

function pressLike(evt) {
  evt.currentTarget.classList.toggle('card__like-button_type_liked');
}

function setListenersToCard(card) { // функция для добавления всех слушателей на карточку
  card.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  card.querySelector('.card__like-button').addEventListener('click', pressLike);
  card.querySelector('.card__image').addEventListener('click', openImage);
}

initialCards.forEach((item) => { // обход массива, в функции параметр item - каждый элемент массива
  addCard(item, 'end'); // параметр end - элементы добавляются с помощью append
});

function openImage(evt) {
  openPopup(popupImage);
  popupImage.querySelector('.popup__heading').textContent = evt.target.parentElement.querySelector('.card__title').textContent;
  popupImage.querySelector('.popup__image').src = evt.target.getAttribute('src');
}
