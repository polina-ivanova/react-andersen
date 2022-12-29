import React from "react";
import styles from "../Input/Input.module.css";

interface InputProps {
  className?: string;
  placeholder: string;
  value: string;
  onChange: (string) => void;
}

export default function Input(props: InputProps) {
  return (
    <input
      className={styles.input}
      placeholder={props.placeholder}
      value={props.value}
      onChange={({ target: { value } }) => props.onChange(value)}
    />
  );
}
