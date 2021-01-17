import {Card} from './card.js';

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
// const templateElement = document.querySelector('.template');
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

//создание карточек из всех элементов массива и публикация в DOM
initialCards.forEach((data) => {
  const card = new Card(data);
  const cardElement = card.generate();
  containerElements.append(cardElement);
});

// добавление новой карточки
function fillPopupPlace(evt) {
  evt.preventDefault();
  const newItem = {
    name: placeInput.value,
    link: imageInput.value
  };
  const card = new Card(newItem);
  const newCard = card.generate();
  containerElements.prepend(newCard);
  hidePopup(popupPlace);
}

function showPopup(elem) {
  elem.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
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


// создание галереи карточек
// function renderList() {
//   const itemsList = initialCards.map(composeItem);
//   containerElements.append(...itemsList);
// }

// создание карточки из template
// function composeItem(item) {
// const elementItem = templateElement.content.cloneNode(true);
const elementsImage = elementItem.querySelector('.elements__image');
elementsImage.addEventListener('click', () => {
  previewImage(item)
// });
// const elementsTitle = elementItem.querySelector('.elements__title');
// const deliteItem = elementItem.querySelector('.elements__button-delite');
// deliteItem.addEventListener('click', removeItem);
// const likeItem = elementItem.querySelector('.elements__button-like');
// likeItem.addEventListener('click', giveLike);
// elementsImage.src = item.link;
// elementsImage.alt = item.name;
// elementsTitle.textContent = item.name;
// return elementItem;
// }

  //попап увеличения изображения
  function previewImage(item) {
    previewImagePicture.src = item.link;
    previewTitle.textContent = item.name;
    showPopup(popupPreview);
  }


// //удаление карточки
// function removeItem(event) {
//   const targetElement = event.target;
//   const targetItem = targetElement.closest('.elements__item');
//   targetItem.remove();
// }

// //добавлениe и удаление лайка
// function giveLike(event) {
//   event.target.classList.toggle('elements__button-like_black');
// }



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

renderList();
