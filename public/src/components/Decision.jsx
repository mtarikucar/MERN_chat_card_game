import styled from "styled-components";
import { BsFillFileArrowDownFill, BsFillFileArrowUpFill } from "react-icons/bs";


function Decision({setDecision}) {


  return (
    <Container>
    <div className="icon">
      <BsFillFileArrowUpFill onClick={()=>setDecision("up")} />
    </div>
    <div className="icon">
      <BsFillFileArrowDownFill onClick={()=>setDecision("down")}/>
    </div>
  </Container>
  )
}

export default Decision



const Container = styled.div`
  display: flex;
  grid-template-colums: 50% 50%;
  justify-content: space-around;
  .icon{
    svg {
      color: #FFFFFF;
      cursor: pointer;
      &:hover {
        color: #51557E;
      }
    }
    font-size: 250px;
    @media only screen and (max-width: 1080px) {
      font-size: 125px;  
    }
    "&:hover": {
      background: "#efefef"
    },
`;
