import React, { MouseEventHandler } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: JSX.Element | string;
  className?: string;
  name: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={`${props.className || ""} ${styles.button}`}
      name={props.name}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
