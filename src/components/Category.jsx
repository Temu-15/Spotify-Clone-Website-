import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import PlaylistItem from './PlaylistItem';
import {Mousewheel,Keyboard,Scrollbar} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';

const Container = styled.div`
width:100%;
height:100%;
margin:0 0 3.5rem 0;
.playlist__header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:1rem;
    padding:0 6rem 0 0;
    button{
    display:block;
    padding: 0.5rem 1rem;
    background-color: #1db954;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom:1rem;
    margin-top:1rem;
    }


h2{
    color:white;
    font-size:2rem;
    margin-bottom:1rem;
    margin-top:1rem;
}
}
.category__playlists{
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    gap: 24px;
}
`;
function Category({category}) {
    const [showAll, setShowAll] = useState(false);
    const playlists = category?.playlists?.items || [];
    const visibelPlaylists = showAll ? playlists : playlists.slice(0, 5);
    const showAllClickHandler = () => {
        setShowAll(!showAll);
    }
  
  return (
    <Container >
        <div className="playlist__header">  
        <h2>{category.message ? category.message : 'playlists'}</h2>
        <button onClick={showAllClickHandler}>{!showAll ? 'Show More' : "show Less"}</button>
        </div>
        
      <div className="category__playlists">
      {visibelPlaylists.map((playlist)=>(
                
                <PlaylistItem playlist={playlist} />
            
        ))}
      </div>
        
        
        </Container>
       

      
  )
}

export default Category