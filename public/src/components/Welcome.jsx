import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome({setCurrentChat}) {
  const [values, setValues] = useState({});
  useEffect(async () => {
    setValues(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      )
    );
    
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Hoşgeldin, <span>{values.username}!</span>
      </h1>
      <button onClick={()=>setCurrentChat(values.room)}>{values.room} numaralı odaya katıl</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    margin-top: 2rem;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
