import React from "react";
import styled from "styled-components";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlists from "./Playlists";
import { useStateProvider } from "../utils/StateProvider";
import { useState } from "react";
import { CgMenu } from "react-icons/cg";
import { Link } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .menu_icon {
    display: none;
  }

  .top__links {
    width: 100%;
    height: 50%;
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

      a {
        display: flex;
        gap: 1rem;
        align-items: center;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        text-decoration: none;
        color: #b3b3b3;

        &:hover {
          color: white;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .top__links {
      display: none;
    }

    .menu_icon {
      display: block;
    }

    &&.activated {
      width: 100vw;
      height: 100vh;
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
    <Container className={isActive?"activated":''}>
      <CgMenu className="menu_icon" onClick={menuClickHandler}/>
      <div className="top__links">
        <Link to="/" className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
            alt="spotify logo"
          />
        </Link>
        <ul>
          <li onClick={homeClickHandler}>
            <Link to="/">
              <MdHomeFilled />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/search">
              <MdSearch />
              <span>Search</span>
            </Link>
          </li>
          <li>
            <Link to="/library">
              <IoLibrary />
              <span>Library</span>
            </Link>
          </li>
        </ul>
      </div>

      <Playlists />
    </Container>
  );
}

export default Sidebar;
