"use client";
import { useEffect, useState } from "react";
import styles from "@/components/search.module.scss";

export default function SearchBar() {
  // const [myBool, setMyBool] = useState(false);
  // useEffect(() => {
  //   setMyBool(true);
  // }, []);
  // if (myBool) {
  //   return <div>myBool is true</div>;
  // } else {
  //   return <div>myBool is false</div>;
  // }
  return <div className={styles.container}>search bar</div>;
}
