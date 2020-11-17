import React, { useContext, createContext } from "react";
import usePersistedState from "../hooks/usePersistedState.hook";
import items from "./data"

export const GameContext = createContext(null);

export const GameProvider = ({ children }) => {

  const [numCookies, setNumCookies] = usePersistedState(1000, "num-cookies");
  const [purchasedItems, setPurchasedItems] = usePersistedState(
    {
      cursor: 0,
      grandma: 0,
      farm: 0,
      megacursor: 0,
    },
    "purchased-items"
  );

  const calculateCookiesPerTick = (obj) => {
    let total = 0;

    items.forEach((listItem) => {
      switch (listItem.id) {
        case "cursor":
          total = total + purchasedItems.cursor;
          break;
        case "grandma":
          total = total + purchasedItems.grandma * 10;
          break;
        case "farm":
          total = total + purchasedItems.farm * 80;
          break;
        case "megacursor":
          break;
        default:
          total = 0;
      }
    });
    return total;
  };

  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        cookiesPerTick: calculateCookiesPerTick(purchasedItems)
      }}
    >
      {children}
    </GameContext.Provider>
  );
};