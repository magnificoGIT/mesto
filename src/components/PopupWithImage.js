import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        // Вызов конструктора родительского класса с передачей селектора попапа
        super(popupSelector);
        // Находим элемент изображения внутри попапа
        this._popupImage = this._popup.querySelector(".popup__image");
        // Находим элемент подписи к изображению внутри попапа
        this._popupImageSubtitile = this._popup.querySelector(".popup__image-subtitle");
    }

    // Переопределение метода для открытия попапа с изображением и подписью
    openPopup(name, link) {
        // Вызываем метод открытия попапа родителя класса
        super.openPopup();
        // Устанавливаем атрибуты изображения (url)
        this._popupImage.src = link;
        // Устанавливаем атрибуты изображения (alt)
        this._popupImage.alt = name;
        // Устанавливаем подпись к изображению
        this._popupImageSubtitile.textContent = name;
    }
}