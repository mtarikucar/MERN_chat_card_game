import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Card from "./Card";
import Logout from "./Logout";


export default function Confessions({ room, socket }) {
  

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">

          <div className="username">
            <h3>İtiraflar</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages">
        <Card/>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 90% ;
  border-radius:0.5rem;
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

      .username {
        h3 {
          color: white;
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
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;

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
