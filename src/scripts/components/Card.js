export default class Card {
  constructor({ name, link, id, whoLiked, ownerId }, { handleCardClick, handleDeleteBtnClick, handleLikeBtnClick }, cardSelector) {
    this._name = name;
    this._link = link;
    this._id = id;
    this.whoLiked = whoLiked;
    this._ownerId = ownerId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteBtnClick = handleDeleteBtnClick;
    this._handleLikeBtnClick = handleLikeBtnClick;
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

  generateCard({ isOwner, isLiked }) {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._counterOfLikes = this._element.querySelector('.card__like-counter');

    if (isOwner) {
      this._element.insertAdjacentHTML('afterbegin', '<button class="card__delete-button" type="button">');
      this._deleteButton = this._element.querySelector('.card__delete-button');
    }

    if (isLiked) {
      this._likeButton.classList.add('card__like-button_type_liked');
    }

    this._setEventListeners(isOwner);

    this._counterOfLikes.textContent = this.whoLiked.length;
    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }

  renderLikes(newArrayLikes, newValue) {
    this._likeButton.classList.toggle('card__like-button_type_liked');
    this._counterOfLikes.textContent = newValue;
    this.whoLiked = newArrayLikes;
  }

  _setEventListeners(isOwner) {
    if (isOwner) {
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteBtnClick(this._id, this._element);
      });
    }
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._likeButton.addEventListener('click', () => {
      this._handleLikeBtnClick(this._id);
    });
  }
}
