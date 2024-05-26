import React from 'react'
import { useStateProvider } from '../utils/StateProvider';
import styled from 'styled-components';
import { FaPlayCircle } from 'react-icons/fa';
import { FaPauseCircle } from 'react-icons/fa';
import { IoShuffleSharp } from 'react-icons/io5';
import { FaForward } from 'react-icons/fa';
import { FaBackward } from 'react-icons/fa';
import Slider from 'react-slick';
import ReactAudioPlayer from 'react-audio-player';
const Container = styled.div`
width: 100%;
height: 100%;
display:flex;
justify-content:space-around;
align-items:center;
.track__info{
    height:100%;
    display: flex;
    align-items:center;
    gap:1rem;
    img{
        height:80%;
        object-fit:contain;
        border-radius:6px;
    }
    .track__info__title{
        h4{
            margin:0;
            font-size:1.4rem;
        }
        p{
            margin:0;
            color:#fff;
            opacity:0.7;
        }
    }

}
ReactAudioPlayer{
    font-size:3rem;
}


`
function AudioPlayer() {
const [{currentTrack, selectedAlbum}, dispatch]= useStateProvider();
console.log(selectedAlbum)

  return (
    <Container>
        <div className="track__info">
         <img src={currentTrack ? currentTrack?.album?.images[0].url : selectedAlbum?.images[0].url} alt="album photo" />
         <div className='track__info__title'>
            <h4>{currentTrack?.name}</h4>
            <p>{currentTrack?.artists[0]?.name}</p>
         </div>
        </div>
        <div className="player_icons">   
            <ReactAudioPlayer src={currentTrack?.preview_url} autoPlay controls black/>
        </div>
        <div>
            <input type="range" name="volume" id="volumeRange" />
        </div>
        
    
    </Container>
  )
}

export default AudioPlayer