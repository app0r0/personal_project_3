"use client";
import React, { useState } from "react";
import { usePomodoro } from "../../contexts/learnlooper/PomodoroContext";
import styles from "./MainContainer.module.css";

const PRESETS = [1, 15, 25, 30, 45];

const PomodoroTimer = () => {
  const {
    isStudying,
    timeRemaining,
    isActive,
    startTimer,
    pauseTimer,
    resetTimer,
    studyDuration,
    updateStudyDuration,
  } = usePomodoro();

  const [customMinutes, setCustomMinutes] = useState("");

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSetCustom = () => {
    const mins = parseInt(customMinutes, 10);
    if (mins > 0) {
      updateStudyDuration(mins);
      setCustomMinutes("");
    }
  };

  return (
    <div className={styles.pomodoroTimer}>
      <div className={styles.timerDisplay}>
        <h2>{isStudying ? "Study Time" : "Break Time"}</h2>
        <div className={styles.time}>{formatTime(timeRemaining)}</div>
      </div>
      <div className={styles.timerControls}>
        <button onClick={isActive ? pauseTimer : startTimer}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className={styles.presetButtons}>
        {PRESETS.map((min) => (
          <button
            key={min}
            onClick={() => updateStudyDuration(min)}
            disabled={isActive}
            className={studyDuration === min * 60 ? styles.presetActive : ""}
          >
            {min}m
          </button>
        ))}
      </div>
      <div className={styles.customDuration}>
        <input
          type="number"
          min="1"
          max="180"
          value={customMinutes}
          onChange={(e) => setCustomMinutes(e.target.value)}
          placeholder="min"
          disabled={isActive}
          className={styles.customMinutesInput}
        />
        <button
          onClick={handleSetCustom}
          disabled={isActive || !customMinutes}
        >
          Set
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
