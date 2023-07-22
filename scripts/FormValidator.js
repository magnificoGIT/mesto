export class FormValidator {
    constructor(config, validatorElement) {
    this._validatorElement = validatorElement;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._buttonSelector = config.buttonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    }

//Метод для установки неактивной кнопки при неправильной валидации
    _disabledButton(buttonElement) {
        buttonElement.disabled = 'disabled';
        buttonElement.classList.add(this._inactiveButtonClass)
    }

//Метод для установки активной кнопки при правильной валидации
    _enabledButton(buttonElement) {
        buttonElement.disabled = false;
        buttonElement.classList.remove(this._inactiveButtonClass)
    }

//Метод переключения между неактивного состояния кнопки и активной
    _toggleButton() {
        const buttonElement = this._validatorElement.querySelector(this._buttonSelector);
        const isValid = this._validatorElement.checkValidity();
        if(!isValid) {
            this._disabledButton(buttonElement);
        } else {
            this._enabledButton(buttonElement);
        }
}

//Метод добавления ошибки о невалидности
_addError(inputElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    errorMessage.textContent = inputElement.validationMessage;
}

//Метод очистки поля с ошибкой
_clearAnError(inputElement, errorMessage) {
    inputElement.classList.remove(this._inputErrorClass);
    errorMessage.textContent = inputElement.validationMessage;
}

//Метод проверки валидности инпутов
_checkInputValidity(inputElement) {
    const isInputValid = inputElement.validity.valid;
    const errorMessage = this._validatorElement.querySelector(`#${inputElement.name}-error`);

    if(!isInputValid) {
        this._addError(inputElement, errorMessage);
    } else {
        this._clearAnError(inputElement, errorMessage);
    }
}

//Метод установки слушателей для валидации инпутов
_setEventListenerValidator() {
    const inputElements = Array.from(this._validatorElement.querySelectorAll(this._inputSelector));

    inputElements.forEach((inputElement) => {
        this._validatorElement.addEventListener('input', (evt) => {
            evt.preventDefault();
            this._checkInputValidity(inputElement);
            this._toggleButton();
        });
    });
}

//Метод для включения валидации формы
    enableValidation() {
        this._validatorElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setEventListenerValidator();
        this._toggleButton();
}
}