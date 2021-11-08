export default class Card {
constructor({ name, link, handleCardClick }, cardSelector) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
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
    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__delete-button');

    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }

  _handleDeleteBtnClick() {
    this._element.remove();
  }

  _handleLikeBtnClick() {
    this._likeButton.classList.toggle('card__like-button_type_liked');
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteBtnClick();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._likeButton.addEventListener('click', () => {
      this._handleLikeBtnClick();
    });
  }
}
