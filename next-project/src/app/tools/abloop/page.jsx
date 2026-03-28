import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import YouTubeABLoop from "../../components/abloop/YoutubeLoop";
import OtherTools from "../../components/common/OtherTools";

export const metadata = {
  title: "AB Repeat Online - Free AB Loop Player | LearnLooper",
  description:
    "Free online AB repeat tool for YouTube videos. Loop any section repeatedly for language learning, music practice, and dance training. No login required — ABリピート無料オンラインツール。",
  keywords: [
    "AB repeat online",
    "AB loop player",
    "YouTube AB loop",
    "ABリピート 無料",
    "語学学習 リピート",
    "loop YouTube video",
    "AB repeat YouTube",
    "music practice loop",
  ],
  openGraph: {
    title: "AB Repeat Online - Free AB Loop Player | LearnLooper",
    description:
      "Free online AB repeat tool for YouTube videos. Perfect for language learning, music, and dance practice.",
    type: "website",
    url: "https://learnlooper.app/tools/abloop",
  },
  twitter: {
    card: "summary_large_image",
    title: "AB Repeat Online - Free AB Loop Player | LearnLooper",
    description:
      "Free online AB repeat tool for YouTube videos. Perfect for language learning, music, and dance practice.",
  },
  alternates: {
    canonical: "https://learnlooper.app/tools/abloop",
  },
};

const YAB = () => {
  return (
    <>
      <Header />
      <YouTubeABLoop />
      <OtherTools currentTool="abloop" />
      <Footer />
    </>
  );
};

export default YAB;
