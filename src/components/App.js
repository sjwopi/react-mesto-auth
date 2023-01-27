import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import api from '../utils/api.js';
import * as auth from '../utils/auth.js'
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import ProtectedRoute from './ProtectedRoute.js';

import Header from './Header.js'
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarePopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import Register from "./Register.js";
import Login from "./Login.js";
import InfoTooltip from './InfoTooltip.js';

function App() {
  const [isPopupEditAvatarOpen, setIsPopupEditAvatarOpen] = React.useState(false);
  const [isPopupEditProfileOpen, setIsPopupEditProfileOpen] = React.useState(false);
  const [isPopupAddPlaceOpen, setIsPopupAddPlaceOpen] = React.useState(false);
  const [isPopupConfirmActionOpen, setIsPopupConfirmActionOpen] = React.useState({ isOpen: false, card: {} });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [isCardOpened, setIsCardOpened] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isRegSuccessful, setIsRegSuccessful] = React.useState(false);
  const [messageSuccessful, setMessageSuccessful] = React.useState(null);
  const [email, setEmail] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch(console.error);
      api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);
  // открытие попапов
  function handleEditAvatarClick() {
    setIsPopupEditAvatarOpen(true);
    setIsLoggedIn(true)
  }
  function handleEditProfileClick() {
    setIsPopupEditProfileOpen(true);
  }
  function handleAddPlaceClick() {
    setIsPopupAddPlaceOpen(true);
  }
  function openInfoTooltip() {
    setIsInfoTooltipOpen(true);
  };
  function handleOpenImageClick(card) {
    setIsCardOpened(card);
  }
  // закрытие попапов
  function closeAllPopups() {
    setIsPopupEditAvatarOpen(false);
    setIsPopupEditProfileOpen(false);
    setIsPopupAddPlaceOpen(false);
    setIsInfoTooltipOpen(false);
    setIsCardOpened(null);
    setMessageSuccessful(null);
    setIsPopupConfirmActionOpen({ isOpen: false, card: {} });
  }
  function closeCLickOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }
  // добавление и удаления лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api.setLike(card._id).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        ).catch(console.error);
      });
    } else {
      api.deleteLike(card._id).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        ).catch(console.error);
      });
    }
  }
  // удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((crd) => crd._id !== card._id));
        closeAllPopups();
      })
      .catch(console.error);
  }
  // изменение информации пользователя
  function handleUpdateUser(userInfo) {
    api
      .editUserInfo(userInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch(console.error);
  }
  // изменение аватара
  function handleUpdateAvatar(avatar) {
    api
      .editAvatar(avatar)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch(console.error);
  }
  // добавление карточки
  function handleAddNewPlace(card) {
    api
      .createCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  }
  // проверка токена из localStorage с токеном на сервере
  function handleCheckToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkAuth(jwt)
        .then(data => {
          setEmail(data.data.email);
          setIsLoggedIn(true);
          navigate("/");
        })
        .catch(err => console.log(err))
    }
  }
  // проверка токена 1 раз при первой загрузке страницы
  React.useEffect(() => {
    handleCheckToken();
  }, []);
  // регистрация
  function handleRegistration(data) {
    return auth
      .register(data)
      .then(() => {
        setIsRegSuccessful(true);
        setMessageSuccessful('Вы успешно зарегистрировались!');
        openInfoTooltip();
        navigate("/sign-in");
      })
      .catch(err => {
        console.log(err);
        setIsRegSuccessful(false);
        setMessageSuccessful('Что-то пошло не так! Попробуйте ещё раз.');
        openInfoTooltip();
      })
  }

  // авторизация
  function handleAuthorization(data) {
    return auth
      .login(data)
      .then(data => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', data.token)
        handleCheckToken();
        navigate("/");
      })
      .catch(err => {
        console.log(err);
        openInfoTooltip();
      })
  }
  // выход из профиля
  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    setEmail(null);
    navigate("/sign-in");
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      
      <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <Header isLoggedIn={isLoggedIn} userEmail={email} onSignOut={handleSignOut} />
                  <Main
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardOpen={handleOpenImageClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                </>
              </ProtectedRoute>
            }
          />
        <Route
          path="/sign-up"
          element={<Register onRegister={handleRegistration} />}
        />

        <Route
          path="/sign-in"
          element={ <Login onLogin={handleAuthorization} /> }
        />

        {/* <Route
          path="*"
          element={ isLoggedIn ? navigate('/', {replace: true}) : navigate('/sign-in', {replace: true}) }
        /> */}
      </Routes>
      <Footer />

      <EditProfilePopup
        isOpen={isPopupEditProfileOpen}
        onClose={closeAllPopups}
        onCloseOverlay={closeCLickOverlay}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarePopup
        isOpen={isPopupEditAvatarOpen}
        onClose={closeAllPopups}
        onCloseOverlay={closeCLickOverlay}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isPopupAddPlaceOpen}
        onClose={closeAllPopups}
        onCloseOverlay={closeCLickOverlay}
        onAddPlace={handleAddNewPlace}
      />

      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        textBtn="Удалить"
        isOpen={isPopupConfirmActionOpen.isOpen}
        onClose={closeAllPopups}
        onCloseOverlay={closeCLickOverlay}
      ></PopupWithForm>

      <ImagePopup
        card={isCardOpened}
        onClose={closeAllPopups}
        onCloseOverlay={closeCLickOverlay}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        isSuccess={isRegSuccessful}
        text={messageSuccessful}
        onClose={closeAllPopups}
        onCloseOverlay={closeCLickOverlay}
      />
    </CurrentUserContext.Provider>
  );
}
export default App;
