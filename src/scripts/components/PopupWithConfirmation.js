import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  getDelCardInfo(id, element) {
    this._deleteCardInfo = { cardId: id, cardElement: element };
  }

  setEventListeners() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._deleteCardInfo);
    });
    super.setEventListeners();
  }
}
