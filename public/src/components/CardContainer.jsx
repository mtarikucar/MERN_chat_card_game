import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function CardContainer({number, setNumber}) {
  

  useEffect(() => {
    setNumber(Math.floor(Math.random() * 6) + 3);
  }, []);

  return (
    <Container>
      <Card>
        <div className="text">
          {number}
        </div>
      </Card>

      <Card>
        <div className="text">
          sıradaki kart sence üstteki rakamdan büyük mü küçük mü?
        </div>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  border-radius: 0.5rem;
  gap: 0.1rem;
  overflow: hidden;
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: 100%;
  border-radius: 0.5rem;
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
  margin: 0.5rem;
  .number {
    font-size: 32px;
    font-weight: bold;
    color: #333;
  }
  .text {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
`;
