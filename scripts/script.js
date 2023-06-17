const popup = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup_add');
const popupButtonClose = document.querySelectorAll('.popup__button_type_close');
//Переменные секции profile
const profile = document.querySelector('.profile');
const profileButtonTypeEdit = profile.querySelector('.profile__button_type_edit');
const profileButtonTypeAdd = profile.querySelector('.profile__button_type_add');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
//Переменные секции element
const elementsCardImage = document.querySelector('#element-templat-card').content.querySelector('.elements__card');
const elementsImage = elementsCardImage.querySelector('.elements__image');
const elementsContainer = elementsCardImage.querySelector('.elements__container')
const elementsTitle = elementsContainer.querySelector('.elements__title');
console.dir(elementsCardImage);
console.dir(elementsContainer);

let popupForm = document.querySelector('.popup__form');
let popupInputName = popupForm.querySelector('.popup__input_type_name');
let popupInputAboutMyself = popupForm.querySelector('.popup__input_type_about-myself');

//Функции открытия и закрытия popup
function popupOpen() {
    popup.classList.add('popup_active');
}
function popupClose(popup) {
    popup.classList.remove('popup_active');
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
function handleFormSubmit (evt) {
    evt.preventDefault();
    savingTextFormPopup();
    popupClose(popup);
}
//Функция для открытия popup_add
function openPopupAdd() {
    popupAdd.classList.add('popup_active');
}

//Слушатель сохранения редактируемого текста и закрытия popup на кнопку "Сохранить" или клавишу Enter
popupForm.addEventListener('submit', handleFormSubmit);
//Слушатель на удаление класса popup_active для закрытия popup
popupButtonClose.forEach((button) => {
    button.addEventListener('click', function() {
        popupClose(button.closest('.popup'));
    })
});
//Слушатель на добавление класса popup_active для открытия popup при клике на кнопку редактировать
profileButtonTypeEdit.addEventListener('click', function() {
    popupOpen();
    fillingFormPopup();
});
//Слушатели для открытия popup_add
profileButtonTypeAdd.addEventListener('click', openPopupAdd);

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