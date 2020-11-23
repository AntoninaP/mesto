//открытие-закрытиы popap
let openButton = document.querySelector('.profile__pencil');
openButton.addEventListener('click', showPopap);

function showPopap() {
  let popap = document.querySelector('.popap');
  popap.classList.add('popap_opened');
}

let closeButton = document.querySelector('.popap__close-ico');
closeButton.addEventListener('click', hidePopap)

function hidePopap() {
  let popap = document.querySelector('.popap');
  popap.classList.remove('popap_opened');
}

// вызов лайка в виде черного сердечка по клику
let Like = document.querySelector('.elements__like');
Like.addEventListener('click', putLike);

function putLike() {
  Like.src = 'images/heart-black.png'
}

// изменение данных профиля
let formElement = document.querySelector('.popap__form');

function formSubmitHandler(evt) {
  evt.preventDefault();


  let nameInput = document.querySelector('.popap__input-name');
  let jobInput = document.querySelector('.popap__input-job');


  let newName = document.querySelector('.profile__name');
  let newJob = document.querySelector('.profile__profession');
  newName.textContent = nameInput.value;
  newJob.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);

