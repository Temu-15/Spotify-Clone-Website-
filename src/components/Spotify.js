import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Body from "./Body";
function Spotify() {
  return (
    <Container>
      <div className="spotify__body">
        <Sidebar />
        <div className="body">
          <Navbar />
          <div className="body__contents">
            <Body />
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  display: grid;
  grid-template-rows: 85vh 15vh;
  overflow: hidden;
  .spotify__body {
    display: grid;
    grid-template-columns: 18vw 82vw;
    width:100%;
    height:100%;
    background:linear-gradient(transparent, rgba(0,0,0,1));
    background-color:#121212;
  }
  .body{
    overflow-x:hidden;
    width:100%;
    height:100%;
    padding:0;
    &::-webkit-scrollbar{
      width:8px;

      &-thumb{
        background-color:rgba(255,255,255,0.4);
        border-radius:5px;
        
      }
    }
  }
`;
export default Spotify;
