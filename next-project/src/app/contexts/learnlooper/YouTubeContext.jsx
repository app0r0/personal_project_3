"use client";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useCallback,
  useEffect,
} from "react";

const YouTubeContext = createContext();

const STORAGE_KEY = "learnlooper_favorites";

export const YouTubeProvider = ({ children }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [videoMetadata, setVideoMetadata] = useState({ title: "", channelTitle: "" });
  const playerRef = useRef(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setFavorites(stored);
  }, []);

  const playVideo = useCallback(() => {
    if (playerRef.current && isPlayerReady) {
      try {
        playerRef.current.playVideo();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing video:", error);
      }
    }
  }, [isPlayerReady]);

  const pauseVideo = useCallback(() => {
    if (playerRef.current && isPlayerReady) {
      try {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } catch (error) {
        console.error("Error pausing video:", error);
      }
    }
  }, [isPlayerReady]);

  const fetchVideoMetadata = useCallback(() => {
    try {
      const videoData = playerRef.current.getVideoData();
      setVideoMetadata({
        title: videoData.title,
        channelTitle: videoData.author,
      });
    } catch (error) {
      console.error("Error fetching video metadata:", error);
    }
  }, []);

  const initializePlayer = useCallback(
    (id, autoplay = false) => {
      if (!id) return;
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      try {
        playerRef.current = new window.YT.Player("youtube-player", {
          videoId: id,
          playerVars: {
            controls: 1,
            autoplay: autoplay ? 1 : 0,
          },
          events: {
            onReady: () => {
              setIsPlayerReady(true);
              fetchVideoMetadata();
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (
                event.data === window.YT.PlayerState.PAUSED ||
                event.data === window.YT.PlayerState.ENDED
              ) {
                setIsPlaying(false);
              }
            },
          },
        });
      } catch (error) {
        console.error("Error initializing YouTube player:", error);
        setIsPlayerReady(false);
      }
    },
    [fetchVideoMetadata]
  );

  const cleanupPlayer = useCallback(() => {
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
        playerRef.current = null;
        setIsPlayerReady(false);
        setVideoMetadata({ title: "", channelTitle: "" });
      } catch (error) {
        console.error("Error cleaning up player:", error);
      }
    }
  }, []);

  const extractVideoId = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const clearURL = () => {
    setVideoUrl("");
    setVideoId("");
    setVideoMetadata({ title: "", channelTitle: "" });
  };

  const saveFavorite = useCallback(
    (category) => {
      const title = videoMetadata.title || videoUrl;
      const newItem = {
        url: videoUrl,
        title,
        category,
        savedAt: new Date().toISOString(),
      };
      const filtered = favorites.filter((f) => f.url !== videoUrl);
      const updated = [newItem, ...filtered];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setFavorites(updated);
    },
    [videoUrl, videoMetadata, favorites]
  );

  const deleteFavorite = useCallback(
    (url) => {
      const updated = favorites.filter((f) => f.url !== url);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setFavorites(updated);
    },
    [favorites]
  );

  const loadSavedVideo = useCallback(
    (url) => {
      setVideoUrl(url);
      const id = extractVideoId(url);
      if (id) {
        setVideoId(id);
        initializePlayer(id, true);
      }
    },
    [initializePlayer]
  );

  return (
    <YouTubeContext.Provider
      value={{
        videoUrl,
        setVideoUrl,
        videoId,
        setVideoId,
        isPlaying,
        setIsPlaying,
        isPlayerReady,
        setIsPlayerReady,
        playerRef,
        playVideo,
        pauseVideo,
        initializePlayer,
        cleanupPlayer,
        clearURL,
        extractVideoId,
        saveFavorite,
        deleteFavorite,
        favorites,
        loadSavedVideo,
        videoMetadata,
      }}
    >
      {children}
    </YouTubeContext.Provider>
  );
};

export const useYouTube = () => useContext(YouTubeContext);
