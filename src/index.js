import './pages/index.css'; // добавьте импорт главного файла стилей
import initialCards from './components/cards.js';
import createCard from './components/card.js';
import {
  openModal,
  closeModal,
  closePopupOnClickOverlay
} from './components/modal.js';
import { 
  enableValidation,
  clearValidation
} from './components/validation.js';

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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

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
};

// Вывод карточек на страницу
initialCards.forEach((card) => {
  placesList.append(createCard(card, handleDeleteCard, handleLikeCard, handleOpenPopupImage));
});

enableValidation(validationConfig);

//Слушатель открытия Popup Профиля
editButton.addEventListener('click', () => {
  clearValidation(formElementEdit, validationConfig);
  openPopupEdit(popupEdit);
});

//Слушатель открытия Popup new-card
addButton.addEventListener('click', () => {
  //clearValidation(formElementCard, validationConfig);
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