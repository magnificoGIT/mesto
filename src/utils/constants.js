//Переменные секции profile
export const profile = document.querySelector('.profile');
export const profileButtonTypeEdit = profile.querySelector('.profile__button_type_edit');
export const profileButtonTypeAdd = profile.querySelector('.profile__button_type_add');
//Переменные popup для add
export const popupAdd = document.querySelector('.popup-add');
export const popupFormAdd = popupAdd.querySelector('.popup__form_add');
//Переменные popup для edit
export const popupFormEdit = document.querySelector('.popup__form-edit')
export const popupInputName = popupFormEdit.querySelector('.popup__input_type_name');
export const popupInputAboutMyself = popupFormEdit.querySelector('.popup__input_type_about-myself');

//Массив изначальных карточек
export const initialCards = [
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

// Конфигурация формы для валидации
export const formEditValidatorConfig = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        buttonSelector: '.popup__button_type_save',
        inactiveButtonClass: 'popup__button_type_disabled',
        inputErrorClass: 'popup__input_type_error'
};