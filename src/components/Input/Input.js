import React from "react";
import styles from "../Input/Input.module.css";

export default function Input(props) {
  return (
    <input
      className={styles.input}
      placeholder={props.placeholder}
      value={props.value}
      onChange={({ target: { value } }) => props.onChange(value)}
    />
  );
}
