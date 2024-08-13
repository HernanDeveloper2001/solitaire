import { useContext } from "react";
import { ContextDeck } from "../contextDeck-card/ContextDeckProvider"
import "../styles/card.css";

const CardFree = () => {

  const { cardMove } = useContext(ContextDeck);


  return (
    <> 
        {
          cardMove.map((item,index) => {
            return <img className="cardImg" src={item} alt={index} key={index} />
          })
        }
    </>
  )
}


export default CardFree

