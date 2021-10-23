export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;

    return this._element;
  }

  _handleDeleteBtnClick() {
    this._element.remove();
  }

  _handleImageClick() {
    document.querySelector('.popup_type_image').classList.add('popup_opened');
  }

  _handleLikeBtnClick() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_type_liked');
  }

  _setEventListeners() {
    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._handleDeleteBtnClick();
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleImageClick();
    });
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._handleLikeBtnClick();
    });
  }
}
