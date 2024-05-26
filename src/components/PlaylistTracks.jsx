import React from 'react'
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useStateProvider } from '../utils/StateProvider';
import { FaPlayCircle } from 'react-icons/fa';
import { CgChevronLeft } from 'react-icons/cg';
import { CgChevronRight } from 'react-icons/cg';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();


function PlaylistTracks({playlist_id}) {

//   const [{}, dispatch]= useStateProvider();
//   const selectedPlaylist = spotifyApi.getPlaylist(playlist_id);
//   const playlistTracks = spotifyApi.getPlaylistTracks(playlist_id);
//   const [hoveredTrack, sethoveredTrack] = useState({});
//   const formatDate = (dateString) => {
//     const addedAtDate = new Date(dateString);
//     if (!isNaN(addedAtDate.getTime())) {
//       return addedAtDate.toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric"
//       });
//     } else {
//       return "Invalid Date";
//     }
//   };

//  function playTrackClickHandler(url){
  
//    dispatch({
//      type:"SET_CURRENT_TRACK",
//      currentTrack:url,
//    })
//  }

//  function chevronClickHandler(){
//    dispatch({
//      type:"SET_SELECTED_PLAYLIST",
//      selectedPlaylist:null,
//    })
//  }

//  const handleMouseOver = (id) => {
//   sethoveredTrack((prevState) => ({
//     ...prevState,
//     [id]: true,
//   }));
// };

// const handleMouseOut = (id) => {
//   sethoveredTrack((prevState) => ({
//     ...prevState,
//     [id]: false,
//   }));
// };

// const formatDuration = (milliseconds) => {
//   const minutes = Math.floor(milliseconds / 60000);
//   const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
//   return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
// };
const [{}, dispatch] = useStateProvider();
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [hoveredTrack, setHoveredTrack] = useState({});

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const playlistData = await spotifyApi.getPlaylist(playlist_id);
        const tracksData = await spotifyApi.getPlaylistTracks(playlist_id);
        setSelectedPlaylist(playlistData);
        setPlaylistTracks(tracksData);
      } catch (error) {
        console.error('Error fetching playlist data:', error);
      }
    };

    fetchPlaylistData();
  }, [playlist_id]);

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

  const playTrackClickHandler = (track) => {
    dispatch({
      type: "SET_CURRENT_TRACK",
      currentTrack: track,
    });
  };

  const chevronClickHandler = () => {
    dispatch({
      type: "SET_SELECTED_PLAYLIST",
      selectedPlaylist: null,
    });
  };

  const handleMouseOver = (id) => {
    setHoveredTrack((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const handleMouseOut = (id) => {
    setHoveredTrack((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const formatDuration = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!selectedPlaylist) return <div>Loading...</div>;

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
       
           {playlistTracks?.items.map((track, index) => (
         
             <li key={track.track.id} 
             className="playlist__item" 
             onClick={() => playTrackClickHandler(track.track)}
             onMouseOver={() => handleMouseOver(track.track.id)}
             onMouseOut={() => handleMouseOut(track.track.id)}
             >
             
            
               <div className="track__info_song">
                 {hoveredTrack[track.track.id] ? <FaPlayCircle /> : <p>{index + 1}</p>}
                  <img src={track.track.album.images[0].url} alt="" srcset="" />
                  <div className="playlist__description_title"> 
                    <h3>{track.track.name}</h3>
                    <p>{track.track.artists[0].name}</p>
                  </div>
                </div>
                <p>{track.track?.album.name}</p>
                <p>{formatDate(track.added_at)}</p>
                <p>{formatDuration(track.track.duration_ms)}</p>
         
             </li>
           ))}
       </div>
       
    </Container>
  )
}

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
    height:52px;
    position:relative;
    padding: 10px 20px 5px;
    box-shadow:4px 4px 10px #000;
    display:grid;
    grid-template-columns:40% 20% 20% 20%;
    justify-content:space-evenly;
    align-content:center;
    list-style:none;

    &:hover{
      cursor:pointer;
    }
    p{
      font-size:14px;
    }
    .track__info_song{
      width:100%;
      height:100%;
      display:flex;
      justify-content:start;
      align-items:center;
      gap:1rem;
      img{
        width:34px;
        height:34px;
        border-radius:4px;
      }
      FaPlayCircle{
        width:14px;
        height:21px;
        background-color:#1db954;
      }
      .playlist__description_title{
       h3{
        font-size:15px;
        margin:0;
        color:#fff;
       }
        p{
          margin:0;
          font-size:12px;
          color: #B3B3B3;
          opacity:0.7;
        }
      }
    }
  }
}
`
export default PlaylistTracks;