"use client";
import React, { useEffect, useState } from "react";
import styles from "./YouTubePlayer.module.css";
import { useYouTube } from "../../contexts/learnlooper/YouTubeContext";
import { usePomodoro } from "../../contexts/learnlooper/PomodoroContext";

const STUDY_CATEGORIES = [
  { id: "study", label: "Study", emoji: "📚" },
  { id: "healing", label: "Healing", emoji: "🌿" },
  { id: "focus", label: "Focus", emoji: "💪" },
];

const BREAK_CATEGORY = { id: "breaktime", label: "Break Time Music", emoji: "☕" };

const ALL_SAVE_CATEGORIES = [...STUDY_CATEGORIES, BREAK_CATEGORY];

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

  const { isStudying, isActive, studyDuration, timeRemaining } = usePomodoro();

  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [activeTab, setActiveTab] = useState("study");
  const [showYoutube, setShowYoutube] = useState(true);

  // Study Timeが開始したらYouTubeを非表示に、停止/Break Timeになったら表示に戻す
  useEffect(() => {
    if (isActive && isStudying) {
      setShowYoutube(false);
    } else {
      setShowYoutube(true);
    }
  }, [isActive, isStudying]);

  // Break Timeになったらactiveタブをstudy側にリセット
  useEffect(() => {
    if (isStudying && !STUDY_CATEGORIES.some((c) => c.id === activeTab)) {
      setActiveTab("study");
    }
  }, [isStudying, activeTab]);

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

  const formatElapsed = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const elapsedSeconds = isStudying ? studyDuration - timeRemaining : 0;
  const isStudyRunning = isActive && isStudying;
  const studyTabItems = favorites.filter((f) => f.category === activeTab);
  const breakTabItems = favorites.filter((f) => f.category === BREAK_CATEGORY.id);

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
          {ALL_SAVE_CATEGORIES.map((cat) => (
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

      {/* YouTubeプレイヤーエリア */}
      <div className={styles.playerArea}>
        {/* 経過時間カウンター（Study Time進行中かつYouTube非表示時） */}
        {isStudyRunning && !showYoutube && (
          <div className={styles.elapsedCounter}>
            <div className={styles.elapsedLabel}>Study Time</div>
            <div className={styles.elapsedTime}>{formatElapsed(elapsedSeconds)}</div>
          </div>
        )}

        {/* YouTubeプレイヤー */}
        <div
          className={styles.youtubeFrame}
          style={{ display: isStudyRunning && !showYoutube ? "none" : "block" }}
        >
          <div id="youtube-player"></div>
        </div>

        {/* YouTubeトグルボタン（Study Time進行中のみ表示） */}
        {isStudyRunning && (
          <button
            className={styles.youtubeToggleBtn}
            onClick={() => setShowYoutube((v) => !v)}
          >
            {showYoutube ? "✕ Hide" : "▶ YouTube を見る"}
          </button>
        )}
      </div>

      {/* Study Time用 My Playlists */}
      {isStudying && (
        <div className={styles.playlists}>
          <h3 className={styles.playlistsTitle}>My Playlists</h3>
          <div className={styles.playlistTabs}>
            {STUDY_CATEGORIES.map((cat) => (
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
            {studyTabItems.length === 0 ? (
              <p className={styles.emptyMessage}>No saved videos in this category.</p>
            ) : (
              studyTabItems.map((item, i) => (
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
      )}

      {/* Break Time Music セクション（Break Time中のみ表示） */}
      {!isStudying && (
        <div className={styles.playlists}>
          <h3 className={styles.playlistsTitle}>☕ Break Time Music</h3>
          <div className={styles.playlistItems}>
            {breakTabItems.length === 0 ? (
              <p className={styles.emptyMessage}>
                No saved videos. Save a video with &quot;Break Time Music&quot; category.
              </p>
            ) : (
              breakTabItems.map((item, i) => (
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
      )}
    </div>
  );
};

export default YouTubePlayer;
