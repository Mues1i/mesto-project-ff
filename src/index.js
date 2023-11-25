import './pages/index.css'; // добавьте импорт главного файла стилей
import initialCards from './components/cards.js';
import createCard from './components/card.js';
import {
  openModal,
  closeModal,
  closePopupOnClickOverlay,
} from './components/modal.js';

const popupList = document.querySelectorAll('.popup')

const cardsList = document.querySelector('.places__list');
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

const placesList = document.querySelector('.places__list');

//Функция удаления карточки
function deleteCard(event) {
  const cardElement = event.target.closest('.card');
  cardElement.remove();
}

// Вывод карточек на страницу
initialCards.forEach((card) => {
  cardsList.append(createCard(card, deleteCard));
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
  }));
  closeModal(popupNewCard);
  formElementCard.reset();
}

initialCards.forEach((card) => {
  placesList.append(createCard(card));
});

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