import React, { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import cookieSrc from "../cookie.svg";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";
import useDocumentTitle from "../hooks/useDocumentTitle.hook";
import useKeydown from "../hooks/useKeydown.hook";
import { GameContext, GameProvider } from "./GameContext";
import items from "./data";

const Game = () => {
  
  const {
    numCookies,
    setNumCookies,
    purchasedItems,
    setPurchasedItems,
    cookiesPerTick,
  } = useContext(GameContext);

  const cookieClick = useRef(null);
  let clickRate =
    purchasedItems.megacursor === 0
      ? numCookies + 1
      : numCookies + 3 * purchasedItems.megacursor;

  useDocumentTitle(
    `${numCookies.toLocaleString()} cookies - Cookie Clicker Workshop`,
    "Cookie Clicker Workshop"
  );

  useKeydown("Space", () => {
    document.activeElement.blur();
    cookieClick.current.click();
  });

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{cookiesPerTick}</strong> cookies per second
          <p>
            <strong>
              {purchasedItems.megacursor === 0
                ? 1
                : purchasedItems.megacursor * 3}
            </strong>{" "}
            cookies per click
          </p>
        </Indicator>
        <Button
          onClick={() => {
            setNumCookies(clickRate);
          }}
          ref={cookieClick}
        >
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((listItem, i) => (
          <Item
            first={i === 0 ? true : false}
            item={listItem}
            numOwned={purchasedItems[listItem.id]}
            handleClick={(ev) => {
              if (numCookies >= listItem.cost) {
                setNumCookies(numCookies - listItem.cost);
                setPurchasedItems({
                  ...purchasedItems,
                  [listItem.id]: purchasedItems[listItem.id] + 1,
                });
                listItem.cost = Math.floor(listItem.cost * 1.25);
                ev.target.blur();
              } else {
                alert("You don't have enough cookies!");
                return;
              }
              return;
            }}
          />
        ))}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;