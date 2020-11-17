import React, { useContext, createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import useInterval from "../hooks/use-interval.hook";
import items from "./data";

import { GameContext, GameProvider } from "./GameContext";

function App() {
  const { cookiesPerTick, setNumCookies, numCookies } = useContext(GameContext);

  useEffect(() => {
    let timeDiff = Math.round(Date.now() - localStorage.getItem("timestamp"));
    timeDiff = Math.round(timeDiff / 1000);
    let newCookies = cookiesPerTick * timeDiff;
    console.log(newCookies);
    setNumCookies(numCookies + newCookies);
  }, []);

  useInterval(() => {
    const numOfGeneratedCookies = cookiesPerTick;
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Router>
    </>
  );
}

export default App;
