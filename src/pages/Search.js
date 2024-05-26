import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Footer from "../components/Footer";
import './Search.css';
import Category from '../components/Category';
import SpotifyWebApi from 'spotify-web-api-js';
import { useStateProvider } from '../utils/StateProvider';
import PlaylistTracks from '../components/PlaylistTracks';
import Albums from '../components/Albums';
const spotifyApi = new SpotifyWebApi(); 

 
function Search() {
  const [{selectedPlaylist}, dispatch] = useStateProvider();
  const searchword = window.location.search.split("=")[1];
  const [playlistData, setPlaylistData] = useState('');
  const [albumData, setAlbumData] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const playlists = await spotifyApi.searchPlaylists(searchword);
        const albums = await spotifyApi.searchAlbums(searchword);
        setPlaylistData(playlists);
        setAlbumData(albums)
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchData();
  }, [searchword]);
  
  return (<div className="search__container">
    <Sidebar className="search__sidebar"/>
    <div className="search__body">
      <h1>Search results for "{window.location.search.split("=")[1]}"</h1>
      <Albums albumtype={albumData} />
      <Category category={playlistData} />
     
    </div>
   
  </div>
  );

}
export default Search;
