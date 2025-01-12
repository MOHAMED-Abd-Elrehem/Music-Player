import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import APIKit from "../services/spotify"; // Path to your Spotify API service
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";

const TrackCard = ( onPlaylistSelect ) => {
  const [playlists, setPlaylists] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await APIKit.get("me/playlists");
        setPlaylists(response.data.items);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  const handlePlaylistClick = (playlistId) => {
    if (onPlaylistSelect) {
      onPlaylistSelect(playlistId); 
    } else {
      navigate("/player", { state: { id: playlistId } }); // navigate if no callback
    }
  };

  if (!playlists) {
    return <div className="text-center mt-4">Loading Playlists...</div>; // Loading message
  }

  if (playlists.length === 0) {
    return <div className="text-center mt-4">No playlists found.</div>; // No playlists message
  }

  return (
    <div className="w-full h-full bg-inherit rounded-3xl">
      <div className="w-full h-auto flex flex-wrap justify-around overflow-y-auto">
        {playlists.map((playlist) => (
          <div
            className="relative w-1/5 rounded-2xl p-4 mb-5 ml-14 transition-all hover:translate-y-3 scroll-smooth cursor-pointer bg-slate-900"
            key={playlist.id}
            onClick={() => handlePlaylistClick(playlist.id)}
          >
            <img
              src={playlist.images[0]?.url || "placeholder-image-url"} // Placeholder if no image
              className="w-full rounded-xl object-cover" // object-cover to maintain aspect ratio
              alt="Playlist Art"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop on error
                e.target.src = "placeholder-image-url"; // Set placeholder on error
              }}
            />
            <p className="font-bold text-xl text-gray-300 my-2 truncate">
              {playlist.name}
            </p>
            <p className="playlist-subtitle text-gray-400 text-sm">
              {playlist.tracks.total} Songs
            </p>
            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity flex items-center justify-center rounded-xl">
              <IconContext.Provider value={{ size: "3em", color: "#E99D72" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackCard;
