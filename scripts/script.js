let popupUserData = document.querySelector('.popup-user');
let popupPlace = document.querySelector('.popup-place');
let popupImage = document.querySelector('.popup-image');
let openButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let closeButtons = document.querySelectorAll('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-job');
let placeInput = document.querySelector('.popup__input-place-title');
let imageInput = document.querySelector('.popup__input-image');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__profession');
let image = document.querySelector('.elements__image');
let place = document.querySelector('.elements__title');


function showPopup(elem) {
  elem.classList.add('popup_opened');
}

function editPopupUserData() {
  showPopup(popupUserData);
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

function editPopupPlace() {
  showPopup(popupPlace);
  placeInput.value = place.textContent;
  imageInput.value = image.src;
}

function hidePopup() {
  popupUserData.classList.remove('popup_opened');
  popupPlace.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  hidePopup();
}

openButton.addEventListener('click', editPopupUserData);
addButton.addEventListener('click', editPopupPlace);

closeButtons.forEach((closeButton) => {
  closeButton.addEventListener('click', hidePopup);
})
formElement.addEventListener('submit', formSubmitHandler);


// создание галереи карточек
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

const containerElements = document.querySelector('.elements');
const templateElement = document.querySelector('.template');

function renderList() {
  const itemsList = initialCards.map(composeItem);
  containerElements.append(...itemsList);
}

function composeItem(item){
  const elementItem = templateElement.content.cloneNode(true);
  const elementsImage = elementItem.querySelector('.elements__image');
  const elementsTitle = elementItem.querySelector('.elements__title');
  elementsImage.src = item.link;
  elementsTitle.textContent = item.name;
  return elementItem;
}

renderList();







