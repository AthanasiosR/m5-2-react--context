import React, { useEffect } from "react";

const useKeydown = (code, callback) => {
  useEffect(() => {
    window.addEventListener("keydown", (ev) => {
      if (ev.code === code) {
        callback();
      }
    });

    return () => {
      window.removeEventListener("keydown", () => {});
    };
  }, []);
};

export default useKeydown;