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
  if (data) {
    const { meanings, phonetics, sourceUrls, word } = data[0];

    return (
      <div className={styles.container}>
        result-container
        <div>{word}</div>
      </div>
    );
  }
  return (
    <div>
      null
    </div>
  )
}
