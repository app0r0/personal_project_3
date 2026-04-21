'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Settings, X, Lock, Unlock } from 'lucide-react';
import { useDisplayLock } from './DisplayLockProvider';
import styles from './CompactHeader.module.css';

const CompactHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isEnabled, toggleDisplayLock, notificationPermission, requestNotificationPermission } = useDisplayLock();

  const handleLockToggle = async () => {
    if (!isEnabled && notificationPermission === 'default') {
      await requestNotificationPermission();
    }
    toggleDisplayLock();
    setIsOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image src="/icon.svg" height={30} width={30} alt="LearnLooper icon" />
          <span className={styles.logoText}>LearnLooper</span>
        </Link>
        <button className={styles.settingsBtn} onClick={() => setIsOpen(true)} aria-label="Open settings">
          <Settings size={22} />
        </button>
      </header>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Close settings">
              <X size={18} />
            </button>
            <h2 className={styles.modalTitle}>Settings</h2>

            <button
              onClick={handleLockToggle}
              className={`${styles.modalItem} ${isEnabled ? styles.lockEnabled : styles.lockDisabled}`}
            >
              {isEnabled ? <Lock size={16} /> : <Unlock size={16} />}
              <span>{isEnabled ? 'Focus Mode ON' : 'Focus Mode OFF'}</span>
            </button>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScKDnNGjQM9ml7GSCCZTITNWZMoNfCYFcmxncnxiixVcoxbtg/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.modalItem}
            >
              Feedback
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default CompactHeader;
