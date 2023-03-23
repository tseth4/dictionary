import { useState, useEffect } from "react";
import styles from "@/components/result.module.scss";
import Image from "next/image";

interface ResultProps {
  currentType: string;
  isLoading: boolean;
  data: any;
  error?: string | null;
}

interface Meaning {
  antonyms: string[];
  definitions: string[];
  partOfSpeech: string;
  synonyms: string[];
}

interface ProcessedData {
  //  grouped by part of Speech with multiple defintions
  meanings: any[];
  // for header
  phonetic: string;
  phonetics: any[];
  sourceUrls: string[];
  word: "";
}

export default function Result(props: ResultProps) {
  const { currentType, isLoading, data, error } = props;
  // this will be populated with all sourceUrls from each element

  const [processedData, setProcessedData] = useState<ProcessedData | null>();

  let typeClass =
    currentType === "sansserif"
      ? `${styles.container__sansserif}`
      : currentType === "serif"
      ? `${styles.container__serif}`
      : `${styles.container__mono}`;

  const processData = (dataInput: any[]) => {
    // console.log("processData data: ", dataInput);
    let tempData: any = {
      meanings: [],
      phonetic: "",
      phonetics: [],
      sourceUrls: [],
      word: dataInput[0].word,
    };
    for (let i = 0; i < dataInput?.length; i++) {
      console.log("dataInput[i]: ", dataInput[i]);
      if (dataInput[i].phonetic) {
        tempData.phonetic = dataInput[i].phonetic;
      }
      if (dataInput[i].phonetics) {
        let phonetics = dataInput[i].phonetics;
        for (let k = 0; k < phonetics.length; k++) {
          tempData.phonetics.push(phonetics[k]);
        }
      }
      if (dataInput[i].sourceUrls) {
        let sourceUrls = dataInput[i].sourceUrls;
        for (let l = 0; l < sourceUrls.length; l++) {
          tempData.sourceUrls.push(sourceUrls[l]);
        }
      }
      let meanings = dataInput[i].meanings;
      for (let j = 0; j < meanings.length; j++) {
        // console.log("meaining: ", meanings[j]);
        tempData.meanings.push(meanings[j]);
      }
    }
    setProcessedData(tempData);
  };

  useEffect(() => {
    console.log("processedData: ", processedData);
  }, [processedData]);

  useEffect(() => {
    if (data) {
      processData(data);
    }
  }, [data]);

  if (error) {
    return <div>{error}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // console.log("data: ", data);
  if (!data) {
    return <div> </div>;
  }
  // const { meanings, phonetics, sourceUrls, word } = processedData;
  // console.log("dat: ", { meanings, phonetics, sourceUrls, word });
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header__word}>
          <div className={`${typeClass} ${styles.header__word}`}>
            {processedData?.word}
          </div>
          <div className={styles.header__word_phonetics_text}>
            {processedData?.phonetic}
          </div>
        </div>
        <div className={styles.header__play}>
          <div className={styles.header__play_phonetics_audio}>
            <Image
              src="/images/icon-play.svg"
              height={48}
              width={48}
              alt="icon-play"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
