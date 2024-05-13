const clientId = "2f9e3cd2c1f7476088ad528bdf162c8c";
const redirectUri = "http://localhost:3000/";
const apiUrl = "https://spotify-web-temu15.netlify.app/";
const scopes = [
  "user-read-email",
  "user-read-private",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "playlist-read-private",
  "playlist-read-collaborative",
  
  
];

const loginUrl = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

export default loginUrl;
