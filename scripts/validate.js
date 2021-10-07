const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (formElement, inputElement, inputErrorClass, errorClass) => { // функция отображения ошибки (текст и нижняя рамка)
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // поиск инпута с ошибкой
  inputElement.classList.add(inputErrorClass); // добавляем нужный класс для стилизации инпута
  errorElement.textContent = inputElement.validationMessage; // наполняем спан текстовым содержимым, сообщение дефолтное
  errorElement.classList.add(errorClass); // показываем ошибку
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => { // обратная функция, скрытие ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = ''; // очищаем спан
  errorElement.classList.remove(errorClass);
};

const isInvalidInput = (inputList) => { // проверка валидности инпутов
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid; // будет искать первый true, когда valid вернет false
  });
};

const enableValidation = ({formSelector, ...rest}) => { // добавляем слушатели для каждой формы
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, rest);
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => { // функция вкл/откл кнопки
  if (isInvalidInput(inputList)) { // если хотя бы один инпут невалиден
    buttonElement.classList.add(inactiveButtonClass); // отключаем кнопку
    buttonElement.setAttribute('disabled', '');
  } else { // и наоборот включаем
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, {errorClass}) => { // функция отображения нижней рамки инпута и текста ошибки
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  };
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector)); // выбираем все инпуты одной формы
  const buttonElement = formElement.querySelector(submitButtonSelector); // выбираем кнопку одной формы
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => { // вешаем слушатель на ввод символов для каждого инпута
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, rest);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};
