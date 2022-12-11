import React, { Component } from "react";
import styles from "./Input.module.css";

class Input extends Component {
  render() {
    return (
      <>
        <label className={styles.label}>
          {this.props.label}
          <br />
          <input
            className={styles.input}
            placeholder={this.props.placeholder}
          />
        </label>
      </>
    );
  }
}

export default Input;
