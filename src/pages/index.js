import './index.css'; 
 
import { initialCards, formEditValidatorConfig, 
    profileButtonTypeEdit, profileButtonTypeAdd, popupFormAdd, 
    popupFormEdit, popupInputName, popupInputAboutMyself } from "../utils/constants.js"; 
import Card from "../components/Card.js"; 
import FormValidator from "../components/FormValidator.js"; 
import Section from "../components/Section.js"; 
import PopupWithImage from "../components/PopupWithImage.js"; 
import PopupWithForm from "../components/PopupWithForm.js"; 
import UserInfo from "../components/UserInfo.js"; 

// Создание экземпляра формы PopupWithImage для открытия попапа с изображением
const imagePopup = new PopupWithImage('.popup-img');

// Создание новых экземпляров валидации для форм редактирования и добавления карточки 
const popupFormEditValidator = new FormValidator(formEditValidatorConfig, popupFormEdit);
const popupFormAddValidator = new FormValidator(formEditValidatorConfig, popupFormAdd);
 
// Создание экземпляра UserInfo для управления данными профиля пользователя
const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    aboutSelector: '.profile__subtitle'
}); 
 
// Создание экземпляра PopupWithForm для редактирования профиля
const popupEditProfile = new PopupWithForm('.popup-edit', (formData) => {
    userInfo.setUserInfo(formData);
    popupEditProfile.closePopup();
}); 
 
// Создание экземпляра PopupWithForm для добавления новой карточки
const popupAddCard = new PopupWithForm('.popup-add', (formData) => {
    const cardData = {
        name: formData.title,
        link: formData.url
    }
    renderAndAddCard(cardData);
    popupAddCard.closePopup();
    popupFormAddValidator.disableButton();
});

// Инициализация экземпляра Section для отображения карточек
const cardsSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item);
        cardsSection.addItem(cardElement);
    }
}, ".elements");

// Функция для начальной отрисовки карточек из массива initialCards
function renderInitialCards() {
    cardsSection.renderItems();
}

// Функция для создания и добавления карточки на страницу
function renderAndAddCard(cardData) {
    const newСardElement = createCard(cardData);
    cardsSection.addItem(newСardElement);
};

// Функция для создания карточки
function createCard(cardData) {
    return new Card(cardData, '#element-templat-card', handleCardClick).generateCard();
};

// Функция клика на карточку - открытие попапа с изображением
function handleCardClick({name, link}) {
    imagePopup.openPopup(name, link);
};

// Функции для обработчика клика на кнопку редактирования профиля
function handleEditProfileClick() {
    // Получение текущей информации о пользователе
    const currentUserInfo = userInfo.getUserInfo();
    popupInputName.value = currentUserInfo.name;
    popupInputAboutMyself.value = currentUserInfo.about;
    popupEditProfile.openPopup();
    // Применение публичного метода FormValidator для активации кнопки при открытии формы
    popupFormEditValidator.enableButton();
}
 
// Слушатель для открытия попапа редактирования профиля
profileButtonTypeEdit.addEventListener('click', handleEditProfileClick);
 
// Слушатель для открытия попапа добавления карточки
profileButtonTypeAdd.addEventListener('click', () => {
    popupFormAddValidator.disableButton();
    popupAddCard.openPopup();
});
 
// Активация валидации формы редактирования профиля и формы добавления карточки
popupFormEditValidator.enableValidation();
popupFormAddValidator.enableValidation();
 
// Установка обработчиков событий на попапы
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
imagePopup.setEventListeners();
 
// Начальная отрисовка карточек на странице
renderInitialCards();