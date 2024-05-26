import React, {useState} from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import {FaSearch} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function Navbar() {
const [{user}, dispatch] = useStateProvider();
const [searchKey, setSearchKey] = useState("");
const navigate = useNavigate(); 
const HandleSubmit = (e) => {
  e.preventDefault();
  navigate(`/search?query=${searchKey}`);
}

  return  <Container>
      <form className="searchbar"
      onSubmit={HandleSubmit}>
        <FaSearch /> 
        <input type="text" 
        placeholder="Artists, songs or Podcasts" 
        onChange={(e) => setSearchKey(e.target.value)}
        />
      </form>
      <div className="avatar">
        <a href={user.uri} >
          <CgProfile />
          <span>{user.display_name}</span>
        </a>
      </div>
    </Container> 
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 2rem 2rem 0 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background:rgb(18,18,18,0.8);
  z-index:1000;
 
  .searchbar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;
export default Navbar;
