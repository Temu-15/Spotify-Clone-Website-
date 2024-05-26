import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStateProvider } from '../utils/StateProvider';
import { FaPlayCircle } from 'react-icons/fa';
import { CgChevronLeft, CgChevronRight } from 'react-icons/cg';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

function AlbumTracks({ album_id }) {
  const [{}, dispatch] = useStateProvider();
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumTracks, setAlbumTracks] = useState([]);
  const [hoveredTrack, setHoveredTrack] = useState({});

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const albumData = await spotifyApi.getAlbum(album_id);
        console.log(albumData);
        setSelectedAlbum(albumData);
        setAlbumTracks(albumData.tracks.items);
      } catch (error) {
        console.error('Error fetching album data:', error);
      }
    };

    fetchAlbumData();
  }, [album_id]);

  const playTrackClickHandler = (track) => {
    console.log(track, "tracks")
    dispatch({
      type: "SET_CURRENT_TRACK",
      currentTrack: track,
    });
    dispatch({
        type: "SET_SELECTED_ALBUM",
        selectedAlbum: selectedAlbum,
      });
  };

  const chevronClickHandler = () => {
    dispatch({
      type: "SET_SELECTED_ALBUM",
      selectedAlbum: selectedAlbum,
    });
  };

  const handleMouseOver = (id) => {
    setHoveredTrack((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const handleMouseOut = (id) => {
    setHoveredTrack((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const formatDuration = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!selectedAlbum) return <div>Loading...</div>;

  return (
    <Container>
      <div className="album_tracks_controls">
        <CgChevronLeft className='chevron_left' onClick={chevronClickHandler} />
        <CgChevronRight className='chevron_right' />
      </div>
      <div className="album__thumbnail">
        <div className="album__image">
          <img src={selectedAlbum.images[0].url} alt={selectedAlbum.name} />
        </div>
        <div className="album__description">
          <h1>{selectedAlbum.name}</h1>
          <p>{selectedAlbum.description?.replace(/<[^>]*>?/gm, '') || ''}</p>
        </div>
      </div>
      <div className="album_item_container">
        {albumTracks.map((track, index) => (
          <li key={track.id}
            className="album__item"
            onClick={() => playTrackClickHandler(track)}
            onMouseOver={() => handleMouseOver(track.id)}
            onMouseOut={() => handleMouseOut(track.id)}
          >
            <div className="track__info_song">
              {hoveredTrack[track.id] ? <FaPlayCircle /> : <p>{index + 1}</p>}
              <img src={selectedAlbum.images[0].url} alt={track.name} />
              <div className="album__description_title">
                <h3>{track.name}</h3>
                <p>{track.artists.map(artist => artist.name).join(', ')}</p>
              </div>
            </div>
            <p>{selectedAlbum.name}</p>
            <p>{formatDuration(track.duration_ms)}</p>
          </li>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  .album_tracks_controls {
    color: white;
    .chevron_left {
      font-size: 2.5rem;
      font-weight: bold;
      cursor: pointer;
    }
    .chevron_right {
      font-size: 2.5rem;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .album__thumbnail {
    width: 100%;
    display: flex;
    justify-content: start;
    gap: 2rem;
    background-color: #121212;
    padding: 2rem 2rem;
    .album__image {
      width: 180px;
      object-fit: contain;
      align-self: flex-end;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
  }
  .album_item_container {
    width: 100%;
    height: 100%;
    padding: 2rem;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    .album__item {
      width: 100%;
      height: 52px;
      position: relative;
      padding: 10px 20px 5px;
      box-shadow: 4px 4px 10px #000;
      display: grid;
      grid-template-columns: 40% 20% 20% 20%;
      justify-content: space-evenly;
      align-content: center;
      list-style: none;
      &:hover {
        cursor: pointer;
      }
      p {
        font-size: 14px;
      }
      .track__info_song {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 1rem;
        img {
          width: 34px;
          height: 34px;
          border-radius: 4px;
        }
        FaPlayCircle {
          width: 14px;
          height: 21px;
          background-color: #1db954;
        }
        .album__description_title {
          h3 {
            font-size: 15px;
            margin: 0;
            color: #fff;
          }
          p {
            margin: 0;
            font-size: 12px;
            color: #b3b3b3;
            opacity: 0.7;
          }
        }
      }
    }
  }
`;

export default AlbumTracks;
