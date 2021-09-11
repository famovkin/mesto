let popup = document.querySelector('.popup');
let popupCloseBtn = popup.querySelector('.popup__close');
let popupOpenBtn = document.querySelector('.profile__edit-button');

function popupToggle() {
  popup.classList.toggle('popup_opened');
};

function clickOverlay(event) {
  debugger
  if (event.target === event.currentTarget) {
    popupToggle();
  };
};

popup.addEventListener('click', clickOverlay)
popupOpenBtn.addEventListener('click', popupToggle);
popupCloseBtn.addEventListener('click', popupToggle);
