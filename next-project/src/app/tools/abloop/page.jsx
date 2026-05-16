import React from "react";
import CompactHeader from "../../components/common/CompactHeader";
import Footer from "../../components/common/Footer";
import YouTubeABLoop from "../../components/abloop/YoutubeLoop";
import AbloopInfo from "../../components/abloop/AbloopInfo";
import OtherTools from "../../components/common/OtherTools";

export const metadata = {
  title: "AB Loop Player for YouTube — Set Any Repeat Section Free | LearnLooper",
  description:
    "The free AB loop player for YouTube. Paste any video URL, set your A and B points, and repeat that exact section on loop. Used for language shadowing, instrument practice, and focused study. No extension or sign-up needed.",
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
      <CompactHeader />
      <YouTubeABLoop />
      <AbloopInfo />
      <OtherTools currentTool="abloop" />
      <Footer />
    </>
  );
};

export default YAB;
