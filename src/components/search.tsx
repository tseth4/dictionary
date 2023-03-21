// "use client";
// import { useEffect, useState } from "react";
import styles from "@/components/search.module.scss";
import Image from "next/image";

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
  return (
    <div className={styles.container}>
      <input type="text" alt="search" />
      <i>
        <Image
          src="/images/icon-search.svg"
          height={15}
          width={15}
          alt="icon-search"
        />
      </i>
    </div>
  );
}
