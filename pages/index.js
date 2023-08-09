import { initialCards, formEditValidatorConfig,
    profileButtonTypeEdit, profileButtonTypeAdd, 
    elementsContainer, popupFormAdd,
    popupFormEdit, popupInputName, popupInputAboutMyself } from "../components/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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
    renderCard(cardData);
    popupAddCard.closePopup();
    popupFormAddValidator.disabledButton();
})

// Функция клика на карточку - открытие попапа с изображением
function handleCardClick({name, link}) {
    const imagePopup = new PopupWithImage('.popup-img', name, link);
    imagePopup.setEventListeners();
    imagePopup.openPopup();
}

// Функция для создания и отрисовки карточки на странице
function renderCard(cardData) {
    const newCard = new Card(cardData, '#element-templat-card', handleCardClick);
    const cardElement = newCard.generateCard();
    elementsContainer.prepend(cardElement);
}

// Функция для начальной отрисовки карточек из массива initialCards
function renderInitialCards() {
    const sectionInitialCards = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item, '#element-templat-card', handleCardClick);
            const cardElement = card.generateCard();
            sectionInitialCards.addItem(cardElement);
        }
    }, ".elements");
    sectionInitialCards.renderItems();
}

// Слушатель для открытия попапа редактирования профиля
profileButtonTypeEdit.addEventListener('click', () => {
    const currentUserInfo = userInfo.getUserInfo(); // Получение текущей информации о пользователе
    popupInputName.value = currentUserInfo.name;
    popupInputAboutMyself.value = currentUserInfo.about;
    popupEditProfile.openPopup();
    popupFormEditValidator.enabledButton(); // Применение публичного метода FormValidator для активации кнопки при открытии формы
});

// Слушатель для открытия попапа добавления карточки
profileButtonTypeAdd.addEventListener('click', () => {
    popupFormAddValidator.disabledButton();
    popupAddCard.openPopup();
});

// Активация валидации формы редактирования профиля и формы добавления карточки
popupFormEditValidator.enableValidation();
popupFormAddValidator.enableValidation();

// Установка обработчиков событий на попапы
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();

// Начальная отрисовка карточек на странице
renderInitialCards();