import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupButton, popupSelector, submitCallback) {
        // Вызываем конструктор базового класса Popup
        super(popupSelector)
        // Находим форму подтверждения удаления и кнопку подтверждения удаления
        this._popupForm = this._popup.querySelector('.popup__form_type_confirm');
        this._popupButtonConfirm = this._popup.querySelector('.popup__button_type_confirm-delete');
        // Сохраняем колбэк-функцию, которая будет вызываться при подтверждении удаления
        this._submitCallback = submitCallback;
        this._popupButton = popupButton;
    }

    // Метод для установки слушателей событий
    setEventListeners() {
        // Вызываем метод из базового класса Popup
        super.setEventListeners();
        // Добавляем слушатель для события submit на форме подтверждения удаления
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // Вызываем колбэк-функцию, которая была передана в конструктор
            this._submitCallback()
        });
    }

    // Метод для установки колбэка для удаления карточки
    setDeleteCardCallback(callbackDeleteApi) {
        this._submitCallback = callbackDeleteApi;
    }
}