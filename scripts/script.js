let popup = document.querySelector('.popup');
let openButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');
let Name = document.querySelector('.profile__name');
let Job = document.querySelector('.profile__profession');


function showPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = Name.textContent;
  jobInput.value = Job.textContent;
}

function hidePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  Name.textContent = nameInput.value;
  Job.textContent = jobInput.value;
}

openButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', hidePopup);
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', hidePopup);

