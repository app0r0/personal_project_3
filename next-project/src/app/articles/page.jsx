import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import styles from './Blog.module.css';
import Link from "next/link";
export default function Article1() {
    return (
        <>
            <Header />
            <div className={styles.navLink}>
                <Link href="/">Home</Link> &gt; <Link href="/articles">Articles</Link>
            </div>
            <main className={styles.main}>
                <h1>Link to Articles</h1>
                <ul>
                <li><Link href="/articles/article1">⚡ Why 1-Minute Study Sessions Are Game-Changing - The Science Behind LearnLooper's Timer 🎯</Link>
                </li><li><Link href="/articles/article2">🚀 LearnLooper Guide 2025: Transform Your Study Experience ✨</Link>
                </li><li><Link href="/articles/article3">🧠 The Science of Effective Learning: Research-Based Strategies That Actually Work ⚡</Link>
                </li><li><Link href="/articles/article4">🎯 Master English Listening with AB Loop: Your Ultimate Guide to Perfect Practice 🔄</Link>
                </li><li><Link href="/articles/article5">🎯 TOEIC Listening: Expert Strategies for Higher Scores in 2025 🚀</Link>
                </li><li><Link href="/articles/article6">Boost Your Learning Efficiency with Scientific Techniques</Link>
                </li><li><Link href="/articles/article7">How to Maximize Learning Efficiency with a Pomodoro Timer</Link>
                </li><li><Link href="/articles/article8">Unlock Your Study Potential: LearnLooper’s Multi-Audio Upload for Efficient Learning</Link></li>
                <li><Link href="/articles/article9">Revolutionize Your Study Routine: Free Tools to Enhance Learning Productivity</Link></li>
                <li><Link href="/articles/article10">From Procrastination to Productivity: The Ultimate Guide to Staying Focused with LearnLooper</Link></li>
                <li><Link href="/articles/article11">How to Loop a YouTube Video: The Complete Guide to YouTube Repeat & Looper Tools</Link></li>
                <li><Link href="/articles/article12">How to Loop Study Music on YouTube: Café BGM, Rain Sounds & Lo-Fi for Hours</Link></li>
                <li><Link href="/articles/article13">YouTube Pomodoro: Study with Music Using a Free Timer Tool</Link></li>
                <li><Link href="/articles/article14">How to Loop a Specific Section of a YouTube Video: AB Repeat Guide</Link></li>
                </ul >
                </main>
            <Footer />
            </>
  );
}
