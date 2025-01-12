import { loginEndpoint } from "../services/spotify";

export default function Login() {
  return (
    <div className="bg-slate-900 h-screen w-screen flex items-center justify-center overflow-hidden flex-col ">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt="logo-spotify"
        className="w-2/6"
      />
      <a href={loginEndpoint} >
        <div className="w-56 py-4 text-center bg-slate-700 text-slate-100 ">LOG IN</div>
      </a>
    </div>
  );
}
