"use client";
import React, { useEffect, useState } from "react";
import styles from "./YouTubePlayer.module.css";
import { useYouTube } from "../../contexts/learnlooper/YouTubeContext";

const CATEGORIES = [
  { id: "study", label: "Study", emoji: "📚" },
  { id: "break", label: "Break", emoji: "☕" },
  { id: "healing", label: "Healing", emoji: "🌿" },
  { id: "focus", label: "Focus", emoji: "💪" },
];

const YouTubePlayer = () => {
  const {
    videoUrl,
    setVideoUrl,
    videoId,
    setVideoId,
    initializePlayer,
    cleanupPlayer,
    clearURL,
    extractVideoId,
    videoMetadata,
    saveFavorite,
    deleteFavorite,
    favorites,
    loadSavedVideo,
  } = useYouTube();

  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [activeTab, setActiveTab] = useState("study");

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => {
        if (videoId) initializePlayer(videoId);
      };
    } else if (videoId) {
      initializePlayer(videoId);
    }
    return () => cleanupPlayer();
  }, [videoId, initializePlayer, cleanupPlayer]);

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setVideoUrl(url);
    setShowCategoryPicker(false);
    const id = extractVideoId(url);
    if (id) {
      setVideoId(id);
      initializePlayer(id);
    }
  };

  const handleSave = (category) => {
    saveFavorite(category);
    setShowCategoryPicker(false);
  };

  const tabItems = favorites.filter((f) => f.category === activeTab);

  return (
    <div className={styles.playerWrapper}>
      {/* URL入力エリア */}
      <div className={styles.urlInput}>
        <input
          type="text"
          value={videoUrl}
          onChange={handleUrlChange}
          placeholder="YouTube URL"
        />
        <button onClick={clearURL}>Clear</button>
        {videoMetadata.title && (
          <button onClick={() => setShowCategoryPicker((v) => !v)}>Save</button>
        )}
      </div>

      {/* カテゴリ選択（インライン展開） */}
      {showCategoryPicker && (
        <div className={styles.categoryPicker}>
          <span className={styles.categoryLabel}>Save to:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSave(cat.id)}
              className={styles.categoryBtn}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
          <button
            onClick={() => setShowCategoryPicker(false)}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      )}

      {/* YouTubeプレイヤー */}
      <div className={styles.youtubeFrame}>
        <div id="youtube-player"></div>
      </div>

      {/* My Playlists */}
      <div className={styles.playlists}>
        <h3 className={styles.playlistsTitle}>My Playlists</h3>
        <div className={styles.playlistTabs}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={activeTab === cat.id ? styles.activeTab : styles.tab}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
        <div className={styles.playlistItems}>
          {tabItems.length === 0 ? (
            <p className={styles.emptyMessage}>No saved videos in this category.</p>
          ) : (
            tabItems.map((item, i) => (
              <div key={i} className={styles.playlistItem}>
                <span className={styles.itemTitle}>{item.title}</span>
                <div className={styles.itemActions}>
                  <button
                    onClick={() => loadSavedVideo(item.url)}
                    className={styles.playBtn}
                  >
                    ▶ Play
                  </button>
                  <button
                    onClick={() => deleteFavorite(item.url)}
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
  );
};

export default YouTubePlayer;
