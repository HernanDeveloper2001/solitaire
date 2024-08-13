import "../styles/card.css";
import { PropTypes } from "prop-types";
import { ContextDeck } from "../contextDeck-card/ContextDeckProvider.jsx";
import { useContext } from "react";

const Card = ({ card, index,onHandleCardClick }) => {
  const { offsetStep } = useContext(ContextDeck);

  return (
    <>
      <img
        className="cardImg"
        onClick={() => onHandleCardClick(index)}
        src={card}
        style={{
          transform: `translateY(${index * offsetStep}px)`,
          zIndex: index,
        }}
        alt={index}
      />
    </>
  );
};

export default Card;

Card.propTypes = {
  card: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onHandleCardClick:PropTypes.func,
};
