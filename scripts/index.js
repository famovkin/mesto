let popup = document.querySelector('.popup');
let popupCloseBtn = popup.querySelector('.popup__close');
let popupOpenBtn = document.querySelector('.edit-button');
let likeButton = document.querySelectorAll('.like-button');

function popupToggle() {
  popup.classList.toggle('popup_opened');
};

function pressLike() {
  likeButton[i].classList.toggle('like-button_liked')
}

for(let i = 0; i < likeButton.length; i++) {
  function pressLike() {
    likeButton[i].classList.toggle('like-button_liked');
  }
  likeButton[i].addEventListener('click', pressLike);
}

function clickOverlay(event) {
  if (event.target === event.currentTarget) {
    popupToggle();
  };
};

popup.addEventListener('click', clickOverlay);
popupOpenBtn.addEventListener('click', popupToggle);
popupCloseBtn.addEventListener('click', popupToggle);


