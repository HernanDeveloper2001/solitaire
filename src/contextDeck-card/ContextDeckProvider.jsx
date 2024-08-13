import { createContext, useState, useEffect, useRef } from "react"
import DECK from "../components/deck-card/Deck"
import PropTypes from "prop-types";
import BurgerMenu from "../functions/BurgerMenu";


const ContextDeck = createContext(); 

const ContextDeckProvider = ({children}) => {

  const [stateDeck, setStateDeck] = useState(DECK);

  const hasShuffled = useRef(false);

  const [clickedCards, setClickedCards] = useState(false); 
  
  const [showGame, setShowGame] = useState(false);
  
  const [newCardList, setNewCardList] = useState([]);
  const [newRemainingCards, setNewRemainingCards] = useState([]);


  const offsetStep = 10;

  const { setStateBurgerMenu } = BurgerMenu();

  const onHandleQuitGame = () => {
    setShowGame(false);  // Oculta el juego
    setStateDeck(DECK);  // Restaura el mazo al estado original (DECK es tu mazo inicial)
    setNewCardList([]);  // Vacía la lista de cartas distribuidas
    setNewRemainingCards([]);  // Vacía la lista de cartas restantes
    setCardMove([]);  // Vacía las cartas que estaban en movimiento (opcional, si necesitas)
    setIndexCard(null);  // Resetea el índice de la carta seleccionada (opcional)
    hasShuffled.current = false;  // Resetea el estado de mezcla (si deseas permitir una nueva mezcla)
    setStateBurgerMenu(false)
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


  const onHandleCardClick = (item,index) => {
    if(index >= 0){
      setClickedCards(prevState => !prevState);
      const select = newRemainingCards[index];
      setCardMove(prevState => [...prevState,select]);
      setNewRemainingCards(prevState => prevState.filter((_, i) => i !== index));
      setIndexCard(index);
      onHandleCardValue(item)
    }
  }
  
  const onHandleRestoreCardClick = () => {
    const reversedCardMove = [...cardMove].reverse();
    setNewRemainingCards(prevState => [...prevState, ...reversedCardMove]);
    setCardMove([]);
  }


  const [isLastCardTrue, setIsLastCardTrue] = useState(false);

  const onHandleCardValue = (item) => { 
    const lastCard = newCardList.map(itemE => itemE[itemE.length - 1]);
    const isLast = lastCard.some(itemL => itemL === item)
    
    let value = null;
    let card = "";
    if(isLast){
      switch(item){
        // Diamonds
        case "/src/assets/imgs/diamonds/diamond-as.png":
          value = 1;
          card = "diamond-as";
          break;
        case "/src/assets/imgs/diamonds/diamond-2.webp":
          value = 2;
          card = "diamond-2";
          break;
        case "/src/assets/imgs/diamonds/diamond-3.jpg":
          value = 3;
          card = "diamond-3";
  
          break;
        case "/src/assets/imgs/diamonds/diamond-4.webp":
          value = 4;
          card = "diamond-4";
  
          break;
        case "/src/assets/imgs/diamonds/diamond-5.webp":
          value = 5;
          card = "diamond-5";
  
          break;
        case "/src/assets/imgs/diamonds/diamond-6.png":
          value = 6;
          card = "diamond-6";
          break;
        case "/src/assets/imgs/diamonds/diamond-7.png":
          value = 7;
          card = "diamond-7";
  
          break;
        case "/src/assets/imgs/diamonds/diamond-8.webp":
          value = 8;
          card = "diamond-8";
  
          break;
        case "/src/assets/imgs/diamonds/diamond-9.webp":
          value = 9;
          card = "diamond-9";
  
          break;
        case "/src/assets/imgs/diamonds/diamond-10.webp":
          value = 10;
          card = "diamond-10";
  
          break;
        case "/src/assets/imgs/diamonds/diamond-jack.jpg":
          value = 11;
          card = "diamond-jack";
          break;
        case "/src/assets/imgs/diamonds/diamond-king.jpg":
          value = 12;
          card = "diamond-king";
          break;
        case "/src/assets/imgs/diamonds/diamond-queen.jpg":
          value = 13;
          card = "diamond-queen";
          break;
  
        //clubs
        case "/src/assets/imgs/clubs/club-as.png":
          value = 1;
          card = "club-as";
          break;
        case "/src/assets/imgs/clubs/club-2.jpg":
          value = 2;
          card = "club-2";
          break;
        case "/src/assets/imgs/clubs/club-3.jpg":
          value = 3;
          card = "club-3";
  
          break;
        case "/src/assets/imgs/clubs/club-4.jpg":
          value = 4;
          card = "club-4";
  
          break;
        case "/src/assets/imgs/clubs/club-5.gif":
          value = 5;
          card = "club-5";
  
          break;
        case "/src/assets/imgs/clubs/club-6.png":
          value = 6;
          card = "club-6";
          break;
        case "/src/assets/imgs/clubs/club-7.png":
          value = 7;
          card = "club-7";
  
          break;
        case "/src/assets/imgs/clubs/club-8.jpg":
          value = 8;
          card = "club-8";
  
          break;
        case "/src/assets/imgs/clubs/club-9.gif":
          value = 9;
          card = "club-9";
  
          break;
        case "/src/assets/imgs/clubs/club-10.jpg":
          value = 10;
          card = "club-10";
  
          break;
        case "/src/assets/imgs/clubs/club-jack.jpg":
          value = 11;
          card = "club-jack";
          break;
        case "/src/assets/imgs/clubs/club-king.png":
          value = 12;
          card = "club-king";
          break;
        case "/src/assets/imgs/clubs/club-queen.jpg":
          value = 13;
          card = "club-queen";
          break;
  
        //spades
        case "/src/assets/imgs/spades/spade-as.png":
          value = 1;
          card = "spade-as";
          break;
        case "/src/assets/imgs/spades/spade-2.png":
          value = 2;
          card = "spade-2";
          break;
        case "/src/assets/imgs/spades/spade-3.png":
          value = 3;
          card = "spade-3";
  
          break;
        case "/src/assets/imgs/spades/spade-4.png":
          value = 4;
          card = "spade-4";
  
          break;
        case "/src/assets/imgs/spades/spade-5.jpg":
          value = 5;
          card = "spade-5";
  
          break;
        case "/src/assets/imgs/spades/spade-6.jpg":
          value = 6;
          card = "spade-6";
          break;
        case "/src/assets/imgs/spades/spade-7.webp":
          value = 7;
          card = "spade-7";
  
          break;
        case "/src/assets/imgs/spades/spade-8.png":
          value = 8;
          card = "spade-8";
  
          break;
        case "/src/assets/imgs/spades/spade-9.jpg":
          value = 9;
          card = "spade-9";
  
          break;
        case "/src/assets/imgs/spades/spade-10.jpg":
          value = 10;
          card = "spade-10";
  
          break;
        case "/src/assets/imgs/spades/spade-jack.jpg":
          value = 11;
          card = "spade-jack";
          break;
        case "/src/assets/imgs/spades/spade-king.jpg":
          value = 12;
          card = "spade-king";
          break;
        case "/src/assets/imgs/spades/spade-queen.jpg":
          value = 13;
          card = "spade-queen";
          break;
  
        //hearts
        case "/src/assets/imgs/hearts/heart-as.png":
          value = 1;
          card = "heart-as";
          break;
        case "/src/assets/imgs/hearts/heart-2.svg":
          value = 2;
          card = "heart-2";
          break;
        case "/src/assets/imgs/hearts/heart-3.jpg":
          value = 3;
          card = "heart-3";
  
          break;
        case "/src/assets/imgs/hearts/heart-4.jpg":
          value = 4;
          card = "heart-4";
  
          break;
        case "/src/assets/imgs/hearts/heart-5.png":
          value = 5;
          card = "heart-5";
  
          break;
        case "/src/assets/imgs/hearts/heart-6.png":
          value = 6;
          card = "heart-6";
          break;
        case "/src/assets/imgs/hearts/heart-7.jpg":
          value = 7;
          card = "heart-7";
  
          break;
        case "/src/assets/imgs/hearts/heart-8.png":
          value = 8;
          card = "heart-8";
  
          break;
        case "/src/assets/imgs/hearts/heart-9.jpg":
          value = 9;
          card = "heart-9";
  
          break;
        case "/src/assets/imgs/hearts/heart-10.jpg":
          value = 10;
          card = "heart-10";
  
          break;
        case "/src/assets/imgs/hearts/heart-jack.webp":
          value = 11;
          card = "heart-jack";
          break;
        case "/src/assets/imgs/hearts/heart-king.jpg":
          value = 12;
          card = "heart-king";
          break;
        case "/src/assets/imgs/hearts/heart-queen.webp":
          value = 13;
          card = "heart-queen";
          break;
        
        default: 
          break;
      }
      setIsLastCardTrue(true)
    }else{
      setIsLastCardTrue(false)
    }
    return { value, card}
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
    <ContextDeck.Provider value={{stateDeck, setStateDeck,setIndexCard,indexCard, offsetStep,setClickedCards,clickedCards,onHandleGame,showGame,onHandleRestoreCardClick,newCardList,onHandleQuitGame,newRemainingCards,cardMove,onHandleCardClick,onHandleCardValue,isLastCardTrue}}>
      {children}
    </ContextDeck.Provider>
  )
}

export {ContextDeck, ContextDeckProvider}


ContextDeckProvider.propTypes = {
  children: PropTypes.node.isRequired
}