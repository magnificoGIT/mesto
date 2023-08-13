export default class FormValidator {
    constructor(config, form) {
        // Сохраняем элемент валидируемой формы
        this._form = form;
        this._inputSelector = config.inputSelector;
        this._buttonSelector = config.buttonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        // Находим все поля ввода внутри формы
        this._inputElements = Array.from(this._form.querySelectorAll(this._inputSelector));
        // Находим кнопку отправки формы
        this._buttonElement = this._form.querySelector(this._buttonSelector);
    }

    // Метод для установки неактивной кнопки при неправильной валидации
    disableButton() {
        this._buttonElement.disabled = true;
        this._buttonElement.classList.add(this._inactiveButtonClass);
    }

    // Метод для установки активной кнопки при правильной валидации
    enableButton() {
        this._buttonElement.disabled = false;
        this._buttonElement.classList.remove(this._inactiveButtonClass);
    }

    // Метод переключения между неактивного состояния кнопки и активной
    _toggleButton() {
        const isValid = this._form.checkValidity();
        if (!isValid) {
            this.disableButton();
        } else {
            this.enableButton();
        }
    }

    // Метод добавления ошибки о невалидности
    _addError(inputElement, errorMessage) {
        inputElement.classList.add(this._inputErrorClass);
        errorMessage.textContent = inputElement.validationMessage;
    }

    // Метод очистки поля с ошибкой
    _clearAnError(inputElement, errorMessage) {
        inputElement.classList.remove(this._inputErrorClass);
        errorMessage.textContent = inputElement.validationMessage;
    }

    // Метод проверки валидности инпутов
    _checkInputValidity(inputElement) {
        const isInputValid = inputElement.validity.valid;
        const errorMessage = this._form.querySelector(`#${inputElement.name}-error`);

        if (!isInputValid) {
            this._addError(inputElement, errorMessage);
        } else {
            this._clearAnError(inputElement, errorMessage);
        }
    }

    // Метод установки слушателей для валидации инпутов
    _setEventListenerValidator() {
        this._inputElements.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButton();
            });
        });
    }

    // Метод для включения валидации формы
    enableValidation() {
        this._setEventListenerValidator();
        this._toggleButton();
    }
}