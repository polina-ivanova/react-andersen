import React from "react";
import styles from "./Textarea.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { TEXTAREA_LENGTH } from "../../constants";

export default function Textarea(props) {
  return (
    <label className={styles.label}>
      <div className={styles.title}>
        <div>{props.label}</div>
        <div className={styles.counter}>
          {props.value?.length > TEXTAREA_LENGTH
            ? 0
            : TEXTAREA_LENGTH - props.value.length}
          /600
        </div>
      </div>
      <textarea
        placeholder={props.placeholder}
        className={styles.textarea}
        rows="7"
        value={props.value}
        onChange={props.onChange}
        name={props.name}
      />
      <ErrorMessage error={props.error ? props.error : ""} />
    </label>
  );
}
