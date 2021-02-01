import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {initialCards, containerElements, popupPreview, popupPlace, addButton} from '../utils/constants.js';
// import {Popup} from '../components/Popup.js';
import {PopupWithImage} from "../components/PopupWithImage.js";
import {UserInfo} from "../components/UserInfo.js";
import {PopupWithForm} from "../components/PopupWithForm.js";

const popupUserData = document.querySelector('.popup-user');
const openButton = document.querySelector('.profile__edit-button');

const formUserData = document.querySelector('.popup__form-user-data');
const formPlace = document.querySelector('.popup__form-place');
const placeInput = document.querySelector('.popup__input-place-title');
const imageInput = document.querySelector('.popup__input-image');



const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: '.popup__button_submit_inactive',
  inputErrorClass: '.popup__input_type_error',
  errorClass: '.popup__input-error_active'
};
// экземпляр класса попап-превью
const popupWithImage = new PopupWithImage(popupPreview);
popupWithImage.setEventListeners();

function renderCard (cardItem)  {
  const card = new Card(cardItem, '.template_type_default', popupWithImage.open);
  const cardElement = card.generate();
  cardList.addItems(cardElement);
}
// добавление новой карточки
const popupAddNewCard = new PopupWithForm(popupPlace, (formValues) => {
  renderCard({
    name: formValues['place-title'],
    link: formValues.image
  });
});
popupAddNewCard.setEventListeners();

//создание карточек через класс Section
const cardList = new Section(
  {
    items: initialCards,
    renderer: renderCard
  },
  containerElements);
cardList.renderItems();

// добавление новой карточки
// function fillPopupPlace(evt) {
//   evt.preventDefault();
//   const newItem = {
//     name: placeInput.value,
//     link: imageInput.value
//   };
//   containerElements.prepend(createCard(newItem));
//   hidePopup(popupPlace);
// }

//перенесено в Popup
// function showPopup(elem) {
//   elem.classList.add('popup_opened');
//   document.addEventListener('keydown', closeByEscape);
// }

//перенесено в Popup
// function hidePopup(elem) {
//   elem.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeByEscape);
// }

// function fillPopupUserData() {
//   nameInput.value = name.textContent;
//   jobInput.value = job.textContent;
//   resetValidators();
//   showPopup(popupUserData);
// }
//
// function handleFormSubmit(evt) {
//   evt.preventDefault();
//   name.textContent = nameInput.value;
//   job.textContent = jobInput.value;
//   hidePopup(popupUserData);
// }
//
// openButton.addEventListener('click', fillPopupUserData);
//перенесено в Popup
// closeButtons.forEach((closeButton) => {
//   closeButton.addEventListener('click', function (event) {
//     const targetElement = event.target;
//     const targetBox = targetElement.closest('.popup');
//     hidePopup(targetBox);
//   });
// });
// formUserData.addEventListener('submit', handleFormSubmit);
addButton.addEventListener('click', () => {
  // formPlace.reset();
  resetValidators();
  // showPopup(popupPlace)
  popupAddNewCard.open();

});
// formPlace.addEventListener('submit', fillPopupPlace);

//перенесено в Popup
// закрытие попапа кликом на esc
// function closeByEscape(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened')
//     hidePopup(openedPopup);
//   }
// }

// закрытие попапа кликом на оверлей
// popupOverlays.forEach((popupOverlay) => {
//   popupOverlay.addEventListener('click', (event) => {
//     const targetElement = event.target;
//     hidePopup(targetElement);
//   });
// });

const validators = [];

function resetValidators() {
  validators.forEach(validator => {
    validator.resetValidation();
  });
}

// валидация форм
const forms = document.querySelectorAll(validationConfig.formSelector);
forms.forEach(form => {
  const validator = new FormValidator(validationConfig, form);
  validator.enableValidation();
  validators.push(validator);
});

