import React from "react";
import styled from "styled-components";

const Card = ({number}) => {
  const randomNumber = Math.floor(Math.random() * 10);

  return (
    <CardContainer>
      <CardNumber>{number ? number: randomNumber} </CardNumber>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 100%;
  border-radius: 0.5rem;
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
  margin: 0.5rem;
`;

const CardNumber = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: #333;
`;
