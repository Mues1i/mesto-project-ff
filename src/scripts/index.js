import '../pages/index.css'; // добавьте импорт главного файла стилей
import initialCards from './cards';

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