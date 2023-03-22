import { useState } from "react";
import styles from "@/components/result.module.scss";

interface ResultProps {
  currentType: string;
  isLoading: boolean;
  data: any;
  error?: string | null;
}

export default function Result(props: ResultProps) {
  const { currentType, isLoading, data, error } = props;
  if (error) {
    return <div>{error}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log("data: ", data);
  if (!data) {
    return <div>null</div>;
  }
  const { meanings, phonetics, sourceUrls, word } = data[0];
  console.log("dat: ", { meanings, phonetics, sourceUrls, word });
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header__word}>
          <div className={styles.header__word_text}>{word}</div>
          <div className={styles.header__word_phonetics_text}>
            {phonetics[1].text}
          </div>
        </div>
        <div className={styles.header__play}>
          <div className={styles.header__play_phonetics_audio}></div>
        </div>
      </div>
    </div>
  );
}
