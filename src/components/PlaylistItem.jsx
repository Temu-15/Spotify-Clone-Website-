import React from "react";
import styled from "styled-components";
import { FaPlay } from "react-icons/fa";
import { useStateProvider } from "../utils/StateProvider";
import { useNavigate } from "react-router-dom";


function PlaylistItem({playlist, className}) {
  const [{}, dispatch] = useStateProvider();
  const navigate = useNavigate();
  

  const imageUrl = playlist.images && playlist.images.length > 0 ? playlist.images[0].url : '';
  const playlist_description = playlist.description 
  ? playlist.description.replace(/<[^>]*>?/gm, '').split(/\s+/).slice(0, 5).join(' ') + '...' : '';

  const playlist_name = playlist.name || '';
 function ClickHandler(){

      navigate(`/playlist/playlistTracks?playlist_id=${playlist.id}`)
 }

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
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  width:152px;
  height:204px;
  border-radius: 4px;
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
    position:relative;
    width: 128px;
    height: 128px;
    
   
    margin:0 auto;
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    -webkit-box-shadow: 0 -4px 12px rgb(0 0 0 / 50%);
    box-shadow: 0 -4px 12px rgb(0 0 0 / 50%);
    
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
      font-family: 'Poppins', sans-serif;
      font-size: clamp(12px, 2vw, 18px);
      font-style: normal;
     font-weight: 700;
     line-height: 16px;
     color:#fff;
     text-wrap:nowrap;
    margin: 0px;
    }

    p {
    
      font-style: normal;
      font-size:14px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      height: 2.5em;
      color: rgb(179, 179, 179);
      padding-bottom:5px;
    }
  }
`;
