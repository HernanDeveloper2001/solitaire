import { useState } from "react"

const BurgerMenu = () => {

  const [stateBurgerMenu, setStateBurgerMenu] = useState(false);

  const onHandleBurgerMenu = () => {
    setStateBurgerMenu(prevState => !prevState);
  }

  return {
    stateBurgerMenu,
    onHandleBurgerMenu,
    setStateBurgerMenu
  }
}

export default BurgerMenu