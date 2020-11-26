let popup = document.querySelector('.popup');
let openButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__profession');


function showPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

function hidePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  hidePopup();
}

openButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', hidePopup);
formElement.addEventListener('submit', formSubmitHandler);


