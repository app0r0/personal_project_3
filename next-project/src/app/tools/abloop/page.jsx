import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import YouTubeABLoop from "../../components/abloop/YoutubeLoop";
import OtherTools from "../../components/common/OtherTools";

export const metadata = {
  title: "AB Repeat for YouTube — Free Loop Player | LearnLooper",
  description:
    "Loop any section of a YouTube video instantly. Perfect for language learning, shadowing, and music practice. Free, no login required.",
  keywords: [
    "AB repeat online",
    "AB loop player",
    "YouTube AB loop",
    "AB repeat YouTube",
    "loop YouTube video",
    "language learning repeat",
    "shadowing tool",
    "music practice loop",
  ],
  openGraph: {
    title: "AB Repeat for YouTube — Free Loop Player | LearnLooper",
    description:
      "Loop any section of a YouTube video instantly. Perfect for language learning, shadowing, and music practice. Free, no login required.",
    type: "website",
    url: "https://learnlooper.app/tools/abloop",
  },
  twitter: {
    card: "summary_large_image",
    title: "AB Repeat for YouTube — Free Loop Player | LearnLooper",
    description:
      "Loop any section of a YouTube video instantly. Perfect for language learning, shadowing, and music practice. Free, no login required.",
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
