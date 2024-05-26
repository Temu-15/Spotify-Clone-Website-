import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import AlbumItem from './AlbumItem';

const Container = styled.div`
width:100%;
height:100%;
margin:0 0 3.5rem 0;
.album__header{
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
.category__albums{
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    gap: 24px;
}
`;
function Albums({albumtype}) {
  const [showAll, setShowAll] = useState(false);
  const albums = albumtype?.albums?.items || [];
const visibleAlbums = showAll ? albums : albums.slice(0, 5);
 const showAllClickHandler = () => {
      setShowAll(!showAll);
    };
  return (
    <Container>
      <div className="album__header">
           <h2>Albums</h2>
           <button onClick={showAllClickHandler}>
             {showAll ? 'Show Less' : 'Show More'}
           </button>
         </div>
  
         <div className="category__albums">
           {visibleAlbums.map((album) => (
             <AlbumItem key={album.id} album={album} />
           ))}
         </div>

    </Container>
  )
}

export default Albums