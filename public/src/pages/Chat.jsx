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
  const navigate = useNavigate();
  const socket = useRef();

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [enter, setEnter] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [result, setResult] = useState(undefined);

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

  useEffect(() => {
    if (socket.current) {
      socket.current.on("onlineUsers", async (data) => {
        const roomMates = await axios.get(
          roomMatesRoute + `/${currentUser.room}`
        );
        setOnlineUsers(roomMates.data.roomMates);
      });
    }
  }, [socket.current]);

  useEffect(() => {
    /* toast("biri girdi veya çıktı"); */
  }, [onlineUsers]);

  useEffect(() => {
    if (result) {
      setStartGame(!startGame);
      if (result === "correct") {

      } else {
        let confession = messages
          .filter(
            (message) =>
              message.isConfession === true &&
              message.username == currentUser.username
          )
          .pop();
        console.log(confession);
        confession.isConfession = false
        confession.marked = true
        confession && setMessages((prev) => [...prev, confession]);
        socket.current.emit("send-msg", {
          room: currentUser.room,
          from: currentUser.username,
          message: confession.message,
          isConfession: confession.isConfession,
          marked: confession.marked
        });
      }
    }
  }, [result]);

  const checkConfessors = () => {
    const markedUsers = messages
      .filter((message) => message.isConfession === true)
      .map(
        (message) =>
          onlineUsers.find((user) => user.username === message.username)
            ?.username
      )
      .filter((user, index, self) => self.indexOf(user) === index);

    return onlineUsers.filter((item) => !markedUsers.includes(item.username));
  };

  const handleGameStart = () => {
    const fugitives = checkConfessors();
    if (fugitives.length === 0) {
      setStartGame(!startGame);
    } else {
      toast("itiraf atmayan kaçaklar var");
    }
    console.log(fugitives);
  };
  const deneme = () => {
    let fugitives = checkConfessors();
    console.log(fugitives);
  };

  return (
    <>
      <Container>
        <div className="container">
          {enter === false ? (
            <Welcome setEnter={setEnter} currentUser={currentUser} />
          ) : (
            <>
              {startGame ? (
                <GameContainer setResult={setResult} />
              ) : (
                <button id="start" onClick={handleGameStart}>
                  <div className="header">
                    oyuna girmek için bir itiraf gönder ve herkesin itiraf
                    göndermesini bekle
                  </div>
                </button>
              )}
              <ChatContainer
                currentUser={currentUser}
                socket={socket}
                messages={messages}
                setMessages={setMessages}
              />
            </>
          )}
        </div>
        <button onClick={deneme}>deneme butonu</button>
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
        background-color: #00000076;
        -webkit-transition: background-color 200ms linear;
        -ms-transition: background-color 200ms linear;
        transition: background-color 200ms linear;
      }
    }
    background-color: #00000076;
    display: grid;
  }
`;
