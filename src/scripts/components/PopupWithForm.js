import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
    this._submitListenerBind = (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    }
  }

  close() {
    this._form.reset();
    super.close();
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submitListenerBind);
    super.setEventListeners();
  }
}
