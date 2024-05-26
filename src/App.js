import React from "react";
import "./App.css";
import Login from "./components/Login";
import { useEffect } from "react";
import { useStateProvider } from "./utils/StateProvider";
import SpotifyWebApi from "spotify-web-api-js";
import Spotify from "./components/Spotify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlaylistTracksPage from "./pages/PlaylistTracksPage";
import AlbumTracksPage from "./pages/AlbumTracksPage";

import Search from "./pages/Search"
const spotifyApi = new SpotifyWebApi();

function App() {
  const [{ token, selectedPlaylist}, dispatch] = useStateProvider();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlToken = window.location.hash.substring(1).split("&")[0].split("=")[1];
        window.location.hash = "";
        
        if (urlToken) {
          spotifyApi.setAccessToken(urlToken);
          const user = await spotifyApi.getMe();
          const playlists = await spotifyApi.getUserPlaylists();
          const categories = await spotifyApi.getCategories();
          
              
          
          const categoryPlaylistsPromises = categories.categories.items.map(category =>
            spotifyApi.getCategoryPlaylists(category.id)
          );
          const categoryPlaylists = await Promise.all(categoryPlaylistsPromises);
          dispatch({
            type: "SET_TOKEN",
            token: urlToken,
          });
          dispatch({
            type: "SET_USER",
            user: user,
          });
          dispatch({
            type: "SET_USER_PLAYLISTS",
            playlists: playlists,
          });
          dispatch({
            type: "SET_CATEGORIES",
            categories: categories,
          });
          dispatch({
            type: "SET_CATEGORY_PLAYLISTS",
            categoryPlaylists: categoryPlaylists,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPlaylistTracks = async () => {
      if (selectedPlaylist) {
          const trackList = await spotifyApi.getPlaylistTracks(selectedPlaylist.id);
          dispatch({
            type: "SET_PLAYLIST_TRACKS",
            playlistTracks: trackList,
          });
        }
    
    };

    fetchPlaylistTracks();
  }, [selectedPlaylist, dispatch]);

  return <BrowserRouter>
  <Routes>
    <Route path="/" element={ <div className="App">{token ? <Spotify /> : <Login />}</div>} />
    <Route path="/search" element={token ? <Search /> : <Login />} />
    <Route path='/playlist/playlistTracks' element={<PlaylistTracksPage />} />
    <Route path='/album/albumTracks' element={<AlbumTracksPage />} />
  </Routes>
  </BrowserRouter> 
  
  
 
}

export default App;
