function ImagePopup({ card, onClose, onCloseOverlay }) {
  return (
    <div className={`popup popup-card` + (card !== null && ' popup_opened')} onClick={onCloseOverlay}>
      <div className="popup-card__container">
        <h2 className="popup-card__text">{card !== null ? card.name : '#'}</h2>
        <img
          src={card !== null ? card.link : '#'}
          alt={card !== null ? card.name : '#'}
          className="popup-card__img"
        />
        <button type="button" className="popup__close-btn popup-card__close-btn" onClick={onClose}></button>
      </div>
    </div>
  );
}
export default ImagePopup;
