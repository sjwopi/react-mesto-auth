import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import Card from './Card.js';

function Main({ cards, onEditProfile, onEditAvatar, onAddPlace, onCardOpen, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-btn" onClick={onEditAvatar}>
            <img src={currentUser.avatar} alt="аватарка" className="profile__avatar" />
          </div>

          <div className="profile__text">
            <div className="profile__name-block">
              <h1 className="profile__full-name">{currentUser.name}</h1>
              <button type="button" className="profile__edit-btn" onClick={onEditProfile}></button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>

        <button type="button" className="profile__add-btn" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card} 
              onCardOpen={onCardOpen} 
              onCardLike={onCardLike} 
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
export default Main;
