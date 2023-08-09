import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, name, link) {
        // Вызов конструктора родителя класса с передачей селектора попапа
        super(popupSelector);
        this._link = link; // Сохранение ссылки на изображение
        this._name = name; // Сохранение названия изображения
        this._popupImage = this._popup.querySelector(".popup__image"); // Находим элемент изображения внутри попапа
        this._popupImageSubtitile = this._popup.querySelector(".popup__image-subtitle"); // Находим элемент подписи к изображению внутри попапа
    }

    // Переопределение метода для открытия попапа
    openPopup() {
        super.openPopup(); // Вызываем метод открытия попапа родителя класса
        this._popupImage.src = this._link; // Устанавливаем атрибуты изображения (url)
        this._popupImage.alt = this._name; // Устанавливаем атрибуты изображения (alt)
        this._popupImageSubtitile.textContent = this._name; // Устанавливаем подпись к изображению
    }
}