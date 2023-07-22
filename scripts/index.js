import { Card } from "./Card.js";

import { FormValidator } from "./FormValidator.js";

//Массив изначальных карточек
const initialCards = [
    {
        name: 'Таганай',
        link: 'https://plus.unsplash.com/premium_photo-1668260981209-3099c179e668?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
        name: 'Зеленоград',
        link: 'https://images.unsplash.com/photo-1536577722576-fcfdbcad17e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80',
    },
    {
        name: 'Кучерал',
        link: 'https://images.unsplash.com/photo-1615128216846-99c52541bf92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    {
        name: 'Москва',
        link: 'https://images.unsplash.com/photo-1536995439819-b47123832cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    {
        name: 'Прокопьевск',
        link: 'https://images.unsplash.com/photo-1516016767233-7efadeb62e74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    {
        name: 'Останкино',
        link: 'https://images.unsplash.com/photo-1526565688145-39300f9b888f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    },
];

const popupEdit = document.querySelector('.popup-edit');
const popupButtonClose = document.querySelectorAll('.popup__button_type_close');
const overlay = document.querySelectorAll('.popup');
const popupContainer = document.querySelectorAll('.popup__container');
const buttonTypeSaveEdit = popupEdit.querySelector('.popup__button_type_save-edit');
//Переменные секции profile
const profile = document.querySelector('.profile');
const profileButtonTypeEdit = profile.querySelector('.profile__button_type_edit');
const profileButtonTypeAdd = profile.querySelector('.profile__button_type_add');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
//Переменные template для секции element
// const templateElement = document.querySelector('#element-templat-card').content.querySelector('.elements__card');
const elementsContainer = document.querySelector('.elements');
//Переменные popup для add
const popupAdd = document.querySelector('.popup-add');
const popupFormAdd = popupAdd.querySelector('.popup__form_add');
const popupInputTitle = popupAdd.querySelector('.popup__input_type_title');
const popupInputUrl = popupAdd.querySelector('.popup__input_type_url');
const popupButtonCreate = popupAdd.querySelector('.popup__button_type_create');
//Переменные popup для edit
const popupFormEdit = document.querySelector('.popup__form-edit')
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputAboutMyself = document.querySelector('.popup__input_type_about-myself');
const formPopup = document.querySelectorAll('.popup__form');
let popupFormEditValidator;

//Функции открытия и закрытия popup
export function openPopup(popup) {
    popup.classList.add('popup_active');
}

function closePopup(popup) {
    popup.classList.remove('popup_active');
    //Слушатель закрытия popup на кнопку escape
    document.addEventListener('keydown', closePopupEsc);
}
//Функция заполненых полей при открытии popup
function fillingFormPopup() {
    popupInputName.value = profileTitle.textContent;
    popupInputAboutMyself.value = profileSubtitle.textContent;
}
//Функциии для сохранения редактируемого текста  и закрытия popup на кнопку "Сохранить"
function savingTextFormPopup() {
    profileTitle.textContent = popupInputName.value;
    profileSubtitle.textContent = popupInputAboutMyself.value;
}
//Функция изменения сохранения редактируемого текста  и закрытия
function handleFormSubmitEdit (evt) {
    evt.preventDefault();
    savingTextFormPopup();
    closePopup(popupEdit);
}

//Функция добавления карточки пользователем
function renderCardElements(cardData) {
    const addedCard = new Card(cardData, '#element-templat-card');
    const addingCard = addedCard.generateCard();
    elementsContainer.prepend(addingCard);
}

//Функция закрытия popup на esc
function closePopupEsc(evt) {
    if(evt.key === 'Escape') {
        overlay.forEach((popup) => {
            if(popup.classList.contains('popup_active')) {
                closePopup(popup);
            };
        });
    };
}

//Применить класс FormValidator для валидации полей формы в попапах
formPopup.forEach((validatorElement) => {
    popupFormEditValidator = new FormValidator({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        buttonSelector: '.popup__button_type_save',
        inactiveButtonClass: 'popup__button_type_disabled',
        inputErrorClass: 'popup__input_type_error',
    }, validatorElement);

    popupFormEditValidator.enableValidation();
});

//Добавить изначальные карточки при загрузке страницы
initialCards.forEach((cardData,) => {
    const card = new Card(cardData, '#element-templat-card');
    const cardElement = card.generateCard();
    elementsContainer.prepend(cardElement);
})

//Закрыть popup на клик или нажатие по оверлею
overlay.forEach((popup) => {
    popup.addEventListener('click', () => {
         closePopup(popup)
     });
   })
   
   popupContainer.forEach((container) => {
     container.addEventListener('click', (evt) => {
         evt.stopPropagation();
       });
   })

// Событие формы создания карточки
popupFormAdd.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const newDataCard = {
        name: popupInputTitle.value,
        link: popupInputUrl.value
    }
    renderCardElements(newDataCard);
    closePopup(popupAdd);
    popupInputTitle.value = '';
    popupInputUrl.value = '';
    popupFormEditValidator._disabledButton(popupButtonCreate);
});

//Слушатель сохранения редактируемого текста и закрытия popup на кнопку "Сохранить" или клавишу Enter
popupFormEdit.addEventListener('submit', handleFormSubmitEdit);

//Слушатель на удаление класса popup_active для закрытия popup
popupButtonClose.forEach((button) => {
    button.addEventListener('click', function() {
        closePopup(button.closest('.popup'));
    })
});

//Слушатель на добавление класса popup_active для открытия popup при клике на кнопку редактировать
profileButtonTypeEdit.addEventListener('click', () => {
    openPopup(popupEdit);
    fillingFormPopup();
    popupFormEditValidator._enabledButton(buttonTypeSaveEdit);
});

//Слушатель для открытия popup-add
profileButtonTypeAdd.addEventListener('click', () => {
    openPopup(popupAdd);
});