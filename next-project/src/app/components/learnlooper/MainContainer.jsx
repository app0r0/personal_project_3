"use client";
import React, { useEffect } from "react";
import { usePomodoro } from "../../contexts/learnlooper/PomodoroContext";
import { useYouTube } from "../../contexts/learnlooper/YouTubeContext";
import PomodoroTimer from "./PomodoroTimer";
import YouTubePlayer from "./YouTubePlayer";
import styles from "./MainContainer.module.css";

const MainContainer = () => {
  const { isStudying, isActive } = usePomodoro();
  const { playVideo, pauseVideo, setLoopEnabled } = useYouTube();

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
