// Функция создания карточки
import { openModal } from './modal.js';
import {
  cardTemplate,
  popupImage,
  popupNameImage,
  popupCaptionImage
} from '../index.js';

export default function createCard(cardItem, deleteCard) {
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