// import React from 'react'
import styles from "@/components/card.module.scss";

export default function Card({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
