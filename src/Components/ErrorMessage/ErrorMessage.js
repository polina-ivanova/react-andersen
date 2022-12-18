import React, { Component } from "react";
import styles from "./Error.module.css";

class ErrorMessage extends Component {
  render() {
    return <div className={styles.error}>{this.props.error}</div>;
  }
}
export default ErrorMessage;
