const popupEdit = document.querySelector('.popup-edit');
const popupButtonClose = document.querySelectorAll('.popup__button_type_close');
const overlay = document.querySelectorAll('.popup');
const popupContainer = document.querySelectorAll('.popup__container');
const buttonTypeSaveEdit = popupEdit.querySelector('.popup__button_type_save-edit');
const configInactiveButton = {
    inactiveButtonClass: 'popup__button_type_disabled',
};
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
const popupButtonCreate = popupAdd.querySelector('.popup__button_type_create');
//Переменные popup для image
const popupImg = document.querySelector('.popup-img');
const popupImage = popupImg.querySelector('.popup__image');
const imageSubtitle = popupImg.querySelector('.popup__image-subtitle');
//Переменные popup для edit
const popupFormEdit = document.querySelector('.popup__form-edit')
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputAboutMyself = document.querySelector('.popup__input_type_about-myself');
//Функции открытия и закрытия popup
function openPopup(popup) {
    popup.classList.add('popup_active');
    //Слушатель закрытия popup на кнопку escape
    document.addEventListener('keydown', closePopupEsc);
}
function closePopup(popup) {
    popup.classList.remove('popup_active');
    //Слушатель закрытия popup на кнопку escape
    document.addEventListener('keydown', closePopupEsc);
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
function handleFormSubmitEdit (evt) {
    evt.preventDefault();
    savingTextFormPopup();
    closePopup(popupEdit);
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
    imageElement.alt = titileElement.textContent;

    elementsButtonHeart.addEventListener('click', addBlackLike);
    buttonDeleteElement.addEventListener('click', () => {
        cardElement.remove();
    })
    elementsButtonImage.addEventListener('click', () => {
        openPopup(popupImg);
        popupImage.src = link;
        imageSubtitle.textContent = name;
        popupImage.alt = imageSubtitle.textContent;
    });

    return cardElement
}
//Функция добавления карточки
function renderCardElements(data, container) {
    const newCard = createCardElements(data.name, data.link);
    container.prepend(newCard);
}
//Функция закрытия popup на esc
function closePopupEsc(evt) {
    if(evt.key === 'Escape') {
        overlay.forEach((popup) => {
            if(popup.classList.contains('popup_active')) {
                closePopup(popup);
            };
        });
    };
}

//Поиск и добавление всех name и link у массива
initialCards.forEach(function(item) {
    renderCardElements(item, elementsContainer);
})
//Закрытие popup на клик или нажатие по оверлею
overlay.forEach((popup) => {
    popup.addEventListener('click', () => {
         closePopup(popup)
     });
   })
   
   popupContainer.forEach((container) => {
     container.addEventListener('click', (evt) => {
         evt.stopPropagation();
       });
   })
//Событие формы создания карточки
popupFormAdd.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const newDataCard = {
        name: popupInputTitle.value,
        link: popupInputUrl.value
    }

    renderCardElements(newDataCard, elementsContainer);
    closePopup(popupAdd);
    popupInputTitle.value = '';
    popupInputUrl.value = '';
    disabledButton(popupButtonCreate, configInactiveButton);
});
//Слушатель сохранения редактируемого текста и закрытия popup на кнопку "Сохранить" или клавишу Enter
popupFormEdit.addEventListener('submit', handleFormSubmitEdit);
//Слушатель на удаление класса popup_active для закрытия popup
popupButtonClose.forEach((button) => {
    button.addEventListener('click', function() {
        closePopup(button.closest('.popup'));
    })
});
//Слушатель на добавление класса popup_active для открытия popup при клике на кнопку редактировать
profileButtonTypeEdit.addEventListener('click', () => {
    openPopup(popupEdit);
    fillingFormPopup();
    enabledButton(buttonTypeSaveEdit, configInactiveButton);
});
//Слушатель для открытия popup-add
profileButtonTypeAdd.addEventListener('click', () => {
    openPopup(popupAdd);
});