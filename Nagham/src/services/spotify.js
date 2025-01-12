import axios from "axios";
const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "222d8aa1be474b24a12dc771c23c9c3c";
const redirectUri = "https://music-player-brown-three.vercel.app/";
const scopes = ["user-library-read", "playlist-read-private" , "user-library-modify"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;
