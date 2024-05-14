import React from "react";
import styled from "styled-components";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlists from "./Playlists";
import { useStateProvider } from "../utils/StateProvider";
import { useState } from "react";
import { CgMenu } from "react-icons/cg";
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  overflow:hidden;
  .menu_icon{
    display:none;
  }
  .top__links {
    width:100%;
    height:50%;
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 1rem 0;
      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      margin-left: 1rem;
      li {
        display: flex;
        gap: 1rem;
        align-items: center;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        &:hover {
          color: white;
        }
      }
    }
  }


@media (max-width: 768px) {
  &&.activated{
    width:100vw;
    height:100vh;
  }
  display:none;
  .menu_icon{
    display:block;
  }

 
}
`;
function Sidebar() {
  const [{selectedPlaylist}, dispatch] = useStateProvider();
  const {isActive, setIsActive} = useState(false);
  function homeClickHandler(){
    dispatch({
      type:"SET_SELECTED_PLAYLIST",
      selectedPlaylist:null
    })
  }
  function menuClickHandler(){
    setIsActive(true)
  }
  return (
    <Container classname={isActive?"activated":''}>
      <CgMenu className="menu_icon" onClick={menuClickHandler}/>
      <div className="top__links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
            alt="spotify logo"
          />
        </div>
        <ul>
          <li onClick={homeClickHandler}>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li>
            <MdSearch />
            <span>Search</span>
          </li>
          <li>
            <IoLibrary />
            <span>Library</span>
          </li>
        </ul>
      </div>

      <Playlists />
    </Container>
  );
}

export default Sidebar;
