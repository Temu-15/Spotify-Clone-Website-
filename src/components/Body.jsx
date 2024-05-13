import React from "react";
import Categories from "./Categories";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import PlaylistTracks from "./PlaylistTracks";
const Container = styled.div`
width:100%;
height:100%;
padding:0 1.4rem;
overflow-x:hidden;`
function Body() {
  const [{selectedPlaylist}, dispatch] = useStateProvider();
  return <Container >
    {selectedPlaylist?<PlaylistTracks selectedPlaylist={selectedPlaylist}/> : <Categories />}
  </Container>
}

export default Body;
