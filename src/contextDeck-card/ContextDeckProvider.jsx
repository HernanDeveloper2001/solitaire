import { createContext, useState, useEffect, useRef } from "react"
import DECK from "../components/deck-card/Deck"
import PropTypes from "prop-types"


const ContextDeck = createContext(); 

const ContextDeckProvider = ({children}) => {

  const [stateDeck, setStateDeck] = useState(DECK);

  const hasShuffled = useRef(false);

  const [clickedCards, setClickedCards] = useState(false); 
  
  const [showGame, setShowGame] = useState(false);
  
  const [newCardList, setNewCardList] = useState([]);
  const [newRemainingCards, setNewRemainingCards] = useState([]);


  const offsetStep = .01;


  const onHandleQuitGame = () => {
    setShowGame(false);  // Oculta el juego
    setStateDeck(DECK);  // Restaura el mazo al estado original (DECK es tu mazo inicial)
    setNewCardList([]);  // Vacía la lista de cartas distribuidas
    setNewRemainingCards([]);  // Vacía la lista de cartas restantes
    setCardMove([]);  // Vacía las cartas que estaban en movimiento (opcional, si necesitas)
    setIndexCard(null);  // Resetea el índice de la carta seleccionada (opcional)
    hasShuffled.current = false;  // Resetea el estado de mezcla (si deseas permitir una nueva mezcla)
};

  const cardLength = stateDeck.length;

  const onHandleGame = () => {
    const cardList = [];
    let indexCard = 1;
    const remainingCards = [];

    for (let i = 0; i < cardLength; ) {
      const subCardShuffled = [];

      if (indexCard <= 7) {
        for (let j = 1; j <= indexCard && i < cardLength; j++) {
          subCardShuffled.push(stateDeck[i]);
          i++; // Incrementar solo si se agrega una carta
        }
        cardList.push(subCardShuffled);
      } else {
        remainingCards.push(stateDeck[i]);
        i++; // Incrementar para las cartas restantes
      }

      indexCard++;
    }

    setShowGame(true);
    setNewCardList(cardList);
    setNewRemainingCards(remainingCards);
  };
  //-----------------------------------------------------------------------------
  //SELECCIONA SOLO 1 CARTA 


  const [indexCard, setIndexCard] = useState(null);

  const [cardMove, setCardMove] = useState([]);


  const onHandleCardClick = (index) => {
    if(index >= 0){
      setClickedCards(prevState => !prevState);
      const select = newRemainingCards[index];
      setCardMove(prevState => [...prevState,select]);
      setNewRemainingCards(prevState => prevState.filter((_, i) => i !== index));
      console.log("le di click")
      setIndexCard(index);
    }
  }
  
  const onHandleRestoreCardClick = () => {
    const reversedCardMove = [...cardMove].reverse();
    setNewRemainingCards(prevState => [...prevState, ...reversedCardMove]);
    setCardMove([]);
  }
  //-----------------------------------------------------------------------------

  // Aqui cojemos el array que enviamos por parametro y lo revolvemos dandonos siempre cartas al azar

  const shuffleArray = (array) => {
    let shuffled = [...array]; 
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  };
  //-----------------------------------------------------------------------------

  //Verifica que el haya mas de 1 carta y que no hayan sido mezcladas anterior mente si ambos son verdaderas al dar click mezcla la baraja y actualiza el current en true para que el hasShuffled cambie a true y no volver a mezclar la barija 

  useEffect(() => {
    if (stateDeck.length > 0 && !hasShuffled.current) {
      const shuffled = shuffleArray(stateDeck);
      setStateDeck(shuffled);
      hasShuffled.current = true;  
    }
  }, [stateDeck, setStateDeck]);
  


  return (
    <ContextDeck.Provider value={{stateDeck, setStateDeck,setIndexCard,indexCard, offsetStep,setClickedCards,clickedCards,onHandleCardClick,onHandleGame,showGame,onHandleRestoreCardClick,newCardList,onHandleQuitGame,newRemainingCards,cardMove}}>
      {children}
    </ContextDeck.Provider>
  )
}

export {ContextDeck, ContextDeckProvider}


ContextDeckProvider.propTypes = {
  children: PropTypes.node.isRequired
}