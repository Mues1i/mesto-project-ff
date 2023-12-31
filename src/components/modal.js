//Универсальное открытие Popup
export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupKeyEsc);
}

//Универсальное закрытие Popup
export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupKeyEsc);
}

//Закрытие окна кликом на оверлей и на крестик
export function closePopupOnClickOverlay(evt) {
  if (evt.currentTarget === evt.target || evt.target.classList.contains("popup__close")) {
    closeModal(evt.currentTarget);
    }
}

//Закрытие окна по нажатию Esc
function closePopupKeyEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closeModal(popupOpened);
  }
}




