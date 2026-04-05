"use client";
import React, { useEffect, useRef } from "react";
import { usePomodoro } from "../../contexts/learnlooper/PomodoroContext";
import { useYouTube } from "../../contexts/learnlooper/YouTubeContext";
import PomodoroTimer from "./PomodoroTimer";
import YouTubePlayer from "./YouTubePlayer";
import styles from "./MainContainer.module.css";

const BREAK_CATEGORY_ID = "breaktime";

const MainContainer = () => {
  const { isStudying, isActive } = usePomodoro();
  const { playVideo, pauseVideo, setLoopEnabled, favorites, loadSavedVideo } = useYouTube();

  const prevIsStudyingRef = useRef(isStudying);

  // タイマーが動いている間だけ動画を再生し、止まったら動画も止める
  useEffect(() => {
    if (isActive) {
      setLoopEnabled(true);
      playVideo();
    } else {
      setLoopEnabled(false);
      pauseVideo();
    }
  }, [isActive, playVideo, pauseVideo, setLoopEnabled]);

  // Study Time → Break Time への切り替え時にBreak Time Musicを自動ロード
  useEffect(() => {
    if (prevIsStudyingRef.current && !isStudying && isActive) {
      const breakItem = favorites.find((f) => f.category === BREAK_CATEGORY_ID);
      if (breakItem) {
        loadSavedVideo(breakItem.url);
      }
    }
    prevIsStudyingRef.current = isStudying;
  }, [isStudying, isActive, favorites, loadSavedVideo]);

  return (
    <div
      className={`${styles.mainContainer} ${
        isStudying ? styles.studyMode : ""
      }`}
    >
      <div className={styles.playerSection}>
        <YouTubePlayer />
      </div>
      <div className={styles.timerSection}>
        <PomodoroTimer />
      </div>
    </div>
  );
};

export default MainContainer;
