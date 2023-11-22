//Универсальное открытие Popup
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupKeyEsc);
}

//Открытие popup профиля
const popupNameInputEdit = document.querySelector('.popup__input_type_name');
const popupDescriptionInputEdit = document.querySelector('.popup__input_type_description');

const nameProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

export function openPopupEdit(popupEdit) {
  openPopup(popupEdit);
  popupNameInputEdit.value = nameProfile.textContent;
  popupDescriptionInputEdit.value = descriptionProfile.textContent;
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




