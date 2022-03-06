 /* Поиск формы */
 let popup = document.querySelector('.popup');
 /* Кнопка редактирования */
 let editButton = document.querySelector('.profile__edit');
 /* Кнопка закрытия */
 let closeButton = document.querySelector('.popup__closed');
 /* Попап по форме */
 let form = document.querySelector('.popup__form');
 /* Имя */
 let nameProfile = document.querySelector('.profile__name');
 /* О себе */
 let aboutProfile = document.querySelector('.profile__about');
 /* Значение 1 */
 let nameInput = document.querySelector('#input__popup-name');
 /* Значение 2 */
 let aboutInput = document.querySelector('#input__popup-about');


 /* Открытие popup */
 function openPopup() {
     popup.classList.add('popup_opened');
     nameInput.value = nameProfile.textContent;
     aboutInput.value = aboutProfile.textContent;
 }

 /* Закрытие popup */
 function closePopup() {
     popup.classList.remove('popup_opened');
 }

 /* Редактирование */
 function formSubmitHandler(evt) {
     evt.preventDefault();
     nameProfile.textContent = nameInput.value;
     aboutProfile.textContent = aboutInput.value;
     closePopup();
 }

 form.addEventListener('submit', formSubmitHandler);
 /* Открытие */
 editButton.addEventListener('click', openPopup);
 /* Закрытие */
 closeButton.addEventListener('click', closePopup);