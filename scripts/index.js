import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const popupUserData = document.querySelector('.popup-user');
const popupPlace = document.querySelector('.popup-place');
const popupPreview = document.querySelector('.popup-preview');
const openButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const formUserData = document.querySelector('.popup__form-user-data');
const formPlace = document.querySelector('.popup__form-place');
const nameInput = document.querySelector('.popup__input-name');
const jobInput = document.querySelector('.popup__input-job');
const placeInput = document.querySelector('.popup__input-place-title');
const imageInput = document.querySelector('.popup__input-image');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__profession');
const containerElements = document.querySelector('.elements');
const popupOverlays = document.querySelectorAll('.popup');
const previewImagePicture = popupPreview.querySelector('.popup__image');
const previewTitle = popupPreview.querySelector('.popup__preview-title');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

function createCard(data) {
  const card = new Card(data, '.template_type_default', handleCardClick);
  const cardElement = card.generate();
  return cardElement;
}

//создание карточек из всех элементов массива и публикация в DOM
initialCards.forEach((data) => {
  containerElements.append(createCard(data));
});

// попап превью изображения
function handleCardClick(image, title) {
  previewImagePicture.src = image;
  previewTitle.textContent = title;
  showPopup(popupPreview);
}

// добавление новой карточки
function fillPopupPlace(evt) {
  evt.preventDefault();
  const newItem = {
    name: placeInput.value,
    link: imageInput.value
  };
  containerElements.prepend(createCard(newItem));
  hidePopup(popupPlace);
}


function showPopup(elem) {
  elem.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  resetValidators();
}

function hidePopup(elem) {
  elem.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function fillPopupUserData() {
  showPopup(popupUserData);
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  hidePopup(popupUserData);
}

openButton.addEventListener('click', fillPopupUserData);
closeButtons.forEach((closeButton) => {
  closeButton.addEventListener('click', function (event) {
    const targetElement = event.target;
    const targetBox = targetElement.closest('.popup');
    hidePopup(targetBox);
  });
});
formUserData.addEventListener('submit', handleFormSubmit);
addButton.addEventListener('click', () => {
  formPlace.reset();
  showPopup(popupPlace)
});
formPlace.addEventListener('submit', fillPopupPlace);

// закрытие попапа кликом на esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    hidePopup(openedPopup);
  }
}

// закрытие попапа кликом на оверлей
popupOverlays.forEach((popupOverlay) => {
  popupOverlay.addEventListener('click', (event) => {
    const targetElement = event.target;
    hidePopup(targetElement);
  });
});

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

