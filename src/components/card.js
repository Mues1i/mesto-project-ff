// Функция создания карточки
import { openModal } from './modal.js';
import {
  cardTemplate,
  popupImage,
  popupNameImage,
  popupCaptionImage
} from '../index.js';

export default function createCard(cardItem, handleDeleteCard, handleLikeCard, handleOpenPopupImage) {
  const cardElement = getCardTemplate();
  const cardImage = cardElement.querySelector('.card__image');
  const cardNameImage = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardNameImage.textContent = cardItem.name;
  cardImage.alt = cardItem.name;
  cardImage.src = cardItem.link;

  //Функционал клонирования шаблона
  function getCardTemplate() {
    return cardTemplate.querySelector('.card').cloneNode(true);
  }

  //Удаление карточки
  deleteButton.addEventListener('click', handleDeleteCard);
  
  //Поставить/удалить лайк
  function handleLikeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
  }
  
  likeButton.addEventListener('click', () => {
    handleLikeCard(likeButton);
  });
  
  //Открытие popup изображения
  function handleOpenPopupImage(cardItem) {
    openModal(popupImage);
    popupCaptionImage.textContent = cardItem.name;
    popupNameImage.alt = cardItem.name;
    popupNameImage.src = cardItem.link;
  }

  cardImage.addEventListener('click', () => {
    handleOpenPopupImage(cardItem);
  });

  return cardElement;
}