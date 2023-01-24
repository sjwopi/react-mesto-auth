import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({card, onCardOpen, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleCardDelete() {
    onCardDelete(card)
  }
  function handleLikeCkick() {
    onCardLike(card);
  }
  function handleCardClick() {
    onCardOpen(card);
  }
  return (
    <li className="elements__list-item">
      <article className="element">
        <img
          src={card.link}
          alt={card.name}
          className="element__img"
          onClick={handleCardClick}
        />
        {isOwn && <button type="button" className="element__delete-btn" onClick={handleCardDelete}></button>}

        <div className="element__caption">
          <h2 className="element__text">{card.name}</h2>
          <div className="element__like-container">
            <button type="button" className={`element__like ${isLiked && 'element__like_active'}`} onClick={handleLikeCkick}></button>
            <p className="element__like-count">{card.likes.length}</p>
          </div>
        </div>
      </article>
    </li>
  );
}
export default Card;