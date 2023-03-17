// import Image from "next/image";
"use client";
import styles from "./page.module.scss";
import { useState } from "react";
import Search from "@/components/search";
import Card from "@/components/card";
import Result from "@/components/result";
import Image from "next/image";

export default function Home() {
  const [todos, setTodos] = useState([]);
  return (
    <main className={styles.main}>
      <Card>
        <div className={styles.header}>
          <div className={styles.header__inner}>
            <div>
              <Image src="/images/logo.svg" height={32} width={32} alt="logo" />
            </div>
            <div>
              Sans Sarif
              <Image
                src="/images/icon-arrow-down.svg"
                height={6}
                width={12}
                alt="icon-arrow-down"
              />
            </div>
            <div>
              <div className={styles.header__switch}>
                <div className={styles.header__circle}></div>
              </div>
            </div>
          </div>
        </div>
        <Search />
        <Result />
      </Card>
    </main>
  );
}
