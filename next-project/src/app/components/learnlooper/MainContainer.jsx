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
  const { playVideo, pauseVideo, setLoopEnabled, favorites, loadSavedVideo, videoUrl, clearURL } = useYouTube();

  const prevIsStudyingRef = useRef(isStudying);
  const isStudyingRef = useRef(isStudying);
  const lastStudyUrlRef = useRef(null);
  const lastBreakUrlRef = useRef(null);

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

  // isStudyingRef を常に最新に保つ（URL トラッカーが isStudying の変化で誤発火しないよう ref 経由で参照）
  useEffect(() => {
    isStudyingRef.current = isStudying;
  }, [isStudying]);

  // 再生中のURLが変わったら lastStudyUrl / lastBreakUrl を更新する
  // deps に isStudying を入れると、モード切替時に旧URLが誤って記録されるため ref で参照する
  useEffect(() => {
    if (!videoUrl) return;
    if (isStudyingRef.current) {
      lastStudyUrlRef.current = videoUrl;
    } else {
      lastBreakUrlRef.current = videoUrl;
    }
  }, [videoUrl]);

  // Study Time ↔ Break Time の切り替え時に曲を引き継ぐ
  useEffect(() => {
    const wasStudying = prevIsStudyingRef.current;
    prevIsStudyingRef.current = isStudying;

    if (!isActive) return;

    if (wasStudying && !isStudying) {
      // Study → Break
      if (lastBreakUrlRef.current) {
        loadSavedVideo(lastBreakUrlRef.current);
      } else {
        const breakItem = favorites.find((f) => f.category === BREAK_CATEGORY_ID);
        if (breakItem) {
          lastBreakUrlRef.current = breakItem.url;
          loadSavedVideo(breakItem.url);
        } else {
          clearURL();
          pauseVideo();
        }
      }
    } else if (!wasStudying && isStudying) {
      // Break → Study
      if (lastStudyUrlRef.current) {
        loadSavedVideo(lastStudyUrlRef.current);
      } else {
        clearURL();
        pauseVideo();
      }
    }
  }, [isStudying, isActive, favorites, loadSavedVideo, clearURL, pauseVideo]);

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
