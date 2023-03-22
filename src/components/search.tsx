// "use client";
// import { useEffect, useState } from "react";
import styles from "@/components/search.module.scss";
import Image from "next/image";
// import { useEffect } from "react";

interface SearchBarProps {
  currentType: string;
  onChangeQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
}

export default function SearchBar(props: SearchBarProps) {
  const { currentType, onChangeQuery, handleSearch } = props;

  const inputClass =
    currentType === "sansserif"
      ? `${styles.container__sanserif}`
      : currentType === "serif"
      ? `${styles.container__serif}`
      : `${styles.container__mono}`;

  return (
    <div className={styles.container}>
      <input
        className={inputClass}
        type="text"
        alt="search"
        onChange={onChangeQuery}
      />
      <i>
        <Image
          onClick={() => handleSearch()}
          src="/images/icon-search.svg"
          height={15}
          width={15}
          alt="icon-search"
        />
      </i>
    </div>
  );
}
