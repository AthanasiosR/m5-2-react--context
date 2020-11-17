import React, { useState, useEffect } from "react";

const UsePersistedState = (initial, key) => {
  const [value, setValue] = useState(
    localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : initial //Check if in local storage - Y return value - N return intial
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value)); //When key is changed, store a new value
    localStorage.setItem("timestamp", Date.now());
  }, [key, value]);

  return [value, setValue];
};

export default UsePersistedState;