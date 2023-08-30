import imageDefault from "../images/1643689510_1-foni-club-p-razbitoe-steklo-tekstura-1.jpg"

export default class Card {
    // Конструктор класса Card, принимает данные о карточке, идентификатор пользователя, селектор шаблона, и объект с колбэками
    constructor(data, userId, templateSelector, {
        handleCardClick,
        handleLikeCard,
        handleDeleteCard
    }) {
        // Сохранение исходных данных и колбэков
        this._userId = userId;
        this._data = data;
        this._id = data._id;
        this._ownerId = data.owner._id;
        this._likes = data.likes;
        // Присвоить свойству _name значение имени карточки из переданных данных
        this._name = data.name;
        // Присвоить свойству _link значение ссылки на изображение из переданных данных
        this._link = data.link;
        // Присвоить свойству _templateSelector значение селектора шаблона карточки из переданных данных
        this._templateSelector = templateSelector;
        //Инициализировать элемент в конструкторе для взаимодействия методов класса с DOM-элементами
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector('.elements__image');
        this._titleElement = this._element.querySelector('.elements__title');
        this._deleteCardButton = this._element.querySelector('.elements__button_type_delete');
        this._cardLikeButton = this._element.querySelector('.elements__button_type_heart');
        this._cardLikeCouner = this._element.querySelector('.elements__likes-count');
        // Сохранение колбэков
        this._handleCardClick = handleCardClick;
        this.handleLikeCard = handleLikeCard;
        this._handleDeleteCard = handleDeleteCard;
    }
    
    //Метод клонирования разметки карточки из шаблона
    _getTemplate() {
        const cardElement = document 
        // Получить шаблон карточки из DOM по селектору в свойстве _templateSelector
        .querySelector(this._templateSelector)
        .content
        .querySelector('.elements__card')
        // Клонировать всё, что содержится в шаблоне карточки
        .cloneNode(true);

        return cardElement;
    }

    // Метод для установки слушателей событий
    _setEventListeners() {
        // Слушатель удаления карточки
        this._deleteCardButton.addEventListener('click', () => {
            this._handleDeleteCard(this);
        });
        // Слушатель добавления черного лайка
        this._cardLikeButton.addEventListener('click', () => {
            this.handleLikeCard(this);
        });
        // Вызываем функцию открытия попапа с картинкой, передав имя и ссылку на изображение
        this._imageElement.addEventListener('click', () => {
            this._handleCardClick({ name: this._name, link: this._link });
        });
        //Слушатель для стандартного изображения, если пользователь добавил битую картинку
        this._imageElement.addEventListener('error', () => {
            // Заменить битое изображение на изображение по умолчанию
            this._link = imageDefault;
            this._imageElement.src = imageDefault;
            this._titleElement.textContent = 'Битое изображение';
        })
    }

    // Метод для создания и отрисовки карточки
    generateCard() {
        // Проверка прав на удаление карточки
        this._userVerification();
        // Вставить ссылку на изображение в атрибут src 
        this._imageElement.src = this._link;
        // Вставить название карточки в alt
        this._imageElement.alt = this._name;
        // Вставить название карточки для заголовка
        this._titleElement.textContent = this._name;
        // Обновление отображения лайков
        this._updateLike();
        // Вызвать метод установки слушателей
        this._setEventListeners();
        // Вернуть элемент карточки
        return this._element;
    }

    // Метод для скрытия кнопки удаления, если карточку добавил не пользователь
    _userVerification() {
        if (this._userId !== this._ownerId) {
            this._element.querySelector('.elements__button_type_delete').remove();
        }
    }

    // Метод для удаления карточки
    removeElementCard() {
        // Удалить карточку из DOM
        this._element.remove();
        // Очистить ссылку на DOM-элемент
        this._element = null;
    }

    // Метод для получения идентификатора карточки
    getId() {
        return this._id;
    }

    // Метод для проверки, поставлен ли лайк текущим пользователем
    isLiked() {
        return this._likes.some((item) => {
            return item._id === this._userId
        })
    }

    // Метод для обновления отображения лайков на карточке
    _updateLike() {
        this._cardLikeCouner.textContent = this._likes.length;
        if(this.isLiked()) {
            this._cardLikeButton.classList.add('elements__button_type_heart-active');
        } else {
            this._cardLikeButton.classList.remove('elements__button_type_heart-active');
        }
    }

    // Метод для обновления данных о лайках карточки
    setsLikesData(data) {
        this._likes = data.likes;
        this._updateLike();
    }

    // Метод для получения данных о карточке
    getData() {
        // Извлечь необходимые свойства из объекта _data
        const { name, _id, link } = this._data
        // Вернуть объект с данными
        return { name, _id, link }
    }
}