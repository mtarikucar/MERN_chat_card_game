import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Welcome from "../components/Welcome";
import GameContainer from "../components/GameContainer";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [confessions,setConfessions] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  return (
    <>
      <Container>
        <div className="container">
          {currentChat === undefined ? (
            <Welcome setCurrentChat={setCurrentChat} />
          ) : (
            <>
              <ChatContainer room={currentChat} setConfessions={setConfessions} socket={socket} />
              <GameContainer room={currentChat} socket={socket} />
            </>
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    border-radius: 2rem;
    height: 85vh;
    width: 85vw;
    grid-template-columns: 50% 50%;
    @media screen and (min-width: 0px) and (max-width: 720px) {
      height: 100vh;
      width: 100vw;
      border-radius: 0rem;
    }
    background-color: #00000076;
    display: grid;
  }
`;
