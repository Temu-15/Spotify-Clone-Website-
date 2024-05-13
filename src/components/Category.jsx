import React from 'react'
import styled from 'styled-components';
import PlaylistItem from './PlaylistItem';
import {Mousewheel,Keyboard,Scrollbar} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';

const Container = styled.div`
width:100%;
height:100%;
h2{
    color:white;
    font-size:2rem;
    margin-bottom:1rem;
    margin-top:1rem;
}
.category__playlists{
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    gap:2rem;
}
`;

function Category({category}) {
  
  return (
    <Container >
        <h2>{category.message}</h2>
        <Swiper modules={[Mousewheel,Scrollbar,Keyboard]} 
        spaceBetween={5} 
        slidesPerView={5} 
        mousewheel={true}
        keyboard={true}
    >
        {category.playlists.items.map((playlist)=>(
                <SwiperSlide>
                    <PlaylistItem playlist={playlist} />
                 </SwiperSlide>
            ))}
        </Swiper>
        </Container>
       

      
  )
}

export default Category