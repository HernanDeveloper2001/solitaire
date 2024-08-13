import "../styles/card.css";
import { PropTypes } from "prop-types";


const Card = ({ card, index, onHandleCardValue,offsetStep}) => {


  return (
    <>
      <img
        className="cardImg"
        onClick={() => onHandleCardValue(card,index)}
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
  onHandleCardValue:PropTypes.func,
  offsetStep:PropTypes.number,
  isLastCardTrue:PropTypes.bool
};
