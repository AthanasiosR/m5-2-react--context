import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Item = (props) => {
  const { item, numOwned, handleClick, first } = props;
  const { name, cost, value, id } = item;
  const NameRef = useRef(null);

  useEffect(() => {
    if (first) {
      NameRef.current.focus();
    }
  }, []);

  let rate = id != "megacursor" ? "second" : "click"

  return (
    <Wrapper>
      <button ref={NameRef} onClick={handleClick} >
        <ListItem>
          <ItemName>
            <h1>{name}</h1>
            <p>
  Cost: {cost} cookie(s). Produces {value} cookies/{rate}.
            </p>
          </ItemName>
          <Count>{numOwned}</Count>
        </ListItem>
      </button>
    </Wrapper>
  );
};

export default Item;

const Wrapper = styled.div`
  display: flex;
  button {
    text-align: left;
    background-color: #222222;
    color: white;
    border: none;
  }
`;
const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid grey;
  padding: 10px 0 10px 0;
  width: 450px;
  p {
    font-size: 16px;
    color: grey;
  }
`;

const Count = styled.span`
  font-size: 36px;
  margin-right: 10px;
`;

const ItemName = styled.div`
  h1 {
    font-size: 26px;
    padding-bottom: 2px;
  }
`;