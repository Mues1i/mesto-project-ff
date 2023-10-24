const cardsList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard(cardItem, deleteCard) {
  const cardLi = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardLi.querySelector('.card__image');
  const cardNameImage = cardLi.querySelector('.card__title');
  const deleteButton = cardLi.querySelector('.card__delete-button');

  cardNameImage.textContent = cardItem.name;
  cardImage.alt = cardItem.name;
  cardImage.src = cardItem.link;

  //Удаление карточки
  deleteButton.addEventListener('click', deleteCard);
  
  return cardLi;
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