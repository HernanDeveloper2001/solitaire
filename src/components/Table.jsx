import "../styles/table.css";
import Card from "./Card.jsx";
import CardDeck from "./CardDeck.jsx";
import burgerMenu from "../assets/imgs/icon-burger-menu.svg";
import BurgerMenu from "../functions/BurgerMenu.jsx";
import "../styles/menu.css";
import CardFree from "./CardFree.jsx";
import { useContext } from "react";

import { ContextDeck } from "../contextDeck-card/ContextDeckProvider.jsx";

const Table = () => {
  const { onHandleBurgerMenu, stateBurgerMenu } = BurgerMenu();

  //Context

  const { newRemainingCards,offsetStep, newCardList ,showGame,onHandleRestoreCardClick,onHandleGame, onHandleQuitGame,onHandleCardClick,onHandleCardValue,isLastCardTrue } = useContext(ContextDeck);
  //---------

  return (
    <>
      <div className="table">
        {showGame ? (
          <>
            {/* FREE SPACE SHUFFLED */}
            <div className="container-card-free-space">
              <div className="card-free-space"></div>
              <div className="card-free-space"></div>
              <div className="card-free-space"></div>
              <div className="card-free-space"></div>
            </div>

            <div className="container-card-shuffled">
              {newCardList.map((itemE, indexE) => {
                return (
                  <div className="card-shuffled" key={indexE}>
                    {itemE.map((itemC, indexC) => {
                      return <Card isLastCardTrue={isLastCardTrue} onHandleCardValue={onHandleCardValue} offsetStep={offsetStep} card={itemC} index={indexC} key={indexC}  />;
                    })}
                  </div>
                );
              })}
            </div>

            {/* BARAJA DE CARTAS */}
            <div className="container-card-deck">
              {newRemainingCards.length >= 1 ? (
                <div className="deck">
                  {newRemainingCards.map((item, index) => {
                    return <CardDeck card={item} index={index} key={index} onHandleCardClick={onHandleCardClick} />;
                  })}
                </div>
              ) : (
                <div className="renew-deck" onClick={onHandleRestoreCardClick}>
                  <span className="renew-deck-1"></span>
                  <span className="renew-deck-2"></span>
                  <span className="renew-deck-3"></span>
                </div>
              )}
              <div className="deck">
                <CardFree newRemainingCards={newRemainingCards} />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* FREE SPACE SHUFFLED */}
            <div className="container-card-free-space">
              <div className="card-free-space"></div>
              <div className="card-free-space"></div>
              <div className="card-free-space"></div>
              <div className="card-free-space"></div>
            </div>

            {/* SHUFFLED */}
            <div className="container-card-shuffled">
              <div className="card-shuffled"></div>
              <div className="card-shuffled"></div>
              <div className="card-shuffled"></div>
              <div className="card-shuffled"></div>
              <div className="card-shuffled"></div>
              <div className="card-shuffled"></div>
              <div className="card-shuffled"></div>
            </div>

            {/* DECK */}
            <div className="container-card-deck">
              <div className="deck"></div>
              <div className="deck" id="deck-space-free"></div>
            </div>
          </>
        )}

        {showGame ? (
          <>
            {/*GAME BURGER MENU */}
            <div className="container-burger-menu">
              <div className="burger-menu" onClick={onHandleBurgerMenu}>
                <img src={burgerMenu} alt="burderImage" />
              </div>

              <div
                className={`${
                  stateBurgerMenu ? "container-start-game-menu" : "game-true"
                }`}
              >
                <div className="start-game">
                  <button
                    type="button"
                    // onClick={onHandleGame}
                    className="start-game-button"
                  >
                    NEW GAME
                  </button>
                </div>
                <div className="help-game">
                  <button type="button" className="help-game-button">
                    HELP GAME
                  </button>
                </div>
                <div className="quit-game">
                  <button
                    onClick={onHandleQuitGame}
                    type="button"
                    className="quit-game-button"
                  >
                    QUIT GAME
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/*STAR GAME */}
            <div className={`container-menu-game`}>
              <div className="start-game">
                {showGame ? (
                  <button
                    type="button"
                    onClick={onHandleGame}
                    className="start-game-button"
                  >
                    NEW GAME
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onHandleGame}
                    className="start-game-button"
                  >
                    START GAME
                  </button>
                )}
              </div>
              <div className="help-game">
                <button type="button" className="help-game-button">
                  HELP GAME
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Table;
