import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import CardContainer from "./CardContainer";
import Decision from "./Decision";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function GameContainer({currentChat,socket}) {
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

  const [decision, setDecision] = useState(undefined);

  useEffect(() => {
    if (decision === undefined) {
      toast(`🦄 sıradaki kart için tahminini yap`, toastOptions);
    } else {
      toast(
        `🦄 sıradaki kart için tahminin ${
          decision === "up" ? "büyük" : "küçük"
        }`,
        toastOptions
      );
    }
  }, [decision]);


  return (
    <Container decision={decision}>
      <div className="game-header">
        <h3>Oyun</h3>
      </div>
      <div className="game-cards">
        <CardContainer />
      </div>
      <div className="decision">
        {!decision && (
          <>
            <Decision setDecision={setDecision} />
          </>
        )}
        <ToastContainer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: ${(props) =>
    props.decision === undefined ? "10% 45% 45%" : "10% 90%"};
  border-radius: 0.5rem;
  gap: 0.1rem;
  overflow: hidden;

  .game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    h3 {
      color: white;
    }
  }
  .game-cards {
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
  }
`;
