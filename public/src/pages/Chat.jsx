import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { host, roomMatesRoute } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Welcome from "../components/Welcome";
import GameContainer from "../components/GameContainer";
import axios from "axios";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();

  const [users, setUsers] = useState([]);
  const [enter,setEnter] = useState(false)
  const [startGame, setStartGame] = useState(false);
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

  useEffect(async () => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser);
      const roomMates = await axios.get(
        roomMatesRoute + `/${currentUser.room}`
      );
      setUsers(roomMates.data.roomMates);
    }
  }, [currentUser]);

  return (
    <>
      <Container>
        <div className="container">
          {enter === false ? (
            <Welcome setEnter={setEnter} currentUser={currentUser} />
          ) : (
            <>
              {startGame ? (
                <GameContainer room={currentUser.room} socket={socket} />
              ) : (
                <button id="start" onClick={() => setStartGame(!startGame)}>
                  oyuna gir
                </button>
              )}
              <ChatContainer room={currentUser.room} socket={socket} users={users} />
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
    @media screen and (min-width: 0px) and (max-width: 1080px) {
      height: 100vh;
      width: 100vw;
      border-radius: 0rem;
      grid-template-columns: 100%;
      grid-template-rows: 50% 50%;
    }
    #start {
      background-color: #4e0eff;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      &:hover {
        background-color: #4e0eff;
      }
    }
    background-color: #00000076;
    display: grid;
  }
`;
