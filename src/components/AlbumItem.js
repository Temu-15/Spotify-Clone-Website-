import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaPlay } from "react-icons/fa";
import { useStateProvider } from "../utils/StateProvider";
import { useNavigate } from "react-router-dom";



function AlbumItem({ album, className }) {
  const [{}, dispatch] = useStateProvider();
  const navigate = useNavigate();

  const imageUrl = album.images && album.images.length > 0 ? album.images[0].url : '';
  const album_name = album.name || '';

  function clickHandler() {
    navigate(`/album/albumTracks?album_id=${album.id}`);
  }

  return (
    <Container className={className} onClick={clickHandler}>
      <div className="album__image">
        <img src={imageUrl} alt="artist" />
      </div>
      <div className="playIcon">
        <FaPlay />
      </div>
      <div className="album__iteminfo">
        <h4>{album_name}</h4>
        <p>Album</p>
      </div>
    </Container>
  );
}

export default AlbumItem;

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  width: 152px;
  height: 204px;
  border-radius: 4px;
  padding: 16px;
  background-color: #181818;
  transition: background-color 0.3s ease;
  position: relative;
  overflow: hidden;
  &:hover {
    background-color: #282828;
  }
  &:hover .playIcon {
    opacity: 1;
  }
  .album__image {
    position: relative;
    width: 128px;
    height: 128px;
    margin: 0 auto;
    img {
      height: 100%;
      width: 100%;
      border-radius:50%;
      object-fit: contain;
      box-shadow: 0 -4px 12px rgb(0 0 0 / 50%);
    }
  }
  .playIcon {
    position: absolute;
    bottom: 94px;
    right: 24px;
    opacity: 0;
    transition: all 0.3s ease;
    box-shadow: 0 8px 8px rgb(0 0 0 / 30%);
    background-color: #1db954;
    height: 40px;
    width: 40px;
    transition: transform 33ms cubic-bezier(0.3, 0, 0, 1);
    z-index: 2;
    border-radius: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .album__iteminfo {
    color: #fff;
    margin-top: 16px;
    min-height: 62px;
    h4 {
      font-family: 'Poppins', sans-serif;
      font-size: clamp(12px, 2vw, 18px);
      font-weight: 700;
      line-height: 16px;
      color: #fff;
      text-wrap: nowrap;
      margin: 0;
    }
    p {
      font-size: 14px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      height: 2.5em;
      color: rgb(179, 179, 179);
      padding-bottom: 5px;
    }
  }
`;
