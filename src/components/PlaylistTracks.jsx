import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import { useStateProvider } from '../utils/StateProvider';
import { FaPlayCircle } from 'react-icons/fa';
import { CgChevronLeft } from 'react-icons/cg';
import { CgChevronRight } from 'react-icons/cg';

const Container = styled.div`
color:white;
width:100%;
display:flex;
flex-direction:column;
overflow-x:hidden;
.playlist_tracks_controls{
  color:white;
  .chevron_left{
    font-size:2.5rem;
    font-weight:bold;
    cursor:pointer;
    
  }
  .chevron_right{
    font-size:2.5rem;
    font-weight:bold;
    cursor:pointer;
  }
}
.playlist__thumbnail{
  width:100%;
  display:flex;
  justify-content:start;
  gap:2rem;
  background-color:#121212;
  padding:2rem 2rem;
.playlist__image{
    width:180px;
    object-fit:contain;
    align-self:flex-end;
    img{
      width:100%;
      height:100%;
      border-radius:10px;
     }
}
}



.playlist_item_container{
  width:100%;
  height:100%;
  padding:2rem;
  overflow:auto;
  display:flex;
  flex-direction:column;
  gap:1.2rem;
  .playlist__item{
    width:100%;
    height:60px;
    position:relative;
    padding:0.15rem 2.2rem;
    box-shadow:4px 4px 10px #000;
    display:grid;
    grid-template-columns:40% 20% 20% 20%;
    justify-content:space-evenly;
    align-content:center;
    list-style:none;
    &:hover .play_icon{
      background:#1db954;
      cursor:pointer;
      transform:scale(1.1);
    }
    .play_icon{
      position:absolute;
      left:-0.7rem;
      bottom:35%;
      width:30px;
      height:30px;
      background:#181818;
      display:flex;
      justify-content:center;
      align-items:center;
      border-radius:100%;
      &:hover{
       
      }

    }
    .track__info_song{
      width:100%;
      height:100%;
      display:flex;
      justify-content:start;
      gap:1rem;
      img{
        width:50px;
        height:50px;
        border-radius:4px;
      }
      .playlist__description_title{
       h3{
        margin:0;
       }
        p{
          margin:0;
          font-size:1rem;
          color:#eee;
          opacity:0.7;
        }
      }
    }
  }
}
`

function PlaylistTracks() {
  const [{playlistTracks, selectedPlaylist}, dispatch]= useStateProvider();
  console.log(selectedPlaylist,playlistTracks);
  const formatDate = (dateString) => {
    const addedAtDate = new Date(dateString);
    if (!isNaN(addedAtDate.getTime())) {
      return addedAtDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } else {
      return "Invalid Date";
    }
  };

 function playTrackClickHandler(url){
  
   dispatch({
     type:"SET_CURRENT_TRACK",
     currentTrack:url,
   })
 }

 function chevronClickHandler(){
   dispatch({
     type:"SET_SELECTED_PLAYLIST",
     selectedPlaylist:null,
   })
 }
  return (
    <Container>
      <div className="playlist_tracks_controls" >
      <CgChevronLeft className='chevron_left' onClick={chevronClickHandler}/>
      <CgChevronRight className='chevron_right'/>

      </div>
        <div className="playlist__thumbnail">
          <div className="playlist__image">
            <img src={selectedPlaylist.images[0].url} alt="" srcset="" />
          </div>
          <div className="playlist__description">
            <h1>{selectedPlaylist.name}</h1>
            <p>{selectedPlaylist.description.replace(/<[^>]*>?/gm, '')}</p>
          </div>
       </div>


       <div className="playlist_item_container">
       
           {playlistTracks?.items.map((track) => (
         
             <li key={track.track.id} className="playlist__item" onClick={() => playTrackClickHandler(track.track)}
             >
               <div className="play_icon">
                 <FaPlayCircle/>
               </div>
            
               <div className="track__info_song">
                  <img src={track.track.album.images[0].url} alt="" srcset="" />
                  <div className="playlist__description_title"> 
                    <h3>{track.track.name}</h3>
                    <p>{track.track.artists[0].name}</p>
                  </div>
                </div>
                <p>{track.track?.album.name}</p>
                <p>{formatDate(track.added_at)}</p>
                <p>{track.track.duration_ms}</p>
         
             </li>
           ))}
       </div>
       
    </Container>
  )
}

export default PlaylistTracks;