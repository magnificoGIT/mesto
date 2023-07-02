const configPopupError = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    buttonSelector: '.popup__button_type_save',
    inactiveButtonClass: 'popup__button_type_disabled',
    inputErrorClass: 'popup__input_type_error'
};

function enableValidation(configPopupError) {
    const formPopup = document.querySelectorAll(configPopupError.formSelector);

    [...formPopup].forEach((formElement) => {
        setEventListener(formElement, configPopupError);
    });
}

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

    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        if (!formElement.checkValidity()) return;
    })
}

function toggleButton(buttonElement, active, configPopupError) {
    if(!active) {
        buttonElement.disabled = 'disabled'
        buttonElement.classList.add(configPopupError.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(configPopupError.inactiveButtonClass);
    }
}

function checkInputValidity(inputElement, formElement) {
    const isInputValid = inputElement.validity.valid;
    const errorMessage = formElement.querySelector(`#${inputElement.name}-error`);
    if(!isInputValid) {
        addError(inputElement, errorMessage, configPopupError);
    } else {
        clearAnError(inputElement, errorMessage, configPopupError);
    }

}

function addError(inputElement, errorMessage, configPopupError) {
    inputElement.classList.add(configPopupError.inputErrorClass);
    errorMessage.textContent = inputElement.validationMessage;
}

function clearAnError(inputElement, errorMessage, configPopupError) {
    inputElement.classList.remove(configPopupError.inputErrorClass);
    errorMessage.textContent = inputElement.validationMessage;
}

enableValidation(configPopupError);