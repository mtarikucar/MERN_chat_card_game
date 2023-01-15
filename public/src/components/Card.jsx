import React from "react";
import styled from "styled-components";

const Card = () => {
  const randomNumber = Math.floor(Math.random() * 10);

  return (
    <CardContainer>
      <CardNumber>{randomNumber} ...</CardNumber>
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
`;

const CardNumber = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: #333;
`;
