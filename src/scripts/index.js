import '../pages/index.css'; // добавьте импорт главного файла стилей
import initialCards from './cards';
import {
  openPopup,
  closePopup,
  closePopupOnClickOverlay,
} from '../components/modal.js';

const cardsList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard(cardItem, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardNameImage = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardNameImage.textContent = cardItem.name;
  cardImage.alt = cardItem.name;
  cardImage.src = cardItem.link;

  //Удаление карточки
  deleteButton.addEventListener('click', deleteCard);
  
  return cardElement;
}

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
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__description');

function openPopupEdit(popupEdit) {
  openPopup(popupEdit);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

//Слушатель открытия Popup Профиля
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');

editButton.addEventListener('click', () => {
  openPopupEdit(popupEdit);
});

//Слушатель открытия Popup new-card
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');

addButton.addEventListener('click', () => {
  openPopup(popupNewCard);
});

//Слушатель закрытия Popup кликом на оверлей и на крастик
const popupList = document.querySelectorAll('.popup')

popupList.forEach(popup => {
  popup.addEventListener('click', closePopupOnClickOverlay);
})

//Сохранение профиля
const formElementEdit = popupEdit.querySelector('.popup__form');

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEdit);
}

formElementEdit.addEventListener('submit', handleFormSubmitEdit)