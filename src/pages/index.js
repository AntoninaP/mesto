import './index.css';
import {PopupWithImage} from "../components/PopupWithImage.js";
import {UserInfo} from "../components/UserInfo.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {Card} from "../components/Card.js";
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {
  containerElements,
  popupPreview,
  popupPlace,
  addButton,
  popupUserData, openButton, userName, userJob, validationConfig, previewImagePicture, previewTitle,
  avatarButton, popupAvatar, imgAvatar, submitButtonText, popupDeleteCard
} from '../utils/constants.js';
import {Api} from "../components/Api.js";
import {PopupWithSubmit} from "../components/PopupWithSubmit";

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

// {
//   data: {
//   ...данные карточки (включая информацию по лайкам)
//   },
//   handleCardClick: () => {
//   ...что должно произойти при клике на картинку
//   },
//     handleLikeClick: (card) => {
// ...что должно произойти при клике на лайк
// },
//   handleDeleteIconClick: (card) => {
// ...что должно произойти при клике на удаление
// },


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
  console.log(formValues)
  api
    .addNewCard(formValues['place-title'], formValues.image)
    .then((data) => {
      console.log(data)
      renderCard({
        name: data.name,
        link: data.link
      });
    })
    .catch((err) => {
      console.log('error', err)
    })
    .finally(() => {
      popupAddNewCard.close();
    })
});
popupAddNewCard.setEventListeners();

//кнопка добавления новой карточки
addButton.addEventListener('click', () => {
  validatorPlaceForm.resetValidation();
  popupAddNewCard.open();
});

// удаление карточки
// const popupDeleteCard = new PopupWithSubmit(popupDeleteCard);


// ПРОФИЛЬ
// подставляем изначальные данные пользователя с сервера
api
  .getProfileInfo()
  .then((data) => {
    console.log(data)
    userInfo.setUserInfo(data.name, data.about);
    imgAvatar.src = data.avatar;
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
    })
    .finally(() => {
    popupUserInfo.close();
    })
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

//изменение аватара

const avatarPopup = new PopupWithForm(popupAvatar, (formValues) => {
  console.log(formValues)
  api
    .addNewAvatar(formValues.image)
    .then((data) => {
      imgAvatar.src = data.avatar
    })
    .catch((err) => {
      console.log('error', err)
    })
    .finally(() => {
      avatarPopup.close();
    })
})
avatarPopup.setEventListeners();

avatarButton.addEventListener('click', () => {
  validatorUserForm.resetValidation();
  avatarPopup.open();
});

//валидация форм
const validatorPlaceForm = new FormValidator(validationConfig, popupPlace);
validatorPlaceForm.enableValidation();

const validatorUserForm = new FormValidator(validationConfig, popupUserData);
validatorUserForm.enableValidation();








