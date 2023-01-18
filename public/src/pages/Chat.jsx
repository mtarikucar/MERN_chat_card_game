import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { host, roomMatesRoute } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Welcome from "../components/Welcome";
import GameContainer from "../components/GameContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Chat() {
  const toastOptions = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  const navigate = useNavigate();
  const socket = useRef();

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [enter, setEnter] = useState(false);
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
      socket.current.emit("room", currentUser.room);
      socket.current.emit("add-user", currentUser);
      const roomMates = await axios.get(
        roomMatesRoute + `/${currentUser.room}`
      );
      setOnlineUsers(roomMates.data.roomMates);
    }

  }, [currentUser]);

  useEffect(  () => {
    if (socket.current) {
      socket.current.on("onlineUsers", async(data) => {
        const roomMates = await axios.get(
          roomMatesRoute + `/${currentUser.room}`
        );
        setOnlineUsers(roomMates.data.roomMates);
      });
    }
  }, [socket.current]);
  
  useEffect(()=>{
    console.log(onlineUsers);
    toast("biri girdi veya çıktı");
  },[onlineUsers])
  
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
                  oyuna girmek için bir itiraf gönder ve herkesin itiraf
                  göndermesini bekle
                  {onlineUsers.map((user, key) => (
                    <p key={key} className="user">
                      {user.username}
                    </p>
                  ))}
                  
                </button>
              )}
              <ChatContainer currentUser={currentUser} socket={socket} />
            </>
          )}
        </div>
      </Container>
      <ToastContainer />
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

