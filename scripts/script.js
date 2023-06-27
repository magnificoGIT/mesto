const popupEdit = document.querySelector('.popup-edit');
const popupButtonClose = document.querySelectorAll('.popup__button_type_close');
//Переменные секции profile
const profile = document.querySelector('.profile');
const profileButtonTypeEdit = profile.querySelector('.profile__button_type_edit');
const profileButtonTypeAdd = profile.querySelector('.profile__button_type_add');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
//Переменные template для секции element
const templateElement = document.querySelector('#element-templat-card').content.querySelector('.elements__card');
const elementsContainer = document.querySelector('.elements');
//Переменные popup для add
const popupAdd = document.querySelector('.popup-add');
const popupFormAdd = popupAdd.querySelector('.popup__form_add');
const popupInputTitle = popupAdd.querySelector('.popup__input_type_title');
const popupInputUrl = popupAdd.querySelector('.popup__input_type_url');
//Переменные popup для image
const popupImg = document.querySelector('.popup-img');
const popupImage = popupImg.querySelector('.popup__image');
const imageSubtitle = popupImg.querySelector('.popup__image-subtitle');
const popupButtonCreate = popupImg.querySelector('.popup__button_type_create');
//Переменные popup для edit
const popupForm = document.querySelector('.popup__form');
const popupInputName = popupForm.querySelector('.popup__input_type_name');
const popupInputAboutMyself = popupForm.querySelector('.popup__input_type_about-myself');
//Массив изначальных карточек
const initialCards = [
    {
        name: 'Таганай',
        link: 'https://plus.unsplash.com/premium_photo-1668260981209-3099c179e668?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
        name: 'Зеленоград',
        link: 'https://images.unsplash.com/photo-1536577722576-fcfdbcad17e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80',
    },
    {
        name: 'Кучерал',
        link: 'https://images.unsplash.com/photo-1615128216846-99c52541bf92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    {
        name: 'Москва',
        link: 'https://images.unsplash.com/photo-1536995439819-b47123832cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    {
        name: 'Прокопьевск',
        link: 'https://images.unsplash.com/photo-1516016767233-7efadeb62e74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    {
        name: 'Останкино',
        link: 'https://images.unsplash.com/photo-1526565688145-39300f9b888f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    },
];

//Функции открытия и закрытия popup
function openPopup(popup) {
    popup.classList.add('popup_active');
}
function сlosePopup(popup) {
    popup.classList.remove('popup_active');
}
//Функция заполненых полей при открытии popup
function fillingFormPopup() {
    popupInputName.value = profileTitle.textContent;
    popupInputAboutMyself.value = profileSubtitle.textContent;
}
//Функциии для сохранения редактируемого текста  и закрытия popup на кнопку "Сохранить"
function savingTextFormPopup() {
    profileTitle.textContent = popupInputName.value;
    profileSubtitle.textContent = popupInputAboutMyself.value;
}
function handleFormSubmit (evt) {
    evt.preventDefault();
    savingTextFormPopup();
    сlosePopup(popupEdit);
}
//Функция добавления класса с изображением черной кнопки лайка
function addBlackLike(event) {
    const likeBlack = event.target;
    likeBlack.classList.toggle('elements__button_type_heart-active')
}
//Функция для добавления карточки с изображением в секцию elements
function createCardElements(name, link) {
    const cardElement = templateElement.cloneNode(true);
    const imageElement = cardElement.querySelector('.elements__image');
    const titileElement = cardElement.querySelector('.elements__title');
    const buttonDeleteElement =  cardElement.querySelector('.elements__button_type_delete');
    const elementsButtonHeart = cardElement.querySelector('.elements__button_type_heart');
    const elementsButtonImage = cardElement.querySelector('.elements__button_type_image');
    
    imageElement.src = link;
    titileElement.textContent = name;
    imageElement.alt = 'Изображение добавленное пользователем';

    elementsButtonHeart.addEventListener('click', addBlackLike);
    buttonDeleteElement.addEventListener('click', () => {
        cardElement.remove();
    })
    elementsButtonImage.addEventListener('click', () => {
        openPopup(popupImg);
        popupImage.src = link;
        imageSubtitle.textContent = name;
        popupImage.alt = 'Изображение добавленное пользователем';
    });

    return cardElement
}
//Функция добавления карточки
function renderCardElements(data, container) {
    const newCard = createCardElements(data.name, data.link);
    container.prepend(newCard);
}
//Поиск и добавление всех name и link у массива
initialCards.forEach(function(item) {
    renderCardElements(item, elementsContainer);
});
//Событие формы создания карточки
popupFormAdd.addEventListener('submit', function(evt) {
    evt.preventDefault();
    if (popupInputTitle.value === '' || popupInputUrl.value === '') {
        сlosePopup(popupAdd);

        return
    }
    const newDataCard = {
        name: popupInputTitle.value,
        link: popupInputUrl.value
    }
    renderCardElements(newDataCard, elementsContainer);
    сlosePopup(popupAdd);
    popupInputTitle.value = '';
    popupInputUrl.value = '';
});
//Слушатель сохранения редактируемого текста и закрытия popup на кнопку "Сохранить" или клавишу Enter
popupForm.addEventListener('submit', handleFormSubmit);
//Слушатель на удаление класса popup_active для закрытия popup
popupButtonClose.forEach((button) => {
    button.addEventListener('click', function() {
        сlosePopup(button.closest('.popup'));
    })
});
//Слушатель на добавление класса popup_active для открытия popup при клике на кнопку редактировать
profileButtonTypeEdit.addEventListener('click', () => {
    openPopup(popupEdit);
    fillingFormPopup();
});
//Слушатель для открытия popup-add
profileButtonTypeAdd.addEventListener('click', () => {
    openPopup(popupAdd);
});