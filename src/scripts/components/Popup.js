import { ESC_CODE } from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeBtn = this._popup.querySelector('.popup__close-image');
    this._keydownListenerBind = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._keydownListenerBind);
  }

  _handleEscClose(evt) {
    if (evt.key === ESC_CODE) {
    this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close-image')) {
        this.close();
      }
    });
    window.addEventListener('keydown', this._keydownListenerBind);
  }
}
