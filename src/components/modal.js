//Универсальное открытие Popup
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupKeyEsc);
}

//Универсальное закрытие Popup
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupKeyEsc);
}

//Закрытие окна кликом на оверлей и на крестик
export function closePopupOnClickOverlay(evt) {
  if (evt.currentTarget === evt.target || evt.target.classList.contains("popup__close")) {
    closePopup(evt.currentTarget);
    }
}

//Закрытие окна по нажатию Esc
export function closePopupKeyEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closePopup(popupOpened);
  }
}

/* //Слушатель открытия Popup new-card
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');

addButton.addEventListener('click', () => {
  openPopup(popupNewCard);
}); */




