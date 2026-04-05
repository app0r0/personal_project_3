import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import YouTubeABLoop from "../../components/abloop/YoutubeLoop";
import OtherTools from "../../components/common/OtherTools";

export const metadata = {
  title: "YouTube AB Repeat — Free Loop Player | LearnLooper",
  description:
    "Free YouTube AB loop and repeat player. Loop any section of a YouTube video — perfect for language shadowing, music practice, and dance. No sign-up needed. Also works as a YouTube repeater or looper.",
  keywords: [
    "youtube ab loop",
    "youtube ab repeat",
    "youtube loop",
    "youtube looper",
    "youtube repeat",
    "youtube repeater",
    "youtube repeat url",
    "youtube loop url",
    "ab loop player",
    "youtube repeat online",
    "youtube loop video",
    "youtube loop music",
    "youtube repeat video",
    "loop youtube video",
    "youtube looper extension alternative",
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
