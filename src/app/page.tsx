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
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const inactiveTheme = activeTheme === "light" ? "dark" : "light";

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
  }, [activeTheme]);

  const switchClass =
    activeTheme === "light"
      ? `${styles.header__theme_circle} ${styles.header__theme_circle__light}`
      : `${styles.header__theme_circle} ${styles.header__theme_circle__dark}`;

  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [currentType, setCurrentType] = useState("sansserif");

  const handleHeaderCurrentType = (type: string) => {
    console;
    if (type === "sansserif") {
      return <span className={styles.main__sansserif}>Sans Serif</span>;
    } else if (type === "serif") {
      return <span className={styles.main__serif}>Serif</span>;
    } else {
      return <span className={styles.main__mono}>Mono</span>;
    }
  };

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log("handleSearch");
    if (query.length > 0) {
      console.log("fetching");
      setError(null);
      setLoading(true);
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HttpError: ${res.status} ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((e) => setError(e.message));
    } else {
      setError("Empty Query")
    }
  };
  useEffect(() => {
    console.log("query: ", query);
  }, [query]);

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
                <div className={styles.header__type__current}>
                  {" "}
                  {handleHeaderCurrentType(currentType)}
                </div>
                {dropdownOpen ? (
                  <ul className={styles.header__type__dropdown}>
                    <li
                      onClick={() => setCurrentType("sansserif")}
                      className={styles.header__type__dropdown__sansserif}
                    >
                      Sans Serif
                    </li>
                    <li
                      onClick={() => setCurrentType("serif")}
                      className={styles.header__type__dropdown__serif}
                    >
                      Serif
                    </li>
                    <li
                      onClick={() => setCurrentType("mono")}
                      className={styles.header__type__dropdown__mono}
                    >
                      Mono
                    </li>
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
        <Search
          currentType={currentType}
          onChangeQuery={onChangeQuery}
          handleSearch={handleSearch}
        />
        <Result
          currentType={currentType}
          isLoading={isLoading}
          data={data}
          error={error}
        />
      </Card>
    </main>
  );
}
