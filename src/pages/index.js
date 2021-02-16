import './index.css';
import {PopupWithImage} from "../components/PopupWithImage.js";
import {UserInfo} from "../components/UserInfo.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {Card} from "../components/Card.js";
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {
  // initialCards,
  containerElements,
  popupPreview,
  popupPlace,
  addButton,
  popupUserData, openButton, userName, userJob, validationConfig, previewImagePicture, previewTitle
} from '../utils/constants.js';
import {Api} from "../components/Api.js";

// запросы на сервер. задаем исходные параметры
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20/',
  headers: {
    authorization: 'b9b88552-735f-4768-bf07-4ff3fcde19d4',
    'Content-Type': 'application/json'
  }
});

// Попап увеличения изображения. экземпляр класса PopupWithImage
const popupWithImage = new PopupWithImage(popupPreview, previewImagePicture, previewTitle);
popupWithImage.setEventListeners();

// КАРТОЧКИ
let cardList
function renderCard(cardItem) {
  const card = new Card(cardItem, '.template_type_default', popupWithImage.open);
  const cardElement = card.generate();
  cardList.addItems(cardElement);
}

// добавление массива карточек с сервера
api
  .getInitialCards()
  .then((data) => {
    cardList = new Section(
      {
        items: data,
        renderer: renderCard
      },
      containerElements);
    cardList.renderItems();
  })
  .catch((err) => {
    console.log('error', err)
  });

// добавление новой карточки. экземпляр класса PopupWithForm
const popupAddNewCard = new PopupWithForm(popupPlace, (formValues) => {
  renderCard({
    name: formValues['place-title'],
    link: formValues.image
  });
});
popupAddNewCard.setEventListeners();

//кнопка добавления новой карточки
addButton.addEventListener('click', () => {
  validatorPlaceForm.resetValidation();
  popupAddNewCard.open();
});

// ПРОФИЛЬ

// подставляем изначальные данные пользователя с сервера
api
  .getProfileInfo()
  .then((data) => {
    userInfo.setUserInfo(data.name, data.about);
  })
  .catch((err) => {
    console.log('error', err)
  });

// экземпляр класса UserInfo. редактирование данных профиля
const userInfo = new UserInfo({name: userName, job: userJob});
const popupUserInfo = new PopupWithForm(popupUserData, (formValues) => {
  userInfo.setUserInfo(formValues.name, formValues.profession);
  api
    .editProfileInfo(formValues.name, formValues.profession)
    .catch((err) => {
      console.log('error', err)
    });
});
popupUserInfo.setEventListeners();

// кнопка редактирования профиля
openButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();

  popupUserInfo.setDefaultValues({
    name: data.name,
    profession: data.job
  });
  validatorUserForm.resetValidation();
  popupUserInfo.open();
});


//валидация форм
const validatorPlaceForm = new FormValidator(validationConfig, popupPlace);
validatorPlaceForm.enableValidation();

const validatorUserForm = new FormValidator(validationConfig, popupUserData);
validatorUserForm.enableValidation();








