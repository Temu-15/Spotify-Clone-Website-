import React from "react";
import { useStateProvider } from "../utils/StateProvider";
import styled from "styled-components";
const Container = styled.div`
  height: 50%;
  width: 100%;
  padding-bottom:15vh;
  overflow: hidden;
  h4 {
    margin: 0.5rem 0 -0.3rem 1rem;
    font-size: 22px;
  }
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar{
      width:4px;

      &-thumb{
        background-color:rgba(255,255,255,0.4);
        border-radius:5px;
        
      }
    }
    .playlist__item {
      display: flex;
      gap: 0.7rem;
      align-items: center;
      img {
        width: 42px;
        height: 42px;
      }
      li {
        cursor:pointer;
        transition:0.1s ease-in-out;
        &:hover {
          color: #1db954;
          font-weight: 600;
          

        }
      }
    }
  }
`;
function Playlists() {
  const [{ playlists }, dispatch] = useStateProvider();
  function clickNavigateHandler(playlist){
    console.log(playlist);
    dispatch({
      type: "SET_SELECTED_PLAYLIST",
      selectedPlaylist: playlist
    });
  }
  return (
    <Container>
      <h4>Playlists </h4>
      <ul>
        {playlists?.items.map((playlist) => (
          <div className="playlist__item" onClick={() => clickNavigateHandler(playlist)}>
            <img src={playlist.images[0].url} alt="album__image" />
            <li key={playlist.id} >{playlist.name}</li>
          </div>
        ))}
      </ul>
    </Container>
  );
}

export default Playlists;
