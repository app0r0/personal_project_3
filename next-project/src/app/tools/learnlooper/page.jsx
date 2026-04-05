import React from "react";
import { PomodoroProvider } from "../../contexts/learnlooper/PomodoroContext";
import { YouTubeProvider } from "../../contexts/learnlooper/YouTubeContext";
import MainContainer from "../../components/learnlooper/MainContainer";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

export const metadata = {
  title: "YouTube Pomodoro Timer with Music | LearnLooper",
  description:
    "Study with your favorite YouTube music using a free Pomodoro timer. Set custom intervals from 1 minute, loop your music with AB repeat, and stay focused. No login required.",
  keywords: [
    "youtube pomodoro",
    "youtube pomodoro timer",
    "youtube pomodoro music",
    "youtube pomodoro study with me",
    "youtube pomodoro timer with music",
    "pomodoro timer with youtube",
    "study timer youtube",
    "youtube study timer",
    "youtube loop music study",
    "youtube repeat music study",
  ],
};

const LL = () => {
  return (
    <>
      <Header />
      <PomodoroProvider>
        <YouTubeProvider>
          <MainContainer />
        </YouTubeProvider>
      </PomodoroProvider>
      <Footer />
    </>
  );
};

export default LL;
