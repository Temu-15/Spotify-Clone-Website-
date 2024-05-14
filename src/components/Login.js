import React from "react";
import styled from "styled-components";
import loginUrl from "../utils/spotify";
export default function Login() {
  const handleClick = () => {
    window.location.href = loginUrl;
  };
  return (
    <Container>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
        alt="spotify logo"
      />
      <button type="submit" onClick={handleClick}>
        Connect to Spotify
      </button>
    </Container>
  );
}


const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
height:100vh;
widthL100vw;
background-color:#1db954;
gap:5rem;
button{
    background-color:black;
    color:#49f585;
    padding:1rem 5rem;
    border-radius:5rem;
    border:none;
    font-size:1.4rem;
    cursor:pointer;
}
img{
    height:30vh;
    
}
@media (max-width:768px){
  img{
    width:80%;
    object-fit:contain;
  }
}
`;
