// import Image from "next/image";
"use client";
import styles from "./page.module.scss";
import { useState, useEffect } from "react";
import Search from "@/components/search";
import Card from "@/components/card";
import Result from "@/components/result";
import Image from "next/image";

export default function Home() {
  const [activeTheme, setActiveTheme] = useState("light");
  const inactiveTheme = activeTheme === "light" ? "dark" : "light";
  useEffect(() => {
    document.body.dataset.theme = activeTheme;
  }, [activeTheme]);
  const switchClass =
    activeTheme === "light"
      ? `${styles.header__theme_circle} ${styles.header__theme_circle__light}`
      : `${styles.header__theme_circle} ${styles.header__theme_circle__dark}`;

  // const [todos, setTodos] = useState([]);
  const [dropdownOpen, setdropdownOpen] = useState(false);

  return (
    <main className={styles.main}>
      {dropdownOpen ? (
        <div
          onClick={() => setdropdownOpen(false)}
          className={styles.header__type__dropdown_shadow}
        ></div>
      ) : (
        ""
      )}
      <Card>
        <div className={styles.header}>
          <div className={styles.header__inner}>
            <div className={styles.header__logo}>
              <Image src="/images/logo.svg" height={32} width={32} alt="logo" />
            </div>
            <div>
              <div
                onClick={() => setdropdownOpen(!dropdownOpen)}
                className={styles.header__type}
              >
                <div className={styles.header__type__current}>Sans Serif</div>
                {dropdownOpen ? (
                  <ul className={styles.header__type__dropdown}>
                    <li>Sans Serif</li>
                    <li>Serif</li>
                    <li>Mono</li>
                  </ul>
                ) : (
                  ""
                )}
                <Image
                  src="/images/icon-arrow-down.svg"
                  height={6}
                  width={12}
                  alt="icon-arrow-down"
                />
              </div>
              <div className={styles.header__divider}></div>
              <div className={styles.header__theme}>
                <div
                  className={styles.header__theme_switch}
                  onClick={() => setActiveTheme(inactiveTheme)}
                >
                  <div className={switchClass}></div>
                </div>
                <div className={styles.header__theme_icon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                  >
                    <path
                      fill="none"
                      stroke="#838383"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
                    />
                  </svg>
                  {/* <Image
                    src="/images/icon-moon.svg"
                    height={20}
                    width={20}
                    alt="icon-moon"
                  /> */}
                </div>
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
