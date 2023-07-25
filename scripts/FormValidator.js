export class FormValidator {
    constructor(config, validatorElement) {
    this._validatorElement = validatorElement;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._buttonSelector = config.buttonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._inputElements = Array.from(this._validatorElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._validatorElement.querySelector(this._buttonSelector);
    }

//Метод для установки неактивной кнопки при неправильной валидации
    disabledButton() {
        this._buttonElement.disabled = true;
        this._buttonElement.classList.add(this._inactiveButtonClass)
    }

//Метод для установки активной кнопки при правильной валидации
    enabledButton() {
        this._buttonElement.disabled = false;
        this._buttonElement.classList.remove(this._inactiveButtonClass)
    }

//Метод переключения между неактивного состояния кнопки и активной
    _toggleButton() {
        const isValid = this._validatorElement.checkValidity();
        if(!isValid) {
            this.disabledButton();
        } else {
            this.enabledButton();
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
    this._inputElements.forEach((inputElement) => {
        this._validatorElement.addEventListener('input', () => {
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