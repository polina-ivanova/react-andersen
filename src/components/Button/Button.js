import React from "react";
import styles from "./Button.module.css";

export default function Button(props) {
  return (
    <button
      className={`${props.className || ""} ${styles.button}`}
      name={props.name}
      type={props.type}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
}
