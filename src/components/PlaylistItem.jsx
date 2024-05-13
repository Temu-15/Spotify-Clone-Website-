import React from "react";
import styled from "styled-components";
import { FaPlay } from "react-icons/fa";
import { useStateProvider } from "../utils/StateProvider";

function PlaylistItem({playlist, className}) {
  const [{}, dispatch] = useStateProvider();

  const imageUrl = playlist.images && playlist.images.length > 0 ? playlist.images[0].url : '';
  const playlist_description = playlist.description ? playlist.description.replace(/<[^>]*>?/gm, '') : ''
  const playlist_name = playlist.name || '';
 function ClickHandler(){
  dispatch({
    type:"SET_SELECTED_PLAYLIST",
    selectedPlaylist:playlist,
  })


 }
//  position:absolute;
//   display:flex;
//   justify-content:center;
//   align-items:center;
//   bottom:30%;
//   right:1rem;
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   color: #fafafa;
//   background-color: #1db954;
//   box-shadow: 0 4px 16px -4px #121212;
//   transition: 0.4s, transform 0.1s;
//   opacity: 0;
  return (
    <Container className={className} onClick={ClickHandler}>
        <div className="playlist__image">
        <img src={imageUrl} alt={playlist_description}/>
        </div>
        <div className="playIcon">
          <FaPlay />
        </div>
       
        <div className="playlist__iteminfo" >
            <h4>{playlist_name}</h4>
           <p>{playlist_description}</p>
        </div>
    </Container>
  )
}

export default PlaylistItem

const Container = styled.div`
  border-radius: 5px;
  padding: 16px;
  background-color: #181818;
  -webkit-transition: background-color .3s ease;
  transition: background-color .3s ease;
  position:relative;
  overflow: hidden;
  &:hover{
    background-color: #282828;
  }
  &:hover .playIcon{
    opacity:1;
   
  }
  .playlist__image {
    position: relative;
    -webkit-box-shadow: 0 -4px 12px rgb(0 0 0 / 50%);
    box-shadow: 0 -4px 12px rgb(0 0 0 / 50%);
    img {
      height: 100%;
    width: 100%;
    border-radius: 2px;
    }
  }

.playIcon{
    position: absolute;
    bottom: 94px;
    right: 24px;
    opacity: 0;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
    -webkit-box-shadow: 0 8px 8px rgb(0 0 0 / 30%);
    box-shadow: 0 8px 8px rgb(0 0 0 / 30%);
    background-color: #1db954;
    height: 40px;
    width: 40px;
    -webkit-transition: -webkit-transform 33ms cubic-bezier(.3,0,0,1);
    transition: -webkit-transform 33ms cubic-bezier(.3,0,0,1);
    transition: transform 33ms cubic-bezier(.3,0,0,1);
    transition: transform 33ms cubic-bezier(.3,0,0,1),-webkit-transform 33ms cubic-bezier(.3,0,0,1);
    z-index: 2;
    border-radius: 500px;
    display:flex;
    justify-content:center;
    align-items:center;
   
  &:hover {
   
  }
 

}



  .playlist__iteminfo {
    color:#fff;
    margin-top: 16px;
    min-height: 62px;

    h4 {
      font-size: clamp(12px, 2vw, 18px);
      margin: 0px;
    }

    p {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      height: 2.5em;
      font-size: 14px;
      color: rgb(179, 179, 179);
      padding-bottom:5px;
    }
  }
`;
