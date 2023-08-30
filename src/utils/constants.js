//Переменные секции profile
export const profile = document.querySelector('.profile');
export const profileTitle = profile.querySelector('.profile__title');
export const profileSubtitle = profile.querySelector('.profile__subtitle');
export const profileButtonTypeEdit = profile.querySelector('.profile__button_type_edit-info');
export const profileButtonTypeAdd = profile.querySelector('.profile__button_type_add');
export const profileButtonTypeEditAvatar = profile.querySelector('.profile__button_type_edit-avatar')
//Переменные popup для add
export const popupAdd = document.querySelector('.popup-add');
export const popupFormAdd = popupAdd.querySelector('.popup__form_add');
export const popupButtonAdd = popupAdd.querySelector('.popup__button_type_create')
//Переменные popup для edit
export const popupFormEdit = document.querySelector('.popup__form-edit')
export const popupInputName = popupFormEdit.querySelector('.popup__input_type_name');
export const popupInputAboutMyself = popupFormEdit.querySelector('.popup__input_type_about-myself');
export const popupFormUpdateAvatar = document.querySelector('.popup__form_type_update');
export const popupConfirmDeletionCard = document.querySelector('.popup__button_type_confirm-delete');
export const popupButtonTypeSaveEdit = popupFormEdit.querySelector('.popup__button_type_save-edit');
export const popupButtonTypeUpdate = popupFormUpdateAvatar.querySelector('.popup__button_type_update');

// Конфигурация формы для валидации
export const formEditValidatorConfig = {
        inputSelector: '.popup__input',
        buttonSelector: '.popup__button_type_save',
        inactiveButtonClass: 'popup__button_type_disabled',
        inputErrorClass: 'popup__input_type_error'
}

// Конфигурационные параметры для взаимодействия с сервером через API.
export const optionsApi = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-73',
    headers: {
        "content-type": "application/json",
        authorization: '7e3981d8-4b67-49f2-be2f-d6712d3ec9f5'
    }
}