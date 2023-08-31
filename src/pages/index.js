import './index.css';
import * as constants from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

// Инициализация переменной для хранения ID текущего пользователя
let userId = null;

// Создание экземпляра Api для взаимодействия с сервером
const api = new Api(constants.optionsApi);

// Инициализация экземпляра Section для отображения карточек
const cardsSection = new Section({
    renderer: (data) => {
        // Передача данных для создания карточки
        renderAndAddCard(data);
    }
}, ".elements");

// Создание экземпляра UserInfo для управления данными профиля пользователя
const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    aboutSelector: '.profile__subtitle',
    profileAvatar: '.profile__avatar'
});

// Создание экземпляра формы PopupWithImage для открытия попапа с изображением
const imagePopup = new PopupWithImage('.popup-img');

// Создание новых экземпляров валидации для форм редактирования и добавления карточки
const popupFormEditValidator = new FormValidator(constants.formEditValidatorConfig, constants.popupFormEdit);
const popupFormAddValidator = new FormValidator(constants.formEditValidatorConfig, constants.popupFormAdd);
const popupFormUpdate = new FormValidator(constants.formEditValidatorConfig, constants.popupFormUpdateAvatar);

// Создание экземпляра класса PopupWithForm для обновления аватара
const popupUpdateAvatar = new PopupWithForm(constants.popupButtonTypeUpdate, '.popup-update-avatar', (formData) => {
    popupUpdateAvatar.renderLoading(true, 'Сохранение...', 'Сохранить');
    // Обновление аватара пользователя на сервере
    return api.updateAvatar(formData)
        .then((userData) => {
            updatingUserData(userData);
        })
        .catch((err) => {
            console.error(`Ошибка при обновлении изображения: ${err}`);
        })
        .finally(() => {
            popupUpdateAvatar.renderLoading(false, 'Сохранение...', 'Сохранить')
        })
});

// Создание экземпляра PopupWithForm для редактирования профиля
const popupEditProfile = new PopupWithForm(constants.popupButtonTypeSaveEdit, '.popup-edit', (formData) => {
    popupEditProfile.renderLoading(true, 'Сохранение...', 'Сохранить');
    // Сохранение редактируемых данных на сервер
    return api.updateUserInfo(formData)
        .then((userData) => {
            updatingUserData(userData);
        })
        .catch((err) => {
            console.error(`Ошибка сервера ${err}`);
        })
        .finally(() => {
            popupEditProfile.renderLoading(false, 'Сохранение...', 'Сохранить')
        })
});

// Создание экземпляра PopupWithConfirmation для подтверждения удаления карточки
const popupConfirmDelete = new PopupWithConfirmation(constants.popupConfirmDeletionCard, '.popup-confirm-delete-card', (data) => {
    handleDeleteCard(data)
});

// Загрузка информации о пользователе и изначальных карточек с сервера
api.getAllInfo()
    .then(([userData, cards]) => {
        // Обновление данных о пользователе на странице
        updatingUserData(userData);
        // Сохранение ID текущего пользователя
        userId = userData._id
        // Отображение карточек на странице
        cardsSection.renderItems(cards.reverse())
    })
    .catch((err) => {
        console.error(`Ошибка при загрузке данных: ${err}`);
    });

// Создание экземпляра PopupWithForm для добавления новой карточки
const popupAddCard = new PopupWithForm(constants.popupButtonAdd, '.popup-add', (data) => {
    popupAddCard.renderLoading(true, 'Создание...', 'Cоздать')
    return api.addNewCard(data)
        .then((dataFromServer) => {
            // Создание и добавление новой карточки на страницу
            renderAndAddCard(dataFromServer);
            popupFormAddValidator.disableButton();
        })
        .catch((err) => {
            console.error(`Ошибка добавления карточки: ${err}`);
        })
        .finally(() => {
            popupAddCard.renderLoading(false, 'Создание...', 'Cоздать')
        })
});

// Функция обновление данных пользователя на странице
function updatingUserData(data) {
    userInfo.setUserInfo({ name: data.name, about: data.about, avatar: data.avatar });
}

// Функция для создания карточки
function createCard(data) {
    // Создание экземпляра карточки
    const card = new Card(data, userId, '#element-templat-card', {
        handleCardClick,
        handleLikeCard,
        handleDeleteCard
    });
    return card.generateCard();
};

// Функция для добавления карточки на страницу
function renderAndAddCard(data) {
    // Создание карточки и добавление её на страницу
    const newСardElement = createCard(data);
    cardsSection.addItem(newСardElement);
};

// Функция для удаления карточки
function handleDeleteCard(instanceCard) {
    // Открытие попапа подтверждения удаления
    popupConfirmDelete.openPopup();
    popupConfirmDelete.setDeleteCardCallback(() => {
        popupConfirmDelete.renderLoading(true, 'Удаление...', 'Да');
        // Удаление карточки с сервера
        api.deleteCard(instanceCard.getId())
            .then(() => {
                // Удаление карточки с страницы
                instanceCard.removeElementCard();
                popupConfirmDelete.closePopup();
            })
            .catch((err) => {
                console.error(`Ошибка удаления карточки с сервера: ${err}`);
            })
            .finally(() => {
                popupConfirmDelete.renderLoading(false, 'Удаление...', 'Да');
            })
    });
}

// Функция для постановки и снятия лайка
function handleLikeCard(instance) {
    // Постановка или снятие лайка с карточки на сервере
    api.likeCard(instance.getId(), instance.isLiked())
        .then((dataCard) => {
            // Обновление данных о лайках на карточке
            instance.setsLikesData(dataCard);
        })
        .catch((err) => {
            console.error(`Ошибка при постановке/снятии лайка: ${err}`);
        });
}

// Функция клика на карточку - открытие попапа с изображением
function handleCardClick({ name, link }) {
    // Открытие попапа с изображением
    imagePopup.openPopup(name, link);
};

// Функции для обработчика клика на кнопку редактирования профиля
function handleEditProfileClick() {
    // Получение текущей информации о пользователе для отображения текущих данных в полях инпутов
    api.getsUserInfo()
        .then((userData) => {
            // Установка значений полей формы редактирования профиля
            popupEditProfile.setInputValues(userData);
            popupEditProfile.openPopup();
            // Применение публичного метода FormValidator для активации кнопки при открытии формы
            popupFormEditValidator.enableButton();
        })
        .catch((err) => {
            console.error(`Ошибка загрузки данных о пользователе: ${err}`);
        });
}

// Слушатель для открытия попапа добавления карточки
constants.profileButtonTypeAdd.addEventListener('click', () => {
    popupFormAddValidator.disableButton();
    popupAddCard.openPopup();
});

// Слушатель для открытия попапа редактирования профиля
constants.profileButtonTypeEdit.addEventListener('click', handleEditProfileClick);

// Слушатель для открытия попапа обновления аватара
constants.profileButtonTypeEditAvatar.addEventListener('click', () => {
    popupUpdateAvatar.openPopup();
    popupFormUpdate.disableButton();
});

// Активация валидации форм: редактирования профиля, добавления карточки и обновления аватара
popupFormEditValidator.enableValidation();
popupFormAddValidator.enableValidation();
popupFormUpdate.enableValidation();

// Установка обработчиков событий для попапов
imagePopup.setEventListeners();
popupAddCard.setEventListeners();
popupUpdateAvatar.setEventListeners();
popupEditProfile.setEventListeners();
popupConfirmDelete.setEventListeners();