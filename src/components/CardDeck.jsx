import PropTypes from "prop-types";


const CardDeck = ({card, index, onHandleCardClick}) => {
  return (
    <>
      <img
        className="cardImg"
        onClick={() => onHandleCardClick(card,index)}
        src={card}
        alt={index}
      />
    </>
  )
}

export default CardDeck


CardDeck.propTypes = {
    card: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onHandleCardClick: PropTypes.func,
  };
  