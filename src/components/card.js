// Функция создания карточки
import { cardTemplate } from '../index.js';

export default function createCard(cardItem, deleteHandler, likeHandler, openImageHandler) {
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
  deleteButton.addEventListener('click', deleteHandler); //Удаление карточки тоже объявил в глобальной области
  
  likeButton.addEventListener('click', likeHandler);

  cardImage.addEventListener('click', () => {
    openImageHandler(cardItem);
  });

  return cardElement;
}