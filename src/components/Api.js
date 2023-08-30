export default class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    // Обработчик HTTP-ответов, проверяет статус ответа и преобразует в JSON
    _handleHttpResponse(res) {
        // Проверка ответа
            if (res.ok) {
              return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
          };

    // Метод для получения информации о пользователе и изначальных карточек с сервера
    getAllInfo() {
        return Promise.all([this.getsUserInfo(), this.getsInitialCards()])
    }
    
    // Загрузить данные о пользователе с сервера
    getsUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._handleHttpResponse)
    }

    // Загрузить изначальные карточки с сервера добавленные пользователем
    getsInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._handleHttpResponse)
    }

    // Сохранение редактируемых данных на сервер
    updateUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._handleHttpResponse)
    }

    // Добавить новую карточку на сервер
    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.title,
                link: data.url
            })
        })
        .then(this._handleHttpResponse)
    }

    // Удалить карточку с сервера
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._handleHttpResponse)
    }

    // Поставить лайк карточке и убрать его
    likeCard(cardId, isLiked) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        })
        .then(this._handleHttpResponse)
    }

    // Обновление аватара
    updateAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this._handleHttpResponse)
    }
}