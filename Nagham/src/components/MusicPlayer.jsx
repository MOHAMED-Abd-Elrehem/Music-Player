import  { useState, useEffect } from "react";
import APIKit from "../services/spotify";
import { Howl} from "howler";

const MusicPlayer = ( playlistId ) => {
  const [tracks, setTracks] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null); // Store the Howl instance

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await APIKit.get(`playlists/${playlistId}/tracks`);
        const tracksWithPreviews = response.data.items.filter(
          (item) => item.track?.preview_url
        );
        setTracks(tracksWithPreviews);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };

    if (playlistId) {
      fetchTracks();
    }
  }, [playlistId]);

  useEffect(() => {
    if (tracks?.length) {
      const currentTrack = tracks[currentTrackIndex].track;

      if (sound) {
        sound.unload(); // Unload previous sound
      }

      if (currentTrack?.preview_url) {
        const newSound = new Howl({
          src: [currentTrack.preview_url],
          onend: handleNextTrack, // Set onend callback
          onloaderror: (id, error) => {
            console.error("Error loading sound:", error);
          },
        });
        setSound(newSound);
        if (isPlaying) {
          newSound.play();
        }
      }
    }
    return () => {
      if (sound) {
        sound.unload();
      }
    };
  }, [tracks, currentTrackIndex]);

  useEffect(() => {
    if (sound) {
      isPlaying ? sound.play() : sound.pause();
    }
  }, [isPlaying, sound]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    if (tracks?.length) {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    }
  };

  const handlePrevTrack = () => {
    if (tracks?.length) {
      setCurrentTrackIndex(
        (prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length
      );
    }
  };

  if (!tracks) {
    return <div>Loading Tracks...</div>;
  }

  if (tracks.length === 0) {
    return <div>No playable tracks in this playlist.</div>;
  }

  const currentTrack = tracks[currentTrackIndex].track;

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/4 mb-4 md:mb-0 md:mr-4">
          {currentTrack?.album?.images?.[0]?.url && (
            <img
              src={currentTrack.album.images[0].url}
              alt="Album Art"
              className="w-32 h-32 rounded"
            />
          )}
        </div>
        <div className="md:w-3/4">
          <p className="text-white font-bold">{currentTrack.name}</p>
          <p className="text-gray-400">
            {currentTrack.artists.map((artist) => artist.name).join(", ")}
          </p>
          <div className="flex items-center mt-2">
            <button
              onClick={handlePlayPause}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              onClick={handlePrevTrack}
              disabled={currentTrackIndex === 0}
            >
              Previous
            </button>
            <button
              onClick={handleNextTrack}
              disabled={currentTrackIndex === tracks.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
