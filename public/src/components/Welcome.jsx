import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome({setEnter,currentUser}) {

  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Hoşgeldin, <span>{currentUser?.username}!</span>
      </h1>
      <button onClick={()=>setEnter(true)}>{currentUser?.room} numaralı odaya katıl</button>
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
