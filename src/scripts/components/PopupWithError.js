import Popup from './Popup.js';

export default class PopupWithError extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._okButton = this._popup.querySelector('.popup__button');
    this._errorText = this._popup.querySelector('.popup__error-message');
    this._errorStatus = this._popup.querySelector('.popup__title-no-form');
  }

  open(error, status = '') {
    this._errorText.textContent = error;
    this._errorStatus.textContent = `Ошибка ${status}`;
    super.open();
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }
}
