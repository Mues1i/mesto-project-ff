import '../pages/index.css'; // добавьте импорт главного файла стилей
import initialCards from './cards';
import {
  openModal,
  closeModal,
  closePopupOnClickOverlay,
} from '../components/modal.js';

const cardsList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const popupImage = document.querySelector('.popup_type_image');
const popupNameImage = document.querySelector('.popup__image');
const popupCaptionImage = document.querySelector('.popup__caption');


// Функция создания карточки
function createCard(cardItem, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardNameImage = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardNameImage.textContent = cardItem.name;
  cardImage.alt = cardItem.name;
  cardImage.src = cardItem.link;

  //Удаление карточки
  deleteButton.addEventListener('click', deleteCard);

  //Лайк карточки
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  })
  
  //Открытие popup изображения
  cardImage.addEventListener('click', () => {
    openModal(popupImage);
    popupCaptionImage.textContent = cardItem.name;
    popupNameImage.alt = cardItem.name;
    popupNameImage.src = cardItem.link;
  })

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
const popupEdit = document.querySelector('.popup_type_edit');
const formElementEdit = popupEdit.querySelector('.popup__form');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_description');

const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__description');

function openPopupEdit(popupEdit) {
  openModal(popupEdit);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

//Слушатель открытия Popup Профиля
const editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', () => {
  openPopupEdit(popupEdit);
});

//Слушатель открытия Popup new-card
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');

addButton.addEventListener('click', () => {
  openModal(popupNewCard);
});

//Слушатель закрытия Popup кликом на оверлей и на крастик
const popupList = document.querySelectorAll('.popup')

popupList.forEach(popup => {
  popup.addEventListener('click', closePopupOnClickOverlay);
})

//Сохранение профиля
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeModal(popupEdit);
}

formElementEdit.addEventListener('submit', handleFormSubmitEdit)

//Функция сохранения карточки
const placesList = document.querySelector('.places__list');
const formElementCard = popupNewCard.querySelector('.popup__form');
const cardNameInput = formElementCard.querySelector('.popup__input_type_card-name');
const cardUrlInput = formElementCard.querySelector('.popup__input_type_url');

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

formElementCard.addEventListener('submit', handleFormSubmitCard);