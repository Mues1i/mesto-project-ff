import './pages/index.css'; // добавьте импорт главного файла стилей
import initialCards from './components/cards.js';
import createCard from './components/card.js';
import {
  openModal,
  closeModal,
  closePopupOnClickOverlay,
} from './components/modal.js';

const popupList = document.querySelectorAll('.popup')
const placesList = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;

//const для popup image
export const popupImage = document.querySelector('.popup_type_image');
export const popupNameImage = document.querySelector('.popup__image');
export const popupCaptionImage = document.querySelector('.popup__caption');

//const для popup Edit
const popupEdit = document.querySelector('.popup_type_edit');
const formElementEdit = popupEdit.querySelector('.popup__form');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_description');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');

//const для popup newcard
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formElementCard = popupNewCard.querySelector('.popup__form');
const cardNameInput = formElementCard.querySelector('.popup__input_type_card-name');
const cardUrlInput = formElementCard.querySelector('.popup__input_type_url');

//Функция удаления карточки
function handleDeleteCard(event) {
  const cardElement = event.target.closest('.card');
  cardElement.remove();
}

//Поставить/удалить лайк
function handleLikeCard(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

  //Открытие popup изображения
function handleOpenPopupImage(cardItem) {
  openModal(popupImage);
  popupCaptionImage.textContent = cardItem.name;
  popupNameImage.alt = cardItem.name;
  popupNameImage.src = cardItem.link;
}

// Вывод карточек на страницу
initialCards.forEach((card) => {
  placesList.append(createCard(card, handleDeleteCard, handleLikeCard, handleOpenPopupImage));
});

//Открытие popup профиля
function openPopupEdit(popupEdit) {
  openModal(popupEdit);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

//Сохранение профиля
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeModal(popupEdit);
}

//Функция сохранения карточки
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  placesList.prepend(createCard({
    name: cardNameInput.value,
    link: cardUrlInput.value
  }, handleDeleteCard, handleLikeCard, handleOpenPopupImage));
  closeModal(popupNewCard);
  formElementCard.reset();
}

//Слушатель открытия Popup Профиля
editButton.addEventListener('click', () => {
  openPopupEdit(popupEdit);
});

//Слушатель открытия Popup new-card
addButton.addEventListener('click', () => {
  openModal(popupNewCard);
});

//Слушатель закрытия Popup кликом на оверлей и на крастик
popupList.forEach(popup => {
  popup.addEventListener('click', closePopupOnClickOverlay);
})

//Сохранение popup Edit
formElementEdit.addEventListener('submit', handleFormSubmitEdit)

//Сохранение карточки
formElementCard.addEventListener('submit', handleFormSubmitCard);

// ВАЛИДАЦИЯ
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

//Добавление класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

//Удаление класса с ошибкой
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

//Проверка валидности поля
const isValid = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig)
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

enableValidation(validationConfig);