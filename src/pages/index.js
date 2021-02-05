import './index.css';
import {PopupWithImage} from "../components/PopupWithImage.js";
import {UserInfo} from "../components/UserInfo.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {Card} from "../components/Card.js";
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {
  initialCards,
  containerElements,
  popupPreview,
  popupPlace,
  addButton,
  popupUserData, openButton, userName, userJob, validationConfig, previewImagePicture, previewTitle
} from '../utils/constants.js';

// Попап увеличения изображения. экземпляр класса PopupWithImage
const popupWithImage = new PopupWithImage(popupPreview, previewImagePicture, previewTitle);
popupWithImage.setEventListeners();

function renderCard(cardItem) {
  const card = new Card(cardItem, '.template_type_default', popupWithImage.open);
  const cardElement = card.generate();
  cardList.addItems(cardElement);
}

// добавление новой карточки. экземпляр класса PopupWithForm
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

// экземпляр класса UserInfo. редактирование данных профиля
const userInfo = new UserInfo({name: userName, job: userJob});
const popupUserInfo = new PopupWithForm(popupUserData, (formValues) => {
  userInfo.setUserInfo(formValues.name, formValues.profession);
});
popupUserInfo.setEventListeners();

//кнопка редактирования профиля
openButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  popupUserInfo.setDefaultValues({
    name: data.name,
    profession: data.job
  });
  validatorUserForm.resetValidation();
  popupUserInfo.open();
});

//кнопка добавления новой карточки
addButton.addEventListener('click', () => {
  validatorPlaceForm.resetValidation();
  popupAddNewCard.open();
});

//валидация форм
const validatorPlaceForm = new FormValidator(validationConfig, popupPlace);
validatorPlaceForm.enableValidation();

const validatorUserForm = new FormValidator(validationConfig, popupUserData);
validatorUserForm.enableValidation();
