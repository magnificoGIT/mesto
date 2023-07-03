const configPopupError = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    buttonSelector: '.popup__button_type_save',
    inactiveButtonClass: 'popup__button_type_disabled',
    inputErrorClass: 'popup__input_type_error'
};
//Функция поиска всех форм и перебирание их
function enableValidation(configPopupError) {
    const formPopup = document.querySelectorAll(configPopupError.formSelector);

    [...formPopup].forEach((formElement) => {
        setEventListener(formElement, configPopupError);
    });
}
//Функция установки слушателя инпутов
function setEventListener(formElement, configPopupError) {
    const inputForm = formElement.querySelectorAll(configPopupError.inputSelector);
    const buttonElement = formElement.querySelector(configPopupError.buttonSelector);

    toggleButton(buttonElement, formElement.checkValidity(), configPopupError);

    [...inputForm].forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            toggleButton(buttonElement, formElement.checkValidity(), configPopupError);
            checkInputValidity(inputElement, formElement);
        })
    })
        if (!formElement.checkValidity()) {
            disabledButton(buttonElement);
        };
}
//Функция неактивной кнопки
function disabledButton(buttonElement) {
    buttonElement.disabled = 'disabled'
    buttonElement.classList.add(configPopupError.inactiveButtonClass);
}
//Функция удаления disabled для активной кнопки
function enabledButton(buttonElement) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(configPopupError.inactiveButtonClass);
}
//Функция переключения между неактивного состояния кнопик и активного
function toggleButton(buttonElement, active) {
    if(!active) {
        disabledButton(buttonElement)
    } else {
        enabledButton(buttonElement)
    }
}
//Функция проверки валидности инпутов
function checkInputValidity(inputElement, formElement) {
    const isInputValid = inputElement.validity.valid;
    const errorMessage = formElement.querySelector(`#${inputElement.name}-error`);
    if(!isInputValid) {
        addError(inputElement, errorMessage, configPopupError);
    } else {
        clearAnError(inputElement, errorMessage, configPopupError);
    }

}
//Функция добавления ошибки о невалидности
function addError(inputElement, errorMessage, configPopupError) {
    inputElement.classList.add(configPopupError.inputErrorClass);
    errorMessage.textContent = inputElement.validationMessage;
}
//Функция очистки ошибки о невалидности
function clearAnError(inputElement, errorMessage, configPopupError) {
    inputElement.classList.remove(configPopupError.inputErrorClass);
    errorMessage.textContent = inputElement.validationMessage;
}
//Вызов функции поиска всех форм
enableValidation(configPopupError);