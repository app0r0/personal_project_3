import styles from "./AbloopInfo.module.css";

export default function AbloopInfo() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <h2 className={styles.heading}>How to Use the YouTube AB Looper</h2>
        <ol className={styles.list}>
          <li>Paste any YouTube video URL into the input field above.</li>
          <li>
            Press the A button when the section you want to loop begins, and the
            B button when it ends.
          </li>
          <li>The player will automatically repeat only that section.</li>
        </ol>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>What is an AB Loop Player?</h2>
        <p className={styles.body}>
          YouTube's built-in controls let you replay an entire video, but there
          is no way to lock a specific section on repeat. An AB loop player
          solves this by letting you mark a start point (A) and an end point
          (B), then automatically looping only that segment — indefinitely and
          without interruption.
        </p>
        <p className={styles.body}>
          LearnLooper's AB loop player works entirely in your browser. Paste any
          public YouTube URL, set your A and B points with a single click, and
          the player handles the rest. No extension to install, no account
          required — just open the page and start looping.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Keyboard Shortcuts</h2>
        <table className={styles.shortcutTable}>
          <thead>
            <tr>
              <th className={styles.shortcutTh}>Key</th>
              <th className={styles.shortcutTh}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.shortcutRow}>
              <td className={styles.shortcutKey}><kbd>Space</kbd></td>
              <td className={styles.shortcutAction}>Play / Pause</td>
            </tr>
            <tr className={styles.shortcutRow}>
              <td className={styles.shortcutKey}><kbd>A</kbd></td>
              <td className={styles.shortcutAction}>Set A point to current position</td>
            </tr>
            <tr className={styles.shortcutRow}>
              <td className={styles.shortcutKey}><kbd>B</kbd></td>
              <td className={styles.shortcutAction}>Set B point to current position</td>
            </tr>
            <tr className={styles.shortcutRow}>
              <td className={styles.shortcutKey}><kbd>L</kbd></td>
              <td className={styles.shortcutAction}>Toggle AB loop on / off</td>
            </tr>
            <tr className={styles.shortcutRow}>
              <td className={styles.shortcutKey}><kbd>←</kbd></td>
              <td className={styles.shortcutAction}>Seek back 5 seconds</td>
            </tr>
            <tr className={styles.shortcutRow}>
              <td className={styles.shortcutKey}><kbd>→</kbd></td>
              <td className={styles.shortcutAction}>Seek forward 5 seconds</td>
            </tr>
            <tr className={styles.shortcutRow}>
              <td className={styles.shortcutKey}><kbd>↑</kbd></td>
              <td className={styles.shortcutAction}>Increase playback speed by 0.1</td>
            </tr>
            <tr className={styles.shortcutRow}>
              <td className={styles.shortcutKey}><kbd>↓</kbd></td>
              <td className={styles.shortcutAction}>Decrease playback speed by 0.1</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Frequently Asked Questions</h2>
        <dl className={styles.faqList}>
          <div className={styles.faqItem}>
            <dt className={styles.question}>
              Does this work on any YouTube video?
            </dt>
            <dd className={styles.answer}>
              Yes. Paste any public YouTube video URL and the AB loop player
              will load it instantly.
            </dd>
          </div>

          <div className={styles.faqItem}>
            <dt className={styles.question}>
              Do I need to install an extension?
            </dt>
            <dd className={styles.answer}>
              No. LearnLooper works entirely in your browser. No download, no
              extension, no sign-up required.
            </dd>
          </div>

          <div className={styles.faqItem}>
            <dt className={styles.question}>Can I save my loop settings?</dt>
            <dd className={styles.answer}>
              Yes. Use the My Playlists feature to save your video URL, A point,
              and B point for later use.
            </dd>
          </div>

          <div className={styles.faqItem}>
            <dt className={styles.question}>
              What is AB repeat on YouTube?
            </dt>
            <dd className={styles.answer}>
              AB repeat means looping a specific section of a video between a
              set start point (A) and end point (B), rather than repeating the
              whole video.
            </dd>
          </div>

          <div className={styles.faqItem}>
            <dt className={styles.question}>
              Is this the same as YouTube's built-in loop?
            </dt>
            <dd className={styles.answer}>
              No. YouTube's built-in loop repeats the entire video.
              LearnLooper's AB loop player repeats only the section you define.
            </dd>
          </div>

          <div className={styles.faqItem}>
            <dt className={styles.question}>
              What can I use an AB loop player for?
            </dt>
            <dd className={styles.answer}>
              Common uses include language shadowing, instrument and music
              practice, dance choreography, and looping background music for
              study sessions.
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
