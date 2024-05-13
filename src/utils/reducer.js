export const initialState = {
  token: null,
  playlists: [],
  selectedPlaylist:null,
  playlistTracks:null,
  currentTrack:null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_USER_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_USER":
        return {
         ...state,
          user: action.user,
        };
    case "SET__SHOW_EPISODES":
      return {
       ...state,
        showEpisodes: action.showEpisodes,
      };
    case "SET_CATEGORY_PLAYLISTS":
      return {
       ...state,
        categoryPlaylists: action.categoryPlaylists,
      };
    case "SET_CURRENT_TRACK":
      return {
       ...state,
        currentTrack: action.currentTrack,
      };
  
    case "SET_SELECTED_PLAYLIST":
      return {
       ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    case "SET_PLAYLIST_TRACKS":
      return {
       ...state,
        playlistTracks: action.playlistTracks,
      };




    case "SET_CATEGORIES":
      return {
       ...state,
        categories: action.categories,
      };
    
  
    
    default:
      return state;
  }
};

export default reducer;
