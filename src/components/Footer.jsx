import React from "react";
import styled from "styled-components";
import { FaPlay } from "react-icons/fa";
import { useStateProvider } from "../utils/StateProvider";
import AudioPlayer from "./AudioPlayer";
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #181818;
  color:#fff;
`;
function Footer()
{
  return <Container>
    <AudioPlayer />
   
    
  </Container>;
}

export default Footer;
