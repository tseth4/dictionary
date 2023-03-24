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
  meanings: any[];
  phonetic: string;
  audio: string;
  sourceUrls: string[];
  word: "";
}

export default function Result(props: ResultProps) {
  const { currentType, isLoading, data, error } = props;

  const [processedData, setProcessedData] = useState<ProcessedData | null>();

  let typeClass =
    currentType === "sansserif"
      ? `${styles.container__sansserif}`
      : currentType === "serif"
      ? `${styles.container__serif}`
      : `${styles.container__mono}`;

  const processData = (dataInput: any[]) => {
    let tempData: any = {
      meanings: [],
      phonetic: "",
      audio: "",
      sourceUrls: [],
      word: dataInput[0].word,
    };
    for (let i = 0; i < dataInput?.length; i++) {
      // console.log("dataInput[i]: ", dataInput[i]);

      if (dataInput[i].phonetics) {
        let phonetics = dataInput[i].phonetics;
        for (let k = 0; k < phonetics.length; k++) {
          let phoneticObj = phonetics[k];
          if (phoneticObj.audio && phoneticObj.audio.length > 0) {
            tempData.audio = phoneticObj.audio;
          }
          if (phoneticObj.text && phoneticObj.text.length > 0) {
            tempData.phonetic = phoneticObj.text;
          }
        }
      }
      if (dataInput[i].sourceUrls) {
        let sourceUrls = dataInput[i].sourceUrls;
        for (let l = 0; l < sourceUrls.length; l++) {
          if (tempData.sourceUrls.indexOf(sourceUrls[l]) === -1) {
            tempData.sourceUrls.push(sourceUrls[l]);
          }
        }
      }
      let meanings = dataInput[i].meanings;
      for (let j = 0; j < meanings.length; j++) {
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

  if (!data) {
    return <div> </div>;
  }

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
      <div className={styles.body}>
        {processedData?.meanings.map((meaning, id) => (
          <div className={styles.body__meaning} key={id}>
            <div className={`${typeClass} ${styles.body__part_of_speech}`}>
              <span>{meaning?.partOfSpeech}</span>
              <span></span>
            </div>
            <div className={`${typeClass}  ${styles.body__meaning_title}`}>
              Meaning
            </div>
            <ul className={`${typeClass} ${styles.body__definitions_list}`}>
              {meaning?.definitions.map((def: any, id: number) => (
                <li className={styles.body__definition} key={id}>
                  {def.definition}
                </li>
              ))}
            </ul>
            <div className={styles.body__synonym}>
              <div className={`${typeClass} ${styles.body__synonym__title}`}>
                Synonym
              </div>
              <div className={typeClass}>{meaning?.synonyms.join(", ")}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.container__divider}></div>
      <div className={`${typeClass} ${styles.container__source}`}>
        <div className={styles.container__source_title}>Source</div>
        {processedData?.sourceUrls.map((src, index) => (
          <div key={index}>
            {src}{" "}
            <span>
              <Image
                src="/images/icon-new-window.svg"
                height={12}
                width={12}
                alt="icon-new-window"
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
