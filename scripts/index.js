const popupEdit = document.querySelector('.popup_type_edit'); // находим элемент с классом popup_type_edit
const popupEditOpenBtn = document.querySelector('.profile__edit-button'); // находим кнопку редактирования
const popupAdd = document.querySelector('.popup_type_add'); // находим элемент с классом popup_type_add
const popupAddOpenBtn = document.querySelector('.profile__add-button'); // находим кнопку добавить карточку
const formAdd = document.querySelector('.popup_type_add') // находим форму добавления карточки
const placeNameInput = formAdd.querySelector('.popup__input_type_place-name') // находим инпут с названием места
const placeLinkInput = formAdd.querySelector('.popup__input_type_place-link') // находим инпут с линком картинки
const popupImage = document.querySelector('.popup_type_image'); // находим элемент с классом popup_type_image
const formEdit = document.querySelector('.popup__form_type_edit'); // находим форму c редактированием профиля
const profileName = document.querySelector('.profile__name'); // находим заголовок с именем
const job = document.querySelector('.profile__job'); // находим параграф с работой
const nameInput = formEdit.querySelector('.popup__input_type_name'); // находим инпут с именем
const jobInput = formEdit.querySelector('.popup__input_type_job'); // находим инпут с работой
const cards = document.querySelector('.places__cards'); // находим список карточек

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


function closePopup(modal) { // функция закрытия попапа
  modal.classList.remove('popup_opened'); // удаление класса, который отображает попап
}

function openPopup(modal) { // функция открытия попапа, в параметр modal передаем тип попапа
  modal.classList.add('popup_opened'); // попап становится видимым из-за display: flex
}

function addListenerToCloseModal (modal) { // функция добавления слушателя для закрытия попапа
  modal.querySelector('.popup__close-button').addEventListener('click', () => closePopup(modal));
}

addListenerToCloseModal(popupEdit);
addListenerToCloseModal(popupAdd);
addListenerToCloseModal(popupImage);

function addListenerToOpenModal(button, modal) { // функция добавления слушателя для открытия попапов
  button.addEventListener('click', () => openPopup(modal)); // button - на что вешается слушатель, modal - какой попап открывать
}

addListenerToOpenModal(popupAddOpenBtn, popupAdd); // вешаем слушатели для открытия попапов

popupEditOpenBtn.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent; // содержимое из имени(h1) и работы(p) присвоится соответствующим инпутам
  jobInput.value = job.textContent;
});

function addListenerToSubmitForm(form, submitFunc) { // фукнция добавления слушателя для submit формы
  form.addEventListener('submit', submitFunc); // form - сама форма, submitFunc - функция, которая выполнится
}

function openImage(evt) { // функция открытия фото из карточки
  openPopup(popupImage);
  popupImage.querySelector('.popup__heading').textContent = evt.target.parentElement.querySelector('.card__title').textContent; // вставляем текстовое содержимое h2 в попап
  popupImage.querySelector('.popup__image').src = evt.target.getAttribute('src'); // вставляем ссылку на фото в попап
  popupImage.querySelector('.popup__image').alt = evt.target.parentElement.querySelector('.card__title').textContent; // вставляем текстовое содержимое alt изображения
}

function deleteCard(evt) { // функция удаления карточки
  const card = evt.currentTarget.closest('.card'); // ищется ближайший родитель с классом card
  card.remove();
}

function pressLike(evt) { // функция лайка
  evt.currentTarget.classList.toggle('card__like-button_type_liked');
}

function setListenersToCard(card) { // функция добавления всех слушателей на карточку
  card.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  card.querySelector('.card__like-button').addEventListener('click', pressLike);
  card.querySelector('.card__image').addEventListener('click', openImage);
}

function createCard(name, link) { // функция создания карточки
  // клонируем шаблон карточки, параметр true говорит, что мы клонируем вместе с содержимым
  // получаем содержимое шаблона через свойство content
  const cardElement = document.querySelector('.card-template').content.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = name; // наполняем заголовок h2 из параметра name
  cardElement.querySelector('.card__image').src = link; // в img вставляем в атрибут src параметр link

  setListenersToCard(cardElement); // вызываем функцию, которая вешает слушатели на кнопки карточки

  return cardElement; // возвращаем полученную карточку
}

function addCard(container, cardElement, position = 'begin') { // функция добавления карточки в контейнер
  if (position === 'begin') container.prepend(cardElement); // проверка параметра position
  if (position == 'end') container.append(cardElement);
}

function submitFormEdit(evt) { // функция сохранения значений из инпутов
  evt.preventDefault();

  profileName.textContent = nameInput.value; // h1 и p присваиваются соответствующие значения из инпутов
  job.textContent = jobInput.value;

  closePopup(popupEdit); // вызываем функцию закрытия попапа, передаем параметр формы редактирования
}

function submitFormAdd(evt) { // функция submit формы по добавлению карточек
  evt.preventDefault();

  addCard(cards, createCard(placeNameInput.value, placeLinkInput.value)); // второй параметр не указан, используется дефолтное значение begin

  evt.target.reset(); // очистка инпутов
  closePopup(formAdd); // закрытие формы
}

addListenerToSubmitForm(formAdd, submitFormAdd); // вешаем слушатели для submit форм
addListenerToSubmitForm(formEdit, submitFormEdit);

initialCards.forEach((item) => {
  addCard(cards, createCard(item.name, item.link), 'end');
});
