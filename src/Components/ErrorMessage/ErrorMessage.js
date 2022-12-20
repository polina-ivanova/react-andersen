import React from "react";
import styles from "./Error.module.css";

export default function ErrorMessage(props) {
  return <div className={styles.error}>{props.error}</div>;
}
