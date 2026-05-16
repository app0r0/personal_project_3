"use client";
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Repeat } from "lucide-react";
import styles from "./YoutubeLoop.module.css";

const YouTubeABLoop = () => {
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/watch?v=lN8xbrzvggA&ab_channel=JazzTutorial%7CwithJulianBradley"
  );
  const [playlists, setPlaylists] = useState([]);
  const [videoId, setVideoId] = useState("");
  const [videoMetadata, setVideoMetadata] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLooping, setIsLooping] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [errorMessage, setErrorMessage] = useState("");
  const playerRef = useRef(null);
  const timerRef = useRef(null);
  const pendingTimesRef = useRef(null);
  const keyHandlerRef = useRef(null);

  useEffect(() => {
    extractVideoId();
  }, [videoUrl]);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        if (videoId) createPlayer(videoId);
      };
    } else if (videoId) {
      createPlayer(videoId);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [videoId]);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const current = playerRef.current.getCurrentTime();
      setCurrentTime(current);
      if (isLooping && currentTime >= endTime) {
        playerRef.current.seekTo(startTime);
      }
    }, 100);
  }, [startTime, endTime, isLooping, currentTime]);

  useEffect(() => {
    const stored = localStorage.getItem("abloop-playlists");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPlaylists(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        setPlaylists([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("abloop-playlists", JSON.stringify(playlists));
  }, [playlists]);

  // キーボードショートカット: refに最新の関数・状態を毎レンダーで更新
  keyHandlerRef.current = (e) => {
    const tag = document.activeElement?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    switch (e.key) {
      case " ":
        e.preventDefault();
        togglePlayPause();
        break;
      case "a":
      case "A":
        setCurrentTimeAsStart();
        break;
      case "b":
      case "B":
        setCurrentTimeAsEnd();
        break;
      case "l":
      case "L":
        toggleLooping();
        break;
      case "ArrowLeft":
        if (playerRef.current) {
          const t = playerRef.current.getCurrentTime();
          playerRef.current.seekTo(Math.max(0, t - 5), true);
        }
        break;
      case "ArrowRight":
        if (playerRef.current) {
          const t = playerRef.current.getCurrentTime();
          playerRef.current.seekTo(t + 5, true);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        changePlaybackRate(0.1);
        break;
      case "ArrowDown":
        e.preventDefault();
        changePlaybackRate(-0.1);
        break;
    }
  };

  useEffect(() => {
    const handler = (e) => keyHandlerRef.current?.(e);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const createPlayer = (id) => {
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    playerRef.current = new window.YT.Player("youtube-player", {
      videoId: id,
      playerVars: {
        autoplay: 0,
        controls: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  };

  const onPlayerReady = (event) => {
    const duration = event.target.getDuration();
    setVideoMetadata({
      duration: duration,
      title: event.target.getVideoData().title,
    });
    if (pendingTimesRef.current) {
      const { startTime: pendingStart, endTime: pendingEnd } = pendingTimesRef.current;
      setStartTime(pendingStart);
      setEndTime(pendingEnd);
      event.target.seekTo(pendingStart, true);
      pendingTimesRef.current = null;
    } else {
      setEndTime(duration);
    }
  };

  const onPlayerStateChange = (event) => {
    switch (event.data) {
      case window.YT.PlayerState.PLAYING:
        setIsPlaying(true);
        break;
      case window.YT.PlayerState.PAUSED:
        setIsPlaying(false);
        break;
      case window.YT.PlayerState.ENDED:
        setIsPlaying(false);
        if (isLooping) {
          playerRef.current.seekTo(startTime);
          playerRef.current.playVideo();
        }
        break;
    }
  };

  const extractVideoId = () => {
    const url = videoUrl;
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );

    if (match) {
      const extractedId = match[1];
      setVideoId(extractedId);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter a valid YouTube video URL");
    }
  };

  const togglePlayPause = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const toggleLooping = () => {
    setIsLooping(!isLooping);
    if (playerRef.current) {
      playerRef.current.seekTo(startTime);
    }
  };

  const changePlaybackRate = (delta) => {
    setPlaybackRate((prev) => {
      const next = Math.round((prev + delta) * 10) / 10;
      const clamped = Math.min(Math.max(next, 0.25), 2.0);
      if (playerRef.current) {
        playerRef.current.setPlaybackRate(clamped);
      }
      return clamped;
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartTimeChange = (e) => {
    const newStartTime = parseFloat(e.target.value);
    if (
      newStartTime >= 0 &&
      newStartTime < (videoMetadata?.duration || Infinity)
    ) {
      setStartTime(newStartTime);
      if (newStartTime >= endTime) {
        setEndTime(videoMetadata.duration);
      }
      if (playerRef.current) {
        playerRef.current.seekTo(newStartTime, true);
      }
    }
  };

  const handleEndTimeChange = (e) => {
    const newEndTime = parseFloat(e.target.value);
    if (
      newEndTime > startTime &&
      newEndTime <= (videoMetadata?.duration || Infinity)
    ) {
      setEndTime(newEndTime);
      if (playerRef.current) {
        playerRef.current.seekTo(newEndTime, true);
      }
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (playerRef.current) {
      playerRef.current.seekTo(seekTime, true);
    }
  };

  const setCurrentTimeAsStart = () => {
    setStartTime(currentTime);
  };

  const setCurrentTimeAsEnd = () => {
    setEndTime(currentTime);
  };

  const clearURL = () => {
    setVideoUrl("");
  };

  const saveToPlaylist = () => {
    if (!videoMetadata) return;
    const newItem = {
      title: videoMetadata.title,
      url: videoUrl,
      startTime,
      endTime,
    };
    setPlaylists((prev) => [newItem, ...prev]);
  };

  const loadPlaylistItem = (item) => {
    pendingTimesRef.current = { startTime: item.startTime, endTime: item.endTime };
    setVideoUrl(item.url);
  };

  const deletePlaylistItem = (index) => {
    setPlaylists((prev) => prev.filter((_, i) => i !== index));
  };

  const duration = videoMetadata?.duration || 0;
  const startPercent = Math.min(Math.max(duration > 0 ? (startTime / duration) * 100 : 0, 0), 100);
  const endPercent = Math.min(Math.max(duration > 0 ? (endTime / duration) * 100 : 100, 0), 100);

  return (
    <div className={styles.abLoopContainer}>
      <div className={styles.heroSection}>
        <h1 className={styles.pageTitle}>AB Repeat — Free YouTube Loop Player</h1>
        <p className={styles.pageDescription}>Loop any section of a YouTube video. Paste a URL and set your A–B points.</p>
      </div>
      <div className={styles.videoArea}>
        <div className={styles.urlInputContainer}>
          <div>Please paste YouTube URL or ID</div>
          <p className={styles.errorMessage}>{errorMessage}</p>
          <div className={styles.urlInputBox}>
            <input
              type="text"
              placeholder="Please paste YouTube URL or ID"
              value={videoUrl}
              autoComplete="videoUrl"
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <button onClick={clearURL}>Clear</button>
            {videoMetadata && (
              <button onClick={saveToPlaylist}>Save</button>
            )}
          </div>
        </div>

        <div className={styles.playerContainer}>
          <div id="youtube-player" className={styles.youtubePlayer}></div>

          {videoMetadata && (
            <div className={styles.videoInfo}>
              <span>{videoMetadata.title}</span>
            </div>
          )}
        </div>

        <div className={styles.abLoopControls}>
          <div className={styles.sliderWrapper}>
            <div className={styles.slidebarMultithumb}>
              <input
                className={styles.thumb1Input}
                type="range"
                value={startTime}
                onChange={handleStartTimeChange}
                step="0.1"
                min="0"
                max={duration}
              />

              <input
                className={styles.thumb2Input}
                type="range"
                value={endTime}
                onChange={handleEndTimeChange}
                step="0.1"
                max={duration}
              />

              <input
                className={styles.seekInput}
                type="range"
                value={currentTime}
                onChange={handleSeek}
                step="0.1"
                min="0"
                max={duration}
              />
            </div>

            {videoMetadata && (
              <div className={styles.markersRow}>
                <div
                  className={styles.markerA}
                  style={{ left: `${startPercent}%` }}
                >
                  <div className={styles.markerLine} />
                  {formatTime(startTime)}
                </div>
                <div
                  className={styles.markerB}
                  style={{ left: `${endPercent}%` }}
                >
                  <div className={styles.markerLine} />
                  {formatTime(endTime)}
                </div>
              </div>
            )}
          </div>

          <div className={styles.controlIcons}>
            <button
              onClick={togglePlayPause}
              disabled={!videoId}
              aria-label="play or pause"
            >
              {isPlaying ? <Pause color="black" /> : <Play color="#FC9D9D" />}
            </button>

            <button
              onClick={toggleLooping}
              className={isLooping ? styles.loopingActive : ""}
              disabled={!videoId}
              aria-label="loop or not"
            >
              <Repeat />
            </button>
          </div>

          <div className={styles.speedControl}>
            <button
              onClick={() => changePlaybackRate(-0.1)}
              disabled={playbackRate <= 0.25}
              aria-label="decrease speed"
              className={styles.speedBtn}
            >
              －
            </button>
            <span className={styles.speedDisplay}>{playbackRate.toFixed(1)}x</span>
            <button
              onClick={() => changePlaybackRate(0.1)}
              disabled={playbackRate >= 2.0}
              aria-label="increase speed"
              className={styles.speedBtn}
            >
              ＋
            </button>
          </div>

          <div className={styles.controlButtons}>
            <button onClick={setCurrentTimeAsStart}>
              Set the <p className={styles.setStartTimeButton}>starting time</p>{" "}
              to the current time.
            </button>
            <button onClick={setCurrentTimeAsEnd}>
              Set the <p className={styles.setEndTimeButton}>ending time</p> to
              the current time.
            </button>
          </div>
        </div>

        <div className={styles.playlists}>
          <h3 className={styles.playlistsTitle}>My Playlists</h3>
          <div className={styles.playlistItems}>
            {playlists.length === 0 ? (
              <p className={styles.emptyMessage}>No saved loops yet. Set A–B points and press Save.</p>
            ) : (
              playlists.map((item, i) => (
                <div key={i} className={styles.playlistItem}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemTitle}>{item.title}</span>
                    <span className={styles.itemTimes}>
                      {formatTime(item.startTime)} – {formatTime(item.endTime)}
                    </span>
                  </div>
                  <div className={styles.itemActions}>
                    <button
                      onClick={() => loadPlaylistItem(item)}
                      className={styles.playBtn}
                    >
                      ▶ Play
                    </button>
                    <button
                      onClick={() => deletePlaylistItem(i)}
                      className={styles.deleteBtn}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default YouTubeABLoop;
