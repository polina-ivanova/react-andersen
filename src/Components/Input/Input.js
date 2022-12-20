import React from "react";
import styles from "./Input.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function Input(props) {
  return (
    <label className={styles.label}>
      {props.label}
      <br />
      <input
        className={styles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        type={props.type}
        pattern={props.pattern}
        name={props.name}
      />
      <ErrorMessage error={props.error ? props.error : ""} />
    </label>
  );
}
