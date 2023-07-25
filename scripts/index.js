import { initialCards, formEditValidatorConfig } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const popupEdit = document.querySelector('.popup-edit');
const popupButtonClose = document.querySelectorAll('.popup__button_type_close');
const overlays = document.querySelectorAll('.popup');
//Переменные секции profile
const profile = document.querySelector('.profile');
const profileButtonTypeEdit = profile.querySelector('.profile__button_type_edit');
const profileButtonTypeAdd = profile.querySelector('.profile__button_type_add');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
// const templateElement = document.querySelector('#element-templat-card').content.querySelector('.elements__card');
const elementsContainer = document.querySelector('.elements');
//Переменные popup для add
const popupAdd = document.querySelector('.popup-add');
const popupFormAdd = popupAdd.querySelector('.popup__form_add');
const popupInputTitle = popupAdd.querySelector('.popup__input_type_title');
const popupInputUrl = popupAdd.querySelector('.popup__input_type_url');
//Переменные popup для edit
const popupFormEdit = document.querySelector('.popup__form-edit')
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputAboutMyself = document.querySelector('.popup__input_type_about-myself');
// Переменные создания новых экземпляров валидации для форм редактирования и добавления карточки
const popupFormEditValidator = new FormValidator(formEditValidatorConfig, popupFormEdit);
const popupFormAddValidator = new FormValidator(formEditValidatorConfig, popupFormAdd);

//Функции открытия и закрытия popup
function openPopup(popup) {
    popup.classList.add('popup_active');
}

function closePopup(popup) {
    popup.classList.remove('popup_active');
    //Слушатель закрытия popup на кнопку escape
    document.addEventListener('keydown', closePopupByEsc);
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

//Функция 
export function handleOpenPopup(name, link) {
    const popupImg = document.querySelector('.popup-img');
    const popupImage = popupImg.querySelector('.popup__image');
    const imageSubtitle = popupImg.querySelector('.popup__image-subtitle');

    openPopup(popupImg); // Использовать функцию openPopup для открытия попапа с изображением
    popupImage.src = link; // Вставить ссылку на изображение
    imageSubtitle.textContent = name; // Вставить название карточки
    popupImage.alt = name; // Вставить название карточки в alt для открытого изображения
}

//Функция закрытия popup на esc
function closePopupByEsc(evt) {
    if(evt.key === 'Escape') {
        overlays.forEach((popup) => {
            if(popup.classList.contains('popup_active')) {
                closePopup(popup);
            };
        });
    };
}

//Функция добавления карточек
function renderCard(cardData) {
    const card = new Card(cardData, '#element-templat-card', handleOpenPopup);
    const cardElement = card.generateCard();
    elementsContainer.prepend(cardElement);
}
// Функция добавления изначальных карточек
function renderInitialCards() {
    initialCards.forEach(renderCard);
}

//Закрыть popup на клик или нажатие по оверлею
overlays.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup')) {
            closePopup(popup);
        }
     });
   })

// Событие формы создания карточки
popupFormAdd.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const newDataCard = {
        name: popupInputTitle.value,
        link: popupInputUrl.value
    }
    renderCard(newDataCard);
    closePopup(popupAdd);
    popupFormAddValidator.disabledButton(); // Применение публичного метода FormValidator для деактивации кнопки после добавления новой карточки
    popupFormAdd.reset();
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
    popupFormEditValidator.enabledButton(); // Применение публичного метода FormValidator для активации кнопки при открытии формы
});

//Слушатель для открытия popup-add
profileButtonTypeAdd.addEventListener('click', () => {
    openPopup(popupAdd);
});

popupFormEditValidator.enableValidation();

popupFormAddValidator.enableValidation();

renderInitialCards();