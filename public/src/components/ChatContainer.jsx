import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChatContainer({
  setMessages,
  messages,
  currentUser,
  socket
}) {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);



  //burda local storage'dan oda değiştirme bug'ı bıraktım bilerek ilerde kullanırız kral :) 
  //useEffect ile room değşirse kontrolü ile buugı kontrol edebilirdin ama kaldırdıım :)

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

    socket.current.emit("send-msg", {
      room: data.room,
      from: data.username,
      message: msg,
      isConfession: false,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      room: data.room,
      message: msg,
      isConfession: false,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg, isConfession: false ,username:data.username});

    setMessages(msgs);
    
  };

  const handleSendConfession = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

    socket.current.emit("send-msg", {
      room: data.room,
      from: data.username,
      message: msg,
      isConfession: true,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      room: data.room,
      message: msg,
      isConfession: true,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg, isConfession: true, username:data.username });

    setMessages(msgs);

    toast(`itirafın bu mu gerçekten : ${msg}`, toastOptions);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (data) => {
        setArrivalMessage({ fromSelf: false, message: data.message, username: data.from ,isConfession: data.isConfession, marked:data.marked});
      });
    }
  }, [socket.current]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="room">
            <h3>oda: {currentUser.room}</h3>
          </div>
        </div>
        <Logout socket={socket} />
      </div>
      <div className="chat-messages">
        {messages
          .filter((message) => message.isConfession != true)
          .map((message) => {
            return (
              <div ref={scrollRef} key={uuidv4()}>
                <div
                  className={`message ${
                    message.fromSelf  ? "sended" : "recieved"
                  }`}
                >
                  <div className={`${message.marked ? "marked": "content"}`}>
                    <div className="username">
                      <p>{message.username}</p>
                    </div>
                    <p>{message.message}</p>
                    
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <ChatInput
        handleSendMsg={handleSendMsg}
        handleSendConfession={handleSendConfession}
      />
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  border-radius: 0.5rem;
  gap: 0.1rem;
  overflow: hidden;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .room{
        h3{
          color:white;
        }
      }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;

      
      
      .marked{
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #FFC000;
        .username {
          margin-bottom:0.5rem;   
            color: white;
            font-size:0.7rem;
        }
      }
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        .username {
          margin-bottom:0.5rem;   
            color: white;
            font-size:0.7rem;
        }
      }
    }
    .sended {
      
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
